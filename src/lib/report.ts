import type { AppState } from '@/types'
import { formatCurrency } from './format'
import {
  monthSummary,
  categoryBreakdown,
  totalDebt,
  totalSaved,
  netWorth,
  financialHealth,
} from '@/store/selectors'
import { format } from 'date-fns'

type ReportType = 'monthly' | 'income' | 'expense' | 'debt' | 'savings'

export function generateReport(state: AppState, type: ReportType) {
  const cur = monthSummary(state)
  const breakdown = categoryBreakdown(state)
  const health = financialHealth(state)
  const c = (n: number) => formatCurrency(n, state.settings.currency)
  const monthLabel = format(new Date(), 'MMMM yyyy')

  const titleMap: Record<ReportType, string> = {
    monthly: 'Monthly Financial Report',
    income: 'Income Report',
    expense: 'Expense Report',
    debt: 'Debt Report',
    savings: 'Savings Report',
  }

  let body = ''

  if (type === 'monthly' || type === 'income') {
    const income = state.transactions.filter((t) => t.type === 'income')
    body += section('Income Summary', `
      ${kv('Total income this month', c(cur.income))}
      ${kv('Income sources', String(new Set(income.map((t) => t.categoryId)).size))}
    `)
  }

  if (type === 'monthly' || type === 'expense') {
    body += section('Spending by Category', `
      <table>
        <thead><tr><th>Category</th><th style="text-align:right">Amount</th><th style="text-align:right">Share</th></tr></thead>
        <tbody>
          ${breakdown.map((b) => `<tr><td>${b.name}</td><td style="text-align:right">${c(b.total)}</td><td style="text-align:right">${b.pct.toFixed(0)}%</td></tr>`).join('')}
        </tbody>
        <tfoot><tr><td><strong>Total</strong></td><td style="text-align:right"><strong>${c(cur.expenses)}</strong></td><td></td></tr></tfoot>
      </table>
    `)
  }

  if (type === 'monthly' || type === 'debt') {
    body += section('Debt Overview', `
      <table>
        <thead><tr><th>Debt</th><th style="text-align:right">Balance</th><th style="text-align:right">Rate</th><th style="text-align:right">Min / mo</th></tr></thead>
        <tbody>
          ${state.debts.map((d) => `<tr><td>${d.name}</td><td style="text-align:right">${c(d.balance)}</td><td style="text-align:right">${d.interestRate}%</td><td style="text-align:right">${c(d.minPayment)}</td></tr>`).join('')}
        </tbody>
        <tfoot><tr><td><strong>Total debt</strong></td><td style="text-align:right"><strong>${c(totalDebt(state))}</strong></td><td colspan="2"></td></tr></tfoot>
      </table>
    `)
  }

  if (type === 'monthly' || type === 'savings') {
    body += section('Savings & Goals', `
      <table>
        <thead><tr><th>Goal</th><th style="text-align:right">Saved</th><th style="text-align:right">Target</th><th style="text-align:right">Progress</th></tr></thead>
        <tbody>
          ${state.goals.map((g) => `<tr><td>${g.name}</td><td style="text-align:right">${c(g.saved)}</td><td style="text-align:right">${c(g.target)}</td><td style="text-align:right">${((g.saved / g.target) * 100).toFixed(0)}%</td></tr>`).join('')}
        </tbody>
        <tfoot><tr><td><strong>Total saved</strong></td><td style="text-align:right"><strong>${c(totalSaved(state))}</strong></td><td colspan="2"></td></tr></tfoot>
      </table>
    `)
  }

  if (type === 'monthly') {
    body =
      section('Key Metrics', `
      <div class="grid">
        ${metric('Net worth', c(netWorth(state)))}
        ${metric('Savings rate', `${cur.savingsRate.toFixed(0)}%`)}
        ${metric('Health score', `${health.score}/100 · ${health.grade}`)}
        ${metric('Net this month', c(cur.income - cur.expenses - cur.savings))}
      </div>
    `) + body
  }

  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${titleMap[type]} — NorthBudget</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: 'Inter', -apple-system, system-ui, sans-serif; color: #0F172A; margin: 0; padding: 48px; max-width: 800px; }
    header { display: flex; align-items: center; justify-content: space-between; border-bottom: 3px solid #1DB954; padding-bottom: 16px; margin-bottom: 28px; }
    .brand { font-size: 22px; font-weight: 800; }
    .brand span { color: #1DB954; }
    h1 { font-size: 26px; margin: 0 0 4px; }
    .sub { color: #64748b; font-size: 14px; }
    section { margin-bottom: 28px; }
    h2 { font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; }
    table { width: 100%; border-collapse: collapse; font-size: 14px; }
    th { text-align: left; color: #64748b; font-size: 12px; padding: 6px 4px; border-bottom: 1px solid #e2e8f0; }
    td { padding: 7px 4px; border-bottom: 1px solid #f1f5f9; }
    tfoot td { border-top: 2px solid #0F172A; border-bottom: none; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
    .metric { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; }
    .metric .label { font-size: 12px; color: #64748b; }
    .metric .value { font-size: 20px; font-weight: 800; margin-top: 2px; }
    .kv { display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; }
    footer { margin-top: 40px; color: #94a3b8; font-size: 12px; text-align: center; }
    @media print { body { padding: 24px; } .noprint { display: none; } }
    .btn { background: #1DB954; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; font-size: 14px; }
  </style></head><body>
    <header>
      <div><h1>${titleMap[type]}</h1><div class="sub">${monthLabel} · Prepared for ${state.settings.name}</div></div>
      <div class="brand">North<span>Budget</span></div>
    </header>
    ${body}
    <footer>Generated by NorthBudget on ${format(new Date(), 'd MMMM yyyy')} · This is a personal financial summary.</footer>
    <div class="noprint" style="text-align:center;margin-top:24px"><button class="btn" onclick="window.print()">Print / Save as PDF</button></div>
  </body></html>`

  const w = window.open('', '_blank')
  if (w) {
    w.document.write(html)
    w.document.close()
  }
}

function section(title: string, inner: string) {
  return `<section><h2>${title}</h2>${inner}</section>`
}
function metric(label: string, value: string) {
  return `<div class="metric"><div class="label">${label}</div><div class="value">${value}</div></div>`
}
function kv(k: string, v: string) {
  return `<div class="kv"><span>${k}</span><strong>${v}</strong></div>`
}
