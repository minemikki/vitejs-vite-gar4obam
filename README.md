# Sawadee Tours

Norsk markedsplass for opplevelser i Thailand. Bygget med **React 19 + Vite +
React Router**, forhåndsrendret til statisk HTML og klar for **Vercel**.

---

**[→ Les vekstplanen](VEKSTPLAN.md)** — strategi, SEO, kanaler og tall.

## Kom i gang

```bash
npm install
npm run dev      # utviklingsserver på http://localhost:5173
npm run build    # produksjonsbygg + forhåndsrendering av alle sider
npm run preview  # se produksjonsbygget lokalt
npm run lint     # sjekk koden
```

---

## ✅ Sjekkliste før lansering

Gå gjennom denne før du tar imot ekte bestillinger.

- [ ] **Fyll inn selskapsopplysninger** i `src/config.js` (alle felter merket `TODO`).
      Disse vises i vilkår og personvernerklæring — norsk lov krever at et
      nettsted oppgir hvem som driver det.
- [ ] **Få de juridiske sidene gjennomgått.** `/vilkar`, `/personvern` og
      `/informasjonskapsler` er utkast skrevet for denne siden, ikke ferdig
      juridisk rådgivning. De viser et tydelig varsel til du fjerner det
      (`DraftNotice` i `src/pages/Privacy.jsx`).
- [ ] **Avklar overføring av persondata til Thailand.** Bestillingsdetaljer må
      deles med operatørene der, og Thailand er utenfor EØS. Se avsnittet i
      personvernerklæringen.
- [ ] **Legg inn ekte tall etter hvert som de finnes.** Siden viser med vilje
      ingen vurderinger, ingen anmeldelser, ingen overstrøkne førpriser og ingen
      «Bestselger»-merker — fordi ingen av delene er sanne ennå. Feltene finnes
      i `src/data.js` og slår seg på av seg selv når de får en verdi:
      `rating`, `reviews`, `oldPriceNOK`, `bestseller`.
      Førpris må være den laveste prisen du faktisk har tatt de siste 30 dagene
      (markedsføringsloven § 10 og prisopplysningsforskriften) — ikke en pris du
      aldri har solgt til.
- [ ] **Sett riktig domene** i `site.url` (`src/config.js`) og i
      `public/robots.txt`.
- [ ] **Koble på betaling** (se under) eller behold forespørselsmodus.
- [ ] **Sjekk TAT-lisens** hvis du skal selge turer i eget navn fra Thailand.

---

## Slik tjener siden penger

Det finnes to modeller, og koden støtter begge.

### 1. Affiliate — enklest å starte med

Du sender kunden til en stor plattform og får provisjon.

1. Meld deg inn hos GetYourGuide Partner, Viator eller Travelpayouts.
2. Lim inn affiliate-lenken din i feltet `bookingUrl` på opplevelsen i
   `src/data.js`.
3. Ferdig — «Bestill» sender kunden dit, og du får provisjon på salget.

### 2. Egne kontrakter — høyere margin

Du selger i eget navn og beholder 20–30 % i stedet for 5–10 %.

