# Handoff — Soi Marketplace + SiamConnect

**Dato:** 2026-10-21
**Eier:** potesjarm@gmail.com
**Masterplan (levende dokument):** https://claude.ai/artifact/AoTALQpCo2fDUQi6PUkcgM

Denne filen er en primer så en ny chat kan fortsette uten å gjette. Prosa på
norsk, tekniske ting på engelsk.

---

## 1. Kort oppsummering

SiamConnect (siamconnect.app) er et community for utlendinger i Thailand:
forum, marketplace, events, byguider, Rally (møtes IRL) og gratis verktøy.
Eieren har fått godkjente papirer og vil nå:

1. Vise de skjulte leilighetene offentlig på marketplace (DONE i kode, se §4).
2. Spinne marketplace ut som **eget brand på eget domene**, men på **samme
   plattform** (database, konto, annonser) som SiamConnect.
3. Senere: turer, grenseturer/visa-hjelp, transport.

**Beslutning tatt:** eget brand, felles motor. Begrunnelse i masterplanen.

---

## 2. Navn og brand

- **Valgt navn: Soi** (ซอย = sidegaten der alt thai-liv skjer).
- Domener å sikre: `soi.co.th`, `getsoi.com`, `soi.market` — **sjekk ledighet
  først.**
- Backup: Talad (marked), Baanzaa (bolig-vinklet), Nok.
- Posisjonering: «Alt i Thailand, på ett sted.» Thai + engelsk fra start.
- Partnerselskapet («bye firma»): gi dem en rolle de kan eie (agentnettverk,
  utleieforvaltning eller turdrift) og reguler eierandel i **Soi-brandet**,
  ikke i SiamConnect.

### Åpne spørsmål som MÅ svares før bygging av eget domene

- [ ] Er `soi.co.th` / `getsoi.com` / `soi.market` ledige? Ellers: hvilket navn?
- [ ] Hvem er partnerselskapet, og hva skal de eie konkret?
- [ ] Hva dekker de godkjente papirene: selskapsregistrering, BOI, eller en
      spesifikk lisens?

---

## 3. Arkitektur — én plattform, flere fronter

Alt kjører på **samme Supabase-prosjekt og samme React-app**. «Eget domene»
betyr i praksis en egen front som leser fra samme database.

```
SiamConnect.app        Soi (nytt domene)        Turer (fase 3)
  Henter brukerne        Tjener pengene            Partner
        \                     |                      /
         \                    |                     /
          ----------  Felles plattform  -----------
     én database · én konto · annonser & eiendom · chat & tilbud
     anmeldelser · rapportering · coins/boost · tospråklig søk · verifisering
```

En annonse lagt inn ett sted vises begge steder, fordi de leser samme tabell.

### To måter å realisere eget domene (velg i ny chat)

1. **Enklest først:** kjør Soi som et eget tema/subdomene eller egen Vercel-
   deploy av samme kodebase, der marketplace-rutene er forsiden. Rask, lav
   risiko.
2. **Senere:** egen frontend som snakker med samme Supabase. Mer arbeid, kun
   hvis Soi skal ha helt egen UX.

Anbefaling: start med (1). Ikke bygg ny plattform.

---

## 4. Hva som er gjort i koden i dag (2026-10-21)

**Repo:** `minemikki/Siam-connect` (merk: GitHub-redirect fra det gamle
`vitejs-vite-gar4obam`-navnet; canonical er `minemikki/Siam-connect`).
**Deploy:** Vercel auto-deployer `main` → siamconnect.app.
**Commit:** `3f90635` «marketplace: publish hidden drafts from My Shop» — pushet
til `main`.

### Problemet som ble løst
De skjulte leilighetene lå som **`status = 'draft'`** i `marketplace_listings`.
Drafts er kun synlige for eier + admin (RLS: `mkt_select` =
`status='active' OR seller_id=auth.uid() OR is_current_user_admin()`). Derfor
vises de ikke offentlig. Per i dag er det 0 aktive annonser offentlig.

### Hva som ble lagt til
- `src/lib/marketplace.js`:
  - `isDraftPublishable(l)` — sjekker tittel/pris/beskrivelse/minst ett bilde.
  - `publishDrafts(ids)` — flipper `draft → active` i én request. Owner-gated
    av eksisterende RLS; `.eq('status','draft')` hindrer at sold/rented/removed
    vekkes.
- `src/pages/MarketplaceSeller.jsx` (My Shop):
  - Banner «X utkast skjult fra marketplace» med knapp **Publish all now**.
  - Egen **Drafts**-fane + «Draft · hidden»-merke på kortene.
  - Per-kort **Publish** i menyen.
