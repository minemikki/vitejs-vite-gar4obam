import type { Transaction, AppState, Currency } from '@/types'

function download(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function csvEscape(v: string | number): string {
  const s = String(v)
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

export function exportTransactionsCSV(txns: Transaction[], currency: Currency) {
  const headers = ['Date', 'Type', 'Payee', 'Amount', 'Currency', 'Category', 'Tags', 'Note']
  const rows = txns.map((t) =>
    [t.date, t.type, t.payee, t.amount, currency, t.categoryId ?? '', t.tags.join('|'), t.note ?? '']
      .map(csvEscape)
      .join(','),
  )
  download([headers.join(','), ...rows].join('\n'), `northbudget-transactions-${today()}.csv`, 'text/csv')
}

// Excel-compatible export (tab-separated .xls opens cleanly in Excel/Numbers)
export function exportTransactionsExcel(txns: Transaction[], currency: Currency) {
  const headers = ['Date', 'Type', 'Payee', 'Amount', 'Currency', 'Category', 'Tags', 'Note']
  const rows = txns.map((t) =>
    [t.date, t.type, t.payee, t.amount, currency, t.categoryId ?? '', t.tags.join('|'), t.note ?? ''].join('\t'),
  )
  download([headers.join('\t'), ...rows].join('\n'), `northbudget-transactions-${today()}.xls`, 'application/vnd.ms-excel')
}

export function exportStateJSON(state: AppState) {
  download(JSON.stringify(state, null, 2), `northbudget-backup-${today()}.json`, 'application/json')
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

// CSV import parser
export interface ParsedRow {
  date: string
  payee: string
  amount: number
  type: 'income' | 'expense'
  note?: string
  duplicate?: boolean
}

export function parseCSV(text: string, existing: Transaction[]): ParsedRow[] {
  const lines = text.trim().split(/\r?\n/)
  if (lines.length < 2) return []
  const header = splitCsvLine(lines[0]).map((h) => h.toLowerCase().trim())
  const dateIdx = header.findIndex((h) => h.includes('date'))
  const payeeIdx = header.findIndex((h) => h.includes('payee') || h.includes('desc') || h.includes('name') || h.includes('text'))
  const amountIdx = header.findIndex((h) => h.includes('amount') || h.includes('sum') || h.includes('value'))
  const noteIdx = header.findIndex((h) => h.includes('note') || h.includes('memo'))

  const existingKeys = new Set(existing.map((t) => `${t.date}|${t.payee}|${t.amount}`))

  return lines
    .slice(1)
    .map((line): ParsedRow | null => {
      const cols = splitCsvLine(line)
      const rawAmount = parseFloat((cols[amountIdx] ?? '0').replace(/[^0-9,.-]/g, '').replace(',', '.'))
      if (isNaN(rawAmount)) return null
      const date = normalizeDate(cols[dateIdx] ?? '')
      const payee = (cols[payeeIdx] ?? 'Imported').trim() || 'Imported'
      const amount = Math.abs(rawAmount)
      const type: 'income' | 'expense' = rawAmount >= 0 ? 'income' : 'expense'
      const key = `${date}|${payee}|${amount}`
      return {
        date,
        payee,
        amount,
        type,
        note: noteIdx >= 0 ? cols[noteIdx] : undefined,
        duplicate: existingKeys.has(key),
      }
    })
    .filter((r): r is ParsedRow => r !== null)
}

function splitCsvLine(line: string): string[] {
  const out: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'
        i++
      } else inQuotes = !inQuotes
    } else if ((ch === ',' || ch === ';' || ch === '\t') && !inQuotes) {
      out.push(cur)
      cur = ''
    } else cur += ch
  }
  out.push(cur)
  return out
}

function normalizeDate(s: string): string {
  const t = s.trim()
  // ISO
  if (/^\d{4}-\d{2}-\d{2}/.test(t)) return t.slice(0, 10)
  // dd.mm.yyyy or dd/mm/yyyy
  const m = t.match(/^(\d{1,2})[./](\d{1,2})[./](\d{2,4})/)
  if (m) {
    const [, d, mo, y] = m
    const year = y.length === 2 ? `20${y}` : y
    return `${year}-${mo.padStart(2, '0')}-${d.padStart(2, '0')}`
  }
  return new Date().toISOString().slice(0, 10)
}
