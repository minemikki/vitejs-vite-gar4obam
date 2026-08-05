import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getExperience, allExperiences } from '../data.js';
import { Scene, Icon } from '../scenes.jsx';
import ExperienceCard from '../components/ExperienceCard.jsx';
import { nok, num, todayISO } from '../lib/format.js';
import TripButton from '../components/TripButton.jsx';
import { track } from '../lib/analytics.js';
import { read, write, KEYS } from '../lib/storage.js';
import NotFound from './NotFound.jsx';

/*
 * Bestillingsboks for turer vi selger gjennom en partner.
 *
 * Vi tar ikke imot dato og antall her, for vi behandler ikke bestillingen —
 * det gjør partneren. Å samle inn opplysninger vi likevel kaster, og så
 * sende kunden til et skjema hun må fylle ut på nytt, er bare irriterende.
 *
 * Lenken er merket `rel="sponsored"` fordi Google krever det av betalte
 * lenker, og vi sier rett ut at vi får provisjon. Markedsføringsloven
 * krever at kommersielle forbindelser er tydelige — og en kunde som
 * oppdager det selv, stoler mindre på resten av siden.
 */
function PartnerBox({ exp }) {
  return (
    <aside className="bookbox" aria-label="Bestilling">
      <div className="bookbox-price">
        <span className="bookbox-from">Fra</span>
        <strong>{nok(exp.priceNOK)}</strong>
        <span>per person</span>
      </div>

      <a
        className="btn btn-gold btn-block btn-lg"
        href={exp.bookingUrl}
        target="_blank"
        rel="sponsored noopener noreferrer"
        onClick={() => track('partner_click', { id: exp.id, partner: exp.partner })}
      >
        Sjekk ledige datoer <Icon.arrow width={18} height={18} />
      </a>

      <p className="bookbox-partner">
        Bestillingen fullføres hos {exp.partner}, som står for betaling,
        bekreftelse og avbestilling. Vi får provisjon hvis du booker — det
        koster deg ingenting ekstra.
      </p>

      <TripButton exp={exp} variant="block" />

      <ul className="bookbox-perks">
        <li><Icon.check width={16} height={16} /> Gratis avbestilling på de fleste turer</li>
        <li><Icon.check width={16} height={16} /> Bekreftelse umiddelbart</li>
        <li><Icon.check width={16} height={16} /> Norsk kundeservice fra oss</li>
      </ul>
    </aside>
  );
}

function BookingBox({ exp }) {
  const navigate = useNavigate();
  const [date, setDate] = useState('');
  const [people, setPeople] = useState(2);
  const total = exp.priceNOK * Math.max(1, Number(people) || 1);

  const submit = (e) => {
    e.preventDefault();
    track('begin_checkout', { id: exp.id, title: exp.title, value: total });
    const p = new URLSearchParams({ dato: date, antall: String(people) });
    navigate(`/bestill/${exp.slug}?${p}`);
  };

  return (
    <aside className="bookbox" aria-label="Bestilling">
      <div className="bookbox-price">
        {exp.oldPriceNOK && <s>{nok(exp.oldPriceNOK)}</s>}
        <strong>{nok(exp.priceNOK)}</strong>
        <span>per person</span>
      </div>

      <form onSubmit={submit} className="bookbox-form">
        <label>
          <span><Icon.calendar width={15} height={15} /> Dato</span>
          <input
            type="date"
            required
            min={todayISO()}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          <span><Icon.users width={15} height={15} /> Antall reisende</span>
          <input
            type="number"
            min="1"
            max="20"
            required
            value={people}
            onChange={(e) => setPeople(e.target.value)}
          />
        </label>

        <div className="bookbox-total">
          <span>Totalt</span>
          <strong>{nok(total)}</strong>
        </div>

        <button className="btn btn-gold btn-block btn-lg" type="submit">
          Fortsett til bestilling
        </button>
      </form>

      <TripButton exp={exp} variant="block" />

      <ul className="bookbox-perks">
        <li><Icon.check width={16} height={16} /> Gratis avbestilling inntil 24 t før</li>
        <li><Icon.check width={16} height={16} /> Bekreftelse på e-post umiddelbart</li>
        <li><Icon.check width={16} height={16} /> Norsk kundeservice</li>
      </ul>
    </aside>
  );
}

