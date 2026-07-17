import type { AppState, Transaction, RecurrenceInterval } from '@/types'
import { sum } from '@/lib/utils'
import {
  isSameMonth,
  parseISO,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
} from 'date-fns'
import { monthlyFactor } from '@/lib/date'

export function txnsInMonth(txns: Transaction[], date: Date): Transaction[] {
  return txns.filter((t) => isSameMonth(parseISO(t.date), date))
}

export function totalByType(txns: Transaction[], type: Transaction['type']): number {
  return sum(txns.filter((t) => t.type === type).map((t) => t.amount))
}

export interface MonthSummary {
  income: number
  expenses: number
  savings: number // transfers to savings
  net: number
  savingsRate: number
}

export function monthSummary(state: AppState, date = new Date()): MonthSummary {
  const m = txnsInMonth(state.transactions, date)
  const income = totalByType(m, 'income')
  const expenses = totalByType(m, 'expense')
  const savings = totalByType(m, 'transfer')
  const net = income - expenses - savings
  const savingsRate = income > 0 ? ((savings + Math.max(net, 0)) / income) * 100 : 0
  return { income, expenses, savings, net, savingsRate }
}

export function subscriptionMonthly(state: AppState): number {
  return sum(
    state.subscriptions
      .filter((s) => s.active)
      .map((s) => s.amount * monthlyFactor(s.interval as RecurrenceInterval)),
  )
}

export function upcomingBillsTotal(state: AppState): number {
  return sum(state.bills.filter((b) => !b.paid).map((b) => b.amount))
}

export function totalSaved(state: AppState): number {
  return sum(state.goals.map((g) => g.saved))
}

export function totalDebt(state: AppState): number {
  return sum(state.debts.map((d) => d.balance))
}

export function netWorth(state: AppState): number {
  // Approximate liquid assets: goal savings + cash buffer estimate
  const assets = totalSaved(state) + estimatedCash(state)
  return assets - totalDebt(state)
}

export function estimatedCash(state: AppState): number {
  // Sum of net across all history as a proxy for cash on hand + starting buffer
  const net = sum(
    state.transactions.map((t) =>
      t.type === 'income' ? t.amount : t.type === 'expense' ? -t.amount : -t.amount,
    ),
  )
  return 85000 + net // assume 85k starting buffer
}

export interface TrendPoint {
  month: string
  label: string
  income: number
  expenses: number
  savings: number
  net: number
}

export function monthlyTrend(state: AppState, months = 6): TrendPoint[] {
  const out: TrendPoint[] = []
  for (let i = months - 1; i >= 0; i--) {
    const d = subMonths(new Date(), i)
    const s = monthSummary(state, d)
    out.push({
      month: format(d, 'yyyy-MM'),
      label: format(d, 'MMM'),
      income: Math.round(s.income),
      expenses: Math.round(s.expenses),
      savings: Math.round(s.savings),
      net: Math.round(s.net),
    })
  }
  return out
}

export interface CategorySpend {
  categoryId: string
  name: string
  color: string
  icon: string
  total: number
  count: number
  budget?: number
  pct: number
}

export function categoryBreakdown(state: AppState, date = new Date()): CategorySpend[] {
  const m = txnsInMonth(state.transactions, date).filter((t) => t.type === 'expense')
  const total = sum(m.map((t) => t.amount))
  const byCat = new Map<string, { total: number; count: number }>()
  for (const t of m) {
    const key = t.categoryId ?? 'uncategorized'
    const cur = byCat.get(key) ?? { total: 0, count: 0 }
    cur.total += t.amount
    cur.count += 1
    byCat.set(key, cur)
  }
  const result: CategorySpend[] = []
  for (const [catId, agg] of byCat) {
    const cat = state.categories.find((c) => c.id === catId)
    const budget = state.budgets.find((b) => b.categoryId === catId)
    result.push({
      categoryId: catId,
      name: cat?.name ?? 'Uncategorized',
      color: cat?.color ?? '#94a3b8',
      icon: cat?.icon ?? 'Shapes',
      total: agg.total,
      count: agg.count,
      budget: budget?.amount,
      pct: total > 0 ? (agg.total / total) * 100 : 0,
    })
  }
  return result.sort((a, b) => b.total - a.total)
}

export function topCategories(state: AppState, n = 5, date = new Date()): CategorySpend[] {
  return categoryBreakdown(state, date).slice(0, n)
}

export function largestPurchases(state: AppState, n = 5, date = new Date()): Transaction[] {
  return txnsInMonth(state.transactions, date)
    .filter((t) => t.type === 'expense')
    .sort((a, b) => b.amount - a.amount)
    .slice(0, n)
}

