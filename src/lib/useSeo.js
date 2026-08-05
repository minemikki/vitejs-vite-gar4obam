import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { metaForPath } from './meta.js';
import { site } from '../config.js';

/** Setter/oppdaterer en <meta>-tag uten å lage duplikater. */
function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Holder <head> i synk med gjeldende rute. Forhåndsrenderingen legger inn
 * de samme verdiene statisk, så dette er kun for navigering i nettleseren.
 */
export function useSeo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const m = metaForPath(pathname);

    document.title = m.title;
    setMeta('name', 'description', m.description);
    setMeta('name', 'robots', m.noindex ? 'noindex,follow' : 'index,follow');
    setLink('canonical', m.canonical);

    setMeta('property', 'og:title', m.title);
    setMeta('property', 'og:description', m.description);
    setMeta('property', 'og:url', m.canonical);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', site.name);
    setMeta('property', 'og:locale', 'nb_NO');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', m.title);
    setMeta('name', 'twitter:description', m.description);

    // Erstatt tidligere rute-spesifikk structured data
    document.head
      .querySelectorAll('script[data-route-ld]')
      .forEach((n) => n.remove());
    m.jsonLd.forEach((obj) => {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.routeLd = 'true';
      s.textContent = JSON.stringify(obj);
      document.head.appendChild(s);
    });
  }, [pathname]);
}

/**
 * Ruller til toppen ved navigering — men respekterer #anker.
 *
 * Effekten hopper over aller første kjøring med vilje. Sidene er
 * forhåndsrendret, så de er lesbare og rullbare før JavaScript er lastet.
 * Uten dette hoppet ville en bruker som begynner å bla med én gang bli
 * kastet tilbake til toppen i det hydreringen blir ferdig — og nettleserens
 * egen gjenoppretting av posisjon ved «tilbake» ville blitt overstyrt.
 */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);
}
