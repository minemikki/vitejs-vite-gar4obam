/*
 * Været i Thailand, måned for måned og region for region.
 *
 * Dette er sidens tydeligste særpreg, og grunnen er at nesten alle andre
 * svarer feil på spørsmålet. «Beste tid å reise til Thailand er november til
 * mars» er sant for Phuket og Bangkok, og direkte misvisende for Koh Samui —
 * november er den våteste måneden der. De to kystene ligger på hver sin side
 * av halvøya og får monsunen på ulikt tidspunkt.
 *
 * Nordmenn booker Thailand i september for reise i vinterhalvåret, og det er
 * nøyaktig da dette spørsmålet stilles. Svarer vi det bedre enn noen andre på
 * norsk, eier vi kunden før hen har bestemt seg for hvor turen går.
 *
 * Kildene er værstatistikk over tid, ikke en enkelt sesong. Været varierer,
 * og siden sier det tydelig — det er bedre enn å love sol.
 */

export const regions = [
  {
    id: 'andaman',
    name: 'Andamanhavet',
    places: 'Phuket · Krabi · Koh Lanta · Phi Phi · Khao Lak',
    scene: 'karst',
    destinations: ['phuket', 'krabi'],
    summary:
      'Vestkysten. Tørt fra november til april, vått fra mai til oktober. Dette er kysten folk mener når de sier at Thailand er best om vinteren.',
  },
  {
    id: 'gulf',
    name: 'Thailandsbukta',
    places: 'Koh Samui · Koh Phangan · Koh Tao',
    scene: 'islands',
    destinations: ['koh-samui'],
    summary:
      'Østkysten, og den store fellen. Her er regntiden forskjøvet: oktober til desember er våtest, mens februar til august er fint. Reiser du i november, bør du ikke hit.',
  },
  {
    id: 'north',
    name: 'Nord-Thailand',
    places: 'Chiang Mai · Chiang Rai · Pai',
    scene: 'jungle',
    destinations: ['chiang-mai'],
    summary:
      'Fjellene. Kjølig og klart fra november til februar, som er den klart beste tiden. Fra slutten av februar til april brennes åkrene, og lufta blir dårlig nok til at det merkes.',
  },
  {
    id: 'central',
    name: 'Bangkok og sentralt',
    places: 'Bangkok · Ayutthaya · Kanchanaburi',
    scene: 'temple',
    destinations: ['bangkok'],
    summary:
      'Innlandet. Behagelig fra november til februar, kvelende varmt i april, og vått fra mai til oktober med september på topp.',
  },
];

/*
 * Skala:
 *   4 = perfekt   tørt, behagelig, det du håper på
 *   3 = bra       små forbehold, fortsatt en god tid å dra
 *   2 = blandet   virker fint, men du bør vite hva du går til
 *   1 = unngå     det finnes bedre måneder, og bedre steder samme måned
 */
export const LEVELS = {
  4: { label: 'Perfekt', short: 'Perfekt' },
  3: { label: 'Bra', short: 'Bra' },
  2: { label: 'Blandet', short: 'Blandet' },
  1: { label: 'Unngå', short: 'Unngå' },
};

export const months = [
  { n: 1, name: 'Januar', short: 'Jan' },
  { n: 2, name: 'Februar', short: 'Feb' },
  { n: 3, name: 'Mars', short: 'Mar' },
  { n: 4, name: 'April', short: 'Apr' },
  { n: 5, name: 'Mai', short: 'Mai' },
  { n: 6, name: 'Juni', short: 'Jun' },
  { n: 7, name: 'Juli', short: 'Jul' },
  { n: 8, name: 'August', short: 'Aug' },
  { n: 9, name: 'September', short: 'Sep' },
  { n: 10, name: 'Oktober', short: 'Okt' },
  { n: 11, name: 'November', short: 'Nov' },
  { n: 12, name: 'Desember', short: 'Des' },
];

/** Norske ferier folk faktisk planlegger rundt. */
export const holidays = {
  1: 'Nyttår',
  2: 'Vinterferie (uke 8–9)',
  4: 'Påske',
  7: 'Sommerferie',
  10: 'Høstferie (uke 40)',
  12: 'Jul og romjul',
};

