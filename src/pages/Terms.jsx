import { Link } from 'react-router-dom';
import { site } from '../config.js';
import { DraftNotice, LegalIdentity } from './Privacy.jsx';

export default function Terms() {
  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Vilkår</span>
          <h1>Bestillingsvilkår</h1>
          <p>Hva som gjelder når du bestiller en opplevelse hos oss.</p>
        </div>
      </header>

      <div className="prose-wrap">
        <DraftNotice />

        <section className="prose">
          <h2>1. Hvem du inngår avtale med</h2>
          <LegalIdentity />
          <p>
            {site.name} formidler opplevelser som utføres av lokale operatører i
            Thailand. Det betyr at vi står for utvalg, bestilling og kundeservice,
            mens operatøren utfører selve turen og har ansvaret for gjennomføringen
            på stedet.
          </p>

          <h2>2. Bestilling og bekreftelse</h2>
          <p>
            En bestilling er bindende først når du har mottatt en skriftlig
            bekreftelse fra oss på e-post. Er turen fullbooket på ønsket dato,
            kontakter vi deg med alternativer før noe belastes.
          </p>
          <p>
            Du må være myndig for å bestille. Bestiller du på vegne av flere, er
            du ansvarlig for at opplysningene om alle i følget er riktige.
          </p>

          <h2>3. Priser og betaling</h2>
          <ul>
            <li>Alle priser oppgis i norske kroner og per person, om ikke annet står oppført.</li>
            <li>Prisen som vises ved bestilling er den du betaler. Vi legger ikke på gebyrer i etterkant.</li>
            <li>Betaling håndteres av vår betalingspartner. Vi lagrer aldri kortopplysningene dine.</li>
            <li>Utgifter som ikke er inkludert står tydelig oppført på hver enkelt opplevelse.</li>
          </ul>

          <h2>4. Avbestilling og endring</h2>
          <p>
            Avbestillingsfristen står oppført på hver enkelt opplevelse. For de
            fleste turer gjelder gratis avbestilling inntil 24 timer før start.
          </p>
          <ul>
            <li><strong>Innenfor fristen:</strong> du får hele beløpet tilbake.</li>
            <li><strong>Etter fristen:</strong> beløpet refunderes normalt ikke, fordi operatøren allerede har satt av plass og mannskap.</li>
            <li><strong>Endring av dato:</strong> gjøres kostnadsfritt innenfor fristen, forutsatt ledig plass.</li>
          </ul>
          <p>
            Avbestilling og endring meldes til{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a> med
            bestillingsreferansen din.
          </p>

          <h2>5. Hvis turen avlyses</h2>
          <p>
            Blir en tur avlyst av operatøren — for eksempel på grunn av vær,
            sikkerhet eller for få påmeldte — får du velge mellom ny dato eller
            full refusjon. Vi dekker ikke utgifter du måtte ha til fly, hotell
            eller transport i forbindelse med en avlysning; slike tap dekkes
            normalt av reiseforsikringen din.
          </p>

          <h2>6. Ditt ansvar som reisende</h2>
          <ul>
            <li>Møt opp til avtalt tid og sted. Møter du ikke opp, regnes turen som benyttet.</li>
            <li>Følg instruksjonene fra guide og operatør, særlig ved aktiviteter i vann, i høyden eller med dyr.</li>
            <li>Opplys om helseforhold, allergier eller andre behov som kan ha betydning for gjennomføringen.</li>
            <li>Sørg for gyldig pass, visum og reiseforsikring. Dette er ditt ansvar.</li>
          </ul>

          <h2>7. Reiseforsikring</h2>
          <p>
            Vi anbefaler alle å ha reiseforsikring som dekker aktivitetene de
            skal delta på. Enkelte operatører har egne forsikringer, men de
            erstatter ikke din egen.
          </p>

          <h2>8. Reklamasjon</h2>
          <p>
            Er du misfornøyd, si fra til guiden eller operatøren mens du er på
            stedet, slik at det kan rettes opp der og da. Får du ikke løst det,
            kontakt oss innen rimelig tid etter turen, så følger vi det opp for
            deg.
          </p>

          <h2>9. Klageadgang</h2>
          <p>
            Kommer vi ikke til enighet, kan du bringe saken inn for et relevant
            klageorgan.{' '}
            <em>
              [Fyll inn hvilket klageorgan som gjelder for virksomheten din — dette
              avhenger av hvor selskapet er registrert.]
            </em>
          </p>

          <h2>10. Endringer i vilkårene</h2>
          <p>
            Vi kan oppdatere disse vilkårene. Vilkårene som gjaldt da du bestilte,
            er de som gjelder for din bestilling.
          </p>
        </section>

        <p className="prose-back"><Link to="/">← Tilbake til forsiden</Link></p>
      </div>
    </>
  );
}