// Daily spending heatmap for current month
export interface HeatCell {
  date: string
  day: number
  total: number
}
export function dailySpending(state: AppState, date = new Date()): HeatCell[] {
  const start = startOfMonth(date)
  const end = endOfMonth(date)
  const days = end.getDate()
  const cells: HeatCell[] = []
  for (let d = 1; d <= days; d++) {
    const dayDate = new Date(start.getFullYear(), start.getMonth(), d)
    const key = format(dayDate, 'yyyy-MM-dd')
    const total = sum(
      state.transactions
        .filter((t) => t.type === 'expense' && t.date === key)
        .map((t) => t.amount),
    )
    cells.push({ date: key, day: d, total })
  }
  return cells
}

// ---- Financial Health Score (0-100) ----
export interface HealthBreakdown {
  score: number
  grade: string
  savingsRate: { value: number; score: number }
  budgetAdherence: { value: number; score: number }
  debtRatio: { value: number; score: number }
  emergencyFund: { value: number; score: number }
  incomeStability: { value: number; score: number }
}

export function financialHealth(state: AppState): HealthBreakdown {
  const trend = monthlyTrend(state, 4)
  const cur = monthSummary(state)

  // 1. Savings rate (target 20%) — 25 pts
  const savingsRateVal = cur.savingsRate
  const savingsScore = Math.min(25, (savingsRateVal / 20) * 25)

  // 2. Budget adherence — 20 pts
  const breakdown = categoryBreakdown(state)
  const budgeted = breakdown.filter((b) => b.budget)
  const adherence =
    budgeted.length > 0
      ? (budgeted.filter((b) => b.total <= (b.budget ?? Infinity)).length / budgeted.length) * 100
      : 70
  const budgetScore = (adherence / 100) * 20

  // 3. Debt-to-income ratio — 20 pts (lower is better)
  const monthlyDebtPay = sum(state.debts.map((d) => d.minPayment))
  const dti = cur.income > 0 ? (monthlyDebtPay / cur.income) * 100 : 100
  const debtScore = Math.max(0, 20 - (dti / 36) * 20) // 36% is danger zone

  // 4. Emergency fund (target 6 months of expenses) — 20 pts
  const avgExpenses =
    trend.length > 0 ? sum(trend.map((t) => t.expenses)) / trend.length : cur.expenses
  const emergencyGoal = state.goals.find((g) => g.type === 'emergency')
  const monthsCovered = avgExpenses > 0 ? (emergencyGoal?.saved ?? 0) / avgExpenses : 0
  const emergencyScore = Math.min(20, (monthsCovered / 6) * 20)

  // 5. Income stability (coefficient of variation) — 15 pts
  const incomes = trend.map((t) => t.income).filter((v) => v > 0)
  const meanInc = incomes.length ? sum(incomes) / incomes.length : 0
  const variance =
    incomes.length > 1
      ? sum(incomes.map((v) => (v - meanInc) ** 2)) / incomes.length
      : 0
  const cv = meanInc > 0 ? Math.sqrt(variance) / meanInc : 1
  const stabilityScore = Math.max(0, 15 - cv * 60)

  const score = Math.round(
    savingsScore + budgetScore + debtScore + emergencyScore + stabilityScore,
  )
  const grade =
    score >= 85 ? 'Excellent' : score >= 70 ? 'Strong' : score >= 55 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Work'

  return {
    score: Math.max(0, Math.min(100, score)),
    grade,
    savingsRate: { value: savingsRateVal, score: Math.round(savingsScore) },
    budgetAdherence: { value: adherence, score: Math.round(budgetScore) },
    debtRatio: { value: dti, score: Math.round(debtScore) },
    emergencyFund: { value: monthsCovered, score: Math.round(emergencyScore) },
    incomeStability: { value: (1 - cv) * 100, score: Math.round(stabilityScore) },
  }
}

// Monthly "score" — gamified 0-100 combining adherence + savings + activity
export function monthlyScore(state: AppState): number {
  const s = monthSummary(state)
  const savingsPart = Math.min(40, (s.savingsRate / 20) * 40)
  const health = financialHealth(state)
  const adherencePart = (health.budgetAdherence.value / 100) * 35
  const activityPart = Math.min(25, txnsInMonth(state.transactions, new Date()).length * 1.2)
  return Math.round(savingsPart + adherencePart + activityPart)
}

// ---- Debt payoff projections ----
export interface PayoffPlan {
  order: { id: string; name: string; months: number; interestPaid: number }[]
  totalMonths: number
  totalInterest: number
}

