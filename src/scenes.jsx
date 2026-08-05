import { useState } from 'react';

/*
 * Bildespråk — tredje og siste retning.
 *
 * To forsøk feilet, og de feilet av samme grunn: begge prøvde å *late som*
 * de var fotografi. Tegnede scener med sol og palme ble clipart. Malte
 * gradienter med silhuetter ble et uskarpt fotografi. Et halvgodt fotografi
 * ser billig ut. Det finnes ingen vei rundt det.
 *
 * Denne versjonen slutter å konkurrere med kameraet. I stedet bruker den
 * språket til merkevarer som ikke har foto å vise fram, og som likevel ser
 * dyre ut: dype, mettede fargeflater, ett stort strektegnet motiv lagt på
 * som vannmerke, fin korning, og typografi som gjør jobben.
 *
 * Motivet ligger på ~20 % dekkevne med vilje. Da leses det som merkevare,
 * ikke som en tegning man kan vurdere strek for strek — og det er nettopp
 * derfor det tåler å bli sett på.
 *
 * Når ekte foto kommer på plass (fra affiliate-partnernes egne bildebanker),
 * settes `image` på opplevelsen, og platen blir liggende som fallback.
 */

const W = 400;
const H = 300;

/* ------------------------------------------------------------------ *
 * Byggeklosser — deterministisk geometri, ingen tilfeldighet
 * ------------------------------------------------------------------ */

const r1 = (n) => Math.round(n * 10) / 10;

/**
 * Høydekurver. Ligger bakerst på hver plate og gir flaten dybde uten å
 * forestille noe. Rent deterministisk, så forhåndsrendering og hydrering
 * gir nøyaktig samme markup.
 */
function contours(seed, count, box) {
  const { x0, x1, y0, step } = box;
  const out = [];
  for (let i = 0; i < count; i += 1) {
    const s = i + seed;
    const y = y0 + i * step;
    const a = 14 + Math.sin(s * 0.9) * 10;
    const b = 12 + Math.cos(s * 1.31) * 11;
    const mid = (x0 + x1) / 2;
    out.push(
      `M ${x0} ${r1(y)} C ${r1(x0 + (mid - x0) * 0.5)} ${r1(y - a)} ` +
        `${r1(mid - (mid - x0) * 0.3)} ${r1(y + b)} ${r1(mid)} ${r1(y - b * 0.4)} ` +
        `S ${r1(x1 - (x1 - mid) * 0.35)} ${r1(y + a * 0.7)} ${x1} ${r1(y - 4)}`,
    );
  }
  return out;
}

/**
 * Et stort tropeblad, tegnet stående og rotert på plass. Midtribbe med
 * sidenerver som følger bredden, og tre rifter i kanten — det er riftene
 * som gjør at det leser som et blad og ikke som et skjelett.
 */
function leaf(n) {
  const out = [
    'M 200 286 C 150 250 120 200 120 150 C 120 92 156 40 200 14 C 244 40 280 92 280 150 C 280 200 250 250 200 286 Z',
    'M 200 284 L 200 18',
  ];
  for (let i = 1; i <= n; i += 1) {
    const t = i / (n + 1);
    const y = 286 - t * 268;
    const hw = 78 * Math.sin(Math.PI * t) ** 0.62;
    for (const s of [1, -1]) {
      out.push(
        `M 200 ${r1(y)} Q ${r1(200 + s * hw * 0.6)} ${r1(y - hw * 0.14)} ` +
          `${r1(200 + s * hw * 0.93)} ${r1(y - hw * 0.36)}`,
      );
    }
  }
  return out;
}

