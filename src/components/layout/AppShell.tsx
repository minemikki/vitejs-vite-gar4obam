import { useEffect } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, Bell, Plus, Command as CmdIcon, Moon, Sun, Flame } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Wordmark } from '@/components/shared/Logo'
import { NAV_ITEMS } from '@/lib/nav'
import { useUI } from '@/store/useUI'
import { useStore } from '@/store/useStore'
import { useT } from '@/hooks/useT'
import { cn } from '@/lib/utils'
import { CommandPalette } from './CommandPalette'
import { NotificationCenter } from './NotificationCenter'
import { QuickAdd } from './QuickAdd'

export function AppShell() {
  const location = useLocation()
  const setCommand = useUI((s) => s.setCommand)
  const setQuickAdd = useUI((s) => s.setQuickAdd)
  const setNotifications = useUI((s) => s.setNotifications)
  const undo = useStore((s) => s.undo)
  const unread = useStore((s) => s.notifications.filter((n) => !n.read).length)
  const gam = useStore((s) => s.gamification)
  const theme = useStore((s) => s.settings.theme)
  const updateSettings = useStore((s) => s.updateSettings)
  const t = useT()

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName) || target.isContentEditable
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommand(true)
        return
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        if (!typing) {
          e.preventDefault()
          undo()
        }
        return
      }
      if (typing) return
      if (e.key === 'q' || e.key === 'n') {
        e.preventDefault()
        setQuickAdd(true)
      }
      if (e.key === '?') setCommand(true)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setCommand, setQuickAdd, undo])

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-border bg-card/60 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center px-5">
          <NavLink to="/">
            <Wordmark />
          </NavLink>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-2 no-scrollbar">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/app'}
              className={({ isActive }) =>
                cn(
                  'group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-secondary"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <Icon
                    name={item.icon}
                    className={cn(
                      'relative z-10 h-[18px] w-[18px]',
                      isActive && 'text-brand-500',
                    )}
                  />
                  <span className="relative z-10">{t('nav.' + item.label)}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        <LevelCard xp={gam.xp} level={gam.level} streak={gam.streak} />
      </aside>

      {/* Main column */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-xl sm:px-6">
          <button
            onClick={() => setCommand(true)}
            className="group flex h-10 flex-1 max-w-md items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 text-sm text-muted-foreground transition-colors hover:border-brand-400/50 hover:bg-secondary"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">{t('shell.search')}</span>
            <kbd className="hidden items-center gap-0.5 rounded border border-border px-1.5 py-0.5 text-[10px] font-semibold sm:flex">
              <CmdIcon className="h-2.5 w-2.5" />K
            </kbd>
          </button>

          <div className="ml-auto flex items-center gap-1.5">
            <button
              onClick={() => updateSettings({ theme: theme === 'dark' ? 'light' : 'dark' })}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
            <button
              onClick={() => setNotifications(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute right-2 top-2 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
                </span>
              )}
            </button>
            <button
              onClick={() => setQuickAdd(true)}
              className="ml-1 hidden h-10 items-center gap-2 rounded-xl bg-brand-500 px-4 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-600 hover:shadow-glow active:scale-95 sm:flex"
            >
              <Plus className="h-4 w-4" /> {t('shell.quickAdd')}
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="mx-auto max-w-[1360px] px-4 pb-28 pt-6 sm:px-6 lg:pb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/80 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
          {NAV_ITEMS.filter((n) => n.primary)
            .slice(0, 2)
            .map((item) => (
              <BottomLink key={item.to} item={item} />
            ))}
          <button
            onClick={() => setQuickAdd(true)}
            className="relative -mt-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-white shadow-glow active:scale-90 transition-transform"
            aria-label="Quick add"
          >
            <Plus className="h-6 w-6" />
          </button>
          {NAV_ITEMS.filter((n) => n.primary)
            .slice(2, 4)
            .map((item) => (
              <BottomLink key={item.to} item={item} />
            ))}
        </div>
      </nav>

      <CommandPalette />
      <NotificationCenter />
      <QuickAdd />
    </div>
  )
}

function BottomLink({ item }: { item: (typeof NAV_ITEMS)[number] }) {
  const t = useT()
  return (
    <NavLink
      to={item.to}
      end={item.to === '/app'}
      className={({ isActive }) =>
        cn(
          'flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[10px] font-medium transition-colors',
          isActive ? 'text-brand-500' : 'text-muted-foreground',
        )
      }
    >
      {({ isActive }) => (
        <>
          <Icon name={item.icon} className={cn('h-5 w-5', isActive && 'scale-110')} />
          {t('nav.' + item.label)}
        </>
      )}
    </NavLink>
  )
}

function LevelCard({ xp, level, streak }: { xp: number; level: number; streak: number }) {
  const t = useT()
  const nextLevelXP = 50 * (level) ** 2
  const prevLevelXP = 50 * (level - 1) ** 2
  const pct = ((xp - prevLevelXP) / (nextLevelXP - prevLevelXP)) * 100
  return (
    <div className="m-3 rounded-2xl border border-border bg-gradient-to-br from-brand-500/10 to-sky/10 p-3.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-xs font-black text-white">
            {level}
          </div>
          <div>
            <p className="text-xs font-bold leading-none">{t('shell.level')} {level}</p>
            <p className="text-[10px] text-muted-foreground">{xp.toLocaleString()} XP</p>
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-500">
          <Flame className="h-3 w-3" />
          <span className="text-xs font-bold">{streak}</span>
        </div>
      </div>
      <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <motion.div
          className="h-full rounded-full brand-gradient"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, pct)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <p className="mt-1.5 text-[10px] text-muted-foreground">
        {Math.max(0, Math.round(nextLevelXP - xp))} {t('shell.xpTo')} {level + 1}
      </p>
    </div>
  )
}
