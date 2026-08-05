/*
 * Lager delingsbildet (Open Graph) fra scripts/og/mal.html.
 *
 * Kjøres for hånd med `npm run og`, ikke ved hvert bygg — Vercel har ingen
 * nettleser å rendre med. Resultatet ligger i public/og.png og sjekkes inn.
 */
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..', '..');

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
});
const page = await browser.newPage({
  viewport: { width: 1200, height: 630 },
  deviceScaleFactor: 1,
});
await page.goto(`file://${join(here, 'mal.html')}`, { waitUntil: 'networkidle' });
await page.screenshot({ path: join(root, 'public', 'og.png') });
await browser.close();
console.log('✓ public/og.png (1200×630)');
