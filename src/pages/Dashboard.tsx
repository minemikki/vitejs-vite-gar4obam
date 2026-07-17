import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge, Progress } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { StatCard } from '@/components/shared/StatCard'
import { Gauge } from '@/components/shared/Gauge'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { CashflowChart, DonutChart } from '@/components/charts/Charts'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useT } from '@/hooks/useT'
import {
  monthSummary,
  monthlyTrend,
  netWorth,
  totalSaved,
  totalDebt,
  financialHealth,
  monthlyScore,
  categoryBreakdown,
  generateInsights,
  upcomingBillsTotal,
  subscriptionMonthly,
} from '@/store/selectors'
import { subMonths } from 'date-fns'
import { relativeDay } from '@/lib/date'
import { cn } from '@/lib/utils'

export default function Dashboard() {
  const state = useStore()
  const { fmt } = useCurrency()
  const t = useT()

  const cur = useMemo(() => monthSummary(state), [state])
  const prev = useMemo(() => monthSummary(state, subMonths(new Date(), 1)), [state])
  const trend = useMemo(() => monthlyTrend(state, 6), [state])
  const health = useMemo(() => financialHealth(state), [state])
  const score = useMemo(() => monthlyScore(state), [state])
  const breakdown = useMemo(() => categoryBreakdown(state).slice(0, 6), [state])
  const insights = useMemo(() => generateInsights(state, t), [state, t])
  const nw = netWorth(state)
  const saved = totalSaved(state)
  const debt = totalDebt(state)
  const bills = upcomingBillsTotal(state)
  const subs = subscriptionMonthly(state)

  const delta = (a: number, b: number) => (b > 0 ? ((a - b) / b) * 100 : 0)
  const remaining = cur.income - cur.expenses - cur.savings

  const hour = new Date().getHours()
  const greeting =
    hour < 5 ? t('dash.greetingNight') : hour < 12 ? t('dash.greetingMorning') : hour < 18 ? t('dash.greetingAfternoon') : t('dash.greetingEvening')

  const recent = state.transactions.slice(0, 6)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{greeting},</p>
          <h1 className="font-display text-2xl font-black tracking-tight sm:text-3xl">
            {state.settings.name} 👋
          </h1>
        </div>
        <ScoreBanner score={score} />
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          index={0}
          label={t('dash.income')}
          value={cur.income}
          format={(n) => fmt(n)}
          icon="TrendingUp"
          tone="brand"
          delta={delta(cur.income, prev.income)}
          spark={trend.map((tp) => tp.income)}
        />
        <StatCard
          index={1}
          label={t('dash.expenses')}
          value={cur.expenses}
          format={(n) => fmt(n)}
          icon="TrendingDown"
          tone="accent"
          delta={delta(cur.expenses, prev.expenses)}
          spark={trend.map((tp) => tp.expenses)}
        />
        <StatCard
          index={2}
          label={t('dash.savedThisMonth')}
          value={cur.savings}
          format={(n) => fmt(n)}
          icon="PiggyBank"
          tone="violet"
          delta={delta(cur.savings, prev.savings)}
        />
        <StatCard
          index={3}
          label={t('dash.remainingBudget')}
          value={remaining}
          format={(n) => fmt(n)}
          icon="Wallet"
          tone={remaining >= 0 ? 'brand' : 'danger'}
          sub={`${cur.savingsRate.toFixed(0)}% ${t('common.savingsRate')}`}
        />
      </div>

      {/* Second row: net worth, savings, debt, bills */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard index={4} label={t('dash.netWorth')} value={nw} format={(n) => fmt(n)} icon="Gem" tone="brand" />
        <StatCard index={5} label={t('dash.totalSaved')} value={saved} format={(n) => fmt(n)} icon="Landmark" tone="violet" />
        <StatCard index={6} label={t('dash.totalDebt')} value={debt} format={(n) => fmt(n)} icon="CreditCard" tone="danger" />
        <StatCard index={7} label={t('dash.subscriptions')} value={subs} format={(n) => fmt(n)} icon="Repeat" tone="warning" sub={t('common.perMonth')} />
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Cashflow */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{t('dash.cashFlow')}</CardTitle>
              <p className="text-sm text-muted-foreground">{t('dash.cashFlowSub')}</p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> {t('dash.income')}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-sky" /> {t('dash.expenses')}
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <CashflowChart data={trend} fmt={(n) => fmt(n)} />
          </CardContent>
        </Card>

        {/* Financial health */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('dash.financialHealth')}</CardTitle>
            <Badge tone="brand">{t('grade.' + health.grade)}</Badge>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Gauge value={health.score} label="/ 100" sublabel={t('dash.overallScore')} size={200} />
            <div className="mt-4 grid w-full grid-cols-1 gap-2">
              <HealthRow label={t('health.savingsRate')} score={health.savingsRate.score} max={25} />
              <HealthRow label={t('health.budgetAdherence')} score={health.budgetAdherence.score} max={20} />
              <HealthRow label={t('health.debtRatio')} score={health.debtRatio.score} max={20} />
              <HealthRow label={t('health.emergencyFund')} score={health.emergencyFund.score} max={20} />
              <HealthRow label={t('health.incomeStability')} score={health.incomeStability.score} max={15} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights + categories */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand-500" />
            <h2 className="font-display text-lg font-bold">{t('dash.aiInsights')}</h2>
            <Badge tone="accent">Beta</Badge>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {insights.slice(0, 4).map((ins, i) => (
              <InsightCard key={ins.id} insight={ins} index={i} />
            ))}
          </div>
        </div>

        {/* Category donut */}
        <Card>
          <CardHeader>
            <CardTitle>{t('dash.spendingByCategory')}</CardTitle>
            <p className="text-sm text-muted-foreground">{t('dash.thisMonth')}</p>
          </CardHeader>
          <CardContent>
            <DonutChart
              data={breakdown.map((b) => ({ name: b.name, value: b.total, color: b.color }))}
              fmt={(n) => fmt(n)}
              center={
                <>
                  <span className="text-xs text-muted-foreground">{t('dash.total')}</span>
                  <AnimatedNumber
                    value={cur.expenses}
                    format={(n) => fmt(n, { compact: true })}
                    className="font-display text-xl font-black"
                  />
                </>
              }
            />
            <div className="mt-3 space-y-1.5">
              {breakdown.slice(0, 4).map((b) => (
                <div key={b.categoryId} className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: b.color }} />
                  <span className="flex-1 truncate">{b.name}</span>
                  <span className="tabular-nums text-muted-foreground">{b.pct.toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom row: recent + goals + bills */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent transactions */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{t('dash.recentActivity')}</CardTitle>
            <Link to="/app/transactions">
              <Button variant="ghost" size="sm">
                {t('common.viewAll')} <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-1">
            {recent.map((t, i) => {
              const cat = state.categories.find((c) => c.id === t.categoryId)
              return (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-secondary"
                >
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{ background: `${cat?.color ?? '#94a3b8'}1a`, color: cat?.color ?? '#94a3b8' }}
                  >
                    <Icon name={cat?.icon ?? 'Receipt'} className="h-4 w-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{t.payee}</p>
                    <p className="text-xs text-muted-foreground">
                      {cat?.name ?? 'Uncategorized'} · {relativeDay(t.date)}
                    </p>
                  </div>
                  <span
                    className={cn(
                      'text-sm font-bold tabular-nums',
                      t.type === 'income' ? 'text-brand-600 dark:text-brand-400' : 'text-foreground',
                    )}
                  >
                    {t.type === 'income' ? '+' : t.type === 'expense' ? '−' : ''}
                    {fmt(t.amount)}
                  </span>
                </motion.div>
              )
            })}
          </CardContent>
        </Card>

        {/* Goals + bills stacked */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('dash.topGoals')}</CardTitle>
              <Link to="/app/goals" className="text-xs font-semibold text-brand-500">
                {t('common.all')}
              </Link>
            </CardHeader>
            <CardContent className="space-y-3">
              {state.goals.slice(0, 3).map((g) => {
                const pct = (g.saved / g.target) * 100
                return (
                  <div key={g.id}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1.5 font-medium">
                        <Icon name={g.icon} className="h-3.5 w-3.5" style={{ color: g.color }} />
                        {g.name}
                      </span>
                      <span className="text-xs tabular-nums text-muted-foreground">
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                    <Progress value={pct} color={g.color} />
                  </div>
                )
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t('dash.upcomingBills')}</CardTitle>
              <span className="text-sm font-bold tabular-nums text-danger">{fmt(bills)}</span>
            </CardHeader>
            <CardContent className="space-y-1">
              {state.bills
                .filter((b) => !b.paid)
                .slice(0, 3)
                .map((b) => (
                  <div key={b.id} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-secondary">
                    <span className="font-medium">{b.name}</span>
                    <span className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">{relativeDay(b.dueDate)}</span>
                      <span className="tabular-nums font-semibold">{fmt(b.amount)}</span>
                    </span>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function ScoreBanner({ score }: { score: number }) {
  const t = useT()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-4 rounded-2xl border border-border bg-gradient-to-r from-brand-500/10 via-card to-sky/10 px-5 py-3.5"
    >
      <div className="relative flex h-14 w-14 items-center justify-center">
        <svg viewBox="0 0 44 44" className="h-14 w-14 -rotate-90">
          <circle cx="22" cy="22" r="18" fill="none" stroke="hsl(var(--secondary))" strokeWidth="5" />
          <motion.circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="#1DB954"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 18}
            initial={{ strokeDashoffset: 2 * Math.PI * 18 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 18 * (1 - score / 100) }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <span className="absolute font-display text-sm font-black">{score}</span>
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t('dash.monthlyScore')}
        </p>
        <p className="text-sm font-bold">
          {score >= 80 ? t('dash.onFire') : score >= 60 ? t('dash.onTrack') : t('dash.roomToGrow')}
        </p>
      </div>
    </motion.div>
  )
}

function HealthRow({ label, score, max }: { label: string; score: number; max: number }) {
  const pct = (score / max) * 100
  return (
    <div className="flex items-center gap-2">
      <span className="w-28 shrink-0 text-xs text-muted-foreground">{label}</span>
      <Progress value={pct} className="h-1.5 flex-1" />
      <span className="w-10 shrink-0 text-right text-xs font-semibold tabular-nums">
        {score}/{max}
      </span>
    </div>
  )
}

function InsightCard({ insight, index }: { insight: ReturnType<typeof generateInsights>[number]; index: number }) {
  const tones = {
    positive: 'border-brand-500/30 bg-brand-500/[0.05]',
    warning: 'border-amber-500/30 bg-amber-500/[0.05]',
    neutral: 'border-sky/30 bg-sky/[0.05]',
  }
  const iconTones = {
    positive: 'bg-brand-500/15 text-brand-500',
    warning: 'bg-amber-500/15 text-amber-500',
    neutral: 'bg-sky/15 text-sky',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06 }}
      className={cn('rounded-2xl border p-4', tones[insight.tone])}
    >
      <div className="flex items-start justify-between">
        <span className={cn('flex h-9 w-9 items-center justify-center rounded-xl', iconTones[insight.tone])}>
          <Icon name={insight.icon} className="h-4 w-4" />
        </span>
        {insight.metric && (
          <span className="font-display text-lg font-black tabular-nums">{insight.metric}</span>
        )}
      </div>
      <p className="mt-3 text-sm font-bold leading-snug">{insight.title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{insight.body}</p>
    </motion.div>
  )
}