1. Lag konto på [stripe.com](https://stripe.com).
2. Lag en **Payment Link** per opplevelse.
3. Lim inn lenken i `paymentUrl` på opplevelsen i `src/data.js`,
   eller sett én felles lenke i `payments.fallbackPaymentUrl`.
4. Sett `payments.enabled = true` i `src/config.js`.

**Uten Stripe** kjører checkout i *forespørselsmodus*: kunden sender en
uforpliktende forespørsel med dato og antall, og du bekrefter manuelt på
e-post. Det er en helt gyldig måte å starte på.

> Vi tar aldri imot kortnummer på vår egen side — betalingen skjer hos Stripe.
> Det holder deg utenfor PCI-kravene.

---

## Deploy til Vercel

1. Push koden til GitHub.
2. Gå til [vercel.com/new](https://vercel.com/new) og importer repoet.
3. Vercel leser `vercel.json` og finner innstillingene selv:
   - Build: `npm run build`
   - Output: `dist`
4. Trykk **Deploy**.
5. Legg til domenet ditt under **Settings → Domains**.

### Koble på eget domene

1. **Kjøp domenet.** For `.no` bruker du en norsk registrar — Domeneshop,
   PRO ISP eller One.com. Som privatperson bosatt i Norge kan du registrere
   `.no` på fødselsnummer; skal selskapet stå som eier, trenger du
   organisasjonsnummer. Sjekk gjeldende priser og vilkår hos registraren.
2. **Vercel → prosjektet → Settings → Domains → Add.** Skriv inn domenet.
3. **Legg inn DNS-postene Vercel viser deg** hos registraren. Vanligvis:
   `A` for rotdomenet mot Vercels IP, og `CNAME` for `www`. Vercel viser de
   nøyaktige verdiene — bruk dem, ikke verdier du finner i en guide.
4. **Vent på at det slår gjennom.** Ofte minutter, av og til noen timer.
   Vercel ordner HTTPS-sertifikatet selv.
5. **Oppdater `src/config.js`:** `site.url` til det nye domenet, og
   `site.email` til en adresse på det domenet. Push.

Canonical-tagger, Open Graph, `sitemap.xml` og `robots.txt` leser alle
`site.url`, så de følger etter automatisk. Byggeloggen advarer hvis du
glemmer det.

6. **Meld sitemapet inn på nytt** i Google Search Console med den nye
   adressen.

Etter første deploy: meld siden inn i
[Google Search Console](https://search.google.com/search-console) og send inn
`https://ditt-domene.no/sitemap.xml`.

---

## Hvordan koden henger sammen

```
src/
  config.js            ← alt du må fylle inn (kontakt, betaling, analyse)
  data.js              ← opplevelser, reisemål, detaljer per tur
  scenes.jsx           ← håndtegnede SVG-scener, ikoner og logo
  App.jsx              ← ruter og layout
  components/          ← meny, footer, kort, trekkspill, samtykkebanner
  pages/               ← én fil per side
  lib/
    meta.js            ← titler, beskrivelser og structured data per rute
    useSeo.js          ← holder <head> i synk ved navigering
    storage.js         ← trygg localStorage (tåler privat modus)
    format.js          ← priser, datoer, bestillingsreferanse
scripts/
  prerender.mjs        ← lager statisk HTML + sitemap.xml ved bygg
```

### Legge til innhold (viktigst for vekst)

| Vil du legge til … | Rediger |
| --- | --- |
| En opplevelse | `src/data.js` |
| Et reisemål | `src/content/destinations.js` |
| En guide/artikkel | `src/content/guides.js` |

Alt får automatisk egen adresse, egne metatagger, structured data og plass i
`sitemap.xml` ved neste bygg. Du trenger ikke røre noe annet.

### Legge til en ny opplevelse

Legg til et objekt i `experiences` i `src/data.js`. Adressen (`slug`) og
detaljsiden lages automatisk, og turen kommer med i `sitemap.xml` ved neste
bygg. Vil du ha egne høydepunkter og «inkludert»-liste, legg inn en post med
samme `id` i `details`-objektet lenger nede i samme fil.

---

## Funksjoner som skiller oss fra Klook

- **Min reise** (`/min-reise`) — planlegg dager, se totalpris for hele følget,
  del planen med en lenke. Advarer hvis du legger to heldagsturer på samme dag.
- **Sammenligning** — inntil tre opplevelser side ved side, inkludert hva som
  *ikke* er inkludert.
- **Instant søk** — Ctrl/Cmd+K, tastaturnavigering, tåler æøå.
- **Filtre i URL-en** — et filtrert søk kan bokmerkes og deles.
- **Kuratert utvalg med redaksjonell linje** — ingen elefantridning.

## SEO

- Hver rute forhåndsrendres til ekte HTML ved bygg — søkemotorer og
  delingsforhåndsvisninger trenger ikke kjøre JavaScript.
- Egne titler, beskrivelser, canonical og Open Graph per side (`src/lib/meta.js`).
- Structured data: `TravelAgency`, `TouristAttraction` med pris, `BreadcrumbList`
  og `FAQPage`.
- `sitemap.xml` genereres automatisk, `robots.txt` ligger i `public/`.
- Hver opplevelse har sin egen side — det er de sidene som rangerer på søk som
  «elefantpark Chiang Mai».

## Personvern

- Ingen sporing kjører før brukeren har samtykket.
- «Kun nødvendige» er like lett tilgjengelig som «Godta alle».
- Samtykket utløper etter 12 måneder, og kan endres når som helst via lenken i
  footeren.
- Legger du inn en Google Analytics-ID i `src/config.js`, lastes den først
  etter samtykke.

---

## Om bildene

Kortene bruker et eget bildespråk: dype fargeflater med ett stort strektegnet
motiv lagt oppå som vannmerke, fin korning og kraftig typografi. Det er laget
sånn med vilje. Halvgode «nesten-fotografier» får en reiseside til å se billig
ut; en tydelig grafisk flate gjør ikke det. Alt er SVG, så det laster
umiddelbart og er skarpt på alle skjermer.

### Bytte til ekte foto

Sett `image` på opplevelsen i `src/data.js` eller på reisemålet i
`src/content/destinations.js`:

```js
{ id: 'elefant', title: 'Etisk elefantreservat', image: '/bilder/elefant.jpg', … }
```

Da tar fotoet over, og fargeflaten blir liggende som fallback for alt som
ennå ikke har bilde. Du trenger ikke røre noe annet — verken CSS eller
komponenter. Legg filene i `public/bilder/`.

**Bruk bare bilder du har rett til.** Affiliate-programmenes egne bildebanker
(GetYourGuide og Viator gir deg tilgang når du er godkjent), bilder du får
skriftlig tillatelse til av operatøren, eller bilder du tar selv. Å laste ned
bilder fra andres nettsider er opphavsrettsbrudd, og det er reisebransjen
kjent for å følge opp.
