import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trophy, Sparkles } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Label, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Badge } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { EmptyState } from '@/components/ui/EmptyState'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useToast } from '@/hooks/useToast'
import { useT } from '@/hooks/useT'
import { burst } from '@/lib/celebrate'
import { fmtDate } from '@/lib/date'
import { cn } from '@/lib/utils'
import type { Goal, GoalType } from '@/types'
import { differenceInCalendarMonths, parseISO } from 'date-fns'

const GOAL_PRESETS: { type: GoalType; icon: string; color: string; label: string }[] = [
  { type: 'emergency', icon: 'ShieldCheck', color: '#1DB954', label: 'Emergency Fund' },
  { type: 'vacation', icon: 'Plane', color: '#60A5FA', label: 'Vacation' },
  { type: 'house', icon: 'Home', color: '#8b5cf6', label: 'House' },
  { type: 'car', icon: 'Car', color: '#f59e0b', label: 'Car' },
  { type: 'debt', icon: 'CreditCard', color: '#ef4444', label: 'Debt Payoff' },
  { type: 'custom', icon: 'Target', color: '#ec4899', label: 'Custom' },
]

export default function Goals() {
  const goals = useStore((s) => s.goals)
  const addGoal = useStore((s) => s.addGoal)
  const contributeGoal = useStore((s) => s.contributeGoal)
  const deleteGoal = useStore((s) => s.deleteGoal)
  const { fmt } = useCurrency()
  const { toast } = useToast()
  const t = useT()
  const [modal, setModal] = useState(false)
  const [contributing, setContributing] = useState<Goal | null>(null)

  const totalTarget = goals.reduce((a, g) => a + g.target, 0)
  const totalSaved = goals.reduce((a, g) => a + g.saved, 0)

  return (
    <div>
      <PageHeader
        title={t('goals.title')}
        subtitle={t('goals.savedToward', { saved: fmt(totalSaved), target: fmt(totalTarget), count: goals.length })}
        actions={
          <Button onClick={() => setModal(true)}>
            <Plus className="h-4 w-4" /> {t('goals.new')}
          </Button>
        }
      />

      {goals.length === 0 ? (
        <EmptyState
          icon="Target"
          title={t('goals.empty')}
          description={t('goals.emptySub')}
          action={<Button onClick={() => setModal(true)}><Plus className="h-4 w-4" /> {t('goals.create')}</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {goals.map((g, i) => (
            <GoalCard
              key={g.id}
              goal={g}
              index={i}
              fmt={fmt}
              onContribute={() => setContributing(g)}
              onDelete={() => {
                deleteGoal(g.id)
                toast({ title: 'Goal removed', tone: 'info' })
              }}
            />
          ))}
        </div>
      )}

      <NewGoalModal open={modal} onClose={() => setModal(false)} onCreate={addGoal} />

      <Modal
        open={!!contributing}
        onClose={() => setContributing(null)}
        title={t('goals.addContribution')}
        description={contributing?.name}
        size="sm"
      >
        {contributing && (
          <ContributeForm
            goal={contributing}
            onSubmit={(amount) => {
              const before = contributing.saved
              contributeGoal(contributing.id, amount)
              const after = Math.min(contributing.target, before + amount)
              const pct = (after / contributing.target) * 100
              setContributing(null)
              if (pct >= 100) {
                burst()
                toast({ title: `🎉 ${contributing.name} complete!`, description: 'Goal reached — incredible work.', tone: 'success' })
              } else {
                const passed = contributing.milestones.concat([25, 50, 75]).find((m) => (before / contributing.target) * 100 < m && pct >= m)
                if (passed) {
                  burst()
                  toast({ title: `${passed}% milestone reached!`, description: `${contributing.name} · +15 XP`, tone: 'success' })
                } else {
                  toast({ title: 'Contribution added', description: `+${fmt(amount)} · +15 XP`, tone: 'success' })
                }
              }
            }}
            fmt={fmt}
          />
        )}
      </Modal>
    </div>
  )
}

function GoalCard({
  goal,
  index,
  fmt,
  onContribute,
  onDelete,
}: {
  goal: Goal
  index: number
  fmt: (n: number, o?: any) => string
  onContribute: () => void
  onDelete: () => void
}) {
  const t = useT()
  const pct = Math.min(100, (goal.saved / goal.target) * 100)
  const complete = pct >= 100
  const monthsLeft = goal.deadline ? Math.max(0, differenceInCalendarMonths(parseISO(goal.deadline), new Date())) : null
  const monthsToGoal = goal.monthlyContribution > 0 ? Math.ceil((goal.target - goal.saved) / goal.monthlyContribution) : null
  const circ = 2 * Math.PI * 52

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={cn('relative overflow-hidden p-5', complete && 'ring-2 ring-brand-500/50')}>
        {complete && (
          <div className="absolute right-3 top-3">
            <Badge tone="success"><Trophy className="h-3 w-3" /> {t('goals.complete')}</Badge>
          </div>
        )}
        <div className="flex flex-col items-center">
          <div className="relative">
            <svg viewBox="0 0 120 120" className="h-32 w-32 -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--secondary))" strokeWidth="10" />
              <motion.circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={goal.color}
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={circ}
                initial={{ strokeDashoffset: circ }}
                animate={{ strokeDashoffset: circ * (1 - pct / 100) }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `${goal.color}1a`, color: goal.color }}
              >
                <Icon name={goal.icon} className="h-5 w-5" />
              </span>
              <span className="mt-1 font-display text-lg font-black">{pct.toFixed(0)}%</span>
            </div>
          </div>
          <h3 className="mt-3 font-display text-base font-bold">{goal.name}</h3>
          <p className="text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{fmt(goal.saved)}</span> / {fmt(goal.target)}
          </p>
        </div>

        {/* Milestone track */}
        <div className="mt-4 flex items-center justify-between px-1">
          {[25, 50, 75, 100].map((m) => (
            <div key={m} className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold transition-all',
                  pct >= m ? 'text-white' : 'bg-secondary text-muted-foreground',
                )}
                style={pct >= m ? { backgroundColor: goal.color } : undefined}
              >
                {pct >= m ? '✓' : m}
              </span>
              <span className="text-[9px] text-muted-foreground">{m}%</span>
            </div>
          ))}
        </div>

        <div className="mt-4 space-y-1 rounded-xl bg-secondary/50 p-3 text-xs">
          {monthsToGoal !== null && !complete && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{fmt(goal.monthlyContribution)}/{t('common.month').toLowerCase()}</span>
              <span className="font-semibold">~{monthsToGoal} {t('debt.months')}</span>
            </div>
          )}
          {monthsLeft !== null && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t('goals.deadline')}</span>
              <span className="font-semibold">{fmtDate(goal.deadline!, 'MMM yyyy')} ({monthsLeft}mo)</span>
            </div>
          )}
        </div>

        <div className="mt-3 flex gap-2">
          <Button className="flex-1" size="sm" onClick={onContribute} disabled={complete}>
            <Sparkles className="h-3.5 w-3.5" /> {t('common.contribute')}
          </Button>
          <Button variant="ghost" size="sm" onClick={onDelete}>
            {t('common.remove')}
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function ContributeForm({ goal, onSubmit, fmt }: { goal: Goal; onSubmit: (n: number) => void; fmt: (n: number) => string }) {
  const t = useT()
  const [amount, setAmount] = useState(String(goal.monthlyContribution || 1000))
  const quick = [500, 1000, 2500, 5000]
  return (
    <div className="space-y-4">
      <div>
        <Label>{t('tx.amount')}</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          autoFocus
          className="h-14 text-2xl font-display font-bold"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {quick.map((q) => (
          <button
            key={q}
            onClick={() => setAmount(String(q))}
            className="rounded-lg border border-border px-3 py-1.5 text-sm font-medium hover:bg-secondary transition-colors"
          >
            {fmt(q)}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        {t('goals.remainingToGoal')}: <span className="font-semibold text-foreground">{fmt(Math.max(0, goal.target - goal.saved))}</span>
      </p>
      <Button className="w-full" onClick={() => onSubmit(Number(amount))} disabled={!amount || Number(amount) <= 0}>
        {t('common.add')} {fmt(Number(amount) || 0)}
      </Button>
    </div>
  )
}

function NewGoalModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean
  onClose: () => void
  onCreate: (g: Omit<Goal, 'id' | 'createdAt'>) => void
}) {
  const t = useT()
  const [preset, setPreset] = useState(GOAL_PRESETS[0])
  const [name, setName] = useState('')
  const [target, setTarget] = useState('')
  const [monthly, setMonthly] = useState('')

  const create = () => {
    onCreate({
      name: name || preset.label,
      type: preset.type,
      target: Number(target) || 10000,
      saved: 0,
      monthlyContribution: Number(monthly) || 1000,
      color: preset.color,
      icon: preset.icon,
      milestones: [25, 50, 75],
    })
    onClose()
    setName('')
    setTarget('')
    setMonthly('')
  }

  return (
    <Modal open={open} onClose={onClose} title={t('goals.new')} description={t('goals.whatFor')} size="md">
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {GOAL_PRESETS.map((p) => (
            <button
              key={p.type}
              onClick={() => setPreset(p)}
              className={cn(
                'flex flex-col items-center gap-1.5 rounded-xl border p-3 transition-all',
                preset.type === p.type ? 'border-transparent shadow-soft' : 'border-border hover:bg-secondary',
              )}
              style={preset.type === p.type ? { background: `${p.color}12`, borderColor: p.color } : undefined}
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-lg"
                style={{ background: `${p.color}1a`, color: p.color }}
              >
                <Icon name={p.icon} className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium">{p.label}</span>
            </button>
          ))}
        </div>
        <div>
          <Label>{t('goals.goalName')}</Label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder={preset.label} />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label>{t('goals.target')}</Label>
            <Input type="number" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="50000" />
          </div>
          <div>
            <Label>{t('goals.monthly')}</Label>
            <Input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} placeholder="2000" />
          </div>
        </div>
        <Button className="w-full" onClick={create}>
          {t('goals.create')}
        </Button>
      </div>
    </Modal>
  )
}
