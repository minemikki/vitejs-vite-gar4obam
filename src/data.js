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
    // Veiledende fra-pris hentet fra GetYourGuide. GetYourGuide justerer
    // dagsprisen (valuta, etterspørsel), så dette er et omtrentlig nivå —
    // prisnotisen i bestillingsboksen sier tydelig at dagsprisen settes der.
    priceNOK: 519,
    // Tallene under er GetYourGuides egne for produktet, ikke våre. Derfor
    // står kilden på siden — en vurdering uten kilde er verdiløs.
    rating: 4.9,
    reviews: 684,
    partner: 'GetYourGuide',
    partnerTitle: 'Chiang Mai: Ethical Half Day Elephant Sanctuary & Waterfall',
    blurb:
      'Mat elefantene og gå ved siden av flokken mens de beiter fritt i jungelen — et rolig program uten ridning, drevet av Joy Elephant Sanctuary. Pause ved fossen og lunsj inkludert.',
    // Kort, slående krok + en mer levende ingress til detaljsiden. Cards og
    // meta bruker fortsatt den korte `blurb`-en.
    hook: 'Elefanter som får være elefanter.',
    intro:
      'Ingen ridning. Ingen show. Bare deg, en flokk elefanter og jungelen rundt. Du mater dem for hånd, rusler ved siden av dem mens de beiter fritt, og kjøler deg ned ved fossen etterpå — før lunsjen står klar. Henting fra hotellet i Chiang Mai er inkludert.',
    tags: ['Etisk', 'Foss', 'Henting inkl.'],
    // Direkte produktlenke + partner-ID. `referral_redirect=1` er avgjørende:
    // uten det omdirigerer GetYourGuide partner-lenker til søkesiden sin (sett
    // på mobil, selv i privat vindu). Flagget forteller resolveren deres at
    // omdirigeringen allerede har skjedd, så kunden blir stående på turen.
    bookingUrl:
      'https://www.getyourguide.com/chiang-mai-l271/chiang-mai-ethical-half-day-elephant-sanctuary-waterfall-t895033/?partner_id=1BG7LK4&referral_redirect=1',
    // Ekte bilder fra turen, via GetYourGuide-partnerskapet. Første bilde er
    // kortbildet; hele lista vises som galleri på detaljsiden.
    // GetYourGuide bestillingswidget — kalenderen vises inne på detaljsiden.
    gygTourId: '895033',
    image: '/bilder/elefant-01.avif',
    gallery: [
      { src: '/bilder/elefant-01.avif', alt: 'To elefanter ved fossen i reservatet' },
      { src: '/bilder/elefant-02.avif', alt: 'Gjest mater en elefant i morgensol' },
      { src: '/bilder/elefant-03.avif', alt: 'Bad i fossen etter besøket' },
      { src: '/bilder/elefant-04.avif', alt: 'På tur gjennom jungelen med elefantene' },
      { src: '/bilder/elefant-05.avif', alt: 'Lage elefantmat av banan og sukkerrør' },
      { src: '/bilder/elefant-06.avif', alt: 'Solnedgang over elven ved reservatet' },
      { src: '/bilder/elefant-07.avif', alt: 'Gjester fotograferer elefantene på avstand' },
      { src: '/bilder/elefant-08.avif', alt: 'Ved velkomstskiltet til reservatet' },
      { src: '/bilder/elefant-09.avif', alt: 'Felles matlaging med gruppen' },
      { src: '/bilder/elefant-10.avif', alt: 'Par foran elefantene i bakgrunnen' },
      { src: '/bilder/elefant-11.avif', alt: 'Elefant i skogen under vandringen' },
      { src: '/bilder/elefant-12.avif', alt: 'Gruppen samlet i lyststuen ved elven' },
    ],
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
    title: 'Muay Thai på Rajadamnern Stadium',
    place: 'Bangkok',
    category: 'Adrenalin',
    scene: 'arena',
    duration: '3 timer',
    priceNOK: 288,
    // GetYourGuides egne tall for produktet (kilde oppgitt på siden).
    rating: 4.9,
    reviews: 14385,
    partner: 'GetYourGuide',
    partnerTitle: 'Bangkok: Muay Thai Boxing Tickets at Rajadamnern Stadium',
    blurb:
      'Ekte Muay Thai på Rajadamnern — sportens fødested og verdens eldste boksestadion. Proffkamper på rad i en elektrisk kveldsstemning, med flere billettkategorier å velge mellom.',
    hook: 'Der Muay Thai ble født.',
    intro:
      'Rajadamnern er Muay Thais fødested, og stemningen treffer deg i brystet fra første sekund. Proffkjempere i ringen, trommer og en sal som koker — sammen med lokalbefolkning og tilreisende. Tre timer ekte kampsport, med flere billettkategorier å velge mellom.',
    tags: ['Offisiell billett', 'Kveld'],
    bookingUrl:
      'https://www.getyourguide.com/bangkok-l169/bangkok-muay-thai-boxing-tickets-at-rajadamnern-stadium-t505196/?partner_id=1BG7LK4&referral_redirect=1',
    image: '/bilder/muay-01.avif',
    gallery: [
      { src: '/bilder/muay-01.avif', alt: 'Muay Thai-fighter setter et høyt spark i ringen på Rajadamnern stadion' },
      { src: '/bilder/muay-02.avif', alt: 'To fightere i nærkamp mens dommeren følger med' },
      { src: '/bilder/muay-03.avif', alt: 'Høyt spark i ringen under en kamp i rødt lys' },
      { src: '/bilder/muay-04.avif', alt: 'Fighter står over en nedslått motstander i ringen' },
      { src: '/bilder/muay-05.avif', alt: 'Fighter feirer seieren med hevet arm' },
      { src: '/bilder/muay-06.avif', alt: 'Stemning ved ringside med publikum tett på' },
      { src: '/bilder/muay-07.avif', alt: 'Rajadamnern stadion opplyst utenfra om kvelden' },
      { src: '/bilder/muay-08.avif', alt: 'Det praktfulle taket inne i Rajadamnern stadion' },
      { src: '/bilder/muay-09.avif', alt: 'Tradisjonelle musikere spiller sarama-musikk under kampene' },
    ],
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
    operator: 'Joy Elephant Sanctuary',
    highlights: [
      'Mat elefantene og se dem på nært hold i deres naturlige miljø',
      'Gå ved siden av flokken mens de beiter fritt i jungelen',
      'Ta en pause ved fossen med te',
      'Lag din egen håndlagde thailandske suvenir',
      'Etisk, hands-off program — ingen ridning, elefantene går fritt',
    ],
    program: [
      'Henting på hotellet ditt i Chiang Mai',
      'Van til Mae Wang, rundt 1,5 time hver vei',
      'Cirka tre timer med elefantene: mating, observasjon og vandring i jungelen',
      'Pause ved fossen, og lunsj',
      'Van tilbake til Chiang Mai',
    ],
    included: [
      'Henting og levering på hotell',
      'Guide',
      'Lunsj',
      'Vann',
      'Mat til elefantene',
      'Håndkle',
      'Forsikring',
    ],
    excluded: ['Tips (frivillig)'],
    meeting:
      'Henting på hotellet ditt i Chiang Mai sentrum — du velger mellom to hentesteder når du booker. Programmet finnes både som morgen- og ettermiddagsøkt.',
    bring: ['Badetøy', 'Skift', 'Sandaler', 'Solkrem', 'Egen allergimedisin om du bruker det'],
    notFor: ['Rullestolbrukere'],
    // Guiden på turen snakker engelsk. Vår egen kundeservice er på norsk —
    // det står i bestillingsboksen og i FAQ.
    languages: ['Engelsk'],
    // GetYourGuide oppgir ikke maks gruppestørrelse for denne turen, så vi
    // lar feltet stå tomt i stedet for å finne på et tall.
    groupSize: null,
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
    operator: 'Global Sport Ventures',
    highlights: [
      'Ekte Muay Thai på Rajadamnern — sportens fødested og verdens eldste boksestadion',
      'Dyktige proffkjempere i en intens, adrenalinfylt forestilling',
      'Elektrisk stemning sammen med lokalbefolkning og tilreisende',
      'Velg mellom flere billettkategorier når du booker',
    ],
    included: ['Billett til Muay Thai-kampene på Rajadamnern stadion (kategori du velger selv)'],
    excluded: ['Transport til og fra stadion', 'Mat og drikke'],
    meeting:
      'Møt opp ved Rajadamnern stadion i Bangkok. Kampene går på kvelden — se billetten din for eksakt oppmøtetid.',
    // GetYourGuide oppgir: denne aktiviteten refunderes ikke ved avbestilling.
    // Derfor overstyrer vi standardteksten om gratis avbestilling.
    cancellation: 'Denne aktiviteten refunderes ikke ved avbestilling.',
    languages: ['Engelsk'],
    // Stadionarrangement, ikke en gruppetur — ingen maks gruppestørrelse.
    groupSize: null,
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
