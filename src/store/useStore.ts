import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  AppState,
  Transaction,
  Category,
  Goal,
  Debt,
  Subscription,
  Bill,
  Budget,
  RecurringRule,
  AppNotification,
  Settings,
} from '@/types'
import { createSeedState } from '@/lib/seed'
import { uid } from '@/lib/utils'
import { format } from 'date-fns'

interface HistoryEntry {
  label: string
  snapshot: AppState
}

interface StoreActions {
  // transactions
  addTransaction: (t: Omit<Transaction, 'id' | 'createdAt'>) => void
  updateTransaction: (id: string, patch: Partial<Transaction>) => void
  deleteTransaction: (id: string) => void
  duplicateTransaction: (id: string) => void
  // categories
  addCategory: (c: Omit<Category, 'id'>) => void
  updateCategory: (id: string, patch: Partial<Category>) => void
  deleteCategory: (id: string) => void
  // budgets
  upsertBudget: (categoryId: string, amount: number, period?: Budget['period']) => void
  deleteBudget: (id: string) => void
  // goals
  addGoal: (g: Omit<Goal, 'id' | 'createdAt'>) => void
  updateGoal: (id: string, patch: Partial<Goal>) => void
  contributeGoal: (id: string, amount: number) => void
  deleteGoal: (id: string) => void
  // debts
  addDebt: (d: Omit<Debt, 'id' | 'createdAt'>) => void
  updateDebt: (id: string, patch: Partial<Debt>) => void
  payDebt: (id: string, amount: number) => void
  deleteDebt: (id: string) => void
  // subscriptions
  addSubscription: (s: Omit<Subscription, 'id'>) => void
  updateSubscription: (id: string, patch: Partial<Subscription>) => void
  deleteSubscription: (id: string) => void
  // bills
  addBill: (b: Omit<Bill, 'id'>) => void
  updateBill: (id: string, patch: Partial<Bill>) => void
  toggleBillPaid: (id: string) => void
  deleteBill: (id: string) => void
  // recurring
  addRecurring: (r: Omit<RecurringRule, 'id'>) => void
  deleteRecurring: (id: string) => void
  // notifications
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  pushNotification: (n: Omit<AppNotification, 'id' | 'date' | 'read'>) => void
  clearNotifications: () => void
  // gamification
  addXP: (amount: number) => void
  // settings
  updateSettings: (patch: Partial<Settings>) => void
  // data mgmt
  importTransactions: (txns: Omit<Transaction, 'id' | 'createdAt'>[]) => void
  resetData: () => void
  loadState: (state: AppState) => void
  // undo
  undo: () => void
  canUndo: () => boolean
}

type Store = AppState & { _history: HistoryEntry[] } & StoreActions

const nowIso = () => format(new Date(), 'yyyy-MM-dd')

