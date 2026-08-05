import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

/**
 * Rendrer én rute til HTML ved bygg.
 *
 * Vi bruker `prerenderToNodeStream` og ikke `renderToString`, fordi sidene
 * lastes med React.lazy. renderToString kan ikke vente på en Suspense-grense
 * og ville skrevet lasteindikatoren til fila — som så kolliderte med det
 * nettleseren tegnet, og ga hydreringsfeil på hver eneste underside.
 */
export async function render(url) {
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );

  let html = '';
  for await (const chunk of prelude) html += chunk;
  return html;
}

export { metaForPath, allRoutes, sitemapRoutes } from './lib/meta.js';
export { site, newsletter } from './config.js';