/** En papirlykt — kropp, meridianer, lokk og dusk. */
function lantern(cx, cy, s) {
  const rx = 30 * s;
  const ry = 36 * s;
  const cap = rx * 0.42;
  return [
    `M ${r1(cx)} ${r1(cy - ry)} C ${r1(cx + rx)} ${r1(cy - ry * 0.5)} ${r1(cx + rx)} ${r1(cy + ry * 0.5)} ${r1(cx)} ${r1(cy + ry)} C ${r1(cx - rx)} ${r1(cy + ry * 0.5)} ${r1(cx - rx)} ${r1(cy - ry * 0.5)} ${r1(cx)} ${r1(cy - ry)}`,
    `M ${r1(cx)} ${r1(cy - ry)} C ${r1(cx + rx * 0.44)} ${r1(cy - ry * 0.45)} ${r1(cx + rx * 0.44)} ${r1(cy + ry * 0.45)} ${r1(cx)} ${r1(cy + ry)}`,
    `M ${r1(cx)} ${r1(cy - ry)} C ${r1(cx - rx * 0.44)} ${r1(cy - ry * 0.45)} ${r1(cx - rx * 0.44)} ${r1(cy + ry * 0.45)} ${r1(cx)} ${r1(cy + ry)}`,
    `M ${r1(cx - cap)} ${r1(cy - ry)} H ${r1(cx + cap)}`,
    `M ${r1(cx - cap)} ${r1(cy + ry)} H ${r1(cx + cap)}`,
    `M ${r1(cx)} ${r1(cy + ry)} v ${r1(15 * s)}`,
  ];
}

/* ------------------------------------------------------------------ *
 * Platen — samme oppskrift for alle kort
 * ------------------------------------------------------------------ */

/**
 * Plasserer motivet: skalerer det om sitt eget tyngdepunkt og setter det midt
 * i platen. Uten dette blir motivene små og skjeve i forhold til hverandre.
 */
function fit(cx, cy, s) {
  return `translate(${r1(W / 2 - cx * s)} ${r1(H / 2 - cy * s)}) scale(${s})`;
}

function Plate({ uid, pAR, label, from, to, glow, gx, gy, seed, mt, children }) {
  const g = (n) => `${uid}-${n}`;
  return (
    <svg
      className="scene"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={pAR}
      role="img"
      aria-label={label}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={g('f')} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0" stopColor={to} />
          <stop offset="1" stopColor={from} />
        </linearGradient>
        <radialGradient id={g('gl')} cx={gx / W} cy={gy / H} r="0.85">
          <stop offset="0" stopColor={glow} stopOpacity="0.72" />
          <stop offset="0.45" stopColor={glow} stopOpacity="0.22" />
          <stop offset="1" stopColor={glow} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('sc')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0.2" />
          <stop offset="0.32" stopColor="#000" stopOpacity="0" />
          <stop offset="0.68" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.38" />
        </linearGradient>
        <pattern id={g('gr')} width="4" height="4" patternUnits="userSpaceOnUse">
          <circle cx="0.6" cy="0.8" r="0.55" fill="#fff" opacity="0.055" />
          <circle cx="2.7" cy="2.4" r="0.5" fill="#000" opacity="0.075" />
        </pattern>
      </defs>

      <rect width={W} height={H} fill={`url(#${g('f')})`} />
      <rect width={W} height={H} fill={`url(#${g('gl')})`} />

      {/* Høydekurver — dybde, ikke motiv */}
      <g fill="none" stroke="#fff" strokeWidth="1" opacity="0.11">
        {contours(seed, 11, { x0: -20, x1: 420, y0: 26, step: 27 }).map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* Motivet — vannmerke, ikke illustrasjon */}
      <g
        fill="none"
        stroke="#fff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.3"
        transform={mt}
      >
        {children}
      </g>

      <rect width={W} height={H} fill={`url(#${g('sc')})`} />
      <rect width={W} height={H} fill={`url(#${g('gr')})`} />
    </svg>
  );
}

const P = (props) => <path {...props} />;
const paths = (list) => list.map((d) => <path key={d} d={d} />);

/* ------------------------------------------------------------------ *
 * Motivene
 * ------------------------------------------------------------------ */

const Islands = (p) => (
  <Plate
    {...p}
    label="Øyer og longtailbåt"
    mt={fit(190, 152, 1.1)}
    from="#073b48"
    to="#12798d"
    glow="#ffd08a"
    gx={306}
    gy={74}
    seed={0.4}
  >
    <circle cx="306" cy="74" r="27" />
    <circle cx="306" cy="74" r="41" opacity="0.55" />
    <P d="M 2 180 C 38 130 80 128 114 180" />
    <P d="M 244 182 C 280 140 320 138 354 182" opacity="0.7" />
    <P d="M 112 200 C 148 224 244 224 282 200" />
    <P d="M 112 200 L 282 200" />
    <P d="M 282 200 L 306 172" />
    <P d="M 300 178 l 13 -15 M 294 174 l 7 -17" />
    <P d="M 156 200 L 162 178 L 232 178 L 238 200" />
    <P d="M 162 178 L 162 200 M 232 178 L 232 200" />
    <P d="M 114 206 L 68 232 l -11 6" />
    <P d="M 22 228 C 88 238 152 238 216 230" opacity="0.6" />
    <P d="M 96 250 C 160 260 232 258 302 248" opacity="0.45" />
  </Plate>
);

