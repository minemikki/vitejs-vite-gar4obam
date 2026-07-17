import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Plus,
  Copy,
  Pencil,
  Trash2,
  Filter,
  X,
  Paperclip,
  Repeat,
  Download,
} from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Select } from '@/components/ui/Input'
import { Badge, Segmented } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { Modal } from '@/components/ui/Modal'
import { EmptyState } from '@/components/ui/EmptyState'
import { TransactionForm } from '@/components/forms/TransactionForm'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useToast } from '@/hooks/useToast'
import { useT } from '@/hooks/useT'
import { fmtDate } from '@/lib/date'
import { exportTransactionsCSV } from '@/lib/export'
import { cn } from '@/lib/utils'
import type { Transaction, TransactionType } from '@/types'
import { parseISO, format } from 'date-fns'

type TypeFilter = 'all' | TransactionType

export default function Transactions() {
  const transactions = useStore((s) => s.transactions)
  const categories = useStore((s) => s.categories)
  const deleteTransaction = useStore((s) => s.deleteTransaction)
  const duplicateTransaction = useStore((s) => s.duplicateTransaction)
  const undo = useStore((s) => s.undo)
  const { fmt, currency } = useCurrency()
  const { toast } = useToast()
  const t = useT()

  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')
  const [catFilter, setCatFilter] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [editing, setEditing] = useState<Transaction | null>(null)
  const [creating, setCreating] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return transactions.filter((t) => {
      if (typeFilter !== 'all' && t.type !== typeFilter) return false
      if (catFilter !== 'all' && t.categoryId !== catFilter) return false
      if (q) {
        const cat = categories.find((c) => c.id === t.categoryId)
        const hay = `${t.payee} ${t.note ?? ''} ${t.tags.join(' ')} ${cat?.name ?? ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [transactions, typeFilter, catFilter, query, categories])

  const grouped = useMemo(() => {
    const map = new Map<string, Transaction[]>()
    for (const t of filtered) {
      const key = format(parseISO(t.date), 'yyyy-MM-dd')
      ;(map.get(key) ?? map.set(key, []).get(key)!).push(t)
    }
    return Array.from(map.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1))
  }, [filtered])

  const totalShown = filtered.reduce(
    (acc, t) => acc + (t.type === 'income' ? t.amount : t.type === 'expense' ? -t.amount : 0),
    0,
  )

  const handleDelete = (txn: Transaction) => {
    deleteTransaction(txn.id)
    toast({
      title: t('tx.deleted'),
      description: txn.payee,
      tone: 'info',
      action: { label: t('common.undo'), onClick: undo },
    })
  }

  return (
    <div>
      <PageHeader
        title={t('tx.title')}
        subtitle={`${filtered.length} ${t('tx.count')} · ${t('tx.net')} ${fmt(totalShown, { signed: true })}`}
        actions={
          <>
            <Button variant="outline" size="md" onClick={() => exportTransactionsCSV(filtered, currency)}>
              <Download className="h-4 w-4" /> {t('common.export')}
            </Button>
            <Button onClick={() => setCreating(true)}>
              <Plus className="h-4 w-4" /> {t('common.add')}
            </Button>
          </>
        }
      />

      {/* Search + filter bar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('tx.searchPlaceholder')}
            className="pl-10"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Segmented<TypeFilter>
          options={[
            { value: 'all', label: t('common.all') },
            { value: 'income', label: t('type.income') },
            { value: 'expense', label: t('type.expense') },
            { value: 'transfer', label: t('type.transfer') },
          ]}
          value={typeFilter}
          onChange={setTypeFilter}
        />
        <Button variant="outline" size="icon" onClick={() => setShowFilters((v) => !v)} aria-label="Filters">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mb-4 overflow-hidden"
          >
            <Card className="flex flex-wrap items-center gap-3 p-4">
              <span className="text-sm font-semibold">{t('tx.category')}</span>
              <Select value={catFilter} onChange={(e) => setCatFilter(e.target.value)} className="h-9 w-auto min-w-[180px]">
                <option value="all">{t('common.all')}</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Select>
              {(catFilter !== 'all' || typeFilter !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCatFilter('all')
                    setTypeFilter('all')
                  }}
                >
                  {t('common.clearFilters')}
                </Button>
              )}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="Receipt"
          title={t('tx.empty')}
          description={query ? t('tx.emptySearchSub') : t('tx.emptySub')}
          action={<Button onClick={() => setCreating(true)}><Plus className="h-4 w-4" /> {t('common.add')}</Button>}
        />
      ) : (
        <div className="space-y-5">
          {grouped.map(([date, txns]) => {
            const dayTotal = txns.reduce(
              (a, t) => a + (t.type === 'income' ? t.amount : t.type === 'expense' ? -t.amount : 0),
              0,
            )
            return (
              <div key={date}>
                <div className="mb-1.5 flex items-center justify-between px-1">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                    {fmtDate(date, 'EEEE, d MMMM')}
                  </h3>
                  <span className="text-xs font-semibold tabular-nums text-muted-foreground">
                    {fmt(dayTotal, { signed: true })}
                  </span>
                </div>
                <Card className="divide-y divide-border overflow-hidden p-0">
                  {txns.map((txn) => (
                    <Row
                      key={txn.id}
                      t={txn}
                      categories={categories}
                      fmt={fmt}
                      onEdit={() => setEditing(txn)}
                      onDuplicate={() => {
                        duplicateTransaction(txn.id)
                        toast({ title: t('tx.duplicated'), description: txn.payee, tone: 'success' })
                      }}
                      onDelete={() => handleDelete(txn)}
                    />
                  ))}
                </Card>
              </div>
            )
          })}
        </div>
      )}

      <Modal open={creating} onClose={() => setCreating(false)} title={t('tx.addTitle')} size="md">
        <TransactionForm
          onDone={() => {
            setCreating(false)
            toast({ title: t('tx.added'), description: '+10 XP', tone: 'success', action: { label: t('common.undo'), onClick: undo } })
          }}
        />
      </Modal>
      <Modal open={!!editing} onClose={() => setEditing(null)} title={t('tx.editTitle')} size="md">
        {editing && <TransactionForm initial={editing} onDone={() => setEditing(null)} />}
      </Modal>
    </div>
  )
}

function Row({
  t,
  categories,
  fmt,
  onEdit,
  onDuplicate,
  onDelete,
}: {
  t: Transaction
  categories: ReturnType<typeof useStore.getState>['categories']
  fmt: (n: number, o?: any) => string
  onEdit: () => void
  onDuplicate: () => void
  onDelete: () => void
}) {
  const cat = categories.find((c) => c.id === t.categoryId)
  return (
    <div className="group flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-secondary/60">
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: `${cat?.color ?? '#94a3b8'}1a`, color: cat?.color ?? '#94a3b8' }}
      >
        <Icon name={cat?.icon ?? 'Receipt'} className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-sm font-semibold">{t.payee}</p>
          {t.recurring && <Repeat className="h-3 w-3 shrink-0 text-brand-500" />}
          {t.attachmentName && <Paperclip className="h-3 w-3 shrink-0 text-muted-foreground" />}
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-muted-foreground">{cat?.name ?? 'Uncategorized'}</span>
          {t.tags.map((tag) => (
            <Badge key={tag} tone="muted" className="px-1.5 py-0 text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <span
        className={cn(
          'text-sm font-bold tabular-nums',
          t.type === 'income' ? 'text-brand-600 dark:text-brand-400' : t.type === 'transfer' ? 'text-sky' : 'text-foreground',
        )}
      >
        {t.type === 'income' ? '+' : t.type === 'expense' ? '−' : '⇄ '}
        {fmt(t.amount)}
      </span>
      <div className="flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100 max-sm:opacity-100">
        <IconBtn onClick={onDuplicate} label="Duplicate"><Copy className="h-3.5 w-3.5" /></IconBtn>
        <IconBtn onClick={onEdit} label="Edit"><Pencil className="h-3.5 w-3.5" /></IconBtn>
        <IconBtn onClick={onDelete} label="Delete" danger><Trash2 className="h-3.5 w-3.5" /></IconBtn>
      </div>
    </div>
  )
}

function IconBtn({
  children,
  onClick,
  label,
  danger,
}: {
  children: React.ReactNode
  onClick: () => void
  label: string
  danger?: boolean
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={cn(
        'rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-card',
        danger ? 'hover:text-danger' : 'hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}