export function debtPayoff(
  state: AppState,
  strategy: 'snowball' | 'avalanche',
  extra = 0,
): PayoffPlan {
  const debts = state.debts
    .filter((d) => d.balance > 0)
    .map((d) => ({ ...d }))
    .sort((a, b) =>
      strategy === 'snowball' ? a.balance - b.balance : b.interestRate - a.interestRate,
    )

  const order: PayoffPlan['order'] = []
  let month = 0
  let totalInterest = 0
  const interestByDebt: Record<string, number> = {}
  const startMonths: Record<string, number> = {}

  const remaining = debts.map((d) => ({ ...d }))
  let budget = sum(debts.map((d) => d.minPayment)) + extra

  const MAX = 600
  while (remaining.some((d) => d.balance > 0) && month < MAX) {
    month++
    let available = budget
    // apply interest
    for (const d of remaining) {
      if (d.balance <= 0) continue
      const interest = (d.balance * (d.interestRate / 100)) / 12
      d.balance += interest
      totalInterest += interest
      interestByDebt[d.id] = (interestByDebt[d.id] ?? 0) + interest
    }
    // pay minimums then snowball
    for (const d of remaining) {
      if (d.balance <= 0) continue
      const pay = Math.min(d.balance, Math.max(d.minPayment, 0), available)
      d.balance -= pay
      available -= pay
    }
    // funnel leftover into first active debt
    for (const d of remaining) {
      if (available <= 0) break
      if (d.balance <= 0) continue
      const pay = Math.min(d.balance, available)
      d.balance -= pay
      available -= pay
    }
    for (const d of remaining) {
      if (d.balance <= 0 && !(d.id in startMonths)) {
        startMonths[d.id] = month
      }
    }
  }

  for (const d of debts) {
    order.push({
      id: d.id,
      name: d.name,
      months: startMonths[d.id] ?? month,
      interestPaid: Math.round(interestByDebt[d.id] ?? 0),
    })
  }

  return {
    order,
    totalMonths: month,
    totalInterest: Math.round(totalInterest),
  }
}

// AI-style insights (rule-based placeholders)
export interface Insight {
  id: string
  title: string
  body: string
  tone: 'positive' | 'warning' | 'neutral'
  icon: string
  metric?: string
}

type Translator = (key: string, vars?: Record<string, string | number>) => string
const identity: Translator = (k) => k

export function generateInsights(state: AppState, t: Translator = identity): Insight[] {
  const insights: Insight[] = []
  const cur = monthSummary(state)
  const prev = monthSummary(state, subMonths(new Date(), 1))
  const curBreak = categoryBreakdown(state)
  const prevBreak = categoryBreakdown(state, subMonths(new Date(), 1))

  // Restaurant/dining change
  const dineCur = curBreak.find((c) => c.categoryId === 'cat_restaurants')?.total ?? 0
  const dinePrev = prevBreak.find((c) => c.categoryId === 'cat_restaurants')?.total ?? 0
  if (dinePrev > 0) {
    const change = ((dineCur - dinePrev) / dinePrev) * 100
    if (Math.abs(change) > 8) {
      insights.push({
        id: 'ins_dining',
        title: t('ins.diningTitle', {
          pct: Math.abs(change).toFixed(0),
          dir: change > 0 ? t('ins.diningMore') : t('ins.diningLess'),
        }),
        body: change > 0 ? t('ins.diningBodyUp') : t('ins.diningBodyDown'),
        tone: change > 0 ? 'warning' : 'positive',
        icon: 'Utensils',
        metric: `${change > 0 ? '+' : ''}${change.toFixed(0)}%`,
      })
    }
  }

  // Subscription savings
  const subMonthly = subscriptionMonthly(state)
  const rarely = state.subscriptions.filter((s) => s.active && s.notes)
  if (rarely.length > 0) {
    const potential = sum(rarely.map((s) => s.amount * 12))
    insights.push({
      id: 'ins_subs',
      title: t('ins.subsTitle', { amount: potential.toLocaleString('nb-NO') }),
      body: t('ins.subsBody', { count: rarely.length }),
      tone: 'neutral',
      icon: 'Repeat',
      metric: `${Math.round(subMonthly)} kr`,
    })
  }

  // Savings streak
  if (cur.savingsRate >= prev.savingsRate && cur.savingsRate > 15) {
    insights.push({
      id: 'ins_savings',
      title: t('ins.savingsTitle'),
      body: t('ins.savingsBody', { pct: cur.savingsRate.toFixed(0) }),
      tone: 'positive',
      icon: 'Sparkles',
      metric: `${cur.savingsRate.toFixed(0)}%`,
    })
  }

  // Spending pace
  if (cur.expenses > prev.expenses * 1.1 && prev.expenses > 0) {
    insights.push({
      id: 'ins_pace',
      title: t('ins.paceTitle'),
      body: t('ins.paceBody', { pct: (((cur.expenses - prev.expenses) / prev.expenses) * 100).toFixed(0) }),
      tone: 'warning',
      icon: 'TrendingUp',
    })
  }

  // Emergency fund progress
  const ef = state.goals.find((g) => g.type === 'emergency')
  if (ef) {
    const pct = (ef.saved / ef.target) * 100
    insights.push({
      id: 'ins_ef',
      title: pct >= 100 ? t('ins.efTitleFull') : t('ins.efTitle', { pct: pct.toFixed(0) }),
      body:
        pct >= 100
          ? t('ins.efBodyFull')
          : t('ins.efBody', { months: Math.ceil((ef.target - ef.saved) / (ef.monthlyContribution || 1)) }),
      tone: pct >= 50 ? 'positive' : 'neutral',
      icon: 'ShieldCheck',
      metric: `${pct.toFixed(0)}%`,
    })
  }

  return insights
}
