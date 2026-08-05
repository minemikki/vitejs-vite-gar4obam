import { Link } from 'react-router-dom';
import { Scene, Icon } from '../scenes.jsx';
import { nok, num } from '../lib/format.js';
import TripButton from './TripButton.jsx';

export default function ExperienceCard({ exp, saved, onSave }) {
  const href = `/opplevelser/${exp.slug}`;
  return (
    <article className="card">
      <Link to={href} className="card-media" aria-label={exp.title}>
        <Scene name={exp.scene} uid={exp.id} image={exp.image} alt={exp.title} />
        {exp.bestseller && <span className="card-badge">Bestselger</span>}
        <span className="card-duration">
          <Icon.clock width={13} height={13} /> {exp.duration}
        </span>
      </Link>

      {onSave && (
        <button
          className={`card-save ${saved ? 'is-saved' : ''}`}
          onClick={() => onSave(exp.id)}
          aria-label={saved ? `Fjern ${exp.title} fra ønskeliste` : `Lagre ${exp.title} i ønskeliste`}
          aria-pressed={saved}
        >
          <Icon.heart width={19} height={19} />
        </button>
      )}

      <div className="card-body">
        <div className="card-head">
          <span className="card-cat">{exp.category}</span>
          <span className="card-rating">
            <Icon.star width={14} height={14} /> {num(exp.rating)}
            <span className="card-reviews">({exp.reviews})</span>
          </span>
        </div>

        <h3 className="card-title">
          <Link to={href}>{exp.title}</Link>
        </h3>
        <p className="card-place">
          <Icon.pin width={14} height={14} /> {exp.place}
        </p>
        <p className="card-blurb">{exp.blurb}</p>

        <div className="card-tags">
          {exp.tags.map((t) => (
            <span className="tag" key={t}>{t}</span>
          ))}
        </div>

        <TripButton exp={exp} variant="card" />

        <div className="card-foot">
          <div className="card-price">
            <span className="card-price-label">
              Fra{exp.oldPriceNOK ? ' · tilbud' : ''}
            </span>
            <span className="card-price-row">
              {exp.oldPriceNOK && <s>{nok(exp.oldPriceNOK)}</s>}
              <strong>{nok(exp.priceNOK)}</strong>
            </span>
          </div>
          <Link to={href} className="btn btn-primary">
            Se detaljer
          </Link>
        </div>
      </div>
    </article>
  );
}
