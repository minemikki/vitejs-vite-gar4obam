/*
 * Én kilde til sannhet for sidetitler, beskrivelser og structured data.
 * Brukes både av React i nettleseren (useSeo) og av forhåndsrenderingen
 * ved bygg (scripts/prerender.mjs), slik at søkemotorer får ekte HTML.
 */
import { site } from '../config.js';
import { allExperiences, destinations } from '../data.js';
import { destinations as destPages } from '../content/destinations.js';
import { guides } from '../content/guides.js';

const abs = (path) => `${site.url}${path === '/' ? '' : path}`;

export const staticRoutes = [
  '/',
  '/opplevelser',
  '/reisemal',
  '/guider',
  '/naar-reise',
  '/reisebudsjett',
  '/min-reise',
  '/faq',
  '/om-oss',
  '/personvern',
  '/vilkar',
  '/informasjonskapsler',
];

export const destinationRoutes = destPages.map((d) => `/reisemal/${d.slug}`);
export const guideRoutes = guides.map((g) => `/guider/${g.slug}`);

export const experienceRoutes = allExperiences.map((e) => `/opplevelser/${e.slug}`);

// Checkout forhåndsrendres også — ikke for søk, men for at hver adresse skal
// svare 200 med ekte innhold i stedet for å falle ned på 404-siden.
export const checkoutRoutes = allExperiences.map((e) => `/bestill/${e.slug}`);

/** Sider som skrives til disk ved bygg. */
export const allRoutes = [
  ...staticRoutes,
  ...experienceRoutes,
  ...destinationRoutes,
  ...guideRoutes,
  ...checkoutRoutes,
];

/** Sider som skal ligge i sitemap.xml — checkout hører ikke hjemme i søk. */
export const sitemapRoutes = [
  ...staticRoutes.filter((r) => r !== '/min-reise'),
  ...experienceRoutes,
  ...destinationRoutes,
  ...guideRoutes,
];

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

const articleLd = (g) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: g.title,
  description: g.excerpt,
  url: abs(`/guider/${g.slug}`),
  datePublished: g.published,
  dateModified: g.published,
  inLanguage: 'nb-NO',
  author: { '@type': 'Organization', name: site.name, url: site.url },
  publisher: { '@type': 'Organization', name: site.name, url: site.url },
  articleSection: g.topic,
});

const placeLd = (d) => ({
  '@context': 'https://schema.org',
  '@type': 'TouristDestination',
  name: d.name,
  description: d.tagline,
  url: abs(`/reisemal/${d.slug}`),
  address: { '@type': 'PostalAddress', addressRegion: d.region, addressCountry: 'TH' },
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
  '/reisemal': {
    title: `Reisemål i Thailand — hvor bør du dra? | ${site.name}`,
    description:
      'Bangkok, Phuket, Chiang Mai, Krabi, Koh Samui og Pattaya — forklart på norsk. Hva som er verdt tiden, når du bør reise og hva du kan hoppe over.',
  },
  '/guider': {
    title: `Thailand-guider på norsk | ${site.name}`,
    description:
      'Ærlige guider om Thailand: beste reisetid, hva turen koster, reise med barn, etiske elefantparker og hvordan du velger mellom reisemålene.',
  },
  '/naar-reise': {
    title: `Når bør du reise til Thailand? Måned for måned | ${site.name}`,
    description:
      'Thailand har to kyster med hver sin regntid. Se hvilken region som har best vær hver eneste måned — og hvorfor november er høysesong på Phuket og våtest på Koh Samui.',
  },
  '/reisebudsjett': {
    title: `Hva koster en Thailand-tur? Regn det ut | ${site.name}`,
    description:
      'Regn ut hva Thailand-turen din koster: dager, antall reisende, reisestil og fly. Alle satsene står åpent, så du kan justere dem mot din egen ferie.',
  },
  '/min-reise': {
    title: `Min reise — planlegg Thailand-turen | ${site.name}`,
    description:
      'Samle opplevelsene du vurderer, fordel dem på dager og se hva hele turen koster. Planen lagres i nettleseren din.',
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

  const dest = path.match(/^\/reisemal\/(.+)$/);
  if (dest) {
    const d = destPages.find((x) => x.slug === dest[1]);
    if (d) {
      return {
        title: `${d.metaTitle} | ${site.name}`,
        description: d.metaDescription,
        canonical: abs(path),
        jsonLd: [
          placeLd(d),
          faqLd(d.faq),
          breadcrumbLd([
            { name: 'Hjem', path: '/' },
            { name: 'Reisemål', path: '/reisemal' },
            { name: d.name, path },
          ]),
        ],
      };
    }
  }

  const guide = path.match(/^\/guider\/(.+)$/);
  if (guide) {
    const g = guides.find((x) => x.slug === guide[1]);
    if (g) {
      return {
        title: `${g.metaTitle} | ${site.name}`,
        description: g.metaDescription,
        canonical: abs(path),
        jsonLd: [
          articleLd(g),
          ...(g.faq?.length ? [faqLd(g.faq)] : []),
          breadcrumbLd([
            { name: 'Hjem', path: '/' },
            { name: 'Guider', path: '/guider' },
            { name: g.title, path },
          ]),
        ],
      };
    }
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