export default function ExperienceDetail() {
  const { slug } = useParams();
  const exp = getExperience(slug);

  // Registrer visningen for «nylig sett» og for statistikk.
  useEffect(() => {
    if (!exp) return;
    track('view_experience', { id: exp.id, title: exp.title, place: exp.place });
    const prev = read(KEYS.recentlyViewed, []).filter((id) => id !== exp.id);
    write(KEYS.recentlyViewed, [exp.id, ...prev].slice(0, 8));
  }, [exp]);

  if (!exp) return <NotFound />;

  const related = allExperiences
    .filter((e) => e.id !== exp.id && (e.place === exp.place || e.category === exp.category))
    .slice(0, 3);

  return (
    <>
      <div className="detail-hero">
        <div className="detail-hero-copy">
          <nav className="crumbs" aria-label="Brødsmuler">
            <Link to="/">Hjem</Link>
            <span aria-hidden="true">/</span>
            <Link to="/opplevelser">Opplevelser</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{exp.title}</span>
          </nav>
          <span className="detail-cat">{exp.category}</span>
          <h1>{exp.title}</h1>
          <div className="detail-facts">
            <span><Icon.pin width={16} height={16} /> {exp.place}</span>
            <span><Icon.clock width={16} height={16} /> {exp.duration}</span>
            {exp.rating ? (
              <span className="detail-rating">
                <Icon.star width={16} height={16} /> {num(exp.rating)}
                {exp.reviews ? (
                  <em>
                    ({exp.reviews} anmeldelser{exp.partner ? ` hos ${exp.partner}` : ''})
                  </em>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
        <div className="detail-hero-art" aria-hidden="true">
          <Scene name={exp.scene} uid={`hero-${exp.id}`} image={exp.image} alt={exp.title} />
        </div>
      </div>

      <div className="detail-wrap">
        <div className="detail-main">
          <section className="detail-block">
            <h2>Om opplevelsen</h2>
            <p className="detail-lead">{exp.blurb}</p>
            <div className="tagrow">
              {exp.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
            </div>
          </section>

          {exp.highlights.length > 0 && (
            <section className="detail-block">
              <h2>Høydepunkter</h2>
              <ul className="ticklist">
                {exp.highlights.map((h) => (
                  <li key={h}><Icon.check width={18} height={18} /> {h}</li>
                ))}
              </ul>
            </section>
          )}

          <section className="detail-block">
            <h2>Hva er inkludert?</h2>
            <div className="inc-grid">
              <div>
                <h3 className="inc-h inc-h--yes">Inkludert</h3>
                <ul className="ticklist">
                  {exp.included.map((i) => (
                    <li key={i}><Icon.check width={18} height={18} /> {i}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="inc-h inc-h--no">Ikke inkludert</h3>
                <ul className="ticklist ticklist--no">
                  {exp.excluded.map((i) => (
                    <li key={i}><Icon.x width={18} height={18} /> {i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="detail-block">
            <h2>Praktisk informasjon</h2>
            <dl className="deflist">
              <div>
                <dt><Icon.pin width={16} height={16} /> Oppmøte</dt>
                <dd>{exp.meeting}</dd>
              </div>
              <div>
                <dt><Icon.users width={16} height={16} /> Gruppestørrelse</dt>
                <dd>{exp.groupSize}</dd>
              </div>
              <div>
                <dt><Icon.chat width={16} height={16} /> Språk</dt>
                <dd>{exp.languages.join(', ')}</dd>
              </div>
              <div>
                <dt><Icon.shield width={16} height={16} /> Avbestilling</dt>
                <dd>{exp.cancellation}</dd>
              </div>
            </dl>
          </section>
        </div>

        {exp.bookingUrl ? <PartnerBox exp={exp} /> : <BookingBox exp={exp} />}
      </div>

      {related.length > 0 && (
        <section className="section">
          <div className="section-head">
            <div>
              <span className="kicker">Du liker kanskje også</span>
              <h2>Lignende opplevelser</h2>
            </div>
          </div>
          <div className="grid">
            {related.map((e) => <ExperienceCard key={e.id} exp={e} />)}
          </div>
        </section>
      )}
    </>
  );
}