- `src/components/marketplace/PropertyWizard.jsx`: fjernet «Not licensed to
  publish yet»-teksten.

### Hva eieren må gjøre manuelt
Logg inn → **My Shop** (`/marketplace/seller/<egen id>`) → trykk
**Publish all now**. Leilighetene havner under Property (`/marketplace/property`).
Utkast som mangler bilde/pris/beskrivelse blir stående skjult til de fullføres.

**IKKE verifisert innlogget i nettleser** — kun `vite build` passerer. Første
oppgave i ny chat kan være å QA publiseringsknappen live.

---

## 5. Teknisk kart (for en utvikler-chat)

### Repoer og miljø
- SiamConnect: `/home/user/siam-connect` (klones ved behov via `add_repo`
  `minemikki/Siam-connect`). Default branch `main`, Vercel auto-deploy.
- Supabase-prosjekt: `zqewtcnmurgscdhzhpzb` (URL + anon key i
  `src/api/supabaseClient.js`). Ingen service-key i repo — skjema-endringer
  gjøres via `supabase/migrations/*.sql`.
- Stack: React 18 + Vite + Tailwind 3.4 + Supabase (RLS, RPC, realtime).
  NB: Tailwind 3.4 droppet off-scale opacity (`/88`, `/92`) — bruk multipler
  av 5.

### Marketplace-datamodell (allerede bygget)
- `marketplace_listings` = felles spine for alle typer (item, vehicle,
  property, service, job, free). `status IN
  ('active','sold','removed','draft','rented')`. Felt: images[], videos[],
  attributes (jsonb), tospråklig (title_en/th, description_en/th), seller_id.
- `marketplace_property` (1:1, PUBLIC): deal_type, property_type, beds/baths,
  size_sqm, furnished, pet_policy, amenities[], neighborhood, approx_lat/lng,
  listing_party. Synlighet følger parent listing via RLS.
- `marketplace_property_private` (1:1, OWNER/ADMIN only): exact_address,
  exact_lat/lng, unit_no, cost_price, contact_person, private_notes.
- RPC-er: `create_property_listing`, `update_property_listing`,
  `update_property_private_notes` (SECURITY DEFINER, tvinger eierskap
  server-side).
- Andre features som finnes: tilbud (`marketplace_offers`), chat/samtaler,
  anmeldelser, follows, blocks, saved searches, reports (listing + seller),
  coins/boost, tospråklig søk.

### Relevante filer
- `src/lib/marketplace.js` — all marketplace-logikk.
- `src/pages/Marketplace.jsx` — forsiden.
- `src/pages/PropertyBrowse.jsx` — `/marketplace/property`.
- `src/pages/MarketplaceSeller.jsx` — My Shop / storefront.
- `src/components/marketplace/PropertyWizard.jsx` — boligveiviser.
- `src/components/marketplace/AddListingModal.jsx` — generell annonse.

---

## 6. Første 90 dager (housing)

Mål: **500 aktive boligannonser** (Pattaya først, så Bangkok), alle med ekte
bilder og svar innen 24t.

1. Uke 1: publiser utkastene (My Shop → Publish all now).
2. Uke 1–2: QA hver annonse (ingen enhetsnr/adresse i teksten, riktig pris).
3. Uke 2–4: Pattaya først. Ring 30 agenter/eiere, legg inn gratis for dem, la
   dem overta kontoen.
4. Mnd 2: «Verifisert»-merke for annonser vi har sett video av / besøkt. Dette
   er hovedforskjellen mot Facebook-grupper (svindel).
5. Mnd 2–3: koble housing inn i communityet (byfeed, «bolig i nærheten» på
   guider, varsel ved treff på lagret søk).
6. Mnd 3: Bangkok. Ikke flere byer før Pattaya har nok tilbud til at søk gir
   treff.

Regel: SiamConnect/Soi tar **aldri** imot depositum. Annonser som ber om
betaling til privat konto før visning fjernes.

---

## 7. Juridisk — må sjekkes med thailandsk advokat

Ikke juridisk råd. Papirene lar dere drive selskapet, men noen aktiviteter
trenger egne lisenser.

| Aktivitet | Hva som gjelder | Vår oppgave |
| --- | --- | --- |
| Annonseplattform | Ingen meglerlisens i TH. Hvis utlendinger eier ≥50%, kan «megling» kreve lisens (Foreign Business Act, liste 3). | Sjekk eierstruktur + om provisjon = megling |
| Utleie <30 dager | Hotellvirksomhet (Hotel Act); ofte forbudt i condo-regler. Ny lov på høring. | Kun månedsleie (30d+) i start |
| Holde depositum | Kun lisensierte escrow-agenter (banker). | Ikke gjør selv; bankpartner senere |
| Plattformregistrering | ETDA-dekret: melding ved >5000 TH-brukere/mnd el. 50M THB. | Sjekk om vi er over grensen |
| Persondata | PDPA: DPO, sikkerhet, avviksmelding. Bøter gis. | Oppdater personvern for marketplace |
| Turer | Department of Tourism-lisens + depositum. Guiding kun for thaier. | Lisens el. partner m/lisens |
| Van-transport | DLT-lisens, offentlig sjåførsertifikat, forsikring. | Bruk lisensiert operatør |

