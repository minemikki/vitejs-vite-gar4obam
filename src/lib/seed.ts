import type {
  AppState,
  Category,
  Transaction,
  Goal,
  Debt,
  Subscription,
  Bill,
  RecurringRule,
  Budget,
  Achievement,
} from '@/types'
import { uid } from './utils'
import { format, subMonths, addDays } from 'date-fns'

const iso = (d: Date) => format(d, 'yyyy-MM-dd')
const today = new Date()

export const DEFAULT_CATEGORIES: Category[] = [
  // Income
  { id: 'cat_salary', name: 'Lønn', icon: 'Wallet', color: '#1DB954', type: 'income', parentId: null },
  { id: 'cat_freelance', name: 'Frilans', icon: 'Laptop', color: '#34d399', type: 'income', parentId: null },
  { id: 'cat_invest_income', name: 'Investeringer', icon: 'TrendingUp', color: '#10b981', type: 'income', parentId: null },
  { id: 'cat_gifts', name: 'Gaver & refusjon', icon: 'Gift', color: '#a3e635', type: 'income', parentId: null },
  // Expense — housing
  { id: 'cat_housing', name: 'Bolig', icon: 'Home', color: '#60A5FA', type: 'expense', parentId: null, monthlyBudget: 12000 },
  { id: 'cat_rent', name: 'Husleie / lån', icon: 'Building', color: '#3b82f6', type: 'expense', parentId: 'cat_housing' },
  { id: 'cat_utilities', name: 'Strøm & internett', icon: 'Zap', color: '#818cf8', type: 'expense', parentId: 'cat_housing' },
  // Food
  { id: 'cat_food', name: 'Mat & servering', icon: 'UtensilsCrossed', color: '#f97316', type: 'expense', parentId: null, monthlyBudget: 6000 },
  { id: 'cat_groceries', name: 'Dagligvarer', icon: 'ShoppingCart', color: '#fb923c', type: 'expense', parentId: 'cat_food' },
  { id: 'cat_restaurants', name: 'Restaurant', icon: 'Utensils', color: '#f59e0b', type: 'expense', parentId: 'cat_food' },
  { id: 'cat_coffee', name: 'Kaffe', icon: 'Coffee', color: '#d97706', type: 'expense', parentId: 'cat_food' },
  // Transport
  { id: 'cat_transport', name: 'Transport', icon: 'Car', color: '#8b5cf6', type: 'expense', parentId: null, monthlyBudget: 2500 },
  { id: 'cat_fuel', name: 'Drivstoff', icon: 'Fuel', color: '#a78bfa', type: 'expense', parentId: 'cat_transport' },
  { id: 'cat_transit', name: 'Kollektiv', icon: 'TrainFront', color: '#7c3aed', type: 'expense', parentId: 'cat_transport' },
  // Lifestyle
  { id: 'cat_shopping', name: 'Shopping', icon: 'ShoppingBag', color: '#ec4899', type: 'expense', parentId: null, monthlyBudget: 3000 },
  { id: 'cat_health', name: 'Helse & trening', icon: 'HeartPulse', color: '#f43f5e', type: 'expense', parentId: null, monthlyBudget: 1500 },
  { id: 'cat_entertainment', name: 'Underholdning', icon: 'Clapperboard', color: '#06b6d4', type: 'expense', parentId: null, monthlyBudget: 1800 },
  { id: 'cat_subscriptions', name: 'Abonnementer', icon: 'Repeat', color: '#14b8a6', type: 'expense', parentId: null, monthlyBudget: 1200 },
  { id: 'cat_travel', name: 'Reise', icon: 'Plane', color: '#0ea5e9', type: 'expense', parentId: null, monthlyBudget: 2000 },
  { id: 'cat_savings', name: 'Sparing & mål', icon: 'PiggyBank', color: '#22c55e', type: 'transfer', parentId: null },
  { id: 'cat_debt_pay', name: 'Gjeldsbetaling', icon: 'Landmark', color: '#ef4444', type: 'expense', parentId: null, monthlyBudget: 4500 },
  { id: 'cat_other', name: 'Annet', icon: 'Shapes', color: '#94a3b8', type: 'expense', parentId: null },
]

