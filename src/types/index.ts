export type TransactionType = 'income' | 'expense' | 'transfer'
export type RecurrenceInterval = 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'yearly'
export type BudgetPeriod = 'weekly' | 'monthly' | 'yearly'
export type DebtType = 'loan' | 'credit_card' | 'private' | 'student' | 'mortgage'
export type GoalType = 'emergency' | 'vacation' | 'house' | 'car' | 'debt' | 'custom'
export type PayoffStrategy = 'snowball' | 'avalanche'

export interface Category {
  id: string
  name: string
  icon: string // lucide icon name
  color: string // hex
  type: TransactionType
  parentId: string | null
  monthlyBudget?: number
}

export interface Transaction {
  id: string
  type: TransactionType
  amount: number // always positive; sign derived from type
  categoryId: string | null
  accountId?: string
  date: string // ISO date
  payee: string
  note?: string
  tags: string[]
  recurring: boolean
  recurrenceId?: string
  attachmentName?: string
  createdAt: string
}

export interface RecurringRule {
  id: string
  type: TransactionType
  amount: number
  categoryId: string | null
  payee: string
  interval: RecurrenceInterval
  nextDate: string
  note?: string
  tags: string[]
  active: boolean
}

export interface Budget {
  id: string
  categoryId: string
  amount: number
  period: BudgetPeriod
  rollover: boolean
}

export interface Goal {
  id: string
  name: string
  type: GoalType
  target: number
  saved: number
  monthlyContribution: number
  deadline?: string
  color: string
  icon: string
  milestones: number[] // percentages celebrated
  createdAt: string
}

export interface Debt {
  id: string
  name: string
  type: DebtType
  balance: number
  originalBalance: number
  interestRate: number // annual %
  minPayment: number
  color: string
  createdAt: string
}

export interface Subscription {
  id: string
  name: string
  amount: number
  interval: RecurrenceInterval
  category: string
  nextRenewal: string
  color: string
  logo?: string
  active: boolean
  notes?: string
}

export interface Bill {
  id: string
  name: string
  amount: number
  dueDate: string
  categoryId: string | null
  recurring: boolean
  interval?: RecurrenceInterval
  paid: boolean
  autoPay: boolean
}

export interface AppNotification {
  id: string
  title: string
  body: string
  type: 'bill' | 'budget' | 'goal' | 'achievement' | 'insight' | 'system'
  date: string
  read: boolean
  icon?: string
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlockedAt: string | null
  xp: number
}

export interface Gamification {
  xp: number
  level: number
  streak: number
  lastActive: string
  achievements: Achievement[]
  challengesCompleted: number
}

export type Currency = 'NOK' | 'SEK' | 'DKK' | 'EUR' | 'USD' | 'ISK'
export type Language = 'en' | 'no' | 'sv' | 'da' | 'fi' | 'is'

export interface Settings {
  currency: Currency
  language: Language
  theme: 'light' | 'dark' | 'system'
  reduceMotion: boolean
  highContrast: boolean
  name: string
  monthlyIncomeTarget: number
  onboarded: boolean
}

export interface AppState {
  transactions: Transaction[]
  categories: Category[]
  recurring: RecurringRule[]
  budgets: Budget[]
  goals: Goal[]
  debts: Debt[]
  subscriptions: Subscription[]
  bills: Bill[]
  notifications: AppNotification[]
  gamification: Gamification
  settings: Settings
}