const Karst = (p) => (
  <Plate
    {...p}
    label="Kalksteinsformasjoner i havet"
    mt={fit(203, 148, 1.14)}
    from="#12325c"
    to="#3a72b8"
    glow="#a9d3ff"
    gx={318}
    gy={62}
    seed={1.1}
  >
    <circle cx="318" cy="62" r="22" />
    {/* Ulik bredde, ulik høyde og litt slagside. Tre like søyler leser som
        kjegler; tre ulike leser som stein. */}
    {/* Kalksteinstårnene i Phang Nga er smalest ved vannflaten og bredest
        et stykke opp. Det underkuttet er hele silhuetten. */}
    <P d="M 96 216 C 88 202 82 184 81 158 C 79 128 92 106 110 106 C 128 106 140 126 139 154 C 138 180 132 200 126 216" />
    <P d="M 186 218 C 176 200 168 176 166 140 C 163 96 180 56 202 56 C 226 56 242 92 240 134 C 238 172 232 198 222 218" />
    <P d="M 292 218 C 286 208 282 194 281 174 C 280 152 290 136 304 136 C 318 136 327 152 326 174 C 325 194 321 208 316 218" />
    <P d="M 84 158 C 100 150 122 152 138 160 M 88 186 C 104 180 122 182 134 188" opacity="0.5" />
    <P d="M 168 128 C 188 116 216 118 238 128 M 170 168 C 190 158 216 160 236 170" opacity="0.5" />
    <P d="M 282 168 C 296 160 312 162 325 168" opacity="0.5" />
    <P d="M 100 106 l -7 -11 M 111 104 l 2 -13 M 122 108 l 9 -10" opacity="0.8" />
    <P d="M 190 58 l -8 -12 M 202 53 l 1 -14 M 214 59 l 10 -11" opacity="0.8" />
    <P d="M 298 136 l -6 -10 M 308 135 l 1 -11" opacity="0.8" />
    <P d="M 26 218 C 120 230 274 230 372 216" />
    <P d="M 58 238 C 140 248 262 248 342 236" opacity="0.6" />
    <P d="M 100 258 C 164 266 240 266 302 256" opacity="0.4" />
  </Plate>
);

const Temple = (p) => (
  <Plate
    {...p}
    label="Tempeltårn ved elven"
    mt={fit(200, 166, 1.02)}
    from="#4a1f45"
    to="#c25a34"
    glow="#ffc98a"
    gx={300}
    gy={86}
    seed={2.3}
  >
    <circle cx="300" cy="86" r="24" opacity="0.7" />
    <P d="M 138 240 L 150 240 L 154 202 L 164 202 L 168 168 L 176 168 L 182 124 L 190 124 L 200 54 L 210 124 L 218 124 L 224 168 L 232 168 L 236 202 L 246 202 L 250 240 L 262 240" />
    <P d="M 154 202 H 246 M 168 168 H 232 M 182 124 H 218" opacity="0.75" />
    <P d="M 74 246 L 82 246 L 85 218 L 92 218 L 96 192 L 104 150 L 112 192 L 116 218 L 123 218 L 126 246 L 134 246" opacity="0.8" />
    <P d="M 266 246 L 274 246 L 277 218 L 284 218 L 288 192 L 296 150 L 304 192 L 308 218 L 315 218 L 318 246 L 326 246" opacity="0.8" />
    <P d="M 56 256 H 344" />
    <P d="M 24 272 C 120 282 282 282 378 270" opacity="0.55" />
  </Plate>
);

