/*
 * Tallgrunnlaget for reisebudsjettet.
 *
 * Alle satsene ligger åpent her og vises på siden. Det er et bevisst valg:
 * en kalkulator som spytter ut ett tall uten å si hvor det kommer fra, er
 * verdiløs å ettergå. Viser vi regnestykket, kan folk justere det mot sin
 * egen ferie — og de stoler mer på svaret.
 *
 * Satsene er norske kroner, avrundet, og bygger på hva ting typisk koster i
 * Thailand. Priser flytter seg, og siden sier tydelig at dette er anslag.
 * Gå gjennom tallene før hver sesong.
 */

export const styles = [
  {
    id: 'nokternt',
    name: 'Nøkternt',
    blurb: 'Enkle rom, gatemat, lokal transport. Fullt mulig å ha det helt fint.',
  },
  {
    id: 'vanlig',
    name: 'Vanlig',
    blurb: 'Grei hotellstandard, blanding av gatemat og restaurant, noen taxier.',
  },
  {
    id: 'komfort',
    name: 'Komfort',
    blurb: 'Gode hoteller, restauranter, privat transport og flere aktiviteter.',
  },
];

/** Per person per døgn, i kroner. Overnatting regner to som deler rom. */
export const rates = {
  nokternt: { seng: 200, mat: 150, transport: 50, aktivitet: 100 },
  vanlig: { seng: 500, mat: 350, transport: 120, aktivitet: 250 },
  komfort: { seng: 1250, mat: 700, transport: 300, aktivitet: 500 },
};

export const rateLabels = {
  seng: 'Overnatting',
  mat: 'Mat og drikke',
  transport: 'Lokal transport',
  aktivitet: 'Turer og aktiviteter',
};

/** Fly tur–retur Norge–Bangkok, per person. */
export const flights = {
  lav: { label: 'Lavsesong (mai–oktober)', pris: 6500 },
  skulder: { label: 'Skuldersesong (mars–april, november)', pris: 8000 },
  hoy: { label: 'Høysesong (desember–februar)', pris: 10000 },
};

/** Én innenriksstrekning per person, tur retur teller som to. */
export const DOMESTIC_LEG = 700;

export const notes = [
  'Overnatting er regnet per person når to deler rom. Reiser du alene, blir den posten omtrent dobbelt så høy.',
  'Flyprisen er tur–retur fra Norge til Bangkok. Bestiller du i god tid og er fleksibel på dato, kan du komme rimeligere ut.',
  'Innenriks fly og båt i Thailand er billig — rundt 700 kroner per strekning er et vanlig nivå.',
  'Barn under to år flyr som regel nesten gratis, og spiser lite. Kalkulatoren regner alle som voksne.',
];
