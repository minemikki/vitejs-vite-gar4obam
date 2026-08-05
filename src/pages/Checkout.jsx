import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { getExperience } from '../data.js';
import { Scene, Icon } from '../scenes.jsx';
import { nok, longDate, todayISO, bookingRef } from '../lib/format.js';
import { payments, site } from '../config.js';
import { write, KEYS } from '../lib/storage.js';
import NotFound from './NotFound.jsx';

/*
 * Vi tar ALDRI imot kortnummer her. To moduser:
 *
 *  1. Betalingsmodus  — når det finnes en Stripe-lenke. Vi samler
 *     bestillingsdetaljer og sender kunden til Stripes egen betalingsside.
 *     Kortdata treffer aldri vår kode, så vi slipper PCI-krav.
 *
 *  2. Forespørselsmodus — når Stripe ikke er koblet på ennå. Kunden sender
 *     en uforpliktende forespørsel, og du bekrefter og fakturerer manuelt.
 */

const STEPS = ['Detaljer', 'Kontakt', 'Bekreft'];

function Stepper({ step }) {
  return (
    <ol className="stepper" aria-label="Fremdrift">
      {STEPS.map((label, i) => {
        const state = i < step ? 'done' : i === step ? 'now' : 'todo';
        return (
          <li key={label} className={`step step--${state}`} aria-current={i === step ? 'step' : undefined}>
            <span className="step-dot">
              {i < step ? <Icon.check width={14} height={14} /> : i + 1}
            </span>
            <span className="step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

function Summary({ exp, form, total }) {
  return (
    <aside className="sumbox" aria-label="Oppsummering">
      <div className="sumbox-media">
        <Scene name={exp.scene} uid={`co-${exp.id}`} align="bottom" />
      </div>
      <div className="sumbox-body">
        <h2>{exp.title}</h2>
        <p className="sumbox-place">
          <Icon.pin width={14} height={14} /> {exp.place} · {exp.duration}
        </p>

        <dl className="sumbox-lines">
          <div>
            <dt>Dato</dt>
            <dd>{form.date ? longDate(form.date) : <em>ikke valgt</em>}</dd>
          </div>
          <div>
            <dt>Reisende</dt>
            <dd>{form.people} {Number(form.people) === 1 ? 'person' : 'personer'}</dd>
          </div>
          <div>
            <dt>Pris per person</dt>
            <dd>{nok(exp.priceNOK)}</dd>
          </div>
        </dl>

        <div className="sumbox-total">
          <span>Å betale</span>
          <strong>{nok(total)}</strong>
        </div>
        <p className="sumbox-fine">
          <Icon.shield width={14} height={14} /> Gratis avbestilling inntil 24 timer før start
        </p>
      </div>
    </aside>
  );
}

export default function Checkout() {
  const { slug } = useParams();
  const [params] = useSearchParams();
  const exp = getExperience(slug);

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(null);
  const [form, setForm] = useState({
    date: params.get('dato') || '',
    people: params.get('antall') || '2',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    hotel: '',
    notes: '',
    terms: false,
  });

  const total = useMemo(
    () => (exp ? exp.priceNOK * Math.max(1, Number(form.people) || 1) : 0),
    [exp, form.people]
  );

  if (!exp) return <NotFound />;

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const paymentUrl = exp.paymentUrl || payments.fallbackPaymentUrl;
  const canPay = payments.enabled && !!paymentUrl;

  const submit = (e) => {
    e.preventDefault();
    const ref = bookingRef();
    // Lagre lokalt så kunden ikke mister detaljene hvis noe ryker underveis.
    write(KEYS.draftBooking, { ref, slug: exp.slug, ...form, total, at: Date.now() });

    if (canPay) {
      // Send kunden til Stripes betalingsside. Referansen følger med slik at
      // du kan koble innbetalingen til riktig bestilling.
      const url = new URL(paymentUrl);
      url.searchParams.set('client_reference_id', ref);
      if (form.email) url.searchParams.set('prefilled_email', form.email);
      window.location.href = url.toString();
      return;
    }
    setDone(ref);
  };

  if (done) {
    return (
      <div className="checkout-done">
        <div className="done-card">
          <div className="done-check"><Icon.check width={34} height={34} /></div>
          <h1>Takk, {form.firstName || 'reisende'}!</h1>
          <p className="done-lead">
            Vi har mottatt forespørselen din om <strong>{exp.title}</strong>
            {form.date ? ` den ${longDate(form.date)}` : ''}.
          </p>
          <div className="done-ref">
            <span>Referanse</span>
            <strong>{done}</strong>
          </div>
          <p>
            Du får en bekreftelse på <strong>{form.email}</strong> med ledige
            plasser og betalingsinformasjon — vanligvis innen én time. Ingenting
            er belastet ennå.
          </p>
          <div className="done-actions">
            <Link to="/opplevelser" className="btn btn-primary">Se flere opplevelser</Link>
            <a className="btn btn-outline" href={`mailto:${site.email}?subject=Bestilling%20${done}`}>
              <Icon.mail width={17} height={17} /> Kontakt oss
            </a>
          </div>
        </div>
      </div>
    );
  }

  const step0Valid = form.date && Number(form.people) >= 1;
  const step1Valid = form.firstName && form.lastName && form.email;

  return (
    <div className="checkout">
      <div className="checkout-head">
        <Link to={`/opplevelser/${exp.slug}`} className="backlink">
          <Icon.back width={17} height={17} /> Tilbake til opplevelsen
        </Link>
        <h1>Fullfør bestillingen</h1>
        <Stepper step={step} />
      </div>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={submit}>
          {step === 0 && (
            <section className="fieldset">
              <h2>Når vil du reise?</h2>
              <div className="field-row">
                <label className="field">
                  <span>Dato</span>
                  <input type="date" required min={todayISO()} value={form.date} onChange={set('date')} />
                </label>
                <label className="field">
                  <span>Antall reisende</span>
                  <input type="number" min="1" max="20" required value={form.people} onChange={set('people')} />
                </label>
              </div>
              <label className="field">
                <span>Hotell eller hentested <em>(valgfritt)</em></span>
                <input
                  type="text"
                  placeholder="F.eks. Novotel Sukhumvit"
                  value={form.hotel}
                  onChange={set('hotel')}
                />
              </label>
              <div className="form-nav">
                <button
                  type="button"
                  className="btn btn-gold btn-lg"
                  disabled={!step0Valid}
                  onClick={() => setStep(1)}
                >
                  Neste <Icon.arrow width={18} height={18} />
                </button>
              </div>
            </section>
          )}

          {step === 1 && (
            <section className="fieldset">
              <h2>Hvem booker?</h2>
              <div className="field-row">
                <label className="field">
                  <span>Fornavn</span>
                  <input type="text" required autoComplete="given-name" value={form.firstName} onChange={set('firstName')} />
                </label>
                <label className="field">
                  <span>Etternavn</span>
                  <input type="text" required autoComplete="family-name" value={form.lastName} onChange={set('lastName')} />
                </label>
              </div>
              <label className="field">
                <span>E-post</span>
                <input type="email" required autoComplete="email" placeholder="ola@epost.no" value={form.email} onChange={set('email')} />
                <small>Hit sender vi bekreftelsen og billetten.</small>
              </label>
              <label className="field">
                <span>Telefon <em>(valgfritt)</em></span>
                <input type="tel" autoComplete="tel" placeholder="+47 …" value={form.phone} onChange={set('phone')} />
                <small>Brukes kun hvis guiden må nå deg samme dag.</small>
              </label>
              <label className="field">
                <span>Melding til oss <em>(valgfritt)</em></span>
                <textarea
                  rows="3"
                  placeholder="Allergier, barn i følget, ønsket hentetid …"
                  value={form.notes}
                  onChange={set('notes')}
                />
              </label>
              <div className="form-nav">
                <button type="button" className="btn btn-outline" onClick={() => setStep(0)}>
                  <Icon.back width={17} height={17} /> Tilbake
                </button>
                <button type="button" className="btn btn-gold btn-lg" disabled={!step1Valid} onClick={() => setStep(2)}>
                  Neste <Icon.arrow width={18} height={18} />
                </button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="fieldset">
              <h2>Se over og bekreft</h2>

              <dl className="review">
                <div><dt>Opplevelse</dt><dd>{exp.title}</dd></div>
                <div><dt>Dato</dt><dd>{longDate(form.date)}</dd></div>
                <div><dt>Reisende</dt><dd>{form.people}</dd></div>
                <div><dt>Navn</dt><dd>{form.firstName} {form.lastName}</dd></div>
                <div><dt>E-post</dt><dd>{form.email}</dd></div>
                {form.phone && <div><dt>Telefon</dt><dd>{form.phone}</dd></div>}
                {form.hotel && <div><dt>Hentested</dt><dd>{form.hotel}</dd></div>}
                {form.notes && <div><dt>Melding</dt><dd>{form.notes}</dd></div>}
              </dl>

              <label className="checkline">
                <input type="checkbox" required checked={form.terms} onChange={set('terms')} />
                <span>
                  Jeg har lest og godtar <Link to="/vilkar">bestillingsvilkårene</Link> og{' '}
                  <Link to="/personvern">personvernerklæringen</Link>.
                </span>
              </label>

              {canPay ? (
                <p className="paynote">
                  <Icon.lock width={16} height={16} />
                  Du sendes videre til vår betalingspartner Stripe for sikker
                  betaling. Kortopplysningene dine lagres aldri hos oss.
                </p>
              ) : (
                <p className="paynote paynote--info">
                  <Icon.info width={16} height={16} />
                  <span>
                    <strong>Uforpliktende forespørsel.</strong> Nettbetaling er ikke
                    aktivert ennå, så ingenting belastes nå. Vi bekrefter plassen
                    på e-post og sender betalingsinformasjon.
                  </span>
                </p>
              )}

              <div className="form-nav">
                <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>
                  <Icon.back width={17} height={17} /> Tilbake
                </button>
                <button type="submit" className="btn btn-gold btn-lg" disabled={!form.terms}>
                  {canPay ? (
                    <><Icon.card width={18} height={18} /> Til betaling — {nok(total)}</>
                  ) : (
                    <><Icon.mail width={18} height={18} /> Send forespørsel</>
                  )}
                </button>
              </div>

              {canPay && (
                <p className="paymethods">
                  {payments.methods.join(' · ')}
                </p>
              )}
            </section>
          )}
        </form>

        <Summary exp={exp} form={form} total={total} />
      </div>
    </div>
  );
}
