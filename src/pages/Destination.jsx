import { Link, useParams } from 'react-router-dom';
import { getDestination, destinations } from '../content/destinations.js';
import { guides } from '../content/guides.js';
import { allExperiences } from '../data.js';
import { Scene, Icon } from '../scenes.jsx';
import ExperienceCard from '../components/ExperienceCard.jsx';
import Accordion from '../components/Accordion.jsx';
import NotFound from './NotFound.jsx';
import { site } from '../config.js';

export default function Destination() {
  const { slug } = useParams();
  const d = getDestination(slug);
  if (!d) return <NotFound />;

  const experiences = allExperiences.filter((e) => e.place === d.name);
  const relatedGuides = guides.filter((g) => g.related.destinations.includes(d.slug));
  const others = destinations.filter((x) => x.slug !== d.slug);

  return (
    <>
      <div className="detail-hero">
        <div className="detail-hero-copy">
          <nav className="crumbs" aria-label="Brødsmuler">
            <Link to="/">Hjem</Link>
            <span aria-hidden="true">/</span>
            <Link to="/reisemal">Reisemål</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{d.name}</span>
          </nav>
          <span className="detail-cat">{d.region}</span>
          <h1>Ting å gjøre i {d.name}</h1>
          <p className="detail-tagline">{d.tagline}</p>
          <div className="detail-facts">
            {experiences.length > 0 && (
              <span><Icon.ticket width={16} height={16} /> {experiences.length} opplevelser</span>
            )}
            <span><Icon.calendar width={16} height={16} /> Best: {d.bestTime.summary.split('—')[0].trim()}</span>
          </div>
        </div>
        <div className="detail-hero-art" aria-hidden="true">
          <Scene name={d.scene} uid={`dest-hero-${d.slug}`} image={d.image} alt={d.name} />
        </div>
      </div>

      <div className="dest-wrap">
        <article className="dest-main">
          <section className="prose">
            {d.intro.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </section>

          <section className="dest-block">
            <h2>Dette bør du få med deg</h2>
            <ol className="ranklist">
              {d.highlights.map((h, i) => (
                <li key={h.t}>
                  <span className="ranklist-n">{i + 1}</span>
                  <div>
                    <h3>{h.t}</h3>
                    <p>{h.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="dest-block">
            <h2>Våre opplevelser i {d.name}</h2>
            {experiences.length > 0 ? (
              <div className="grid grid--2">
                {experiences.map((e) => <ExperienceCard key={e.id} exp={e} />)}
              </div>
            ) : (
              <div className="dest-empty">
                <p>
                  Vi har ikke turer i {d.name} i utvalget ennå. Vi tar bare inn
                  opplevelser vi selv har sjekket, og det tar tid — heller for få
                  enn noen vi ikke står inne for.
                </p>
                <p>
                  Si fra hva du leter etter, så finner vi det. Eller se hva vi har
                  i resten av landet.
                </p>
                <div className="dest-empty-row">
                  <Link className="btn btn-primary" to="/opplevelser">
                    Se alle opplevelser
                  </Link>
                  <a className="btn btn-outline" href={`mailto:${site.email}?subject=${encodeURIComponent(`Turer i ${d.name}`)}`}>
                    Spør oss om {d.name}
                  </a>
                </div>
              </div>
            )}
          </section>

          <section className="dest-block">
            <h2>Når bør du reise?</h2>
            <p className="lead-line">{d.bestTime.summary}</p>
            <p>{d.bestTime.detail}</p>
          </section>

          <section className="dest-block">
            <h2>Slik kommer du deg rundt</h2>
            <ul className="ticklist">
              {d.gettingAround.map((g) => (
                <li key={g}><Icon.compass width={18} height={18} /> {g}</li>
              ))}
            </ul>
          </section>

          <section className="dest-block">
            <h2>Godt å vite</h2>
            <dl className="deflist deflist--compact">
              {d.practical.map((p) => (
                <div key={p.k}>
                  <dt>{p.k}</dt>
                  <dd>{p.v}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="dest-block">
            <h2>Spørsmål om {d.name}</h2>
            <Accordion items={d.faq} defaultOpen={-1} />
          </section>

          {relatedGuides.length > 0 && (
            <section className="dest-block">
              <h2>Guider som hjelper deg videre</h2>
              <div className="guidelist">
                {relatedGuides.map((g) => (
                  <Link className="guidecard guidecard--row" key={g.slug} to={`/guider/${g.slug}`}>
                    <span className="guidecard-topic">{g.topic}</span>
                    <h3>{g.title}</h3>
                    <p>{g.excerpt}</p>
                    <span className="guidecard-more">Les guiden <Icon.arrow width={16} height={16} /></span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="dest-side">
          <div className="sidecard">
            <h2>Andre reisemål</h2>
            <ul className="sidelist">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link to={`/reisemal/${o.slug}`}>
                    <strong>{o.name}</strong>
                    <span>{o.tagline}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidecard sidecard--cta">
            <h2>Klar for å booke?</h2>
            <p>Se alle opplevelsene våre i {d.name} — priser i kroner, gratis avbestilling.</p>
            <Link className="btn btn-gold btn-block" to={`/opplevelser?sted=${encodeURIComponent(d.name)}`}>
              Se opplevelser
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
