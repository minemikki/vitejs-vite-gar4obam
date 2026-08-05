import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner, { useConsent } from './components/CookieBanner.jsx';
import { useSeo, useScrollToTop } from './lib/useSeo.js';

// Forsiden og oversikten lastes med en gang — det er der folk lander.
import Home from './pages/Home.jsx';
import Experiences from './pages/Experiences.jsx';
import ExperienceDetail from './pages/ExperienceDetail.jsx';
import NotFound from './pages/NotFound.jsx';

/* Resten hentes først når den trengs. Det holder den første nedlastingen
   liten, og rask innlasting teller både for Google og for konvertering. */
const Checkout = lazy(() => import('./pages/Checkout.jsx'));
const Destination = lazy(() => import('./pages/Destination.jsx'));
const GuideIndex = lazy(() => import('./pages/GuideIndex.jsx'));
const DestinationIndex = lazy(() =>
  import('./pages/GuideIndex.jsx').then((m) => ({ default: m.DestinationIndex }))
);
const Guide = lazy(() => import('./pages/Guide.jsx'));
const TripPlanner = lazy(() => import('./pages/TripPlanner.jsx'));
const Faq = lazy(() => import('./pages/Faq.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const Terms = lazy(() => import('./pages/Terms.jsx'));
const Cookies = lazy(() => import('./pages/Cookies.jsx'));

function Loading() {
  return (
    <div className="routeloading" role="status" aria-live="polite">
      <span className="spinner" aria-hidden="true" />
      <span className="sr-only">Laster siden …</span>
    </div>
  );
}

function Layout() {
  const { open, decide, reopen } = useConsent();
  useSeo();
  useScrollToTop();

  return (
    <>
      <a className="skip-link" href="#innhold">Hopp til innhold</a>
      <Nav />
      <main id="innhold">
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer onOpenConsent={reopen} />
      <CookieBanner open={open} decide={decide} />
    </>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/opplevelser" element={<Experiences />} />
        <Route path="/opplevelser/:slug" element={<ExperienceDetail />} />
        <Route path="/bestill/:slug" element={<Checkout />} />
        <Route path="/reisemal" element={<DestinationIndex />} />
        <Route path="/reisemal/:slug" element={<Destination />} />
        <Route path="/guider" element={<GuideIndex />} />
        <Route path="/guider/:slug" element={<Guide />} />
        <Route path="/min-reise" element={<TripPlanner />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/om-oss" element={<About />} />
        <Route path="/personvern" element={<Privacy />} />
        <Route path="/vilkar" element={<Terms />} />
        <Route path="/informasjonskapsler" element={<Cookies />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
