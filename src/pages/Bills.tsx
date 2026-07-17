import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, CheckCircle2, AlertCircle, Clock, CircleDot } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Label, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge, Segmented } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useToast } from '@/hooks/useToast'
import { useT } from '@/hooks/useT'
import { relativeDay, fmtDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import type { Bill } from '@/types'
import { parseISO, differenceInCalendarDays, isBefore, startOfDay, format, addDays } from 'date-fns'

type Tab = 'upcoming' | 'overdue' | 'paid'

export default function Bills() {
  const state = useStore()
  const bills = useStore((s) => s.bills)
  const categories = useStore((s) => s.categories)
  const addBill = useStore((s) => s.addBill)
  const toggleBillPaid = useStore((s) => s.toggleBillPaid)
  const deleteBill = useStore((s) => s.deleteBill)
  const { fmt } = useCurrency()
  const { toast } = useToast()
  const t = useT()
  const [tab, setTab] = useState<Tab>('upcoming')
  const [modal, setModal] = useState(false)

  const now = startOfDay(new Date())
  const overdue = bills.filter((b) => !b.paid && isBefore(parseISO(b.dueDate), now))
  const upcoming = bills.filter((b) => !b.paid && !isBefore(parseISO(b.dueDate), now))
  const paid = bills.filter((b) => b.paid)

  const list = (tab === 'upcoming' ? upcoming : tab === 'overdue' ? overdue : paid).slice().sort((a, b) => (a.dueDate < b.dueDate ? -1 : 1))

  const upcomingTotal = upcoming.reduce((a, b) => a + b.amount, 0)
  const overdueTotal = overdue.reduce((a, b) => a + b.amount, 0)

  return (
    <div>
      <PageHeader
        title={t('bills.title')}
        subtitle={`${fmt(upcomingTotal)} ${t('bills.dueSoon')}${overdue.length ? ` · ${fmt(overdueTotal)} ${t('bills.overdueShort')}` : ''}`}
        actions={<Button onClick={() => setModal(true)}><Plus className="h-4 w-4" /> {t('bills.add')}</Button>}
      />

      <div className="mb-6 grid grid-cols-3 gap-3">
        <SummaryTile icon="Clock" label={t('bills.upcoming')} count={upcoming.length} amount={fmt(upcomingTotal)} tone="accent" />
        <SummaryTile icon="AlertCircle" label={t('bills.overdue')} count={overdue.length} amount={fmt(overdueTotal)} tone="danger" />
        <SummaryTile icon="CheckCircle2" label={t('bills.paid')} count={paid.length} amount={fmt(paid.reduce((a, b) => a + b.amount, 0))} tone="brand" />
      </div>

      <div className="mb-4">
        <Segmented<Tab>
          options={[
            { value: 'upcoming', label: `${t('bills.upcoming')} (${upcoming.length})` },
            { value: 'overdue', label: `${t('bills.overdue')} (${overdue.length})` },
            { value: 'paid', label: `${t('bills.paid')} (${paid.length})` },
          ]}
          value={tab}
          onChange={setTab}
        />
      </div>

      {list.length === 0 ? (
        <EmptyState icon={tab === 'paid' ? 'CheckCircle2' : 'ReceiptText'} title={tab === 'overdue' ? t('bills.noneOverdue') : tab === 'paid' ? t('bills.noPaid') : t('bills.noUpcoming')} description={undefined} />
      ) : (
        <div className="space-y-2">
          {list.map((b, i) => {
            const cat = categories.find((c) => c.id === b.categoryId)
            const days = differenceInCalendarDays(parseISO(b.dueDate), now)
            const isOverdue = !b.paid && days < 0
            return (
              <motion.div key={b.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="flex items-center gap-3 p-3.5">
                  <button
                    onClick={() => { toggleBillPaid(b.id); if (!b.paid) toast({ title: t('bills.billPaid'), description: `${b.name} · +5 XP`, tone: 'success' }) }}
                    className={cn('flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all', b.paid ? 'border-brand-500 bg-brand-500 text-white' : 'border-border hover:border-brand-400')}
                    aria-label={b.paid ? 'Mark unpaid' : 'Mark paid'}
                  >
                    {b.paid && <CheckCircle2 className="h-4 w-4" />}
                  </button>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${cat?.color ?? '#94a3b8'}1a`, color: cat?.color ?? '#94a3b8' }}>
                    <Icon name={cat?.icon ?? 'Receipt'} className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className={cn('text-sm font-semibold', b.paid && 'line-through text-muted-foreground')}>{b.name}</p>
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      {fmtDate(b.dueDate, 'd MMM')}
                      {b.autoPay && <Badge tone="muted" className="px-1.5 py-0 text-[10px]">{t('bills.auto')}</Badge>}
                      {b.recurring && <CircleDot className="h-3 w-3" />}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold tabular-nums">{fmt(b.amount)}</p>
                    {!b.paid && (
                      <p className={cn('text-xs', isOverdue ? 'text-danger font-semibold' : 'text-muted-foreground')}>
                        {isOverdue ? `${Math.abs(days)}d ${t('bills.overdueShort')}` : relativeDay(b.dueDate)}
                      </p>
                    )}
                  </div>
                  <button onClick={() => deleteBill(b.id)} className="shrink-0 rounded-lg p-1.5 text-muted-foreground hover:text-danger" aria-label="Delete">
                    <Icon name="Trash2" className="h-4 w-4" />
                  </button>
                </Card>
              </motion.div>
            )
          })}
        </div>
      )}

      <NewBillModal open={modal} onClose={() => setModal(false)} onCreate={addBill} categories={categories} />
    </div>
  )
}

function SummaryTile({ icon, label, count, amount, tone }: { icon: string; label: string; count: number; amount: string; tone: string }) {
  const tones: Record<string, string> = { brand: 'text-brand-500 bg-brand-500/10', accent: 'text-sky bg-sky/10', danger: 'text-red-500 bg-red-500/10' }
  return (
    <Card className="p-4">
      <span className={cn('mb-2 flex h-9 w-9 items-center justify-center rounded-xl', tones[tone])}><Icon name={icon} className="h-4 w-4" /></span>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-display text-lg font-black tabular-nums">{amount}</p>
      <p className="text-xs text-muted-foreground">{count} bill{count !== 1 ? 's' : ''}</p>
    </Card>
  )
}

function NewBillModal({ open, onClose, onCreate, categories }: { open: boolean; onClose: () => void; onCreate: (b: Omit<Bill, 'id'>) => void; categories: ReturnType<typeof useStore.getState>['categories'] }) {
  const t = useT()
  const [form, setForm] = useState({ name: '', amount: '', dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'), categoryId: '', autoPay: false })
  const create = () => {
    onCreate({ name: form.name || 'New bill', amount: Number(form.amount) || 0, dueDate: form.dueDate, categoryId: form.categoryId || null, recurring: true, interval: 'monthly', paid: false, autoPay: form.autoPay })
    onClose()
    setForm({ name: '', amount: '', dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd'), categoryId: '', autoPay: false })
  }
  return (
    <Modal open={open} onClose={onClose} title={t('bills.add')} size="sm">
      <div className="space-y-4">
        <div><Label>{t('cat.name')}</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Strøm" /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>{t('tx.amount')}</Label><Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="1450" /></div>
          <div><Label>{t('tx.date')}</Label><Input type="date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} /></div>
        </div>
        <div><Label>{t('tx.category')}</Label>
          <Select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
            <option value="">{t('common.none')}</option>
            {categories.filter((c) => c.type === 'expense').map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </Select>
        </div>
        <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form.autoPay} onChange={(e) => setForm({ ...form, autoPay: e.target.checked })} className="accent-brand-500" /> {t('bills.auto')}</label>
        <Button className="w-full" onClick={create}>{t('bills.add')}</Button>
      </div>
    </Modal>
  )
}