const Jungle = (p) => (
  <Plate
    {...p}
    label="Elefant i reservat"
    mt={fit(213, 176, 1.26)}
    from="#0d4530"
    to="#26946a"
    glow="#ffe6a8"
    gx={300}
    gy={72}
    seed={3.7}
  >
    {/* Panne, snabel og kjeve i ett drag — det er linjen som gjør at et dyr
        blir lest som et dyr, ikke summen av delene. */}
    <P d="M 186 116 C 158 122 144 142 142 166 C 140 186 134 204 138 222 C 141 234 153 239 161 232 C 166 227 164 219 158 216 C 168 210 172 198 172 186" />
    <P d="M 186 116 C 216 110 250 118 266 140 C 280 158 282 190 274 214" />
    <P d="M 172 186 C 186 210 210 218 236 216 C 254 214 268 210 274 214" />
    <P d="M 190 118 C 172 124 164 146 168 170 C 172 190 188 200 202 194 C 214 188 216 168 210 148 C 205 130 200 120 190 118 Z" />
    <P d="M 182 206 L 180 238 M 206 214 L 206 240 M 244 216 L 244 240 M 268 210 L 268 238" />
    <P d="M 150 192 C 143 200 142 210 145 218" opacity="0.7" />
    <P d="M 274 160 C 288 176 288 200 280 214" opacity="0.8" />
    <circle cx="164" cy="152" r="2.8" fill="#fff" stroke="none" opacity="0.9" />
    <P d="M 40 248 C 140 258 272 258 370 244" opacity="0.55" />
  </Plate>
);

const Canopy = (p) => (
  <Plate
    {...p}
    label="Palmeblad i regnskogen"
    mt={fit(200, 150, 1.0)}
    from="#0a3d33"
    to="#1b8a76"
    glow="#a9f2d4"
    gx={312}
    gy={64}
    seed={4.9}
  >
    <g transform="rotate(-27 200 150)">
      {paths(leaf(9))}
      <P d="M 278 116 L 246 130" />
      <P d="M 122 178 L 154 190" />
      <P d="M 272 206 L 240 212" />
    </g>
  </Plate>
);

const City = (p) => (
  <Plate
    {...p}
    label="Bysilhuett om kvelden"
    mt={fit(200, 174, 1.06)}
    from="#2c1a52"
    to="#a03a8c"
    glow="#ffa8d6"
    gx={300}
    gy={76}
    seed={5.5}
  >
    <circle cx="300" cy="76" r="20" opacity="0.65" />
    <P d="M -12 232 L 30 232 L 30 170 L 62 170 L 62 200 L 92 200 L 92 138 L 104 138 L 104 112 L 118 112 L 118 138 L 132 138 L 132 196 L 168 196 L 168 154 L 196 154 L 196 210 L 226 210 L 226 126 L 240 126 L 240 92 L 252 92 L 252 126 L 268 126 L 268 186 L 306 186 L 306 148 L 340 148 L 340 214 L 412 214" />
    <P d="M 38 184 h 16 M 38 198 h 16 M 100 152 h 12 M 100 168 h 12 M 176 168 h 12 M 176 182 h 12 M 232 140 h 6 M 232 156 h 6 M 232 172 h 6 M 314 162 h 18 M 314 178 h 18" opacity="0.55" />
    <P d="M 20 252 C 130 262 274 262 384 248" opacity="0.4" />
  </Plate>
);

const Arena = (p) => (
  <Plate
    {...p}
    label="Muay Thai"
    mt={fit(200, 182, 1.3)}
    from="#33121c"
    to="#b8354b"
    glow="#ffb094"
    gx={286}
    gy={70}
    seed={6.2}
  >
    <P d="M 186 136 C 154 136 136 158 136 186 C 136 214 158 234 190 234 L 218 234 C 236 234 246 222 246 206 L 246 164 C 246 148 236 136 218 136 Z" />
    <P d="M 138 198 C 122 196 112 206 114 220 C 116 232 130 236 140 230" />
    <P d="M 246 164 L 278 164 C 286 164 290 170 290 178 L 290 216 C 290 224 286 230 278 230 L 246 230" />
    <P d="M 262 164 L 262 230" opacity="0.6" />
    <P d="M 146 172 C 176 164 210 164 242 170" opacity="0.7" />
    <P d="M 158 154 l 15 11 M 173 149 l 15 11 M 188 146 l 15 11" opacity="0.75" />
    <P d="M 44 254 C 140 264 268 264 358 250" opacity="0.4" />
  </Plate>
);

