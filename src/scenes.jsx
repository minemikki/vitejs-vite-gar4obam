/*
 * Bildespråk: filmatisk, ikke illustrert.
 *
 * Første versjon tegnet små scener med sol, båt og palme. Det så ut som
 * clipart, og clipart får en reiseside til å se billig ut uansett hvor god
 * typografien er.
 *
 * Denne versjonen etterligner i stedet det som gjør et reisefoto vakkert:
 *   - én lyskilde lavt i bildet, med glød rundt seg
 *   - flere lag silhuetter som blir lysere og mattere bakover (luftperspektiv)
 *   - fargegradering — kald himmel mot varm horisont
 *   - vignett, så øyet trekkes mot midten
 *
 * Ingen ansikter, ingen gjenkjennelige detaljer — bare stemning og dybde.
 * Det leser som et fotografi i øyekroken, og det er hele poenget.
 */

/* ------------------------------------------------------------------ *
 * Byggeklosser
 * ------------------------------------------------------------------ */

const W = 400;
const H = 300;

/** Himmel med to til tre stopp: kjølig oppe, varmt mot horisonten. */
function Sky({ id, stops }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
      {stops.map((s) => (
        <stop key={s.o} offset={s.o} stopColor={s.c} />
      ))}
    </linearGradient>
  );
}

/** Lyskilden. Myk glød som faller av til ingenting. */
function Glow({ id, color }) {
  return (
    <radialGradient id={id} cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stopColor={color} stopOpacity="0.95" />
      <stop offset="0.35" stopColor={color} stopOpacity="0.45" />
      <stop offset="1" stopColor={color} stopOpacity="0" />
    </radialGradient>
  );
}

/**
 * Ett lag i landskapet. Lagene lengst bak er lysest og mattest — det er
 * dis som gjør at avstand leses som avstand.
 */
function Ridge({ d, fill, opacity }) {
  return <path d={d} fill={fill} opacity={opacity} />;
}

/**
 * En atmosfærisk scene.
 * Alle scenene deler samme oppbygning, kun fargegradering og silhuetter
 * skiller dem. Det gjør at de ser ut som bilder fra samme fotograf.
 */
function Atmos({ uid, pAR, label, sky, light, ridges, extras, vignette = 0.5 }) {
  const g = (n) => `${uid}-${n}`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio={pAR}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      className="scene"
    >
      <defs>
        <Sky id={g('sky')} stops={sky} />
        <Glow id={g('glow')} color={light.color} />
        <radialGradient id={g('vig')} cx="0.5" cy="0.46" r="0.78">
          <stop offset="0.45" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity={vignette} />
        </radialGradient>
        <linearGradient id={g('base')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </linearGradient>
      </defs>

      <rect width={W} height={H} fill={`url(#${g('sky')})`} />

      {/* Lyskilden ligger bak landskapet, så silhuettene kutter den. */}
      <ellipse
        cx={light.x}
        cy={light.y}
        rx={light.r * 1.9}
        ry={light.r * 1.5}
        fill={`url(#${g('glow')})`}
      />
      {light.disc !== false && (
        <circle cx={light.x} cy={light.y} r={light.r * 0.32} fill={light.core} opacity="0.9" />
      )}

      {ridges.map((r, i) => (
        <Ridge key={`${r.d.slice(0, 12)}-${i}`} {...r} />
      ))}

      {extras}

      {/* Mørkere mot bunnen, så tekst oppå alltid er lesbar. */}
      <rect y={H * 0.5} width={W} height={H * 0.5} fill={`url(#${g('base')})`} />
      <rect width={W} height={H} fill={`url(#${g('vig')})`} />
    </svg>
  );
}

/* ------------------------------------------------------------------ *
 * Scenene
 * ------------------------------------------------------------------ */

