import { useState } from 'react';
import { useTrip } from '../lib/trip.js';
import { Icon } from '../scenes.jsx';
import { track } from '../lib/analytics.js';

/**
 * «Legg til i min reise». Viser bekreftelse i knappen selv i stedet for en
 * varsling som forsvinner — brukeren skal se resultatet der hen klikket.
 */
export default function TripButton({ exp, variant = 'ghost' }) {
  const { trip, ready, toggle } = useTrip();
  const [justAdded, setJustAdded] = useState(false);

  const inTrip = trip.items.some((i) => i.id === exp.id);

  const onClick = () => {
    const added = toggle(exp.id);
    track(added ? 'trip_add' : 'trip_remove', { id: exp.id, title: exp.title });
    if (added) {
      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);
    }
  };

  const label = justAdded
    ? 'Lagt til'
    : inTrip
      ? 'I min reise'
      : 'Legg til i min reise';

  return (
    <button
      className={`tripbtn tripbtn--${variant} ${inTrip ? 'is-in' : ''}`}
      onClick={onClick}
      disabled={!ready}
      aria-pressed={inTrip}
    >
      {inTrip ? <Icon.check width={17} height={17} /> : <Icon.ticket width={17} height={17} />}
      <span>{label}</span>
    </button>
  );
}
