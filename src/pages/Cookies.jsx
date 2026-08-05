import { Link } from 'react-router-dom';
import { useConsent } from '../components/CookieBanner.jsx';
import { analytics, partners, CONSENT_MONTHS } from '../config.js';
import { DraftNotice } from './Privacy.jsx';

export default function Cookies() {
  const { consent, decide, reopen } = useConsent();
  const analyticsOn = !!consent?.analytics;

  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Informasjonskapsler</span>
          <h1>Om informasjonskapsler</h1>
          <p>Hva vi lagrer i nettleseren din, hvorfor — og hvordan du styrer det.</p>
        </div>
      </header>

      <div className="prose-wrap">
        <DraftNotice />

        <section className="prose">
          <h2>Kort fortalt</h2>
          <p>
            Vi bruker så få informasjonskapsler som mulig. De nødvendige må være
            der for at siden skal fungere. Alt annet — som statistikk — skjer bare
            hvis du sier ja, og du kan ombestemme deg når som helst.
          </p>

          <h2>Hva vi lagrer</h2>
          <table className="legal-table legal-table--wide">
            <thead>
              <tr>
                <th>Navn</th>
                <th>Hva den gjør</th>
                <th>Varighet</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>st.consent</code></td>
                <td>Husker valget ditt i samtykkebanneret, så du slipper å bli spurt hver gang.</td>
                <td>{CONSENT_MONTHS} måneder</td>
                <td>Nødvendig</td>
              </tr>
              <tr>
                <td><code>st.wishlist</code></td>
                <td>Husker hvilke opplevelser du har lagret med hjerteikonet.</td>
                <td>Til du sletter den</td>
                <td>Nødvendig</td>
              </tr>
              <tr>
                <td><code>st.booking.draft</code></td>
                <td>Tar vare på en påbegynt bestilling, så du ikke mister det du har fylt inn.</td>
                <td>Til du sletter den</td>
                <td>Nødvendig</td>
              </tr>
              {partners.gygPartnerId ? (
                <tr>
                  <td><code>GetYourGuide</code></td>
                  <td>
                    Måler hvilke turer du klikker deg videre på, så vi vet hva
                    som er verdt å ta inn i utvalget. Settes av GetYourGuide,
                    som er vår bookingpartner.
                  </td>
                  <td>Se GetYourGuides egen erklæring</td>
                  <td>Statistikk (krever samtykke)</td>
                </tr>
              ) : null}
              {analytics.googleAnalyticsId ? (
                <tr>
                  <td><code>_ga</code>, <code>_ga_*</code></td>
                  <td>Anonymisert statistikk om hvilke sider som besøkes, så vi kan forbedre siden.</td>
                  <td>Inntil 24 måneder</td>
                  <td>Statistikk (krever samtykke)</td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4">
                    <em>
                      Google Analytics er ikke koblet på. Legges det til senere,
                      kjører det først etter at du har samtykket.
                    </em>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <p className="hint">
            De tre første er teknisk sett lagret med <code>localStorage</code>, ikke
            klassiske informasjonskapsler, men vi lister dem her fordi det er det
            samme for deg: data som ligger igjen i nettleseren din.
          </p>

          <h2>Ditt valg akkurat nå</h2>
          <div className="consent-status">
            <p>
              Statistikk er{' '}
              <strong className={analyticsOn ? 'is-on' : 'is-off'}>
                {analyticsOn ? 'slått på' : 'slått av'}
              </strong>{' '}
              for deg.
            </p>
            <div className="consent-status-actions">
              {analyticsOn ? (
                <button className="btn btn-outline" onClick={() => decide(false)}>
                  Trekk tilbake samtykke
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => decide(true)}>
                  Tillat statistikk
                </button>
              )}
              <button className="btn btn-outline" onClick={reopen}>
                Vis valgene igjen
              </button>
            </div>
          </div>

          <h2>Slette alt selv</h2>
          <p>
            Du kan når som helst slette alt vi har lagret ved å tømme
            nettleserdataene for dette nettstedet. Da forsvinner også
            ønskelisten og et eventuelt bestillingsutkast.
          </p>

          <h2>Mer om personvern</h2>
          <p>
            Hvordan vi behandler personopplysninger ellers, står i{' '}
            <Link to="/personvern">personvernerklæringen</Link>.
          </p>
        </section>

        <p className="prose-back"><Link to="/">← Tilbake til forsiden</Link></p>
      </div>
    </>
  );
}
