import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '../scenes.jsx';
import { nok, num } from '../lib/format.js';

/*
 * Sammenligning side ved side.
 *
 * Dette er der de store bookingsidene svikter: du må åpne fire faner for å
 * finne ut hvilken tur som faktisk inkluderer lunsj. Her ser du forskjellene
 * i én tabell — inkludert det ingen liker å fremheve, som hva som IKKE er med.
 *
 * To tilstander: en slank linje nederst mens du blar og velger, og et eget
 * vindu når du faktisk skal sammenligne. Første forsøk lot tabellen vokse
 * nedenfra og dekke kortene — da kunne man ikke krysse av flere uten å lukke
 * den igjen.
 */
export default function Compare({ items, onRemove, onClear }) {
  const [open, setOpen] = useState(false);

  /* Panelet ligger fast nederst. Uten dette skjuler det de nederste kortene,
     og man kan ikke huke av flere uten å lukke det først. */
  useEffect(() => {
    document.body.classList.toggle('has-comparebar', items.length > 0);
    return () => document.body.classList.remove('has-comparebar');
  }, [items.length]);

  // Lås bakgrunnen og la Escape lukke, som for andre dialoger.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!items.length) return null;

  const rows = [
    { label: 'Pris per person', get: (e) => nok(e.priceNOK), strong: true },
    { label: 'Sted', get: (e) => e.place },
    { label: 'Varighet', get: (e) => e.duration },
    { label: 'Vurdering', get: (e) => `${num(e.rating)} (${e.reviews})` },
    { label: 'Gruppestørrelse', get: (e) => e.groupSize },
    { label: 'Språk', get: (e) => e.languages.join(', ') },
    { label: 'Inkludert', get: (e) => e.included.join(' · ') },
    { label: 'Ikke inkludert', get: (e) => e.excluded.join(' · '), muted: true },
    { label: 'Avbestilling', get: (e) => e.cancellation },
  ];

  return (
    <>
      <div className="compare">
        <div className="compare-bar">
          <button className="compare-toggle" onClick={() => setOpen(true)}>
            <Icon.compass width={20} height={20} />
            <strong>Sammenlign {items.length}</strong>
            <span className="compare-names">{items.map((e) => e.title).join(' · ')}</span>
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}>
            Vis tabell
          </button>
          <button className="compare-clear" onClick={onClear}>Tøm</button>
        </div>
      </div>

      {open && (
        <div className="compare-modal" onClick={() => setOpen(false)}>
          <div
            className="compare-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Sammenlign opplevelser"
          >
            <header className="compare-panelhead">
              <h2>Sammenlign {items.length} opplevelser</h2>
              <button onClick={() => setOpen(false)} aria-label="Lukk sammenligning">
                <Icon.x width={20} height={20} />
              </button>
            </header>
            <div className="compare-body">
          <div className="tablewrap">
            <table className="comparetable">
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Egenskap</span></th>
                  {items.map((e) => (
                    <th key={e.id} scope="col">
                      <div className="compare-head">
                        <Link to={`/opplevelser/${e.slug}`}>{e.title}</Link>
                        <button onClick={() => onRemove(e.id)} aria-label={`Fjern ${e.title}`}>
                          <Icon.x width={15} height={15} />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    {items.map((e) => (
                      <td
                        key={e.id}
                        className={`${r.strong ? 'is-strong' : ''} ${r.muted ? 'is-muted' : ''}`}
                      >
                        {r.get(e)}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr>
                  <th scope="row"><span className="sr-only">Handling</span></th>
                  {items.map((e) => (
                    <td key={e.id}>
                      <Link className="btn btn-gold btn-sm" to={`/opplevelser/${e.slug}`}>
                        Se detaljer
                      </Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
      )}
    </>
  );
}