const Islands = (p) => (
  <Atmos
    {...p}
    label="Solnedgang over øyer i Andamanhavet"
    sky={[
      { o: '0', c: '#0d2438' },
      { o: '0.42', c: '#3f4a5c' },
      { o: '0.68', c: '#b5765c' },
      { o: '0.86', c: '#e8a76d' },
      { o: '1', c: '#f2c288' },
    ]}
    light={{ x: 268, y: 196, r: 58, color: '#ffcf8a', core: '#fff0cd' }}
    ridges={[
      { d: 'M-10 206 q80 -34 168 -6 q70 22 132 -8 q60 -28 120 4 l0 120 -420 0z', fill: '#8d7f86', opacity: 0.34 },
      { d: 'M-10 220 q64 -30 130 -4 q54 20 108 -10 q52 -26 102 6 l0 100 -340 0z', fill: '#4c4a5e', opacity: 0.55 },
      { d: 'M300 214 q26 -46 56 -4 q18 22 40 6 l0 92 -120 0z', fill: '#22293a', opacity: 0.9 },
      { d: 'M-10 236 q52 -20 106 2 q46 16 92 -6 q44 -20 88 8 l0 70 -286 0z', fill: '#131a26', opacity: 0.95 },
      { d: 'M-10 262 q90 -14 180 4 q90 16 240 -6 l0 50 -420 0z', fill: '#080d14' },
    ]}
  />
);

const Karst = (p) => (
  <Atmos
    {...p}
    label="Kalksteinsformasjoner i morgendis"
    sky={[
      { o: '0', c: '#16394a' },
      { o: '0.45', c: '#5c7f8a' },
      { o: '0.75', c: '#adc4c2' },
      { o: '1', c: '#d8e0d4' },
    ]}
    light={{ x: 132, y: 176, r: 52, color: '#ffe6c0', core: '#fff8e6', disc: false }}
    ridges={[
      { d: 'M-10 198 q70 -60 118 -4 q30 34 66 -18 q40 -56 84 10 q34 50 82 -6 q40 -46 80 12 l0 110 -430 0z', fill: '#8fa7a8', opacity: 0.3 },
      { d: 'M40 212 q22 -76 48 -4 q14 40 34 -22 q22 -68 48 8 q18 56 44 0 l0 92 -190 0z', fill: '#4d6570', opacity: 0.5 },
      { d: 'M196 210 q30 -104 62 -6 q20 62 48 -8 q26 -66 56 14 l0 96 -178 0z', fill: '#24333d', opacity: 0.82 },
      { d: 'M-10 244 q66 -26 134 2 q64 24 130 -4 q60 -24 122 8 l0 66 -396 0z', fill: '#101a21', opacity: 0.94 },
      { d: 'M-10 272 q110 -12 220 4 q100 14 210 -6 l0 40 -430 0z', fill: '#070d11' },
    ]}
  />
);

const Temple = (p) => (
  <Atmos
    {...p}
    label="Tempelsilhuett i gyllen time"
    sky={[
      { o: '0', c: '#2a1630' },
      { o: '0.38', c: '#6d2f3c' },
      { o: '0.64', c: '#c2603f' },
      { o: '0.85', c: '#e79a55' },
      { o: '1', c: '#f0bb78' },
    ]}
    light={{ x: 296, y: 206, r: 62, color: '#ffbe72', core: '#ffeac2' }}
    ridges={[
      { d: 'M-10 224 q90 -16 190 2 q100 16 240 -8 l0 92 -430 0z', fill: '#7a4a52', opacity: 0.34 },
      { d: 'M-10 238 q80 -12 168 4 q92 14 262 -8 l0 76 -430 0z', fill: '#3d2431', opacity: 0.6 },
    ]}
    extras={
      <g fill="#0b0a12">
        {/* Prang — spissen som gjør Wat Arun gjenkjennelig, sterkt forenklet */}
        <path d="M118 236 L130 132 L142 236z" opacity="0.95" />
        <path d="M126 148 L130 128 L134 148z" opacity="0.95" />
        <path d="M96 238 L104 176 L112 238z" opacity="0.9" />
        <path d="M148 238 L156 172 L164 238z" opacity="0.9" />
        <rect x="92" y="232" width="76" height="8" opacity="0.95" />
        <path d="M-10 250 q84 -12 176 4 q96 14 264 -8 l0 60 -430 0z" />
      </g>
    }
  />
);

