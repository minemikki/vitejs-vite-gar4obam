import { motion } from 'framer-motion'
import { Icon } from '@/components/ui/Icon'
import { AnimatedNumber } from './AnimatedNumber'
import { DeltaPill } from '@/components/ui/primitives'
import { cn } from '@/lib/utils'

export function StatCard({
  label,
  value,
  format,
  icon,
  tone = 'brand',
  delta,
  sub,
  index = 0,
  spark,
}: {
  label: string
  value: number
  format: (n: number) => string
  icon: string
  tone?: 'brand' | 'accent' | 'danger' | 'warning' | 'violet' | 'neutral'
  delta?: number
  sub?: string
  index?: number
  spark?: number[]
}) {
  const toneStyles: Record<string, string> = {
    brand: 'from-brand-500/15 to-brand-500/0 text-brand-500',
    accent: 'from-sky/15 to-sky/0 text-sky',
    danger: 'from-red-500/15 to-red-500/0 text-red-500',
    warning: 'from-amber-500/15 to-amber-500/0 text-amber-500',
    violet: 'from-violet-500/15 to-violet-500/0 text-violet-500',
    neutral: 'from-secondary to-transparent text-muted-foreground',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-soft transition-all hover:shadow-card hover:-translate-y-0.5"
    >
      <div
        className={cn(
          'absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-br opacity-60 blur-2xl transition-opacity group-hover:opacity-100',
          toneStyles[tone],
        )}
      />
      <div className="relative flex items-start justify-between">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br',
            toneStyles[tone],
          )}
        >
          <Icon name={icon} className="h-5 w-5" />
        </div>
        {delta !== undefined && <DeltaPill value={delta} />}
      </div>
      <p className="relative mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <AnimatedNumber
        value={value}
        format={format}
        className="relative mt-1 block font-display text-2xl font-black tabular-nums"
      />
      {sub && <p className="relative mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      {spark && spark.length > 1 && <Sparkline data={spark} className="mt-3" />}
    </motion.div>
  )
}

function Sparkline({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data, 1)
  const min = Math.min(...data, 0)
  const range = max - min || 1
  const w = 100
  const h = 28
  const pts = data
    .map((d, i) => `${(i / (data.length - 1)) * w},${h - ((d - min) / range) * h}`)
    .join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn('h-7 w-full', className)} preserveAspectRatio="none">
      <polyline
        points={pts}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand-500"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
