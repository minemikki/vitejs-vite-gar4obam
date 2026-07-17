import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Paperclip, Repeat, Tag as TagIcon } from 'lucide-react'
import { Input, Label, Select, Textarea } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Segmented } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { useStore } from '@/store/useStore'
import { useT } from '@/hooks/useT'
import { cn } from '@/lib/utils'
import type { Transaction, TransactionType } from '@/types'
import { format } from 'date-fns'

const schema = z.object({
  type: z.enum(['income', 'expense', 'transfer']),
  amount: z.coerce.number().positive('Enter an amount'),
  payee: z.string().min(1, 'Add a payee or description'),
  categoryId: z.string().nullable(),
  date: z.string().min(1),
  note: z.string().optional(),
  tags: z.string().optional(),
  recurring: z.boolean().optional(),
})

type FormValues = z.input<typeof schema>

export function TransactionForm({
  initial,
  onDone,
}: {
  initial?: Transaction
  onDone: () => void
}) {
  const categories = useStore((s) => s.categories)
  const addTransaction = useStore((s) => s.addTransaction)
  const updateTransaction = useStore((s) => s.updateTransaction)
  const t = useT()
  const [attachment, setAttachment] = useState<string | undefined>(initial?.attachmentName)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: initial?.type ?? 'expense',
      amount: initial?.amount ?? ('' as unknown as number),
      payee: initial?.payee ?? '',
      categoryId: initial?.categoryId ?? null,
      date: initial?.date ?? format(new Date(), 'yyyy-MM-dd'),
      note: initial?.note ?? '',
      tags: initial?.tags?.join(', ') ?? '',
      recurring: initial?.recurring ?? false,
    },
  })

  const type = watch('type') as TransactionType
  const recurring = watch('recurring')
  const catOptions = categories.filter((c) => c.type === type)

  const submit = handleSubmit((values) => {
    const payload = {
      type: values.type as TransactionType,
      amount: Number(values.amount),
      payee: values.payee,
      categoryId: values.categoryId || null,
      date: values.date,
      note: values.note,
      tags: (values.tags ?? '')
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      recurring: !!values.recurring,
      attachmentName: attachment,
    }
    if (initial) updateTransaction(initial.id, payload)
    else addTransaction(payload)
    onDone()
  })

  return (
    <form onSubmit={submit} className="space-y-4">
      <Segmented<TransactionType>
        className="w-full grid grid-cols-3 [&>button]:flex-1"
        options={[
          { value: 'expense', label: t('type.expense') },
          { value: 'income', label: t('type.income') },
          { value: 'transfer', label: t('type.transfer') },
        ]}
        value={type}
        onChange={(v) => {
          setValue('type', v)
          setValue('categoryId', null)
        }}
      />

      <div className="relative">
        <Label>{t('tx.amount')}</Label>
        <div className="relative">
          <Input
            type="number"
            step="0.01"
            inputMode="decimal"
            autoFocus
            placeholder="0"
            className={cn(
              'h-16 text-3xl font-display font-bold tabular-nums pr-16',
              type === 'income' && 'text-brand-600 dark:text-brand-400',
              type === 'expense' && 'text-foreground',
            )}
            {...register('amount')}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
            {type === 'income' ? '+' : type === 'expense' ? '−' : '⇄'}
          </span>
        </div>
        {errors.amount && <p className="mt-1 text-xs text-danger">{errors.amount.message}</p>}
      </div>

      <div>
        <Label>{t('tx.payee')}</Label>
        <Input placeholder="f.eks. REMA 1000" {...register('payee')} />
        {errors.payee && <p className="mt-1 text-xs text-danger">{errors.payee.message}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>{t('tx.category')}</Label>
          <Select {...register('categoryId')}>
            <option value="">{t('tx.uncategorized')}</option>
            {catOptions.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label>{t('tx.date')}</Label>
          <Input type="date" {...register('date')} />
        </div>
      </div>

      {/* Category quick-pick chips */}
      <div className="flex flex-wrap gap-1.5">
        {catOptions.slice(0, 6).map((c) => {
          const active = watch('categoryId') === c.id
          return (
            <button
              type="button"
              key={c.id}
              onClick={() => setValue('categoryId', active ? null : c.id)}
              className={cn(
                'flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all',
                active
                  ? 'border-transparent text-white shadow-soft'
                  : 'border-border hover:bg-secondary',
              )}
              style={active ? { backgroundColor: c.color } : undefined}
            >
              <Icon name={c.icon} className="h-3 w-3" />
              {c.name}
            </button>
          )
        })}
      </div>

      <div>
        <Label className="flex items-center gap-1.5">
          <TagIcon className="h-3 w-3" /> {t('tx.tags')}
        </Label>
        <Input placeholder="sjekket, jobb, delt" {...register('tags')} />
      </div>

      <div>
        <Label>{t('tx.note')}</Label>
        <Textarea rows={2} placeholder={t('tx.noteOptional')} {...register('note')} />
      </div>

      <div className="flex items-center gap-2">
        <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-xl border border-border px-3 py-2.5 text-sm hover:bg-secondary transition-colors">
          <Paperclip className="h-4 w-4 text-muted-foreground" />
          <span className="truncate text-muted-foreground">
            {attachment ?? t('tx.attach')}
          </span>
          <input
            type="file"
            className="hidden"
            onChange={(e) => setAttachment(e.target.files?.[0]?.name)}
          />
        </label>
        <button
          type="button"
          onClick={() => setValue('recurring', !recurring)}
          className={cn(
            'flex items-center gap-2 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all',
            recurring
              ? 'border-brand-400 bg-brand-500/10 text-brand-600 dark:text-brand-400'
              : 'border-border text-muted-foreground hover:bg-secondary',
          )}
        >
          <Repeat className="h-4 w-4" />
          {t('tx.recurring')}
        </button>
      </div>

      <motion.div whileTap={{ scale: 0.99 }}>
        <Button type="submit" size="lg" className="w-full">
          {initial ? t('common.saveChanges') : t('common.add')}
        </Button>
      </motion.div>
    </form>
  )
}
