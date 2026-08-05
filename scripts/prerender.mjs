/*
 * Forhåndsrendering.
 *
 * Vite bygger en ren enkeltside-app: serveren sender én tom <div id="root">,
 * og alt innhold tegnes av JavaScript. Det er dårlig for synlighet i søk og
 * for forhåndsvisninger når noen deler en lenke.
 *
 * Dette skriptet kjører appen én gang per rute ved bygg og skriver ferdig
 * HTML til dist/<rute>/index.html — med riktig tittel, beskrivelse, canonical,
 * Open Graph og structured data. I nettleseren hydreres den samme markupen,
 * så siden oppfører seg som før.
 *
 * Kjøres automatisk av `npm run build`.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const dist = join(root, 'dist');
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js');

const { render, metaForPath, allRoutes, sitemapRoutes, site, newsletter } = await import(
  pathToFileURL(ssrEntry).href
);

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function headFor(meta) {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex,follow' : 'index,follow'}" />`,
    `<link rel="canonical" href="${esc(meta.canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="nb_NO" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(meta.canonical)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
  ];
  for (const ld of meta.jsonLd || []) {
    // </script> inne i data ville lukket taggen for tidlig.
    const json = JSON.stringify(ld).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json" data-route-ld="true">${json}</script>`);
  }
  return tags.join('\n    ');
}

async function pageFor(route) {
  const meta = metaForPath(route);
  const html = await render(route);

  return template
    // Erstatt standardtittelen fra index.html med rutens egen.
    .replace(/<title>[\s\S]*?<\/title>/, headFor(meta))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

let written = 0;
const failures = [];

for (const route of allRoutes) {
  try {
    const outDir = route === '/' ? dist : join(dist, route);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), await pageFor(route));
    written += 1;
  } catch (err) {
    failures.push(`${route}: ${err.message}`);
  }
}

// 404-side som Vercel serverer for ukjente stier.
try {
  writeFileSync(join(dist, '404.html'), await pageFor('/finnes-ikke'));
} catch (err) {
  failures.push(`404: ${err.message}`);
}

/* ------------------------------ sitemap ------------------------------ */
const today = new Date().toISOString().slice(0, 10);
const urls = sitemapRoutes
  .map((r) => {
    const loc = `${site.url}${r === '/' ? '' : r}`;
    const priority = r === '/' ? '1.0' : r.startsWith('/opplevelser/') ? '0.8' : '0.6';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
);

/* ------------------------------ robots ------------------------------- */
// Genereres her i stedet for å ligge statisk i public/, så sitemap-adressen
// aldri kan komme i utakt med `site.url`.
writeFileSync(
  join(dist, 'robots.txt'),
  [
    'User-agent: *',
    'Allow: /',
    '',
    '# Checkout har ikke noe i søkeresultatene å gjøre',
    'Disallow: /bestill/',
    '',
    `Sitemap: ${site.url}/sitemap.xml`,
    '',
  ].join('\n')
);

/* --------------------------- bygg-advarsler --------------------------- */
// Vises i Vercel-loggen. Det er lett å glemme å bytte adresse etter at
// domenet er kjøpt, og konsekvensen — canonical som peker feil vei — er
// usynlig på siden og ødeleggende for søk.
const emailDomain = site.email.split('@')[1] || '';
const siteDomain = site.url.replace(/^https?:\/\//, '');
const warnings = [];
if (siteDomain.endsWith('.vercel.app')) {
  warnings.push(`site.url peker fortsatt på ${siteDomain} — bytt til eget domene når det er koblet.`);
}
if (!newsletter.endpoint) {
  warnings.push('newsletter.endpoint er tom — påmeldinger går via kundens eget e-postprogram i stedet for rett inn i en liste.');
}
if (emailDomain && !siteDomain.endsWith(emailDomain)) {
  warnings.push(`site.email (${site.email}) ligger ikke på ${siteDomain} — sjekk at adressen finnes.`);
}
for (const w of warnings) console.warn(`  ⚠ ${w}`);

// Mellombygget trengs ikke i det som deployes.
rmSync(join(root, 'dist-ssr'), { recursive: true, force: true });

if (failures.length) {
  console.error(`\n✗ Forhåndsrendering feilet for ${failures.length} rute(r):`);
  failures.forEach((f) => console.error(`  - ${f}`));
  process.exit(1);
}

console.log(`✓ Forhåndsrendret ${written} sider + 404 og sitemap.xml`);
