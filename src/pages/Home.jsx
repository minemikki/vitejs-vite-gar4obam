import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { allExperiences, categories, destinations, testimonials } from '../data.js';
import { Scene, HeroScene, Icon } from '../scenes.jsx';
import ExperienceCard from '../components/ExperienceCard.jsx';

function Hero() {
  const navigate = useNavigate();
  const [sted, setSted] = useState('Alle');
  const [kategori, setKategori] = useState('Alle');

  const search = (e) => {
    e.preventDefault();
    const p = new URLSearchParams();
    if (sted !== 'Alle') p.set('sted', sted);
    if (kategori !== 'Alle') p.set('kategori', kategori);
    navigate(`/opplevelser${p.toString() ? `?${p}` : ''}`);
  };

  return (
    <section className="hero">
      <div className="hero-scene-wrap" aria-hidden="true">
        <HeroScene />
        <div className="hero-scrim" />
      </div>

      <div className="hero-inner">
        <span className="hero-eyebrow">Kuraterte opplevelser i Thailand</span>
        <h1 className="hero-title">
          Opplev det ekte Thailand.
          <span className="hero-title-accent"> Booket på norsk.</span>
        </h1>
        <p className="hero-lead">
          Håndplukkede turer, elefantparker og øyeventyr — med norsk kundeservice,
          priser i kroner og gratis avbestilling.
        </p>

        <form className="searchbar" onSubmit={search} role="search">
          <label className="searchbar-field">
            <span>Reisemål</span>
            <select value={sted} onChange={(e) => setSted(e.target.value)}>
              <option>Alle</option>
              {destinations.map((d) => <option key={d.name}>{d.name}</option>)}
            </select>
          </label>
          <span className="searchbar-div" />
          <label className="searchbar-field">
            <span>Type opplevelse</span>
            <select value={kategori} onChange={(e) => setKategori(e.target.value)}>
              {categories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </label>
          <button className="btn btn-gold searchbar-btn" type="submit">
            <Icon.search width={18} height={18} /> Søk
          </button>
        </form>

        <div className="hero-trust">
          <span className="hero-stars" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => <Icon.star key={i} width={16} height={16} />)}
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
    { n: `${allExperiences.length}`, l: 'Opplevelser' },
    { n: `${destinations.length}`, l: 'Reisemål' },
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

function Featured() {
  const featured = allExperiences.slice(0, 6);
  return (
    <section className="section">
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
      <div className="grid">
        {featured.map((e) => <ExperienceCard key={e.id} exp={e} />)}
      </div>
      <div className="section-more">
        <Link to="/opplevelser" className="btn btn-outline btn-lg">
          Se alle {allExperiences.length} opplevelser <Icon.arrow width={18} height={18} />
        </Link>
      </div>
    </section>
  );
}

function WhyUs() {
  const items = [
    { icon: 'chat', t: 'Alt på norsk', d: 'Kundeservice, bekreftelser og guider på morsmålet. Betal trygt i kroner.' },
    { icon: 'tag', t: 'Beste pris-garanti', d: 'Finner du samme tur billigere? Vi matcher prisen. Ingen skjulte gebyrer.' },
    { icon: 'compass', t: 'Ekte lokalkunnskap', d: 'Vi bor i Thailand og velger kun turer vi selv ville tatt familien på.' },
    { icon: 'shield', t: 'Trygt og fleksibelt', d: 'Gratis avbestilling på de fleste turer, og støtte hele veien.' },
  ];
  return (
    <section className="section why">
      <div className="section-head center">
        <span className="kicker">Hvorfor oss</span>
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

function Destinations() {
  return (
    <section className="section">
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
          <Link
            className="dest"
            key={d.name}
            to={`/opplevelser?sted=${encodeURIComponent(d.name)}`}
          >
            <span className="dest-media">
              <Scene name={d.scene} uid={`dest-${d.name}`} />
            </span>
            <span className="dest-body">
              <span className="dest-name">{d.name}</span>
              <span className="dest-count">{d.count} opplevelser</span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { t: 'Velg opplevelse', d: 'Bla gjennom kuraterte turer og finn den som passer reisen din.' },
    { t: 'Book på to minutter', d: 'Velg dato og antall. Du får bekreftelse på e-post med en gang.' },
    { t: 'Møt opp og nyt', d: 'Ta med bekreftelsen. Mange turer har henting rett på hotellet.' },
  ];
  return (
    <section className="section how">
      <div className="section-head center">
        <span className="kicker">Slik funker det</span>
        <h2>Fra idé til opplevelse på minutter</h2>
      </div>
      <ol className="how-grid">
        {steps.map((s, i) => (
          <li className="how-step" key={s.t}>
            <div className="how-num">{i + 1}</div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
            {i < steps.length - 1 && <span className="how-line" aria-hidden="true" />}
          </li>
        ))}
      </ol>
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
              {[0, 1, 2, 3, 4].map((i) => <Icon.star key={i} width={16} height={16} />)}
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
      <p className="testi-note">
        Anmeldelsene over er eksempler mens vi samler inn ekte omtaler fra våre
        første kunder.
      </p>
    </section>
  );
}

function Cta() {
  return (
    <section className="cta">
      <div className="cta-inner">
        <div className="cta-scene" aria-hidden="true"><HeroScene /></div>
        <div className="cta-content">
          <h2>Klar for eventyret?</h2>
          <p>Book din neste Thailand-opplevelse i dag — trygt, på norsk, til beste pris.</p>
          <Link to="/opplevelser" className="btn btn-gold btn-lg">
            Utforsk alle opplevelser <Icon.arrow width={18} height={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Featured />
      <WhyUs />
      <Destinations />
      <HowItWorks />
      <Testimonials />
      <Cta />
    </>
  );
}
