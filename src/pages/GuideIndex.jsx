import { Link } from 'react-router-dom';
import { guides } from '../content/guides.js';
import { destinations } from '../content/destinations.js';
import { Scene, Icon } from '../scenes.jsx';
import Newsletter from '../components/Newsletter.jsx';

export function DestinationIndex() {
  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Reisemål</span>
          <h1>Hvor i Thailand skal du?</h1>
          <p>
            Seks reisemål, forklart på norsk: hva som er verdt tiden, når du bør
            reise, og hva du trygt kan hoppe over.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="destpage-grid">
          {destinations.map((d) => (
            <Link className="destbig" key={d.slug} to={`/reisemal/${d.slug}`}>
              <span className="destbig-media">
                <Scene name={d.scene} uid={`di-${d.slug}`} image={d.image} alt={d.name} />
              </span>
              <span className="destbig-body">
                <span className="destbig-region">{d.region}</span>
                <span className="destbig-name">{d.name}</span>
                <span className="destbig-tag">{d.tagline}</span>
                <span className="destbig-more">
                  Les guiden <Icon.arrow width={16} height={16} />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="guide-news"><Newsletter compact /></div>
      </section>
    </>
  );
}

export default function GuideIndex() {
  const topics = [...new Set(guides.map((g) => g.topic))];
  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Guider</span>
          <h1>Alt du bør vite før du reiser</h1>
          <p>
            Ærlige guider skrevet på norsk, med kjennskap til Thailand fra to
            sider. Ingen listicles, ingen fyllstoff — bare det du faktisk
            trenger for å planlegge turen.
          </p>
        </div>
      </header>

      <section className="section">
        <div className="chiprow chiprow--topics">
          {topics.map((t) => <span className="chip chip--static" key={t}>{t}</span>)}
        </div>

        <div className="guidelist guidelist--grid">
          {guides.map((g) => (
            <Link className="guidecard" key={g.slug} to={`/guider/${g.slug}`}>
              <span className="guidecard-topic">{g.topic}</span>
              <h2>{g.title}</h2>
              <p>{g.excerpt}</p>
              <span className="guidecard-foot">
                <span><Icon.clock width={14} height={14} /> {g.readMinutes} min</span>
                <span className="guidecard-more">
                  Les guiden <Icon.arrow width={16} height={16} />
                </span>
              </span>
            </Link>
          ))}
        </div>

        <div className="guide-news"><Newsletter compact /></div>
      </section>
    </>
  );
}
