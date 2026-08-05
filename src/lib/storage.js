/*
 * Trygg lagring i nettleseren.
 * localStorage kan kaste (privat modus, full kvote, blokkert av bruker),
 * og finnes ikke i det hele tatt under forhåndsrendering på server.
 * Derfor går all tilgang gjennom disse to funksjonene.
 */

const hasStorage = () => {
  try {
    return typeof window !== 'undefined' && !!window.localStorage;
  } catch {
    return false;
  }
};

export function read(key, fallback = null) {
  if (!hasStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  if (!hasStorage()) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function remove(key) {
  if (!hasStorage()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* ignorer */
  }
}

export const KEYS = {
  consent: 'st.consent.v1',
  wishlist: 'st.wishlist.v1',
  draftBooking: 'st.booking.draft.v1',
};
