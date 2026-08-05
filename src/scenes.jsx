/*
 * Håndtegnede vektorscener — vår egen kunststil for hver opplevelse.
 * Ingen eksterne bilder: alt er SVG, så det ser knivskarpt ut overalt og
 * laster umiddelbart. Lisensfritt fordi vi har tegnet det selv.
 *
 * Hver scene deler samme språk: himmelgradient, sol/lys-glød, lagdelte
 * silhuetter for dybde, en forgrunnsform, fin kornstruktur og en myk
 * bunn-gradient som gjør tekst lesbar oppå.
 */

function Grain({ id, opacity = 0.06 }) {
  return (
    <>
      <filter id={id}>
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.7 0" />
      </filter>
      <rect
        x="0"
        y="0"
        width="400"
        height="300"
        filter={`url(#${id})`}
        opacity={opacity}
      />
    </>
  );
}

function Scrim({ from = 0.34 }) {
  return (
    <rect
      x="0"
      y="150"
      width="400"
      height="150"
      fill="url(#scrim-grad)"
      opacity={from}
    />
  );
}

const svgProps = {
  viewBox: '0 0 400 300',
  preserveAspectRatio: 'xMidYMid slice',
  xmlns: 'http://www.w3.org/2000/svg',
  role: 'img',
};

/* ---------------- Individual scenes ---------------- */

