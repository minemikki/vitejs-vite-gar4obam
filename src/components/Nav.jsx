import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogoMark, Icon } from '../scenes.jsx';
import { site } from '../config.js';

export function Logo({ light = false }) {
  return (
    <Link to="/" className={`logo ${light ? 'logo--light' : ''}`} aria-label={`${site.name} — til forsiden`}>
      <LogoMark size={38} />
      <span className="logo-text">
        Sawadee<span className="logo-text-accent">Tours</span>
      </span>
    </Link>
  );
}

const LINKS = [
  { to: '/opplevelser', label: 'Opplevelser' },
  { to: '/om-oss', label: 'Om oss' },
  { to: '/faq', label: 'Spørsmål' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  // Forsiden har mørkt hero-bilde bak menyen; alle andre sider er lyse.
  const overHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lukk menyen ved navigering, og lås bakgrunnen mens den er åpen.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const transparent = overHero && !solid && !open;

  return (
    <header className={`nav ${transparent ? '' : 'is-solid'}`}>
      <div className="nav-inner">
        <Logo />

        <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Hovedmeny">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? 'is-current' : '')}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-right">
          <span className="nav-nok" title="Alle priser vises i norske kroner">
            <Icon.globe width={15} height={15} /> NOK
          </span>
          <Link to="/opplevelser" className="btn btn-primary btn-sm nav-book">
            Book nå
          </Link>
          <button
            className="nav-burger"
            aria-label={open ? 'Lukk meny' : 'Åpne meny'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Icon.x width={22} height={22} /> : (
              <>
                <span /><span /><span />
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
