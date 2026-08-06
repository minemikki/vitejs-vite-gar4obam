import { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { allExperiences, categories, destinations } from '../data.js';
import ExperienceCard from '../components/ExperienceCard.jsx';
import Compare from '../components/Compare.jsx';
import { Icon } from '../scenes.jsx';
import { read, write, KEYS } from '../lib/storage.js';
import { nok } from '../lib/format.js';

// «Best vurdert» dukker opp av seg selv den dagen opplevelsene har ekte
// vurderinger. Å sortere på et tomt felt gir bare en tilfeldig rekkefølge.
const SORTS = [
  { id: 'popular', label: 'Vår anbefaling' },
  { id: 'price-asc', label: 'Lavest pris' },
  { id: 'price-desc', label: 'Høyest pris' },
  ...(allExperiences.some((e) => e.rating) ? [{ id: 'rating', label: 'Best vurdert' }] : []),
];

const DURATIONS = ['Alle', 'Halvdag', 'Heldag', 'Kveld'];
const MAX_PRICE = Math.max(...allExperiences.map((e) => e.priceNOK));

export default function Experiences() {
  const [params, setParams] = useSearchParams();
  const kategori = params.get('kategori') || 'Alle';
  const sted = params.get('sted') || 'Alle';
  const sort = params.get('sortering') || 'popular';
  const varighet = params.get('varighet') || 'Alle';
  const maks = Number(params.get('maks')) || MAX_PRICE;
  const familie = params.get('familie') === '1';

  const [saved, setSaved] = useState(() => new Set());
  const [hydrated, setHydrated] = useState(false);
  const [compare, setCompare] = useState(() => new Set());

  useEffect(() => {
    setSaved(new Set(read(KEYS.wishlist, [])));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) write(KEYS.wishlist, [...saved]);
  }, [saved, hydrated]);

  const toggleSave = (id) =>
    setSaved((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleCompare = (id) =>
    setCompare((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      // Mer enn tre kolonner blir uleselig på mobil.
      else if (next.size < 3) next.add(id);
      return next;
    });

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    const isDefault =
      !value ||
      value === 'Alle' ||
      (key === 'sortering' && value === 'popular') ||
      (key === 'maks' && Number(value) >= MAX_PRICE) ||
      (key === 'familie' && value !== '1');
    if (isDefault) next.delete(key);
    else next.set(key, String(value));
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    let out = allExperiences.filter(
      (e) =>
        (kategori === 'Alle' || e.category === kategori) &&
        (sted === 'Alle' || e.place === sted) &&
        (varighet === 'Alle' || e.duration === varighet) &&
        e.priceNOK <= maks &&
        (!familie || e.tags.includes('Familievennlig'))
    );
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.priceNOK - b.priceNOK);
    else if (sort === 'price-desc') out = [...out].sort((a, b) => b.priceNOK - a.priceNOK);
    else if (sort === 'rating') out = [...out].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    else out = [...out].sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    return out;
  }, [kategori, sted, sort, varighet, maks, familie]);

  const activeFilters =
    (kategori !== 'Alle' ? 1 : 0) +
    (sted !== 'Alle' ? 1 : 0) +
    (varighet !== 'Alle' ? 1 : 0) +
    (maks < MAX_PRICE ? 1 : 0) +
    (familie ? 1 : 0);

  const compareList = allExperiences.filter((e) => compare.has(e.id));

  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Alle opplevelser</span>
          <h1>Turer og aktiviteter i Thailand</h1>
          <p>
            {allExperiences.length} håndplukkede opplevelser — valgt etter lisens,
            dyrevelferd og omdømme. Priser i norske kroner, uten skjulte gebyrer.
          </p>
        </div>
      </header>

      <section className="section section--tight">
        <div className="filters" role="group" aria-label="Filtrer på kategori">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${kategori === c ? 'is-active' : ''}`}
              onClick={() => setParam('kategori', c)}
              aria-pressed={kategori === c}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="filterbar">
          <label className="minisel">
            <span>Sted</span>
            <select value={sted} onChange={(e) => setParam('sted', e.target.value)}>
              <option>Alle</option>
              {destinations.map((d) => <option key={d.name}>{d.name}</option>)}
            </select>
          </label>

          <label className="minisel">
            <span>Varighet</span>
            <select value={varighet} onChange={(e) => setParam('varighet', e.target.value)}>
              {DURATIONS.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>

          <label className="minisel minisel--range">
            <span>Maks pris</span>
            <input
              type="range"
              min="400"
              max={MAX_PRICE}
              step="50"
              value={maks}
              onChange={(e) => setParam('maks', e.target.value)}
              aria-label={`Maks pris ${nok(maks)}`}
            />
            <output>{nok(maks)}</output>
          </label>

          <label className={`toggle ${familie ? 'is-on' : ''}`}>
            <input
              type="checkbox"
              checked={familie}
              onChange={(e) => setParam('familie', e.target.checked ? '1' : '')}
            />
            <span>Familievennlig</span>
          </label>

          <label className="minisel">
            <span>Sorter</span>
            <select value={sort} onChange={(e) => setParam('sortering', e.target.value)}>
              {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
            </select>
          </label>
        </div>

        <div className="listbar">
          <p className="listbar-count" role="status">
            <strong>{list.length}</strong>{' '}
            {list.length === 1 ? 'opplevelse' : 'opplevelser'}
            {activeFilters > 0 && (
              <button className="listbar-clear" onClick={() => setParams({})}>
                <Icon.x width={14} height={14} /> Nullstill {activeFilters} filter
              </button>
            )}
          </p>
          <p className="listbar-hint">
            <Icon.info width={15} height={15} /> Huk av på inntil tre for å sammenligne
          </p>
        </div>

        {list.length === 0 ? (
          <div className="empty">
            <Icon.compass width={34} height={34} />
            <h2>Ingen treff</h2>
            <p>Ingen opplevelser passer disse filtrene. Prøv å utvide prisrammen.</p>
            <button className="btn btn-primary" onClick={() => setParams({})}>
              Vis alle opplevelser
            </button>
          </div>
        ) : (
          <div className="grid">
            {list.map((e) => (
              <div className="cardwrap" key={e.id}>
                <ExperienceCard exp={e} saved={saved.has(e.id)} onSave={toggleSave} />
                <label className={`comparebox ${compare.has(e.id) ? 'is-on' : ''}`}>
                  <input
                    type="checkbox"
                    checked={compare.has(e.id)}
                    onChange={() => toggleCompare(e.id)}
                    disabled={!compare.has(e.id) && compare.size >= 3}
                  />
                  <span>Sammenlign</span>
                </label>
              </div>
            ))}
          </div>
        )}

        <div className="listfoot">
          <p>
            Finner du ikke det du leter etter? Se{' '}
            <Link to="/reisemal">reisemålene våre</Link> eller les{' '}
            <Link to="/guider">guidene</Link> for tips om hva som passer reisen din.
          </p>
        </div>
      </section>

      <Compare items={compareList} onRemove={toggleCompare} onClear={() => setCompare(new Set())} />
    </>
  );
}
