import { useMemo, useState, useEffect } from 'react';
import './App.css';
import { experiences, categories, destinations, testimonials } from './data.js';
import { Scene, HeroScene, Icon, LogoMark } from './scenes.jsx';

const nok = (n) => n.toLocaleString('nb-NO') + ' kr';

function Logo({ light }) {
  return (
    <a href="#top" className={`logo ${light ? 'logo--light' : ''}`} aria-label="Sawadee Tours">
      <LogoMark />
      <span className="logo-text">
        Sawadee<span className="logo-text-accent">Tours</span>
      </span>
    </a>
  );
}

function Nav({ onBook }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <header className={`nav ${solid ? 'is-solid' : ''}`}>
      <div className="nav-inner">
        <Logo />
        <nav className={`nav-links ${open ? 'is-open' : ''}`}>
          <a href="#opplevelser" onClick={() => setOpen(false)}>Opplevelser</a>
          <a href="#reisemal" onClick={() => setOpen(false)}>Reisemål</a>
          <a href="#hvorfor" onClick={() => setOpen(false)}>Hvorfor oss</a>
          <a href="#slik" onClick={() => setOpen(false)}>Slik funker det</a>
        </nav>
        <div className="nav-right">
          <span className="nav-nok">NOK</span>
          <button className="btn btn-primary btn-sm" onClick={onBook}>Book nå</button>
          <button
            className="nav-burger"
            aria-label="Åpne meny"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ activeCategory, setCategory, onSearch }) {
  const [dest, setDest] = useState('Alle');
  return (
    <section className="hero" id="top">
      <div className="hero-scene-wrap" aria-hidden="true">
        <HeroScene />
        <div className="hero-scrim" />
      </div>
      <div className="hero-inner">
        <span className="hero-eyebrow">Kuraterte opplevelser i Thailand</span>
        <h1 className="hero-title">
          Opplev det ekte Thailand.<br />
          <span className="hero-title-accent">Booket på norsk.</span>
        </h1>
        <p className="hero-lead">
          Håndplukkede turer, elefantparker og øyeventyr — med norsk kundeservice,
          priser i kroner og gratis avbestilling.
        </p>

        <div className="searchbar" role="search">
          <label className="searchbar-field">
            <span>Reisemål</span>
            <select value={dest} onChange={(e) => setDest(e.target.value)}>
              <option>Alle</option>
              {destinations.map((d) => (<option key={d.name}>{d.name}</option>))}
            </select>
          </label>
          <span className="searchbar-div" />
          <label className="searchbar-field">
            <span>Type opplevelse</span>
            <select value={activeCategory} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => (<option key={c}>{c}</option>))}
            </select>
          </label>
          <button className="btn btn-accent searchbar-btn" onClick={onSearch}>
            <Icon.search width={18} height={18} /> Søk
          </button>
        </div>

        <div className="hero-trust">
          <span className="hero-stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (<Icon.star key={i} width={16} height={16} />))}
          </span>
          <span><strong>4,8</strong> · 12&nbsp;000+ fornøyde reisende</span>
          <span className="hero-trust-div" />
          <span><Icon.shield width={16} height={16} /> Trygg betaling</span>
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { n: '60+', l: 'Opplevelser' },
    { n: '8', l: 'Reisemål' },
    { n: '4,8★', l: 'Snittvurdering' },
    { n: '100%', l: 'Norsk support' },
  ];
  return (
    <div className="stats-wrap">
      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.l}>
            <div className="stat-n">{s.n}</div>
            <div className="stat-l">{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ exp, onBook, saved, onSave }) {
  return (
    <article className="card">
      <div className="card-media">
        <Scene name={exp.scene} uid={exp.id} />
        {exp.bestseller && <span className="card-badge">Bestselger</span>}
        <button
          className={`card-save ${saved ? 'is-saved' : ''}`}
          onClick={() => onSave(exp.id)}
          aria-label={saved ? 'Fjern fra ønskeliste' : 'Lagre i ønskeliste'}
          aria-pressed={saved}
        >
          <Icon.heart width={19} height={19} />
        </button>
        <span className="card-duration"><Icon.clock width={13} height={13} /> {exp.duration}</span>
      </div>
      <div className="card-body">
        <div className="card-head">
          <span className="card-cat">{exp.category}</span>
          <span className="card-rating">
            <Icon.star width={14} height={14} /> {exp.rating.toLocaleString('nb-NO')}
            <span className="card-reviews">({exp.reviews})</span>
          </span>
        </div>
        <h3 className="card-title">{exp.title}</h3>
        <p className="card-place"><Icon.pin width={14} height={14} /> {exp.place}</p>
        <p className="card-blurb">{exp.blurb}</p>
        <div className="card-tags">
          {exp.tags.map((t) => (<span className="tag" key={t}>{t}</span>))}
        </div>
        <div className="card-foot">
          <div className="card-price">
            <span className="card-price-label">Fra{exp.oldPriceNOK ? ' · tilbud' : ''}</span>
            <span className="card-price-row">
              {exp.oldPriceNOK && <s>{nok(exp.oldPriceNOK)}</s>}
              <strong>{nok(exp.priceNOK)}</strong>
            </span>
          </div>
          <button className="btn btn-accent" onClick={() => onBook(exp)}>Bestill</button>
        </div>
      </div>
    </article>
  );
}

