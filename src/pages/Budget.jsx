import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  styles,
  rates,
  rateLabels,
  flights,
  DOMESTIC_LEG,
  notes,
} from '../content/budget.js';
import { nok } from '../lib/format.js';
import { Icon } from '../scenes.jsx';

export default function Budget() {
  const [dager, setDager] = useState(14);
  const [reisende, setReisende] = useState(2);
  const [stil, setStil] = useState('vanlig');
  const [sesong, setSesong] = useState('hoy');
  const [medFly, setMedFly] = useState(true);
  const [strekninger, setStrekninger] = useState(2);

  const b = useMemo(() => {
    const r = rates[stil];
    const perDag = r.seng + r.mat + r.transport + r.aktivitet;
    const påBakken = perDag * dager * reisende;
    const fly = medFly ? flights[sesong].pris * reisende : 0;
    const innenriks = DOMESTIC_LEG * strekninger * reisende;

    return {
      poster: Object.keys(rateLabels).map((k) => ({
        k,
        label: rateLabels[k],
        sats: r[k],
        sum: r[k] * dager * reisende,
      })),
      påBakken,
      fly,
      innenriks,
      total: påBakken + fly + innenriks,
      perPerson: Math.round((påBakken + fly + innenriks) / reisende),
      perDagPerPerson: perDag,
    };
  }, [dager, reisende, stil, sesong, medFly, strekninger]);

  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <nav className="crumbs" aria-label="Du er her">
            <Link to="/">Hjem</Link> <span aria-hidden="true">/</span> Reisebudsjett
          </nav>
          <span className="kicker">Verktøy</span>
          <h1>Hva koster din Thailand-tur?</h1>
          <p>
            Sett inn dagene dine, så regner vi. Alle satsene vi bruker står
            åpent nedenfor — så kan du justere dem mot din egen ferie i stedet
            for å stole blindt på ett tall.
          </p>
        </div>
      </header>

      <div className="budget">
        <div className="budget-grid">
          <form className="budget-form" onSubmit={(e) => e.preventDefault()}>
            <h2 className="sr-only">Sett opp turen din</h2>

            <div className="bfield">
              <label htmlFor="b-dager">
                Antall dager <strong>{dager}</strong>
              </label>
              <input
                id="b-dager"
                type="range"
                min="3"
                max="35"
                value={dager}
                onChange={(e) => setDager(Number(e.target.value))}
              />
            </div>

            <div className="bfield">
              <label htmlFor="b-reisende">
                Antall reisende <strong>{reisende}</strong>
              </label>
              <input
                id="b-reisende"
                type="range"
                min="1"
                max="8"
                value={reisende}
                onChange={(e) => setReisende(Number(e.target.value))}
              />
            </div>

            <fieldset className="bfield">
              <legend>Reisestil</legend>
              <div className="bstyles">
                {styles.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    className={`bstyle ${stil === s.id ? 'is-on' : ''}`}
                    aria-pressed={stil === s.id}
                    onClick={() => setStil(s.id)}
                  >
                    <strong>{s.name}</strong>
                    <span>{s.blurb}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="bfield">
              <label className="bcheck">
                <input
                  type="checkbox"
                  checked={medFly}
                  onChange={(e) => setMedFly(e.target.checked)}
                />
                <span>Ta med fly fra Norge</span>
              </label>
            </div>

            {medFly && (
              <div className="bfield">
                <label htmlFor="b-sesong">Når reiser du?</label>
                <select
                  id="b-sesong"
                  value={sesong}
                  onChange={(e) => setSesong(e.target.value)}
                >
                  {Object.entries(flights).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v.label} — {nok(v.pris)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="bfield">
              <label htmlFor="b-strek">
                Innenriks strekninger <strong>{strekninger}</strong>
              </label>
              <input
                id="b-strek"
                type="range"
                min="0"
                max="8"
                value={strekninger}
                onChange={(e) => setStrekninger(Number(e.target.value))}
              />
              <p className="bhint">
                Fly eller båt inne i Thailand. Bangkok til Krabi og tilbake er
                to strekninger.
              </p>
            </div>
          </form>

          <aside className="budget-result" aria-live="polite">
            <p className="bres-kicker">Anslag for hele følget</p>
            <p className="bres-total">{nok(b.total)}</p>
            <p className="bres-sub">
              {nok(b.perPerson)} per person · {nok(b.perDagPerPerson)} per dag
              på bakken
            </p>

            <table className="bres-table">
              <caption className="sr-only">Fordeling av budsjettet</caption>
              <tbody>
                {b.poster.map((p) => (
                  <tr key={p.k}>
                    <th scope="row">
                      {p.label}
                      <span className="bres-rate">{nok(p.sats)} per døgn</span>
                    </th>
                    <td>{nok(p.sum)}</td>
                  </tr>
                ))}
                {b.innenriks > 0 && (
                  <tr>
                    <th scope="row">
                      Innenriks transport
                      <span className="bres-rate">
                        {strekninger} strekninger
                      </span>
                    </th>
                    <td>{nok(b.innenriks)}</td>
                  </tr>
                )}
                {b.fly > 0 && (
                  <tr>
                    <th scope="row">
                      Fly fra Norge
                      <span className="bres-rate">{flights[sesong].label}</span>
                    </th>
                    <td>{nok(b.fly)}</td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <th scope="row">Totalt</th>
                  <td>{nok(b.total)}</td>
                </tr>
              </tfoot>
            </table>

            <Link className="btn btn-primary btn-block" to="/opplevelser">
              Se hva turene koster <Icon.arrow width={17} height={17} />
            </Link>
          </aside>
        </div>

        <section className="budget-notes">
          <h2>Slik regner vi</h2>
          <ul>
            {notes.map((n) => (
              <li key={n}>
                <Icon.info width={17} height={17} />
                <span>{n}</span>
              </li>
            ))}
          </ul>
          <p className="budget-disclaimer">
            Dette er anslag, ikke et tilbud. Priser i Thailand varierer med
            sesong, sted og hvor tidlig du bestiller. Bruk tallet til å vurdere
            om turen er innenfor rekkevidde — ikke til å planlegge siste krone.
          </p>
          <p className="budget-more">
            Vil du ha gjennomgangen bak tallene?{' '}
            <Link to="/guider/hva-koster-thailand">
              Les det ærlige budsjettet for to uker i Thailand
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
