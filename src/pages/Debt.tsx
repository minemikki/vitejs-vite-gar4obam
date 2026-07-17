import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, TrendingDown, Percent, Calendar } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Label, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge, Progress, Segmented } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useToast } from '@/hooks/useToast'
import { useT } from '@/hooks/useT'
import { debtPayoff } from '@/store/selectors'
import { cn } from '@/lib/utils'
import type { Debt, DebtType, PayoffStrategy } from '@/types'
import { addMonths, format } from 'date-fns'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatNumber } from '@/lib/format'

const DEBT_ICONS: Record<DebtType, string> = {
  loan: 'Banknote',
  credit_card: 'CreditCard',
  private: 'Users',
  student: 'GraduationCap',
  mortgage: 'Home',
}

export default function Debt() {
  const state = useStore()
  const debts = useStore((s) => s.debts)
  const addDebt = useStore((s) => s.addDebt)
  const payDebt = useStore((s) => s.payDebt)
  const deleteDebt = useStore((s) => s.deleteDebt)
  const { fmt } = useCurrency()
  const { toast } = useToast()
  const t = useT()
  const [strategy, setStrategy] = useState<PayoffStrategy>('avalanche')
  const [extra, setExtra] = useState(2000)
  const [modal, setModal] = useState(false)

  const totalDebt = debts.reduce((a, d) => a + d.balance, 0)
  const totalOriginal = debts.reduce((a, d) => a + d.originalBalance, 0)
  const totalMin = debts.reduce((a, d) => a + d.minPayment, 0)
  const avgRate = debts.length ? debts.reduce((a, d) => a + d.interestRate * d.balance, 0) / totalDebt : 0
  const paidOff = totalOriginal - totalDebt

  const plan = useMemo(() => debtPayoff(state, strategy, extra), [state, strategy, extra])
  const baseline = useMemo(() => debtPayoff(state, strategy, 0), [state, strategy])

  const payoffDate = format(addMonths(new Date(), plan.totalMonths), 'MMM yyyy')
  const monthsSaved = baseline.totalMonths - plan.totalMonths
  const interestSaved = baseline.totalInterest - plan.totalInterest

  // projection chart data
  const projection = useMemo(() => {
    const points: { label: string; withExtra: number; minimum: number }[] = []
    const simulate = (extraAmt: number) => {
      const bal = debts.map((d) => ({ ...d }))
      const out: number[] = []
      let budget = totalMin + extraAmt
      for (let m = 0; m <= Math.max(plan.totalMonths, baseline.totalMonths, 1); m++) {
        out.push(bal.reduce((a, d) => a + Math.max(0, d.balance), 0))
        // interest + sort
        bal.sort((a, b) => (strategy === 'snowball' ? a.balance - b.balance : b.interestRate - a.interestRate))
        let avail = budget
        for (const d of bal) {
          if (d.balance <= 0) continue
          d.balance += (d.balance * (d.interestRate / 100)) / 12
        }
        for (const d of bal) {
          if (d.balance <= 0 || avail <= 0) continue
          const pay = Math.min(d.balance, d.minPayment, avail)
          d.balance -= pay
          avail -= pay
        }
        for (const d of bal) {
          if (avail <= 0) break
          if (d.balance <= 0) continue
          const pay = Math.min(d.balance, avail)
          d.balance -= pay
          avail -= pay
        }
      }
      return out
    }
    const withExtra = simulate(extra)
    const minimum = simulate(0)
    const len = Math.max(withExtra.length, minimum.length)
    for (let i = 0; i < len; i += Math.max(1, Math.floor(len / 24))) {
      points.push({
        label: format(addMonths(new Date(), i), 'MMM yy'),
        withExtra: Math.round(withExtra[i] ?? 0),
        minimum: Math.round(minimum[i] ?? 0),
      })
    }
    return points
  }, [debts, extra, strategy, totalMin, plan.totalMonths, baseline.totalMonths])

  return (
    <div>
      <PageHeader
        title={t('debt.title')}
        subtitle={`${fmt(totalDebt)} · ${debts.length} ${t('nav.Debt').toLowerCase()} · ${fmt(paidOff)} ${t('debt.paid')}`}
        actions={
          <Button onClick={() => setModal(true)}>
            <Plus className="h-4 w-4" /> {t('debt.add')}
          </Button>
        }
      />

      {debts.length === 0 ? (
        <EmptyState icon="Landmark" title="Gjeldfri så langt 🎉" description="Legg til et lån eller kredittkort for å følge nedbetalingen." action={<Button onClick={() => setModal(true)}><Plus className="h-4 w-4" /> {t('debt.add')}</Button>} />
      ) : (
        <>
          <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatTile icon="CreditCard" label={t('debt.totalDebt')} value={fmt(totalDebt)} tone="danger" />
            <StatTile icon="Percent" label={t('debt.avgInterest')} value={`${avgRate.toFixed(1)}%`} tone="warning" />
            <StatTile icon="Calendar" label={t('debt.debtFreeBy')} value={payoffDate} tone="brand" />
            <StatTile icon="TrendingDown" label={t('debt.monthlyMin')} value={fmt(totalMin)} tone="accent" />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {/* Strategy planner */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>{t('debt.strategy')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Segmented<PayoffStrategy>
                  className="w-full grid grid-cols-2 [&>button]:flex-1"
                  options={[
                    { value: 'avalanche', label: t('debt.avalanche') },
                    { value: 'snowball', label: t('debt.snowball') },
                  ]}
                  value={strategy}
                  onChange={setStrategy}
                />
                <p className="text-xs text-muted-foreground">
                  {strategy === 'avalanche' ? t('debt.avalancheDesc') : t('debt.snowballDesc')}
                </p>
                <div>
                  <Label>{t('debt.extra')}: {fmt(extra)}</Label>
                  <input
                    type="range"
                    min={0}
                    max={10000}
                    step={500}
                    value={extra}
                    onChange={(e) => setExtra(Number(e.target.value))}
                    className="w-full accent-brand-500"
                  />
                </div>
                <div className="space-y-2 rounded-xl bg-secondary/50 p-3">
                  <Row label={t('debt.debtFreeIn')} value={`${plan.totalMonths} ${t('debt.months')}`} />
                  <Row label={t('debt.totalInterest')} value={fmt(plan.totalInterest)} />
                  {monthsSaved > 0 && <Row label={t('debt.monthsSaved')} value={`${monthsSaved}`} highlight />}
                  {interestSaved > 0 && <Row label={t('debt.interestSaved')} value={fmt(interestSaved)} highlight />}
                </div>
              </CardContent>
            </Card>

            {/* Projection chart */}
            <Card className="lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>{t('debt.projection')}</CardTitle>
                  <p className="text-sm text-muted-foreground">{t('debt.balanceOverTime')}</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-brand-500" /> {t('debt.withExtra')}</span>
                  <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-muted-foreground" /> {t('debt.minimum')}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={projection} margin={{ top: 10, right: 6, left: -18, bottom: 0 }}>
                    <defs>
                      <linearGradient id="debtGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#1DB954" stopOpacity={0.35} />
                        <stop offset="100%" stopColor="#1DB954" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} interval="preserveStartEnd" />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v, true)} />
                    <Tooltip
                      content={({ active, payload, label }: any) =>
                        active && payload?.length ? (
                          <div className="rounded-xl border border-border bg-popover/95 px-3 py-2 shadow-float backdrop-blur-xl">
                            <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>
                            {payload.map((p: any, i: number) => (
                              <div key={i} className="flex items-center gap-2 text-xs">
                                <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
                                <span className="text-muted-foreground">{p.name}</span>
                                <span className="ml-auto font-bold tabular-nums">{fmt(p.value)}</span>
                              </div>
                            ))}
                          </div>
                        ) : null
                      }
                    />
                    <Area type="monotone" dataKey="minimum" name="Minimum" stroke="hsl(var(--muted-foreground))" strokeWidth={2} strokeDasharray="4 4" fill="none" />
                    <Area type="monotone" dataKey="withExtra" name="With extra" stroke="#1DB954" strokeWidth={2.5} fill="url(#debtGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Debt list */}
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            {debts
              .slice()
              .sort((a, b) => (strategy === 'avalanche' ? b.interestRate - a.interestRate : a.balance - b.balance))
              .map((d, i) => {
                const pct = ((d.originalBalance - d.balance) / d.originalBalance) * 100
                const order = plan.order.find((o) => o.id === d.id)
                return (
                  <motion.div key={d.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <Card className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${d.color}1a`, color: d.color }}>
                            <Icon name={DEBT_ICONS[d.type]} className="h-[18px] w-[18px]" />
                          </span>
                          <div>
                            <p className="text-sm font-bold">{d.name}</p>
                            <p className="text-xs capitalize text-muted-foreground">{d.type.replace('_', ' ')} · {d.interestRate}% APR</p>
                          </div>
                        </div>
                        {i === 0 && <Badge tone="brand">{t('debt.focus')}</Badge>}
                      </div>
                      <div className="mt-3 flex items-end justify-between">
                        <div>
                          <p className="font-display text-xl font-black tabular-nums" style={{ color: d.color }}>{fmt(d.balance)}</p>
                          <p className="text-xs text-muted-foreground">of {fmt(d.originalBalance)}</p>
                        </div>
                        {order && <p className="text-right text-xs text-muted-foreground">{t('debt.paid')}<br /><span className="font-bold text-foreground">{format(addMonths(new Date(), order.months), 'MMM yyyy')}</span></p>}
                      </div>
                      <Progress value={pct} color={d.color} className="mt-3 h-2" />
                      <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                        <span>{pct.toFixed(0)}% {t('debt.paid')}</span>
                        <span>Min {fmt(d.minPayment)}/{t('common.month').toLowerCase()}</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <QuickPay onPay={(amt) => { payDebt(d.id, amt); toast({ title: t('debt.paymentLogged'), description: `${fmt(amt)} → ${d.name}`, tone: 'success' }) }} defaultAmount={d.minPayment} fmt={fmt} />
                        <Button variant="ghost" size="sm" onClick={() => deleteDebt(d.id)}>{t('common.remove')}</Button>
                      </div>
                    </Card>
                  </motion.div>
                )
              })}
          </div>
        </>
      )}

      <NewDebtModal open={modal} onClose={() => setModal(false)} onCreate={addDebt} />
    </div>
  )
}

function QuickPay({ onPay, defaultAmount, fmt: _fmt }: { onPay: (n: number) => void; defaultAmount: number; fmt: (n: number) => string }) {
  const t = useT()
  const [amount, setAmount] = useState(String(defaultAmount))
  return (
    <div className="flex flex-1 gap-1.5">
      <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="h-8 flex-1 text-xs" />
      <Button size="sm" onClick={() => onPay(Number(amount))}>{t('debt.pay')}</Button>
    </div>
  )
}

function StatTile({ icon, label, value, tone }: { icon: string; label: string; value: string; tone: string }) {
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
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="truncate font-display text-lg font-black tabular-nums">{value}</p>
      </div>
    </Card>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className={cn('font-bold tabular-nums', highlight && 'text-brand-500')}>{value}</span>
    </div>
  )
}

function NewDebtModal({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (d: Omit<Debt, 'id' | 'createdAt'>) => void }) {
  const t = useT()
  const [form, setForm] = useState({ name: '', type: 'credit_card' as DebtType, balance: '', interestRate: '', minPayment: '' })
  const colors: Record<DebtType, string> = { loan: '#f59e0b', credit_card: '#ef4444', private: '#8b5cf6', student: '#60A5FA', mortgage: '#1DB954' }
  const create = () => {
    const balance = Number(form.balance) || 0
    onCreate({
      name: form.name || 'New debt',
      type: form.type,
      balance,
      originalBalance: balance,
      interestRate: Number(form.interestRate) || 0,
      minPayment: Number(form.minPayment) || 0,
      color: colors[form.type],
    })
    onClose()
    setForm({ name: '', type: 'credit_card', balance: '', interestRate: '', minPayment: '' })
  }
  return (
    <Modal open={open} onClose={onClose} title={t('debt.add')} size="sm">
      <div className="space-y-4">
        <div><Label>{t('cat.name')}</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Visa kredittkort" /></div>
        <div><Label>{t('cat.type')}</Label>
          <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as DebtType })}>
            <option value="credit_card">Credit Card</option>
            <option value="loan">Loan</option>
            <option value="student">Student Loan</option>
            <option value="mortgage">Mortgage</option>
            <option value="private">Private Debt</option>
          </Select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div><Label>{t('debt.balance')}</Label><Input type="number" value={form.balance} onChange={(e) => setForm({ ...form, balance: e.target.value })} placeholder="24500" /></div>
          <div><Label>{t('debt.rate')}</Label><Input type="number" value={form.interestRate} onChange={(e) => setForm({ ...form, interestRate: e.target.value })} placeholder="22.5" /></div>
          <div><Label>Min/{t('common.month').toLowerCase()}</Label><Input type="number" value={form.minPayment} onChange={(e) => setForm({ ...form, minPayment: e.target.value })} placeholder="1200" /></div>
        </div>
        <Button className="w-full" onClick={create}>{t('debt.add')}</Button>
      </div>
    </Modal>
  )
}
