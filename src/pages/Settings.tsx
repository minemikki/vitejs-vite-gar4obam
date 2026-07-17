import { useRef, useState } from 'react'
import {
  Download,
  Upload,
  Trash2,
  Globe,
  Palette,
  Coins,
  Eye,
  FileText,
  Database,
  Sparkles,
} from 'lucide-react'
import { PageHeader } from '@/components/shared/PageHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input, Label, Select } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { Switch, Segmented, Badge } from '@/components/ui/primitives'
import { Icon } from '@/components/ui/Icon'
import { useStore } from '@/store/useStore'
import { useToast } from '@/hooks/useToast'
import { useT } from '@/hooks/useT'
import { exportStateJSON, exportTransactionsCSV, exportTransactionsExcel, parseCSV } from '@/lib/export'
import { generateReport } from '@/lib/report'
import type { Currency, Language } from '@/types'
import type { ParsedRow as PR } from '@/lib/export'
import { cn } from '@/lib/utils'

const CURRENCIES: { value: Currency; label: string }[] = [
  { value: 'NOK', label: '🇳🇴 Norwegian Krone (NOK)' },
  { value: 'SEK', label: '🇸🇪 Swedish Krona (SEK)' },
  { value: 'DKK', label: '🇩🇰 Danish Krone (DKK)' },
  { value: 'ISK', label: '🇮🇸 Icelandic Króna (ISK)' },
  { value: 'EUR', label: '🇫🇮 Euro (EUR)' },
  { value: 'USD', label: '🇺🇸 US Dollar (USD)' },
]
const LANGUAGES: { value: Language; label: string }[] = [
  { value: 'en', label: '🇬🇧 English' },
  { value: 'no', label: '🇳🇴 Norsk' },
  { value: 'sv', label: '🇸🇪 Svenska' },
  { value: 'da', label: '🇩🇰 Dansk' },
  { value: 'fi', label: '🇫🇮 Suomi' },
  { value: 'is', label: '🇮🇸 Íslenska' },
]

