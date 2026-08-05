/*
 * ┌──────────────────────────────────────────────────────────────────┐
 * │  FYLL INN DETTE FØR LANSERING                                    │
 * │  Alt som er markert TODO må erstattes med ekte opplysninger.     │
 * │  Feltene brukes i vilkår, personvernerklæring, SEO og footer.    │
 * └──────────────────────────────────────────────────────────────────┘
 */

export const site = {
  name: 'Sawadee Tours',
  tagline: 'Kuraterte Thailand-opplevelser — booket på norsk',

  // Adressen siden FAKTISK ligger på. Denne styrer canonical-taggen på hver
  // side, Open Graph-lenkene og sitemap.xml — så den må stemme, ellers ber vi
  // Google indeksere en adresse som ikke finnes, og da rangerer vi ingen steder.
  // Bytt den dagen du kobler på eget domene i Vercel. Ingen skråstrek til slutt.
  url: 'https://vitejs-vite-gar4obam.vercel.app',

  // TODO: ekte kontaktopplysninger
  email: 'hei@sawadeetours.no',
  phone: '', // f.eks. '+47 400 00 000' — la stå tom om du ikke vil oppgi telefon

  // TODO: juridiske opplysninger. Disse VISES i vilkår og personvern og må
  // være korrekte — norsk lov krever at et nettsted oppgir hvem som driver det.
  legal: {
    companyName: 'TODO: registrert selskapsnavn',
    orgNumber: 'TODO: organisasjonsnummer',
    address: 'TODO: forretningsadresse',
    country: 'TODO: Norge eller Thailand',
    // Selger du turer i eget navn i Thailand kreves TAT-lisens. La stå tom
    // til du faktisk har den — ikke oppgi et nummer du ikke har.
    tatLicense: '',
  },

  social: {
    instagram: '',
    facebook: '',
  },
};

/*
 * BETALING
 * --------
 * Vi tar aldri imot kortnummer på vår egen side. Checkout samler
 * bestillingsdetaljer og sender kunden videre til en betalingsside hos
 * Stripe, som håndterer kortdata og PCI-krav.
 *
 * Slik kobler du på ekte betaling:
 *  1. Lag konto på stripe.com
 *  2. Lag en "Payment Link" per opplevelse (eller ett generelt produkt)
 *  3. Lim inn lenken i `paymentUrl` på opplevelsen i data.js,
 *     eller sett en felles lenke i `payments.fallbackPaymentUrl` under.
 *
 * Uten lenke kjører siden i FORESPØRSELSMODUS: kunden sender en
 * uforpliktende forespørsel og du bekrefter manuelt. Det er en helt gyldig
 * måte å starte på — mange byråer gjør nettopp dette de første månedene.
 */
export const payments = {
  enabled: false, // sett true når du har lagt inn Stripe-lenker
  provider: 'stripe',
  fallbackPaymentUrl: '',
  currency: 'NOK',
  // Vises til kunden i checkout
  methods: ['Visa', 'Mastercard', 'Vipps', 'Apple Pay'],
};

/*
 * ANALYSE
 * -------
 * Ikke last inn sporing før brukeren har samtykket (GDPR). Legg inn ID her,
 * så aktiveres den først etter samtykke i cookie-banneret.
 */
export const analytics = {
  // f.eks. 'G-XXXXXXXXXX' for Google Analytics 4
  googleAnalyticsId: '',
};

// Hvor lenge et cookie-samtykke huskes før vi spør på nytt (måneder).
export const CONSENT_MONTHS = 12;
