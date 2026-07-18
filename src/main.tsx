import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// Hash routing lets the app run from any static host path (e.g. a bundled
// single-file build). Clean history routing is used for normal deployments.
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>,
)
