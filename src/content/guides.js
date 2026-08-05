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
];

export const getGuide = (slug) => guides.find((g) => g.slug === slug) || null;
