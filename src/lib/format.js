/** Pris i norske kroner, alltid med tusenskille. */
export const nok = (n) =>
  `${Number(n).toLocaleString('nb-NO', { maximumFractionDigits: 0 })} kr`;

/** 4.9 → "4,9" */
export const num = (n) => Number(n).toLocaleString('nb-NO');

/** ISO-dato → "torsdag 12. mars 2026" */
export function longDate(iso) {
  if (!iso) return '';
  const d = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('nb-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Dagens dato som yyyy-mm-dd — brukes som min-verdi i datovelgere. */
export function todayISO() {
  const d = new Date();
  const pad = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Enkel referanse til bestillingen, f.eks. "ST-7F3K2Q". */
export function bookingRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let out = '';
  for (let i = 0; i < 6; i += 1) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `ST-${out}`;
}
