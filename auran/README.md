# AuranWeb — byrå-nettside

Landingssiden til webbyrået AuranWeb. Én selvstendig `index.html` — ingen
rammeverk, ingen byggesteg. All CSS og JS ligger inni fila. Bildene ligger som
egne filer i samme mappe.

> Merk: Dette er et **eget prosjekt** som tilfeldigvis ligger i samme repo som
> `andaman.no` (turguide-siden). Mappa `auran/` er helt frittstående — den deler
> ingenting med Vite-prosjektet rundt.

## Filer

| Fil | Hva |
|---|---|
| `index.html` | Hele nettsiden |
| `logo.png` | Logo, gjennomsiktig bakgrunn (fra din originale logo) |
| `favicon-32.png`, `favicon-180.png` | Faviconer (nettleserfane + iOS) |
| `logo-512.png` | Logo i høy oppløsning (brukt i strukturert data) |
| `og.png` | Delingsbilde (1200×630) for Facebook/WhatsApp/SMS/LinkedIn |

## Se den lokalt

Bare åpne `index.html` i nettleseren. (Ingen server nødvendig.)

## Legg den ut gratis

**Enkleste vei — Netlify Drop:**
1. Gå til [app.netlify.com/drop](https://app.netlify.com/drop).
2. Dra **hele `auran`-mappa** inn i vinduet.
3. Ferdig — du får en `*.netlify.app`-adresse med en gang.
4. Kontaktskjemaet virker automatisk (Netlify Forms). Innsendinger dukker opp
   under **Forms** i Netlify, og du kan sette opp e-postvarsel der.
5. Koble på `auranweb.no` under **Domain settings** når domenet er sikret.

Deployer du et annet sted enn Netlify (f.eks. Vercel), virker skjemaet
fortsatt: da faller det tilbake til å åpne kundens e-postprogram med en ferdig
melding, så ingen henvendelse går tapt.

## ⚠️ Fyll inn før lansering

Søk i `index.html` etter **`FYLL-INN`** — der er alle plassholderne samlet:

- [ ] **Telefon** — står som `+47 000 00 000` (både i kontakt-seksjon, footer og
      strukturert data)
- [ ] **E-post** — står som `post@auranweb.no` (kontakt, footer, `mailto`-fallback
      i skjemaet og strukturert data). Sett opp adressen, eller bruk en
      midlertidig én til domenet er på plass.
- [ ] **Bilde av deg** i «Om oss» — nå en «M»-avatar. Bytt `<div class="avatar">M</div>`
      med et `<img>` når bildet er klart.
- [ ] **Domene** — `https://auranweb.no/` er lagt inn i `<link rel="canonical">`,
      Open Graph og strukturert data. Bytt hvis du lander på et annet domene
      (ellers viser ikke delingsbildet riktig på deling).
- [ ] **Bekreft prisene** — 790 / 1 290 / 1 990 er foreløpige (fra briefen).

## Klart fra før

- ✅ Responsivt, mobil-først, hamburgermeny
- ✅ SEO: sidetittel, meta-beskrivelse, canonical, Open Graph + Twitter-kort,
  `LocalBusiness`-strukturert data (webbyrå, Stavanger)
- ✅ Favicon + delingsbilde
- ✅ Kontaktskjema med «Takk»-bekreftelse (Netlify + e-post-fallback)
- ✅ Pris-veksler (månedlig / engangs), FAQ, scroll-animasjoner
- ✅ Respekterer `prefers-reduced-motion`, og virker uten JavaScript

## Neste steg (valgfritt)

- **Besøksstatistikk:** lag gratis Google Analytics 4-konto og lim inn
  `gtag.js`-snutten rett før `</head>`. (Utelatt her fordi den krever din egen
  måle-ID.)
- **Ekte prosjekt-demoer:** bygg 2–3 bransjedemoer (kafé, frisør, håndverker) og
  bytt ut mockup-kortene i «Prosjekter» med skjermbilder. Dette er den viktigste
  konverteringsdriveren.
- **Kundeanmeldelser** og en **WhatsApp-knapp** når du har det.
