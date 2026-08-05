# Vekstplan — Sawadee Tours

Hvordan vi går fra null til en lønnsom norsk markedsplass for Thailand-opplevelser.

> **Ærlig utgangspunkt:** vi slår ikke Klook på utvalg. De har titusenvis av
> produkter og et markedsføringsbudsjett vi ikke kan matche. Vi vinner ikke ved
> å være dem, men ved å eie ett segment de gjør dårlig: **nordmenn som skal til
> Thailand.**

---

## 1. Hvorfor dette kan fungere

Tre fordeler ingen konkurrent har samtidig:

| Fordel | Hvorfor det betyr noe |
| --- | --- |
| **Norsk språk og innhold** | Klook har null norsk innhold. Søkeresultatene på norsk er nesten tomme — det er der åpningen ligger. |
| **Thai statsborgerskap** | Du kan eie selskap og få TAT-lisens. En utenlandsk konkurrent kan ikke gjøre dette lovlig uten en thai partner. |
| **Du bor der** | Du kan besøke operatørene, forhandle direkte og faktisk vite hva du selger. |

Markedet er reelt: Thailand er blant de mest populære langdistansemålene for
nordmenn, og opplevelser er den delen av reisebudsjettet som i størst grad
bookes *etter* at fly og hotell er ordnet — altså når kunden allerede er varm.

---

## 2. Forretningsmodellen — to faser

### Fase 1: Affiliate (måned 0–6)

Du sender kunden videre og får provisjon. Ingen lisens, ingen risiko, ingen
kundeservice på turen.

- **Margin:** ca. 5–10 %
- **Mål:** bevise at folk faktisk klikker og kjøper gjennom deg
- **Verktøy:** GetYourGuide Partner, Viator, Travelpayouts
- **Slik:** lim affiliate-lenken inn i `bookingUrl` i `src/data.js`

### Fase 2: Egne kontrakter (fra måned 6)

Du kjøper inn og selger i eget navn.

- **Margin:** 20–30 %
- **Krav:** TAT-lisens, betalingsløsning, kundeservice
- **Slik:** start med de 3–5 turene som selger mest i fase 1, og kontakt de
  operatørene direkte

**Ikke hopp over fase 1.** Poenget er ikke marginen, det er å finne ut hvilke
turer som selger før du bruker penger på kontrakter.

### Enhetsøkonomi — regn selv

| | Affiliate | Egne kontrakter |
| --- | --- | --- |
| Snittordre | 1 800 kr (2 pers.) | 1 800 kr |
| Din andel | ~140 kr | ~450 kr |
| Ordrer/mnd for 20 000 kr | ~145 | ~45 |

Med 3 % konvertering trenger du rundt **4 800 besøkende i måneden** for 20 000
kr i affiliate-inntekt — eller **1 500 besøkende** med egne kontrakter. Det er
forskjellen mellom «umulig første året» og «fullt oppnåelig».

---

## 3. SEO-strategien — vår viktigste kanal

Betalt annonsering slutter å virke den dagen du slutter å betale. Innhold som
rangerer fortsetter å levere kunder i årevis. Derfor er dette hovedkanalen.

### Slik er siden bygget for å rangere

- **Hver side forhåndsrendres til ekte HTML** — Google trenger ikke kjøre
  JavaScript for å se innholdet. De fleste React-sider taper på dette.
- **Egen side per opplevelse, reisemål og guide** — 40 sider allerede, og
  antallet vokser automatisk når du legger til innhold.
- **Structured data** — `TravelAgency`, `TouristAttraction` med pris,
  `TouristDestination`, `Article`, `FAQPage` og `BreadcrumbList`.
- **`sitemap.xml` genereres ved hvert bygg** — nye sider meldes inn automatisk.
- **Rask innlasting** — koden splittes per rute, og hastighet er både
  rangeringsfaktor og konverteringsfaktor.

### Søkeordstrategi: tre lag

**Lag 1 — kommersielle søk** (få søk, høy kjøpsvilje)
`elefantpark chiang mai`, `phi phi tur fra phuket`, `matkurs bangkok`
→ Dekkes av opplevelsessidene. Disse konverterer best, men har lite volum.

**Lag 2 — reisemålssøk** (mye volum, middels kjøpsvilje)
`ting å gjøre i phuket`, `bangkok severdigheter`, `chiang mai tips`
→ Dekkes av de seks reisemålssidene. Dette er hovedtrafikken.

