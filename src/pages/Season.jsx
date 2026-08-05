import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  regions,
  months,
  climate,
  holidays,
  monthAdvice,
  LEVELS,
} from '../content/season.js';
import { destinations as destPages } from '../content/destinations.js';
import { Icon } from '../scenes.jsx';

const destName = (slug) => destPages.find((d) => d.slug === slug)?.name || slug;

export default function Season() {
  // Starter alltid på januar, og hopper til brukerens egen måned etter at
  // siden er hydrert. Leser vi klokka under forhåndsrenderingen, får serveren
  // og nettleseren ulikt svar, og React kaster hele markupen.
  const [valgt, setValgt] = useState(1);
  useEffect(() => {
    setValgt(new Date().getMonth() + 1);
  }, []);

  // Beste region denne måneden, brukt til å svare på spørsmålet direkte.
  const beste = useMemo(() => {
    const rangert = [...regions].sort(
      (a, b) => climate[b.id][valgt][0] - climate[a.id][valgt][0]
    );
    return rangert[0];
  }, [valgt]);

  const månedNavn = months.find((m) => m.n === valgt).name;

  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <nav className="crumbs" aria-label="Du er her">
            <Link to="/">Hjem</Link> <span aria-hidden="true">/</span> Når bør du reise
          </nav>
          <span className="kicker">Værkart</span>
          <h1>Når bør du reise til Thailand?</h1>
          <p>
            «November til mars» er svaret alle gir. Det er riktig for Phuket og
            Bangkok — og feil for Koh Samui, der november er årets våteste måned.
            Thailand har to kyster med hver sin regntid. Velg måneden din, så
            sier vi hvor du bør dra.
          </p>
        </div>
      </header>

      <div className="season">
        <section aria-labelledby="velg-maaned">
          <h2 id="velg-maaned" className="season-h2">
            Velg måned
          </h2>
          <div className="month-picker" role="tablist" aria-label="Måned">
            {months.map((m) => (
              <button
                key={m.n}
                role="tab"
                aria-selected={m.n === valgt}
                className={`month-chip ${m.n === valgt ? 'is-on' : ''}`}
                onClick={() => setValgt(m.n)}
              >
                <span className="month-chip-name">{m.short}</span>
                {holidays[m.n] && <span className="month-chip-dot" aria-hidden="true" />}
              </button>
            ))}
          </div>
          {holidays[valgt] && (
            <p className="season-holiday">
              <Icon.calendar width={15} height={15} /> {holidays[valgt]}
            </p>
          )}
        </section>

        <section className="season-answer" aria-live="polite">
          <p className="season-answer-kicker">Reiser du i {månedNavn.toLowerCase()}</p>
          <h2>Dra til {beste.name}</h2>
          <p className="season-answer-note">{monthAdvice[valgt]}</p>
        </section>

        <section aria-labelledby="alle-regioner">
          <h2 id="alle-regioner" className="season-h2">
            Alle regioner i {månedNavn.toLowerCase()}
          </h2>
          <div className="region-cards">
            {[...regions]
              .sort((a, b) => climate[b.id][valgt][0] - climate[a.id][valgt][0])
              .map((r) => {
                const [niva, tekst] = climate[r.id][valgt];
                return (
                  <article className={`region-card lvl-${niva}`} key={r.id}>
                    <div className="region-card-head">
                      <h3>{r.name}</h3>
                      <span className={`lvl-badge lvl-${niva}`}>{LEVELS[niva].label}</span>
                    </div>
                    <p className="region-places">{r.places}</p>
                    <p className="region-text">{tekst}</p>
                    {r.destinations.length > 0 && (
                      <p className="region-links">
                        {r.destinations.map((slug) => (
                          <Link key={slug} to={`/reisemal/${slug}`}>
                            {destName(slug)}
                          </Link>
                        ))}
                      </p>
                    )}
                  </article>
                );
              })}
          </div>
        </section>

        <section aria-labelledby="hele-aaret">
          <h2 id="hele-aaret" className="season-h2">
            Hele året på ett brett
          </h2>
          <p className="season-sub">
            Trykk på en måned for detaljer. De to kystene er speilvendte — det er
            hele poenget.
          </p>
          <div className="matrix-scroll">
            <table className="matrix">
              <caption className="sr-only">
                Værforhold i fire regioner av Thailand, måned for måned
              </caption>
              <thead>
                <tr>
                  <th scope="col">Region</th>
                  {months.map((m) => (
                    <th
                      scope="col"
                      key={m.n}
                      className={m.n === valgt ? 'is-on' : undefined}
                    >
                      <button className="matrix-month" onClick={() => setValgt(m.n)}>
                        {m.short}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {regions.map((r) => (
                  <tr key={r.id}>
                    <th scope="row">{r.name}</th>
                    {months.map((m) => {
                      const [niva] = climate[r.id][m.n];
                      return (
                        <td
                          key={m.n}
                          className={`cell lvl-${niva} ${m.n === valgt ? 'is-on' : ''}`}
                        >
                          <span className="sr-only">
                            {months.find((x) => x.n === m.n).name}: {LEVELS[niva].label}
                          </span>
                          <span aria-hidden="true">{LEVELS[niva].short.slice(0, 1)}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="matrix-key">
            {[4, 3, 2, 1].map((n) => (
              <li key={n}>
                <span className={`key-dot lvl-${n}`} aria-hidden="true" />
                {LEVELS[n].label}
              </li>
            ))}
          </ul>
        </section>

        <section className="season-regions" aria-labelledby="om-regionene">
          <h2 id="om-regionene" className="season-h2">
            Hvorfor kystene er ulike
          </h2>
          <p className="season-sub">
            Sørvestmonsunen treffer vestkysten fra mai til oktober. Østkysten
            ligger i le av halvøya og får i stedet nordøstmonsunen senere på
            året. Derfor er de to sidene av Thailand sjelden våte samtidig — og
            derfor finnes det nesten alltid et sted i landet med fint vær.
          </p>
          <div className="region-explain">
            {regions.map((r) => (
              <div key={r.id}>
                <h3>{r.name}</h3>
                <p>{r.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="season-cta">
          <h2>Vet du når du skal reise?</h2>
          <p>
            Se opplevelsene våre, eller les guiden om beste reisetid for en
            grundigere gjennomgang.
          </p>
          <div className="season-cta-row">
            <Link className="btn btn-primary" to="/opplevelser">
              Se alle opplevelser
            </Link>
            <Link className="btn btn-outline" to="/guider/beste-tid-a-reise-til-thailand">
              Les hele guiden
            </Link>
          </div>
        </section>

        <p className="season-disclaimer">
          Tallene bygger på værstatistikk over mange år, ikke på en enkelt
          sesong. Været varierer, og en våt måned kan gi strålende uker. Bruk
          dette til å velge retning — sjekk varselet før du pakker.
        </p>
      </div>
    </>
  );
}
