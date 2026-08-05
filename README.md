# Sawadee Tours

Norsk markedsplass for opplevelser i Thailand. Bygget med **React 19 + Vite +
React Router**, forhåndsrendret til statisk HTML og klar for **Vercel**.

---

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
- [ ] **Bytt ut plassholder-innhold:** anmeldelsene i `src/data.js` og tallene i
      «Snittvurdering» / «12 000+ reisende» er eksempler. Fjern eller erstatt dem
      med ekte tall før lansering.
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
5. Legg til domenet ditt under **Settings → Domains**, og oppdater
   `site.url` i `src/config.js` + `public/robots.txt`.

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

### Legge til en ny opplevelse

Legg til et objekt i `experiences` i `src/data.js`. Adressen (`slug`) og
detaljsiden lages automatisk, og turen kommer med i `sitemap.xml` ved neste
bygg. Vil du ha egne høydepunkter og «inkludert»-liste, legg inn en post med
samme `id` i `details`-objektet lenger nede i samme fil.

---

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

Scenene på kortene er håndtegnet vektorgrafikk (SVG) laget for dette
prosjektet — de laster umiddelbart og er skarpe på alle skjermer.

Vil du bytte til ekte foto senere: bruk bilder du har rett til å bruke —
affiliate-programmenes egne bildebanker, bilder du får tillatelse til av
operatøren, eller bilder du tar selv. Å laste ned bilder fra andres nettsider
er opphavsrettsbrudd.
