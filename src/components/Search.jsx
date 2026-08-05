import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { allExperiences } from '../data.js';
import { destinations } from '../content/destinations.js';
import { guides } from '../content/guides.js';
import { Icon } from '../scenes.jsx';
import { nok } from '../lib/format.js';

/*
 * Søk på tvers av opplevelser, reisemål og guider.
 *
 * Bevisste valg:
 *  - treff vises mens du skriver, ingen «trykk søk og vent»
 *  - piltaster og Enter fungerer, så tastaturbrukere slipper å bruke mus
 *  - norske tegn normaliseres, så «oyer» finner «Øyer»
 *  - vi rangerer treff i tittelen over treff i beskrivelsen
 */

const norm = (s) =>
  s
    .toLowerCase()
    .replace(/æ/g, 'ae')
    .replace(/ø/g, 'o')
    .replace(/å/g, 'a')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

const INDEX = [
  ...allExperiences.map((e) => ({
    kind: 'Opplevelse',
    title: e.title,
    sub: `${e.place} · ${nok(e.priceNOK)}`,
    to: `/opplevelser/${e.slug}`,
    haystack: norm(`${e.title} ${e.place} ${e.category} ${e.blurb} ${e.tags.join(' ')}`),
    titleNorm: norm(e.title),
  })),
  ...destinations.map((d) => ({
    kind: 'Reisemål',
    title: d.name,
    sub: d.tagline,
    to: `/reisemal/${d.slug}`,
    haystack: norm(`${d.name} ${d.region} ${d.tagline} ${d.metaDescription}`),
    titleNorm: norm(d.name),
  })),
  ...guides.map((g) => ({
    kind: 'Guide',
    title: g.title,
    sub: `${g.topic} · ${g.readMinutes} min`,
    to: `/guider/${g.slug}`,
    haystack: norm(`${g.title} ${g.excerpt} ${g.topic}`),
    titleNorm: norm(g.title),
  })),
];

function search(q) {
  const needle = norm(q.trim());
  if (needle.length < 2) return [];
  return INDEX.map((item) => {
    if (!item.haystack.includes(needle)) return null;
    // Treff i tittelen er mer relevant enn treff langt inne i en beskrivelse.
    const inTitle = item.titleNorm.includes(needle);
    const startsTitle = item.titleNorm.startsWith(needle);
    return { ...item, score: (startsTitle ? 100 : 0) + (inTitle ? 50 : 0) };
  })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score)
    .slice(0, 7);
}

export default function Search({ onClose }) {
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => search(q), [q]);

  useEffect(() => {
    inputRef.current?.focus();
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => setActive(0), [q]);

  const go = (item) => {
    navigate(item.to);
    onClose();
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') return onClose();
    if (!results.length) return undefined;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      go(results[active]);
    }
    return undefined;
  };

  const showEmpty = q.trim().length >= 2 && results.length === 0;

  return (
    <div className="searchoverlay" onClick={onClose}>
      <div
        className="searchpanel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Søk"
      >
        <div className="searchpanel-input">
          <Icon.search width={20} height={20} />
          <input
            ref={inputRef}
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Søk etter opplevelser, steder eller guider …"
            aria-label="Søk"
            aria-expanded={results.length > 0}
            aria-controls="sokeresultat"
            autoComplete="off"
          />
          <button className="searchpanel-close" onClick={onClose} aria-label="Lukk søk">
            <Icon.x width={20} height={20} />
          </button>
        </div>

        {results.length > 0 && (
          <ul className="searchresults" id="sokeresultat" role="listbox">
            {results.map((r, i) => (
              <li key={r.to} role="option" aria-selected={i === active}>
                <button
                  className={`searchresult ${i === active ? 'is-active' : ''}`}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                >
                  <span className="searchresult-kind">{r.kind}</span>
                  <span className="searchresult-body">
                    <strong>{r.title}</strong>
                    <span>{r.sub}</span>
                  </span>
                  <Icon.arrow width={17} height={17} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {showEmpty && (
          <div className="searchempty">
            <p>Ingen treff på «{q}».</p>
            <p className="hint">Prøv et sted som «Phuket», eller en aktivitet som «elefant».</p>
          </div>
        )}

        {q.trim().length < 2 && (
          <div className="searchhints">
            <p className="hint">Populære søk</p>
            <div className="chiprow">
              {['Elefant', 'Phuket', 'Bangkok', 'Matkurs', 'Med barn'].map((t) => (
                <button className="chip" key={t} onClick={() => setQ(t)}>{t}</button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
