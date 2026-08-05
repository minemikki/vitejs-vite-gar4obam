import { useCallback, useEffect, useState } from 'react';
import { read, write, KEYS } from './storage.js';
import { allExperiences } from '../data.js';

/*
 * «Min reise» — reiseplanleggeren.
 *
 * Klook og GetYourGuide lar deg legge ting i en ønskeliste, men ikke bygge en
 * faktisk reise: hvilke dager, hva det koster til sammen, om du har lagt to
 * heldagsturer på samme dag. Det er det denne gjør.
 *
 * Planen lagres i nettleseren (ingen konto nødvendig) og kan deles som en
 * lenke — det gjør at én i reisefølget kan planlegge og sende til resten,
 * noe som i praksis er gratis markedsføring for oss.
 */

const STORAGE_KEY = KEYS.trip;
const EVENT = 'sawadee:trip-changed';

const emptyTrip = () => ({ items: [], travellers: 2 });

function load() {
  const t = read(STORAGE_KEY, null);
  if (!t || !Array.isArray(t.items)) return emptyTrip();
  return { travellers: Number(t.travellers) || 2, items: t.items };
}

function save(trip) {
  write(STORAGE_KEY, trip);
  // Flere komponenter viser antall i planen samtidig; dette holder dem i takt.
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: trip }));
  }
}

/* ---------------------- Deling via lenke ---------------------- */

/** Planen kodes som «id:dag,id:dag» — kort nok til å stå i en URL. */
export function encodeTrip(trip) {
  return trip.items.map((i) => `${i.id}:${i.day}`).join(',');
}

export function decodeTrip(param, travellers) {
  if (!param) return null;
  const items = param
    .split(',')
    .map((chunk) => {
      const [id, day] = chunk.split(':');
      if (!allExperiences.some((e) => e.id === id)) return null;
      const d = Number(day);
      return { id, day: Number.isFinite(d) && d > 0 ? d : 1 };
    })
    .filter(Boolean);
  if (!items.length) return null;
  return { items, travellers: Number(travellers) || 2 };
}

/* ---------------------------- Hook ---------------------------- */

export function useTrip() {
  // Starter tom og fylles etter montering, slik at forhåndsrendret HTML og
  // første render i nettleseren er like (ellers klager hydreringen).
  const [trip, setTrip] = useState(emptyTrip);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTrip(load());
    setReady(true);
    const onChange = (e) => setTrip(e.detail);
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  const commit = useCallback((next) => {
    setTrip(next);
    save(next);
  }, []);

  const add = useCallback(
    (id, day = 1) => {
      const current = load();
      if (current.items.some((i) => i.id === id)) return false;
      commit({ ...current, items: [...current.items, { id, day }] });
      return true;
    },
    [commit]
  );

  const remove = useCallback(
    (id) => {
      const current = load();
      commit({ ...current, items: current.items.filter((i) => i.id !== id) });
    },
    [commit]
  );

  const toggle = useCallback(
    (id) => {
      const current = load();
      const has = current.items.some((i) => i.id === id);
      commit({
        ...current,
        items: has
          ? current.items.filter((i) => i.id !== id)
          : [...current.items, { id, day: 1 }],
      });
      return !has;
    },
    [commit]
  );

  const setDay = useCallback(
    (id, day) => {
      const current = load();
      commit({
        ...current,
        items: current.items.map((i) => (i.id === id ? { ...i, day: Math.max(1, day) } : i)),
      });
    },
    [commit]
  );

  const setTravellers = useCallback(
    (n) => {
      const current = load();
      commit({ ...current, travellers: Math.min(20, Math.max(1, Number(n) || 1)) });
    },
    [commit]
  );

  const replace = useCallback((next) => commit(next), [commit]);
  const clear = useCallback(() => commit(emptyTrip()), [commit]);

  return { trip, ready, add, remove, toggle, setDay, setTravellers, replace, clear };
}

/* --------------------------- Avledet --------------------------- */

/** Grupperer planen per dag og regner ut hva den koster. */
export function summarise(trip) {
  const byDay = new Map();
  let perPerson = 0;

  for (const item of trip.items) {
    const exp = allExperiences.find((e) => e.id === item.id);
    if (!exp) continue;
    perPerson += exp.priceNOK;
    if (!byDay.has(item.day)) byDay.set(item.day, []);
    byDay.get(item.day).push({ ...exp, day: item.day });
  }

  const days = [...byDay.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([day, items]) => {
      const fullDays = items.filter((i) => i.duration === 'Heldag').length;
      return {
        day,
        items,
        subtotal: items.reduce((s, i) => s + i.priceNOK, 0),
        // To heldagsturer samme dag går ikke — bedre å si fra enn å la
        // kunden oppdage det når hen står der.
        warning: fullDays > 1 ? 'To heldagsturer på samme dag rekker du ikke.' : null,
      };
    });

  return {
    days,
    count: trip.items.length,
    perPerson,
    total: perPerson * trip.travellers,
  };
}
