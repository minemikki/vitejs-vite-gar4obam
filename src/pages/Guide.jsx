import { Link, useParams } from 'react-router-dom';
import { getGuide, guides } from '../content/guides.js';
import { getDestination } from '../content/destinations.js';
import { allExperiences } from '../data.js';
import { Icon } from '../scenes.jsx';
import Accordion from '../components/Accordion.jsx';
import ExperienceCard from '../components/ExperienceCard.jsx';
import NotFound from './NotFound.jsx';

const norwegianDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('nb-NO', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

function Section({ s }) {
  return (
    <section className="guide-section">
      <h2>{s.h}</h2>
      {s.p?.map((t) => <p key={t.slice(0, 24)}>{t}</p>)}

      {s.list && (
        <ul className="ticklist">
          {s.list.map((t) => (
            <li key={t}><Icon.check width={18} height={18} /> {t}</li>
          ))}
        </ul>
      )}

      {s.table && (
        <div className="tablewrap">
          <table className="datatable">
            <thead>
              <tr>{s.table.head.map((h) => <th key={h} scope="col">{h}</th>)}</tr>
            </thead>
            <tbody>
              {s.table.rows.map((r) => (
                <tr key={r.join('|')}>
                  {r.map((c, i) => (i === 0 ? <th key={c} scope="row">{c}</th> : <td key={`${c}-${i}`}>{c}</td>))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function Guide() {
  const { slug } = useParams();
  const g = getGuide(slug);
  if (!g) return <NotFound />;

  const linkedDestinations = g.related.destinations.map(getDestination).filter(Boolean);
  const linkedExperiences = allExperiences
    .filter(
      (e) =>
        g.related.categories.includes(e.category) ||
        linkedDestinations.some((d) => d.name === e.place)
    )
    .slice(0, 3);
  const more = guides.filter((x) => x.slug !== g.slug).slice(0, 3);

  return (
    <>
      <header className="page-head page-head--article">
        <div className="page-head-inner">
          <nav className="crumbs" aria-label="Brødsmuler">
            <Link to="/">Hjem</Link>
            <span aria-hidden="true">/</span>
            <Link to="/guider">Guider</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{g.topic}</span>
          </nav>
          <h1>{g.title}</h1>
          <p className="article-meta">
            <span><Icon.clock width={15} height={15} /> {g.readMinutes} min lesetid</span>
            <span>Oppdatert {norwegianDate(g.published)}</span>
          </p>
        </div>
      </header>

      <div className="guide-wrap">
        <article className="guide-main">
          <p className="guide-excerpt">{g.excerpt}</p>

          <nav className="toc" aria-label="Innhold">
            <h2>I denne guiden</h2>
            <ol>
              {g.sections.map((s, i) => (
                <li key={s.h}><a href={`#del-${i}`}>{s.h}</a></li>
              ))}
            </ol>
          </nav>

          {g.sections.map((s, i) => (
            <div id={`del-${i}`} key={s.h}>
              <Section s={s} />
            </div>
          ))}

          {g.cta && (
            <aside className="guide-cta">
              <h2>{g.cta.h}</h2>
              <p>{g.cta.p}</p>
              <Link className="btn btn-primary" to={g.cta.to}>
                {g.cta.label} <Icon.arrow width={17} height={17} />
              </Link>
            </aside>
          )}

          {g.faq?.length > 0 && (
            <section className="guide-section">
              <h2>Vanlige spørsmål</h2>
              <Accordion items={g.faq} defaultOpen={-1} />
            </section>
          )}

          {linkedDestinations.length > 0 && (
            <section className="guide-section">
              <h2>Les mer om reisemålene</h2>
              <div className="chiprow">
                {linkedDestinations.map((d) => (
                  <Link className="chip chip--link" key={d.slug} to={`/reisemal/${d.slug}`}>
                    {d.name}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        <aside className="guide-side">
          <div className="sidecard">
            <h2>Flere guider</h2>
            <ul className="sidelist">
              {more.map((m) => (
                <li key={m.slug}>
                  <Link to={`/guider/${m.slug}`}>
                    <strong>{m.title}</strong>
                    <span>{m.readMinutes} min lesetid</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {linkedExperiences.length > 0 && (
        <section className="section">
          <div className="section-head">
            <div>
              <span className="kicker">Fra guiden til virkeligheten</span>
              <h2>Opplevelser som passer</h2>
            </div>
          </div>
          <div className="grid">
            {linkedExperiences.map((e) => <ExperienceCard key={e.id} exp={e} />)}
          </div>
        </section>
      )}
    </>
  );
}