export const useStore = create<Store>()(
  persist(
    (set, get) => {
      // helper to capture undo snapshots
      const snap = (label: string, mutate: (s: AppState) => Partial<AppState>) => {
        const state = get()
        const before: AppState = {
          transactions: state.transactions,
          categories: state.categories,
          recurring: state.recurring,
          budgets: state.budgets,
          goals: state.goals,
          debts: state.debts,
          subscriptions: state.subscriptions,
          bills: state.bills,
          notifications: state.notifications,
          gamification: state.gamification,
          settings: state.settings,
        }
        const patch = mutate(before)
        const history = [...state._history, { label, snapshot: before }].slice(-30)
        set({ ...patch, _history: history } as Partial<Store>)
      }

      return {
        ...createSeedState(),
        _history: [],

        addTransaction: (t) =>
          snap('Add transaction', (s) => {
            const tx: Transaction = { ...t, id: uid('tx'), createdAt: nowIso() }
            get().addXP(10)
            return { transactions: [tx, ...s.transactions] }
          }),
        updateTransaction: (id, patch) =>
          snap('Edit transaction', (s) => ({
            transactions: s.transactions.map((t) => (t.id === id ? { ...t, ...patch } : t)),
          })),
        deleteTransaction: (id) =>
          snap('Delete transaction', (s) => ({
            transactions: s.transactions.filter((t) => t.id !== id),
          })),
        duplicateTransaction: (id) =>
          snap('Duplicate transaction', (s) => {
            const orig = s.transactions.find((t) => t.id === id)
            if (!orig) return {}
            const copy: Transaction = { ...orig, id: uid('tx'), createdAt: nowIso() }
            return { transactions: [copy, ...s.transactions] }
          }),

        addCategory: (c) =>
          snap('Add category', (s) => ({ categories: [...s.categories, { ...c, id: uid('cat') }] })),
        updateCategory: (id, patch) =>
          snap('Edit category', (s) => ({
            categories: s.categories.map((c) => (c.id === id ? { ...c, ...patch } : c)),
          })),
        deleteCategory: (id) =>
          snap('Delete category', (s) => ({
            categories: s.categories.filter((c) => c.id !== id && c.parentId !== id),
            transactions: s.transactions.map((t) =>
              t.categoryId === id ? { ...t, categoryId: null } : t,
            ),
          })),

        upsertBudget: (categoryId, amount, period = 'monthly') =>
          snap('Update budget', (s) => {
            const existing = s.budgets.find((b) => b.categoryId === categoryId)
            if (existing) {
              return {
                budgets: s.budgets.map((b) =>
                  b.categoryId === categoryId ? { ...b, amount, period } : b,
                ),
              }
            }
            return {
              budgets: [
                ...s.budgets,
                { id: uid('bgt'), categoryId, amount, period, rollover: false },
              ],
            }
          }),
        deleteBudget: (id) =>
          snap('Delete budget', (s) => ({ budgets: s.budgets.filter((b) => b.id !== id) })),

        addGoal: (g) =>
          snap('Add goal', (s) => {
            get().addXP(25)
            return { goals: [...s.goals, { ...g, id: uid('goal'), createdAt: nowIso() }] }
          }),
        updateGoal: (id, patch) =>
          snap('Edit goal', (s) => ({
            goals: s.goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
          })),
        contributeGoal: (id, amount) =>
          snap('Contribute to goal', (s) => {
            get().addXP(15)
            return {
              goals: s.goals.map((g) =>
                g.id === id ? { ...g, saved: Math.min(g.target, g.saved + amount) } : g,
              ),
            }
          }),
        deleteGoal: (id) =>
          snap('Delete goal', (s) => ({ goals: s.goals.filter((g) => g.id !== id) })),

        addDebt: (d) =>
          snap('Add debt', (s) => ({
            debts: [...s.debts, { ...d, id: uid('debt'), createdAt: nowIso() }],
          })),
        updateDebt: (id, patch) =>
          snap('Edit debt', (s) => ({
            debts: s.debts.map((d) => (d.id === id ? { ...d, ...patch } : d)),
          })),
        payDebt: (id, amount) =>
          snap('Debt payment', (s) => {
            get().addXP(20)
            return {
              debts: s.debts.map((d) =>
                d.id === id ? { ...d, balance: Math.max(0, d.balance - amount) } : d,
              ),
            }
          }),
        deleteDebt: (id) =>
          snap('Delete debt', (s) => ({ debts: s.debts.filter((d) => d.id !== id) })),

        addSubscription: (sub) =>
          snap('Add subscription', (s) => ({
            subscriptions: [...s.subscriptions, { ...sub, id: uid('sub') }],
          })),
        updateSubscription: (id, patch) =>
          snap('Edit subscription', (s) => ({
            subscriptions: s.subscriptions.map((x) => (x.id === id ? { ...x, ...patch } : x)),
          })),
        deleteSubscription: (id) =>
          snap('Delete subscription', (s) => ({
            subscriptions: s.subscriptions.filter((x) => x.id !== id),
          })),

        addBill: (b) => snap('Add bill', (s) => ({ bills: [...s.bills, { ...b, id: uid('bill') }] })),
        updateBill: (id, patch) =>
          snap('Edit bill', (s) => ({
            bills: s.bills.map((b) => (b.id === id ? { ...b, ...patch } : b)),
          })),
        toggleBillPaid: (id) =>
          snap('Toggle bill', (s) => {
            const bill = s.bills.find((b) => b.id === id)
            if (bill && !bill.paid) get().addXP(5)
            return { bills: s.bills.map((b) => (b.id === id ? { ...b, paid: !b.paid } : b)) }
          }),
        deleteBill: (id) =>
          snap('Delete bill', (s) => ({ bills: s.bills.filter((b) => b.id !== id) })),

        addRecurring: (r) =>
          snap('Add recurring', (s) => ({ recurring: [...s.recurring, { ...r, id: uid('rec') }] })),
        deleteRecurring: (id) =>
          snap('Delete recurring', (s) => ({ recurring: s.recurring.filter((r) => r.id !== id) })),

        markNotificationRead: (id) =>
          set((s) => ({
            notifications: s.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
          })),
        markAllNotificationsRead: () =>
          set((s) => ({ notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
        pushNotification: (n) =>
          set((s) => ({
            notifications: [
              { ...n, id: uid('n'), date: nowIso(), read: false },
              ...s.notifications,
            ].slice(0, 50),
          })),
        clearNotifications: () => set({ notifications: [] }),

        addXP: (amount) =>
          set((s) => {
            const xp = s.gamification.xp + amount
            const level = Math.floor(Math.sqrt(xp / 50)) + 1
            return { gamification: { ...s.gamification, xp, level } }
          }),

        updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

        importTransactions: (txns) =>
          snap('Import transactions', (s) => {
            const mapped: Transaction[] = txns.map((t) => ({
              ...t,
              id: uid('tx'),
              createdAt: nowIso(),
            }))
            get().addXP(mapped.length)
            return { transactions: [...mapped, ...s.transactions] }
          }),
        resetData: () => set({ ...createSeedState(), _history: [] }),
        loadState: (state) => set({ ...state, _history: [] }),

        undo: () => {
          const history = get()._history
          if (!history.length) return
          const last = history[history.length - 1]
          set({ ...last.snapshot, _history: history.slice(0, -1) } as Partial<Store>)
        },
        canUndo: () => get()._history.length > 0,
      }
    },
    {
      name: 'northbudget-store',
      version: 2,
      partialize: (state) => {
        const { _history, ...rest } = state as Store
        void _history
        return rest
      },
    },
  ),
)
