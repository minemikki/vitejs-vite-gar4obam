import { read, KEYS } from './storage.js';

/*
 * Hendelsessporing — men bare med samtykke.
 *
 * Poenget med å måle: du kan ikke forbedre det du ikke ser. Vet du at 200
 * personer så på elefantturen og 3 booket, vet du hvor du skal lete. Uten
 * tall gjetter du.
 *
 * Alt går gjennom denne ene funksjonen, slik at samtykkesjekken finnes ett
 * sted og ikke kan glemmes i en enkelt komponent.
 */

const hasConsent = () => {
  const c = read(KEYS.consent, null);
  return !!c?.analytics;
};

/** Hendelser vi bryr oss om, med hva de forteller deg. */
export const EVENTS = {
  search: 'Hva folk leter etter — gir deg innhold å lage',
  view_experience: 'Hvilke turer som får oppmerksomhet',
  trip_add: 'Interesse sterk nok til å planlegge rundt',
  trip_remove: 'Hva folk ombestemmer seg om',
  begin_checkout: 'Toppen av bestillingstrakten',
  checkout_step: 'Hvor i skjemaet folk faller fra',
  purchase: 'Fullført bestilling eller forespørsel',
  newsletter_signup: 'E-postadresser — den billigste kanalen din',
};

export function track(event, data = {}) {
  if (typeof window === 'undefined') return;

  // Uten samtykke sender vi ingenting videre.
  if (!hasConsent()) return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', event, data);
  }

  // Samme hendelser er tilgjengelige for andre verktøy uten ny kode.
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

/** Sidevisning ved navigering i en enkeltside-app. */
export function trackPageView(path, title) {
  if (typeof window === 'undefined' || !hasConsent()) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', { page_path: path, page_title: title });
  }
}