**Lag 3 — planleggingssøk** (mest volum, lav kjøpsvilje — men tidlig i reisen)
`beste tid å reise til thailand`, `hva koster thailand`, `thailand med barn`
→ Dekkes av guidene. Her fanger du folk seks måneder før de booker. Derfor er
e-postlisten så viktig: den holder på dem til de er klare.

### Innholdskalender — første seks måneder

Én god artikkel i uka slår fem dårlige. Prioritert rekkefølge:

| Måned | Innhold | Hvorfor |
| --- | --- | --- |
| 1 | Ferdigstill de 6 reisemålssidene med egne bilder | Grunnmuren |
| 2 | «Thailand på 2 uker — ferdig reiserute», «Koh Lanta», «Koh Phangan» | Ruteforslag rangerer godt og selger flere turer per kunde |
| 3 | «Bangkok på 3 dager», «Phuket på en uke» | Konkrete ruter, høy kjøpsvilje |
| 4 | «Thailand vs Vietnam», «Thailand vs Bali» | Sammenligningssøk, folk er i valgfasen |
| 5 | «Regntid i Thailand», «Reise alene i Thailand» | Sesong og segment |
| 6 | Oppdater alt fra måned 1–2 med ekte bilder og kundeomtaler | Oppdatert innhold rangerer bedre |

### Konkrete SEO-oppgaver etter lansering

1. Meld siden inn i **Google Search Console** og send inn `sitemap.xml`.
2. Sett opp **Google Business Profile** hvis du har adresse i Thailand.
3. Skaff de første **lenkene**: norske reiseforum, Facebook-grupper for
   nordmenn i Thailand, gjesteinnlegg hos norske reiseblogger.
4. Sjekk **Search Console månedlig** for hvilke søk du allerede får visninger
   på uten å rangere — det er de billigste seirene.

---

## 4. Slik får du de første 100 kundene

SEO tar tre til seks måneder å virke. I mellomtiden:

### Nå (uke 1–4) — gratis kanaler

- **Facebook-grupper.** «Nordmenn i Thailand», «Thailand for nordmenn» og
  liknende har titusenvis av medlemmer. **Ikke spam.** Svar på spørsmål med
  ekte råd, og la signaturen din gjøre jobben. Ti gode svar slår hundre lenker.
- **Reddit r/norge og r/Thailand.** Samme prinsipp.
- **Din egen krets.** De første ti kundene kjenner deg. Be om ærlig
  tilbakemelding — og om lov til å bruke omtalen deres.

### Snart (måned 2–3) — betalt, i det små

- **Google Ads på merkevaresøk hos konkurrenter** er dyrt. Dropp det.
- **Start heller med Ads på lange søk**: «elefantpark chiang mai uten ridning»
  koster lite per klikk og konverterer godt.
- Sett et tak på 2 000 kr/mnd til du vet hva en kunde koster.

### Deretter (måned 4+) — det som skalerer

- **E-postlisten.** Sjekklisten på siden fanger adresser fra folk som
  planlegger. Send én e-post i måneden med nyttig innhold og én anbefaling.
- **Reisefølge-effekten.** «Min reise»-planleggeren kan deles med en lenke.
  Én person planlegger, tre til fem ser planen. Dette er den billigste
  markedsføringen du har — sørg for at delingsknappen er lett å finne.
- **Samarbeid med norske reiseblogger.** Provisjonsavtale er billigere enn
  annonser og gir varige lenker.

---

## 5. Hvordan vi slår Klook på brukeropplevelse

Vi kan ikke vinne på utvalg. Vi kan vinne på at det er *lettere å bestemme seg*.

| Vår løsning | Hva Klook gjør | Hvorfor vårt er bedre |
| --- | --- | --- |
| **Min reise** — planlegg dager, se totalpris, del lenke | Kun ønskeliste | Kunden ser hele turen, ikke enkeltprodukter. Øker snittordren. |
| **Sammenligning side ved side** | Må åpne flere faner | Du ser hva som *ikke* er inkludert — det ingen liker å fremheve |
| **Advarsel ved to heldagsturer samme dag** | Ingenting | Vi hindrer et kjøp kunden ville angret på. Det bygger tillit. |
| **Alt på norsk, priser i kroner** | Engelsk, mange valutaer | Ingen valutapåslag, ingen tvil om hva du betaler |
| **Kuratert utvalg** | Titusenvis av produkter | Færre valg gir raskere beslutning |
| **Dyrevelferd som redaksjonell linje** | Selger elefantridning | Segmentet som bryr seg er stort — og de er lojale |

