/*
 * Reisemålssider — selve SEO-motoren.
 *
 * Folk googler ikke «Sawadee Tours». De googler «ting å gjøre i Phuket» og
 * «Bangkok med barn». Disse sidene svarer på nettopp de søkene, på norsk,
 * og lenker videre til opplevelsene vi tjener penger på.
 *
 * Reglene for innholdet her:
 *  - skriv noe som faktisk hjelper, ikke fyll rundt et søkeord
 *  - ingen påstander som endrer seg (åpningstider, priser hos andre)
 *  - alt som bør dobbeltsjekkes lokalt er merket i `verify`
 */

export const destinations = [
  {
    slug: 'bangkok',
    name: 'Bangkok',
    region: 'Sentral-Thailand',
    scene: 'temple',
    tagline: 'Templer, gatemat og en by som aldri står stille',
    metaTitle: 'Ting å gjøre i Bangkok — 12 opplevelser verdt turen',
    metaDescription:
      'Hva bør du oppleve i Bangkok? Templer, flytende marked, matkurs og Muay Thai — forklart på norsk, med priser i kroner og ærlige råd om hva som er verdt tiden.',
    intro: [
      'Bangkok er byen folk enten elsker eller vil videre fra etter to dager. Forskjellen ligger nesten alltid i hva de gjorde de første 48 timene. Kaster du deg rett ut i trafikken og shoppingsentrene, blir det slitsomt. Starter du med elven, templene og maten, skjønner du fort hvorfor mange blir værende lenger enn planlagt.',
      'Byen er stor, men den delen de fleste turister bruker er overraskelig liten. Nesten alt du vil se ligger enten langs Chao Phraya-elven eller innen rekkevidde av skytoget. Klarer du å legge opp dagene etter det, slipper du mesteparten av køene.',
    ],
    bestTime: {
      summary: 'November til februar — tørt og «bare» rundt 30 grader.',
      detail:
        'Fra november til februar er luftfuktigheten lavere og kveldene behagelige. Mars til mai er den varmeste perioden, og da bør du legge utendørs aktiviteter til morgenen. Regntiden fra juni til oktober betyr sjelden hele regnværsdager — som regel et kraftig skyll på ettermiddagen og deretter opphold.',
    },
    gettingAround: [
      'BTS Skytrain og MRT metro er raskt, billig og klimaanlagt. Unngå taxi i rushtiden — du blir stående.',
      'Båtene på Chao Phraya er både transport og sightseeing. Den oransje ekspressbåten er billigst.',
      'Grab (Sørøst-Asias Uber) fungerer godt og fjerner all diskusjon om taksameter.',
    ],
    highlights: [
      { t: 'Wat Arun og Storpalasset', d: 'De to mest kjente templene. Gå tidlig — før klokka ni er det både kjøligere og roligere.' },
      { t: 'Flytende marked', d: 'Ligger et par timer utenfor byen. Best som halvdagstur tidlig om morgenen.' },
      { t: 'Gatemat i Chinatown', d: 'Yaowarat-gata våkner når det mørkner. Spis der køen består av lokale.' },
      { t: 'Muay Thai på stadion', d: 'Ekte kamper, ikke turistshow. Rajadamnern og Lumpinee er de to store arenaene.' },
      { t: 'Matkurs', d: 'Halv dag, og du drar hjem med oppskrifter du faktisk kommer til å lage igjen.' },
    ],
    practical: [
      { k: 'Antrekk i templer', v: 'Dekk skuldre og knær. Har du glemt det, leies sjal ut på stedet.' },
      { k: 'Betaling', v: 'Kort går fint i kjøpesentre, men ha kontanter til gatemat og båt.' },
      { k: 'Trafikk', v: 'Regn med at alt tar dobbelt så lang tid mellom 16 og 19.' },
      { k: 'Varme', v: 'Legg tempelbesøk til morgenen og innendørs aktiviteter midt på dagen.' },
    ],
    faq: [
      {
        q: 'Hvor mange dager trenger jeg i Bangkok?',
        a: 'Tre dager rekker for templene, en matopplevelse og en dagstur ut av byen. Har du bare to, dropp det flytende markedet og bruk tiden langs elven i stedet.',
      },
      {
        q: 'Er Bangkok trygt?',
        a: 'Ja, for reisende regnes byen som trygg. Det vanligste problemet er ikke kriminalitet, men overprising — avtal pris på forhånd eller bruk apper med fast pris.',
      },
      {
        q: 'Passer Bangkok for barnefamilier?',
        a: 'Godt, hvis du planlegger rundt varmen. Safari World, båttur på elven og akvariet fungerer bra, mens lange tempelrunder midt på dagen sjelden gjør det.',
      },
    ],
    verify: 'Sjekk gjeldende inngangspriser og åpningstider for Storpalasset før publisering.',
  },
  {
    slug: 'phuket',
    name: 'Phuket',
    region: 'Andamanhavet',
    scene: 'islands',
    tagline: 'Basen for øyhopping i Andamanhavet',
    metaTitle: 'Ting å gjøre i Phuket — øyturer, strender og dagsturer',
    metaDescription:
      'Phuket-guide på norsk: hvilke øyturer som er verdt pengene, når du bør reise, hvilken strand som passer deg — og hva du trygt kan hoppe over.',
    intro: [
      'Phuket er Thailands største øy, og for de fleste er den først og fremst et utgangspunkt. Selve øya har fine strender, men det er dagsturene ut i Andamanhavet — Phi Phi, Phang Nga, Similan — som folk husker etterpå.',
      'Øya har flere ansikter. Patong er høyt tempo og uteliv. Kata og Karon er roligere med familier. Nord på øya er det stille nok til at du hører bølgene. Velger du feil område for din reise, blir opplevelsen en helt annen enn den du så for deg.',
    ],
    bestTime: {
      summary: 'November til april — rolig sjø og mest sol.',
      detail:
        'I høysesongen fra november til april er sjøen rolig og båtturene går som normalt. Fra mai til oktober kan sjøen bli urolig, og enkelte turer avlyses på kort varsel. Reiser du i lavsesongen, legg båtturen tidlig i oppholdet så du har dager igjen til et nytt forsøk.',
    },
    gettingAround: [
      'Avstandene er større enn folk tror — fra flyplassen til Patong tar det gjerne en time.',
      'Leiebil eller Grab er langt rimeligere enn de røde tuk-tukene, som er dyre på Phuket.',
      'Bestill båtturer med henting på hotellet. Å komme seg til marinaen på egen hånd tidlig om morgenen er unødvendig styr.',
    ],
    highlights: [
      { t: 'Phi Phi og Maya Bay', d: 'Den mest kjente dagsturen. Dra med tidlig avgang — forskjellen på klokka ni og klokka elleve er enorm.' },
      { t: 'Phang Nga-bukten', d: 'Kalksteinsformasjoner og kajakk gjennom grotter. Roligere enn Phi Phi.' },
      { t: 'Similan-øyene', d: 'Best snorkling og dykking i regionen. Kun åpent i høysesongen.' },
      { t: 'Gamlebyen i Phuket Town', d: 'Kinesisk-portugisiske fasader, kafeer og gatekunst. Undervurdert.' },
      { t: 'Solnedgang fra Promthep Cape', d: 'Gratis, og fortsatt det fineste utsiktspunktet på øya.' },
    ],
    practical: [
      { k: 'Strømninger', v: 'Rødt flagg på stranden betyr bad forbudt. Det tas på alvor — det drukner folk hvert år.' },
      { k: 'Nasjonalparkavgift', v: 'Kommer i tillegg på flere øyturer. Sjekk om den er inkludert før du booker.' },
      { k: 'Sjøsyke', v: 'Speedbåt er raskest, men hardest. Storbåt er roligere hvis du er utsatt.' },
      { k: 'Solkrem', v: 'Bruk revvennlig solkrem. Enkelte nasjonalparker har forbud mot vanlig solkrem.' },
    ],
    faq: [
      {
        q: 'Er Maya Bay åpen?',
        a: 'Bukten har vært stengt i perioder for at korallene skal få hente seg inn, og har i senere år hatt begrenset adgang med regler for hvor båtene kan legge til. Sjekk status for reisedatoene dine før du booker — vi bekrefter alltid dette før avreise.',
      },
      {
        q: 'Speedbåt eller storbåt til Phi Phi?',
        a: 'Speedbåt gir mer tid på øyene, men er tøffere i sjøen. Storbåt bruker lengre tid, men er mer behagelig og som regel rimeligere. Er du sjøsyk, velg storbåt.',
      },
      {
        q: 'Hvilken strand bør jeg bo ved?',
        a: 'Patong for uteliv og kort vei til alt, Kata eller Karon for familier, Nai Harn eller Bang Tao for ro. Skal du på mange dagsturer, spiller det mindre rolle — de fleste henter på hotellet.',
      },
    ],
    verify: 'Bekreft status for Maya Bay og gjeldende nasjonalparkavgifter hver sesong.',
  },
  {
    slug: 'chiang-mai',
    name: 'Chiang Mai',
    region: 'Nord-Thailand',
    scene: 'jungle',
    tagline: 'Fjell, elefanter og et helt annet tempo',
    metaTitle: 'Ting å gjøre i Chiang Mai — elefanter, fjell og kultur',
    metaDescription:
      'Chiang Mai-guide på norsk: hvordan du velger en etisk elefantpark, hva som er verdt å se, når du bør reise — og hvorfor mars kan være et dårlig valg.',
    intro: [
      'Chiang Mai ligger i fjellene nord i landet, og tempoet er et helt annet enn i Bangkok. Her går folk. Gamlebyen er omkranset av en vollgrav, og innenfor rekker du mellom templene til fots på en formiddag.',
      'For mange nordmenn er dette stedet man drar for elefantene. Da er det verdt å vite at det er stor forskjell på stedene som kaller seg reservat. Vi selger kun opplevelser uten ridning — mer om hvorfor i guiden vår om etiske elefantparker.',
    ],
    bestTime: {
      summary: 'November til februar. Unngå mars og april.',
      detail:
        'Vinterhalvåret er kjølig, tørt og behagelig — det er da byen er på sitt beste. Mars og april er «brenningssesongen», da jordbruksavfall brennes i regionen og luftkvaliteten kan bli dårlig i perioder. Har du astma eller reiser med små barn, er det verdt å legge turen utenom disse månedene.',
    },
    gettingAround: [
      'Gamlebyen går du til fots. Alt annet nås enkelt med røde songthaew-busser eller Grab.',
      'Elefantparker og fossefall ligger en til to timer unna — velg turer med henting inkludert.',
      'Skal du til Doi Suthep, dra tidlig. Utsikten over byen er best før disen legger seg.',
    ],
    highlights: [
      { t: 'Etisk elefantreservat', d: 'Mating og bading, ingen ridning. Den opplevelsen folk husker best fra Thailand.' },
      { t: 'Doi Suthep', d: 'Tempelet over byen, med 300 trappetrinn og utsikt hele veien.' },
      { t: 'Templene i gamlebyen', d: 'Wat Chedi Luang og Wat Phra Singh ligger få minutters gange fra hverandre.' },
      { t: 'Zipline i regnskogen', d: 'Godt organisert, sertifisert utstyr, og gøy også for ungdom.' },
      { t: 'Søndagsmarkedet', d: 'Gata gjennom gamlebyen fylles med håndverk og mat. Kom tidlig.' },
    ],
    practical: [
      { k: 'Temperatur', v: 'Kveldene kan bli kjølige i desember og januar — ta med en genser.' },
      { k: 'Luftkvalitet', v: 'Sjekk målinger hvis du reiser i mars eller april.' },
      { k: 'Elefantparker', v: 'Spør alltid om det tilbys ridning. Gjør det det, er det ikke et reservat.' },
      { k: 'Klær', v: 'Til elefantparken: klær som tåler å bli møkkete og våte.' },
    ],
    faq: [
      {
        q: 'Hvordan vet jeg at en elefantpark er etisk?',
        a: 'Den enkleste testen er ridning: tilbys det, er dyrevelferden som regel ikke god. Se også etter små grupper, at elefantene kan bevege seg fritt, og at det ikke er show med triks. Alle elefantopplevelser vi selger er uten ridning.',
      },
      {
        q: 'Hvor mange dager bør jeg ha i Chiang Mai?',
        a: 'Tre til fire dager. Én dag til elefanter, én til templer og gamleby, og én til fjellet eller en aktivitet som zipline. Er du glad i natur, kan du fint fylle en uke.',
      },
      {
        q: 'Er Chiang Mai bedre enn Bangkok?',
        a: 'De er ikke sammenlignbare. Bangkok er storby og energi, Chiang Mai er natur og ro. De fleste som har god tid tar begge, med innenlandsfly imellom — det tar drøyt en time.',
      },
    ],
    verify: 'Oppdater rådene om brenningssesongen med aktuelle målinger hvert år.',
  },
  {
    slug: 'krabi',
    name: 'Krabi',
    region: 'Andamanhavet',
    scene: 'karst',
    tagline: 'Kalksteinsklipper rett opp av havet',
    metaTitle: 'Ting å gjøre i Krabi — Railay, øyturer og klipper',
    metaDescription:
      'Krabi-guide på norsk: Railay Beach, firetøysøyene, klatring og de beste dagsturene. Når du bør reise, og hva som er verdt pengene.',
    intro: [
      'Krabi er for deg som synes Phuket er litt for mye. Landskapet er det samme dramatiske Andaman-landskapet, men tempoet er lavere og prisene som regel hyggeligere.',
      'Selve Krabi by er mest et knutepunkt. De fleste bor i Ao Nang, som har strandpromenade og båter til øyene, eller på Railay — en halvøy uten bilvei, der du kommer deg til og fra med longtailbåt.',
    ],
    bestTime: {
      summary: 'November til april, samme som resten av Andamankysten.',
      detail:
        'Høysesongen gir rolig sjø og pålitelige båtavganger. I regntiden fra mai til oktober er det fortsatt fint mange dager, men båtturer kan bli avlyst med kort varsel. Da er det ekstra viktig å ha fleksible avbestillingsvilkår.',
    },
    gettingAround: [
      'Railay nås kun med båt — det går longtailbåter fra Ao Nang hele dagen.',
      'Longtailbåt er det lokale alternativet til taxi. Avtal pris før du går om bord.',
      'Til Phi Phi går det ferge fra Krabi, så du trenger ikke reise via Phuket.',
    ],
    highlights: [
      { t: 'Railay Beach', d: 'Klipper på begge sider og ingen biler. Blant de fineste strendene i landet.' },
      { t: 'Firetøysøyene', d: 'Klassisk dagstur med longtailbåt, snorkling og lunsj på stranden.' },
      { t: 'Klatring på Railay', d: 'Et av verdens mest kjente klatrefelt, med kurs også for nybegynnere.' },
      { t: 'Hong-øyene', d: 'Roligere alternativ til firetøysturen, med skjulte laguner.' },
      { t: 'Varme kilder og Emerald Pool', d: 'Innlandstur for de som vil se noe annet enn strand.' },
    ],
    practical: [
      { k: 'Tidevann', v: 'Ved lavvann må longtailbåtene ofte legge til et stykke ut. Regn med å vasse.' },
      { k: 'Sko', v: 'Ta med sandaler som tåler vann og stein.' },
      { k: 'Kontanter', v: 'På Railay er det få minibanker og de tar høyt gebyr. Ta ut i Ao Nang.' },
      { k: 'Aper', v: 'De på Railay stjeler mat rett ut av hendene. Ikke mat dem.' },
    ],
    faq: [
      {
        q: 'Krabi eller Phuket?',
        a: 'Phuket har flere hoteller, mer uteliv og bedre flyforbindelser. Krabi har finere landskap, roligere tempo og lavere priser. Skal du mest på dagsturer og ligge på stranden, gir Krabi mer for pengene.',
      },
      {
        q: 'Bør jeg bo på Railay?',
        a: 'Det er vakkert, men lite. Bor du der en uke, kan det bli smått. Mange bor i Ao Nang og tar dagstur til Railay — det tar et kvarter med båt.',
      },
    ],
    verify: 'Bekreft fergeruter mellom Krabi og Phi Phi før sesongstart.',
  },
  {
    slug: 'koh-samui',
    name: 'Koh Samui',
    region: 'Thailandbukta',
    scene: 'canopy',
    tagline: 'Palmestrender og motsatt regntid',
    metaTitle: 'Ting å gjøre på Koh Samui — strender, vannfall og øyturer',
    metaDescription:
      'Koh Samui-guide på norsk. Merk deg dette: øya har regntid på et annet tidspunkt enn Phuket — det kan redde ferien din.',
    intro: [
      'Koh Samui ligger på østsiden av landet, i Thailandbukta. Det viktigste å vite er at været her følger en helt annen rytme enn på Phuket-siden: mens Andamankysten har regntid fra mai til oktober, er Samui på sitt våteste i oktober og november.',
      'Det gjør øya til et smart valg midtsommers, når vestkysten er som mest ustabil. Selve øya er frodig, godt utbygd og enkel å komme rundt på.',
    ],
    bestTime: {
      summary: 'Desember til august. Unngå oktober og november.',
      detail:
        'Den tørreste og mest stabile perioden strekker seg fra desember til august, med juli og august som en fin overlapping med norsk sommerferie. Oktober og november er den våteste perioden — motsatt av Phuket.',
    },
    gettingAround: [
      'Ringveien rundt øya tar rundt halvannen time å kjøre.',
      'Taxi er dyrt på Samui. Grab eller hotellets egen transport er som regel billigere.',
      'Til Koh Phangan og Koh Tao går det hurtigbåt flere ganger daglig.',
    ],
    highlights: [
      { t: 'Chaweng og Lamai', d: 'De to store strendene. Chaweng er livligst, Lamai roligere.' },
      { t: 'Ang Thong marinepark', d: 'Førtito øyer i en nasjonalpark. Dagstur med kajakk og snorkling.' },
      { t: 'Na Muang-fossene', d: 'Lett tilgjengelig fossefall med badekulp.' },
      { t: 'Big Buddha', d: 'Tolv meter høy og synlig fra flyet inn.' },
      { t: 'Fisherman’s Village', d: 'Fredagsmarked med mat og håndverk.' },
    ],
    practical: [
      { k: 'Regntid', v: 'Motsatt av Phuket. Sjekk måneden din nøye.' },
      { k: 'Manetsesong', v: 'Følg skilting på stranden i enkelte perioder.' },
      { k: 'Flyplass', v: 'Samui har privat flyplass med høyere avgifter. Ferge via Surat Thani er billigere.' },
    ],
    faq: [
      {
        q: 'Kan jeg kombinere Samui og Phuket?',
        a: 'Ja, men de ligger på hver sin side av landet, så du må fly eller ta en lang busstur med ferge. Har du under to uker, velg heller én kyst og bruk tiden der.',
      },
      {
        q: 'Passer Samui for barnefamilier?',
        a: 'Godt. Strendene har rolig vann flere steder, øya er liten og oversiktlig, og det finnes mange familiehoteller.',
      },
    ],
    verify: 'Dobbeltsjekk fergeruter og flypriser til Samui — de varierer mye gjennom året.',
  },
  {
    slug: 'pattaya',
    name: 'Pattaya',
    region: 'Østkysten',
    scene: 'city',
    tagline: 'Nærmest Bangkok, best for familier med barn',
    metaTitle: 'Ting å gjøre i Pattaya — familieaktiviteter og dagsturer',
    metaDescription:
      'Pattaya-guide på norsk. Byen har et blandet rykte — her er hva som faktisk er verdt tiden, særlig hvis du reiser med barn.',
    intro: [
      'Pattaya har et rykte, og deler av det stemmer. Men byen har også blitt et av de mest familievennlige reisemålene i landet, med vannparker, dyreparker og aktiviteter som fungerer godt for barn i alle aldre.',
      'Den store fordelen er avstanden: knapt to timer fra Bangkok. Det gjør Pattaya til et naturlig andre stopp hvis du har begrenset tid, eller en fin avslutning før hjemreise.',
    ],
    bestTime: {
      summary: 'November til februar — tørt og behagelig.',
      detail:
        'Samme mønster som Bangkok. November til februar er tørrest og kjøligst. Regntiden gir stort sett kraftige byger på ettermiddagen framfor hele regnværsdager.',
    },
    gettingAround: [
      'Songthaew (delt pickup) går faste ruter langs strandpromenaden og koster småpenger.',
      'Til Bangkok går det busser hele dagen, og turen tar rundt to timer.',
      'Jomtien sør i byen er roligere enn sentrum, og bedre for familier.',
    ],
    highlights: [
      { t: 'Sanctuary of Truth', d: 'Enorm trekonstruksjon ved sjøen. Fortsatt under bygging etter flere tiår.' },
      { t: 'Nong Nooch tropiske hage', d: 'Stor botanisk hage med show. Fungerer godt med barn.' },
      { t: 'Koh Larn', d: 'Øy førti minutter unna med langt klarere vann enn bystranden.' },
      { t: 'Vannparker', d: 'Flere store anlegg — den sikreste vinneren på en varm dag med barn.' },
      { t: 'Flytende marked', d: 'Mer tilrettelagt enn de utenfor Bangkok, men praktisk hvis du er kort på tid.' },
    ],
    practical: [
      { k: 'Bading', v: 'Bystranden er middels. Ta båten til Koh Larn for klart vann.' },
      { k: 'Område', v: 'Bo i Jomtien eller nord i byen hvis du reiser med familie.' },
      { k: 'Avstand', v: 'To timer fra Bangkok gjør byen fin som siste stopp før hjemreise.' },
    ],
    faq: [
      {
        q: 'Er Pattaya greit å reise til med barn?',
        a: 'Ja, hvis du velger område med omhu. Jomtien og nordre del av byen er rolige og familievennlige, mens sentrum rundt Walking Street ikke er ment for barn om kvelden.',
      },
      {
        q: 'Er det verdt en dagstur fra Bangkok?',
        a: 'Turen tar to timer hver vei, så en dagstur blir stresset. Skal du dit, bruk minst én overnatting.',
      },
    ],
    verify: 'Sjekk båtavganger til Koh Larn og åpningstider for de store parkene.',
  },
  {
    slug: 'koh-lanta',
    name: 'Koh Lanta',
    region: 'Andamanhavet',
    scene: 'islands',
    tagline: 'Lange strender, lavt tempo og ingen som maser',
    metaTitle: 'Koh Lanta — guide på norsk til Thailands roligste øy',
    metaDescription:
      'Alt om Koh Lanta: hvilken strand du bør velge, når du bør reise, hvordan du kommer deg dit fra Krabi, og hvorfor øya passer bedre for familier enn Phuket.',
    intro: [
      'Koh Lanta er svaret for deg som vil ha strand uten uteliv. Øya er lang og smal, med sandstrender nesten hele vestsiden, og et tempo som er merkbart lavere enn på Phuket. Ingen står i veikanten og selger deg noe.',
      'Skandinaver har funnet veien hit i mange år, og du hører norsk, svensk og dansk på strendene i høysesong. Det gjør øya lettere å reise til enn folketallet skulle tilsi — mange restauranter og dykkesentre er vant til nordiske gjester.',
    ],
    bestTime: {
      summary: 'November til april. Store deler av øya stenger i lavsesong.',
      detail:
        'Koh Lanta følger vestkysten: tørt fra november til april, vått fra mai til oktober. Forskjellen fra Phuket er at Lanta faktisk går i dvale utenfor sesongen — mange hoteller, restauranter og fergeruter stenger helt fra rundt mai til oktober. Reiser du i regntiden, sjekk at stedet du booker faktisk har åpent.',
    },
    gettingAround: [
      'Leiescooter er det vanligste. Øya har én hovedvei langs vestsiden, og den er lett å kjøre.',
      'Songthaew — ombygde pickuper — går mellom strendene og er billig, men går sjelden etter mørkets frembrudd.',
      'Avstandene er større enn de ser ut. Fra ferga i nord til Kantiang Bay i sør tar det rundt førti minutter.',
    ],
    highlights: [
      { t: 'Long Beach (Phra Ae)', d: 'Den lengste stranda, med flest spisesteder innen gangavstand. Best for førstegangsbesøk.' },
      { t: 'Kantiang Bay', d: 'Lengst sør, mest dramatisk, minst folk. Her bor du hvis du vil være i fred.' },
      { t: 'Gamlebyen på østsiden', d: 'Trehus på påler over vannet, sjømatrestauranter og en helt annen stemning enn strandsiden.' },
      { t: 'Fireøyersturen', d: 'Koh Chuek, Koh Ma, Koh Kradan og Emerald Cave — en av de beste båtturene i hele Thailand.' },
      { t: 'Mu Koh Lanta nasjonalpark', d: 'Fyrtårnet lengst sør, med apekatter og utsikt over Andamanhavet.' },
    ],
    practical: [
      { k: 'Hvordan komme dit', v: 'Fly til Krabi, deretter buss og ferge eller minibuss over broene. Regn tre til fire timer fra flyplassen.' },
      { k: 'Minibank', v: 'Finnes langs hovedveien, men ta ut på Krabi flyplass så du har kontanter fra start.' },
      { k: 'Med barn', v: 'Long Beach har slakt fall i vannet og rolige bølger i høysesong.' },
      { k: 'Nattliv', v: 'Beskjedent. Strandbarer og musikk, men ingen klubbscene. Det er poenget med Lanta.' },
    ],
    faq: [
      {
        q: 'Koh Lanta eller Phuket?',
        a: 'Phuket hvis du vil ha kort reisevei, mange restauranter og uteliv. Koh Lanta hvis du vil ha ro, lengre strender og lavere priser — men regn med en halv dag ekstra på veien.',
      },
      {
        q: 'Hvor mange dager bør jeg ha på Koh Lanta?',
        a: 'Minst fem. Øya belønner den som blir værende, og med tre dager bruker du to av dem på transport.',
      },
      {
        q: 'Er Koh Lanta åpent hele året?',
        a: 'Nei. Mange steder stenger fra rundt mai til oktober, og fergerutene reduseres. Skal du dit i lavsesong, bekreft åpningstider før du booker.',
      },
    ],
    verify: 'Bekreft fergeruter og sesongåpning hos operatøren før publisering — dette endrer seg årlig.',
  },
  {
    slug: 'khao-lak',
    name: 'Khao Lak',
    region: 'Andamanhavet',
    scene: 'canopy',
    tagline: 'Skandinavenes strand, og porten til Similanøyene',
    metaTitle: 'Khao Lak — norsk guide til strender, dykking og Similan',
    metaDescription:
      'Khao Lak forklart på norsk: hvilke strandområder som passer for hvem, når Similanøyene er åpne, hvordan du kommer deg dit fra Phuket, og hva som er verdt tiden.',
    intro: [
      'Khao Lak er ikke en by, men en rekke strandområder langs kysten nord for Phuket. Det finnes ingen sentrum å snakke om, og det er nettopp derfor folk drar hit: lange, brede strender, palmer helt ned til vannkanten, og ingen høyhus.',
      'Stedet er kjent blant skandinaver, og mange kommer tilbake år etter år. Det er også det naturlige utgangspunktet for Similanøyene, som er noe av det beste snorkling- og dykkevannet i Thailand.',
    ],
    bestTime: {
      summary: 'November til april. Similanøyene er stengt utenfor sesongen.',
      detail:
        'Khao Lak følger vestkysten, med tørrsesong fra november til april. Similanøyene er en nasjonalpark som stenges i regntiden — vanligvis fra midten av mai til midten av oktober. Er Similan hele grunnen til at du drar, må reisen legges innenfor åpningssesongen. Sjekk gjeldende datoer, de settes av parkmyndighetene hvert år.',
    },
    gettingAround: [
      'De fleste hotellene har egen strand, og du trenger sjelden transport i det daglige.',
      'Leiescooter eller taxi mellom strandområdene. Avstandene langs kysten er lengre enn de ser ut på kart.',
      'Fra Phuket flyplass tar det rundt halvannen time med bil nordover.',
    ],
    highlights: [
      { t: 'Similanøyene', d: 'Hvit sand, klart vann og noe av den beste snorklingen i landet. Heldagstur med hurtigbåt.' },
      { t: 'Nang Thong Beach', d: 'Mest liv og flest restauranter innen gangavstand. Bra førstevalg.' },
      { t: 'Bang Niang', d: 'Roligere, med det lokale markedet noen kvelder i uka.' },
      { t: 'Khao Sok nasjonalpark', d: 'To timer innover i landet. Kalksteinsfjell, innsjø og flytende bungalower — en av Thailands mest undervurderte opplevelser.' },
      { t: 'Tsunamimuseet', d: 'Om katastrofen i 2004, som rammet dette området hardest. Nøkternt og verdt en time.' },
    ],
    practical: [
      { k: 'Hvordan komme dit', v: 'Fly til Phuket, deretter rundt halvannen time med bil nordover. De fleste hoteller ordner transport.' },
      { k: 'Strømninger', v: 'Havet her kan ha kraftig understrøm i lavsesong. Følg flaggene på stranda.' },
      { k: 'Med barn', v: 'Bredde strender og grunt vann i høysesong gjør området godt egnet for familier.' },
      { k: 'Nattliv', v: 'Rolig. Restauranter og barer, men ingen klubber.' },
    ],
    faq: [
      {
        q: 'Er Khao Lak bedre enn Phuket?',
        a: 'Annerledes. Khao Lak har roligere og bredere strender og færre folk, men også langt færre restauranter og nesten ikke uteliv. Vil du kombinere, er de bare halvannen time fra hverandre.',
      },
      {
        q: 'Når er Similanøyene åpne?',
        a: 'Vanligvis fra midten av oktober til midten av mai, men de eksakte datoene settes av parkmyndighetene hvert år. Bekreft før du booker flybilletter rundt akkurat den turen.',
      },
      {
        q: 'Kan jeg kombinere Khao Lak og Khao Sok?',
        a: 'Ja, og det er en av de beste kombinasjonene i Thailand. To netter ved innsjøen i Khao Sok gir deg en helt annen opplevelse enn stranda, og turen tar rundt to timer hver vei.',
      },
    ],
    verify: 'Similanøyenes åpningssesong fastsettes årlig — bekreft datoene før publisering.',
  },
  {
    slug: 'hua-hin',
    name: 'Hua Hin',
    region: 'Thailandsbukta',
    scene: 'market',
    tagline: 'Kongefamiliens badeby, og den enkleste å reise til',
    metaTitle: 'Hua Hin — norsk guide til badebyen sør for Bangkok',
    metaDescription:
      'Hua Hin på norsk: hvorfor byen passer for familier og eldre reisende, hva du gjør der, når du bør reise, og hvordan du kommer deg dit fra Bangkok uten å fly.',
    intro: [
      'Hua Hin er Thailands eldste badeby, og den eneste av betydning du kan kjøre til fra Bangkok på et par timer. Den thailandske kongefamilien har hatt sommerresidens her siden 1920-tallet, og det preger byen: velstelt, trygg og betydelig mindre turistdrevet enn øyene i sør.',
      'Dette er stedet for deg som vil ha strand og komfort uten en eneste flytur innenlands. Byen har golfbaner, gode markeder, og en strandpromenade det faktisk går an å gå på.',
    ],
    bestTime: {
      summary: 'November til april. Tørrere enn øyene i sør hele året.',
      detail:
        'Hua Hin ligger på vestsiden av Thailandsbukta og får mindre nedbør enn både Phuket og Koh Samui. November til april er tørrest og mest behagelig. Mai til oktober gir ettermiddagsbyger, men sjelden hele regnværsdager. Byen fungerer derfor bedre enn de fleste andre strandmål i skuldersesongen.',
    },
    gettingAround: [
      'Byen er kompakt, og det meste ligger i gangavstand fra stranda.',
      'Songthaew går langs hovedgata for noen kroner.',
      'Leiescooter eller taxi til vingårdene og nasjonalparken utenfor byen.',
    ],
    highlights: [
      { t: 'Stranda og promenaden', d: 'Fem kilometer sand, og en promenade du faktisk kan spasere langs om kvelden.' },
      { t: 'Cicada Market', d: 'Kunst, håndverk og mat i helgene. Betydelig hyggeligere enn de fleste turistmarkeder.' },
      { t: 'Khao Sam Roi Yot nasjonalpark', d: 'En time sørover. Phraya Nakhon-hulen med kongepaviljongen i lyskjegla er et av Thailands mest fotograferte steder.' },
      { t: 'Vingårdene', d: 'Ja, Thailand lager vin. Monsoon Valley ligger en halvtime utenfor byen.' },
      { t: 'Nattmarkedet', d: 'Sjømat, gatemat og suvenirer i sentrum hver kveld.' },
    ],
    practical: [
      { k: 'Hvordan komme dit', v: 'Tre til fire timer med bil, buss eller tog fra Bangkok. Ingen innenriksflyvning nødvendig.' },
      { k: 'Med barn', v: 'Godt egnet — rolig sjø, korte avstander og flere vannparker.' },
      { k: 'Eldre reisende', v: 'Blant de enkleste stedene i Thailand: flat by, god infrastruktur, private sykehus i nærheten.' },
      { k: 'Bading', v: 'Sjøen er grunn langt ut. Fint for barn, mindre fint hvis du vil svømme langt.' },
    ],
    faq: [
      {
        q: 'Er Hua Hin verdt turen framfor øyene?',
        a: 'Hvis du vil unngå innenriksfly, reiser med små barn eller eldre, eller bare har en uke — ja. Vil du ha turkis vann og kalksteinsklipper, dra sørover i stedet.',
      },
      {
        q: 'Hvor lang tid tar det fra Bangkok?',
        a: 'Tre til fire timer avhengig av transport og trafikk. Toget er tregest men mest behagelig, minibuss raskest.',
      },
      {
        q: 'Hvordan er stranda i Hua Hin?',
        a: 'Lang og fin å gå på, men vannet er grunnere og mindre klart enn på øyene i sør. Byen handler mer om komfort og ro enn om drømmestrand.',
      },
    ],
    verify: 'Bekreft åpningstider for Phraya Nakhon-hulen og vingårdene før publisering.',
  },
  {
    slug: 'koh-tao',
    name: 'Koh Tao',
    region: 'Thailandsbukta',
    scene: 'karst',
    tagline: 'Der halve verden tar dykkersertifikatet sitt',
    metaTitle: 'Koh Tao — norsk guide til dykking og snorkling',
    metaDescription:
      'Koh Tao forklart på norsk: hvorfor øya er verdens billigste sted å ta dykkersertifikat, når du bør reise, hvordan du kommer deg dit, og hva du gjør hvis du ikke dykker.',
    intro: [
      'Koh Tao er liten — du kjører rundt den på en time — og har likevel blitt et av verdens mest kjente dykkersteder. Grunnen er enkel: varmt, klart og rolig vann året rundt, korte avstander til dykkestedene, og så mange dykkesentre som konkurrerer at prisene er blant de laveste noe sted.',
      'Dykker du ikke, er øya fortsatt verdt turen for snorklingen alene. Men vær ærlig med deg selv: kommer du hit uten interesse for det som skjer under vann, finnes det roligere strender andre steder.',
    ],
    bestTime: {
      summary: 'Februar til september. Unngå oktober til desember.',
      detail:
        'Koh Tao følger Thailandsbukta, der regntiden kommer sent på året. Februar til september er den lange gode perioden, med best sikt under vann fra mars til mai og igjen i august. Oktober til desember er vått, og da kan ferger bli innstilt i flere dager i strekk.',
    },
    gettingAround: [
      'Øya er liten, men veiene er bratte og dårlige flere steder. Leier du scooter, kjør forsiktig og fotografer skadene før du drar.',
      'Vannbåttaxi mellom bukene er ofte enklere enn vei.',
      'Til fots kommer du langt i Sairee, som er hovedområdet.',
    ],
    highlights: [
      { t: 'Dykkersertifikat', d: 'Open Water tar tre til fire dager. Sammenlign sentrene på gruppestørrelse, ikke bare pris.' },
      { t: 'Snorkling i Shark Bay', d: 'Svartfinnet revhai er vanlig her. Ufarlige, og en av de beste opplevelsene på øya.' },
      { t: 'Koh Nang Yuan', d: 'Tre småøyer forbundet med en sandtange rett nord for Koh Tao. Best tidlig på dagen.' },
      { t: 'Utsiktspunktene', d: 'John-Suwan og Mango Viewpoint. Bratt oppstigning, men utsikten er verdt svetten.' },
      { t: 'Sairee Beach ved solnedgang', d: 'Øyas sosiale midtpunkt, med barer og restauranter langs hele stranda.' },
    ],
    practical: [
      { k: 'Hvordan komme dit', v: 'Fly til Koh Samui eller Surat Thani, deretter ferge. Regn en hel reisedag fra Bangkok.' },
      { k: 'Sjøsyke', v: 'Fergeturen kan være urolig. Ta tabletter i god tid før avgang hvis du er utsatt.' },
      { k: 'Minibank', v: 'Finnes, men gebyrene er høye. Ta med kontanter fra fastlandet.' },
      { k: 'Scooterleie', v: 'Vanlig kilde til konflikt om skader. Ta bilder av kjøretøyet før du kjører, og bruk hjelm.' },
    ],
    faq: [
      {
        q: 'Må jeg kunne dykke for å dra til Koh Tao?',
        a: 'Nei, snorklingen alene er verdt turen, og øya har fine utsiktspunkter og strender. Men uten interesse for havet finnes det roligere og penere strender på Koh Lanta eller Koh Samui.',
      },
      {
        q: 'Hvor lang tid tar det å ta dykkersertifikat?',
        a: 'Et Open Water-kurs tar vanligvis tre til fire dager. Sett av minst en uke på øya hvis du skal ta det, så har du dager igjen til å dykke etterpå.',
      },
      {
        q: 'Er Koh Tao trygt?',
        a: 'Ja, for reisende flest. Det klart vanligste problemet er scooterulykker og tvister om skader på leide kjøretøy. Kjør forsiktig, bruk hjelm, og dokumenter skader før du kjører av gårde.',
      },
    ],
    verify: 'Sjekk gjeldende fergeruter og sesongdrift før publisering.',
  },
];

export const getDestination = (slug) =>
  destinations.find((d) => d.slug === slug) || null;
