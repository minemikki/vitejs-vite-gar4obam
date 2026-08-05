import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Accordion from '../components/Accordion.jsx';
import { Icon } from '../scenes.jsx';
import { site, payments } from '../config.js';
import { faqLd } from '../lib/meta.js';

export const FAQ_GROUPS = [
  {
    title: 'Bestilling og betaling',
    items: [
      {
        q: 'Hvordan booker jeg en opplevelse?',
        a: 'Velg opplevelsen du vil ha, trykk «Se detaljer», og fyll inn dato og antall reisende. Du går gjennom tre korte steg og får bekreftelse på e-post. Hele veien er på norsk.',
      },
      {
        q: 'Kan jeg betale i norske kroner?',
        a: 'Ja. Alle priser vises og belastes i norske kroner, så du slipper valutapåslag fra banken og vet nøyaktig hva turen koster før du bestiller.',
      },
      {
        q: 'Hvilke betalingsmåter kan jeg bruke?',
        a: `Vi tar imot ${payments.methods.join(', ')}. Selve betalingen håndteres av vår betalingspartner, og kortopplysningene dine lagres aldri hos oss.`,
      },
      {
        q: 'Når blir jeg belastet?',
        a: 'Du belastes når bestillingen er bekreftet. Er en tur fullbooket på datoen du ønsker, kontakter vi deg med alternative datoer før noe trekkes.',
      },
      {
        q: 'Får jeg kvittering og billett?',
        a: 'Ja. Bekreftelsen kommer på e-post umiddelbart, med bestillingsreferanse, oppmøtested og kvittering. Den kan du vise fram på mobilen — du trenger ikke skrive den ut.',
      },
    ],
  },
  {
    title: 'Endring og avbestilling',
    items: [
      {
        q: 'Kan jeg avbestille?',
        a: 'De aller fleste opplevelsene har gratis avbestilling inntil 24 timer før start. Avbestillingsfristen står alltid oppført på den enkelte opplevelsen før du bestiller.',
      },
      {
        q: 'Kan jeg endre dato etter at jeg har booket?',
        a: 'Ja, så lenge det er ledig plass på den nye datoen og det er mer enn 24 timer til start. Send oss en e-post med bestillingsreferansen, så ordner vi det uten gebyr.',
      },
      {
        q: 'Hva skjer hvis turen avlyses på grunn av vær?',
        a: 'Blir turen avlyst av operatøren — for eksempel ved uvær eller stengt farvann — får du valget mellom ny dato eller full refusjon. Det koster deg ingenting.',
      },
      {
        q: 'Hva om jeg blir syk?',
        a: 'Gi oss beskjed så tidlig du kan. Innenfor avbestillingsfristen refunderer vi alt. Utenfor fristen hjelper vi deg med dokumentasjon til reiseforsikringen din.',
      },
    ],
  },
  {
    title: 'På turen',
    items: [
      {
        q: 'Snakker guiden norsk?',
        a: 'På enkelte turer, ja — det står tydelig på hver opplevelse hvilke språk som tilbys. Der guiden snakker engelsk, er kundeservicen vår likevel alltid på norsk, både før, under og etter turen.',
      },
      {
        q: 'Blir jeg hentet på hotellet?',
        a: 'På mange turer er henting inkludert, og da står det «Henting inkl.» på opplevelsen. Oppgi hotellet ditt i bestillingen, så bekrefter vi hentetidspunktet i e-posten.',
      },
      {
        q: 'Passer turene for barn?',
        a: 'Mange gjør det, og de er merket «Familievennlig». Har du små barn, skriv det i meldingsfeltet ved bestilling, så sier vi fra hvis noe ved turen ikke egner seg.',
      },
      {
        q: 'Er turene trygge?',
        a: 'Vi velger kun operatører med gyldig lisens, forsikring og godt sikkerhetsrykte. Aktiviteter som zipline og båtturer bruker sertifisert utstyr og instruktører.',
      },
      {
        q: 'Hva med dyrevelferd?',
        a: 'Vi selger ikke turer med elefantridning eller andre aktiviteter vi mener er dårlige for dyra. Elefantopplevelsene våre er reservater der dyra ikke rides.',
      },
    ],
  },
  {
    title: 'Om oss',
    items: [
      {
        q: 'Hvem står bak Andaman?',
        a: 'Vi er norsktalende og bor i Thailand. Vi kvalitetssjekker turene selv og velger bare dem vi ville tatt med vår egen familie på. Les mer på Om oss-siden.',
      },
      {
        q: 'Er dere et reisebyrå eller en formidler?',
        a: 'Vi formidler opplevelser fra lokale operatører i Thailand. Det betyr at operatøren utfører selve turen, mens vi står for utvalg, booking på norsk og kundeservice hele veien.',
      },
      {
        q: 'Hvordan kontakter jeg dere?',
        a: `Send en e-post til ${site.email}, så svarer vi på norsk — som regel innen noen timer. Har du en bestilling fra før, ta med bestillingsreferansen.`,
      },
    ],
  },
];

const ALL_ITEMS = FAQ_GROUPS.flatMap((g) => g.items);

export default function Faq() {
  // FAQ-strukturert data gjør at svarene kan vises rett i Google.
  useEffect(() => {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.dataset.faqLd = 'true';
    s.textContent = JSON.stringify(faqLd(ALL_ITEMS));
    document.head.appendChild(s);
    return () => s.remove();
  }, []);

  return (
    <>
      <header className="page-head">
        <div className="page-head-inner">
          <span className="kicker">Spørsmål og svar</span>
          <h1>Det folk lurer på før de booker</h1>
          <p>
            Finner du ikke svaret her? Send oss en e-post — vi svarer på norsk,
            som regel innen noen timer.
          </p>
        </div>
      </header>

      <div className="prose-wrap">
        {FAQ_GROUPS.map((g) => (
          <section className="faq-group" key={g.title}>
            <h2>{g.title}</h2>
            <Accordion items={g.items} defaultOpen={-1} />
          </section>
        ))}

        <section className="helpbox">
          <Icon.chat width={30} height={30} />
          <div>
            <h2>Fikk du ikke svar?</h2>
            <p>Vi hjelper deg gjerne før du bestiller — spør om hva som helst.</p>
          </div>
          <a className="btn btn-primary" href={`mailto:${site.email}`}>
            <Icon.mail width={17} height={17} /> Send e-post
          </a>
        </section>

        <p className="prose-back">
          <Link to="/opplevelser">← Tilbake til alle opplevelser</Link>
        </p>
      </div>
    </>
  );
}
