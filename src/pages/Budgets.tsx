import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Label, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge, Progress, Segmented } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useT } from '@/hooks/useT'
import { categoryBreakdown } from '@/store/selectors'
import { cn } from '@/lib/utils'
import type { BudgetPeriod } from '@/types'
import { getDate, getDaysInMonth } from 'date-fns'

export default function Budgets() {
  const state = useStore()
  const budgets = useStore((s) => s.budgets)
  const categories = useStore((s) => s.categories)
  const upsertBudget = useStore((s) => s.upsertBudget)
  const deleteBudget = useStore((s) => s.deleteBudget)
  const { fmt } = useCurrency()
  const t = useT()
  const [period, setPeriod] = useState<BudgetPeriod>('monthly')
  const [modal, setModal] = useState(false)
  const [catId, setCatId] = useState('')
  const [amount, setAmount] = useState('')

  const breakdown = useMemo(() => categoryBreakdown(state), [state])
  const spentMap = new Map(breakdown.map((b) => [b.categoryId, b.total]))

  const dayOfMonth = getDate(new Date())
  const daysInMonth = getDaysInMonth(new Date())
  const monthProgress = dayOfMonth / daysInMonth

  const rows = budgets
    .map((b) => {
      const cat = categories.find((c) => c.id === b.categoryId)
      const spent = spentMap.get(b.categoryId) ?? 0
      const pct = b.amount > 0 ? (spent / b.amount) * 100 : 0
      const forecast = spent / Math.max(monthProgress, 0.05)
      return { budget: b, cat, spent, pct, forecast, remaining: b.amount - spent }
    })
    .sort((a, b) => b.pct - a.pct)

  const totalBudget = budgets.reduce((a, b) => a + b.amount, 0)
  const totalSpent = rows.reduce((a, r) => a + r.spent, 0)
  const overCount = rows.filter((r) => r.pct > 100).length
  const warnCount = rows.filter((r) => r.pct > 80 && r.pct <= 100).length

  const expenseCats = categories.filter((c) => c.type === 'expense' && !budgets.find((b) => b.categoryId === c.id))

  const save = () => {
    if (!catId || !amount) return
    upsertBudget(catId, Number(amount), period)
    setModal(false)
    setCatId('')
    setAmount('')
  }

  return (
    <div>
      <PageHeader
        title={t('budget.title')}
        subtitle={t('budget.spentOf', { spent: fmt(totalSpent), total: fmt(totalBudget) })}
        actions={
          <>
            <Segmented<BudgetPeriod>
              options={[
                { value: 'weekly', label: t('common.week') },
                { value: 'monthly', label: t('common.month') },
                { value: 'yearly', label: t('common.year') },
              ]}
              value={period}
              onChange={setPeriod}
            />
            <Button onClick={() => setModal(true)}>
              <Plus className="h-4 w-4" /> {t('budget.new')}
            </Button>
          </>
        }
      />

      {/* Summary cards */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SummaryTile icon="Wallet" label={t('budget.totalBudget')} value={fmt(totalBudget)} tone="brand" />
        <SummaryTile icon="Coins" label={t('budget.spent')} value={fmt(totalSpent)} tone="accent" />
        <SummaryTile icon="AlertTriangle" label={t('budget.over')} value={`${overCount}`} tone="danger" />
        <SummaryTile icon="Clock" label={t('budget.nearLimit')} value={`${warnCount}`} tone="warning" />
      </div>

      {/* Overall progress */}
      <Card className="mb-6">
        <CardContent className="pt-5">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-semibold">{t('budget.overall')}</span>
            <span className="text-sm tabular-nums text-muted-foreground">
              {totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(0) : 0}%
            </span>
          </div>
          <div className="relative">
            <Progress value={totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0} className="h-3" />
            <div
              className="absolute top-0 h-3 w-0.5 bg-foreground/40"
              style={{ left: `${monthProgress * 100}%` }}
              title="Today"
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            The marker shows how far through the month you are ({(monthProgress * 100).toFixed(0)}%).
          </p>
        </CardContent>
      </Card>

      {/* Budget rows */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {rows.map(({ budget, cat, spent, pct, forecast, remaining }, i) => {
          const status = pct > 100 ? 'over' : pct > 80 ? 'warn' : 'ok'
          return (
            <motion.div
              key={budget.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
            >
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ background: `${cat?.color}1a`, color: cat?.color }}
                    >
                      <Icon name={cat?.icon ?? 'Shapes'} className="h-[18px] w-[18px]" />
                    </span>
                    <div>
                      <p className="text-sm font-bold">{cat?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {fmt(spent)} of {fmt(budget.amount)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    {status === 'over' ? (
                      <Badge tone="danger"><AlertTriangle className="h-3 w-3" /> {t('budget.over')}</Badge>
                    ) : status === 'warn' ? (
                      <Badge tone="warning"><TrendingUp className="h-3 w-3" /> {pct.toFixed(0)}%</Badge>
                    ) : (
                      <Badge tone="success"><CheckCircle2 className="h-3 w-3" /> {t('budget.onTrack')}</Badge>
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <Progress
                    value={pct}
                    color={pct > 100 ? '#ef4444' : pct > 80 ? '#f59e0b' : cat?.color}
                    className="h-2"
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-xs">
                  <span className={cn(remaining < 0 ? 'text-danger font-semibold' : 'text-muted-foreground')}>
                    {remaining < 0 ? `${fmt(Math.abs(remaining))} ${t('budget.overBy')}` : `${fmt(remaining)} ${t('budget.left')}`}
                  </span>
                  <span className="text-muted-foreground">
                    {t('budget.forecast')}: <span className="font-semibold text-foreground">{fmt(forecast)}</span>
                  </span>
                </div>
                <div className="mt-3 flex gap-2">
                  <Input
                    type="number"
                    defaultValue={budget.amount}
                    onBlur={(e) => upsertBudget(budget.categoryId, Number(e.target.value), budget.period)}
                    className="h-8 text-xs"
                  />
                  <Button variant="ghost" size="sm" onClick={() => deleteBudget(budget.id)}>
                    {t('common.remove')}
                  </Button>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <Modal open={modal} onClose={() => setModal(false)} title={t('budget.new')} size="sm">
        <div className="space-y-4">
          <div>
            <Label>{t('tx.category')}</Label>
            <Select value={catId} onChange={(e) => setCatId(e.target.value)}>
              <option value="">{t('budget.selectCategory')}</option>
              {expenseCats.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label>{t('budget.monthlyLimit')}</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="2000" />
          </div>
          <Button className="w-full" onClick={save} disabled={!catId || !amount}>
            {t('budget.create')}
          </Button>
        </div>
      </Modal>
    </div>
  )
}

function SummaryTile({ icon, label, value, tone }: { icon: string; label: string; value: string; tone: string }) {
  const tones: Record<string, string> = {
    brand: 'text-brand-500 bg-brand-500/10',
    accent: 'text-sky bg-sky/10',
    danger: 'text-red-500 bg-red-500/10',
    warning: 'text-amber-500 bg-amber-500/10',
  }
  return (
    <Card className="flex items-center gap-3 p-4">
      <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', tones[tone])}>
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-display text-lg font-black tabular-nums">{value}</p>
      </div>
    </Card>
  )
}
