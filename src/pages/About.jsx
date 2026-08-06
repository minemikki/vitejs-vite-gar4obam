import { Link } from 'react-router-dom';
import { Icon } from '../scenes.jsx';
import { site } from '../config.js';

export default function About() {
  const values = [
    {
      icon: 'compass',
      t: 'Håndplukket, ikke alt',
      d: 'Vi legger ikke ut alt. Hver tur er sjekket mot ekte kriterier — lisens, forsikring, dyrevelferd og hva gjester faktisk sier. Blir en operatør dårligere, fjerner vi turen.',
    },
    {
      icon: 'heart',
      t: 'Dyrevelferd er ikke forhandlingsbart',
      d: 'Ingen elefantridning, ingen tigerselfies. Vi selger kun opplevelser der dyra behandles ordentlig.',
    },
    {
      icon: 'chat',
      t: 'Norsk hele veien',
      d: 'Du skal aldri måtte tolke engelsk småskrift. Bestilling, bekreftelse og hjelp underveis foregår på norsk.',
    },
    {
      icon: 'tag',
      t: 'Ærlige priser',
      d: 'Prisen du ser er prisen du betaler. Ingen gebyrer som dukker opp i siste steg.',
    },
  ];

  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Om oss</span>
          <h1>Norsk og thai — Thailand fra innsiden</h1>
          <p>
            Vi er norsk og thai, og startet {site.name} fordi det var altfor
            vanskelig for nordmenn å finne gode opplevelser i Thailand uten å
            gamble på engelske sider med tusenvis av like tilbud.
          </p>
        </div>
      </header>

      <div className="prose-wrap">
        <section className="prose">
          <h2>Hvorfor vi finnes</h2>
          <p>
            De store bookingsidene har alt — og det er nettopp problemet. Du sitter
            med femti nesten like turer, uklare vilkår, priser i tre valutaer og en
            kundeservice på andre siden av kloden som svarer om to døgn.
          </p>
          <p>
            Vi gjør det motsatte: et lite, nøye utvalg av turer vi står inne for,
            forklart på norsk, med priser i kroner og folk du kan nå når noe
            skjer. Er du usikker på om en tur passer familien din, spør du oss —
            og får et ærlig svar, også når svaret er «den ville jeg droppet».
          </p>

          <h2>Hvordan vi jobber</h2>
          <p>
            Vi er en formidler. Det betyr at de lokale operatørene i Thailand
            utfører selve turene, mens vi står for utvalget, bestillingen på norsk
            og oppfølgingen. Vi velger operatører etter tre ting: gyldig lisens og
            forsikring, hvordan de behandler både gjester og dyr, og om de faktisk
            leverer det de lover, målt på omdømme og ekte gjesteomtaler.
          </p>

          <h2>Det vi lover deg</h2>
        </section>

        <div className="values">
          {values.map((v) => {
            const I = Icon[v.icon];
            return (
              <div className="value" key={v.t}>
                <span className="value-icon"><I width={24} height={24} /></span>
                <div>
                  <h3>{v.t}</h3>
                  <p>{v.d}</p>
                </div>
              </div>
            );
          })}
        </div>

        <section className="prose">
          <h2>Kontakt oss</h2>
          <p>
            Spørsmål om en tur, en bestilling eller noe helt annet? Send en e-post
            til <a href={`mailto:${site.email}`}>{site.email}</a>, så svarer vi på
            norsk — som regel innen noen timer.
          </p>
        </section>

        <section className="helpbox">
          <Icon.ticket width={30} height={30} />
          <div>
            <h2>Klar for å finne turen din?</h2>
            <p>Se hele utvalget vårt — filtrert på sted, type og pris.</p>
          </div>
          <Link className="btn btn-primary" to="/opplevelser">
            Se opplevelser
          </Link>
        </section>
      </div>
    </>
  );
}
