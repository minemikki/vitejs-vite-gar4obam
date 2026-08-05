/*
 * Liten statisk server som oppfører seg som Vercel med `cleanUrls: true`:
 *   /faq        → dist/faq/index.html
 *   /ukjent     → dist/404.html (status 404)
 *
 * `vite preview` gjør ikke dette — den sender forsiden for alle ukjente
 * stier, noe som gir falske hydreringsfeil når man tester forhåndsrendrede
 * sider. Brukes til lokal verifisering: `node scripts/serve-static.mjs 4300`
 */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, dirname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.argv[2] || 4300);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const isFile = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  // normalize + prefiks-sjekk stopper stier som «/../../etc/passwd»
  const clean = normalize(decodeURIComponent(url.pathname)).replace(/^(\.\.[/\\])+/, '');
  const target = resolve(join(dist, clean));
  if (!target.startsWith(dist)) {
    res.writeHead(403).end('Forbidden');
    return;
  }

  const candidates = [target, join(target, 'index.html'), `${target}.html`];
  for (const c of candidates) {
    if (await isFile(c)) {
      const body = await readFile(c);
      res.writeHead(200, { 'Content-Type': TYPES[extname(c)] || 'application/octet-stream' });
      res.end(body);
      return;
    }
  }

  const notFound = join(dist, '404.html');
  if (await isFile(notFound)) {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] });
    res.end(await readFile(notFound));
    return;
  }
  res.writeHead(404).end('Not found');
}).listen(port, () => {
  console.log(`Statisk server (Vercel-lik) på http://localhost:${port}`);
});
