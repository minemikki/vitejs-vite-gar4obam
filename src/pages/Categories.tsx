import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Label, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Icon, ICON_NAMES } from '@/components/ui/Icon'
import { useStore } from '@/store/useStore'
import { useCurrency } from '@/hooks/useCurrency'
import { useT } from '@/hooks/useT'
import { categoryBreakdown } from '@/store/selectors'
import { cn } from '@/lib/utils'
import type { Category, TransactionType } from '@/types'

const ICON_CHOICES = ICON_NAMES
const COLOR_CHOICES = ['#1DB954', '#60A5FA', '#8b5cf6', '#ec4899', '#f97316', '#f59e0b', '#ef4444', '#14b8a6', '#06b6d4', '#a3e635', '#94a3b8']

export default function Categories() {
  const state = useStore()
  const categories = useStore((s) => s.categories)
  const addCategory = useStore((s) => s.addCategory)
  const updateCategory = useStore((s) => s.updateCategory)
  const deleteCategory = useStore((s) => s.deleteCategory)
  const { fmt } = useCurrency()
  const t = useT()
  const [modal, setModal] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  const breakdown = categoryBreakdown(state)
  const spent = new Map(breakdown.map((b) => [b.categoryId, b.total]))

  const groups: { type: TransactionType; label: string }[] = [
    { type: 'income', label: t('cat.income') },
    { type: 'expense', label: t('cat.expenses') },
    { type: 'transfer', label: t('cat.transfers') },
  ]

  return (
    <div>
      <PageHeader
        title={t('cat.title')}
        subtitle={t('cat.sub', { count: categories.length })}
        actions={<Button onClick={() => { setEditing(null); setModal(true) }}><Plus className="h-4 w-4" /> {t('cat.new')}</Button>}
      />

      <div className="space-y-8">
        {groups.map(({ type, label }) => {
          const parents = categories.filter((c) => c.type === type && !c.parentId)
          if (parents.length === 0) return null
          return (
            <div key={type}>
              <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold">
                {label}
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                  {categories.filter((c) => c.type === type).length}
                </span>
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {parents.map((cat, i) => {
                  const children = categories.filter((c) => c.parentId === cat.id)
                  return (
                    <motion.div key={cat.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: `${cat.color}1a`, color: cat.color }}><Icon name={cat.icon} className="h-5 w-5" /></span>
                            <div>
                              <p className="text-sm font-bold">{cat.name}</p>
                              {spent.get(cat.id) ? <p className="text-xs text-muted-foreground">{fmt(spent.get(cat.id)!)} {t('cat.thisMonth')}</p> : <p className="text-xs text-muted-foreground">{t('cat.noActivity')}</p>}
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            <button onClick={() => { setEditing(cat); setModal(true) }} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"><Pencil className="h-3.5 w-3.5" /></button>
                            <button onClick={() => deleteCategory(cat.id)} className="rounded-lg p-1.5 text-muted-foreground hover:bg-secondary hover:text-danger"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </div>
                        {children.length > 0 && (
                          <div className="mt-3 flex flex-wrap gap-1.5 border-t border-border pt-3">
                            {children.map((ch) => (
                              <span key={ch.id} className="flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
                                <Icon name={ch.icon} className="h-3 w-3" style={{ color: ch.color }} />
                                {ch.name}
                              </span>
                            ))}
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <CategoryModal
        open={modal}
        onClose={() => { setModal(false); setEditing(null) }}
        editing={editing}
        categories={categories}
        onSave={(data) => {
          if (editing) updateCategory(editing.id, data)
          else addCategory(data)
          setModal(false)
          setEditing(null)
        }}
      />
    </div>
  )
}

function CategoryModal({
  open,
  onClose,
  editing,
  categories,
  onSave,
}: {
  open: boolean
  onClose: () => void
  editing: Category | null
  categories: Category[]
  onSave: (c: Omit<Category, 'id'>) => void
}) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('ShoppingCart')
  const [color, setColor] = useState('#1DB954')
  const [type, setType] = useState<TransactionType>('expense')
  const [parentId, setParentId] = useState<string>('')
  const t = useT()

  useEffect(() => {
    if (!open) return
    if (editing) {
      setName(editing.name); setIcon(editing.icon); setColor(editing.color); setType(editing.type); setParentId(editing.parentId ?? '')
    } else {
      setName(''); setIcon('ShoppingCart'); setColor('#1DB954'); setType('expense'); setParentId('')
    }
  }, [open, editing])

  return (
    <Modal open={open} onClose={onClose} title={editing ? t('cat.editTitle') : t('cat.newTitle')} size="md">
      <div className="space-y-4">
        <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: `${color}1a`, color }}><Icon name={icon} className="h-7 w-7" /></span>
          <div className="flex-1"><Label>{t('cat.name')}</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dagligvarer" autoFocus /></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div><Label>{t('cat.type')}</Label>
            <Select value={type} onChange={(e) => setType(e.target.value as TransactionType)}>
              <option value="expense">{t('type.expense')}</option>
              <option value="income">{t('type.income')}</option>
              <option value="transfer">{t('type.transfer')}</option>
            </Select>
          </div>
          <div><Label>{t('cat.parent')}</Label>
            <Select value={parentId} onChange={(e) => setParentId(e.target.value)}>
              <option value="">{t('cat.topLevel')}</option>
              {categories.filter((c) => c.type === type && !c.parentId && c.id !== editing?.id).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
          </div>
        </div>

        <div>
          <Label>{t('cat.color')}</Label>
          <div className="flex flex-wrap gap-2">
            {COLOR_CHOICES.map((c) => (
              <button key={c} onClick={() => setColor(c)} className={cn('h-8 w-8 rounded-full transition-transform', color === c && 'ring-2 ring-offset-2 ring-offset-background scale-110')} style={{ backgroundColor: c, boxShadow: color === c ? `0 0 0 2px ${c}` : undefined }} aria-label={`Color ${c}`} />
            ))}
          </div>
        </div>

        <div>
          <Label>{t('cat.icon')}</Label>
          <div className="grid grid-cols-8 gap-1.5 rounded-xl border border-border p-2 max-h-40 overflow-y-auto">
            {ICON_CHOICES.map((ic) => (
              <button key={ic} onClick={() => setIcon(ic)} className={cn('flex aspect-square items-center justify-center rounded-lg transition-colors', icon === ic ? 'text-white' : 'text-muted-foreground hover:bg-secondary')} style={icon === ic ? { backgroundColor: color } : undefined} aria-label={ic}>
                <Icon name={ic} className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <Button className="w-full" onClick={() => onSave({ name: name || 'Untitled', icon, color, type, parentId: parentId || null })}>
          {editing ? t('common.saveChanges') : t('cat.new')}
        </Button>
      </div>
    </Modal>
  )
}
