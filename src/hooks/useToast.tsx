import { createContext, useCallback, useContext, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, AlertTriangle, Undo2, X } from 'lucide-react'

type ToastTone = 'success' | 'info' | 'warning'
interface Toast {
  id: string
  title: string
  description?: string
  tone: ToastTone
  action?: { label: string; onClick: () => void }
}

interface ToastCtx {
  toast: (t: Omit<Toast, 'id'>) => void
}

const Ctx = createContext<ToastCtx | null>(null)

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
}
const iconColors = {
  success: 'text-brand-500',
  info: 'text-sky',
  warning: 'text-amber-500',
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counter = useRef(0)

  const toast = useCallback((t: Omit<Toast, 'id'>) => {
    const id = `toast_${counter.current++}`
    setToasts((prev) => [...prev, { ...t, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id))
    }, 4200)
  }, [])

  const dismiss = (id: string) => setToasts((prev) => prev.filter((x) => x.id !== id))

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      {createPortal(
        <div className="fixed bottom-4 right-4 z-[200] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
          <AnimatePresence>
            {toasts.map((t) => {
              const I = icons[t.tone]
              return (
                <motion.div
                  key={t.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 40, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  className="glass-strong flex items-start gap-3 rounded-2xl border border-border p-3.5 shadow-float"
                >
                  <I className={`mt-0.5 h-5 w-5 shrink-0 ${iconColors[t.tone]}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold leading-tight">{t.title}</p>
                    {t.description && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{t.description}</p>
                    )}
                  </div>
                  {t.action && (
                    <button
                      onClick={() => {
                        t.action!.onClick()
                        dismiss(t.id)
                      }}
                      className="flex shrink-0 items-center gap-1 rounded-lg bg-secondary px-2 py-1 text-xs font-semibold hover:bg-muted transition-colors"
                    >
                      <Undo2 className="h-3 w-3" />
                      {t.action.label}
                    </button>
                  )}
                  <button
                    onClick={() => dismiss(t.id)}
                    className="shrink-0 rounded-md p-0.5 text-muted-foreground hover:text-foreground"
                    aria-label="Dismiss"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>,
        document.body,
      )}
    </Ctx.Provider>
  )
}

export function useToast() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
