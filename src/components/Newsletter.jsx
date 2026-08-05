import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../scenes.jsx';
import { read, write, KEYS } from '../lib/storage.js';
import { track } from '../lib/analytics.js';
import { newsletter, site } from '../config.js';

/*
 * E-postliste.
 *
 * Dette er den billigste og mest lønnsomme kanalen som finnes: folk som
 * planlegger en Thailand-tur seks måneder fram i tid husker ikke nettstedet
 * ditt, men de leser e-posten sin. Å fange adressen mens de leser en guide
 * er langt lettere enn å få dem til å booke der og da.
 *
 * Vi lover noe konkret (en sjekkliste) framfor «nyhetsbrev», og vi sier hva
 * de får og hvor ofte. Det er både ærligere og gir bedre påmeldingsrate.
 */
export default function Newsletter({ compact = false }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState(() => (read(KEYS.newsletter, null) ? 'sendt' : 'klar'));
  const [error, setError] = useState('');

  const source = compact ? 'footer' : 'inline';

  const submit = async (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      setError('Skriv inn en gyldig e-postadresse.');
      return;
    }
    setError('');
    setState('sender');

    if (newsletter.endpoint) {
      try {
        const res = await fetch(newsletter.endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, source }),
        });
        if (!res.ok) throw new Error(String(res.status));
      } catch {
        setState('klar');
        setError('Noe gikk galt hos oss. Prøv igjen, eller send oss en e-post.');
        return;
      }
      write(KEYS.newsletter, { email, at: Date.now() });
      track('newsletter_signup', { source });
      setState('sendt');
      return;
    }

    // Ingen liste koblet på ennå: åpne kundens e-postprogram med en ferdig
    // melding, så adressen faktisk når fram. Vi later ikke som noe annet.
    const body = `Hei! Send meg Thailand-sjekklisten.\n\nE-post: ${email}\n`;
    window.location.href =
      `mailto:${site.email}?subject=${encodeURIComponent('Thailand-sjekklisten')}` +
      `&body=${encodeURIComponent(body)}`;
    write(KEYS.newsletter, { email, at: Date.now() });
    track('newsletter_signup', { source });
    setState('mailto');
  };

  if (state === 'sendt' || state === 'mailto') {
    return (
      <div className={`news news--done ${compact ? 'news--compact' : ''}`}>
        <span className="news-check"><Icon.check width={20} height={20} /></span>
        <p>
          {state === 'sendt' ? (
            <>
              <strong>Takk!</strong> Sjekklisten er på vei til innboksen din.
            </>
          ) : (
            <>
              <strong>Nesten der.</strong> Vi åpnet e-postprogrammet ditt med en
              ferdig melding — send den, så kommer listen i retur.
            </>
          )}
        </p>
      </div>
    );
  }

  return (
    <section className={`news ${compact ? 'news--compact' : ''}`}>
      <div className="news-copy">
        <h2>Få vår Thailand-sjekkliste gratis</h2>
        <p>
          Én e-post med det vi skulle ønske vi visste før første tur: hva du bør
          booke på forhånd, hva du kan vente med, og hvordan du unngår de
          vanligste tabbene. Deretter hører du fra oss én gang i måneden.
        </p>
      </div>

      <form className="news-form" onSubmit={submit} noValidate>
        <label className="sr-only" htmlFor="news-email">E-postadresse</label>
        <div className="news-row">
          <input
            id="news-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="din@epost.no"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? 'news-error' : undefined}
          />
          <button className="btn btn-gold" type="submit" disabled={state === 'sender'}>
            {state === 'sender' ? 'Sender…' : 'Send meg listen'}
          </button>
        </div>
        {error && <p className="news-error" id="news-error">{error}</p>}
        <p className="news-fine">
          Ingen spam. Meld deg av når du vil. Se{' '}
          <Link to="/personvern">personvernerklæringen</Link>.
        </p>
      </form>
    </section>
  );
}
