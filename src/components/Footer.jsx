import { Link } from 'react-router-dom';
import { Logo } from './Nav.jsx';
import { site } from '../config.js';
import { destinations } from '../data.js';

export default function Footer({ onOpenConsent }) {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo light />
          <p>
            Kuraterte opplevelser i Thailand for norske reisende. Book på norsk,
            betal i kroner, reis trygt.
          </p>
          <a className="footer-mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>

        <nav className="footer-col" aria-label="Opplevelser">
          <h4>Opplevelser</h4>
          <Link to="/opplevelser">Alle opplevelser</Link>
          <Link to="/opplevelser?kategori=Natur+%26+dyr">Natur &amp; dyr</Link>
          <Link to="/opplevelser?kategori=%C3%98yer+%26+strender">Øyer &amp; strender</Link>
          <Link to="/opplevelser?kategori=Mat+%26+kultur">Mat &amp; kultur</Link>
        </nav>

        <nav className="footer-col" aria-label="Reisemål">
          <h4>Reisemål</h4>
          {destinations.slice(0, 4).map((d) => (
            <Link key={d.name} to={`/opplevelser?sted=${encodeURIComponent(d.name)}`}>
              {d.name}
            </Link>
          ))}
        </nav>

        <nav className="footer-col" aria-label="Informasjon">
          <h4>Informasjon</h4>
          <Link to="/naar-reise">Når bør du reise</Link>
          <Link to="/reisebudsjett">Hva koster turen</Link>
          <Link to="/guider">Guider</Link>
          <Link to="/om-oss">Om oss</Link>
          <Link to="/faq">Spørsmål og svar</Link>
          <Link to="/vilkar">Bestillingsvilkår</Link>
          <Link to="/personvern">Personvern</Link>
          <Link to="/informasjonskapsler">Informasjonskapsler</Link>
          <button type="button" className="footer-linklike" onClick={onOpenConsent}>
            Endre samtykke
          </button>
        </nav>
      </div>

      <div className="footer-bottom">
        <span>
          © {year} {site.name}
          {site.legal.orgNumber && !site.legal.orgNumber.startsWith('TODO')
            ? ` · Org.nr ${site.legal.orgNumber}`
            : ''}
        </span>
        <span className="footer-note">Basert i Thailand · Norsk drevet</span>
      </div>
    </footer>
  );
}
