// Kuraterte opplevelser. Pris i NOK.
// scene: hvilken håndtegnet vektorscene som vises på kortet (se scenes.jsx).
// bookingUrl: legg inn din affiliate-/booking-lenke (Klook, GetYourGuide, Viator
// eller egen kontrakt). Er den tom, åpnes forespørselsskjemaet i stedet.
/*
 * Felt som med vilje står tomme til det finnes ekte tall bak dem:
 *
 *   rating / reviews  vurdering og antall anmeldelser. Hentes fra
 *                     affiliate-partneren, eller samles inn selv.
 *   oldPriceNOK       overstrøket førpris. Norsk førprisregel krever at det
 *                     er den laveste prisen du faktisk har tatt de siste 30
 *                     dagene — ikke en pris du aldri har solgt til.
 *   bestseller        merket «Bestselger». Er en påstand om salg.
 *
 * Alle tre vises automatisk så snart de får en verdi. Fyll dem ikke inn før
 * tallet er sant.
 */
export const experiences = [
  {
    id: 'elephant-chiangmai',
    title: 'Etisk elefantreservat og foss',
    place: 'Chiang Mai',
    category: 'Natur & dyr',
    scene: 'jungle',
    duration: '7 timer',
    priceNOK: 516,
    // Tallene under er GetYourGuides egne for produktet, ikke våre. Derfor
    // står kilden på siden — en vurdering uten kilde er verdiløs.
    rating: 4.9,
    reviews: 682,
    partner: 'GetYourGuide',
    partnerTitle: 'Chiang Mai: Ethical Half Day Elephant Sanctuary & Waterfall',
    blurb:
      'Mat og stell elefantene i et reservat uten ridning, og bad i fossen etterpå. Sju timer med henting fra Chiang Mai.',
    tags: ['Familievennlig', 'Etisk', 'Foss', 'Henting inkl.'],
    bookingUrl:
      'https://www.getyourguide.com/chiang-mai-l271/chiang-mai-ethical-half-day-elephant-sanctuary-waterfall-t895033/?partner_id=1BG7LK4&utm_medium=online_publisher',
  },
  {
    id: 'phiphi-maya',
    title: 'Phi Phi & Maya Bay speedbåt',
    place: 'Phuket',
    category: 'Øyer & strender',
    scene: 'islands',
    duration: 'Heldag',
    priceNOK: 1190,
    blurb:
      'Snorkling, skjulte laguner og lunsj på stranden. Besøk de mest ikoniske øyene i Andamanhavet.',
    tags: ['Snorkling', 'Lunsj inkl.'],
    bookingUrl: '',
  },
  {
    id: 'cooking-bangkok',
    title: 'Thai matlagingskurs + marked',
    place: 'Bangkok',
    category: 'Mat & kultur',
    scene: 'city',
    duration: '4 timer',
    priceNOK: 640,
    blurb:
      'Handle på et lokalt marked og lag fem klassiske retter med en lokal kokk. Oppskrifter på norsk.',
    tags: ['Liten gruppe', 'Vegetar-mulig'],
    bookingUrl: '',
  },
  {
    id: 'temple-bangkok',
    title: 'Tempeltur: Wat Arun & Storpalasset',
    place: 'Bangkok',
    category: 'Mat & kultur',
    scene: 'temple',
    duration: 'Halvdag',
    priceNOK: 550,
    blurb:
      'Norsktalende guide tar deg gjennom byens vakreste templer, med historien bak hvert sted.',
    tags: ['Norsk guide', 'Inngang inkl.'],
    bookingUrl: '',
  },
  {
    id: 'jamesbond-phuket',
    title: 'James Bond Island & kajakk',
    place: 'Phang Nga',
    category: 'Øyer & strender',
    scene: 'karst',
    duration: 'Heldag',
    priceNOK: 980,
    blurb:
      'Padle mellom dramatiske kalksteinsformasjoner i Phang Nga-bukten. Buffélunsj om bord.',
    tags: ['Kajakk', 'Lunsj inkl.'],
    bookingUrl: '',
  },
  {
    id: 'muaythai-bangkok',
    title: 'Muay Thai — Rajadamnern Stadium',
    place: 'Bangkok',
    category: 'Adrenalin',
    scene: 'arena',
    duration: 'Kveld',
    priceNOK: 490,
    blurb:
      'VIP-billetter til ekte Muay Thai på Thailands mest legendariske arena. Ringside-plasser.',
    tags: ['VIP', 'Kveldsaktivitet'],
    bookingUrl: '',
  },
  {
    id: 'safariworld-bangkok',
    title: 'Safari World & Marine Park',
    place: 'Bangkok',
    category: 'Familie',
    scene: 'safari',
    duration: 'Heldag',
    priceNOK: 720,
    blurb:
      'Kjør safari blant løver og giraffer, og se delfin- og sjøløveshow. Perfekt for barnefamilier.',
    tags: ['Familievennlig', 'Show inkl.'],
    bookingUrl: '',
  },
  {
    id: 'zipline-chiangmai',
    title: 'Zipline jungel-eventyr',
    place: 'Chiang Mai',
    category: 'Adrenalin',
    scene: 'canopy',
    duration: 'Halvdag',
    priceNOK: 850,
    blurb:
      'Fly gjennom regnskogen på over 30 plattformer. Sertifiserte guider og alt utstyr inkludert.',
    tags: ['Adrenalin', 'Henting inkl.'],
    bookingUrl: '',
  },
  {
    id: 'floating-market',
    title: 'Flytende marked + jernbanemarked',
    place: 'Ratchaburi',
    category: 'Mat & kultur',
    scene: 'market',
    duration: 'Heldag',
    priceNOK: 610,
    blurb:
      'Opplev Damnoen Saduak fra langbåt og det berømte markedet på togskinnene. Fotoparadis.',
    tags: ['Kultur', 'Henting inkl.'],
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

// `count` settes ikke her — det telles ut fra opplevelsene lenger nede, så
// tallet på forsiden alltid stemmer med det som faktisk ligger i utvalget.
const destinationList = [
  { name: 'Bangkok', scene: 'temple' },
  { name: 'Phuket', scene: 'islands' },
  { name: 'Chiang Mai', scene: 'jungle' },
  { name: 'Krabi', scene: 'karst' },
  { name: 'Koh Samui', scene: 'canopy' },
  { name: 'Pattaya', scene: 'city' },
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

export const destinations = destinationList.map((d) => ({
  ...d,
  count: allExperiences.filter((e) => e.place === d.name).length,
}));

export const getExperience = (slug) =>
  allExperiences.find((e) => e.slug === slug) || null;
