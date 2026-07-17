# NorthBudget

The most beautiful budgeting app in the Nordics — a premium, private, **local-first** personal finance app with no bank integration. Built to feel like an Apple × Linear × Notion product.

**Norsk som standard**, med engelsk som valgfritt språk (bytt i Innstillinger). / Norwegian by default, with English available in Settings.

## ✨ Highlights

- **Landing page** — animated hero, live interactive demo, features, testimonials, pricing, FAQ, dark mode.
- **Dashboard** — income, expenses, savings, net worth, cash flow, monthly score, financial health gauge (0–100), AI-style insight cards.
- **Transactions** — manual entry, Quick Add, keyboard shortcuts, search, filters, tags, categories, attachments, notes, duplicate & recurring.
- **Budgets** — weekly / monthly / yearly, progress bars, overspend warnings, forecasts.
- **Goals** — savings goals with milestones and celebration animations (confetti).
- **Debt tracker** — snowball & avalanche strategies, payoff projections, interest-saved calculations, charts.
- **Subscriptions** — renewal reminders, monthly/yearly totals, cancel suggestions.
- **Bills** — upcoming / overdue / paid, calendar view.
- **Analytics** — trends, category breakdowns, spending heatmap, largest purchases, predictions.
- **Financial Health Score** — savings rate, budget adherence, debt ratio, emergency fund, income stability.
- **Gamification** — levels, XP, streaks, achievements.
- **Settings** — currency (all Nordic + EUR/USD), language (Nordic-ready), themes, high contrast, reduced motion, CSV/Excel/JSON export, CSV import with duplicate detection, printable PDF reports.
- **UX** — command palette (⌘K), keyboard shortcuts, undo, toasts, loading skeletons, micro-interactions, mobile bottom nav, WCAG-minded, reduced-motion support.

## 🛠 Tech

Vite · React 19 · TypeScript · Tailwind CSS · Framer Motion · Recharts · Zustand (persisted to `localStorage`) · React Hook Form · Zod · shadcn-style UI primitives · lucide-react.

> Built on Vite rather than Next.js: NorthBudget is entirely client-side and local-first, so SSR adds no value. The store layer (`src/store`) is structured so a Supabase backend can be dropped in later without rewriting features.

## 🌍 Internationalisation

All UI strings live in `src/lib/i18n.ts` (`no` + `en`, other Nordic languages fall back to Norwegian). Use the `useT()` hook to translate. The default language is Norwegian; switch to English in **Settings → Currency & Language**.

## 🚀 Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # typecheck + production build
npm run preview  # preview the production build
```

## 📁 Architecture

```
src/
  components/   ui primitives, layout (shell, command palette, nav), charts, forms, shared widgets
  pages/        Landing + 11 app pages (lazy-loaded, code-split)
  store/        Zustand store (persisted) + derived selectors (health score, payoff, insights)
  lib/          utils, currency & date formatting, i18n, seed data, CSV import/export, PDF reports
  hooks/        theme, toast, currency, translation
  types/        shared domain types
```

All data is seeded on first load and persisted locally — nothing ever leaves the device.
