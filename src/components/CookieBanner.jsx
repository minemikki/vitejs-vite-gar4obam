import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { read, write, KEYS } from '../lib/storage.js';
import { analytics, CONSENT_MONTHS } from '../config.js';

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
    else if (stored?.analytics) loadAnalytics();
  }, []);

  const decide = useCallback((accepted) => {
    const value = { analytics: accepted, at: Date.now() };
    write(KEYS.consent, value);
    setConsent(value);
    setOpen(false);
    if (accepted) loadAnalytics();
  }, []);

  const reopen = useCallback(() => setOpen(true), []);

  return { consent, open, decide, reopen };
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