const PAYEES: Record<string, string[]> = {
  cat_groceries: ['REMA 1000', 'Kiwi', 'Coop Extra', 'Meny', 'ICA', 'Bunnpris'],
  cat_restaurants: ['Vippa', 'Fuglen', 'Olivia', 'Døgnvill', 'Sushi Bar', 'Peppes Pizza'],
  cat_coffee: ['Espresso House', 'Kaffebrenneriet', 'Tim Wendelboe', 'Starbucks'],
  cat_fuel: ['Circle K', 'Shell', 'Esso', 'Uno-X'],
  cat_transit: ['Ruter', 'Vy', 'Flytoget'],
  cat_shopping: ['Zara', 'H&M', 'XXL', 'Elkjøp', 'Clas Ohlson', 'IKEA'],
  cat_health: ['SATS', 'Apotek 1', 'Vitusapotek', 'Boots'],
  cat_entertainment: ['Nordisk Film Kino', 'Steam', 'Ticketmaster', 'Vinmonopolet'],
  cat_utilities: ['Fjordkraft', 'Tibber', 'Telenor', 'Get'],
  cat_travel: ['SAS', 'Norwegian', 'Booking.com', 'Airbnb'],
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
function rnd(min: number, max: number): number {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10
}

function generateTransactions(): Transaction[] {
  const txns: Transaction[] = []
  // 5 months of history
  for (let m = 4; m >= 0; m--) {
    const monthBase = subMonths(today, m)
    const year = monthBase.getFullYear()
    const month = monthBase.getMonth()

    // Salary on the 25th
    txns.push({
      id: uid('tx'),
      type: 'income',
      amount: 48500 + rnd(-500, 800),
      categoryId: 'cat_salary',
      date: iso(new Date(year, month, 25)),
      payee: 'Nordea AS — Lønn',
      tags: ['lønn'],
      recurring: true,
      note: 'Månedslønn',
      createdAt: iso(monthBase),
    })
    // Occasional freelance
    if (Math.random() > 0.4) {
      txns.push({
        id: uid('tx'), type: 'income', amount: rnd(3000, 9000), categoryId: 'cat_freelance',
        date: iso(new Date(year, month, rnd(8, 20))), payee: 'Designoppdrag', tags: ['ekstra'],
        recurring: false, createdAt: iso(monthBase),
      })
    }
    // Rent
    txns.push({
      id: uid('tx'), type: 'expense', amount: 11800, categoryId: 'cat_rent',
      date: iso(new Date(year, month, 1)), payee: 'OBOS Boligforvaltning', tags: ['fast'],
      recurring: true, note: 'Husleie', createdAt: iso(monthBase),
    })
    // Debt payment
    txns.push({
      id: uid('tx'), type: 'expense', amount: 4200, categoryId: 'cat_debt_pay',
      date: iso(new Date(year, month, 20)), payee: 'DNB Billån', tags: ['fast'],
      recurring: true, createdAt: iso(monthBase),
    })
    // Savings transfer
    txns.push({
      id: uid('tx'), type: 'transfer', amount: 5000, categoryId: 'cat_savings',
      date: iso(new Date(year, month, 26)), payee: 'Til bufferkonto', tags: ['sparing'],
      recurring: true, createdAt: iso(monthBase),
    })

    // Variable spending
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const count = m === 0 ? Math.min(today.getDate(), 22) : 24 + Math.floor(Math.random() * 8)
    const spendCats = ['cat_groceries', 'cat_restaurants', 'cat_coffee', 'cat_fuel', 'cat_transit', 'cat_shopping', 'cat_health', 'cat_entertainment', 'cat_travel']
    const ranges: Record<string, [number, number]> = {
      cat_groceries: [180, 850], cat_restaurants: [220, 780], cat_coffee: [45, 120],
      cat_fuel: [400, 900], cat_transit: [40, 850], cat_shopping: [250, 2400],
      cat_health: [120, 900], cat_entertainment: [120, 650], cat_travel: [400, 3200],
    }
    for (let i = 0; i < count; i++) {
      const cat = pick(spendCats)
      const day = Math.min(1 + Math.floor(Math.random() * daysInMonth), m === 0 ? today.getDate() : daysInMonth)
      const [lo, hi] = ranges[cat]
      txns.push({
        id: uid('tx'), type: 'expense', amount: rnd(lo, hi), categoryId: cat,
        date: iso(new Date(year, month, day)),
        payee: PAYEES[cat] ? pick(PAYEES[cat]) : 'Misc',
        tags: Math.random() > 0.85 ? ['sjekket'] : [],
        recurring: false, createdAt: iso(monthBase),
      })
    }
  }
  return txns.sort((a, b) => (a.date < b.date ? 1 : -1))
}

const GOALS: Goal[] = [
  { id: uid('goal'), name: 'Bufferkonto', type: 'emergency', target: 120000, saved: 78500, monthlyContribution: 5000, color: '#1DB954', icon: 'ShieldCheck', milestones: [25, 50], createdAt: iso(subMonths(today, 10)) },
  { id: uid('goal'), name: 'Sommertur til Lofoten', type: 'vacation', target: 35000, saved: 21400, monthlyContribution: 3000, deadline: iso(addDays(today, 120)), color: '#60A5FA', icon: 'Plane', milestones: [25, 50], createdAt: iso(subMonths(today, 4)) },
  { id: uid('goal'), name: 'Egenkapital bolig', type: 'house', target: 600000, saved: 184000, monthlyContribution: 8000, color: '#8b5cf6', icon: 'Home', milestones: [25], createdAt: iso(subMonths(today, 14)) },
  { id: uid('goal'), name: 'Ny sykkel', type: 'custom', target: 28000, saved: 26200, monthlyContribution: 2000, color: '#f97316', icon: 'Bike', milestones: [25, 50, 75], createdAt: iso(subMonths(today, 6)) },
]

const DEBTS: Debt[] = [
  { id: uid('debt'), name: 'Studielån (Lånekassen)', type: 'student', balance: 218000, originalBalance: 340000, interestRate: 3.2, minPayment: 2100, color: '#8b5cf6', createdAt: iso(subMonths(today, 48)) },
  { id: uid('debt'), name: 'Visa kredittkort', type: 'credit_card', balance: 24500, originalBalance: 40000, interestRate: 22.5, minPayment: 1200, color: '#ef4444', createdAt: iso(subMonths(today, 8)) },
  { id: uid('debt'), name: 'Billån', type: 'loan', balance: 96000, originalBalance: 180000, interestRate: 6.4, minPayment: 2800, color: '#f59e0b', createdAt: iso(subMonths(today, 20)) },
  { id: uid('debt'), name: 'Forbrukslån', type: 'private', balance: 18500, originalBalance: 50000, interestRate: 9.9, minPayment: 900, color: '#f97316', createdAt: iso(subMonths(today, 14)) },
]

const SUBSCRIPTIONS: Subscription[] = [
  { id: uid('sub'), name: 'Netflix', amount: 149, interval: 'monthly', category: 'Streaming', nextRenewal: iso(addDays(today, 6)), color: '#E50914', active: true },
  { id: uid('sub'), name: 'Spotify', amount: 129, interval: 'monthly', category: 'Music', nextRenewal: iso(addDays(today, 12)), color: '#1DB954', active: true },
  { id: uid('sub'), name: 'Adobe Creative Cloud', amount: 659, interval: 'monthly', category: 'Software', nextRenewal: iso(addDays(today, 3)), color: '#FF0000', active: true, notes: 'Vurder årsabonnement for å spare' },
  { id: uid('sub'), name: 'SATS', amount: 549, interval: 'monthly', category: 'Fitness', nextRenewal: iso(addDays(today, 18)), color: '#f43f5e', active: true },
  { id: uid('sub'), name: 'iCloud+', amount: 29, interval: 'monthly', category: 'Storage', nextRenewal: iso(addDays(today, 9)), color: '#3b82f6', active: true },
  { id: uid('sub'), name: 'Disney+', amount: 99, interval: 'monthly', category: 'Streaming', nextRenewal: iso(addDays(today, 22)), color: '#113CCF', active: true, notes: 'Brukes sjelden' },
  { id: uid('sub'), name: 'HBO Max', amount: 109, interval: 'monthly', category: 'Streaming', nextRenewal: iso(addDays(today, 15)), color: '#5822b4', active: true, notes: 'Overlapper med Netflix' },
  { id: uid('sub'), name: 'NRK TV', amount: 0, interval: 'monthly', category: 'Streaming', nextRenewal: iso(addDays(today, 30)), color: '#0071CE', active: false },
  { id: uid('sub'), name: 'Amazon Prime', amount: 59, interval: 'monthly', category: 'Shopping', nextRenewal: iso(addDays(today, 25)), color: '#FF9900', active: true },
]

function generateBills(): Bill[] {
  return [
    { id: uid('bill'), name: 'Husleie', amount: 11800, dueDate: iso(addDays(today, 4)), categoryId: 'cat_rent', recurring: true, interval: 'monthly', paid: false, autoPay: true },
    { id: uid('bill'), name: 'Strøm (Tibber)', amount: 1450, dueDate: iso(addDays(today, 8)), categoryId: 'cat_utilities', recurring: true, interval: 'monthly', paid: false, autoPay: false },
    { id: uid('bill'), name: 'Mobil (Telenor)', amount: 399, dueDate: iso(addDays(today, 2)), categoryId: 'cat_utilities', recurring: true, interval: 'monthly', paid: false, autoPay: true },
    { id: uid('bill'), name: 'Innboforsikring', amount: 640, dueDate: iso(addDays(today, -2)), categoryId: 'cat_other', recurring: true, interval: 'monthly', paid: false, autoPay: false },
    { id: uid('bill'), name: 'Kredittkort', amount: 1200, dueDate: iso(addDays(today, 11)), categoryId: 'cat_debt_pay', recurring: true, interval: 'monthly', paid: false, autoPay: false },
    { id: uid('bill'), name: 'Internett (Telia)', amount: 549, dueDate: iso(addDays(today, -5)), categoryId: 'cat_utilities', recurring: true, interval: 'monthly', paid: true, autoPay: true },
    { id: uid('bill'), name: 'Trening (SATS)', amount: 549, dueDate: iso(addDays(today, 18)), categoryId: 'cat_health', recurring: true, interval: 'monthly', paid: false, autoPay: true },
  ]
}

const RECURRING: RecurringRule[] = [
  { id: uid('rec'), type: 'income', amount: 48500, categoryId: 'cat_salary', payee: 'Nordea AS — Lønn', interval: 'monthly', nextDate: iso(addDays(today, 8)), tags: ['lønn'], active: true },
  { id: uid('rec'), type: 'expense', amount: 11800, categoryId: 'cat_rent', payee: 'OBOS Boligforvaltning', interval: 'monthly', nextDate: iso(addDays(today, 4)), tags: ['fast'], active: true },
  { id: uid('rec'), type: 'transfer', amount: 5000, categoryId: 'cat_savings', payee: 'Til bufferkonto', interval: 'monthly', nextDate: iso(addDays(today, 9)), tags: ['sparing'], active: true },
]

function generateBudgets(): Budget[] {
  return DEFAULT_CATEGORIES.filter((c) => c.monthlyBudget).map((c) => ({
    id: uid('bgt'),
    categoryId: c.id,
    amount: c.monthlyBudget!,
    period: 'monthly' as const,
    rollover: false,
  }))
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_first_tx', name: 'Første steg', description: 'Registrer din første transaksjon', icon: 'Footprints', unlockedAt: iso(subMonths(today, 5)), xp: 50 },
  { id: 'ach_budget_set', name: 'Planleggeren', description: 'Opprett ditt første budsjett', icon: 'Target', unlockedAt: iso(subMonths(today, 5)), xp: 100 },
  { id: 'ach_goal_25', name: 'Fart i sakene', description: 'Nå 25 % på et mål', icon: 'Rocket', unlockedAt: iso(subMonths(today, 3)), xp: 150 },
  { id: 'ach_streak_7', name: 'Stø kurs', description: '7 dager på rad', icon: 'Flame', unlockedAt: iso(subMonths(today, 2)), xp: 200 },
  { id: 'ach_saver', name: 'Sparegris', description: 'Spar over 50 000 kr', icon: 'Egg', unlockedAt: iso(subMonths(today, 1)), xp: 300 },
  { id: 'ach_debt_slayer', name: 'Gjeldsknuser', description: 'Nedbetal 100 000 kr gjeld', icon: 'Swords', unlockedAt: null, xp: 400 },
  { id: 'ach_no_spend', name: 'Jernvilje', description: 'Fullfør en uke uten forbruk', icon: 'ShieldCheck', unlockedAt: null, xp: 250 },
  { id: 'ach_full_year', name: 'Maratonløper', description: 'Følg økonomien i 12 måneder', icon: 'Trophy', unlockedAt: null, xp: 500 },
]

export function createSeedState(): AppState {
  return {
    transactions: generateTransactions(),
    categories: DEFAULT_CATEGORIES,
    recurring: RECURRING,
    budgets: generateBudgets(),
    goals: GOALS,
    debts: DEBTS,
    subscriptions: SUBSCRIPTIONS,
    bills: generateBills(),
    notifications: [
      { id: uid('n'), title: 'Adobe fornyes om 3 dager', body: 'kr 659 trekkes fra kortet ditt.', type: 'bill', date: iso(today), read: false, icon: 'CreditCard' },
      { id: uid('n'), title: 'Restaurant over budsjett', body: 'Du har brukt 82 % av matbudsjettet med en uke igjen.', type: 'budget', date: iso(today), read: false, icon: 'TrendingUp' },
      { id: uid('n'), title: 'Ny sykkel nesten i mål! 🎉', body: 'Du er 94 % av veien til målet «Ny sykkel».', type: 'goal', date: iso(addDays(today, -1)), read: false, icon: 'PartyPopper' },
      { id: uid('n'), title: 'Prestasjon låst opp: Sparegris', body: 'Du passerte 50 000 kr i total sparing.', type: 'achievement', date: iso(addDays(today, -1)), read: true, icon: 'Award' },
      { id: uid('n'), title: 'Din sterkeste sparemåned', body: 'Dette er din beste sparerate på 5 måneder.', type: 'insight', date: iso(addDays(today, -3)), read: true, icon: 'Sparkles' },
    ],
    gamification: {
      xp: 1850,
      level: 7,
      streak: 12,
      lastActive: iso(today),
      achievements: ACHIEVEMENTS,
      challengesCompleted: 9,
    },
    settings: {
      currency: 'NOK',
      language: 'no',
      theme: 'system',
      reduceMotion: false,
      highContrast: false,
      name: 'Sofia',
      monthlyIncomeTarget: 50000,
      onboarded: false,
    },
  }
}
