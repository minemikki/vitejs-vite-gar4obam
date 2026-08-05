import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getExperience, allExperiences } from '../data.js';
import { Scene, Icon } from '../scenes.jsx';
import { useAnalyticsConsent, loadPartnerAnalytics } from '../components/CookieBanner.jsx';
import { partners } from '../config.js';
import ExperienceCard from '../components/ExperienceCard.jsx';
import { nok, num, todayISO } from '../lib/format.js';
import TripButton from '../components/TripButton.jsx';
import { track } from '../lib/analytics.js';
import { read, write, KEYS } from '../lib/storage.js';
import NotFound from './NotFound.jsx';

// Bestillingen skjer hos partneren via en ren, merkevaretilpasset knapp som
// lander kunden rett på turens egen side (med vår partner-ID for provisjon).
// GetYourGuide-kalenderen (BookingWidget) finnes fortsatt i koden, men er
// slått av: den lastes i en iframe vi ikke kan style, og «Drevet av / Bli med
// i partnerprogram»-merket + den blå knappen så uprofesjonelt ut ved siden av
// resten av siden. Sett denne til true for å hente kalenderen tilbake.
const USE_GYG_WIDGET = false;

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

/*
 * Bestillingswidget fra GetYourGuide — kalenderen som lar kunden velge dato
 * og booke uten å forlate siden vår.
 *
 * Widgeten er en tredjeparts-innbygging: den laster en iframe fra
 * GetYourGuide og setter informasjonskapsler. Derfor vises den bare etter
 * samtykke. Har brukeren sagt nei, faller vi tilbake til lenken — da kan hen
 * fortsatt booke, bare via omdirigering i stedet for på siden.
 *
 * Markup-en injiseres via en ref i stedet for i JSX, slik at React ikke rører
 * innholdet GetYourGuides skript legger inn. Skriptet oppdager widgeten selv
 * og bytter <div>-en ut med kalenderen.
 */
function gygWidgetHtml(tourId, partnerId) {
  return (
    `<div data-gyg-href="https://widget.getyourguide.com/default/availability.frame" ` +
    `data-gyg-tour-id="${tourId}" data-gyg-locale-code="no-NO" data-gyg-currency="NOK" ` +
    `data-gyg-widget="availability" data-gyg-variant="vertical" ` +
    `data-gyg-partner-id="${partnerId}">` +
    `<span>Bestilling levert av GetYourGuide</span></div>`
  );
}

