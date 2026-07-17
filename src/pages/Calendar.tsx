import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useT } from '@/hooks/useT'
import { cn } from '@/lib/utils'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO,
} from 'date-fns'
import { format } from '@/lib/date'

interface DayEvent {
  type: 'bill' | 'payday' | 'subscription' | 'goal'
  label: string
  amount: number
  color: string
}

const EVENT_COLORS = {
  bill: '#ef4444',
  payday: '#1DB954',
  subscription: '#8b5cf6',
  goal: '#60A5FA',
}

export default function CalendarPage() {
  const state = useStore()
  const { fmt } = useCurrency()
  const t = useT()
  const [cursor, setCursor] = useState(new Date())
  const [selected, setSelected] = useState<Date | null>(new Date())

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 })
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 })
    return eachDayOfInterval({ start, end })
  }, [cursor])

  const eventsFor = (day: Date): DayEvent[] => {
    const events: DayEvent[] = []
    for (const b of state.bills) {
      if (isSameDay(parseISO(b.dueDate), day)) events.push({ type: 'bill', label: b.name, amount: b.amount, color: EVENT_COLORS.bill })
    }
    for (const s of state.subscriptions) {
      if (s.active && isSameDay(parseISO(s.nextRenewal), day)) events.push({ type: 'subscription', label: s.name, amount: s.amount, color: EVENT_COLORS.subscription })
    }
    for (const r of state.recurring) {
      if (r.type === 'income' && isSameDay(parseISO(r.nextDate), day)) events.push({ type: 'payday', label: r.payee, amount: r.amount, color: EVENT_COLORS.payday })
    }
    for (const g of state.goals) {
      if (g.deadline && isSameDay(parseISO(g.deadline), day)) events.push({ type: 'goal', label: `${g.name} deadline`, amount: g.target, color: EVENT_COLORS.goal })
    }
    return events
  }

  const selectedEvents = selected ? eventsFor(selected) : []

  return (
    <div>
      <PageHeader
        title={t('cal.title')}
        subtitle={t('cal.sub')}
        actions={
          <div className="flex items-center gap-1">
            <Button variant="outline" size="icon" onClick={() => setCursor(subMonths(cursor, 1))} aria-label="Previous month"><ChevronLeft className="h-4 w-4" /></Button>
            <span className="min-w-[140px] text-center font-display font-bold">{format(cursor, 'MMMM yyyy')}</span>
            <Button variant="outline" size="icon" onClick={() => setCursor(addMonths(cursor, 1))} aria-label="Next month"><ChevronRight className="h-4 w-4" /></Button>
            <Button variant="ghost" size="sm" onClick={() => { setCursor(new Date()); setSelected(new Date()) }}>{t('common.today')}</Button>
          </div>
        }
      />

      <div className="mb-4 flex flex-wrap gap-3">
        {Object.keys(EVENT_COLORS).map((k) => (
          <span key={k} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: EVENT_COLORS[k as keyof typeof EVENT_COLORS] }} /> {t('cal.' + k)}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <Card className="lg:col-span-3 p-3 sm:p-4">
          <div className="mb-2 grid grid-cols-7 gap-1">
            {['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør', 'Søn'].map((d) => (
              <div key={d} className="py-1 text-center text-xs font-bold text-muted-foreground">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const events = eventsFor(day)
              const inMonth = isSameMonth(day, cursor)
              const isToday = isSameDay(day, new Date())
              const isSelected = selected && isSameDay(day, selected)
              return (
                <button
                  key={day.toISOString()}
                  onClick={() => setSelected(day)}
                  className={cn(
                    'relative flex min-h-[64px] flex-col items-start rounded-xl border p-1.5 text-left transition-all sm:min-h-[84px]',
                    inMonth ? 'border-border hover:border-brand-400/50 hover:bg-secondary/50' : 'border-transparent opacity-40',
                    isSelected && 'ring-2 ring-brand-500 border-transparent',
                  )}
                >
                  <span className={cn('flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold', isToday && 'bg-brand-500 text-white')}>
                    {format(day, 'd')}
                  </span>
                  <div className="mt-1 flex w-full flex-col gap-0.5">
                    {events.slice(0, 2).map((e, i) => (
                      <span key={i} className="truncate rounded px-1 py-0.5 text-[9px] font-medium text-white sm:text-[10px]" style={{ backgroundColor: e.color }}>
                        {e.label}
                      </span>
                    ))}
                    {events.length > 2 && <span className="text-[9px] text-muted-foreground">+{events.length - 2} more</span>}
                  </div>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Selected day detail */}
        <Card>
          <CardContent className="pt-5">
            <p className="font-display text-lg font-bold">{selected ? format(selected, 'EEEE') : t('cal.selectDay')}</p>
            {selected && <p className="mb-4 text-sm text-muted-foreground">{format(selected, 'd MMMM yyyy')}</p>}
            <AnimatePresence mode="wait">
              <motion.div key={selected?.toISOString()} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-2">
                {selectedEvents.length === 0 ? (
                  <p className="rounded-xl bg-secondary/50 px-3 py-6 text-center text-sm text-muted-foreground">{t('cal.nothingScheduled')}</p>
                ) : (
                  selectedEvents.map((e, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-border p-3">
                      <span className="h-8 w-1 rounded-full" style={{ background: e.color }} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{e.label}</p>
                        <p className="text-xs text-muted-foreground">{t('cal.' + e.type)}</p>
                      </div>
                      <span className={cn('text-sm font-bold tabular-nums', e.type === 'payday' ? 'text-brand-500' : '')}>
                        {e.type === 'payday' ? '+' : ''}{fmt(e.amount)}
                      </span>
                    </div>
                  ))
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
