export interface NavItem {
  to: string
  label: string
  icon: string
  primary?: boolean // shown in mobile bottom bar
}

export const NAV_ITEMS: NavItem[] = [
  { to: '/app', label: 'Dashboard', icon: 'LayoutDashboard', primary: true },
  { to: '/app/transactions', label: 'Transactions', icon: 'ArrowLeftRight', primary: true },
  { to: '/app/budgets', label: 'Budgets', icon: 'Wallet', primary: true },
  { to: '/app/goals', label: 'Goals', icon: 'Target', primary: true },
  { to: '/app/analytics', label: 'Analytics', icon: 'ChartColumnIncreasing' },
  { to: '/app/debt', label: 'Debt', icon: 'Landmark' },
  { to: '/app/subscriptions', label: 'Subscriptions', icon: 'Repeat' },
  { to: '/app/bills', label: 'Bills', icon: 'ReceiptText' },
  { to: '/app/calendar', label: 'Calendar', icon: 'CalendarDays' },
  { to: '/app/categories', label: 'Categories', icon: 'Tags' },
  { to: '/app/settings', label: 'Settings', icon: 'Settings' },
]
