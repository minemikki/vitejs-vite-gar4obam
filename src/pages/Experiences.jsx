import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { allExperiences, categories, destinations } from '../data.js';
import ExperienceCard from '../components/ExperienceCard.jsx';
import { Icon } from '../scenes.jsx';
import { read, write, KEYS } from '../lib/storage.js';

const SORTS = [
  { id: 'popular', label: 'Mest populære' },
  { id: 'price-asc', label: 'Lavest pris' },
  { id: 'price-desc', label: 'Høyest pris' },
  { id: 'rating', label: 'Best vurdert' },
];

export default function Experiences() {
  // Filtrene ligger i URL-en, så et søk kan deles og bokmerkes.
  const [params, setParams] = useSearchParams();
  const kategori = params.get('kategori') || 'Alle';
  const sted = params.get('sted') || 'Alle';
  const sort = params.get('sortering') || 'popular';

  // Starter tom og fylles etter montering. Hadde vi lest lagret tilstand
  // allerede i første render, ville forhåndsrendret HTML og nettleseren
  // vist ulikt innhold — og hydreringen ville klaget.
  const [saved, setSaved] = useState(() => new Set());
  const [hydrated, setHydrated] = useState(false);

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

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (!value || value === 'Alle' || (key === 'sortering' && value === 'popular')) {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    let out = allExperiences.filter(
      (e) =>
        (kategori === 'Alle' || e.category === kategori) &&
        (sted === 'Alle' || e.place === sted)
    );
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.priceNOK - b.priceNOK);
    else if (sort === 'price-desc') out = [...out].sort((a, b) => b.priceNOK - a.priceNOK);
    else if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    else out = [...out].sort((a, b) => Number(b.bestseller) - Number(a.bestseller));
    return out;
  }, [kategori, sted, sort]);

  const activeFilters = (kategori !== 'Alle' ? 1 : 0) + (sted !== 'Alle' ? 1 : 0);

  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Alle opplevelser</span>
          <h1>Turer og aktiviteter i Thailand</h1>
          <p>
            {allExperiences.length} kuraterte opplevelser, alle kvalitetssjekket av
            oss. Priser i norske kroner, uten skjulte gebyrer.
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

        <div className="listbar">
          <p className="listbar-count" role="status">
            <strong>{list.length}</strong>{' '}
            {list.length === 1 ? 'opplevelse' : 'opplevelser'}
            {activeFilters > 0 && (
              <button className="listbar-clear" onClick={() => setParams({})}>
                <Icon.x width={14} height={14} /> Nullstill filtre
              </button>
            )}
          </p>

          <div className="listbar-selects">
            <label className="minisel">
              <span>Sted</span>
              <select value={sted} onChange={(e) => setParam('sted', e.target.value)}>
                <option>Alle</option>
                {destinations.map((d) => <option key={d.name}>{d.name}</option>)}
              </select>
            </label>
            <label className="minisel">
              <span>Sorter</span>
              <select value={sort} onChange={(e) => setParam('sortering', e.target.value)}>
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>{s.label}</option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {list.length === 0 ? (
          <div className="empty">
            <Icon.compass width={34} height={34} />
            <h2>Ingen treff</h2>
            <p>Vi har ingen opplevelser som passer disse filtrene ennå.</p>
            <button className="btn btn-primary" onClick={() => setParams({})}>
              Vis alle opplevelser
            </button>
          </div>
        ) : (
          <div className="grid">
            {list.map((e) => (
              <ExperienceCard
                key={e.id}
                exp={e}
                saved={saved.has(e.id)}
                onSave={toggleSave}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