const Jungle = (p) => (
  <Atmos
    {...p}
    label="Jungelåser i morgendis"
    sky={[
      { o: '0', c: '#0f2a22' },
      { o: '0.4', c: '#3d5c46' },
      { o: '0.7', c: '#9ab08a' },
      { o: '1', c: '#dfe3c6' },
    ]}
    light={{ x: 282, y: 168, r: 54, color: '#fff0c4', core: '#fffbe8', disc: false }}
    ridges={[
      { d: 'M-10 186 q72 -46 144 -8 q66 34 130 -12 q60 -42 126 8 l0 130 -420 0z', fill: '#93a98c', opacity: 0.3 },
      { d: 'M-10 210 q66 -40 132 -6 q62 30 124 -14 q58 -38 118 10 l0 108 -420 0z', fill: '#4e6a52', opacity: 0.52 },
      { d: 'M-10 236 q60 -32 122 -4 q58 26 116 -10 q56 -32 112 8 l0 84 -420 0z', fill: '#21362a', opacity: 0.82 },
      { d: 'M-10 262 q78 -20 158 2 q78 20 162 -6 l0 56 -420 0z', fill: '#0d1a14' },
    ]}
    extras={
      /* Elefant kun som antydning i forgrunnen — ikke en figur man studerer */
      <g fill="#04120c">
        <ellipse cx="214" cy="264" rx="42" ry="21" />
        <circle cx="174" cy="258" r="16" />
        <path d="M162 266 q-10 13 -5 23 q3 6 8 3" stroke="#04120c" strokeWidth="7.5" fill="none" strokeLinecap="round" />
        <ellipse cx="186" cy="256" rx="10" ry="12" fill="#020b07" />
        <rect x="192" y="278" width="9" height="18" rx="3.5" />
        <rect x="212" y="280" width="9" height="16" rx="3.5" />
        <rect x="232" y="278" width="9" height="18" rx="3.5" />
        <path d="M254 254 q9 7 8 19" stroke="#04120c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </g>
    }
  />
);

const Canopy = (p) => (
  <Atmos
    {...p}
    label="Regnskog i dis"
    sky={[
      { o: '0', c: '#0a2620' },
      { o: '0.42', c: '#2f5c4a' },
      { o: '0.74', c: '#8fb896' },
      { o: '1', c: '#d5e6cf' },
    ]}
    light={{ x: 124, y: 158, r: 50, color: '#e9ffd8', core: '#fbfff0', disc: false }}
    ridges={[
      { d: 'M-10 190 q54 -34 108 -4 q50 28 100 -10 q48 -34 96 6 q46 30 96 -8 l0 130 -420 0z', fill: '#8db894', opacity: 0.28 },
      { d: 'M-10 216 q48 -30 96 -2 q46 26 92 -12 q44 -30 88 8 q44 26 92 -6 l0 108 -420 0z', fill: '#3f6b52', opacity: 0.55 },
      { d: 'M-10 244 q44 -26 88 0 q42 22 84 -10 q42 -26 84 6 q40 24 88 -4 l0 82 -420 0z', fill: '#17372a', opacity: 0.86 },
      { d: 'M-10 270 q70 -16 142 2 q72 18 150 -4 l0 48 -420 0z', fill: '#071410' },
    ]}
  />
);

const City = (p) => (
  <Atmos
    {...p}
    label="Storbyskyline i skumring"
    sky={[
      { o: '0', c: '#120f2c' },
      { o: '0.4', c: '#3a2050' },
      { o: '0.68', c: '#8c3355' },
      { o: '0.88', c: '#cf6a4c' },
      { o: '1', c: '#e79a63' },
    ]}
    light={{ x: 316, y: 214, r: 54, color: '#ff9f66', core: '#ffd9a8' }}
    ridges={[
      { d: 'M-10 232 q88 -14 184 4 q96 16 246 -8 l0 84 -430 0z', fill: '#5e3a56', opacity: 0.34 },
    ]}
    extras={
      <g fill="#080716">
        <rect x="14" y="206" width="22" height="94" />
        <rect x="42" y="182" width="17" height="118" />
        <rect x="64" y="220" width="26" height="80" />
        <rect x="96" y="164" width="20" height="136" />
        <path d="M104 164 l2 -22 2 22z" />
        <rect x="124" y="212" width="24" height="88" />
        <rect x="156" y="192" width="18" height="108" />
        <rect x="182" y="226" width="30" height="74" />
        <rect x="220" y="204" width="20" height="96" />
        <rect x="248" y="176" width="17" height="124" />
        <rect x="272" y="218" width="26" height="82" />
        <rect x="306" y="198" width="19" height="102" />
        <rect x="332" y="228" width="28" height="72" />
        <rect x="368" y="208" width="22" height="92" />
        {/* Noen få opplyste vinduer gir liv uten å bli mønster */}
        <g fill="#ffca85" opacity="0.7">
          <rect x="47" y="196" width="2.5" height="3.5" />
          <rect x="52" y="212" width="2.5" height="3.5" />
          <rect x="101" y="182" width="2.5" height="3.5" />
          <rect x="107" y="206" width="2.5" height="3.5" />
          <rect x="252" y="192" width="2.5" height="3.5" />
          <rect x="258" y="220" width="2.5" height="3.5" />
          <rect x="311" y="216" width="2.5" height="3.5" />
        </g>
      </g>
    }
  />
);

