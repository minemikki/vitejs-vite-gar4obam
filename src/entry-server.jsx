import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from './App.jsx';

/**
 * Rendrer én rute til HTML ved bygg. Brukes av scripts/prerender.mjs slik at
 * søkemotorer og delingsforhåndsvisninger får ekte innhold, ikke en tom div.
 */
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}

export { metaForPath, allRoutes, sitemapRoutes } from './lib/meta.js';
export { site } from './config.js';
