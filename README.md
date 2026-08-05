# Sawadee Tours 🌴

En norsk-språklig markedsplass for Thailand-opplevelser. Book turer, elefantparker,
øyeventyr og matkurs — på norsk, betalt i kroner. Bygget med **React 19 + Vite**.

> **Forretningsidé:** Selg billetter/opplevelser til norske turister som reiser til
> Thailand, og tjen provisjon (affiliate 5–10 %, eller egne kontrakter 20–30 %).
> Din fordel: du er både norsk og thai statsborger — du eier både språket/tilliten
> mot Norge og lovligheten (TAT-lisens) i Thailand.

## Kom i gang

```bash
npm install
npm run dev      # start utviklingsserver
npm run build    # bygg for produksjon
npm run preview  # forhåndsvis produksjonsbygg
```

## Slik er den bygd

| Fil | Innhold |
| --- | --- |
| `src/data.js` | Alle opplevelser, kategorier, reisemål og anmeldelser |
| `src/App.jsx` | Hele siden (nav, hero, kort, booking-modal, footer) |
| `src/App.css` | Stil og responsivt design |

## Neste steg for å tjene penger

1. **Koble på booking-lenker.** Hver opplevelse i `src/data.js` har et felt
   `bookingUrl`. Legg inn din affiliate-lenke (Klook, GetYourGuide, Viator) eller
   egen booking-URL. Da sender «Bestill»-knappen kunden rett videre.
2. **Fang forespørsler.** Uten `bookingUrl` viser modalen et forespørselsskjema.
   Koble `submit`-funksjonen i `App.jsx` til e-post/CRM (f.eks. Formspree, Resend)
   eller Stripe Payment Link for ekte betaling.
3. **Publiser.** Deploy gratis på Vercel/Netlify og koble til et `.no`-domene.
4. **Skaff trafikk** (den egentlige jobben): SEO på norske søk («ting å gjøre i
   Phuket»), Facebook-grupper for nordmenn i Thailand, Google Ads.

## Viktige merknader

- **Anmeldelsene i `src/data.js` er plassholdere** — bytt til ekte kundeomtaler før
  lansering.
- Statistikk i toppseksjonen (antall reisende osv.) er også plassholder.
- Sjekk TAT-lisens og selskapsregistrering før du selger som fullverdig reisebyrå.

---

Demo/MVP — laget som et startpunkt, klar til å utvides.