const Arena = (p) => (
  <Atmos
    {...p}
    vignette={0.72}
    label="Boksering under spotlys"
    sky={[
      { o: '0', c: '#0a0d10' },
      { o: '0.5', c: '#1a2228' },
      { o: '1', c: '#0c1114' },
    ]}
    light={{ x: 200, y: 96, r: 74, color: '#ffe2a8', core: '#fff6dc', disc: false }}
    ridges={[]}
    extras={
      <>
        {/* Lyskjegle ned mot ringen */}
        <path d="M200 -10 L108 230 L292 230z" fill="#ffe2a8" opacity="0.11" />
        <path d="M56 236 L344 236 L378 300 L22 300z" fill="#151d23" />
        <rect x="56" y="236" width="288" height="3" fill="#c9a227" opacity="0.7" />
        <g stroke="#3b4a54" strokeWidth="1.6">
          <line x1="56" y1="212" x2="344" y2="212" />
          <line x1="56" y1="224" x2="344" y2="224" />
        </g>
        <rect x="54" y="198" width="4" height="42" fill="#2c3841" />
        <rect x="342" y="198" width="4" height="42" fill="#2c3841" />
        <g fill="#07090b">
          <g transform="translate(172 236)">
            <circle cx="0" cy="-42" r="7" />
            <path d="M-6 -37 q6 26 3 37 l-7 0 q-2 -20 4 -37z" />
            <path d="M5 -37 q9 7 14 2 l-2 -6 q-7 2 -12 -2z" />
          </g>
          <g transform="translate(228 236) scale(-1 1)">
            <circle cx="0" cy="-42" r="7" />
            <path d="M-6 -37 q6 26 3 37 l-7 0 q-2 -20 4 -37z" />
            <path d="M5 -37 q9 7 14 2 l-2 -6 q-7 2 -12 -2z" />
          </g>
        </g>
      </>
    }
  />
);

const Safari = (p) => (
  <Atmos
    {...p}
    label="Savanne i solnedgang"
    sky={[
      { o: '0', c: '#2b1a2e' },
      { o: '0.36', c: '#7a3a35' },
      { o: '0.62', c: '#c9713d' },
      { o: '0.85', c: '#e8a45f' },
      { o: '1', c: '#f3c884' },
    ]}
    light={{ x: 190, y: 200, r: 66, color: '#ffb262', core: '#ffe3ab' }}
    ridges={[
      { d: 'M-10 226 q92 -14 190 2 q98 16 250 -6 l0 90 -430 0z', fill: '#8a5340', opacity: 0.32 },
      { d: 'M-10 244 q86 -12 178 4 q92 14 252 -8 l0 70 -430 0z', fill: '#432a26', opacity: 0.6 },
      { d: 'M-10 264 q100 -10 202 4 q102 12 228 -6 l0 48 -430 0z', fill: '#160e10' },
    ]}
    extras={
      <g fill="#100a0c">
        {/* Akasie — den ene formen som sier «savanne» */}
        <path d="M64 250 q-3 -30 1 -46" stroke="#100a0c" strokeWidth="4" fill="none" strokeLinecap="round" />
        <ellipse cx="65" cy="200" rx="36" ry="11" />
        <path d="M300 250 l0 -30 q0 -22 11 -30 l4 3 q-8 9 -6 25 l5 0 0 32z" opacity="0.94" />
        <path d="M300 250 l19 0 0 -22 -19 0z" opacity="0.94" />
      </g>
    }
  />
);

