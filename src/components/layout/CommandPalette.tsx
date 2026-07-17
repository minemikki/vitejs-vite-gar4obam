import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Command } from 'cmdk'
import { Search, Plus, Moon, Sun, CornerDownLeft } from 'lucide-react'
import { Icon } from '@/components/ui/Icon'
import { NAV_ITEMS } from '@/lib/nav'
import { useUI } from '@/store/useUI'
import { useStore } from '@/store/useStore'
import { useT } from '@/hooks/useT'

export function CommandPalette() {
  const open = useUI((s) => s.commandOpen)
  const setOpen = useUI((s) => s.setCommand)
  const setQuickAdd = useUI((s) => s.setQuickAdd)
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const transactions = useStore((s) => s.transactions)
  const categories = useStore((s) => s.categories)
  const updateSettings = useStore((s) => s.updateSettings)
  const theme = useStore((s) => s.settings.theme)
  const t = useT()

  useEffect(() => {
    if (!open) setSearch('')
  }, [open])

  const txnMatches = useMemo(() => {
    if (search.length < 2) return []
    const q = search.toLowerCase()
    return transactions
      .filter((t) => t.payee.toLowerCase().includes(q) || t.note?.toLowerCase().includes(q))
      .slice(0, 5)
  }, [search, transactions])

  const go = (to: string) => {
    navigate(to)
    setOpen(false)
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[150] flex items-start justify-center p-4 pt-[12vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-night/50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="relative w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-float"
          >
            <Command shouldFilter={false} className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:text-muted-foreground">
              <div className="flex items-center gap-3 border-b border-border px-4">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Command.Input
                  value={search}
                  onValueChange={setSearch}
                  autoFocus
                  placeholder={t('shell.search')}
                  className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <kbd className="hidden rounded border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:block">
                  ESC
                </kbd>
              </div>
              <Command.List className="max-h-[52vh] overflow-y-auto p-2">
                <Command.Empty className="py-8 text-center text-sm text-muted-foreground">
                  No results found.
                </Command.Empty>

                <Command.Group heading={t('shell.actions')}>
                  <Item
                    onSelect={() => {
                      setOpen(false)
                      setQuickAdd(true)
                    }}
                    icon={<Plus className="h-4 w-4" />}
                    label={t('tx.addTitle')}
                    hint="Q"
                  />
                  <Item
                    onSelect={() => {
                      updateSettings({ theme: theme === 'dark' ? 'light' : 'dark' })
                    }}
                    icon={theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    label={theme === 'dark' ? t('shell.switchLight') : t('shell.switchDark')}
                  />
                </Command.Group>

                <Command.Group heading={t('shell.navigate')}>
                  {NAV_ITEMS.filter(
                    (n) => !search || t('nav.' + n.label).toLowerCase().includes(search.toLowerCase()),
                  ).map((n) => (
                    <Item
                      key={n.to}
                      onSelect={() => go(n.to)}
                      icon={<Icon name={n.icon} className="h-4 w-4" />}
                      label={t('nav.' + n.label)}
                    />
                  ))}
                </Command.Group>

                {txnMatches.length > 0 && (
                  <Command.Group heading={t('tx.title')}>
                    {txnMatches.map((t) => {
                      const cat = categories.find((c) => c.id === t.categoryId)
                      return (
                        <Item
                          key={t.id}
                          onSelect={() => go('/app/transactions')}
                          icon={<Icon name={cat?.icon ?? 'Receipt'} className="h-4 w-4" />}
                          label={t.payee}
                          hint={t.date}
                        />
                      )
                    })}
                  </Command.Group>
                )}
              </Command.List>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

function Item({
  onSelect,
  icon,
  label,
  hint,
}: {
  onSelect: () => void
  icon: React.ReactNode
  label: string
  hint?: string
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm aria-selected:bg-secondary transition-colors"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
        {icon}
      </span>
      <span className="flex-1 font-medium">{label}</span>
      {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      <CornerDownLeft className="h-3.5 w-3.5 text-muted-foreground opacity-0 aria-selected:opacity-100" />
    </Command.Item>
  )
}
