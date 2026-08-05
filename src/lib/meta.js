/*
 * Én kilde til sannhet for sidetitler, beskrivelser og structured data.
 * Brukes både av React i nettleseren (useSeo) og av forhåndsrenderingen
 * ved bygg (scripts/prerender.mjs), slik at søkemotorer får ekte HTML.
 */
import { site } from '../config.js';
import { allExperiences, destinations } from '../data.js';

const abs = (path) => `${site.url}${path === '/' ? '' : path}`;

export const staticRoutes = [
  '/',
  '/opplevelser',
  '/faq',
  '/om-oss',
  '/personvern',
  '/vilkar',
  '/informasjonskapsler',
];

export const experienceRoutes = allExperiences.map((e) => `/opplevelser/${e.slug}`);

// Checkout forhåndsrendres også — ikke for søk, men for at hver adresse skal
// svare 200 med ekte innhold i stedet for å falle ned på 404-siden.
export const checkoutRoutes = allExperiences.map((e) => `/bestill/${e.slug}`);

/** Sider som skrives til disk ved bygg. */
export const allRoutes = [...staticRoutes, ...experienceRoutes, ...checkoutRoutes];

/** Sider som skal ligge i sitemap.xml — checkout hører ikke hjemme i søk. */
export const sitemapRoutes = [...staticRoutes, ...experienceRoutes];

/* ----------------------------- JSON-LD ----------------------------- */

export const organizationLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: site.name,
  url: site.url,
  description: site.tagline,
  email: site.email,
  areaServed: 'TH',
  availableLanguage: ['no', 'en'],
});

const experienceLd = (e) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristAttraction',
  name: e.title,
  description: e.blurb,
  url: abs(`/opplevelser/${e.slug}`),
  touristType: 'Norske reisende',
  address: {
    '@type': 'PostalAddress',
    addressLocality: e.place,
    addressCountry: 'TH',
  },
  offers: {
    '@type': 'Offer',
    price: e.priceNOK,
    priceCurrency: 'NOK',
    availability: 'https://schema.org/InStock',
    url: abs(`/opplevelser/${e.slug}`),
  },
});

const breadcrumbLd = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: t.name,
    item: abs(t.path),
  })),
});

export const faqLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((q) => ({
    '@type': 'Question',
    name: q.q,
    acceptedAnswer: { '@type': 'Answer', text: q.a },
  })),
});

/* --------------------------- Route meta ---------------------------- */

const DEST_NAMES = destinations.map((d) => d.name).join(', ');

const STATIC_META = {
  '/': {
    title: `${site.name} — Opplevelser i Thailand, booket på norsk`,
    description:
      'Book elefantparker, øyturer, matkurs og tempelturer i Thailand. Norsk kundeservice, priser i kroner og gratis avbestilling på de fleste opplevelser.',
  },
  '/opplevelser': {
    title: `Alle opplevelser i Thailand — ${site.name}`,
    description: `Se alle kuraterte turer og aktiviteter i ${DEST_NAMES}. Filtrer på kategori, se priser i norske kroner og book på norsk.`,
  },
  '/faq': {
    title: `Ofte stilte spørsmål — ${site.name}`,
    description:
      'Svar på det folk lurer på før de booker: betaling, avbestilling, henting på hotell, språk på turene og hva som skjer ved dårlig vær.',
  },
  '/om-oss': {
    title: `Om oss — ${site.name}`,
    description:
      'Vi er nordmenn i Thailand som kvalitetssjekker hver eneste tur vi selger. Slik jobber vi, og hvorfor du kan stole på oss.',
  },
  '/personvern': {
    title: `Personvernerklæring — ${site.name}`,
    description:
      'Hvilke personopplysninger vi samler inn, hvorfor, hvor lenge vi lagrer dem og hvilke rettigheter du har etter GDPR.',
  },
  '/vilkar': {
    title: `Bestillingsvilkår — ${site.name}`,
    description:
      'Vilkår for bestilling: betaling, avbestilling og endring, vår rolle som formidler, reklamasjon og klageadgang.',
  },
  '/informasjonskapsler': {
    title: `Informasjonskapsler (cookies) — ${site.name}`,
    description:
      'Hvilke informasjonskapsler vi bruker, hva de gjør, og hvordan du endrer eller trekker tilbake samtykket ditt.',
  },
};

/**
 * Slår opp metadata for en sti. Returnerer alltid noe brukbart.
 */
export function metaForPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (STATIC_META[path]) {
    const m = STATIC_META[path];
    const jsonLd = [organizationLd()];
    if (path === '/') {
      jsonLd.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: site.url,
      });
    }
    return { ...m, canonical: abs(path), jsonLd };
  }

  const checkout = path.match(/^\/bestill\/(.+)$/);
  if (checkout) {
    const e = allExperiences.find((x) => x.slug === checkout[1]);
    if (e) {
      return {
        title: `Fullfør bestillingen — ${e.title} | ${site.name}`,
        description: `Book ${e.title} i ${e.place}. Velg dato og antall reisende.`,
        canonical: abs(`/opplevelser/${e.slug}`),
        jsonLd: [],
        noindex: true, // en bestillingsside skal ikke rangere i søk
      };
    }
  }

  const match = path.match(/^\/opplevelser\/(.+)$/);
  if (match) {
    const e = allExperiences.find((x) => x.slug === match[1]);
    if (e) {
      return {
        title: `${e.title} i ${e.place} — book på norsk | ${site.name}`,
        description: `${e.blurb} Fra ${e.priceNOK} kr per person. ${e.duration}, ${e.groupSize.toLowerCase()}.`,
        canonical: abs(path),
        jsonLd: [
          experienceLd(e),
          breadcrumbLd([
            { name: 'Hjem', path: '/' },
            { name: 'Opplevelser', path: '/opplevelser' },
            { name: e.title, path },
          ]),
        ],
      };
    }
  }

  return {
    title: `Fant ikke siden — ${site.name}`,
    description: 'Siden du leter etter finnes ikke.',
    canonical: abs(path),
    jsonLd: [],
    noindex: true,
  };
}