const Safari = (p) => (
  <Plate
    {...p}
    label="Sjiraff i safaripark"
    mt={fit(204, 148, 0.94)}
    from="#1d3a22"
    to="#8a9430"
    glow="#ffe294"
    gx={296}
    gy={74}
    seed={7.8}
  >
    <circle cx="308" cy="70" r="23" opacity="0.6" />
    {/* Halsen er hele silhuetten — den er det ingen andre dyr som har. */}
    <P d="M 162 62 L 136 66 C 122 66 112 58 114 48 C 116 38 128 34 140 38 C 152 42 158 50 162 62 Z" />
    <P d="M 130 37 L 127 25 M 144 39 L 145 26" />
    <circle cx="126" cy="23" r="3.4" />
    <circle cx="146" cy="24" r="3.4" />
    <P d="M 158 47 L 173 41" opacity="0.8" />
    <circle cx="133" cy="47" r="2.2" fill="#fff" stroke="none" opacity="0.9" />
    <P d="M 136 66 C 150 104 172 150 192 184" />
    <P d="M 162 62 C 180 100 202 146 218 180" />
    <P d="M 192 184 C 204 168 232 162 258 166 C 284 170 298 186 296 206 C 295 218 288 224 278 224 L 208 222 C 196 218 190 202 192 184 Z" />
    <P d="M 212 222 L 208 268 M 228 222 L 226 268 M 274 224 L 278 268 M 288 222 L 290 268" />
    <P d="M 202 268 h 12 M 220 268 h 12 M 272 268 h 12 M 284 268 h 12" opacity="0.8" />
    <P d="M 296 200 C 308 210 310 228 303 240" opacity="0.85" />
    <g opacity="0.55">
      <circle cx="158" cy="98" r="7" />
      <circle cx="176" cy="132" r="7.5" />
      <circle cx="196" cy="166" r="7" />
      <circle cx="224" cy="182" r="9" />
      <circle cx="252" cy="180" r="8.5" />
      <circle cx="276" cy="192" r="8" />
      <circle cx="232" cy="206" r="8" />
      <circle cx="262" cy="208" r="7.5" />
    </g>
    <P d="M 40 276 C 150 288 282 288 380 272" opacity="0.5" />
  </Plate>
);

const Market = (p) => (
  <Plate
    {...p}
    label="Lykter over et nattmarked"
    mt={fit(200, 128, 1.16)}
    from="#4a2410"
    to="#d4801f"
    glow="#ffc76b"
    gx={296}
    gy={70}
    seed={8.6}
  >
    <P d="M -12 42 C 110 78 292 78 412 42" />
    <P d="M 108 60 L 108 88 M 206 66 L 206 122 M 306 58 L 306 90" opacity="0.7" />
    {paths(lantern(108, 124, 1))}
    {paths(lantern(206, 158, 1.25))}
    {paths(lantern(306, 122, 0.9))}
    <P d="M 20 250 C 130 262 274 262 384 246" opacity="0.35" />
  </Plate>
);

const SCENES = {
  islands: Islands,
  karst: Karst,
  temple: Temple,
  jungle: Jungle,
  canopy: Canopy,
  city: City,
  arena: Arena,
  safari: Safari,
  market: Market,
};

export function Scene({ name, uid, image, alt }) {
  // Sett `image` på opplevelsen eller reisemålet, så tar fotoet over. Det er
  // hele bytteveien til ekte bilder: én linje i data.js, ingen kodeendring.
  //
  // Laster bildet ikke — feil filnavn, eller en gammel nettleser uten
  // AVIF-støtte — faller vi tilbake til den tegnede platen i stedet for å
  // vise et knust bilde-ikon. `key` på bildet sørger for at feiltilstanden
  // nullstilles hvis kortet bytter bilde.
  const [failed, setFailed] = useState(false);
  if (image && !failed) {
    return (
      <img
        key={image}
        className="scene"
        src={image}
        alt={alt || ''}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
      />
    );
  }
  const Cmp = SCENES[name] || Islands;
  // Motivene er komponert rundt midten, så platen skal alltid beskjæres
  // symmetrisk — uansett om rammen er et kort, en hero eller en miniatyr.
  return <Cmp uid={uid || name} pAR="xMidYMid slice" />;
}

