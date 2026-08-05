// Kuraterte opplevelser. Pris i NOK.
// scene: hvilken håndtegnet vektorscene som vises på kortet (se scenes.jsx).
// bookingUrl: legg inn din affiliate-/booking-lenke (Klook, GetYourGuide, Viator
// eller egen kontrakt). Er den tom, åpnes forespørselsskjemaet i stedet.
export const experiences = [
  {
    id: 'elephant-chiangmai',
    title: 'Etisk elefantreservat',
    place: 'Chiang Mai',
    category: 'Natur & dyr',
    scene: 'jungle',
    duration: 'Heldag',
    rating: 4.9,
    reviews: 1284,
    priceNOK: 890,
    oldPriceNOK: 1090,
    blurb:
      'Mat og bad elefantene i et sertifisert reservat uten ridning. Henting på hotellet og lunsj inkludert.',
    tags: ['Familievennlig', 'Etisk', 'Henting inkl.'],
    bestseller: true,
    bookingUrl: '',
  },
  {
    id: 'phiphi-maya',
    title: 'Phi Phi & Maya Bay speedbåt',
    place: 'Phuket',
    category: 'Øyer & strender',
    scene: 'islands',
    duration: 'Heldag',
    rating: 4.8,
    reviews: 2041,
    priceNOK: 1190,
    oldPriceNOK: 1390,
    blurb:
      'Snorkling, skjulte laguner og lunsj på stranden. Besøk de mest ikoniske øyene i Andamanhavet.',
    tags: ['Snorkling', 'Lunsj inkl.', 'Bestselger'],
    bestseller: true,
    bookingUrl: '',
  },
  {
    id: 'cooking-bangkok',
    title: 'Thai matlagingskurs + marked',
    place: 'Bangkok',
    category: 'Mat & kultur',
    scene: 'city',
    duration: '4 timer',
    rating: 4.9,
    reviews: 876,
    priceNOK: 640,
    oldPriceNOK: null,
    blurb:
      'Handle på et lokalt marked og lag fem klassiske retter med en lokal kokk. Oppskrifter på norsk.',
    tags: ['Liten gruppe', 'Vegetar-mulig'],
    bestseller: false,
    bookingUrl: '',
  },
  {
    id: 'temple-bangkok',
    title: 'Tempeltur: Wat Arun & Storpalasset',
    place: 'Bangkok',
    category: 'Mat & kultur',
    scene: 'temple',
    duration: 'Halvdag',
    rating: 4.7,
    reviews: 1533,
    priceNOK: 550,
    oldPriceNOK: 650,
    blurb:
      'Norsktalende guide tar deg gjennom byens vakreste templer, med historien bak hvert sted.',
    tags: ['Norsk guide', 'Inngang inkl.'],
    bestseller: false,
    bookingUrl: '',
  },
  {
    id: 'jamesbond-phuket',
    title: 'James Bond Island & kajakk',
    place: 'Phang Nga',
    category: 'Øyer & strender',
    scene: 'karst',
    duration: 'Heldag',
    rating: 4.8,
    reviews: 967,
    priceNOK: 980,
    oldPriceNOK: null,
    blurb:
      'Padle mellom dramatiske kalksteinsformasjoner i Phang Nga-bukten. Buffélunsj om bord.',
    tags: ['Kajakk', 'Lunsj inkl.'],
    bestseller: false,
    bookingUrl: '',
  },
  {
    id: 'muaythai-bangkok',
    title: 'Muay Thai — Rajadamnern Stadium',
    place: 'Bangkok',
    category: 'Adrenalin',
    scene: 'arena',
    duration: 'Kveld',
    rating: 4.6,
    reviews: 612,
    priceNOK: 490,
    oldPriceNOK: null,
    blurb:
      'VIP-billetter til ekte Muay Thai på Thailands mest legendariske arena. Ringside-plasser.',
    tags: ['VIP', 'Kveldsaktivitet'],
    bestseller: false,
    bookingUrl: '',
  },
  {
    id: 'safariworld-bangkok',
    title: 'Safari World & Marine Park',
    place: 'Bangkok',
    category: 'Familie',
    scene: 'safari',
    duration: 'Heldag',
    rating: 4.5,
    reviews: 1120,
    priceNOK: 720,
    oldPriceNOK: 860,
    blurb:
      'Kjør safari blant løver og giraffer, og se delfin- og sjøløveshow. Perfekt for barnefamilier.',
    tags: ['Familievennlig', 'Show inkl.'],
    bestseller: false,
    bookingUrl: '',
  },
  {
    id: 'zipline-chiangmai',
    title: 'Zipline jungel-eventyr',
    place: 'Chiang Mai',
    category: 'Adrenalin',
    scene: 'canopy',
    duration: 'Halvdag',
    rating: 4.8,
    reviews: 734,
    priceNOK: 850,
    oldPriceNOK: null,
    blurb:
      'Fly gjennom regnskogen på over 30 plattformer. Sertifiserte guider og alt utstyr inkludert.',
    tags: ['Adrenalin', 'Henting inkl.'],
    bestseller: false,
    bookingUrl: '',
  },
  {
    id: 'floating-market',
    title: 'Flytende marked + jernbanemarked',
    place: 'Ratchaburi',
    category: 'Mat & kultur',
    scene: 'market',
    duration: 'Heldag',
    rating: 4.7,
    reviews: 903,
    priceNOK: 610,
    oldPriceNOK: 720,
    blurb:
      'Opplev Damnoen Saduak fra langbåt og det berømte markedet på togskinnene. Fotoparadis.',
    tags: ['Kultur', 'Henting inkl.'],
    bestseller: false,
    bookingUrl: '',
  },
];