function Islands({ uid }) {
  return (
    <svg {...svgProps} className="scene" aria-label="Tropiske øyer og hav">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd69e" />
          <stop offset="0.55" stopColor="#ffe9c9" />
          <stop offset="1" stopColor="#c8efe6" />
        </linearGradient>
        <linearGradient id={`${uid}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#38c0b6" />
          <stop offset="1" stopColor="#0c8a90" />
        </linearGradient>
        <radialGradient id={`${uid}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff6e0" />
          <stop offset="0.5" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="scrim-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#052722" stopOpacity="0" />
          <stop offset="1" stopColor="#052722" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />
      <circle cx="300" cy="92" r="80" fill={`url(#${uid}-sun)`} />
      <circle cx="300" cy="92" r="30" fill="#fff3d6" />
      {/* far island */}
      <path d="M-10 190 q70 -60 150 -6 q40 26 90 6 l0 40 -230 0z" fill="#7fd0c4" opacity="0.6" />
      <rect y="188" width="400" height="112" fill={`url(#${uid}-sea)`} />
      {/* islands */}
      <path d="M40 188 q26 -66 58 -2z" fill="#0f6d63" />
      <path d="M250 188 q40 -84 88 -2z" fill="#0f6d63" />
      <path d="M300 188 q22 -40 44 -2z" fill="#0b574f" />
      {/* sun reflection */}
      <rect x="288" y="190" width="24" height="96" fill="#ffe6ad" opacity="0.5" />
      {/* longtail boat */}
      <g fill="#08302b">
        <path d="M150 250 q30 16 78 0 l-10 12 q-28 8 -58 0z" />
        <rect x="186" y="226" width="3" height="26" />
        <path d="M189 228 l34 -12 -30 20z" fill="#ff6a3d" />
      </g>
      <Grain id={`${uid}-g`} />
      <Scrim />
    </svg>
  );
}

function Karst({ uid }) {
  return (
    <svg {...svgProps} className="scene" aria-label="Kalksteinsformasjoner i Phang Nga">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfe6ea" />
          <stop offset="0.6" stopColor="#e9f6ef" />
          <stop offset="1" stopColor="#bfeae2" />
        </linearGradient>
        <linearGradient id={`${uid}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3bb6bf" />
          <stop offset="1" stopColor="#127a86" />
        </linearGradient>
        <linearGradient id={`${uid}-rock`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c8574" />
          <stop offset="1" stopColor="#0a5348" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />
      <circle cx="70" cy="70" r="34" fill="#fff2cf" opacity="0.85" />
      {/* haze hills */}
      <path d="M-10 200 q80 -40 160 0 t250 0 l0 20 -420 0z" fill="#a9ddd3" opacity="0.55" />
      <rect y="196" width="400" height="104" fill={`url(#${uid}-sea)`} />
      {/* the iconic leaning pillar */}
      <path d="M210 196 C204 120 224 60 236 20 C246 66 248 140 252 196z" fill={`url(#${uid}-rock)`} />
      <path d="M96 196 q18 -70 40 -2z" fill="#0e6c60" />
      <path d="M320 196 q26 -96 54 -2z" fill={`url(#${uid}-rock)`} />
      {/* kayak */}
      <g fill="#08302b">
        <path d="M120 244 q34 12 74 0 l-8 9 q-28 7 -58 0z" />
        <rect x="150" y="230" width="4" height="14" opacity="0.9" />
      </g>
      <path d="M150 232 l-18 -6 18 -2z" fill="#ff6a3d" />
      <Grain id={`${uid}-g`} />
      <Scrim />
    </svg>
  );
}

function Temple({ uid }) {
  return (
    <svg {...svgProps} className="scene" aria-label="Tempel i solnedgang">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff9e7a" />
          <stop offset="0.5" stopColor="#ffcf95" />
          <stop offset="1" stopColor="#ffe9c0" />
        </linearGradient>
        <linearGradient id={`${uid}-temple`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a3f22" />
          <stop offset="1" stopColor="#3e1f12" />
        </linearGradient>
        <linearGradient id={`${uid}-river`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#caa06a" />
          <stop offset="1" stopColor="#8a6a3f" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />
      <circle cx="120" cy="96" r="46" fill="#fff2cf" />
      <circle cx="120" cy="96" r="70" fill="#ffd98a" opacity="0.35" />
      {/* prang (Wat Arun) */}
      <g fill={`url(#${uid}-temple)`}>
        <path d="M242 210 L262 60 L282 210z" />
        <path d="M256 96 L262 74 L268 96z" fill="#5a2f1a" />
        <rect x="252" y="200" width="20" height="12" />
        <path d="M300 210 L312 120 L324 210z" opacity="0.92" />
        <path d="M204 210 L214 132 L224 210z" opacity="0.92" />
      </g>
      {/* base terrace */}
      <rect x="196" y="206" width="140" height="10" fill="#4a2716" />
      <rect y="216" width="400" height="84" fill={`url(#${uid}-river)`} />
      {/* reflection */}
      <path d="M242 216 L262 300 L282 216z" fill="#b98f56" opacity="0.5" />
      <Grain id={`${uid}-g`} opacity="0.05" />
      <Scrim from="0.4" />
    </svg>
  );
}

function Jungle({ uid }) {
  return (
    <svg {...svgProps} className="scene" aria-label="Jungel med elefant">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dff1d6" />
          <stop offset="1" stopColor="#f3f7d9" />
        </linearGradient>
        <linearGradient id={`${uid}-h1`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8fd08a" />
          <stop offset="1" stopColor="#5fb173" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />
      <circle cx="320" cy="80" r="36" fill="#fff4d0" opacity="0.9" />
      {/* misty layered hills */}
      <path d="M-10 150 q100 -46 200 0 t220 0 l0 160 -420 0z" fill="#bfe3ab" opacity="0.7" />
      <path d="M-10 186 q120 -52 240 0 t200 0 l0 130 -430 0z" fill="#8ccf8b" opacity="0.85" />
      <path d="M-10 220 q140 -40 260 0 t180 0 l0 90 -440 0z" fill={`url(#${uid}-h1)`} />
      {/* elephant silhouette */}
      <g fill="#0c4b39">
        <path d="M150 268 q-6 -40 30 -44 q40 -6 52 16 q16 2 18 18 l-2 12 -6 0 -2 -10 -10 0 -2 10 -8 0 -1 -10 -30 0 -2 10 -8 0 -1 -10 q-8 -2 -8 -10z" />
        <path d="M180 244 q-14 6 -12 22 l4 0 q0 -12 10 -16z" fill="#0a3f30" />
      </g>
      {/* palm */}
      <g stroke="#0c4b39" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M60 270 q-4 -34 6 -54" />
      </g>
      <g fill="#0c4b39">
        <path d="M66 214 q-30 -12 -40 2 q26 -4 40 6z" />
        <path d="M66 214 q30 -12 40 2 q-26 -4 -40 6z" />
        <path d="M66 214 q-14 -30 -2 -42 q10 22 2 42z" />
      </g>
      <Grain id={`${uid}-g`} />
      <Scrim />
    </svg>
  );
}

function Canopy({ uid }) {
  return (
    <svg {...svgProps} className="scene" aria-label="Zipline over regnskogen">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c9ecd6" />
          <stop offset="1" stopColor="#eaf6d9" />
        </linearGradient>
        <linearGradient id={`${uid}-canopy`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3fa06a" />
          <stop offset="1" stopColor="#1f6f46" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />
      <circle cx="70" cy="66" r="30" fill="#fff4d0" opacity="0.9" />
      {/* zipline cable + rider */}
      <line x1="10" y1="70" x2="390" y2="150" stroke="#0c4b39" strokeWidth="2" />
      <g transform="translate(220 118)" fill="#08302b">
        <rect x="-2" y="-8" width="4" height="10" />
        <circle cx="0" cy="8" r="7" />
        <path d="M-7 8 q7 14 14 0" fill="#ff6a3d" />
      </g>
      {/* layered treetops */}
      <path d="M-10 210 q40 -40 80 0 q40 -44 90 0 q44 -40 90 0 q44 -44 96 0 l0 100 -456 0z" fill="#7bc38a" opacity="0.75" />
      <path d="M-10 240 q46 -40 96 0 q46 -44 100 0 q46 -40 100 0 q46 -44 100 0 l0 70 -496 0z" fill={`url(#${uid}-canopy)`} />
      <Grain id={`${uid}-g`} />
      <Scrim />
    </svg>
  );
}

function City({ uid }) {
  return (
    <svg {...svgProps} className="scene" aria-label="Bangkok i skumring">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b2a63" />
          <stop offset="0.5" stopColor="#a8496a" />
          <stop offset="1" stopColor="#ffb26a" />
        </linearGradient>
        <linearGradient id={`${uid}-city`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1c3f" />
          <stop offset="1" stopColor="#160f24" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />
      <circle cx="300" cy="120" r="34" fill="#ffd98a" opacity="0.9" />
      <circle cx="300" cy="120" r="60" fill="#ffb765" opacity="0.3" />
      {/* skyline */}
      <g fill={`url(#${uid}-city)`}>
        <rect x="20" y="150" width="26" height="150" />
        <rect x="54" y="120" width="20" height="180" />
        <rect x="80" y="170" width="30" height="130" />
        <rect x="120" y="96" width="24" height="204" />
        <path d="M132 96 l-6 -22 6 22z" />
        <rect x="156" y="160" width="28" height="140" />
        <rect x="196" y="130" width="22" height="170" />
        <rect x="226" y="176" width="34" height="124" />
        <rect x="272" y="150" width="24" height="150" />
        <rect x="306" y="118" width="20" height="182" />
        <rect x="332" y="166" width="30" height="134" />
        <rect x="368" y="140" width="22" height="160" />
      </g>
      {/* warm windows */}
      <g fill="#ffcf7a" opacity="0.85">
        <rect x="60" y="140" width="3" height="4" />
        <rect x="66" y="152" width="3" height="4" />
        <rect x="126" y="120" width="3" height="4" />
        <rect x="126" y="140" width="3" height="4" />
        <rect x="203" y="150" width="3" height="4" />
        <rect x="312" y="138" width="3" height="4" />
      </g>
      {/* string lanterns */}
      <path d="M0 120 q120 40 400 4" stroke="#ff6a3d" strokeWidth="1.5" fill="none" opacity="0.6" />
      <g fill="#ff8a4d">
        <circle cx="90" cy="128" r="3.4" />
        <circle cx="170" cy="132" r="3.4" />
        <circle cx="250" cy="128" r="3.4" />
      </g>
      <Grain id={`${uid}-g`} opacity="0.05" />
      <Scrim from="0.2" />
    </svg>
  );
}

function Arena({ uid }) {
  return (
    <svg {...svgProps} className="scene" aria-label="Muay Thai-arena">
      <defs>
        <radialGradient id={`${uid}-spot`} cx="0.5" cy="0.1" r="0.9">
          <stop offset="0" stopColor="#3a4a55" />
          <stop offset="1" stopColor="#0d151b" />
        </radialGradient>
        <linearGradient id={`${uid}-beam`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe6a8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffe6a8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-spot)`} />
      {/* spotlight beam */}
      <path d="M200 0 L120 240 L280 240z" fill={`url(#${uid}-beam)`} />
      {/* ring floor */}
      <path d="M60 240 L340 240 L380 300 L20 300z" fill="#1b2831" />
      <path d="M60 240 L340 240 L340 246 L60 246z" fill="#ff6a3d" opacity="0.85" />
      {/* ropes */}
      <g stroke="#5a6b76" strokeWidth="2">
        <line x1="60" y1="212" x2="340" y2="212" />
        <line x1="60" y1="226" x2="340" y2="226" />
      </g>
      <rect x="58" y="196" width="5" height="50" fill="#40515b" />
      <rect x="337" y="196" width="5" height="50" fill="#40515b" />
      {/* two fighters */}
      <g fill="#0b1216">
        <g transform="translate(168 240)">
          <circle cx="0" cy="-46" r="8" />
          <path d="M-7 -40 q7 30 3 40 l-8 0 q-2 -22 5 -40z" />
          <path d="M6 -40 q10 8 16 2 l-3 -6 q-8 2 -13 -2z" />
        </g>
        <g transform="translate(232 240) scale(-1 1)">
          <circle cx="0" cy="-46" r="8" />
          <path d="M-7 -40 q7 30 3 40 l-8 0 q-2 -22 5 -40z" />
          <path d="M6 -40 q10 8 16 2 l-3 -6 q-8 2 -13 -2z" />
        </g>
      </g>
      <Grain id={`${uid}-g`} opacity="0.08" />
    </svg>
  );
}

function Safari({ uid }) {
  return (
    <svg {...svgProps} className="scene" aria-label="Safari i solnedgang">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb24d" />
          <stop offset="0.6" stopColor="#ffd98a" />
          <stop offset="1" stopColor="#fff0cf" />
        </linearGradient>
        <linearGradient id={`${uid}-ground`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c98a3a" />
          <stop offset="1" stopColor="#9a6526" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />
      <circle cx="210" cy="130" r="52" fill="#fff3d0" />
      <circle cx="210" cy="130" r="80" fill="#ffcf7a" opacity="0.4" />
      <rect y="196" width="400" height="104" fill={`url(#${uid}-ground)`} />
      {/* acacia tree */}
      <g fill="#5a3417">
        <path d="M62 196 q-2 -40 0 -60" stroke="#5a3417" strokeWidth="5" fill="none" strokeLinecap="round" />
        <ellipse cx="62" cy="128" rx="42" ry="14" />
      </g>
      {/* giraffe */}
      <g fill="#4a2a12">
        <path d="M300 196 l0 -40 q0 -30 14 -40 l6 4 q-10 12 -8 34 l6 0 0 42z" />
        <path d="M300 196 l24 0 0 -30 -24 0z" />
        <rect x="302" y="188" width="4" height="8" />
        <rect x="318" y="188" width="4" height="8" />
      </g>
      <Grain id={`${uid}-g`} opacity="0.05" />
      <Scrim from="0.3" />
    </svg>
  );
}

function Market({ uid }) {
  return (
    <svg {...svgProps} className="scene" aria-label="Flytende marked">
      <defs>
        <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe0b0" />
          <stop offset="1" stopColor="#eaf5da" />
        </linearGradient>
        <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8bbf7e" />
          <stop offset="1" stopColor="#4d8a5e" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#${uid}-sky)`} />
      <circle cx="330" cy="70" r="28" fill="#fff3d0" opacity="0.9" />
      {/* leafy bank */}
      <path d="M-10 150 q60 -30 130 -6 q60 20 130 -4 q80 -26 160 4 l0 40 -430 0z" fill="#2f7d4a" opacity="0.85" />
      <rect y="176" width="400" height="124" fill={`url(#${uid}-water)`} />
      {/* boats with baskets of fruit */}
      <g>
        <g transform="translate(120 210)">
          <path d="M-40 0 q40 20 80 0 l-8 12 q-32 10 -64 0z" fill="#5a3417" />
          <circle cx="-14" cy="-4" r="6" fill="#ff6a3d" />
          <circle cx="0" cy="-6" r="6" fill="#f6b500" />
          <circle cx="14" cy="-4" r="6" fill="#e0552f" />
          <path d="M-2 -6 q2 -18 4 -22" stroke="#3e1f12" strokeWidth="2" fill="none" />
        </g>
        <g transform="translate(258 226) scale(0.85)">
          <path d="M-40 0 q40 20 80 0 l-8 12 q-32 10 -64 0z" fill="#4a2a12" />
          <circle cx="-12" cy="-4" r="6" fill="#f6b500" />
          <circle cx="4" cy="-5" r="6" fill="#3fa06a" />
          <circle cx="18" cy="-3" r="5" fill="#ff6a3d" />
        </g>
      </g>
      <Grain id={`${uid}-g`} />
      <Scrim from="0.28" />
    </svg>
  );
}

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

export function Scene({ name, uid }) {
  const Cmp = SCENES[name] || Islands;
  return <Cmp uid={uid || name} />;
}

/* ---------------- Wide hero scene ---------------- */

export function HeroScene() {
  const u = 'hero';
  return (
    <svg
      className="hero-scene"
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Solnedgang over tropiske øyer i Thailand"
    >
      <defs>
        <linearGradient id={`${u}-sky`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffb877" />
          <stop offset="0.4" stopColor="#ffd6a0" />
          <stop offset="0.72" stopColor="#ffeccb" />
          <stop offset="1" stopColor="#bfeee2" />
        </linearGradient>
        <linearGradient id={`${u}-sea`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#37c1b6" />
          <stop offset="1" stopColor="#0c7f88" />
        </linearGradient>
        <radialGradient id={`${u}-sun`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff7e2" />
          <stop offset="0.45" stopColor="#ffd074" />
          <stop offset="1" stopColor="#ffd074" stopOpacity="0" />
        </radialGradient>
        <filter id={`${u}-grain`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.6 0" />
        </filter>
      </defs>
      <rect width="1440" height="820" fill={`url(#${u}-sky)`} />
      <circle cx="1050" cy="300" r="260" fill={`url(#${u}-sun)`} />
      <circle cx="1050" cy="300" r="92" fill="#fff4d6" />
      {/* birds */}
      <g stroke="#0b4a41" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M300 190 q14 -12 28 0 q14 -12 28 0" />
        <path d="M360 150 q10 -9 20 0 q10 -9 20 0" />
      </g>
      {/* far haze islands */}
      <path d="M-20 560 q220 -120 470 -20 q200 80 460 -20 q220 -84 540 20 l0 300 -1930 0z" fill="#8fd8cd" opacity="0.5" />
      <rect y="548" width="1440" height="272" fill={`url(#${u}-sea)`} />
      {/* sun reflection */}
      <rect x="1006" y="552" width="88" height="250" fill="#ffe7ad" opacity="0.45" />
      {/* islands */}
      <path d="M120 548 q90 -220 200 -6z" fill="#0f6d63" />
      <path d="M980 548 q150 -300 320 -6z" fill="#0f6d63" />
      <path d="M1120 548 q80 -150 170 -6z" fill="#0b574f" />
      {/* longtail boat */}
      <g fill="#07332d">
        <path d="M520 690 q110 60 280 0 l-36 44 q-100 30 -208 0z" />
        <rect x="648" y="596" width="10" height="96" />
        <path d="M658 600 l120 -44 -108 72z" fill="#ff6a3d" />
      </g>
      <rect width="1440" height="820" filter={`url(#${u}-grain)`} opacity="0.05" />
    </svg>
  );
}

/* ---------------- Icon set (thin stroke, no emoji) ---------------- */

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
  chat: (p) => (
    <svg {...ic} {...p}>
      <path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12z" />
      <path d="M8.5 11h7M8.5 14h4" />
    </svg>
  ),
  tag: (p) => (
    <svg {...ic} {...p}>
      <path d="M3 12V4h8l9 9-8 8-9-9z" />
      <circle cx="7.5" cy="7.5" r="1.3" />
    </svg>
  ),
  compass: (p) => (
    <svg {...ic} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11z" />
    </svg>
  ),
  shield: (p) => (
    <svg {...ic} {...p}>
      <path d="M12 3l7 3v5c0 4.4-3 7.7-7 9-4-1.3-7-4.6-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  star: (p) => (
    <svg {...ic} fill="currentColor" stroke="none" {...p}>
      <path d="M12 3.6l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6L7.6 22l.9-5.5-4-3.9 5.5-.8z" />
    </svg>
  ),
  clock: (p) => (
    <svg {...ic} {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  pin: (p) => (
    <svg {...ic} {...p}>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  ),
  heart: (p) => (
    <svg {...ic} {...p}>
      <path d="M12 20s-7-4.3-9.2-8.6C1.3 8.1 3 5 6.1 5c1.9 0 3.1 1 3.9 2 .8-1 2-2 3.9-2 3.1 0 4.8 3.1 3.3 6.4C19 15.7 12 20 12 20z" />
    </svg>
  ),
  check: (p) => (
    <svg {...ic} {...p}>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  ),
  arrow: (p) => (
    <svg {...ic} {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  search: (p) => (
    <svg {...ic} {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  ),
};

/* ---------------- Brand mark ---------------- */

export function LogoMark({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0e7c67" />
          <stop offset="1" stopColor="#08463a" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="12" fill="url(#logo-g)" />
      <circle cx="20" cy="16" r="7.5" fill="#f6b500" />
      <path d="M7 27c4.5-5 21.5-5 26 0" fill="none" stroke="#ff6a3d" strokeWidth="3" strokeLinecap="round" />
      <path d="M9 31c4-4 18-4 22 0" fill="none" stroke="#ffd6a0" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