function BookingWidget({ exp }) {
  const consented = useAnalyticsConsent();
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    if (!consented || !el || el.dataset.mounted) return;
    el.dataset.mounted = '1';
    el.innerHTML = gygWidgetHtml(exp.gygTourId, partners.gygPartnerId);
    loadPartnerAnalytics();
  }, [consented, exp.gygTourId]);

  return (
    <aside className="bookbox bookbox--widget" aria-label="Bestilling">
      {consented ? (
        <>
          <div className="bookbox-head">
            <h3 className="bookbox-title">Book denne turen</h3>
            <p className="bookbox-sub">
              Velg dato og antall reisende — du får bekreftelse med en gang.
            </p>
          </div>
          <div className="gyg-widget" ref={host} />
        </>
      ) : (
        <>
          <div className="bookbox-price">
            <span className="bookbox-from">Fra</span>
            <strong>{nok(exp.priceNOK)}</strong>
            <span>per person</span>
          </div>
          <div className="bookbox-consent">
            <a
              className="btn btn-gold btn-block btn-lg"
              href={exp.bookingUrl}
              target="_blank"
              rel="sponsored noopener noreferrer"
              onClick={() => track('partner_click', { id: exp.id, partner: exp.partner })}
            >
              Sjekk ledige datoer <Icon.arrow width={18} height={18} />
            </a>
            <p className="bookbox-consent-note">
              Vil du velge dato og booke direkte her på siden?{' '}
              <button
                type="button"
                className="linklike"
                onClick={() => window.dispatchEvent(new Event('st-open-consent'))}
              >
                Godta informasjonskapsler fra {exp.partner}
              </button>
              , så vises bestillingskalenderen her.
            </p>
          </div>
        </>
      )}

      <p className="bookbox-partner">
        Bestilling og betaling håndteres av {exp.partner}. Vi får provisjon hvis
        du booker — det koster deg ingenting ekstra.
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

/*
 * Bildegalleri for turer som har ekte foto.
 *
 * Stort ledebilde med en rad miniatyrer under. Klikk åpner en lysboks der
 * piltaster og Escape fungerer, og bakgrunnen låses mens den er åpen. Alt
 * har alt-tekst, og lysboksen er en ekte dialog for skjermlesere.
 */
function Gallery({ items, title }) {
  const [active, setActive] = useState(0);
  const [box, setBox] = useState(false);

  const go = useCallback(
    (d) => setActive((i) => (i + d + items.length) % items.length),
    [items.length],
  );

  useEffect(() => {
    if (!box) return undefined;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') setBox(false);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [box, go]);

  return (
    <section className="gallery" aria-label={`Bilder fra ${title}`}>
      <button
        type="button"
        className="gallery-lead"
        onClick={() => setBox(true)}
        aria-label="Åpne bildet i full størrelse"
      >
        <img src={items[active].src} alt={items[active].alt} decoding="async" />
        <span className="gallery-count">
          <Icon.search width={15} height={15} /> {active + 1} / {items.length}
        </span>
      </button>

      <div className="gallery-thumbs" role="tablist" aria-label="Velg bilde">
        {items.map((im, i) => (
          <button
            key={im.src}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`gallery-thumb ${i === active ? 'is-on' : ''}`}
            onClick={() => setActive(i)}
          >
            <img src={im.src} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>

      {box && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={items[active].alt}
          onClick={() => setBox(false)}
        >
          <button className="lightbox-close" aria-label="Lukk" onClick={() => setBox(false)}>
            <Icon.x width={26} height={26} />
          </button>
          <button
            className="lightbox-nav lightbox-prev"
            aria-label="Forrige bilde"
            onClick={(e) => { e.stopPropagation(); go(-1); }}
          >
            <Icon.back width={26} height={26} />
          </button>
          <figure className="lightbox-fig" onClick={(e) => e.stopPropagation()}>
            <img src={items[active].src} alt={items[active].alt} />
            <figcaption>{items[active].alt} · {active + 1} / {items.length}</figcaption>
          </figure>
          <button
            className="lightbox-nav lightbox-next"
            aria-label="Neste bilde"
            onClick={(e) => { e.stopPropagation(); go(1); }}
          >
            <Icon.arrow width={26} height={26} />
          </button>
        </div>
      )}
    </section>
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

      {exp.gallery?.length > 0 && (
        <div className="detail-gallery-wrap">
          <Gallery items={exp.gallery} title={exp.title} />
          {exp.partner && (
            <p className="gallery-credit">Foto: {exp.partner}</p>
          )}
        </div>
      )}

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

          {exp.program?.length > 0 && (
            <section className="detail-block">
              <h2>Slik foregår dagen</h2>
              <ol className="steplist">
                {exp.program.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
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

          {(exp.bring?.length > 0 || exp.notFor?.length > 0) && (
            <section className="detail-block">
              <h2>Verdt å vite</h2>
              <div className="know-grid">
                {exp.bring?.length > 0 && (
                  <div>
                    <h3 className="know-h">Ta med</h3>
                    <ul className="ticklist">
                      {exp.bring.map((b) => (
                        <li key={b}><Icon.check width={18} height={18} /> {b}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {exp.notFor?.length > 0 && (
                  <div>
                    <h3 className="know-h">Passer ikke for</h3>
                    <ul className="ticklist ticklist--no">
                      {exp.notFor.map((n) => (
                        <li key={n}><Icon.x width={18} height={18} /> {n}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          <section className="detail-block">
            <h2>Praktisk informasjon</h2>
            <dl className="deflist">
              {exp.operator && (
                <div>
                  <dt><Icon.shield width={16} height={16} /> Arrangør</dt>
                  <dd>{exp.operator}</dd>
                </div>
              )}
              <div>
                <dt><Icon.pin width={16} height={16} /> Oppmøte</dt>
                <dd>{exp.meeting}</dd>
              </div>
              {exp.groupSize && (
                <div>
                  <dt><Icon.users width={16} height={16} /> Gruppestørrelse</dt>
                  <dd>{exp.groupSize}</dd>
                </div>
              )}
              <div>
                <dt><Icon.chat width={16} height={16} /> Språk på turen</dt>
                <dd>{exp.languages.join(', ')}</dd>
              </div>
              <div>
                <dt><Icon.shield width={16} height={16} /> Avbestilling</dt>
                <dd>{exp.cancellation}</dd>
              </div>
            </dl>
          </section>
        </div>

        {USE_GYG_WIDGET && exp.gygTourId ? (
          <BookingWidget exp={exp} />
        ) : exp.bookingUrl ? (
          <PartnerBox exp={exp} />
        ) : (
          <BookingBox exp={exp} />
        )}
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