export const climate = {
  andaman: {
    1: [4, 'Tørt, rundt 32 grader og rolig sjø. Høysesong, med prisene deretter.'],
    2: [4, 'Like tørt som januar, litt varmere. Mange mener dette er den beste måneden.'],
    3: [4, 'Fortsatt tørt, men varmen bygger seg opp mot 34–35 grader.'],
    4: [3, 'Årets varmeste. Fint vær, men 35 grader og høy luftfuktighet sliter på barn og eldre. Songkran feires midt i måneden.'],
    5: [2, 'Regntiden begynner. Byger om ettermiddagen, sjelden hele dager. Prisene faller merkbart.'],
    6: [2, 'Vått, men i bolker. Sjøen blir urolig, og enkelte båtturer avlyses.'],
    7: [2, 'Litt tørrere enn juni noen år. Grønt og rimelig, men regn må påregnes.'],
    8: [2, 'Som juli. Været skifter fort — det kan være strålende én dag og grått den neste.'],
    9: [1, 'Våteste måned på vestkysten. Mange båtturer går ikke, og sjøen er for urolig til snorkling.'],
    10: [1, 'Fortsatt vått, men lysner mot slutten. Siste halvdel er bedre enn første.'],
    11: [3, 'Regnet gir seg. Grønt landskap, færre folk, og prisene har ikke tatt igjen ennå. Undervurdert måned.'],
    12: [4, 'Tørt og klart. Høysesongen starter for alvor, og jul og nyttår er dyrest i året.'],
  },
  gulf: {
    1: [3, 'Kan henge igjen litt regn fra desember, men blir bedre uke for uke.'],
    2: [4, 'Tørt og fint. Her begynner den lange gode sesongen som varer til august.'],
    3: [4, 'Tørt, varmt og rolig sjø. Utmerket for dykking rundt Koh Tao.'],
    4: [4, 'Varmt, men tørt. Mens Bangkok er kvelende, er det behagelig her ute.'],
    5: [3, 'Litt mer regn, fortsatt gode dager. Færre turister enn på vestkysten.'],
    6: [3, 'Fint. Dette er sommerferiealternativet når Andamanhavet er vått.'],
    7: [3, 'Godt vær og høysesong for europeere på sommerferie.'],
    8: [3, 'Siste av den gode perioden. Fortsatt trygt å planlegge her.'],
    9: [2, 'Regnet begynner å melde seg. Fortsatt brukbart, men ikke stabilt.'],
    10: [2, 'Vått. Kraftige byger, og sjøen blir urolig.'],
    11: [1, 'Årets våteste måned. Reiser du til Thailand i november, dra vestover i stedet.'],
    12: [2, 'Vått først i måneden, klarner ofte opp mot jul. Et sjansespill.'],
  },
  north: {
    1: [4, 'Kjølig, klart og tørt. Ned mot 14 grader om natten — ta med noe langermet.'],
    2: [3, 'Fint vær, men brenningen av åkrene starter mot slutten av måneden.'],
    3: [1, 'Brenningssesong. Lufta i Chiang Mai er blant verdens dårligste denne måneden. Har du astma eller små barn, hopp over.'],
    4: [1, 'Røyk og opp mot 40 grader. Songkran er en fest, men været er tungt.'],
    5: [2, 'Regnet kommer og vasker lufta ren. Landskapet skifter fra brunt til grønt på et par uker.'],
    6: [2, 'Grønt og frodig. Regn om ettermiddagen, sol om formiddagen.'],
    7: [2, 'Regntid, men sjelden hele dager. Rismarkene står på sitt vakreste.'],
    8: [2, 'Vått, grønt og billig. Fossene er på sitt beste nå.'],
    9: [2, 'Våteste måned i nord. Enkelte fjellveier blir vanskelige.'],
    10: [3, 'Regnet slipper taket. Grønt landskap, ren luft og få turister.'],
    11: [4, 'Årets beste måned. Kjølig, klart, og Loi Krathong og Yi Peng feires med lykter over hele Chiang Mai.'],
    12: [4, 'Kjøligst i året, klar himmel. Ta med genser til kveldene.'],
  },
  central: {
    1: [4, 'Behagelig for Bangkok å være — rundt 32 grader og lav luftfuktighet.'],
    2: [4, 'Tørt og fint. Den beste tiden å gå mye i byen.'],
    3: [3, 'Varmen tar seg opp. Legg tempelbesøk til formiddagen.'],
    4: [1, 'Kvelende. 35–40 grader og høy fuktighet gjør en dag ute i byen tung.'],
    5: [2, 'Regnet starter. Kraftige, korte byger sent på dagen.'],
    6: [2, 'Vått, men sjelden hele dager. Prisene er lave.'],
    7: [2, 'Regntid. Kortere byger enn i august og september.'],
    8: [2, 'Vått og trykkende.'],
    9: [1, 'Våteste måned. Enkelte gater i Bangkok står under vann etter kraftige byger.'],
    10: [2, 'Fortsatt vått, men bedres tydelig mot slutten av måneden.'],
    11: [4, 'Tørt og behagelig. Sesongen starter, og byen er på sitt beste.'],
    12: [4, 'Klart og forholdsvis kjølig. Beste måneden i Bangkok.'],
  },
};

/** Månedene der alle fire regionene er 3 eller bedre. */
export const safeMonths = months
  .filter((m) => regions.every((r) => climate[r.id][m.n][0] >= 3))
  .map((m) => m.name);

/** Kort råd per måned — vises når man velger en måned. */
export const monthAdvice = {
  1: 'Trygg måned nesten overalt. Vestkysten og Bangkok er på sitt beste, nord er kjølig og klart. Dyrest i året rundt nyttår.',
  2: 'Den eneste måneden der alt i Thailand er bra samtidig. Passer perfekt til norsk vinterferie — men book tidlig, for det vet flere enn deg.',
  3: 'Bra langs kystene, men hold deg unna Chiang Mai. Brenningssesongen gjør lufta der virkelig dårlig.',
  4: 'Vanskelig måned i innlandet — Bangkok og nord er varmt og røykfylt. Skal du reise i påsken, dra til øyene i Thailandsbukta.',
  5: 'Skuldersesong. Regnet har begynt på vestkysten, men Thailandsbukta holder seg fin. Prisene faller.',
  6: 'Koh Samui og nabo­øyene er det trygge valget nå. Nord er grønt og vakkert hvis du tåler ettermiddagsregn.',
  7: 'Sommerferiemåned. Reis til Thailandsbukta — Koh Samui, Koh Phangan og Koh Tao har fint vær mens vestkysten er våt.',
  8: 'Som juli. Thailandsbukta er svaret, og prisene er lavere enn i vintersesongen.',
  9: 'Den våteste måneden i Thailand samlet sett. Vil du likevel dra, er Thailandsbukta minst dårlig.',
  10: 'Overgangsmåned. Første halvdel er vått, siste halvdel kan være strålende — særlig i nord.',
  11: 'Vestkysten og Bangkok våkner til liv, og Chiang Mai er på sitt aller beste med lyktefestivalene. Men ikke dra til Koh Samui nå.',
  12: 'Høysesong overalt bortsett fra Thailandsbukta. Klart vær, mange folk og årets høyeste priser i romjulen.',
};