**Neste steg for brukeropplevelsen** (ikke bygget ennå, i prioritert rekkefølge):

1. **Ekte tilgjengelighet per dato** — «utsolgt 24. des» er den største
   frustrasjonen hos konkurrentene. Krever integrasjon mot operatør.
2. **Ekte anmeldelser** — samle inn etter hver tur, publiser med bilde.
   Legg først på `aggregateRating` i structured data når de er ekte.
3. **Kombinasjonspakker** — «Bangkok på 3 dager» som ett kjøp med rabatt.
   Øker snittordren mest av alt du kan gjøre.
4. **Vipps** som betalingsmåte — norsk tillit, lavere friksjon.
5. **Værvarsel per reisemål** i planleggeren.

---

## 6. Hva du må måle

Uten tall gjetter du. Sporingen er allerede bygget inn og aktiveres når du
legger inn en analyse-ID i `src/config.js` (etter samtykke fra brukeren).

**De fire tallene som betyr noe:**

| Tall | Hvor du finner det | Hva det forteller |
| --- | --- | --- |
| Besøkende per måned | Analyseverktøyet | Om SEO virker |
| Konverteringsrate | Bestillinger ÷ besøkende | Om siden overbeviser |
| Snittordre | Total omsetning ÷ ordrer | Om pakker og planleggeren virker |
| E-postpåmeldinger | `newsletter_signup`-hendelsen | Om du bygger et publikum |

**Realistiske mål første året:**

| | Mnd 3 | Mnd 6 | Mnd 12 |
| --- | --- | --- | --- |
| Besøkende/mnd | 300 | 2 000 | 8 000 |
| Konvertering | 1 % | 2 % | 3 % |
| Ordrer/mnd | 3 | 40 | 240 |
| Inntekt/mnd (affiliate) | ~400 kr | ~5 600 kr | ~34 000 kr |
| Inntekt/mnd (egne kontrakter) | — | ~18 000 kr | ~108 000 kr |

Tallene er anslag ment som retning, ikke løfter. Poenget er formen på kurven:
**de første seks månedene ser ut som ingenting skjer.** Det er normalt for SEO,
og det er den fasen folk gir opp i.

---

## 7. Risikoer, ærlig

| Risiko | Hva du gjør med den |
| --- | --- |
| **SEO tar lengre tid enn ventet** | Ikke bygg budsjett på inntekt før måned 9 |
| **Klook lanserer norsk** | Lite sannsynlig — for lite marked for dem. Men din lokalkunnskap og kuratering kan de uansett ikke kopiere. |
| **Operatør leverer dårlig** | Test selv før du selger. Fjern raskt ved klager. Ett dårlig rykte er dyrere enn hundre tapte salg. |
| **Lisenskrav i Thailand** | Start som affiliate. Ordne TAT-lisens før du selger i eget navn. |
| **Du blir lei** | Dette er det største. SEO er kjedelig i seks måneder. Sett en fast ukentlig rytme — én artikkel, hver uke, uansett. |

---

## 8. De neste 30 dagene — konkret

- [ ] Fyll inn selskapsopplysninger i `src/config.js`
- [ ] Få de juridiske sidene gjennomgått av noen med kompetanse
- [ ] Fjern plassholder-anmeldelsene og «12 000+ reisende»
- [ ] Kjøp domene og deploy til Vercel
- [ ] Meld inn i Google Search Console + send `sitemap.xml`
- [ ] Meld deg inn i GetYourGuide Partner og legg inn lenker
- [ ] Ta egne bilder av minst tre opplevelser du har vært på
- [ ] Skriv én ny guide (start med «Thailand på 2 uker»)
- [ ] Svar på ti spørsmål i norske Thailand-grupper
- [ ] Send siden til fem venner og be om ærlig kritikk

**Den viktigste vanen:** én ny artikkel eller reisemålsside i uka, hver uke, i
et år. Femti sider godt norsk Thailand-innhold er en posisjon ingen kan kjøpe
seg forbi på kort tid.
