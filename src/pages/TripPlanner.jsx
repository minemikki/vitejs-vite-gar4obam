import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTrip, summarise, encodeTrip, decodeTrip } from '../lib/trip.js';
import { allExperiences } from '../data.js';
import { Scene, Icon } from '../scenes.jsx';
import { nok } from '../lib/format.js';
import { site } from '../config.js';

function ShareBox({ trip }) {
  const [copied, setCopied] = useState(false);
  const url = useMemo(() => {
    const base = typeof window !== 'undefined' ? window.location.origin : site.url;
    const p = new URLSearchParams({ plan: encodeTrip(trip), reisende: String(trip.travellers) });
    return `${base}/min-reise?${p}`;
  }, [trip]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Utklippstavlen kan være blokkert — da får brukeren markere selv.
      setCopied(false);
    }
  };

  return (
    <div className="sharebox">
      <div>
        <h3>Del planen med reisefølget</h3>
        <p>Alle som åpner lenken ser den samme planen og kan endre sin egen kopi.</p>
      </div>
      <div className="sharebox-row">
        <input readOnly value={url} onFocus={(e) => e.target.select()} aria-label="Delingslenke" />
        <button className="btn btn-primary" onClick={copy}>
          {copied ? <><Icon.check width={17} height={17} /> Kopiert</> : 'Kopier lenke'}
        </button>
      </div>
    </div>
  );
}

function DayCard({ day, onMove, onRemove }) {
  return (
    <section className="day">
      <header className="day-head">
        <h2>Dag {day.day}</h2>
        <span className="day-sum">{nok(day.subtotal)} per person</span>
      </header>

      {day.warning && (
        <p className="day-warning">
          <Icon.info width={17} height={17} /> {day.warning}
        </p>
      )}

      <ul className="day-items">
        {day.items.map((e) => (
          <li className="dayitem" key={e.id}>
            <Link className="dayitem-media" to={`/opplevelser/${e.slug}`} aria-label={e.title}>
              <Scene name={e.scene} uid={`trip-${e.id}`} image={e.image} alt="" />
            </Link>
            <div className="dayitem-body">
              <h3><Link to={`/opplevelser/${e.slug}`}>{e.title}</Link></h3>
              <p className="dayitem-meta">
                <Icon.pin width={13} height={13} /> {e.place}
                <span aria-hidden="true">·</span>
                <Icon.clock width={13} height={13} /> {e.duration}
              </p>
              <p className="dayitem-price">{nok(e.priceNOK)} per person</p>
            </div>
            <div className="dayitem-actions">
              <label className="dayitem-day">
                <span className="sr-only">Flytt {e.title} til dag</span>
                <select value={e.day} onChange={(ev) => onMove(e.id, Number(ev.target.value))}>
                  {Array.from({ length: 14 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>Dag {d}</option>
                  ))}
                </select>
              </label>
              <button
                className="dayitem-remove"
                onClick={() => onRemove(e.id)}
                aria-label={`Fjern ${e.title} fra planen`}
              >
                <Icon.x width={17} height={17} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function TripPlanner() {
  const { trip, ready, remove, setDay, setTravellers, replace, clear } = useTrip();
  const [params, setParams] = useSearchParams();
  const [imported, setImported] = useState(false);

  // Åpner noen en delt lenke, laster vi den planen inn.
  useEffect(() => {
    if (!ready || imported) return;
    const shared = decodeTrip(params.get('plan'), params.get('reisende'));
    if (shared) {
      replace(shared);
      setImported(true);
      setParams({}, { replace: true });
    }
  }, [ready, imported, params, replace, setParams]);

  const s = summarise(trip);
  const suggestions = allExperiences
    .filter((e) => !trip.items.some((i) => i.id === e.id))
    .slice(0, 3);

  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Min reise</span>
          <h1>Planlegg hele Thailand-turen</h1>
          <p>
            Samle opplevelsene du vurderer, fordel dem på dager og se hva turen
            koster til sammen. Planen lagres i nettleseren din — ingen konto
            nødvendig.
          </p>
        </div>
      </header>

      {!ready ? (
        <div className="section"><p className="muted-line">Henter planen din …</p></div>
      ) : s.count === 0 ? (
        <div className="section">
          <div className="empty empty--big">
            <Icon.compass width={40} height={40} />
            <h2>Planen er tom ennå</h2>
            <p>
              Trykk «Legg til i min reise» på en opplevelse, så dukker den opp her.
              Du kan fordele dem på dager og se totalprisen.
            </p>
            <Link className="btn btn-gold btn-lg" to="/opplevelser">
              Finn opplevelser <Icon.arrow width={18} height={18} />
            </Link>
          </div>
        </div>
      ) : (
        <div className="trip-wrap">
          <div className="trip-main">
            {imported && (
              <p className="paynote">
                <Icon.check width={16} height={16} />
                Planen fra lenken er lastet inn. Endringer du gjør nå lagres kun hos deg.
              </p>
            )}

            {s.days.map((d) => (
              <DayCard key={d.day} day={d} onMove={setDay} onRemove={remove} />
            ))}

            <ShareBox trip={trip} />

            {suggestions.length > 0 && (
              <section className="trip-suggest">
                <h2>Passer kanskje inn</h2>
                <ul className="sidelist sidelist--rich">
                  {suggestions.map((e) => (
                    <li key={e.id}>
                      <Link to={`/opplevelser/${e.slug}`}>
                        <strong>{e.title}</strong>
                        <span>{e.place} · {nok(e.priceNOK)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside className="trip-side">
            <div className="sidecard sidecard--sticky">
              <h2>Oppsummering</h2>

              <label className="trip-travellers">
                <span><Icon.users width={15} height={15} /> Antall reisende</span>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={trip.travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                />
              </label>

              <dl className="sumbox-lines">
                <div><dt>Opplevelser</dt><dd>{s.count}</dd></div>
                <div><dt>Dager med aktivitet</dt><dd>{s.days.length}</dd></div>
                <div><dt>Per person</dt><dd>{nok(s.perPerson)}</dd></div>
              </dl>

              <div className="sumbox-total">
                <span>Totalt for {trip.travellers}</span>
                <strong>{nok(s.total)}</strong>
              </div>

              <p className="sumbox-fine">
                <Icon.info width={14} height={14} />
                Dette er kun aktivitetene — fly og hotell kommer i tillegg.
              </p>

              <Link className="btn btn-gold btn-block btn-lg" to="/opplevelser">
                Legg til flere
              </Link>
              <button className="btn btn-outline btn-block trip-clear" onClick={clear}>
                Tøm planen
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
