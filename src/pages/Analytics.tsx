import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Award, Flame } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Badge, Segmented, DeltaPill } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { TrendBars, SavingsLine, DonutChart } from '@/components/charts/Charts'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useT } from '@/hooks/useT'
import {
  monthlyTrend,
  monthSummary,
  categoryBreakdown,
  topCategories,
  largestPurchases,
  dailySpending,
  generateInsights,
} from '@/store/selectors'
import { subMonths, format } from 'date-fns'
import { fmtDate } from '@/lib/date'
import { cn } from '@/lib/utils'

export default function Analytics() {
  const state = useStore()
  const { fmt } = useCurrency()
  const t = useT()
  const [range, setRange] = useState<'6' | '12'>('6')
  const months = Number(range)

  const trend = useMemo(() => monthlyTrend(state, months), [state, months])
  const cur = monthSummary(state)
  const prev = monthSummary(state, subMonths(new Date(), 1))
  const breakdown = useMemo(() => categoryBreakdown(state), [state])
  const top = topCategories(state, 6)
  const largest = largestPurchases(state, 6)
  const heat = useMemo(() => dailySpending(state), [state])
  const insights = generateInsights(state, t)

  const savingsData = trend.map((t) => ({ label: t.label, value: t.savings + Math.max(0, t.net) }))
  const avgIncome = trend.reduce((a, t) => a + t.income, 0) / trend.length
  const avgExpense = trend.reduce((a, t) => a + t.expenses, 0) / trend.length
  const maxHeat = Math.max(...heat.map((h) => h.total), 1)

  // simple linear prediction for next month expenses
  const predict = useMemo(() => {
    const xs = trend.map((_, i) => i)
    const ys = trend.map((t) => t.expenses)
    const n = xs.length
    const sx = xs.reduce((a, b) => a + b, 0)
    const sy = ys.reduce((a, b) => a + b, 0)
    const sxy = xs.reduce((a, x, i) => a + x * ys[i], 0)
    const sxx = xs.reduce((a, x) => a + x * x, 0)
    const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx || 1)
    const intercept = (sy - slope * sx) / n
    return Math.max(0, slope * n + intercept)
  }, [trend])

  const delta = (a: number, b: number) => (b > 0 ? ((a - b) / b) * 100 : 0)

  return (
    <div>
      <PageHeader
        title={t('an.title')}
        subtitle={t('an.sub')}
        actions={
          <Segmented<'6' | '12'>
            options={[
              { value: '6', label: t('an.months6') },
              { value: '12', label: t('an.months12') },
            ]}
            value={range}
            onChange={setRange}
          />
        }
      />

      {/* KPIs */}
      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <KPI label={t('an.avgIncome')} value={fmt(avgIncome)} icon="TrendingUp" delta={delta(cur.income, prev.income)} />
        <KPI label={t('an.avgSpend')} value={fmt(avgExpense)} icon="TrendingDown" delta={delta(cur.expenses, prev.expenses)} />
        <KPI label={t('an.avgSavingsRate')} value={`${(trend.reduce((a, tp) => a + (tp.income > 0 ? ((tp.savings + Math.max(0, tp.net)) / tp.income) * 100 : 0), 0) / trend.length).toFixed(0)}%`} icon="PiggyBank" />
        <KPI label={t('an.predictedSpend')} value={fmt(predict)} icon="Sparkles" tone />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Income vs expenses */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div><CardTitle>{t('an.incomeVsExpenses')}</CardTitle><p className="text-sm text-muted-foreground">{t('an.monthlyComparison')}</p></div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> {t('dash.income')}</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-sky" /> {t('dash.expenses')}</span>
            </div>
          </CardHeader>
          <CardContent><TrendBars data={trend} fmt={(n) => fmt(n)} /></CardContent>
        </Card>

        {/* Category donut */}
        <Card>
          <CardHeader><CardTitle>{t('an.categoryBreakdown')}</CardTitle><p className="text-sm text-muted-foreground">{t('dash.thisMonth')}</p></CardHeader>
          <CardContent>
            <DonutChart data={breakdown.slice(0, 7).map((b) => ({ name: b.name, value: b.total, color: b.color }))} fmt={(n) => fmt(n)}
              center={<><span className="text-xs text-muted-foreground">Categories</span><span className="font-display text-xl font-black">{breakdown.length}</span></>} />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Savings growth */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>{t('an.savingsGrowth')}</CardTitle><p className="text-sm text-muted-foreground">{t('an.savingsGrowthSub')}</p></CardHeader>
          <CardContent><SavingsLine data={savingsData} fmt={(n) => fmt(n)} /></CardContent>
        </Card>

        {/* Top categories */}
        <Card>
          <CardHeader><CardTitle>{t('an.topCategories')}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {top.map((c, i) => (
              <div key={c.categoryId} className="flex items-center gap-3">
                <span className="w-4 text-xs font-bold text-muted-foreground">{i + 1}</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${c.color}1a`, color: c.color }}><Icon name={c.icon} className="h-4 w-4" /></span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                    <motion.div className="h-full rounded-full" style={{ background: c.color }} initial={{ width: 0 }} animate={{ width: `${c.pct}%` }} transition={{ duration: 0.8, delay: i * 0.05 }} />
                  </div>
                </div>
                <span className="text-sm font-bold tabular-nums">{fmt(c.total, { compact: true })}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Spending heatmap */}
      <Card className="mt-4">
        <CardHeader><CardTitle>{t('an.heatmap')}</CardTitle><p className="text-sm text-muted-foreground">{t('an.heatmapSub')} · {format(new Date(), 'MMMM yyyy')}</p></CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {heat.map((cell) => {
              const intensity = cell.total / maxHeat
              return (
                <div
                  key={cell.date}
                  title={`${fmtDate(cell.date, 'd MMM')}: ${fmt(cell.total)}`}
                  className="group relative flex h-9 w-9 items-center justify-center rounded-lg text-[10px] font-semibold transition-transform hover:scale-110"
                  style={{
                    backgroundColor: cell.total === 0 ? 'hsl(var(--secondary))' : `rgba(29,185,84,${0.15 + intensity * 0.85})`,
                    color: intensity > 0.5 ? 'white' : 'hsl(var(--muted-foreground))',
                  }}
                >
                  {cell.day}
                </div>
              )
            })}
          </div>
          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            {t('an.less')}
            {[0, 0.25, 0.5, 0.75, 1].map((v) => (
              <span key={v} className="h-3 w-3 rounded" style={{ backgroundColor: v === 0 ? 'hsl(var(--secondary))' : `rgba(29,185,84,${0.15 + v * 0.85})` }} />
            ))}
            {t('an.more')}
          </div>
        </CardContent>
      </Card>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Largest purchases */}
        <Card>
          <CardHeader><CardTitle>{t('an.largestPurchases')}</CardTitle><p className="text-sm text-muted-foreground">{t('dash.thisMonth')}</p></CardHeader>
          <CardContent className="space-y-1">
            {largest.map((t, i) => {
              const cat = state.categories.find((c) => c.id === t.categoryId)
              return (
                <div key={t.id} className="flex items-center gap-3 rounded-xl px-2 py-2 hover:bg-secondary">
                  <span className="w-4 text-xs font-bold text-muted-foreground">{i + 1}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: `${cat?.color ?? '#94a3b8'}1a`, color: cat?.color ?? '#94a3b8' }}><Icon name={cat?.icon ?? 'Receipt'} className="h-4 w-4" /></span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{t.payee}</p><p className="text-xs text-muted-foreground">{fmtDate(t.date, 'd MMM')}</p></div>
                  <span className="text-sm font-bold tabular-nums">{fmt(t.amount)}</span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        {/* Predictions & insights */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2"><Icon name="Sparkles" className="h-4 w-4 text-brand-500" /><CardTitle>{t('an.predictions')}</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {insights.map((ins) => (
              <div key={ins.id} className="flex gap-3 rounded-xl border border-border p-3">
                <span className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-xl', ins.tone === 'positive' ? 'bg-brand-500/15 text-brand-500' : ins.tone === 'warning' ? 'bg-amber-500/15 text-amber-500' : 'bg-sky/15 text-sky')}>
                  <Icon name={ins.icon} className="h-4 w-4" />
                </span>
                <div><p className="text-sm font-semibold">{ins.title}</p><p className="text-xs text-muted-foreground">{ins.body}</p></div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function KPI({ label, value, icon, delta, tone }: { label: string; value: string; icon: string; delta?: number; tone?: boolean }) {
  return (
    <Card className={cn('p-4', tone && 'border-brand-500/30 bg-brand-500/[0.04]')}>
      <div className="flex items-center justify-between">
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', tone ? 'bg-brand-500/15 text-brand-500' : 'bg-secondary text-muted-foreground')}><Icon name={icon} className="h-4 w-4" /></span>
        {delta !== undefined && <DeltaPill value={delta} />}
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-xl font-black tabular-nums">{value}</p>
    </Card>
  )
}
