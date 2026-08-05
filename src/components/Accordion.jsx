import { useId, useState } from 'react';
import { Icon } from '../scenes.jsx';

/*
 * Tilgjengelig trekkspill: knapp styrer et panel, tilstanden meldes med
 * aria-expanded/aria-controls, og innholdet ligger alltid i DOM-en slik at
 * søkemotorer og Ctrl+F finner svarene.
 */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [open, setOpen] = useState(defaultOpen);
  const baseId = useId();

  return (
    <div className="acc">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-b${i}`;
        const panelId = `${baseId}-p${i}`;
        return (
          <div className={`acc-item ${isOpen ? 'is-open' : ''}`} key={item.q}>
            <h3 className="acc-h">
              <button
                id={btnId}
                className="acc-btn"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
              >
                <span>{item.q}</span>
                <Icon.chevron className="acc-chevron" width={20} height={20} />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="acc-panel"
              hidden={!isOpen}
            >
              <p>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
