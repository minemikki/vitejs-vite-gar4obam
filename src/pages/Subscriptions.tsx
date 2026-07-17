import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Lightbulb, Calendar } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Label, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge, Switch } from '@/components/ui/primitives'
import { EmptyState } from '@/components/ui/EmptyState'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useT } from '@/hooks/useT'
import { subscriptionMonthly } from '@/store/selectors'
import { monthlyFactor, yearlyFactor, relativeDay } from '@/lib/date'
import { cn } from '@/lib/utils'
import type { Subscription, RecurrenceInterval } from '@/types'
import { parseISO, differenceInCalendarDays, format, addDays } from 'date-fns'

export default function Subscriptions() {
  const state = useStore()
  const subs = useStore((s) => s.subscriptions)
  const addSubscription = useStore((s) => s.addSubscription)
  const updateSubscription = useStore((s) => s.updateSubscription)
  const deleteSubscription = useStore((s) => s.deleteSubscription)
  const { fmt } = useCurrency()
  const t = useT()
  const [modal, setModal] = useState(false)

  const monthly = subscriptionMonthly(state)
  const yearly = subs.filter((s) => s.active).reduce((a, s) => a + s.amount * yearlyFactor(s.interval), 0)
  const active = subs.filter((s) => s.active)
  const flagged = active.filter((s) => s.notes)
  const potentialSavings = flagged.reduce((a, s) => a + s.amount * yearlyFactor(s.interval), 0)

  const sorted = subs.slice().sort((a, b) => (a.nextRenewal < b.nextRenewal ? -1 : 1))
  const upcoming = active
    .filter((s) => differenceInCalendarDays(parseISO(s.nextRenewal), new Date()) <= 7)
    .sort((a, b) => (a.nextRenewal < b.nextRenewal ? -1 : 1))

  return (
    <div>
      <PageHeader
        title={t('subs.title')}
        subtitle={`${active.length} ${t('subs.active')} · ${fmt(monthly)}/${t('common.month').toLowerCase()} · ${fmt(yearly)}/${t('common.year').toLowerCase()}`}
        actions={<Button onClick={() => setModal(true)}><Plus className="h-4 w-4" /> {t('subs.add')}</Button>}
      />

      <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 overflow-hidden bg-gradient-to-br from-brand-500/10 via-card to-sky/10">
          <CardContent className="flex flex-col justify-between gap-4 pt-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('subs.totalMonthly')}</p>
              <p className="font-display text-4xl font-black tabular-nums">{fmt(monthly)}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t('subs.overYear', { yearly: fmt(yearly) })}</p>
            </div>
            {upcoming.length > 0 && (
              <div className="rounded-xl border border-border bg-card/60 p-3">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" /> {t('subs.renewingSoon')}
                </p>
                {upcoming.slice(0, 3).map((s) => (
                  <div key={s.id} className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="text-xs text-muted-foreground">{relativeDay(s.nextRenewal)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-amber-500/30 bg-amber-500/[0.04]">
          <CardHeader className="flex flex-row items-center gap-2">
            <Lightbulb className="h-4 w-4 text-amber-500" />
            <CardTitle className="text-amber-600 dark:text-amber-400">{t('subs.cancelSuggestions')}</CardTitle>
          </CardHeader>
          <CardContent>
            {flagged.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  {t('subs.couldSave')} <span className="font-bold text-foreground">{fmt(potentialSavings)}/{t('common.year').toLowerCase()}</span> {t('subs.byReviewing')}
                </p>
                <div className="mt-2 space-y-1.5">
                  {flagged.map((s) => (
                    <div key={s.id} className="rounded-lg bg-card/60 p-2 text-sm">
                      <span className="font-semibold">{s.name}</span>
                      <p className="text-xs text-muted-foreground">{s.notes}</p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">{t('subs.optimized')}</p>
            )}
          </CardContent>
        </Card>
      </div>

      {subs.length === 0 ? (
        <EmptyState icon="Repeat" title={t('subs.empty')} description={t('subs.emptySub')} action={<Button onClick={() => setModal(true)}><Plus className="h-4 w-4" /> {t('subs.add')}</Button>} />
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((s, i) => {
            const days = differenceInCalendarDays(parseISO(s.nextRenewal), new Date())
            return (
              <motion.div key={s.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className={cn('p-4', !s.active && 'opacity-60')}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-black text-white shadow-soft" style={{ backgroundColor: s.color }}>
                        {s.name.slice(0, 2)}
                      </span>
                      <div>
                        <p className="text-sm font-bold">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.category}</p>
                      </div>
                    </div>
                    <Switch checked={s.active} onChange={(v) => updateSubscription(s.id, { active: v })} label={`Toggle ${s.name}`} />
                  </div>
                  <div className="mt-3 flex items-end justify-between">
                    <div>
                      <p className="font-display text-xl font-black tabular-nums">{fmt(s.amount)}</p>
                      <p className="text-xs text-muted-foreground">/{s.interval.replace('ly', '')} · {fmt(s.amount * monthlyFactor(s.interval))}/mo</p>
                    </div>
                    {s.active && (
                      <Badge tone={days <= 3 ? 'warning' : 'muted'}>{days <= 0 ? 'Today' : `${days}d`}</Badge>
                    )}
                  </div>
                  {s.notes && (
                    <p className="mt-2 rounded-lg bg-amber-500/10 px-2 py-1 text-xs text-amber-600 dark:text-amber-400">{s.notes}</p>
                  )}
                  <button onClick={() => deleteSubscription(s.id)} className="mt-2 text-xs text-muted-foreground hover:text-danger transition-colors">
                    Remove
                  </button>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      <NewSubModal open={modal} onClose={() => setModal(false)} onCreate={addSubscription} />
    </div>
  )
}

function NewSubModal({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (s: Omit<Subscription, 'id'>) => void }) {
  const t = useT()
  const [form, setForm] = useState({ name: '', amount: '', interval: 'monthly' as RecurrenceInterval, category: 'Streaming' })
  const palette = ['#E50914', '#1DB954', '#60A5FA', '#f59e0b', '#8b5cf6', '#ec4899']
  const create = () => {
    onCreate({
      name: form.name || 'New subscription',
      amount: Number(form.amount) || 0,
      interval: form.interval,
      category: form.category,
      nextRenewal: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
      color: palette[Math.floor(Math.random() * palette.length)],
      active: true,
    })
    onClose()
    setForm({ name: '', amount: '', interval: 'monthly', category: 'Streaming' })
  }
  return (
    <Modal open={open} onClose={onClose} title={t('subs.add')} size="sm">
      <div className="space-y-4">
        <div><Label>{t('cat.name')}</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Netflix" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>{t('tx.amount')}</Label><Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="149" /></div>
          <div><Label>{t('cat.type')}</Label>
            <Select value={form.interval} onChange={(e) => setForm({ ...form, interval: e.target.value as RecurrenceInterval })}>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
            </Select>
          </div>
        </div>
        <div><Label>{t('tx.category')}</Label>
          <Select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {['Streaming', 'Music', 'Software', 'Fitness', 'Storage', 'Shopping', 'News', 'Other'].map((c) => <option key={c}>{c}</option>)}
          </Select>
        </div>
        <Button className="w-full" onClick={create}>{t('subs.add')}</Button>
      </div>
    </Modal>
  )
}
