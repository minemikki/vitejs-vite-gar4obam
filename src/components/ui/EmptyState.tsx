import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Icon } from './Icon'

export function EmptyState({
  icon = 'Inbox',
  title,
  description,
  action,
}: {
  icon?: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card/50 px-6 py-14 text-center"
    >
      <div className="relative mb-4">
        <div className="absolute inset-0 rounded-2xl bg-brand-500/20 blur-xl" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 text-white shadow-glow">
          <Icon name={icon} className="h-7 w-7" />
        </div>
      </div>
      <h3 className="font-display text-lg font-bold">{title}</h3>
      {description && (
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </motion.div>
  )
}