export const categories = [
  'Alle',
  'Natur & dyr',
  'Øyer & strender',
  'Mat & kultur',
  'Adrenalin',
  'Familie',
];

export const destinations = [
  { name: 'Bangkok', scene: 'temple', count: 24 },
  { name: 'Phuket', scene: 'islands', count: 19 },
  { name: 'Chiang Mai', scene: 'jungle', count: 16 },
  { name: 'Krabi', scene: 'karst', count: 12 },
  { name: 'Koh Samui', scene: 'canopy', count: 11 },
  { name: 'Pattaya', scene: 'city', count: 9 },
];

// PLASSHOLDER-anmeldelser — bytt ut med ekte kundeanmeldelser før lansering.
export const testimonials = [
  {
    name: 'Kari',
    city: 'Oslo',
    initials: 'K',
    text: 'Elefantparken var årets høydepunkt for hele familien. Alt var ordnet på forhånd, og vi fikk svar på norsk innen minutter.',
    exp: 'Etisk elefantreservat',
  },
  {
    name: 'Ola',
    city: 'Bergen',
    initials: 'O',
    text: 'Matkurset i Bangkok var utrolig gøy. Digg å slippe å tolke engelske oppskrifter — alt kom på norsk.',
    exp: 'Thai matlagingskurs',
  },
  {
    name: 'Ingrid',
    city: 'Trondheim',
    initials: 'I',
    text: 'Booket Phi Phi-turen kvelden før. Superenkelt, betalte i kroner, og guiden ventet på oss på hotellet.',
    exp: 'Phi Phi & Maya Bay',
  },
];

/* ------------------------------------------------------------------ *
 * Avledede felter og detaljinnhold.
 * Holdt adskilt fra listen over så kortene forblir enkle å redigere.
 * ------------------------------------------------------------------ */

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/æ/g, 'ae').replace(/ø/g, 'oe').replace(/å/g, 'aa')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Felles detaljer. Kan overstyres per opplevelse i `details` under.
const defaultDetails = {
  highlights: [],
  included: ['Profesjonell guide', 'Alle inngangsbilletter', 'Forsikring'],
  excluded: ['Personlige utgifter', 'Tips (frivillig)'],
  meeting: 'Henting på hotellet i sentrumsområdet, eller oppmøte etter avtale.',
  cancellation:
    'Gratis avbestilling inntil 24 timer før start. Ved avbestilling senere enn dette refunderes ikke beløpet.',
  languages: ['Norsk', 'Engelsk'],
  groupSize: 'Maks 20 personer',
};

