import type { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

// ---------- Badge ----------
type BadgeTone = 'brand' | 'accent' | 'muted' | 'success' | 'warning' | 'danger'
const badgeTones: Record<BadgeTone, string> = {
  brand: 'bg-brand-500/12 text-brand-600 dark:text-brand-400',
  accent: 'bg-sky/15 text-sky',
  muted: 'bg-secondary text-muted-foreground',
  success: 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400',
  warning: 'bg-amber-500/15 text-amber-600 dark:text-amber-400',
  danger: 'bg-red-500/12 text-red-600 dark:text-red-400',
}
export function Badge({
  tone = 'muted',
  className,
  children,
}: {
  tone?: BadgeTone
  className?: string
  children: ReactNode
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

// ---------- Progress ----------
export function Progress({
  value,
  className,
  barClassName,
  color,
}: {
  value: number
  className?: string
  barClassName?: string
  color?: string
}) {
  return (
    <div className={cn('h-2 w-full overflow-hidden rounded-full bg-secondary', className)}>
      <motion.div
        className={cn('h-full rounded-full bg-brand-500', barClassName)}
        style={color ? { backgroundColor: color } : undefined}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      />
    </div>
  )
}

// ---------- Skeleton ----------
export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-secondary', className)}>
      <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}

// ---------- Switch ----------
export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors focus-ring',
        checked ? 'bg-brand-500' : 'bg-input',
      )}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={cn(
          'inline-block h-5 w-5 rounded-full bg-white shadow-sm',
          checked ? 'ml-5' : 'ml-0.5',
        )}
      />
    </button>
  )
}

// ---------- Segmented control ----------
export function Segmented<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  className?: string
}) {
  return (
    <div className={cn('inline-flex rounded-xl bg-secondary p-1', className)}>
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'relative rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors',
            value === o.value ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {value === o.value && (
            <motion.div
              layoutId={`seg-${options.map((x) => x.value).join()}`}
              className="absolute inset-0 rounded-lg bg-card shadow-soft"
              transition={{ type: 'spring', stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative z-10">{o.label}</span>
        </button>
      ))}
    </div>
  )
}

// ---------- Stat pill ----------
export function DeltaPill({ value, suffix = '%' }: { value: number; suffix?: string }) {
  const positive = value >= 0
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold',
        positive
          ? 'bg-emerald-500/12 text-emerald-600 dark:text-emerald-400'
          : 'bg-red-500/12 text-red-600 dark:text-red-400',
      )}
    >
      {positive ? '↑' : '↓'} {Math.abs(value).toFixed(1)}
      {suffix}
    </span>
  )
}

// ---------- Divider ----------
export function Divider({ className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('h-px w-full bg-border', className)} />
}