/* ------------------------------------------------------------------ *
 * Hero — samme språk, men i stort format
 * ------------------------------------------------------------------ */

export function HeroScene() {
  const u = 'hero';
  const g = (n) => `${u}-${n}`;
  return (
    <svg
      className="hero-scene"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={g('base')} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#0a2b44" />
          <stop offset="0.5" stopColor="#155c5c" />
          <stop offset="1" stopColor="#0b3f30" />
        </linearGradient>
        <radialGradient id={g('sun')} cx="0.74" cy="0.5" r="0.62">
          <stop offset="0" stopColor="#ffc46b" stopOpacity="0.82" />
          <stop offset="0.32" stopColor="#f5893f" stopOpacity="0.42" />
          <stop offset="1" stopColor="#f0803c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={g('jade')} cx="0.1" cy="1" r="0.85">
          <stop offset="0" stopColor="#17b487" stopOpacity="0.4" />
          <stop offset="1" stopColor="#0f7a5f" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={g('vig')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#02231f" stopOpacity="0.34" />
          <stop offset="0.34" stopColor="#020a09" stopOpacity="0" />
          <stop offset="0.72" stopColor="#020a09" stopOpacity="0.16" />
          <stop offset="1" stopColor="#02231f" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={g('side')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#020a09" stopOpacity="0.52" />
          <stop offset="0.46" stopColor="#020a09" stopOpacity="0.08" />
          <stop offset="1" stopColor="#020a09" stopOpacity="0" />
        </linearGradient>
        <filter id={g('grain')} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill={`url(#${g('base')})`} />
      <rect width="1600" height="900" fill={`url(#${g('jade')})`} />
      <rect width="1600" height="900" fill={`url(#${g('sun')})`} />

      {/* Høydekurver over hele flaten — så vidt merkbare */}
      <g fill="none" stroke="#fff" strokeWidth="1.4" opacity="0.055">
        {contours(0.6, 14, { x0: -40, x1: 1640, y0: 90, step: 58 }).map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      {/* Motiv — få og store elementer, langt til høyre. Et travelt motiv
          bak en overskrift blir støy; et rolig blir stemning. */}
      <g
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.2"
      >
        <circle cx="1298" cy="424" r="62" />
        <circle cx="1298" cy="424" r="97" opacity="0.5" />
        <circle cx="1298" cy="424" r="134" opacity="0.22" />
        <path d="M 840 566 H 1640" opacity="0.7" />
        <path d="M 946 566 C 962 512 992 486 1024 486 C 1058 486 1084 514 1098 566" opacity="0.75" />
        <path d="M 1186 566 C 1196 528 1214 510 1234 510 C 1256 510 1272 530 1280 566" opacity="0.5" />
        <path d="M 1418 566 C 1434 502 1468 472 1504 472 C 1542 472 1572 504 1586 566" opacity="0.6" />
        {/* Longtailbåt gir målestokk til resten */}
        <path d="M 1054 676 C 1104 712 1236 712 1288 676" />
        <path d="M 1054 676 L 1288 676" />
        <path d="M 1288 676 L 1322 638" />
        <path d="M 1314 646 l 18 -21 M 1306 640 l 10 -24" />
        <path d="M 1114 676 L 1122 644 L 1220 644 L 1228 676" />
        <path d="M 1122 644 L 1122 676 M 1220 644 L 1220 676" />
        <path d="M 1056 684 L 992 720 l -16 9" />
        <path d="M 900 726 C 1010 744 1150 744 1258 730" opacity="0.45" />
        <path d="M 980 782 C 1084 798 1208 796 1308 784" opacity="0.3" />
      </g>

      <rect width="1600" height="900" fill={`url(#${g('side')})`} />
      <rect width="1600" height="900" fill={`url(#${g('vig')})`} />
      <rect width="1600" height="900" filter={`url(#${g('grain')})`} opacity="0.05" />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Ikoner
 * ------------------------------------------------------------------ */

const ic = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
  width: 24,
  height: 24,
  xmlns: 'http://www.w3.org/2000/svg',
};

export const Icon = {
  chat: (p) => (<svg {...ic} {...p}><path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12z" /><path d="M8.5 11h7M8.5 14h4" /></svg>),
  tag: (p) => (<svg {...ic} {...p}><path d="M3 12V4h8l9 9-8 8-9-9z" /><circle cx="7.5" cy="7.5" r="1.3" /></svg>),
  compass: (p) => (<svg {...ic} {...p}><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" /></svg>),
  shield: (p) => (<svg {...ic} {...p}><path d="M12 3l7 3v5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>),
  star: (p) => (<svg {...ic} fill="currentColor" stroke="none" {...p}><path d="M12 3.6l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6L7.6 22l.9-5.5-4-3.9 5.5-.8z" /></svg>),
  clock: (p) => (<svg {...ic} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  pin: (p) => (<svg {...ic} {...p}><path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>),
  heart: (p) => (<svg {...ic} {...p}><path d="M12 20s-7-4.3-9.2-8.6C1.3 8.1 3 5 6.1 5c1.9 0 3.1 1 3.9 2 .8-1 2-2 3.9-2 3.1 0 4.8 3.1 3.3 6.4C19 15.7 12 20 12 20z" /></svg>),
  check: (p) => (<svg {...ic} {...p}><path d="M20 6L9 17l-5-5" /></svg>),
  arrow: (p) => (<svg {...ic} {...p}><path d="M5 12h14M13 6l6 6-6 6" /></svg>),
  search: (p) => (<svg {...ic} {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>),
  chevron: (p) => (<svg {...ic} {...p}><path d="M6 9l6 6 6-6" /></svg>),
  back: (p) => (<svg {...ic} {...p}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>),
  mail: (p) => (<svg {...ic} {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M3.5 7l8.5 6 8.5-6" /></svg>),
  lock: (p) => (<svg {...ic} {...p}><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /></svg>),
  calendar: (p) => (<svg {...ic} {...p}><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 10h17M8 3v4M16 3v4" /></svg>),
  users: (p) => (<svg {...ic} {...p}><circle cx="9" cy="9" r="3.2" /><path d="M3.5 19.5c0-3 2.5-5 5.5-5s5.5 2 5.5 5" /><path d="M16 6.5a3 3 0 0 1 0 5.6M17.5 14.8c2 .7 3.2 2.4 3.2 4.7" /></svg>),
  card: (p) => (<svg {...ic} {...p}><rect x="2.5" y="5.5" width="19" height="13" rx="2.5" /><path d="M2.5 10h19M6 14.5h3" /></svg>),
  globe: (p) => (<svg {...ic} {...p}><circle cx="12" cy="12" r="9" /><path d="M3.2 9.5h17.6M3.2 14.5h17.6" /><path d="M12 3c-2.4 2.4-3.6 5.4-3.6 9s1.2 6.6 3.6 9c2.4-2.4 3.6-5.4 3.6-9S14.4 5.4 12 3z" /></svg>),
  info: (p) => (<svg {...ic} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 7.8h.02" /></svg>),
  x: (p) => (<svg {...ic} {...p}><path d="M6 6l12 12M18 6L6 18" /></svg>),
  ticket: (p) => (<svg {...ic} {...p}><path d="M3 9.5V7a1.5 1.5 0 0 1 1.5-1.5h15A1.5 1.5 0 0 1 21 7v2.5a2.5 2.5 0 0 0 0 5V17a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17v-2.5a2.5 2.5 0 0 0 0-5z" /><path d="M14 6.5v11" strokeDasharray="2 2.5" /></svg>),
};

/* ------------------------------------------------------------------ *
 * Merkevaremerke
 *
 * Logoen er en ekte fil, ikke tegnet i kode. Kilden ligger i
 * public/logoo.png; public/logo-*.png er beskårne utsnitt i faste
 * størrelser, laget ut fra der pikslene faktisk er.
 *
 * `plain` finnes for steder som trenger merket i én farge. Et bilde kan
 * ikke farges om, så da vises samme fil — kall den bare på lys bakgrunn.
 * ------------------------------------------------------------------ */

export function LogoMark({ size = 38 }) {
  return (
    <img
      className="logomark"
      src="/logo-192.png"
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      decoding="async"
    />
  );
}
