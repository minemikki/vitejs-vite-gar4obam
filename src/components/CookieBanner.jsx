import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { read, write, KEYS } from '../lib/storage.js';
import { analytics, partners, CONSENT_MONTHS } from '../config.js';

/*
 * GDPR-samtykke gjort riktig:
 *  - Ingenting utover strengt nødvendig lagring skjer før aktivt samtykke.
 *  - «Avvis» er like lett tilgjengelig som «Godta» (krav i EU/EØS).
 *  - Valget kan når som helst endres via lenken i footeren.
 *  - Samtykket utløper, så brukeren blir spurt på nytt.
 */

const expired = (c) => {
  if (!c || !c.at) return true;
  const months = (Date.now() - c.at) / (1000 * 60 * 60 * 24 * 30.4);
  return months > CONSENT_MONTHS;
};

/**
 * GetYourGuides skript. Ett og samme skript driver både statistikken
 * (hvilke turer folk klikker på) og bestillingswidgetene (kalenderen som
 * lar kunden booke på vår egen side). GetYourGuide ber deg legge det i
 * <head> på hver side; det gjør vi ikke, fordi det setter sporing og
 * innhold fra tredjepart før brukeren har sagt ja.
 *
 * Eksportert fordi bestillingswidgeten på turdetaljsiden også må kunne be om
 * det, ikke bare samtykkebanneret.
 */
export function loadPartnerAnalytics() {
  const id = partners.gygPartnerId;
  if (!id || document.getElementById('gyg-analytics')) return;
  const s = document.createElement('script');
  s.id = 'gyg-analytics';
  s.async = true;
  s.defer = true;
  s.src = 'https://widget.getyourguide.com/dist/pa.umd.production.min.js';
  s.dataset.gygPartnerId = id;
  document.head.appendChild(s);
}

/** Laster analyseverktøy — kalles KUN etter samtykke. */
function loadAnalytics() {
  const id = analytics.googleAnalyticsId;
  if (!id || document.getElementById('ga-script')) return;
  const s = document.createElement('script');
  s.id = 'ga-script';
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag(...args) { window.dataLayer.push(args); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });
}

export function useConsent() {
  const [consent, setConsent] = useState(() => read(KEYS.consent, null));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = read(KEYS.consent, null);
    if (expired(stored)) setOpen(true);
    else if (stored?.analytics) {
      loadAnalytics();
      loadPartnerAnalytics();
    }
  }, []);

  const decide = useCallback((accepted) => {
    const value = { analytics: accepted, at: Date.now() };
    write(KEYS.consent, value);
    setConsent(value);
    setOpen(false);
    if (accepted) {
      loadAnalytics();
      loadPartnerAnalytics();
    }
    // Andre komponenter (som bestillingswidgeten) må få vite at valget endret
    // seg, uten å dele React-state med banneret.
    window.dispatchEvent(new Event('st-consent'));
  }, []);

  const reopen = useCallback(() => setOpen(true), []);

  // Lar hvilken som helst komponent be om at samtykkevalget vises igjen, uten
  // å måtte tre reopen gjennom hele treet.
  useEffect(() => {
    const onAsk = () => setOpen(true);
    window.addEventListener('st-open-consent', onAsk);
    return () => window.removeEventListener('st-open-consent', onAsk);
  }, []);

  return { consent, open, decide, reopen };
}

/**
 * Lettvekts avlesning av statistikk-samtykket for komponenter som bare trenger
 * ja/nei — og som må oppdatere seg hvis brukeren endrer valget. Deler ikke
 * state med banneret; lytter på hendelsen banneret sender.
 */
export function useAnalyticsConsent() {
  // Starter på false — samme som forhåndsrenderingen, der localStorage ikke
  // finnes. Leser vi det ekte valget allerede ved første render, tegner
  // server og nettleser ulikt, og React kaster markupen (hydreringsfeil).
  // Vi leser det først etter montering, i effekten under.
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const update = () => setOk(!!read(KEYS.consent, null)?.analytics);
    update();
    window.addEventListener('st-consent', update);
    window.addEventListener('storage', update);
    return () => {
      window.removeEventListener('st-consent', update);
      window.removeEventListener('storage', update);
    };
  }, []);
  return ok;
}

export default function CookieBanner({ open, decide }) {
  if (!open) return null;
  return (
    <div className="consent" role="dialog" aria-modal="false" aria-label="Informasjonskapsler">
      <div className="consent-inner">
        <div className="consent-copy">
          <h2>Vi bruker informasjonskapsler</h2>
          <p>
            Noen er nødvendige for at siden skal virke — de kan ikke slås av.
            I tillegg vil vi gjerne måle hvordan siden brukes, så vi kan gjøre
            den bedre. Det skjer bare hvis du sier ja.{' '}
            <Link to="/informasjonskapsler">Les mer</Link>
          </p>
        </div>
        <div className="consent-actions">
          <button className="btn btn-ghost-dark" onClick={() => decide(false)}>
            Kun nødvendige
          </button>
          <button className="btn btn-gold" onClick={() => decide(true)}>
            Godta alle
          </button>
        </div>
      </div>
    </div>
  );
}