---

## 8. Inntekter

Gratis for privatpersoner; penger fra agenter og synlighet (som Rightmove UK,
som tjener nesten alt på agentabonnement).

- Boost / fremhevede annonser (coins finnes) — nå.
- Agentabonnement (flere annonser, profil, statistikk, verifisert) — fra mnd 3.
- Lead-avgift / fast pris per utleie for egne objekter — nå.
- Bedriftsannonser på SiamConnect + nyhetsbrev — finnes delvis.
- Provisjon på turer/transport — fase 3.
- IKKE escrow/depositum før bankpartner er på plass.

---

## 9. Tours og visa run — viktig endring

Visa run-markedet krymper: fra **15. sep 2026** er visumfritt opphold kuttet
fra 60 → **30 dager**, og visumfri innreise over land er begrenset til **2x per
kalenderår**. Immigration følger med på gjentatte visa runs.

- **Ikke** bygg egen van-virksomhet for visa runs. Formidle turer fra
  lisensierte operatører og ta provisjon.
- Pakk som «grensetur + visumhjelp»: visa-finder (finnes), DTV-veiledning
  (5-års visum, 180 dager per innreise), forlengelse på immigrasjonskontor.
- Vanlige turer (øyhopping, dagsturer, mat) passer bedre og kan bookes i
  Rally-grupper.

---

## 10. Veikart (porter må nås før neste fase)

| Fase | Periode | Housing-annonser | Brukere/mnd | Betalende agenter |
| --- | --- | --- | --- | --- |
| 1. Housing live | okt 2026 – jan 2027 | 500 | 20 000 | 0 |
| 2. Soi eget brand + agenter | feb – jun 2027 | 3 000 | 75 000 | 50 |
| 3. Turer og transport | jul – des 2027 | 8 000 | 200 000 | 200 |
| 4. Hele Thailand + thai-marked | 2028 | 25 000 | 500 000 | 800 |

Tall er mål, ikke prognoser. Gå ikke til neste fase før porten er nådd.

---

## 11. Konkurrenter (kort)

- De tre engelske portalene (Dot Property, Hipflat, Thailand-Property, FazWaz)
  eies nå av **én** aktør (LIFULL Connect). PropertyGuru/DDproperty er kjøpt av
  EQT og avnotert.
- Thai-first (Livinginsider, RentHub): mange utdaterte annonser.
- Facebook-grupper: der svindelen skjer.
- Nykommere 2025–26 (Superagent, BeAnywhere, BAANLYY) satser på verifisering.
- **Gap å ta:** engelske annonser er konsentrert hos én eier, svindel er
  utbredt, Thai-sider er utdaterte. Verifisering + community er inngangen.

---

## 12. Paused / ikke relatert (fra tidligere i prosjektet)

Disse henger igjen fra før og er IKKE en del av marketplace-planen, men notert
så ingenting faller mellom:

- **SiamConnect auto-ads** på IG/FB skulle stoppes. Fant dem ikke i repo,
  cron, Routines (kun StayMotion) eller Metricool. Sannsynligvis Meta Business
  Suite-planlegger eller en ekstern integrasjon — eier må rydde der / trekke
  tilgang.
- **SNERT** (getsnert.no, eget Expo-prosjekt, `minemikki/snert`): venstre-side
  hero-blur og admin-tilgang («Ingen tilgang») var under utredning.
  `/app/admin` finnes ikke i default branch; `vercel.json` deployer kun
  `site/`. Antakelig feature-branch el. separat app-deploy; kontoen er trolig
  default `customer`-rolle.
- **Rally Phase 1–4** (SiamConnect): bygget lokalt, aldri deployet til origin.
  Phase 4 «Meet Mode» er uferdig WIP.
- SEO: `/Connect` canonical-lekkasje i `Connect.jsx`.

---

## 13. Første steg i ny chat

1. Bekreft navn + domenetilgjengelighet (Soi), ellers velg alternativ.
2. QA publiseringsknappen innlogget i nettleser; publiser leilighetene.
3. Bestem domene-tilnærming (§3, anbefaling: eget subdomene/tema først).
4. Start agent-outreach i Pattaya + verifiseringsflyt.
5. Bestill advokat-gjennomgang av §7.