function Experiences({ onBook, active, setActive }) {
  const [saved, setSaved] = useState(() => new Set());
  const toggle = (id) =>
    setSaved((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  const list = useMemo(
    () => (active === 'Alle' ? experiences : experiences.filter((e) => e.category === active)),
    [active]
  );
  return (
    <section className="section" id="opplevelser">
      <div className="section-head">
        <div>
          <span className="kicker">Populært akkurat nå</span>
          <h2>Håndplukkede opplevelser</h2>
        </div>
        <p className="section-sub">
          Hver tur er kvalitetssjekket av oss som bor her. Priser i norske kroner —
          ingen skjulte gebyrer.
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
          <Card key={exp.id} exp={exp} onBook={onBook} saved={saved.has(exp.id)} onSave={toggle} />
        ))}
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: 'chat', t: 'Alt på norsk', d: 'Kundeservice, oppskrifter og guider på morsmålet. Betal trygt i kroner.' },
    { icon: 'tag', t: 'Beste pris-garanti', d: 'Finner du samme tur billigere? Vi matcher prisen. Ingen skjulte gebyrer.' },
    { icon: 'compass', t: 'Ekte lokalkunnskap', d: 'Vi bor i Thailand og velger kun turer vi selv ville tatt familien på.' },
    { icon: 'shield', t: 'Trygt og fleksibelt', d: 'Gratis avbestilling på de fleste turer, og støtte hele veien.' },
  ];
  return (
    <section className="section why" id="hvorfor">
      <div className="section-head center">
        <span className="kicker">Hvorfor Sawadee Tours</span>
        <h2>Norsk trygghet møter thailandsk lokalkunnskap</h2>
      </div>
      <div className="why-grid">
        {items.map((i) => {
          const I = Icon[i.icon];
          return (
            <div className="why-card" key={i.t}>
              <span className="why-icon"><I width={26} height={26} /></span>
              <h3>{i.t}</h3>
              <p>{i.d}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Destinations({ onPick }) {
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
          <button className="dest" key={d.name} onClick={onPick}>
            <span className="dest-media"><Scene name={d.scene} uid={`dest-${d.name}`} /></span>
            <span className="dest-body">
              <span className="dest-name">{d.name}</span>
              <span className="dest-count">{d.count} opplevelser</span>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { t: 'Velg opplevelse', d: 'Bla gjennom kuraterte turer og finn den som passer reisen din.' },
    { t: 'Book på 2 minutter', d: 'Velg dato og antall. Betal trygt i kroner med kort eller Vipps.' },
    { t: 'Møt opp og nyt', d: 'Få billetten på e-post umiddelbart. Mange turer har henting på hotellet.' },
  ];
  return (
    <section className="section how" id="slik">
      <div className="section-head center">
        <span className="kicker">Slik funker det</span>
        <h2>Fra idé til opplevelse på minutter</h2>
      </div>
      <div className="how-grid">
        {steps.map((s, i) => (
          <div className="how-step" key={s.t}>
            <div className="how-num">{i + 1}</div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
            {i < steps.length - 1 && <span className="how-line" aria-hidden="true" />}
          </div>
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
            <div className="testi-stars" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => (<Icon.star key={i} width={16} height={16} />))}
            </div>
            <blockquote>“{t.text}”</blockquote>
            <figcaption>
              <span className="testi-avatar" aria-hidden="true">{t.initials}</span>
              <span>
                <strong>{t.name}, {t.city}</strong>
                <span className="testi-exp">{t.exp}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Cta({ onBook }) {
  return (
    <section className="cta">
      <div className="cta-inner">
        <div className="cta-scene" aria-hidden="true"><HeroScene /></div>
        <div className="cta-content">
          <h2>Klar for eventyret?</h2>
          <p>Book din neste Thailand-opplevelse i dag — trygt, på norsk, til beste pris.</p>
          <button className="btn btn-accent btn-lg" onClick={onBook}>
            Utforsk alle opplevelser <Icon.arrow width={18} height={18} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo light />
          <p>Kuraterte Thailand-opplevelser for norske reisende. Book på norsk, betal i kroner, reis trygt.</p>
          <p className="footer-note">Basert i Thailand · Norsk drevet</p>
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
        <span>© 2026 Sawadee Tours. Alle rettigheter reservert.</span>
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
    if (exp.bookingUrl) {
      window.open(exp.bookingUrl, '_blank', 'noopener');
      return;
    }
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
        <button className="modal-close" onClick={onClose} aria-label="Lukk">✕</button>
        <div className="modal-media"><Scene name={exp.scene} uid={`modal-${exp.id}`} /></div>
        {sent ? (
          <div className="modal-body modal-success">
            <div className="success-check" aria-hidden="true"><Icon.check width={30} height={30} /></div>
            <h3>Takk, {form.name.split(' ')[0] || 'reisende'}!</h3>
            <p>
              Vi har mottatt forespørselen om <strong>{exp.title}</strong>. Du får en
              bekreftelse på <strong>{form.email}</strong> med betaling og ledige
              datoer — vanligvis innen én time.
            </p>
            <button className="btn btn-accent btn-block btn-lg" onClick={onClose}>Lukk</button>
          </div>
        ) : (
          <div className="modal-body">
            <span className="card-cat">{exp.category}</span>
            <h3>{exp.title}</h3>
            <p className="modal-place">
              <Icon.pin width={15} height={15} /> {exp.place} · {exp.duration} · ★ {exp.rating}
            </p>
            <form onSubmit={submit} className="modal-form">
              <label>Navn
                <input required type="text" placeholder="Ola Nordmann" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </label>
              <label>E-post
                <input required type="email" placeholder="ola@epost.no" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </label>
              <div className="modal-form-row">
                <label>Dato
                  <input required type="date" value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })} />
                </label>
                <label>Antall
                  <input type="number" min="1" max="20" value={form.people}
                    onChange={(e) => setForm({ ...form, people: e.target.value })} />
                </label>
              </div>
              <div className="modal-total">
                <span>Totalt ({form.people || 1} pers.)</span>
                <strong>{nok(total)}</strong>
              </div>
              <button type="submit" className="btn btn-accent btn-block btn-lg">Send bestilling</button>
              <p className="modal-fineprint">
                <Icon.shield width={13} height={13} /> Uforpliktende · Gratis avbestilling ·
                Betal først når turen er bekreftet
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
  const [active, setActive] = useState('Alle');
  const scrollTo = () =>
    document.getElementById('opplevelser')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <>
      <Nav onBook={scrollTo} />
      <main>
        <Hero activeCategory={active} setCategory={setActive} onSearch={scrollTo} />
        <Stats />
        <Experiences onBook={setSelected} active={active} setActive={setActive} />
        <WhyUs />
        <Destinations onPick={scrollTo} />
        <HowItWorks />
        <Testimonials />
        <Cta onBook={scrollTo} />
      </main>
      <Footer />
      <BookingModal exp={selected} onClose={() => setSelected(null)} />
    </>
  );
}