const Market = (p) => (
  <Atmos
    {...p}
    label="Kanal i morgenlys"
    sky={[
      { o: '0', c: '#152b26' },
      { o: '0.42', c: '#4a6b4a' },
      { o: '0.72', c: '#b09a5e' },
      { o: '1', c: '#e2d29a' },
    ]}
    light={{ x: 250, y: 184, r: 52, color: '#ffe9a8', core: '#fffae0', disc: false }}
    ridges={[
      { d: 'M-10 192 q66 -32 132 -6 q62 24 124 -10 q58 -30 118 8 l0 122 -420 0z', fill: '#7f9270', opacity: 0.3 },
      { d: 'M-10 218 q60 -26 120 -2 q56 20 112 -10 q54 -24 110 8 l0 100 -420 0z', fill: '#3c5440', opacity: 0.56 },
      { d: 'M-10 242 q56 -18 112 0 q54 16 108 -8 q52 -18 106 6 l0 78 -420 0z', fill: '#182b20', opacity: 0.86 },
      { d: 'M-10 268 q80 -12 162 2 q80 14 168 -4 l0 46 -420 0z', fill: '#0a150f' },
    ]}
    extras={
      /* To longtailbåter som mørke former i forgrunnen */
      <g fill="#050d09">
        <path d="M96 272 q34 15 74 0 l-9 11 q-28 8 -56 0z" />
        <path d="M232 280 q28 12 60 0 l-7 9 q-23 7 -46 0z" opacity="0.9" />
      </g>
    }
  />
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

export function Scene({ name, uid, align = 'center' }) {
  const Cmp = SCENES[name] || Islands;
  const pAR = align === 'bottom' ? 'xMidYMax slice' : 'xMidYMid slice';
  return <Cmp uid={uid || name} pAR={pAR} />;
}

/* ------------------------------------------------------------------ *
 * Hero — bred, mørk, filmatisk
 * ------------------------------------------------------------------ */

export function HeroScene() {
  const u = 'hero';
  const g = (n) => `${u}-${n}`;
  return (
    <svg
      className="hero-scene"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Solnedgang over øyer i Andamanhavet"
    >
      <defs>
        <linearGradient id={g('sky')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#071021" />
          <stop offset="0.18" stopColor="#152740" />
          <stop offset="0.34" stopColor="#3c4360" />
          <stop offset="0.46" stopColor="#8a5a62" />
          <stop offset="0.54" stopColor="#c67a55" />
          <stop offset="0.6" stopColor="#e8a86c" />
          <stop offset="0.66" stopColor="#f5cf95" />
          <stop offset="1" stopColor="#2a2438" />
        </linearGradient>

        <radialGradient id={g('glow')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd9a0" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#ffb877" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ff9d5c" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={g('water')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4a3f45" />
          <stop offset="0.4" stopColor="#241f2b" />
          <stop offset="1" stopColor="#0b0d14" />
        </linearGradient>

        <linearGradient id={g('shimmer')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd39a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd39a" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={g('vig')} cx="0.5" cy="0.44" r="0.8">
          <stop offset="0.4" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.62" />
        </radialGradient>

        {/* Filmkorn. Én instans i hele appen — nok til å gi tekstur,
            billig nok til at scrollingen forblir jevn. */}
        <filter id={g('blur')} x="-40%" y="-20%" width="180%" height="140%">
          <feGaussianBlur stdDeviation="7" />
        </filter>

        <filter id={g('grain')} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill={`url(#${g('sky')})`} />

      {/* Horisonten ligger midt i bildet, ikke nede i hjørnet. Da fyller
          solnedgangen flaten i stedet for å etterlate en mørk, tom topp. */}
      <ellipse cx="1330" cy="514" rx="480" ry="340" fill={`url(#${g('glow')})`} />
      <circle cx="1330" cy="524" r="52" fill="#ffeec9" opacity="0.95" />

      {/* Fjerne åser — nesten oppløst i dis */}
      <path
        d="M-20 452 q210 -96 420 -20 q176 64 366 -16 q192 -80 404 24 q136 62 386 -6 l0 480 -1640 0z"
        fill="#a2909a"
        opacity="0.24"
      />
      <path
        d="M-20 486 q196 -76 392 -12 q166 56 344 -14 q186 -72 382 20 q146 54 372 -4 l0 440 -1640 0z"
        fill="#63596c"
        opacity="0.42"
      />

      {/* Nære øyer, med solen bak seg */}
      <path d="M1104 500 q56 -104 118 -8 q30 46 76 12 l0 400 -296 0z" fill="#1e2431" opacity="0.9" />
      <path d="M120 500 q80 -92 164 -6 q48 50 112 8 l0 396 -336 0z" fill="#1a202c" opacity="0.94" />

      {/* Vann */}
      <rect y="512" width="1600" height="388" fill={`url(#${g('water')})`} />
      {/* Speilingen brytes opp av bølger. Én sammenhengende form leste som
          et objekt i vannet; flere flate striper leser som lys. */}
      <g fill="#ffd9a2" filter={`url(#${g('blur')})`}>
        <ellipse cx="1330" cy="536" rx="58" ry="6" opacity="0.42" />
        <ellipse cx="1320" cy="552" rx="44" ry="5" opacity="0.34" />
        <ellipse cx="1342" cy="568" rx="62" ry="5" opacity="0.28" />
        <ellipse cx="1316" cy="586" rx="36" ry="4" opacity="0.22" />
        <ellipse cx="1346" cy="604" rx="54" ry="4" opacity="0.17" />
        <ellipse cx="1324" cy="624" rx="32" ry="4" opacity="0.13" />
        <ellipse cx="1348" cy="646" rx="46" ry="3" opacity="0.1" />
        <ellipse cx="1330" cy="670" rx="28" ry="3" opacity="0.07" />
      </g>

      {/* Longtailbåt — gir målestokk og et menneskelig spor */}
      <g fill="#04060b" opacity="0.95">
        <path d="M330 668 q74 29 184 0 l-23 24 q-69 17 -138 0z" />
        <rect x="416" y="620" width="6" height="48" />
        <path d="M422 623 l70 -24 -64 40z" fill="#8a3626" opacity="0.85" />
      </g>

      {/* Forgrunn — mørkest og skarpest, det er slik dybde leses */}
      <path
        d="M-20 700 q240 -40 480 -8 q250 34 520 -10 q240 -38 640 12 l0 216 -1640 0z"
        fill="#060910"
      />

      <rect width="1600" height="900" fill={`url(#${g('vig')})`} />
      <rect width="1600" height="900" filter={`url(#${g('grain')})`} opacity="0.055" />
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
 * ------------------------------------------------------------------ */

export function LogoMark({ size = 38, plain = false }) {
  const stroke = plain ? 'currentColor' : 'var(--gold-soft)';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {!plain && <rect width="48" height="48" rx="13" fill="var(--emerald-900)" />}
      <g fill="none" stroke={stroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13.5 33.5c-1.2-6.4 2.2-11.6 8.4-12.4 5.6-.7 9.8 2.2 11 6.6" />
        <path d="M13.5 33.5c-2.4-1-3.4-3.3-2.6-5.6.7-2 2.5-3 4.3-2.6" />
        <path d="M11.2 27.6c-1.7 1.7-2.3 4-1.6 6.2.5 1.6 1.9 2.5 3.2 2" />
        <path d="M19.6 22.2c2.4.6 3.8 2.8 3.3 5.2-.4 2-2 3.3-3.8 3.2" />
        <path d="M32.9 27.7c1.9 1 3 2.9 3 5.1" />
        <path d="M35.9 32.8c1.5-.3 2.6-1.5 2.7-3" />
        <path d="M17.4 33.9v3.8M23.6 34.6v3.4M29.4 34.4v3.6M34.4 34.2v3.5" />
        <path d="M16.4 28.2h.02" strokeWidth="2.6" />
      </g>
    </svg>
  );
}