const details = {
  'elephant-chiangmai': {
    highlights: [
      'Mate elefantene for hånd med bananer og sukkerrør',
      'Bade og børste elefantene i elva',
      'Ingen ridning — reservatet er sertifisert dyrevelferd',
      'Hjemmelaget thailunsj i jungelen',
    ],
    included: ['Henting og levering på hotell', 'Lunsj', 'Drikke og frukt', 'Guide', 'Forsikring'],
    excluded: ['Håndkle og skift', 'Tips (frivillig)'],
    meeting: 'Vi henter deg på hotellet i Chiang Mai mellom 07:30 og 08:30.',
    groupSize: 'Maks 12 personer',
  },
  'phiphi-maya': {
    highlights: [
      'Maya Bay — stranden fra filmen «The Beach»',
      'Snorkling i Pileh-lagunen',
      'Buffélunsj på Phi Phi Don',
      'Viking Cave og Monkey Beach',
    ],
    included: ['Speedbåt', 'Snorkleutstyr', 'Buffélunsj', 'Nasjonalparkavgift', 'Guide'],
    excluded: ['Hotellhenting (kan bestilles)', 'Håndkle'],
    meeting: 'Oppmøte ved marinaen i Phuket kl. 07:00.',
    groupSize: 'Maks 35 personer',
  },
  'cooking-bangkok': {
    highlights: [
      'Guidet tur på lokalt råvaremarked',
      'Lag fem klassiske retter fra bunnen',
      'Oppskriftshefte på norsk å ta med hjem',
      'Spis alt du lager',
    ],
    included: ['Alle råvarer', 'Oppskriftshefte', 'Drikke', 'Forkle'],
    excluded: ['Transport til og fra kokkeskolen'],
    meeting: 'Oppmøte ved BTS Phrom Phong, utgang 1.',
    groupSize: 'Maks 10 personer',
  },
  'temple-bangkok': {
    highlights: [
      'Wat Arun — tempelet ved elven',
      'Storpalasset og Smaragdbuddhaen',
      'Båttur på Chao Phraya',
      'Norsktalende guide hele veien',
    ],
    included: ['Norsktalende guide', 'Alle inngangsbilletter', 'Båtbillett', 'Vann'],
    excluded: ['Lunsj', 'Transport til oppmøtested'],
    meeting: 'Oppmøte ved Tha Tien-brygga kl. 08:45.',
    groupSize: 'Maks 15 personer',
  },
  'jamesbond-phuket': {
    highlights: [
      'Khao Phing Kan («James Bond Island»)',
      'Kajakkpadling i grotter og laguner',
      'Panak- og Hong-øyene',
      'Buffélunsj om bord',
    ],
    included: ['Longtailbåt', 'Kajakk med padler', 'Buffélunsj', 'Nasjonalparkavgift'],
    excluded: ['Hotellhenting utenfor sentrum'],
    meeting: 'Henting på hotell i Phuket fra kl. 07:00.',
  },
  'muaythai-bangkok': {
    highlights: [
      'Rajadamnern — Thailands eldste boksestadion',
      'Ringside VIP-plasser',
      'Se oppvarmingsritualet Wai Kru',
      'Fem til sju kamper på én kveld',
    ],
    included: ['VIP-billett ringside', 'Programhefte'],
    excluded: ['Transport', 'Mat og drikke'],
    meeting: 'Oppmøte ved hovedinngangen kl. 18:00.',
    languages: ['Engelsk'],
  },
  'safariworld-bangkok': {
    highlights: [
      'Kjør gjennom safariparken blant løver, tigre og giraffer',
      'Delfinshow og sjøløveshow',
      'Orangutangshow og fugleshow',
      'Perfekt for barnefamilier',
    ],
    included: ['Inngang til begge parker', 'Alle show', 'Safarikjøring'],
    excluded: ['Mat og drikke', 'Transport'],
    meeting: 'Oppmøte ved hovedinngangen, eller henting mot tillegg.',
    groupSize: 'Ingen øvre grense',
  },
  'zipline-chiangmai': {
    highlights: [
      'Over 30 plattformer gjennom regnskogen',
      'Lengste linje er over 300 meter',
      'Sertifiserte instruktører og dobbel sikring',
      'Utsikt over jungelen fra trekronene',
    ],
    included: ['Alt sikkerhetsutstyr', 'Instruktør', 'Henting på hotell', 'Lett måltid'],
    excluded: ['Bilder fra turen (kan kjøpes)'],
    meeting: 'Henting på hotell i Chiang Mai kl. 07:00 eller 12:00.',
    groupSize: 'Maks 10 personer',
  },
  'floating-market': {
    highlights: [
      'Damnoen Saduak flytende marked fra langbåt',
      'Maeklong jernbanemarked — markedet på togskinnene',
      'Smak lokal mat rett fra båtene',
      'Fotostopp ved kokosplantasje',
    ],
    included: ['Longtailbåt', 'Henting på hotell', 'Guide', 'Vann'],
    excluded: ['Lunsj', 'Innkjøp på markedet'],
    meeting: 'Henting på hotell i Bangkok kl. 06:30.',
  },
};

// Bygg det ferdige datasettet én gang.
export const allExperiences = experiences.map((e) => ({
  ...e,
  slug: slugify(e.title),
  ...defaultDetails,
  ...(details[e.id] || {}),
  // Stripe Payment Link per opplevelse. Tom = forespørselsmodus.
  paymentUrl: '',
}));

export const getExperience = (slug) =>
  allExperiences.find((e) => e.slug === slug) || null;
