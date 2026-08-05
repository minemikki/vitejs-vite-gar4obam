import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import CookieBanner, { useConsent } from './components/CookieBanner.jsx';
import { useSeo, useScrollToTop } from './lib/useSeo.js';

import Home from './pages/Home.jsx';
import Experiences from './pages/Experiences.jsx';
import ExperienceDetail from './pages/ExperienceDetail.jsx';
import Checkout from './pages/Checkout.jsx';
import Faq from './pages/Faq.jsx';
import About from './pages/About.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Cookies from './pages/Cookies.jsx';
import NotFound from './pages/NotFound.jsx';

function Layout() {
  const { open, decide, reopen } = useConsent();
  useSeo();
  useScrollToTop();

  return (
    <>
      <a className="skip-link" href="#innhold">Hopp til innhold</a>
      <Nav />
      <main id="innhold">
        <Outlet />
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
