import { Link } from 'react-router-dom';
import { Icon } from '../scenes.jsx';
import { site } from '../config.js';

export function DraftNotice() {
  return (
    <div className="draft-note" role="note">
      <Icon.info width={20} height={20} />
      <p>
        <strong>Utkast — må gjennomgås før lansering.</strong> Teksten under er
        et utgangspunkt skrevet for denne nettsiden, ikke ferdig juridisk
        rådgivning. Fyll inn selskapsopplysningene i{' '}
        <code>src/config.js</code>, og få dokumentet gjennomgått av noen med
        juridisk kompetanse før du tar imot ekte bestillinger.
      </p>
    </div>
  );
}

export function LegalIdentity() {
  const l = site.legal;
  const todo = (v) => !v || v.startsWith('TODO');
  return (
    <table className="legal-table">
      <tbody>
        <tr>
          <th scope="row">Behandlingsansvarlig</th>
          <td>{todo(l.companyName) ? <em>[fyll inn selskapsnavn]</em> : l.companyName}</td>
        </tr>
        <tr>
          <th scope="row">Organisasjonsnummer</th>
          <td>{todo(l.orgNumber) ? <em>[fyll inn org.nr]</em> : l.orgNumber}</td>
        </tr>
        <tr>
          <th scope="row">Adresse</th>
          <td>{todo(l.address) ? <em>[fyll inn forretningsadresse]</em> : l.address}</td>
        </tr>
        <tr>
          <th scope="row">E-post</th>
          <td><a href={`mailto:${site.email}`}>{site.email}</a></td>
        </tr>
      </tbody>
    </table>
  );
}

export default function Privacy() {
  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Personvern</span>
          <h1>Personvernerklæring</h1>
          <p>Hvordan vi behandler personopplysningene dine, og hvilke rettigheter du har.</p>
        </div>
      </header>

      <div className="prose-wrap">
        <DraftNotice />

        <section className="prose">
          <h2>Hvem er ansvarlig?</h2>
          <LegalIdentity />

          <h2>Hvilke opplysninger samler vi inn?</h2>
          <p>Vi samler kun inn det vi trenger for å gjennomføre bestillingen din:</p>
          <ul>
            <li><strong>Kontaktopplysninger</strong> — navn, e-postadresse og eventuelt telefonnummer.</li>
            <li><strong>Bestillingsdetaljer</strong> — hvilken opplevelse, dato, antall reisende, hentested og eventuelle meldinger du skriver til oss.</li>
            <li><strong>Betalingsopplysninger</strong> — håndteres i sin helhet av vår betalingspartner. Vi mottar kun en bekreftelse på at betalingen er gjennomført, aldri kortnummeret ditt.</li>
            <li><strong>Teknisk informasjon</strong> — dersom du samtykker til analyse, samler vi anonymisert statistikk om hvordan siden brukes.</li>
          </ul>

          <h2>Hvorfor behandler vi dem, og med hvilket grunnlag?</h2>
          <table className="legal-table legal-table--wide">
            <thead>
              <tr><th>Formål</th><th>Behandlingsgrunnlag</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Gjennomføre og bekrefte bestillingen din</td>
                <td>Oppfyllelse av avtale (GDPR art. 6 nr. 1 b)</td>
              </tr>
              <tr>
                <td>Svare på henvendelser fra deg</td>
                <td>Berettiget interesse (art. 6 nr. 1 f)</td>
              </tr>
              <tr>
                <td>Bokføring og regnskap</td>
                <td>Rettslig forpliktelse (art. 6 nr. 1 c)</td>
              </tr>
              <tr>
                <td>Statistikk om bruk av nettstedet</td>
                <td>Samtykke (art. 6 nr. 1 a)</td>
              </tr>
            </tbody>
          </table>

          <h2>Hvem deler vi opplysninger med?</h2>
          <p>
            For at turen din skal kunne gjennomføres, må vi dele navn, dato,
            antall reisende og eventuelt hentested med den lokale operatøren som
            utfører opplevelsen. Vi deler ikke mer enn nødvendig.
          </p>
          <p>
            I tillegg bruker vi noen underleverandører til drift: en
            betalingsleverandør, en leverandør av e-post og en leverandør av
            nettsidedrift. Vi selger aldri opplysningene dine videre.
          </p>
          <p className="callout">
            <Icon.globe width={18} height={18} />
            <span>
              <strong>Overføring utenfor EØS.</strong> Fordi opplevelsene skjer i
              Thailand, overføres nødvendige bestillingsopplysninger til
              operatører der. Thailand er ikke omfattet av EU-kommisjonens
              beslutning om tilstrekkelig beskyttelsesnivå, og slike overføringer
              skal derfor sikres med et gyldig overføringsgrunnlag.
              <em> Avklar hvilket grunnlag du bruker før lansering.</em>
            </span>
          </p>

          <h2>Hvor lenge lagrer vi opplysningene?</h2>
          <ul>
            <li><strong>Bestillinger:</strong> så lenge bokføringsloven krever, deretter slettes de.</li>
            <li><strong>Henvendelser på e-post:</strong> slettes når saken er avsluttet, med mindre vi må ta vare på den av dokumentasjonshensyn.</li>
            <li><strong>Samtykke til analyse:</strong> lagres i nettleseren din i inntil 12 måneder, og du blir da spurt på nytt.</li>
          </ul>

          <h2>Rettighetene dine</h2>
          <p>Etter personvernforordningen har du rett til å:</p>
          <ul>
            <li>få innsyn i hvilke opplysninger vi har om deg</li>
            <li>få rettet opplysninger som er feil</li>
            <li>få slettet opplysninger vi ikke lenger har grunnlag for å lagre</li>
            <li>be om begrensning av behandlingen</li>
            <li>få opplysningene dine utlevert i et maskinlesbart format (dataportabilitet)</li>
            <li>protestere mot behandling som bygger på berettiget interesse</li>
            <li>trekke tilbake et samtykke når som helst</li>
          </ul>
          <p>
            Send en e-post til <a href={`mailto:${site.email}`}>{site.email}</a> for
            å bruke rettighetene dine. Vi svarer så raskt vi kan, og senest innen
            én måned.
          </p>

          <h2>Klage</h2>
          <p>
            Mener du at vi behandler opplysningene dine i strid med regelverket,
            kan du klage til <a href="https://www.datatilsynet.no" target="_blank" rel="noreferrer noopener">Datatilsynet</a>.
            Vi setter pris på om du sier fra til oss først, så vi får rettet opp.
          </p>

          <h2>Informasjonskapsler</h2>
          <p>
            Hvilke informasjonskapsler vi bruker og hvordan du styrer dem, står i
            en egen oversikt: <Link to="/informasjonskapsler">Om informasjonskapsler</Link>.
          </p>
        </section>

        <p className="prose-back"><Link to="/">← Tilbake til forsiden</Link></p>
      </div>
    </>
  );
}
