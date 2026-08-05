import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { LogoMark, Icon } from '../scenes.jsx';
import { site } from '../config.js';
import { useTrip } from '../lib/trip.js';
import Search from './Search.jsx';

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
  { to: '/reisemal', label: 'Reisemål' },
  { to: '/naar-reise', label: 'Når reise' },
  { to: '/guider', label: 'Guider' },
  { to: '/om-oss', label: 'Om oss' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { trip } = useTrip();
  const { pathname } = useLocation();

  const overHero = pathname === '/';

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cmd/Ctrl+K åpner søket — det folk som bruker nettet mye forventer.
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const transparent = overHero && !solid && !open;
  const tripCount = trip.items.length;

  return (
    <>
      <header className={`nav ${transparent ? '' : 'is-solid'}`}>
        <div className="nav-inner">
          <Logo />

          <nav className={`nav-links ${open ? 'is-open' : ''}`} aria-label="Hovedmeny">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => (isActive ? 'is-current' : '')}>
                {l.label}
              </NavLink>
            ))}
            <NavLink to="/min-reise" className={({ isActive }) => `nav-mobileonly ${isActive ? 'is-current' : ''}`}>
              Min reise{tripCount > 0 ? ` (${tripCount})` : ''}
            </NavLink>
          </nav>

          <div className="nav-right">
            <button
              className="nav-icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Søk"
              title="Søk (Ctrl+K)"
            >
              <Icon.search width={20} height={20} />
            </button>

            <Link
              to="/min-reise"
              className="nav-icon nav-trip"
              aria-label={tripCount ? `Min reise, ${tripCount} lagt til` : 'Min reise'}
              title="Min reise"
            >
              <Icon.ticket width={20} height={20} />
              {tripCount > 0 && <span className="nav-badge">{tripCount}</span>}
            </Link>

            <Link to="/opplevelser" className="btn btn-primary btn-sm nav-book">Book nå</Link>

            <button
              className="nav-burger"
              aria-label={open ? 'Lukk meny' : 'Åpne meny'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Icon.x width={22} height={22} /> : (<><span /><span /><span /></>)}
            </button>
          </div>
        </div>
      </header>

      {searchOpen && <Search onClose={() => setSearchOpen(false)} />}
    </>
  );
}
