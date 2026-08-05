import { Link } from 'react-router-dom';
import { Icon } from '../scenes.jsx';

export default function NotFound() {
  return (
    <div className="notfound">
      <span className="notfound-icon"><Icon.compass width={40} height={40} /></span>
      <h1>Her var det tomt</h1>
      <p>
        Siden du leter etter finnes ikke — eller så har den flyttet på seg.
        Prøv en av veiene under.
      </p>
      <div className="notfound-actions">
        <Link className="btn btn-primary btn-lg" to="/opplevelser">
          Se alle opplevelser
        </Link>
        <Link className="btn btn-outline btn-lg" to="/">
          Til forsiden
        </Link>
      </div>
    </div>
  );
}
