import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X, CheckCheck, BellOff } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { Button } from '@/components/ui/Button'
import { useUI } from '@/store/useUI'
import { useStore } from '@/store/useStore'
import { useT } from '@/hooks/useT'
import { relativeDay } from '@/lib/date'
import { cn } from '@/lib/utils'

const toneMap: Record<string, string> = {
  bill: 'bg-sky/15 text-sky',
  budget: 'bg-amber-500/15 text-amber-500',
  goal: 'bg-brand-500/15 text-brand-500',
  achievement: 'bg-violet-500/15 text-violet-500',
  insight: 'bg-brand-500/15 text-brand-500',
  system: 'bg-secondary text-muted-foreground',
}

export function NotificationCenter() {
  const open = useUI((s) => s.notificationsOpen)
  const setOpen = useUI((s) => s.setNotifications)
  const notifications = useStore((s) => s.notifications)
  const markRead = useStore((s) => s.markNotificationRead)
  const markAll = useStore((s) => s.markAllNotificationsRead)
  const t = useT()

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[140]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-night/30 backdrop-blur-sm"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col border-l border-border bg-card shadow-float"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div>
                <h2 className="font-display text-lg font-bold">{t('shell.notifications')}</h2>
                <p className="text-xs text-muted-foreground">
                  {notifications.filter((n) => !n.read).length} {t('shell.unread')}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={markAll}>
                  <CheckCheck className="h-4 w-4" /> {t('shell.readAll')}
                </Button>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-20 text-center text-muted-foreground">
                  <BellOff className="h-8 w-8" />
                  <p className="text-sm">{t('shell.caughtUp')}</p>
                </div>
              ) : (
                <div className="space-y-1.5">
                  {notifications.map((n) => (
                    <motion.button
                      key={n.id}
                      layout
                      onClick={() => markRead(n.id)}
                      className={cn(
                        'flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-secondary',
                        !n.read && 'bg-brand-500/[0.06]',
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                          toneMap[n.type],
                        )}
                      >
                        <Icon name={n.icon ?? 'Bell'} className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-2">
                          <span className="truncate text-sm font-semibold">{n.title}</span>
                          {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted-foreground">{n.body}</span>
                        <span className="mt-1 block text-[11px] text-muted-foreground/70">
                          {relativeDay(n.date)}
                        </span>
                      </span>
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
