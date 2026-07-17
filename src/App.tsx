import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useTheme } from '@/hooks/useTheme'
import { ToastProvider } from '@/hooks/useToast'
import { AppShell } from '@/components/layout/AppShell'
import { PageLoader } from '@/components/layout/PageLoader'

const Landing = lazy(() => import('@/pages/Landing'))
const Dashboard = lazy(() => import('@/pages/Dashboard'))
const Transactions = lazy(() => import('@/pages/Transactions'))
const Budgets = lazy(() => import('@/pages/Budgets'))
const Goals = lazy(() => import('@/pages/Goals'))
const Analytics = lazy(() => import('@/pages/Analytics'))
const Debt = lazy(() => import('@/pages/Debt'))
const Subscriptions = lazy(() => import('@/pages/Subscriptions'))
const Bills = lazy(() => import('@/pages/Bills'))
const Calendar = lazy(() => import('@/pages/Calendar'))
const Categories = lazy(() => import('@/pages/Categories'))
const Settings = lazy(() => import('@/pages/Settings'))

export default function App() {
  useTheme()
  return (
    <ToastProvider>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppShell />}>
            <Route index element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="budgets" element={<Budgets />} />
            <Route path="goals" element={<Goals />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="debt" element={<Debt />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="bills" element={<Bills />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="categories" element={<Categories />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </Suspense>
    </ToastProvider>
  )
}
