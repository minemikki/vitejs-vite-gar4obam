/*
 * Guider — innholdet som skal rangere på informasjonssøk.
 *
 * Strategien: folk søker «beste tid å reise til Thailand» lenge før de søker
 * «book elefanttur». Vinner vi det første søket, eier vi kunden når hen er
 * klar til å bestille. Hver guide lenker derfor videre til relevante
 * reisemål og opplevelser.
 *
 * Skriveregler: svar på spørsmålet i første avsnitt, vær konkret, og ikke
 * påstå noe som endrer seg uten å si at det bør sjekkes.
 */

export const guides = [
  {
    slug: 'etisk-elefantpark-thailand',
    title: 'Slik velger du en etisk elefantpark i Thailand',
    excerpt:
      'Nesten alle kaller seg reservat. Her er de fire spørsmålene som avslører hvilke som faktisk er det — og hvorfor ridning er den viktigste testen.',
    metaTitle: 'Etisk elefantpark i Thailand — slik velger du riktig',
    metaDescription:
      'Hvordan vet du om en elefantpark er etisk? Fire konkrete tester, hva «ingen ridning» egentlig betyr, og hvilke røde flagg du bør se etter før du booker.',
    published: '2026-01-14',
    readMinutes: 6,
    topic: 'Dyrevelferd',
    related: { destinations: ['chiang-mai'], categories: ['Natur & dyr'] },
    sections: [
      {
        h: 'Det korte svaret',
        p: [
          'Tilbyr stedet ridning, er det ikke et reservat. Det er den enkleste og mest treffsikre testen du har, og den avslører de aller fleste. Alt annet — små grupper, ingen show, mulighet for elefantene til å bevege seg fritt — er nyttige tilleggssjekker, men ridningen alene siler bort mesteparten.',
        ],
      },
      {
        h: 'Hvorfor ridning er problemet',
        p: [
          'En elefant er ikke bygget for å bære vekt på ryggen slik en hest er. Ryggraden peker oppover i tagger, ikke nedover, og vedvarende belastning gir slitasje og smerte.',
          'Det tyngre problemet er likevel treningen. For at en elefant skal la seg ri, må den først brytes ned — en prosess der unge dyr skilles fra moren og holdes fastbundet til de slutter å motsette seg. Ingen elefant lar seg ri frivillig fra naturens side.',
        ],
      },
      {
        h: 'Fire spørsmål som avslører stedet',
        list: [
          'Tilbys ridning — i noen form, også «bareback»? Da er svaret nei.',
          'Er det show med triks, maling eller fotballspilling? Triks krever den samme treningen som ridning.',
          'Hvor mange gjester per elefant? Gode steder holder gruppene små og har hviledager for dyra.',
          'Kan elefantene bevege seg fritt og være sammen? Korte lenker og enkeltbåser er et dårlig tegn.',
        ],
      },
      {
        h: 'Røde flagg i markedsføringen',
        p: [
          'Ordene «sanctuary», «rescue» og «ethical» er ikke beskyttede begreper. Hvem som helst kan bruke dem. Se derfor på bildene framfor teksten: er det bilder av folk på ryggen til elefanter, eller elefanter som står i rekke og gjør triks, spiller det ingen rolle hva stedet kaller seg.',
          'Vær også skeptisk til steder som lover at du får «bade med babyelefanter» hele året. Unger som brukes i turisttrafikk hele dagen, hver dag, blir sjelden holdt sammen med moren slik de skal.',
        ],
      },
      {
        h: 'Hva du faktisk får på et godt sted',
        p: [
          'En dag i et ordentlig reservat handler mest om å observere. Du mater elefantene, går sammen med dem, og er gjerne med på et bad i elva. Guiden forteller historien til hvert dyr — mange er hentet fra tømmerdrift eller sirkus.',
          'Det høres mindre spektakulært ut enn å ri, og det er det. Men det er også den eneste versjonen der du kommer hjem uten å lure på hva som skjedde med dyret etterpå.',
        ],
      },
      {
        h: 'Hva vi gjør',
        p: [
          'Vi selger ingen opplevelser med elefantridning, og ingen show med triks. Det er ikke en markedsføringsposisjon vi har funnet på i ettertid — det er grunnen til at utvalget vårt er mindre enn hos de store bookingsidene.',
        ],
      },
    ],
    faq: [
      {
        q: 'Er det greit å bade med elefanter?',
        a: 'Det er langt bedre enn ridning, men ikke helt uproblematisk. Mange gode reservater har gått bort fra bading fordi dyra må stå stille i vannet i timevis når det er mange gjester. Spør hvor mange bad de har per dag — er svaret ett eller to, er det som regel greit.',
      },
      {
        q: 'Koster etiske parker mer?',
        a: 'Ofte litt, ja. Færre gjester per elefant og hviledager betyr lavere inntekt per dyr. Forskjellen er sjelden dramatisk, og du får en roligere opplevelse med mer tid.',
      },
      {
        q: 'Hvor ligger de beste elefantparkene?',
        a: 'De fleste av de anerkjente ligger rundt Chiang Mai nord i landet, med noen også utenfor Phuket og Krabi. Vi anbefaler å legge inn minst én natt i Chiang Mai hvis elefanter er viktig for deg.',
      },
    ],
  },
  {
    slug: 'beste-tid-a-reise-til-thailand',
    cta: {
      h: 'Se det måned for måned',
      p: 'Værkartet vårt viser alle fire regionene i Thailand for hver eneste måned — og hvorfor de to kystene er speilvendte.',
      label: 'Åpne værkartet',
      to: '/naar-reise',
    },
    title: 'Når er den beste tiden å reise til Thailand?',
    excerpt:
      'Det korte svaret er november til februar. Det lange svaret er at landet har to helt forskjellige regntider — og velger du riktig kyst, kan du reise når som helst.',
    metaTitle: 'Beste tid å reise til Thailand — måned for måned',
    metaDescription:
      'Når bør du reise til Thailand? Måned for måned, forskjellen på øst- og vestkysten, og hvordan du finner sol selv midt i regntiden.',
    published: '2026-01-20',
    readMinutes: 7,
    topic: 'Planlegging',
    related: { destinations: ['phuket', 'koh-samui', 'chiang-mai'], categories: [] },
    sections: [
      {
        h: 'Det korte svaret',
        p: [
          'November til februar er tryggest over hele landet: tørt, sol og temperaturer rundt tretti grader. Det er også høysesong, med de høyeste prisene og flest folk.',
          'Men her er poenget de fleste går glipp av: Thailand har to kyster med motsatt regntid. Er det vått på den ene, er det som regel fint på den andre.',
        ],
      },
      {
        h: 'To kyster, to regntider',
        p: [
          'Andamankysten i vest — Phuket, Krabi, Phi Phi — har sin beste periode fra november til april, og sin våteste fra mai til oktober.',
          'Thailandbukta i øst — Koh Samui, Koh Phangan, Koh Tao — er derimot på sitt våteste i oktober og november, og fin store deler av sommeren.',
          'Det betyr at norsk fellesferie i juli, som er dårlig timing for Phuket, kan fungere utmerket på Samui.',
        ],
      },
      {
        h: 'Måned for måned',
        table: {
          head: ['Måned', 'Vestkysten', 'Østkysten', 'Nord'],
          rows: [
            ['Nov–feb', 'Best', 'Vått i nov', 'Best, kjølige kvelder'],
            ['Mar–apr', 'Bra, veldig varmt', 'Bra', 'Brenningssesong — unngå'],
            ['Mai–jun', 'Ustabilt', 'Bra', 'Varmt, korte byger'],
            ['Jul–aug', 'Ustabilt', 'Bra', 'Grønt og frodig'],
            ['Sep–okt', 'Våtest', 'Blir vått', 'Våtest'],
          ],
        },
      },
      {
        h: 'Hva regntid faktisk betyr',
        p: [
          'Mange ser for seg en uke med sammenhengende regn. Slik er det sjelden. Et typisk regntidsdøgn har sol store deler av dagen, og så et kraftig skyll på ettermiddagen som varer en time.',
          'Utfordringen er ikke regnet i seg selv, men sjøen. Ustabilt vær kan gi bølger som gjør at båtturer avlyses. Reiser du i lavsesong, legg båtturene tidlig i oppholdet — da har du dager igjen til et nytt forsøk hvis noe blir avlyst.',
        ],
      },
      {
        h: 'Fordelene ved å reise utenfor høysesong',
        list: [
          'Merkbart lavere priser på både fly og hotell.',
          'Færre folk på de mest kjente stedene — Maya Bay i august er en helt annen opplevelse enn i januar.',
          'Landskapet er grønnere, og fossefallene har faktisk vann.',
        ],
      },
      {
        h: 'Vårt råd',
        p: [
          'Har du fri når du vil, velg november eller februar. Er du bundet til norsk fellesferie i juli, dra til Koh Samui-siden framfor Phuket. Skal du til Chiang Mai for elefanter og fjell, unngå mars og april.',
          'Vil du se dette måned for måned og region for region, har vi laget et eget værkart du kan klikke deg gjennom.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kan jeg reise til Thailand i juli?',
        a: 'Ja. Velg da østkysten — Koh Samui, Koh Phangan eller Koh Tao — som har fint vær store deler av sommeren. Phuket-siden er mer ustabil i juli, men har fortsatt mange soldager.',
      },
      {
        q: 'Når er det billigst?',
        a: 'Fra mai til oktober, altså lavsesong på vestkysten. Forskjellen på hotellpriser mellom høy- og lavsesong kan være førti prosent eller mer.',
      },
      {
        q: 'Hvor varmt blir det?',
        a: 'Rundt tretti grader mesteparten av året, med april som varmest. Luftfuktigheten betyr mer enn temperaturen — tretti grader i januar oppleves langt mer behagelig enn tretti i april.',
      },
    ],
  },
  {
    slug: 'thailand-med-barn',
    title: 'Thailand med barn — slik legger du opp turen',
    excerpt:
      'Thailand er et av de enkleste langdistansemålene å reise til med barn. Her er hva som faktisk fungerer, og de tabbene folk gjør første gang.',
    metaTitle: 'Thailand med barn — guide for norske barnefamilier',
    metaDescription:
      'Reise til Thailand med barn? Slik velger du sted, unngår varmefellen, håndterer mat og jetlag — og hvilke aktiviteter som fungerer for ulike aldre.',
    published: '2026-01-28',
    readMinutes: 8,
    topic: 'Familie',
    related: { destinations: ['pattaya', 'phuket', 'koh-samui'], categories: ['Familie'] },
    sections: [
      {
        h: 'Hvorfor Thailand fungerer godt med barn',
        p: [
          'Thai kultur er utpreget barnevennlig. Barn blir tatt imot overalt, også på restauranter der man i Norge ville fått blikk. Standarden på hoteller er høy for pengene, og avstandene innad i landet er korte med innenlandsfly.',
          'Den store utfordringen er ikke maten eller sikkerheten. Det er varmen — og at foreldre legger opp altfor tette program.',
        ],
      },
      {
        h: 'Varmefellen',
        p: [
          'Den vanligste tabben er å planlegge som hjemme: opp om morgenen, ut hele dagen. Tretti grader og høy luftfuktighet gjør at små barn går tom lenge før foreldrene.',
          'Legg opp dagen som lokale gjør det. Ut tidlig, hjem eller i bassenget mellom elleve og tre, og ut igjen på ettermiddagen. Da får dere gjort mer, ikke mindre.',
        ],
      },
      {
        h: 'Hvor bør dere reise?',
        list: [
          'Første gang med små barn: Koh Samui eller Pattaya (Jomtien) — korte avstander, rolig vann, god hotellstandard.',
          'Med barn i skolealder: Phuket, med dagsturer til øyene. Kata og Karon er roligere enn Patong.',
          'Med tenåringer: Chiang Mai, med elefanter, zipline og aktiviteter som gir litt spenning.',
          'Bangkok fungerer, men hold oppholdet kort — to netter er nok med små barn.',
        ],
      },
      {
        h: 'Mat',
        p: [
          'Barn som er skeptiske til sterk mat klarer seg fint. Alle restauranter lager mat uten chili på forespørsel — «mai phet» betyr «ikke sterkt». Kylling med ris, nudler og pannekaker finnes overalt.',
          'Om gatemat: velg boder med kø og høy gjennomstrømning, der maten lages mens du står der. Frukt som er skrelt foran deg er trygt.',
        ],
      },
      {
        h: 'Praktisk å ha med',
        list: [
          'Solkrem med høy faktor — det er dyrere og dårligere utvalg på stedet.',
          'Myggmiddel med DEET til kveldene.',
          'Reseptfrie medisiner dere kjenner fra før, med norsk merking.',
          'Badesko — mange strender har koraller og skarpe steiner.',
          'Lett langermet plagg til klimaanlegg og til beskyttelse mot sol.',
        ],
      },
      {
        h: 'Om jetlag',
        p: [
          'Tidsforskjellen er seks timer om sommeren og syv om vinteren, og retningen er gunstig: de fleste barn tilpasser seg innen to dager. Hjelper dere det på vei ved å holde dere ute i dagslys den første dagen, går det som regel fort.',
        ],
      },
    ],
    faq: [
      {
        q: 'Hvilken alder er best å reise med?',
        a: 'Fra rundt fire år og oppover husker barn mer av turen og orker mer. Under to år er det praktisk enkelt fordi de sover mye, men de får lite ut av det. Alderen mellom to og fire er ofte den mest krevende.',
      },
      {
        q: 'Trenger vi vaksiner?',
        a: 'Snakk med fastlegen eller en vaksinasjonsklinikk i god tid før avreise — anbefalingene varierer med hvor dere skal og hvor lenge. Dette er en medisinsk vurdering vi ikke kan gjøre for dere.',
      },
      {
        q: 'Er det trygt å bade?',
        a: 'Stort sett ja, men følg flaggene. Rødt flagg betyr badeforbud, og det håndheves ikke alltid — ta det på alvor selv. Enkelte strender har kraftige strømmer i regntiden.',
      },
    ],
  },
  {
    slug: 'hva-koster-thailand',
    cta: {
      h: 'Regn på din egen tur',
      p: 'Sett inn dager, antall reisende og reisestil, så viser kalkulatoren hva turen koster — med alle satsene åpent framme.',
      label: 'Åpne reisebudsjettet',
      to: '/reisebudsjett',
    },
    title: 'Hva koster to uker i Thailand? Et ærlig budsjett',
    excerpt:
      'Fly, hotell, mat, aktiviteter — regnet ut i kroner, med tre nivåer. Og de utgiftene folk glemmer å ta med.',
    metaTitle: 'Hva koster Thailand? Budsjett for to uker i kroner',
    metaDescription:
      'Ærlig prisoversikt for en Thailand-tur: fly, hotell, mat, transport og aktiviteter i norske kroner — på tre budsjettnivåer, med skjulte kostnader.',
    published: '2026-02-04',
    readMinutes: 7,
    topic: 'Økonomi',
    related: { destinations: ['bangkok', 'phuket'], categories: [] },
    sections: [
      {
        h: 'Kort oppsummert',
        p: [
          'To uker i Thailand koster de fleste nordmenn et sted mellom 18 000 og 35 000 kroner per person, avhengig av når du reiser og hvilken standard du velger. Flyet er som regel den største enkeltposten.',
          'Tallene under er anslag ment som planleggingshjelp. Priser endrer seg med sesong og valutakurs, så sjekk alltid dagens nivå før du budsjetterer endelig.',
        ],
      },
      {
        h: 'Tre nivåer, per person, to uker',
        table: {
          head: ['Post', 'Enkelt', 'Middels', 'Komfort'],
          rows: [
            ['Fly tur/retur', '6 000–8 000', '7 000–10 000', '10 000–18 000'],
            ['Overnatting', '3 500', '8 000', '20 000+'],
            ['Mat og drikke', '2 500', '5 000', '10 000'],
            ['Transport lokalt', '800', '1 500', '3 500'],
            ['Aktiviteter', '2 000', '4 500', '8 000'],
            ['Sum', '~15 000', '~26 000', '~50 000'],
          ],
        },
      },
      {
        h: 'Hvor pengene faktisk går',
        p: [
          'Mat er billigere enn folk tror. Et måltid på en lokal restaurant koster ofte under femti kroner, mens en middag på turistrestaurant fort blir det femdobbelte. Spiser dere som lokale halvparten av måltidene, merkes det godt på totalen.',
          'Aktiviteter er den posten som varierer mest. En dagstur til øyene ligger typisk rundt tusen kroner, mens et matkurs eller en tempeltur er rimeligere. Legger du inn tre til fire større aktiviteter på to uker, treffer du midt på treet.',
        ],
      },
      {
        h: 'Utgifter folk glemmer',
        list: [
          'Nasjonalparkavgifter på øyturer — kommer ofte i tillegg til båtprisen.',
          'Minibankgebyr i Thailand, typisk rundt femti kroner per uttak uansett beløp. Ta ut større summer sjeldnere.',
          'Innenlandsfly mellom regioner hvis du skal se både nord og sør.',
          'Reiseforsikring — sjekk at aktivitetene dere skal gjøre faktisk dekkes.',
          'Valutapåslag fra banken hvis du betaler i thailandske baht.',
        ],
      },
      {
        h: 'Slik sparer du uten å ødelegge turen',
        list: [
          'Reis i skuldersesong — november eller april framfor jul og nyttår.',
          'Book aktiviteter i norske kroner så du slipper valutapåslag og overraskelser.',
          'Velg hotell litt utenfor hovedstranden. Ti minutters gange kan halvere prisen.',
          'Spis lunsj der de lokale spiser, og spar restaurantbesøkene til kveldene.',
        ],
      },
    ],
    faq: [
      {
        q: 'Bør jeg veksle penger hjemme eller der?',
        a: 'Vekslingskursen er nesten alltid bedre i Thailand enn i Norge. Ta med litt kontanter for de første timene, og bruk minibank eller vekslekontor på stedet for resten.',
      },
      {
        q: 'Kan jeg betale med kort overalt?',
        a: 'I kjøpesentre, hoteller og større restauranter går kort fint. Gatemat, markeder, longtailbåter og småbutikker er kontant. Ha alltid noe kontanter tilgjengelig.',
      },
      {
        q: 'Hvorfor oppgir dere priser i kroner?',
        a: 'Fordi du da vet nøyaktig hva du betaler. Bestiller du i baht med norsk kort, legger banken vanligvis på et valutapåslag du ikke ser før på regningen.',
      },
    ],
  },
  {
    slug: 'phuket-eller-krabi',
    title: 'Phuket eller Krabi — hva bør du velge?',
    excerpt:
      'De ligger en times båttur fra hverandre og ser like ut på bilder. Forskjellen merkes først når du er der.',
    metaTitle: 'Phuket eller Krabi? Slik velger du riktig',
    metaDescription:
      'Phuket eller Krabi — hvilken passer deg? Sammenligning av pris, strender, uteliv, familievennlighet og hvor lett det er å komme seg dit.',
    published: '2026-02-11',
    readMinutes: 5,
    topic: 'Sammenligning',
    related: { destinations: ['phuket', 'krabi'], categories: ['Øyer & strender'] },
    sections: [
      {
        h: 'Kort fasit',
        p: [
          'Velg Phuket hvis du vil ha bredt utvalg av hoteller, uteliv, restauranter og enkle flyforbindelser. Velg Krabi hvis du vil ha finere landskap, lavere priser og roligere tempo.',
          'Begge har tilgang til de samme dagsturene — Phi Phi, Phang Nga og øyene rundt — så du går ikke glipp av høydepunktene uansett hva du velger.',
        ],
      },
      {
        h: 'Punkt for punkt',
        table: {
          head: ['', 'Phuket', 'Krabi'],
          rows: [
            ['Fly', 'Direkte fra mange byer', 'Færre avganger'],
            ['Prisnivå', 'Høyere', 'Lavere'],
            ['Uteliv', 'Stort utvalg', 'Begrenset'],
            ['Landskap', 'Fint', 'Mer dramatisk'],
            ['Familier', 'Kata og Karon', 'Ao Nang'],
            ['Rolige dager', 'Nord på øya', 'Nesten overalt'],
          ],
        },
      },
      {
        h: 'Hvem passer Phuket for?',
        p: [
          'Reiser du første gang til Thailand, har begrenset tid, eller vil ha kort vei mellom flyplass og hotell, er Phuket det praktiske valget. Øya har også langt flere restauranter og hoteller, noe som betyr mer å velge i hvis noe ikke innfrir.',
        ],
      },
      {
        h: 'Hvem passer Krabi for?',
        p: [
          'Er det landskapet du er ute etter — kalksteinsklippene som stiger rett opp av havet — får du mer av det i Krabi. Railay er noe av det vakreste i regionen, og du kommer dit kun med båt.',
          'Krabi er også merkbart rimeligere. På samme budsjett får du gjerne et hakk høyere hotellstandard enn på Phuket.',
        ],
      },
      {
        h: 'Kan du ta begge?',
        p: [
          'Ja, og mange gjør det. Det går ferge mellom dem, og turen tar rundt to timer. Har du to uker, er en uke på hvert sted en god fordeling. Har du bare én uke, velg ett sted — du bruker mer tid på flytting enn du tror.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kommer jeg til Phi Phi fra begge?',
        a: 'Ja. Det går dagsturer fra både Phuket og Krabi, og reisetiden er omtrent den samme. Fra Krabi er turen ofte litt rimeligere.',
      },
      {
        q: 'Hva med Koh Lanta?',
        a: 'Koh Lanta hører til Krabi-provinsen og er enda roligere. Passer godt for familier og for de som vil ha lange, brede strender uten mye rundt.',
      },
    ],
  },
  {
    slug: 'thailand-forste-gang',
    title: 'Thailand for første gang — 12 ting jeg skulle ønske jeg visste',
    excerpt:
      'Fra tempelantrekk og taxipriser til hvorfor du bør ha kontanter. Praktiske ting ingen forteller deg før du står der.',
    metaTitle: 'Thailand for første gang — 12 praktiske råd',
    metaDescription:
      'Skal du til Thailand for første gang? Tolv praktiske råd om penger, transport, tempeletikette, mat, sikkerhet og hva du bør pakke.',
    published: '2026-02-18',
    readMinutes: 6,
    topic: 'Planlegging',
    related: { destinations: ['bangkok', 'phuket', 'chiang-mai'], categories: [] },
    sections: [
      {
        h: 'Penger og betaling',
        list: [
          'Ta ut større summer sjeldnere. Minibankgebyret er fast per uttak, ikke i prosent.',
          'Si nei når minibanken tilbyr å belaste i norske kroner. Kursen de bruker er dårligere enn bankens egen.',
          'Ha alltid kontanter. Gatemat, båter og markeder tar ikke kort.',
        ],
      },
      {
        h: 'Transport',
        list: [
          'Bruk Grab framfor gatetaxi. Prisen er avtalt på forhånd, og du slipper diskusjonen om taksameter.',
          'I Bangkok er skytoget nesten alltid raskere enn bil.',
          'Avtal prisen med longtailbåter før du går om bord, ikke etter.',
        ],
      },
      {
        h: 'Templer og folkeskikk',
        list: [
          'Dekk skuldre og knær i templer. Dette gjelder også menn.',
          'Ta av skoene der andre har gjort det.',
          'Ikke pek med føttene mot mennesker eller buddhastatuer — føtter regnes som urene.',
          'Snakk lavt og ikke hev stemmen offentlig. Å miste besinnelsen får deg til å tape ansikt, ikke motparten.',
        ],
      },
      {
        h: 'Mat',
        list: [
          'Spis der køen er lokal. Høy gjennomstrømning betyr ferske råvarer.',
          '«Mai phet» betyr «ikke sterkt». Bruk det — thai sterk er sterkere enn du tror.',
          'Drikk flaskevann. Is på restauranter er som regel laget av renset vann og er trygt.',
        ],
      },
      {
        h: 'Sikkerhet',
        list: [
          'Den vanligste risikoen er trafikk, ikke kriminalitet. Leier du scooter, bruk hjelm og sjekk at forsikringen dekker det.',
          'Følg badeflaggene. Rødt betyr forbud, og strømmene er reelle.',
          'Ha kopi av pass og forsikringsbevis digitalt.',
        ],
      },
      {
        h: 'Pakking',
        list: [
          'Lette, tildekkende klær slår shorts og singlet — både i templer og mot sola.',
          'Badesko til strender med koraller.',
          'En liten paraply. Den brukes like mye mot sol som mot regn.',
        ],
      },
    ],
    faq: [
      {
        q: 'Trenger jeg visum?',
        a: 'Reglene avhenger av statsborgerskap og hvor lenge du skal være. Sjekk alltid gjeldende krav hos thailandske myndigheter eller UD før avreise — dette endrer seg jevnlig.',
      },
      {
        q: 'Bør jeg booke aktiviteter på forhånd?',
        a: 'De populære turene i høysesong bør bookes på forhånd, særlig hvis du har få dager. Utenfor sesong holder det som regel å bestille et par dager i forveien.',
      },
      {
        q: 'Hvor mye bør jeg gi i tips?',
        a: 'Tips er ikke forventet slik som i USA, men er hyggelig for god service. Å runde opp regningen, eller gi guiden noen hundre baht etter en heldagstur, er vanlig.',
      },
    ],
  },
  {
    slug: 'thailand-rundreise-tre-uker',
    title: 'Thailand på tre uker — tre ruter som faktisk fungerer',
    excerpt:
      'De fleste prøver å få med alt og bruker halve ferien på nattbuss. Her er tre ruter satt opp etter hvor mye du orker å flytte deg — og hva du bør droppe.',
    metaTitle: 'Thailand rundreise 3 uker — ferdige ruteforslag',
    metaDescription:
      'Tre gjennomtenkte ruter for tre uker i Thailand: nord og øyer, bare sør, eller den rolige varianten. Med reisetid, overnattingsfordeling og hva du bør kutte.',
    published: '2026-08-05',
    readMinutes: 9,
    topic: 'Planlegging',
    related: { destinations: ['bangkok', 'chiang-mai', 'krabi', 'koh-samui'], categories: [] },
    sections: [
      {
        h: 'Den vanligste tabben',
        p: [
          'Tre uker høres ut som lang tid. Så legger man inn Bangkok, Chiang Mai, Phuket, Krabi, Koh Samui og Koh Phangan — og plutselig er seks av tjueen dager brukt på transport.',
          'Thailand er større enn det ser ut på kartet. Bangkok til Chiang Mai er 70 mil. Vestkysten og østkysten ligger på hver sin side av halvøya, og å bytte mellom dem koster deg en hel dag.',
          'Regelen vi bruker selv: maks fire baser på tre uker, og minst fire netter på hvert sted du faktisk vil oppleve noe.',
        ],
      },
      {
        h: 'Rute 1 — klassikeren: nord og sør',
        p: [
          'Dette er ruten for deg som vil se to helt ulike Thailand: templer og fjell i nord, hav og øyer i sør.',
        ],
        table: {
          head: ['Dager', 'Sted', 'Hva du gjør'],
          rows: [
            ['1–4', 'Bangkok', 'Templer, Chao Phraya, gatemat, dagstur til Ayutthaya'],
            ['5–9', 'Chiang Mai', 'Elefantreservat, Doi Suthep, matkurs, gamlebyen'],
            ['10–11', 'Reise sørover', 'Fly Chiang Mai–Krabi, én overgangsnatt'],
            ['12–17', 'Krabi / Railay', 'Øyhopping, kajakk, klatring, strandliv'],
            ['18–21', 'Koh Lanta', 'Roligere avslutning, sen hjemreise fra Krabi'],
          ],
        },
      },
      {
        h: 'Rute 2 — bare sør, dobbelt så avslappet',
        p: [
          'Har du vært i Thailand før, eller reiser du med små barn, er dette den bedre ruten. Kortere avstander, mindre pakking, mer tid i vannet.',
        ],
        table: {
          head: ['Dager', 'Sted', 'Hva du gjør'],
          rows: [
            ['1–3', 'Bangkok', 'Kort byopphold før du drar videre'],
            ['4–10', 'Khao Lak eller Koh Lanta', 'Rolige strender, Similan eller Phi Phi som dagstur'],
            ['11–16', 'Krabi / Ao Nang', 'Øyhopping, mangroveturer, varme kilder'],
            ['17–21', 'Phuket', 'Siste dager nær flyplassen, kort vei hjem'],
          ],
        },
      },
      {
        h: 'Rute 3 — nord og Thailandsbukta (for sommerferie)',
        p: [
          'Reiser du i juli eller august, er vestkysten ustabil. Da bytter du ut Krabi og Phuket med øyene i Thailandsbukta, som har fint vær akkurat da.',
        ],
        table: {
          head: ['Dager', 'Sted', 'Hva du gjør'],
          rows: [
            ['1–3', 'Bangkok', 'Byen, templene, markedene'],
            ['4–9', 'Chiang Mai', 'Elefanter, fjell, grønt og frodig i regntiden'],
            ['10–15', 'Koh Samui', 'Strender, vannfall, dagstur til Ang Thong'],
            ['16–21', 'Koh Tao eller Koh Phangan', 'Dykking eller ro, ferge tilbake til Samui'],
          ],
        },
      },
      {
        h: 'Hva du bør droppe',
        list: [
          'Nattbuss og nattog for å «spare en natt». Du sparer ikke en natt, du ofrer den påfølgende dagen.',
          'Både Phuket og Krabi og Koh Samui på samme tur. Velg én kyst.',
          'Én natt hvor som helst. Det er en overgangsnatt, ikke et opphold.',
          'Å booke alle interne fly hjemmefra. Innenriks i Thailand er billig og fleksibelt — la de siste ukene stå åpne.',
        ],
      },
      {
        h: 'Hvor lang tid tar det egentlig å flytte seg?',
        table: {
          head: ['Strekning', 'Hvordan', 'Reell tid dør til dør'],
          rows: [
            ['Bangkok – Chiang Mai', 'Fly', 'Rundt 4 timer'],
            ['Bangkok – Krabi/Phuket', 'Fly', 'Rundt 4 timer'],
            ['Chiang Mai – Krabi', 'Fly, ofte med bytte', '6–9 timer'],
            ['Krabi – Koh Lanta', 'Buss og ferge', '3–4 timer'],
            ['Phuket – Phi Phi', 'Hurtigbåt', '2 timer hver vei'],
            ['Vestkysten – Koh Samui', 'Fly eller buss og ferge', 'En hel dag'],
          ],
        },
      },
      {
        h: 'Vårt råd',
        p: [
          'Velg rute etter når du reiser, ikke etter hva som ser flest ut på kartet. November til april: rute 1 eller 2. Mai til september: rute 3.',
          'Og legg de dyre dagsturene tidlig i oppholdet. Blir en båttur avlyst på grunn av vær, har du fortsatt dager igjen til å prøve på nytt.',
        ],
      },
    ],
    faq: [
      {
        q: 'Er tre uker for lenge i Thailand?',
        a: 'Nei. Tre uker er nok til å se to landsdeler uten å stresse. Med to uker bør du droppe nord og holde deg til én kyst i sør.',
      },
      {
        q: 'Bør jeg booke hotellene på forhånd?',
        a: 'Book de første nettene og eventuelt høysesong i romjulen. Resten kan du gjerne booke underveis — det gir deg friheten til å bli lenger et sted du liker.',
      },
      {
        q: 'Hvor mye koster tre uker?',
        a: 'Fly fra Norge ligger typisk mellom 6 000 og 12 000 kroner tur-retur avhengig av sesong. På bakken kommer du langt med 700–1 200 kroner dagen per person i mellomklasse. Se den detaljerte budsjettguiden vår.',
      },
    ],
  },
  {
    slug: 'bangkok-paa-tre-dager',
    title: 'Bangkok på tre dager — uten å stå i kø hele tiden',
    excerpt:
      'De tre store templene, én båttur, ett marked og én rooftop. Her er rekkefølgen som gjør at du slipper både varmen og verste køen.',
    metaTitle: 'Bangkok på 3 dager — komplett reiserute',
    metaDescription:
      'Tre dager i Bangkok, time for time: templene i riktig rekkefølge, hvordan du bruker elvebåtene, hvilke markeder som er verdt turen og hva du kan droppe.',
    published: '2026-08-05',
    readMinutes: 8,
    topic: 'Reiseruter',
    related: { destinations: ['bangkok'], categories: ['Mat & kultur'] },
    sections: [
      {
        h: 'Det korte svaret',
        p: [
          'Tre dager er nok til Bangkok hvis du er disiplinert på to ting: start tidlig, og ikke prøv å krysse byen mer enn én gang om dagen.',
          'Trafikken er byens virkelige utfordring. En tur som ser ut som tjue minutter på kartet kan ta en time i drosje klokka fem. Elvebåtene og skytoget går derimot alltid like fort.',
        ],
      },
      {
        h: 'Dag 1 — templene og elva',
        list: [
          'Klokka 08: Storpalasset og Wat Phra Kaew. Vær der når de åpner. Innen elleve er både varmen og bussgruppene på plass. Dekk skuldre og knær, ellers slipper du ikke inn.',
          'Klokka 11: Gå ti minutter til Wat Pho og den liggende Buddha. Ta en times thaimassasje i tempelets egen skole mens det er varmest ute.',
          'Klokka 14: Ferge over elva til Wat Arun. Den er finest i ettermiddagslyset.',
          'Klokka 18: Elvebåt nordover til solnedgang, og middag ved vannet.',
        ],
      },
      {
        h: 'Dag 2 — marked og mat',
        list: [
          'Formiddag: Chatuchak helgemarked hvis du er der lørdag eller søndag — 15 000 boder, ta med kontanter og lav forventning om å finne tilbake til noe.',
          'Er det hverdag: Or Tor Kor-markedet rett ved. Mindre, mye bedre mat, mindre kaos.',
          'Ettermiddag: Jim Thompson House. Et rolig pustehull midt i byen, og den beste innføringen i thailandsk arkitektur du får på en time.',
          'Kveld: Matkurs eller gatematvandring i Chinatown. Yaowarat våkner først etter mørkets frembrudd.',
        ],
      },
      {
        h: 'Dag 3 — velg selv',
        p: [
          'Den tredje dagen bør avhenge av hva du likte best de to første. Tre gode alternativer:',
        ],
        list: [
          'Dagstur til Ayutthaya — den gamle hovedstaden, halvannen time nordover med tog eller minibuss. Templer i ruiner, langt roligere enn Bangkok.',
          'Flytende marked og jernbanemarkedet i Maeklong — turistete, men jernbanemarkedet der togene kjører gjennom bodene er noe helt for seg selv.',
          'Bli i byen: Lumphini Park om morgenen, båt til Thonburi-kanalene, og en rooftop på ettermiddagen.',
        ],
      },
      {
        h: 'Hva du kan droppe',
        list: [
          'Khao San Road, med mindre du er nysgjerrig i tjue minutter. Det er ikke Bangkok, det er en gate for turister.',
          'Alle som stopper deg utenfor et tempel og sier at det er «stengt i dag». Det er det ikke. Det er starten på en skredderselgersvindel.',
          'Drosje uten taksameter. Si «meter, please» eller ta neste bil. Appene fungerer godt i Bangkok.',
        ],
      },
      {
        h: 'Praktisk',
        table: {
          head: ['Ting', 'Råd'],
          rows: [
            ['Hvor du bør bo', 'Nær skytoget (Sukhumvit eller Silom) eller ved elva. Ikke midt i gamlebyen — det er langt fra alt kollektivt.'],
            ['Kleskode i templer', 'Skuldre og knær dekket, gjelder alle. Ta med et sjal.'],
            ['Beste tid på dagen', 'Før 10 og etter 16. Midt på dagen er det for varmt til å gå.'],
            ['Kontanter', 'Ja, til gatemat og markeder. Kort fungerer på restauranter og i butikk.'],
          ],
        },
      },
    ],
    faq: [
      {
        q: 'Er tre dager nok i Bangkok?',
        a: 'For å se hovedattraksjonene, ja. Vil du oppleve byen mer enn å krysse av på lista, er fire til fem dager bedre — Bangkok belønner den som blir litt lenger.',
      },
      {
        q: 'Er Bangkok trygt?',
        a: 'Ja, vold mot turister er sjelden. Det du skal se opp for er svindel: skreddere, edelstener, drosjer uten taksameter og «tempelet er stengt i dag».',
      },
      {
        q: 'Bør jeg legge Bangkok først eller sist på turen?',
        a: 'Først. Da har du byen unnagjort mens du fortsatt er ny og nysgjerrig, og kan avslutte ferien på en strand i stedet for i trafikken.',
      },
    ],
  },
  {
    slug: 'hvilken-oy-i-thailand',
    cta: {
      h: 'Se det måned for måned',
      p: 'Værkartet vårt viser alle fire regionene i Thailand for hver eneste måned — og hvorfor de to kystene er speilvendte.',
      label: 'Åpne værkartet',
      to: '/naar-reise',
    },
    title: 'Hvilken thailandsk øy passer for deg?',
    excerpt:
      'Phuket, Krabi, Koh Samui, Koh Lanta, Koh Tao, Koh Phangan. De er ikke varianter av det samme — de er helt ulike ferier. Her er hvem hver av dem passer for.',
    metaTitle: 'Beste øy i Thailand — slik velger du riktig',
    metaDescription:
      'Sammenligning av de mest populære øyene i Thailand: hvem de passer for, når du bør reise dit, hvor lett de er å komme til og hva de koster.',
    published: '2026-08-05',
    readMinutes: 8,
    topic: 'Reisemål',
    related: { destinations: ['phuket', 'krabi', 'koh-samui'], categories: ['Øyer & strender'] },
    sections: [
      {
        h: 'Første spørsmål: når reiser du?',
        p: [
          'Dette avgjør mer enn noe annet. Vestkysten — Phuket, Krabi, Koh Lanta, Phi Phi — er fin fra november til april. Østkysten — Koh Samui, Koh Phangan, Koh Tao — er fin fra februar til august.',
          'Reiser du i juli, er valget enkelt: østkysten. Reiser du i januar, er det vestkysten. Først når måneden er avklart, blir det interessant å sammenligne øyene.',
        ],
      },
      {
        h: 'Kort oversikt',
        table: {
          head: ['Øy', 'Passer for', 'Beste tid', 'Adkomst'],
          rows: [
            ['Phuket', 'Førstegangsreisende, familier, kort reisevei', 'Nov–apr', 'Egen flyplass'],
            ['Krabi / Railay', 'Natur, klatring, dramatisk landskap', 'Nov–apr', 'Flyplass, så båt'],
            ['Koh Lanta', 'Rolige familier, lange strender', 'Nov–apr', 'Buss og ferge fra Krabi'],
            ['Phi Phi', 'Dagstur, ikke opphold', 'Nov–apr', 'Båt fra Phuket eller Krabi'],
            ['Koh Samui', 'Komfort, hotellstandard, sommerferie', 'Feb–aug', 'Egen flyplass'],
            ['Koh Phangan', 'Yngre reisende, ro utenom fullmåne', 'Feb–aug', 'Ferge fra Samui'],
            ['Koh Tao', 'Dykking og snorkling', 'Feb–aug', 'Ferge, lengst reisevei'],
          ],
        },
      },
      {
        h: 'Phuket — enklest, men ikke roligst',
        p: [
          'Phuket er Thailands største øy og har egen internasjonal flyplass. Det gjør den til det enkleste valget hvis du har begrenset tid eller reiser med barn.',
          'Til gjengjeld er den mest utbygd. Patong er høyt tempo og uteliv. Kata og Karon er roligere og familievennlige. Nord på øya — Mai Khao, Nai Yang — er det stille nok til at du hører bølgene.',
          'Velger du feil område på Phuket, får du en helt annen ferie enn den du så for deg. Les om områdene før du booker hotell.',
        ],
      },
      {
        h: 'Krabi — for deg som vil se noe',
        p: [
          'Krabi har det mest dramatiske landskapet i Thailand: kalksteinstårnene som stiger rett opp av havet. Railay nås bare med båt og føles som et eget sted.',
          'Strendene er ikke nødvendigvis bedre enn på Phuket, men omgivelsene er i en annen klasse. Dette er øyhopping, kajakk og klatring — ikke lange dager i solsengen.',
        ],
      },
      {
        h: 'Koh Samui — komfort og sommerferie',
        p: [
          'Samui har den beste hotellstandarden av øyene i Thailandsbukta og egen flyplass. Det er også svaret for nordmenn som må reise i fellesferien, siden juli og august er fint her mens vestkysten er våt.',
          'Ulempen er november og desember, som er øyas våteste måneder. Skal du til Thailand i romjulen, dra vestover i stedet.',
        ],
      },
      {
        h: 'Koh Lanta — den undervurderte',
        p: [
          'Lange strender, lavt tempo og betydelig færre folk enn Phuket. Kommer du deg dit — buss og ferge fra Krabi — får du en rolig ferie til lavere pris.',
          'Passer godt for familier med litt større barn og for par som vil ha strand uten uteliv.',
        ],
      },
      {
        h: 'Phi Phi — dra på dagstur, ikke bo der',
        p: [
          'Maya Bay og kalksteinsformasjonene er verdt å se. Men selve Phi Phi Don er tett bebygd, høylytt om natten og dyrt for det du får.',
          'Vårt råd: bo på Phuket, Krabi eller Lanta og ta Phi Phi som dagstur. Da får du landskapet uten støyen.',
        ],
      },
      {
        h: 'Vårt råd',
        list: [
          'Første gang i Thailand, med barn, i vinterhalvåret: Phuket, i et rolig område.',
          'Vil ha natur og opplevelser: Krabi eller Railay.',
          'Reiser i norsk fellesferie: Koh Samui.',
          'Vil ha ro og lengre opphold: Koh Lanta.',
          'Skal dykke: Koh Tao, og sett av minst en uke.',
        ],
      },
    ],
    faq: [
      {
        q: 'Kan jeg kombinere øyer fra begge kyster?',
        a: 'Du kan, men det koster deg en hel reisedag hver vei. På under to uker anbefaler vi å velge én kyst.',
      },
      {
        q: 'Hvilken øy er billigst?',
        a: 'Koh Lanta og Koh Phangan ligger jevnt over lavere enn Phuket og Samui, både på hotell og mat. Forskjellen er størst i høysesong.',
      },
      {
        q: 'Hvilken øy har best strender?',
        a: 'Spørsmålet har ikke ett svar. Koh Lanta og nordlige Phuket har de lengste sandstrendene, Railay det vakreste landskapet, og Koh Tao det klareste vannet for snorkling.',
      },
    ],
  },
  {
    slug: 'pakkeliste-thailand',
    title: 'Pakkeliste til Thailand — og de fem tingene folk glemmer',
    excerpt:
      'Du trenger mindre enn du tror. Men fem små ting gjør større forskjell enn halve kofferten, og de er lette å glemme hjemme.',
    metaTitle: 'Pakkeliste Thailand — hva du faktisk trenger',
    metaDescription:
      'Komplett pakkeliste til Thailand: klær, apotek, dokumenter og elektronikk. Hva du kan kjøpe billigere der, og de fem tingene folk angrer på at de glemte.',
    published: '2026-08-05',
    readMinutes: 6,
    topic: 'Praktisk',
    related: { destinations: [], categories: [] },
    sections: [
      {
        h: 'Grunnregelen',
        p: [
          'Thailand er varmt, billig og har butikker overalt. Glemmer du en t-skjorte, koster den femti kroner på nærmeste marked. Glemmer du reseptmedisinen din, er det verre.',
          'Pakk lett for klær, nøye for det som ikke kan erstattes.',
        ],
      },
      {
        h: 'De fem tingene folk glemmer',
        list: [
          'Et tynt sjal eller skjorte som dekker skuldrene. Uten det slipper du ikke inn i templene, og du kommer til å besøke templer.',
          'Myggmiddel med DEET. Det selges der også, men du trenger det den første kvelden, ikke dagen etter.',
          'Elektrolyttpulver. Du svetter langt mer enn hjemme, og hodepinen dag tre er som regel væskemangel, ikke solstikk.',
          'Reseptmedisin i originalpakning, med kopi av resepten. Enkelte vanlige legemidler er strengt regulert i Thailand.',
          'Et par sokker. Du tar av skoene i templer, og steinhellene blir brennende varme midt på dagen.',
        ],
      },
      {
        h: 'Klær',
        list: [
          'Lette, luftige plagg i bomull eller lin. Unngå tettsittende syntetiske stoffer.',
          'Ett langermet plagg — til templer, til fly, og til kjølige kvelder i Chiang Mai i desember og januar.',
          'Sandaler du kan gå i, og som tåler vann. Du kommer til å ta dem av og på ti ganger om dagen.',
          'Badetøy, gjerne to sett. Det ene rekker sjelden å tørke.',
          'Regnjakke bare hvis du reiser i regntiden — og da en tynn en, ikke en turjakke.',
        ],
      },
      {
        h: 'Apotek og helse',
        list: [
          'Solkrem med høy faktor. Dyrere i Thailand enn hjemme, og mye er tilsatt blekemiddel.',
          'Myggmiddel og eventuelt et middel mot kløe.',
          'Reisesyketabletter hvis du skal på båtturer.',
          'Plaster, smertestillende og noe mot magen.',
          'Håndsprit til gatemat.',
        ],
      },
      {
        h: 'Dokumenter og penger',
        list: [
          'Pass med god gyldighet igjen — mange land krever seks måneder ved innreise, så sjekk kravene i god tid.',
          'Reiseforsikring, og skriv ned nødnummeret separat fra telefonen.',
          'Et kort som ikke tar valutapåslag, pluss et ekstra kort på et annet sted enn lommeboken.',
          'Litt kontanter. Minibanker i Thailand tar et fast gebyr per uttak, så ta ut større beløp sjeldnere.',
        ],
      },
      {
        h: 'Hva du kan kjøpe der i stedet',
        table: {
          head: ['Ting', 'Hvorfor vente'],
          rows: [
            ['Klær', 'Billig overalt, og du kommer uansett til å kjøpe noe'],
            ['Toalettsaker', 'Samme merker, lavere pris'],
            ['Strandhåndkle', 'Finnes på hvert eneste marked'],
            ['Adapter', 'Thailand bruker stort sett samme uttak som Norge — sjekk apparatene dine, mange trenger ingenting'],
            ['SIM-kort', 'Kjøp på flyplassen, koster lite og virker med en gang'],
          ],
        },
      },
      {
        h: 'Vårt råd',
        p: [
          'Pakk for én uke, uansett hvor lenge du skal være. Vasking koster nesten ingenting i Thailand og tar en dag.',
          'Og la det være plass igjen i kofferten. Du skal hjem med mer enn du dro med.',
        ],
      },
    ],
    faq: [
      {
        q: 'Trenger jeg vaksiner til Thailand?',
        a: 'Snakk med legen din eller en vaksinasjonsklinikk i god tid før avreise. Anbefalingene avhenger av hvor du skal, hvor lenge og av din egen helse, og de oppdateres jevnlig — vi gir ikke medisinske råd her.',
      },
      {
        q: 'Kan jeg drikke vann fra springen?',
        a: 'Nei, drikk flaskevann eller filtrert vann. Is på restauranter og barer er derimot vanligvis laget av renset vann og er trygt.',
      },
      {
        q: 'Hvor stor koffert trenger jeg?',
        a: 'En vanlig håndbagasje pluss en liten ryggsekk holder for de fleste på to til tre uker. Skal du flytte deg mye mellom øyer, blir en stor koffert fort et problem på båtene.',
      },
    ],
  },
  {
    slug: 'thailand-i-vinterferien',
    cta: {
      h: 'Se det måned for måned',
      p: 'Værkartet vårt viser alle fire regionene i Thailand for hver eneste måned — og hvorfor de to kystene er speilvendte.',
      label: 'Åpne værkartet',
      to: '/naar-reise',
    },
    title: 'Thailand i vinterferien og påsken — hva du bør vite',
    excerpt:
      'Uke åtte i Thailand er nesten perfekt. Påsken er det ikke — og forskjellen handler om noe folk sjelden nevner: røyken i nord og varmen i april.',
    metaTitle: 'Thailand i vinterferien — beste steder i februar og påsken',
    metaDescription:
      'Skal du til Thailand i vinterferien eller påsken? Slik er været i februar mot april, hvor du bør dra, hvorfor du bør droppe Chiang Mai i påsken, og når du bør booke.',
    published: '2026-08-05',
    readMinutes: 6,
    topic: 'Planlegging',
    related: { destinations: ['phuket', 'krabi', 'koh-samui'], categories: [] },
    sections: [
      {
        h: 'Det korte svaret',
        p: [
          'Vinterferien i februar er noe av det beste Thailand kan by på. Tørt over hele landet, behagelig varme og rolig sjø.',
          'Påsken er vanskeligere. April er årets varmeste måned, og i nord brennes åkrene — lufta i Chiang Mai er da blant de dårligste i verden.',
        ],
      },
      {
        h: 'Vinterferie — uke 8 og 9',
        p: [
          'Februar er den eneste måneden i året der alle fire regionene i Thailand har godt vær samtidig. Du kan reise hvor som helst uten å tenke på regntid.',
          'Vestkysten er tørr, Thailandsbukta har begynt sin gode sesong, Bangkok er behagelig, og Chiang Mai er kjølig og klar — men bare første halvdel av måneden, før brenningen starter.',
        ],
        list: [
          'Best for familier: Phuket eller Krabi, gjerne i et rolig område.',
          'Best for opplevelser: Chiang Mai tidlig i februar, med elefantreservat og fjell.',
          'Best for ro: Koh Lanta.',
        ],
      },
      {
        h: 'Påske — vær forsiktig med nord',
        p: [
          'I påsken kan det være 38–40 grader i Bangkok, og luftfuktigheten gjør at det oppleves tyngre enn tallet tilsier. Templer og byvandring blir slitsomt.',
          'Verre er det i nord. Fra slutten av februar til inn i april brennes rismarkene, og røyken legger seg over Chiang Mai i uker. Har du astma, allergi eller små barn, bør du ikke legge påsken dit.',
          'Kysten er derimot fin. Både vestkysten og Thailandsbukta har godt vær i april, og havet er den eneste stedet varmen faktisk er behagelig.',
        ],
      },
      {
        h: 'Songkran — thailandsk nyttår',
        p: [
          'Midt i april feires Songkran, og hele landet går i vannkrig i tre dager. Det er en av verdens morsomste festivaler hvis du er forberedt, og et mareritt hvis du ikke er det.',
          'Du blir våt. Det er ikke et spørsmål. Legg vekk alt som ikke tåler vann, og bli med i stedet for å prøve å unngå det.',
          'Transport og hoteller er utsolgt lenge i forveien i denne perioden. Skal du reise i påsken og påsken faller sammen med Songkran, book tidlig.',
        ],
      },
      {
        h: 'Når du bør booke',
        table: {
          head: ['Reisetidspunkt', 'Book senest', 'Hvorfor'],
          rows: [
            ['Jul og romjul', 'August–september', 'Årets dyreste og mest utsolgte periode'],
            ['Vinterferie (uke 8–9)', 'September–oktober', 'Norske skoleferier presser prisene opp samtidig'],
            ['Påske', 'Oktober–november', 'Songkran fyller opp transport og hoteller'],
            ['Mai–oktober', '1–3 måneder før', 'Lavsesong, god plass og lave priser'],
          ],
        },
      },
      {
        h: 'Vårt råd',
        p: [
          'Kan du velge, ta vinterferien framfor påsken. Er du bundet til påsken, hold deg til kysten og dropp Chiang Mai det året.',
          'Og book tidlig. Norske skoleferier er de samme for alle, og prisene på fly til Bangkok merker det.',
        ],
      },
    ],
    faq: [
      {
        q: 'Er det for varmt i Thailand i påsken?',
        a: 'I innlandet, ja — Bangkok og nord kan være 38–40 grader. Ved kysten er det behagelig, fordi sjøbrisen tar av for varmen.',
      },
      {
        q: 'Bør jeg unngå Songkran?',
        a: 'Nei, hvis du liker folkefester. Ja, hvis du planlegger lange reisedager eller vil ha ro. Transport er kaotisk de tre dagene.',
      },
      {
        q: 'Hvor mye dyrere er vinterferien?',
        a: 'Fly i norske skoleferier ligger typisk merkbart over prisene noen uker før eller etter. Kan du reise uken før eller etter uke 8, sparer du ofte betydelig.',
      },
    ],
  },

  /* ------------------------------------------------------------------
   * «Bo i Thailand»-søylen. Skrevet for nordmenn som vurderer
   * langtidsopphold — pensjonister, langtidsturister og fjernarbeidere.
   * Regler, satser og kurser endres; alt som kan gå ut på dato peker
   * derfor til offisielle kilder i stedet for å late som det er fasit.
   * ------------------------------------------------------------------ */
  {
    slug: 'hva-koster-det-a-bo-i-thailand',
    title: 'Hva koster det å bo i Thailand?',
    excerpt:
      'Et komfortabelt liv i Thailand koster typisk en tredjedel til halvparten av Norge. Her er ekte tall for bolig, mat og de postene folk glemmer — som helseforsikringen.',
    metaTitle: 'Hva koster det å bo i Thailand? Ekte månedsbudsjetter',
    metaDescription:
      'Månedsbudsjett for å bo i Thailand: leiepriser by for by, mat, transport og helseforsikring. Tre eksempelbudsjetter — nøkternt, komfortabelt og romslig.',
    published: '2026-08-06',
    readMinutes: 8,
    topic: 'Bo i Thailand',
    related: { destinations: ['chiang-mai', 'hua-hin'], categories: [] },
    sections: [
      {
        h: 'Det korte svaret',
        p: [
          'En enslig voksen lever komfortabelt i de fleste thailandske byer for cirka 15 000–25 000 kroner i måneden, alt inkludert. Nøkternt går det an å komme ned mot 10 000–12 000. Et romslig liv med vestlig standard, mye restaurant og bil ligger fra 30 000 og oppover. Grovt regnet: en tredjedel til halvparten av hva tilsvarende liv koster i Norge.',
          'Alle tall i denne guiden er cirka-beløp regnet med en kurs på rundt 30–33 øre per baht. Kursen svinger, så sjekk dagens nivå før du regner på egen økonomi.',
        ],
      },
      {
        h: 'Bolig: det store kuttet fra norske priser',
        p: [
          'Leie er der Thailand virkelig er billigere enn Norge. En moderne ettroms leilighet (condo) med basseng og treningsrom i bygget koster en brøkdel av en tilsvarende norsk leilighet — og du leier møblert.',
        ],
        table: {
          head: ['By', 'Ettroms condo, typisk leie', 'Cirka i kroner'],
          rows: [
            ['Chiang Mai', '8 000–15 000 baht', '2 500–5 000 kr'],
            ['Hua Hin', '10 000–18 000 baht', '3 200–5 800 kr'],
            ['Bangkok (sentralt)', '15 000–30 000 baht', '4 800–9 700 kr'],
            ['Phuket', '15 000–35 000 baht', '4 800–11 300 kr'],
          ],
        },
      },
      {
        h: 'Mat: billig ute, dyrt vestlig',
        list: [
          'Gatekjøkken og lokale spisesteder: 60–100 baht (20–35 kr) per rett. Mange som bor i Thailand lager knapt middag selv.',
          'Thai-restaurant: 150–300 baht per rett.',
          'Vestlig restaurant: 300–500 baht og oppover — fort norske priser.',
          'Importvarer i butikk (ost, vin, norsk sjokolade) er dyre, ofte dyrere enn hjemme. Alkohol er høyt avgiftsbelagt.',
        ],
      },
      {
        h: 'Postene folk glemmer',
        list: [
          'Helseforsikring — den største og viktigste posten for alle som blir mer enn noen måneder. Prisen stiger kraftig med alder; les pensjonistguiden vår for detaljene.',
          'Strøm til aircondition: 2 000–4 000 baht i måneden i de varme månedene hvis du kjøler leiligheten mye.',
          'Visumkostnader og fornyelser gjennom året.',
          'Flyreiser hjem til Norge — én til to i året er vanlig.',
          'Scooter eller bil: leie av scooter fra rundt 3 000 baht i måneden. Bil er dyrt i Thailand.',
        ],
      },
      {
        h: 'Tre eksempelbudsjetter (enslig, per måned)',
        p: [
          'Tallene er planleggingsgrunnlag, ikke fasit. Helseforsikring står som egen linje fordi den varierer enormt med alder — en frisk 35-åring og en 68-åring betaler helt ulike premier.',
        ],
        table: {
          head: ['Post', 'Nøkternt', 'Komfortabelt', 'Romslig'],
          rows: [
            ['Bolig', '3 000 kr', '5 000 kr', '9 000 kr'],
            ['Mat og drikke', '3 500 kr', '5 500 kr', '9 000 kr'],
            ['Transport', '800 kr', '1 500 kr', '3 500 kr'],
            ['Moro, trening, diverse', '2 000 kr', '4 000 kr', '7 000 kr'],
            ['Helseforsikring (aldersavhengig)', '800–2 500 kr', '800–2 500 kr', '1 500–4 000 kr'],
            ['Sum cirka', '10–12 000 kr', '17–19 000 kr', '30–33 000 kr'],
          ],
        },
      },
      {
        h: 'Hvor pengene rekker lengst',
        p: [
          'Chiang Mai er klassikeren for lave kostnader med storbyfasiliteter. Hua Hin gir sjøliv til fornuftig pris og har et stort skandinavisk miljø. Bangkok koster mer, men gir mest by for pengene. Phuket og Koh Samui er dyrest — øypåslag på det meste, spesielt bolig.',
        ],
      },
      {
        h: 'Ærlig forbehold',
        p: [
          'Valutakurs, inflasjon og din egen livsstil flytter alle tallene her. Thailand har også strammet inn på skattereglene for penger utlendinger tar inn i landet — er du der mer enn 180 dager i året, bør du få råd fra noen som kan både norske og thailandske regler før du flytter økonomien din. Sjekk Skatteetaten og NAV for din situasjon.',
        ],
      },
    ],
    cta: {
      h: 'Først en rekognoseringstur?',
      p: 'De fleste som flytter, tar en lengre tur først for å teste byene. Regn ut hva turen koster med kalkulatoren vår.',
      label: 'Åpne reisebudsjettet',
      to: '/reisebudsjett',
    },
    faq: [
      {
        q: 'Kan man leve av 15 000 kroner i måneden i Thailand?',
        a: 'Ja, mange gjør det — komfortabelt utenfor Bangkok og Phuket. Men marginene blir små når helseforsikring og flyreiser hjem regnes inn, så ha en buffer i tillegg.',
      },
      {
        q: 'Er Thailand fortsatt billig, eller er det en myte?',
        a: 'Fortsatt klart billigere enn Norge på bolig, mat ute, transport og tjenester. Unntakene er importvarer, alkohol og alt vestlig — der er forskjellen liten eller fraværende.',
      },
      {
        q: 'Hva med skatt når jeg bor i Thailand?',
        a: 'Norsk pensjon har som hovedregel kildeskatt, og Thailand har egne regler for penger du tar inn i landet. Dette feltet endrer seg — få profesjonell rådgivning, og sjekk Skatteetaten før du melder flytting.',
      },
    ],
  },
  {
    slug: 'pensjonist-i-thailand',
    title: 'Pensjonist i Thailand: visum, penger og helse',
    excerpt:
      'Tusenvis av nordmenn har gjort det. Her er de tre tingene som må på plass — pensjonistvisum, helseforsikring og NAV-avklaring — og fellene du må unngå.',
    metaTitle: 'Pensjonist i Thailand — visum, pensjon, skatt og helse',
    metaDescription:
      'Alt en norsk pensjonist må vite før flytting til Thailand: krav til pensjonistvisum, hva som skjer med pensjonen og folketrygden, helseforsikring og hvor nordmenn bor.',
    published: '2026-08-06',
    readMinutes: 9,
    topic: 'Bo i Thailand',
    related: { destinations: ['hua-hin', 'pattaya'], categories: [] },
    sections: [
      {
        h: 'Det korte svaret',
        p: [
          'Å bli pensjonist i Thailand er fullt mulig og godt opptråkket — tusenvis av nordmenn bor der hele eller deler av året. Tre ting må løses, i denne rekkefølgen: visumet (grei sak hvis økonomien er ryddig), helseforsikringen (den virkelige kostnaden), og avklaringen med NAV og Skatteetaten før du flytter (den folk angrer på at de tok for lett på).',
        ],
      },
      {
        h: 'Pensjonistvisumet',
        p: [
          'Thailand har egne visum for pensjonister fra fylte 50 år. Kjernekravet er økonomisk: i en årrekke har det vært enten cirka 800 000 baht stående i thailandsk bank, eller dokumentert månedlig inntekt på cirka 65 000 baht — rundt 20 000 kroner etter dagens kursnivå. En vanlig norsk pensjon oppfyller ofte inntektskravet alene.',
          'Visumet fornyes årlig, og du melder adresse til immigrasjonen hver 90. dag — en enkel rutine når du først kan den. Satser og regler endres uten forvarsel, så sjekk thailandske myndigheter eller ambassaden i Oslo for gjeldende krav før du søker. Skal du ut av landet og tilbake, trenger du re-entry permit — glemmer du det, kan visumet falle bort.',
        ],
      },
      {
        h: 'Pensjonen din: hva skjer med den?',
        list: [
          'Alderspensjonen fra folketrygden utbetales som hovedregel også når du bor i utlandet.',
          'Enkelte tillegg og garantiytelser kan falle bort ved flytting — dette må du få avklart skriftlig med NAV før du bestemmer deg.',
          'Skatt: som hovedregel trekkes kildeskatt av norsk pensjon når du er skattemessig bosatt i utlandet. Norge og Thailand har skatteavtale, og Thailand har de siste årene endret reglene for beskatning av penger som tas inn i landet. Få råd fra noen som kan begge land.',
          'Tjenestepensjon og privat sparing: sjekk vilkårene hos hver leverandør — de er ikke like.',
        ],
      },
      {
        h: 'Helse: posten som avgjør om regnestykket går opp',
        p: [
          'Dette er den viktigste delen av hele guiden. Medlemskapet i folketrygden opphører som hovedregel når du har bodd i utlandet i over tolv måneder — da dekker ikke Norge lenger helseutgiftene dine. Privat helseforsikring er derfor ikke valgfritt, det er fundamentet.',
          'Premien stiger bratt med alder, og etter fylte 70 blir det både dyrt og vanskelig å tegne ny forsikring — særlig med eksisterende diagnoser. Regelen er derfor enkel: tegn forsikringen tidlig, og hold den ubrutt. Det finnes også en ordning med frivillig medlemskap i folketrygden under utenlandsopphold; den koster, men kan være riktig for noen — spør NAV.',
          'Selve helsevesenet er ikke problemet: de private sykehusene i Bangkok og turistbyene holder internasjonal toppstandard, ofte med kortere ventetid enn i Norge. Det er regningen uten forsikring som velter folk.',
        ],
      },
      {
        h: 'Der nordmenn faktisk bor',
        table: {
          head: ['Sted', 'Hvorfor dit', 'Passer for'],
          rows: [
            ['Hua Hin', 'Rolig badeby med stort skandinavisk miljø, golf og gode sykehus', 'De som vil ha ro og trygghet'],
            ['Pattaya/Jomtien', 'Størst norsk miljø, alt på plass, kort vei til Bangkok', 'De som vil ha nettverk fra dag én'],
            ['Chiang Mai', 'Lavest kostnader, behagelige vintre, kulturby', 'De budsjettbevisste'],
            ['Phuket', 'Strand, internasjonal flyplass, størst utvalg', 'De som prioriterer øyliv'],
          ],
        },
      },
      {
        h: 'Fellene å unngå',
        list: [
          'Å kjøpe bolig første året. Lei i 3–6 måneder først — området du elsker i februar kan være et annet sted i regntiden.',
          'Å reise uten skriftlig avklaring fra NAV og Skatteetaten om pensjon, medlemskap og skatt.',
          'Å la helseforsikringen vente «til det trengs». Da er den dyrest — eller uoppnåelig.',
          'Å miste BankID eller norsk bankforbindelse. Du trenger dem til NAV, Skatteetaten og alt norsk resten av livet. Avklar med banken din at du kan beholde kundeforholdet fra utlandet.',
        ],
      },
    ],
    cta: {
      h: 'Se pensjonistfavoritten',
      p: 'Hua Hin er byen flest norske pensjonister velger — rolig, trygg og med et stort skandinavisk miljø. Les hvorfor.',
      label: 'Les om Hua Hin',
      to: '/reisemal/hua-hin',
    },
    faq: [
      {
        q: 'Må jeg melde flytting til folkeregisteret?',
        a: 'Skal du oppholde deg i utlandet i mer enn seks måneder, har du som hovedregel meldeplikt. Meldingen påvirker skatt og medlemskap i folketrygden, så sett deg inn i konsekvensene hos Skatteetaten og NAV før du melder.',
      },
      {
        q: 'Hvor mye pensjon trenger jeg for visumet?',
        a: 'Inntektsveien har i en årrekke krevd cirka 65 000 baht i måneden — rundt 20 000 kroner etter dagens kursnivå. Alternativt cirka 800 000 baht på thailandsk bankkonto. Sjekk gjeldende satser hos thailandske myndigheter — de kan endres.',
      },
      {
        q: 'Kan jeg bo i Thailand halve året og Norge halve?',
        a: 'Ja, mange gjør nettopp det — vinter i Thailand, sommer i Norge. Da beholder du normalt medlemskapet i folketrygden, og mange av flyttespørsmålene forsvinner. Det er den enkleste varianten å starte med.',
      },
      {
        q: 'Er det norsk miljø der nede?',
        a: 'Ja. Pattaya og Hua Hin har store skandinaviske miljøer med foreninger og treffsteder, og Sjømannskirken er til stede i Thailand. Du trenger ikke starte alene.',
      },
    ],
  },
  {
    slug: 'flytte-til-thailand-sjekkliste',
    title: 'Flytte til Thailand fra Norge: sjekklisten',
    excerpt:
      'Flytt i etapper og brenn ingen broer første året. Her er hele løpet — fra tolv måneder før avreise til de første ukene i Thailand — som konkret sjekkliste.',
    metaTitle: 'Flytte til Thailand fra Norge — komplett sjekkliste',
    metaDescription:
      'Konkret sjekkliste for å flytte til Thailand: visum, NAV og skatt, bank og BankID, helseforsikring, hva du gjør de første ukene — og den viktigste regelen: lei før du kjøper.',
    published: '2026-08-06',
    readMinutes: 8,
    topic: 'Bo i Thailand',
    related: { destinations: ['bangkok', 'chiang-mai'], categories: [] },
    sections: [
      {
        h: 'Prinsippet: flytt i etapper',
        p: [
          'De vellykkede flyttingene ser like ut: en lengre rekognoseringstur først, leid bolig det første året, og ingen brente broer hjemme før livet der nede faktisk fungerer. De mislykkede ser også like ut — solgt alt i Norge, kjøpt bolig i Thailand første måneden, og hjem igjen etter et år, dyrere og fattigere.',
        ],
      },
      {
        h: '6–12 måneder før',
        list: [
          'Avklar oppholdsgrunnlaget: pensjonistvisum fra 50 år, egne visum for fjernarbeidere, eller andre varianter. Reglene er i endring — bruk thailandske myndigheters egne sider, ikke forum.',
          'Ta rekognoseringsturen — gjerne i regntiden. En by du liker i september, tåler du hele året.',
          'Få helseforsikring på plass tidlig. Premien er lavest og tilgangen best jo før du tegner.',
          'Snakk med NAV og Skatteetaten om nøyaktig din situasjon: pensjon, medlemskap i folketrygden, skatt. Be om svar skriftlig.',
          'Bygg buffer: minst seks måneders levekostnader utover det daglige budsjettet.',
        ],
      },
      {
        h: '3 måneder før',
        list: [
          'Bestem hva som skjer med boligen i Norge — utleie gir inntekt og en vei tilbake.',
          'Skal du være ute over seks måneder: undersøk meldeplikten til folkeregisteret og hva den utløser.',
          'Fastlege: fornye resepter, få medisinliste på engelsk, og sjekk at medisinene dine er lovlige i Thailand — enkelte norske reseptmedisiner er strengt regulert der.',
          'Gjennomgå forsikringer: hva gjelder i utlandet, hva må sies opp, hva må tegnes nytt.',
        ],
      },
      {
        h: '1 måned før',
        list: [
          'Sikre norsk bank og BankID — avklar med banken at kundeforholdet består med utenlandsadresse. Uten BankID stopper alt norsk.',
          'Ordne postadresse i Norge (familie eller postboks) for det som fortsatt kommer på papir.',
          'Si opp abonnementer, strøm og alt som løper.',
          'Skann pass, vitnemål, attester og forsikringspapirer til skyen.',
          'Sjekk anbefalte vaksiner i god tid.',
        ],
      },
      {
        h: 'De første ukene i Thailand',
        list: [
          'Thai SIM-kort eller eSIM første dagen — alt i Thailand skjer på mobilen.',
          'Utleier skal registrere deg hos immigrasjonen (TM30) — spør om det er gjort.',
          'Legg 90-dagersmeldingen inn i kalenderen med varsel.',
          'Åpne thailandsk bankkonto når visum og leiekontrakt er på plass.',
          'Skal du kjøre: internasjonalt førerkort fra Norge, og kjør defensivt — trafikken er landets største reelle risiko.',
          'Overfør penger med spesialiserte overføringstjenester framfor vanlig bankoverføring — bedre kurs, lavere gebyr. Større beløp sjeldnere slår små beløp ofte.',
        ],
      },
      {
        h: 'Den viktigste regelen: lei før du kjøper',
        p: [
          'Lei i 3–6 måneder før du binder deg til noe som helst. Og vit hva du går til hvis du senere vil kjøpe: utlendinger kan eie leilighet i Thailand (condo, med utlendingskvote i bygget), men ikke tomt eller landjord. Vær ytterst skeptisk til konstruksjoner som lover deg hus «via et selskap» — det er en juridisk gråsone som har kostet mange utlendinger dyrt.',
        ],
      },
      {
        h: 'Fjernarbeid fra Thailand?',
        p: [
          'Å jobbe for thailandsk arbeidsgiver krever arbeidstillatelse. For fjernarbeid mot arbeidsgiver eller kunder utenfor Thailand har landet de siste årene fått egne visumtyper for langtidsopphold og digitale nomader. Feltet er nytt og reglene justeres — sjekk thailandske myndigheters offisielle informasjon før du planlegger rundt det, og avklar skatteplikten i begge land.',
        ],
      },
    ],
    cta: {
      h: 'Neste steg: regn på livet der nede',
      p: 'Se hva bolig, mat og helseforsikring faktisk koster i måneden — med tre ferdige eksempelbudsjetter.',
      label: 'Les kostnadsguiden',
      to: '/guider/hva-koster-det-a-bo-i-thailand',
    },
    faq: [
      {
        q: 'Kan jeg ta med kjæledyr til Thailand?',
        a: 'Ja, med mikrochip, vaksinasjonspapirer og importtillatelse. Prosessen tar tid, så start flere måneder før avreise.',
      },
      {
        q: 'Bør jeg ta med bilen?',
        a: 'Nei. Importavgiftene på biler til Thailand er så høye at det i praksis er uaktuelt. Kjøp eller lei lokalt — eller klar deg med scooter og Grab, som de fleste gjør.',
      },
      {
        q: 'Må jeg kunne thai?',
        a: 'Du kommer langt med engelsk i byene og turistområdene. Men tall, mat og høflighetsfraser på thai åpner dører, gir bedre priser og mer respekt. Lær det grunnleggende — det er en liten investering med stor avkastning.',
      },
      {
        q: 'Hva med barn og skole?',
        a: 'Internasjonale skoler finnes i alle større byer, med stor variasjon i pris og kvalitet — fra noen tusen til over tjue tusen kroner i måneden. For barnefamilier er skolepenger ofte den største enkeltposten i budsjettet.',
      },
    ],
  },
];

export const getGuide = (slug) => guides.find((g) => g.slug === slug) || null;