export default function Settings() {
  const settings = useStore((s) => s.settings)
  const updateSettings = useStore((s) => s.updateSettings)
  const resetData = useStore((s) => s.resetData)
  const transactions = useStore((s) => s.transactions)
  const importTransactions = useStore((s) => s.importTransactions)
  const state = useStore()
  const { toast } = useToast()
  const t = useT()
  const fileRef = useRef<HTMLInputElement>(null)
  const [resetOpen, setResetOpen] = useState(false)
  const [importPreview, setImportPreview] = useState<PR[] | null>(null)

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const rows = parseCSV(String(reader.result), transactions)
      if (rows.length === 0) {
        toast({ title: 'No rows found', description: 'Check that the CSV has Date, Payee and Amount columns.', tone: 'warning' })
        return
      }
      setImportPreview(rows)
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const confirmImport = (rows: PR[]) => {
    importTransactions(
      rows.map((r) => ({ type: r.type, amount: r.amount, payee: r.payee, categoryId: null, date: r.date, note: r.note, tags: ['imported'], recurring: false })),
    )
    setImportPreview(null)
    toast({ title: `Imported ${rows.length} transactions`, description: `+${rows.length} XP`, tone: 'success' })
  }

  return (
    <div className="max-w-3xl">
      <PageHeader title={t('set.title')} subtitle={t('set.sub')} />

      <div className="space-y-4">
        {/* Profile */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2"><Icon name="User" className="h-4 w-4 text-brand-500" /><CardTitle>{t('set.profile')}</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><Label>{t('set.displayName')}</Label><Input value={settings.name} onChange={(e) => updateSettings({ name: e.target.value })} /></div>
            <div><Label>{t('set.incomeTarget')}</Label><Input type="number" value={settings.monthlyIncomeTarget} onChange={(e) => updateSettings({ monthlyIncomeTarget: Number(e.target.value) })} /></div>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2"><Coins className="h-4 w-4 text-brand-500" /><CardTitle>{t('set.currencyLang')}</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div><Label>{t('set.currency')}</Label>
              <Select value={settings.currency} onChange={(e) => updateSettings({ currency: e.target.value as Currency })}>
                {CURRENCIES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </Select>
            </div>
            <div><Label className="flex items-center gap-1.5">{t('set.language')} <Badge tone="accent">{t('set.nordicReady')}</Badge></Label>
              <Select value={settings.language} onChange={(e) => updateSettings({ language: e.target.value as Language })}>
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2"><Palette className="h-4 w-4 text-brand-500" /><CardTitle>{t('set.appearance')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div><p className="text-sm font-semibold">{t('set.theme')}</p><p className="text-xs text-muted-foreground">{t('set.themeSub')}</p></div>
              <Segmented<'light' | 'dark' | 'system'>
                options={[{ value: 'light', label: t('set.light') }, { value: 'dark', label: t('set.dark') }, { value: 'system', label: t('set.auto') }]}
                value={settings.theme}
                onChange={(v) => updateSettings({ theme: v })}
              />
            </div>
            <ToggleRow icon={<Eye className="h-4 w-4" />} title={t('set.highContrast')} desc={t('set.highContrastSub')} checked={settings.highContrast} onChange={(v) => updateSettings({ highContrast: v })} />
            <ToggleRow icon={<Sparkles className="h-4 w-4" />} title={t('set.reduceMotion')} desc={t('set.reduceMotionSub')} checked={settings.reduceMotion} onChange={(v) => updateSettings({ reduceMotion: v })} />
          </CardContent>
        </Card>

        {/* Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2"><FileText className="h-4 w-4 text-brand-500" /><CardTitle>{t('set.reports')}</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground">{t('set.reportsSub')}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => generateReport(state, 'monthly')}><FileText className="h-4 w-4" /> {t('set.monthlyReport')}</Button>
              <Button variant="outline" onClick={() => generateReport(state, 'income')}>{t('set.incomeReport')}</Button>
              <Button variant="outline" onClick={() => generateReport(state, 'expense')}>{t('set.expenseReport')}</Button>
              <Button variant="outline" onClick={() => generateReport(state, 'debt')}>{t('set.debtReport')}</Button>
            </div>
          </CardContent>
        </Card>

        {/* Data */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-2"><Database className="h-4 w-4 text-brand-500" /><CardTitle>{t('set.dataMgmt')}</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-2 text-sm font-semibold">{t('set.export')}</p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => exportTransactionsCSV(transactions, settings.currency)}><Download className="h-4 w-4" /> CSV</Button>
                <Button variant="outline" size="sm" onClick={() => exportTransactionsExcel(transactions, settings.currency)}><Download className="h-4 w-4" /> Excel</Button>
                <Button variant="outline" size="sm" onClick={() => exportStateJSON(state)}><Download className="h-4 w-4" /> {t('set.jsonBackup')}</Button>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm font-semibold">{t('set.import')}</p>
              <input ref={fileRef} type="file" accept=".csv,.txt" className="hidden" onChange={handleImport} />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}><Upload className="h-4 w-4" /> {t('set.importCsv')}</Button>
              <p className="mt-1.5 text-xs text-muted-foreground">{t('set.importSub')}</p>
            </div>
            <div className="rounded-xl border border-danger/30 bg-danger/[0.04] p-3">
              <p className="text-sm font-semibold text-danger">{t('set.dangerZone')}</p>
              <p className="mb-2 text-xs text-muted-foreground">{t('set.resetSub')}</p>
              <Button variant="danger" size="sm" onClick={() => setResetOpen(true)}><Trash2 className="h-4 w-4" /> {t('set.resetAll')}</Button>
            </div>
          </CardContent>
        </Card>

        <p className="pb-4 text-center text-xs text-muted-foreground">
          {t('set.footer')}
        </p>
      </div>

      <Modal open={resetOpen} onClose={() => setResetOpen(false)} title={t('set.resetConfirm')} size="sm">
        <p className="text-sm text-muted-foreground">{t('set.resetConfirmSub')}</p>
        <div className="mt-4 flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => setResetOpen(false)}>{t('common.cancel')}</Button>
          <Button variant="danger" className="flex-1" onClick={() => { resetData(); setResetOpen(false); toast({ title: t('empty.dataReset'), description: '', tone: 'info' }) }}>{t('set.resetEverything')}</Button>
        </div>
      </Modal>

      <ImportPreviewModal preview={importPreview} onClose={() => setImportPreview(null)} onConfirm={confirmImport} />
    </div>
  )
}

function ToggleRow({ icon, title, desc, checked, onChange }: { icon: React.ReactNode; title: string; desc: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-muted-foreground">{icon}</span>
        <div><p className="text-sm font-semibold">{title}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
      </div>
      <Switch checked={checked} onChange={onChange} label={title} />
    </div>
  )
}

function ImportPreviewModal({ preview, onClose, onConfirm }: { preview: PR[] | null; onClose: () => void; onConfirm: (rows: PR[]) => void }) {
  const [skipDupes, setSkipDupes] = useState(true)
  if (!preview) return null
  const dupes = preview.filter((r) => r.duplicate).length
  const toImport = skipDupes ? preview.filter((r) => !r.duplicate) : preview
  return (
    <Modal open={!!preview} onClose={onClose} title="Preview Import" description={`${preview.length} rows detected${dupes ? ` · ${dupes} possible duplicates` : ''}`} size="lg">
      <div className="space-y-4">
        {dupes > 0 && (
          <label className="flex items-center gap-2 rounded-xl bg-amber-500/10 p-3 text-sm">
            <input type="checkbox" checked={skipDupes} onChange={(e) => setSkipDupes(e.target.checked)} className="accent-brand-500" />
            Skip {dupes} likely duplicate{dupes !== 1 ? 's' : ''}
          </label>
        )}
        <div className="max-h-72 overflow-y-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-card"><tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="p-2 font-semibold">Date</th><th className="p-2 font-semibold">Payee</th><th className="p-2 text-right font-semibold">Amount</th><th className="p-2 font-semibold">Type</th>
            </tr></thead>
            <tbody>
              {preview.slice(0, 100).map((r, i) => (
                <tr key={i} className={cn('border-b border-border/50', r.duplicate && skipDupes && 'opacity-40')}>
                  <td className="p-2 text-xs">{r.date}</td>
                  <td className="p-2 font-medium">{r.payee} {r.duplicate && <Badge tone="warning" className="ml-1">dup</Badge>}</td>
                  <td className="p-2 text-right tabular-nums">{r.amount.toLocaleString()}</td>
                  <td className="p-2"><span className={cn('text-xs font-semibold', r.type === 'income' ? 'text-brand-500' : 'text-foreground')}>{r.type}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1" onClick={() => onConfirm(toImport)}>Import {toImport.length} transactions</Button>
        </div>
      </div>
    </Modal>
  )
}
