import { useMemo, useState, useEffect } from 'react';
import './App.css';
import {
  experiences,
  categories,
  destinations,
  testimonials,
} from './data.js';

const nok = (n) => n.toLocaleString('nb-NO') + ' kr';

function Logo() {
  return (
    <a href="#top" className="logo" aria-label="Sawadee Tours">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="34" height="34">
          <rect width="64" height="64" rx="14" fill="var(--emerald-dark)" />
          <circle cx="32" cy="26" r="12" fill="var(--gold)" />
          <path
            d="M12 50c8-10 32-10 40 0"
            fill="none"
            stroke="var(--coral)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span className="logo-text">
        Sawadee<span className="logo-text-accent">Tours</span>
      </span>
    </a>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="nav-inner">
        <Logo />
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          <a href="#opplevelser" onClick={() => setOpen(false)}>
            Opplevelser
          </a>
          <a href="#reisemal" onClick={() => setOpen(false)}>
            Reisemål
          </a>
          <a href="#hvorfor" onClick={() => setOpen(false)}>
            Hvorfor oss
          </a>
          <a href="#slik" onClick={() => setOpen(false)}>
            Slik funker det
          </a>
          <a className="nav-cta" href="#opplevelser" onClick={() => setOpen(false)}>
            Book nå
          </a>
        </nav>
        <div className="nav-right">
          <span className="nav-flag" title="Norsk · priser i kroner">
            🇳🇴 NOK
          </span>
          <button
            className="nav-burger"
            aria-label="Meny"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ onBrowse }) {
  return (
    <section className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <span className="hero-eyebrow">🌴 Thailand-opplevelser · på norsk</span>
          <h1>
            Opplev det ekte Thailand — <em>booket på norsk</em>, betalt i kroner.
          </h1>
          <p className="hero-lead">
            Håndplukkede turer, elefantparker, øyeventyr og matkurs. Norsk
            kundeservice, beste pris-garanti og gratis avbestilling på de fleste
            opplevelser.
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-lg" onClick={onBrowse}>
              Utforsk opplevelser
            </button>
            <a className="btn btn-ghost btn-lg" href="#hvorfor">
              Hvorfor booke med oss?
            </a>
          </div>
          <div className="hero-trust">
            <div className="stars" aria-hidden="true">
              ★★★★★
            </div>
            <span>
              <strong>4,8/5</strong> fra reisende · <strong>12&nbsp;000+</strong>{' '}
              fornøyde nordmenn
            </span>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-card-top">
            <span className="hero-card-badge">Bestselger</span>
            <span className="hero-card-emoji" aria-hidden="true">
              🐘
            </span>
          </div>
          <h3>Etisk elefantreservat</h3>
          <p className="hero-card-place">📍 Chiang Mai · Heldag</p>
          <div className="hero-card-row">
            <span className="hero-card-rating">★ 4,9</span>
            <span className="hero-card-price">
              <s>{nok(1090)}</s> {nok(890)}
            </span>
          </div>
          <button className="btn btn-primary btn-block" onClick={onBrowse}>
            Se opplevelsen
          </button>
          <p className="hero-card-note">Gratis avbestilling · Henting på hotell</p>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { n: '60+', l: 'Opplevelser' },
    { n: '8', l: 'Reisemål' },
    { n: '4,8★', l: 'Snittvurdering' },
    { n: '100%', l: 'Norsk support' },
  ];
  return (
    <div className="stats">
      {stats.map((s) => (
        <div className="stat" key={s.l}>
          <div className="stat-n">{s.n}</div>
          <div className="stat-l">{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function ExperienceCard({ exp, onBook }) {
  return (
    <article className="card">
      <div className="card-media" style={{ background: exp.gradient }}>
        <span className="card-emoji" aria-hidden="true">
          {exp.emoji}
        </span>
        {exp.bestseller && <span className="card-flag">🔥 Bestselger</span>}
        <span className="card-duration">{exp.duration}</span>
      </div>
      <div className="card-body">
        <div className="card-head">
          <span className="card-cat">{exp.category}</span>
          <span className="card-rating">
            ★ {exp.rating.toLocaleString('nb-NO')}{' '}
            <span className="card-reviews">({exp.reviews})</span>
          </span>
        </div>
        <h3 className="card-title">{exp.title}</h3>
        <p className="card-place">📍 {exp.place}</p>
        <p className="card-blurb">{exp.blurb}</p>
        <div className="card-tags">
          {exp.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>
        <div className="card-foot">
          <div className="card-price">
            {exp.oldPriceNOK && <s>{nok(exp.oldPriceNOK)}</s>}
            <strong>{nok(exp.priceNOK)}</strong>
            <span className="card-per">/ person</span>
          </div>
          <button className="btn btn-primary" onClick={() => onBook(exp)}>
            Bestill
          </button>
        </div>
      </div>
    </article>
  );
}

function Experiences({ onBook }) {
  const [active, setActive] = useState('Alle');
  const list = useMemo(
    () =>
      active === 'Alle'
        ? experiences
        : experiences.filter((e) => e.category === active),
    [active]
  );
  return (
    <section className="section" id="opplevelser">
      <div className="section-head">
        <div>
          <span className="kicker">Populære akkurat nå</span>
          <h2>Håndplukkede opplevelser i Thailand</h2>
        </div>
        <p className="section-sub">
          Hver opplevelse er kvalitetssjekket av oss som bor her. Priser i norske
          kroner — ingen skjulte gebyrer.
        </p>
      </div>

      <div className="filters" role="tablist" aria-label="Kategorier">
        {categories.map((c) => (
          <button
            key={c}
            className={`chip ${active === c ? 'is-active' : ''}`}
            onClick={() => setActive(c)}
            role="tab"
            aria-selected={active === c}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid">
        {list.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} onBook={onBook} />
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    {
      icon: '🇳🇴',
      t: 'Alt på norsk',
      d: 'Kundeservice, oppskrifter og guider på morsmålet. Betal trygt i kroner.',
    },
    {
      icon: '💸',
      t: 'Beste pris-garanti',
      d: 'Finner du samme tur billigere? Vi matcher prisen. Ingen skjulte gebyrer.',
    },
    {
      icon: '🤝',
      t: 'Lokalkunnskap',
      d: 'Vi bor i Thailand og velger kun turer vi selv ville tatt familien på.',
    },
    {
      icon: '🛡️',
      t: 'Trygg & fleksibel',
      d: 'Gratis avbestilling på de fleste turer, og støtte hele veien.',
    },
  ];
  return (
    <section className="section why" id="hvorfor">
      <div className="section-head center">
        <span className="kicker">Hvorfor Sawadee Tours</span>
        <h2>Norsk trygghet møter thailandsk lokalkunnskap</h2>
      </div>
      <div className="why-grid">
        {items.map((i) => (
          <div className="why-card" key={i.t}>
            <span className="why-icon" aria-hidden="true">
              {i.icon}
            </span>
            <h3>{i.t}</h3>
            <p>{i.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: '1',
      t: 'Velg opplevelse',
      d: 'Bla gjennom kuraterte turer og finn den som passer reisen din.',
    },
    {
      n: '2',
      t: 'Book på 2 minutter',
      d: 'Velg dato og antall. Betal trygt i kroner med kort eller Vipps.',
    },
    {
      n: '3',
      t: 'Møt opp og nyt',
      d: 'Få billetten på e-post umiddelbart. Mange turer har henting på hotellet.',
    },
  ];
  return (
    <section className="section how" id="slik">
      <div className="section-head center">
        <span className="kicker">Slik funker det</span>
        <h2>Fra idé til opplevelse på minutter</h2>
      </div>
      <div className="how-grid">
        {steps.map((s) => (
          <div className="how-step" key={s.n}>
            <div className="how-num">{s.n}</div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Destinations({ onBrowse }) {
  return (
    <section className="section" id="reisemal">
      <div className="section-head">
        <div>
          <span className="kicker">Reisemål</span>
          <h2>Hvor skal du?</h2>
        </div>
        <p className="section-sub">
          Fra tempelbyen Bangkok til øyparadiset Krabi — vi har opplevelser i hele
          Thailand.
        </p>
      </div>
      <div className="dest-grid">
        {destinations.map((d) => (
          <button className="dest" key={d.name} onClick={onBrowse}>
            <span className="dest-emoji" aria-hidden="true">
              {d.emoji}
            </span>
            <span className="dest-name">{d.name}</span>
            <span className="dest-count">{d.count} opplevelser</span>
          </button>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="section testi">
      <div className="section-head center">
        <span className="kicker">Fra reisende</span>
        <h2>Nordmenn elsker Sawadee Tours</h2>
      </div>
      <div className="testi-grid">
        {testimonials.map((t) => (
          <figure className="testi-card" key={t.name}>
            <div className="stars" aria-hidden="true">
              ★★★★★
            </div>
            <blockquote>“{t.text}”</blockquote>
            <figcaption>
              <strong>
                {t.name}, {t.city}
              </strong>
              <span>{t.exp}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function CtaBanner({ onBrowse }) {
  return (
    <section className="cta">
      <div className="cta-inner">
        <h2>Klar for eventyret?</h2>
        <p>
          Book din neste Thailand-opplevelse i dag — trygt, på norsk, og til beste
          pris.
        </p>
        <button className="btn btn-gold btn-lg" onClick={onBrowse}>
          Utforsk alle opplevelser
        </button>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>
            Kuraterte Thailand-opplevelser for norske reisende. Book på norsk, betal
            i kroner, reis trygt.
          </p>
          <p className="footer-note">🇹🇭 Basert i Thailand · 🇳🇴 Norsk drevet</p>
        </div>
        <div className="footer-col">
          <h4>Opplevelser</h4>
          <a href="#opplevelser">Elefantparker</a>
          <a href="#opplevelser">Øyturer</a>
          <a href="#opplevelser">Matkurs</a>
          <a href="#opplevelser">Adrenalin</a>
        </div>
        <div className="footer-col">
          <h4>Reisemål</h4>
          <a href="#reisemal">Bangkok</a>
          <a href="#reisemal">Phuket</a>
          <a href="#reisemal">Chiang Mai</a>
          <a href="#reisemal">Krabi</a>
        </div>
        <div className="footer-col">
          <h4>Kontakt</h4>
          <a href="mailto:hei@sawadeetours.no">hei@sawadeetours.no</a>
          <a href="#hvorfor">Om oss</a>
          <a href="#slik">Slik funker det</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {2026} Sawadee Tours. Alle rettigheter reservert.</span>
        <span className="footer-mvp">Demo · MVP</span>
      </div>
    </footer>
  );
}

function BookingModal({ exp, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', date: '', people: 2 });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!exp) return null;

  const total = exp.priceNOK * Number(form.people || 1);

  const submit = (e) => {
    e.preventDefault();
    // MVP: hvis opplevelsen har en booking-/affiliate-lenke, send brukeren dit.
    if (exp.bookingUrl) {
      window.open(exp.bookingUrl, '_blank', 'noopener');
      return;
    }
    // Ellers registrer forespørselen (koble til e-post/CRM/Stripe senere).
    setSent(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Bestill ${exp.title}`}
      >
        <button className="modal-close" onClick={onClose} aria-label="Lukk">
          ✕
        </button>
        <div className="modal-media" style={{ background: exp.gradient }}>
          <span aria-hidden="true">{exp.emoji}</span>
        </div>

        {sent ? (
          <div className="modal-body modal-success">
            <div className="success-check" aria-hidden="true">
              ✓
            </div>
            <h3>Takk, {form.name.split(' ')[0] || 'reisende'}!</h3>
            <p>
              Vi har mottatt forespørselen din om <strong>{exp.title}</strong>. Du
              får en bekreftelse på <strong>{form.email}</strong> med betaling og
              ledige datoer — vanligvis innen én time.
            </p>
            <button className="btn btn-primary btn-block" onClick={onClose}>
              Lukk
            </button>
          </div>
        ) : (
          <div className="modal-body">
            <span className="card-cat">{exp.category}</span>
            <h3>{exp.title}</h3>
            <p className="modal-place">
              📍 {exp.place} · {exp.duration} · ★ {exp.rating}
            </p>

            <form onSubmit={submit} className="modal-form">
              <label>
                Navn
                <input
                  required
                  type="text"
                  placeholder="Ola Nordmann"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </label>
              <label>
                E-post
                <input
                  required
                  type="email"
                  placeholder="ola@epost.no"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <div className="modal-form-row">
                <label>
                  Dato
                  <input
                    required
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </label>
                <label>
                  Antall
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={form.people}
                    onChange={(e) => setForm({ ...form, people: e.target.value })}
                  />
                </label>
              </div>

              <div className="modal-total">
                <span>Totalt ({form.people || 1} pers.)</span>
                <strong>{nok(total)}</strong>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                Send bestilling
              </button>
              <p className="modal-fineprint">
                🔒 Uforpliktende forespørsel · Gratis avbestilling · Betal først når
                turen er bekreftet
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [selected, setSelected] = useState(null);
  const browse = () =>
    document
      .getElementById('opplevelser')
      ?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <Nav />
      <main>
        <Hero onBrowse={browse} />
        <StatsBar />
        <Experiences onBook={setSelected} />
        <WhyUs />
        <Destinations onBrowse={browse} />
        <HowItWorks />
        <Testimonials />
        <CtaBanner onBrowse={browse} />
      </main>
      <Footer />
      <BookingModal exp={selected} onClose={() => setSelected(null)} />
    </>
  );
}
