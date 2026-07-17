import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Moon,
  Sun,
  Star,
  Sparkles,
  Shield,
  Zap,
  TrendingUp,
  Target,
  PiggyBank,
  Repeat,
  ChartColumnIncreasing,
  Wallet,
  Trophy,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'
import { Wordmark } from '@/components/shared/Logo'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/primitives'
import { AnimatedNumber } from '@/components/shared/AnimatedNumber'
import { useStore } from '@/store/useStore'
import { useT } from '@/hooks/useT'
import { cn } from '@/lib/utils'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

// Hero content must appear immediately (no scroll trigger) for a reliable first paint.
const heroReveal = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
}

export default function Landing() {
  const theme = useStore((s) => s.settings.theme)
  const updateSettings = useStore((s) => s.updateSettings)
  const t = useT()
  const [menuOpen, setMenuOpen] = useState(false)
  const isDark = document.documentElement.classList.contains('dark')

  const FEATURES = [
    { icon: Wallet, key: 'feat1', bg: 'bg-brand-500/15 text-brand-500' },
    { icon: Target, key: 'feat2', bg: 'bg-sky/15 text-sky' },
    { icon: TrendingUp, key: 'feat3', bg: 'bg-red-500/15 text-red-500' },
    { icon: ChartColumnIncreasing, key: 'feat4', bg: 'bg-violet-500/15 text-violet-500' },
    { icon: Repeat, key: 'feat5', bg: 'bg-teal-500/15 text-teal-500' },
    { icon: Shield, key: 'feat6', bg: 'bg-brand-500/15 text-brand-500' },
    { icon: Trophy, key: 'feat7', bg: 'bg-amber-500/15 text-amber-500' },
    { icon: Sparkles, key: 'feat8', bg: 'bg-sky/15 text-sky' },
    { icon: Zap, key: 'feat9', bg: 'bg-brand-500/15 text-brand-500' },
  ]
  const TESTIMONIALS = [
    { name: 'Sofia', key: 'test1' },
    { name: 'Erik', key: 'test2' },
    { name: 'Freja', key: 'test3' },
  ]
  const PLANS = [
    { key: 'planFree', price: 'kr 0', featured: false, features: t('land.planFreeFeat').split('|') },
    { key: 'planPlus', price: 'kr 49', featured: true, features: t('land.planPlusFeat').split('|') },
    { key: 'planFamily', price: 'kr 89', featured: false, features: t('land.planFamilyFeat').split('|') },
  ]
  const FAQS = [1, 2, 3, 4, 5].map((i) => ({ q: t(`land.faq${i}q`), a: t(`land.faq${i}a`) }))

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Wordmark />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition-colors">{t('land.features')}</a>
            <a href="#demo" className="hover:text-foreground transition-colors">{t('land.demo')}</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">{t('land.pricing')}</a>
            <a href="#faq" className="hover:text-foreground transition-colors">{t('land.faq')}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => updateSettings({ theme: isDark ? 'light' : 'dark' })}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <Link to="/app" className="hidden sm:block">
              <Button size="sm">{t('land.openApp')} <ArrowRight className="h-3.5 w-3.5" /></Button>
            </Link>
            <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="border-t border-border md:hidden">
            <div className="flex flex-col gap-1 p-4">
              {['features', 'demo', 'pricing', 'faq'].map((s) => (
                <a key={s} href={`#${s}`} onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-2 hover:bg-secondary">{t('land.' + s)}</a>
              ))}
              <Link to="/app"><Button className="mt-2 w-full">{t('land.openApp')}</Button></Link>
            </div>
          </motion.div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-slate [background-size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-brand-500/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-20 right-0 h-[300px] w-[400px] rounded-full bg-sky/20 blur-[120px]" />

        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24">
          <motion.div {...heroReveal}>
            <Badge tone="brand" className="mb-6 gap-1.5 px-3 py-1 text-sm">
              <Sparkles className="h-3.5 w-3.5" /> {t('land.heroBadge')}
            </Badge>
          </motion.div>
          <motion.h1
            {...heroReveal}
            transition={{ ...heroReveal.transition, delay: 0.05 }}
            className="mx-auto max-w-4xl font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {t('land.heroTitle1')}
            <span className="brand-gradient-text"> {t('land.heroTitleEffortless')}</span> {t('land.heroTitle2')}
            <span className="brand-gradient-text"> {t('land.heroTitleExpensive')}</span>
          </motion.h1>
          <motion.p
            {...heroReveal}
            transition={{ ...heroReveal.transition, delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            {t('land.heroSub')}
          </motion.p>
          <motion.div
            {...heroReveal}
            transition={{ ...heroReveal.transition, delay: 0.15 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Link to="/app">
              <Button size="lg" className="h-13 px-7 text-base">
                {t('land.heroCta')} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#demo">
              <Button variant="outline" size="lg" className="h-13 px-7 text-base">{t('land.heroCtaSecondary')}</Button>
            </a>
          </motion.div>
          <motion.p {...heroReveal} transition={{ ...heroReveal.transition, delay: 0.2 }} className="mt-4 text-xs text-muted-foreground">
            {t('land.heroNote')}
          </motion.p>

          {/* Animated stats */}
          <motion.div
            {...heroReveal}
            transition={{ ...heroReveal.transition, delay: 0.25 }}
            className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {[
              { value: 24800, label: t('land.stat1'), prefix: 'kr ', suffix: '' },
              { value: 98, label: t('land.stat2'), suffix: '%' },
              { value: 4.9, label: t('land.stat3'), suffix: '★', decimals: 1 },
              { value: 12, label: t('land.stat4'), suffix: '' },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm">
                <AnimatedNumber
                  value={s.value}
                  format={(n) => `${s.prefix ?? ''}${s.decimals ? n.toFixed(1) : Math.round(n).toLocaleString()}${s.suffix ?? ''}`}
                  className="font-display text-2xl font-black sm:text-3xl"
                />
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero app preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-5xl px-4 sm:px-6"
        >
          <div className="rounded-t-3xl border border-b-0 border-border bg-card p-2 shadow-float sm:p-3">
            <HeroPreview />
          </div>
        </motion.div>
      </section>

      {/* Logos / trust */}
      <section className="border-y border-border bg-card/40 py-6">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('land.trust')}
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <Badge tone="accent" className="mb-4">{t('land.featBadge')}</Badge>
          <h2 className="font-display text-3xl font-black tracking-tight sm:text-5xl">{t('land.featTitle')}</h2>
          <p className="mt-4 text-muted-foreground">{t('land.featSub')}</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.key}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.04 }}
              className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-card"
            >
              <div className={cn('mb-4 flex h-12 w-12 items-center justify-center rounded-2xl', f.bg)}>
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold">{t('land.' + f.key + 't')}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t('land.' + f.key + 'd')}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive demo */}
      <section id="demo" className="border-y border-border bg-card/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <Badge tone="brand" className="mb-4">{t('land.demoBadge')}</Badge>
            <h2 className="font-display text-3xl font-black tracking-tight sm:text-5xl">{t('land.demoTitle')}</h2>
            <p className="mt-4 text-muted-foreground">{t('land.demoSub')}</p>
          </motion.div>
          <motion.div {...fadeUp} className="mx-auto mt-12 max-w-md">
            <InteractiveDemo />
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
          <Badge tone="accent" className="mb-4">{t('land.testBadge')}</Badge>
          <h2 className="font-display text-3xl font-black tracking-tight sm:text-5xl">{t('land.testTitle')}</h2>
        </motion.div>
        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((tm, i) => (
            <motion.div key={tm.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }} className="rounded-3xl border border-border bg-card p-6">
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-sm leading-relaxed">"{t('land.' + tm.key + 'q')}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full brand-gradient text-sm font-bold text-white">{tm.name[0]}</div>
                <div><p className="text-sm font-bold">{tm.name}</p><p className="text-xs text-muted-foreground">{t('land.' + tm.key + 'r')}</p></div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-border bg-card/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <motion.div {...fadeUp} className="mx-auto max-w-2xl text-center">
            <Badge tone="brand" className="mb-4">{t('land.priceBadge')}</Badge>
            <h2 className="font-display text-3xl font-black tracking-tight sm:text-5xl">{t('land.priceTitle')}</h2>
          </motion.div>
          <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3">
            {PLANS.map((p, i) => (
              <motion.div
                key={p.key}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.05 }}
                className={cn(
                  'relative flex flex-col rounded-3xl border p-6',
                  p.featured ? 'border-brand-500 bg-card shadow-glow' : 'border-border bg-card',
                )}
              >
                {p.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge tone="brand" className="shadow-soft">{t('land.mostPopular')}</Badge>
                  </div>
                )}
                <h3 className="font-display text-lg font-bold">{t('land.' + p.key)}</h3>
                <div className="mt-2 flex items-end gap-1">
                  <span className="font-display text-4xl font-black">{p.price}</span>
                  <span className="mb-1 text-sm text-muted-foreground">{t('land.' + p.key + 'Period')}</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{t('land.' + p.key + 'Desc')}</p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/app" className="mt-6">
                  <Button variant={p.featured ? 'primary' : 'outline'} className="w-full">{t('land.' + p.key + 'Cta')}</Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
        <motion.div {...fadeUp} className="text-center">
          <Badge tone="accent" className="mb-4">{t('land.faqBadge')}</Badge>
          <h2 className="font-display text-3xl font-black tracking-tight sm:text-5xl">{t('land.faqTitle')}</h2>
        </motion.div>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => <FAQItem key={i} {...f} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <motion.div {...fadeUp} className="relative overflow-hidden rounded-[2rem] brand-gradient px-6 py-16 text-center text-white sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid-slate opacity-20 [background-size:24px_24px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-black tracking-tight sm:text-5xl">
              {t('land.ctaTitle')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">{t('land.ctaSub')}</p>
            <Link to="/app">
              <Button size="lg" className="mt-8 h-13 bg-white px-8 text-base text-night hover:bg-white/90">
                {t('land.openApp')} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <Wordmark />
          <p className="text-sm text-muted-foreground">{t('land.footerTag')}</p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground">{t('land.features')}</a>
            <a href="#pricing" className="hover:text-foreground">{t('land.pricing')}</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div {...fadeUp} className="overflow-hidden rounded-2xl border border-border bg-card">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
        <span className="font-semibold">{q}</span>
        <ChevronDown className={cn('h-5 w-5 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
      </button>
      <motion.div initial={false} animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <p className="px-5 pb-5 text-sm text-muted-foreground">{a}</p>
      </motion.div>
    </motion.div>
  )
}

function HeroPreview() {
  return (
    <div className="overflow-hidden rounded-2xl bg-background">
      <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />
        <span className="ml-3 text-xs text-muted-foreground">northbudget.app/dashboard</span>
      </div>
      <div className="grid grid-cols-4 gap-3 p-4 sm:p-6">
        {[
          { label: 'Income', value: 'kr 48,500', tone: 'text-brand-500' },
          { label: 'Expenses', value: 'kr 31,240', tone: 'text-sky' },
          { label: 'Saved', value: 'kr 5,000', tone: 'text-violet-500' },
          { label: 'Health', value: '82/100', tone: 'text-brand-500' },
        ].map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3">
            <p className="text-[10px] uppercase text-muted-foreground sm:text-xs">{s.label}</p>
            <p className={cn('mt-1 font-display text-sm font-black sm:text-lg', s.tone)}>{s.value}</p>
          </div>
        ))}
        <div className="col-span-4 flex h-32 items-end gap-2 rounded-xl border border-border bg-card p-4 sm:h-40">
          {[40, 65, 45, 80, 55, 90, 70, 95].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="flex-1 rounded-t brand-gradient"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function InteractiveDemo() {
  const t = useT()
  const [expenses, setExpenses] = useState(3200)
  const budget = 6000
  const pct = Math.min(100, (expenses / budget) * 100)
  const [items, setItems] = useState<{ name: string; amount: number }[]>([
    { name: 'REMA 1000', amount: 340 },
    { name: 'Espresso House', amount: 68 },
  ])
  const samples = [
    { name: 'Kiwi', amount: 285 },
    { name: 'SATS Gym', amount: 549 },
    { name: 'Vinmonopolet', amount: 420 },
    { name: 'Ruter', amount: 40 },
  ]
  const add = () => {
    const s = samples[items.length % samples.length]
    setItems((prev) => [s, ...prev])
    setExpenses((e) => e + s.amount)
  }

  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-card">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">{t('land.demoBudget')}</p>
          <p className="font-display text-2xl font-black">kr {expenses.toLocaleString()} <span className="text-sm font-medium text-muted-foreground">/ {budget.toLocaleString()}</span></p>
        </div>
        <span className={cn('rounded-full px-2.5 py-1 text-xs font-bold', pct > 80 ? 'bg-amber-500/15 text-amber-500' : 'bg-brand-500/15 text-brand-500')}>{pct.toFixed(0)}%</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-secondary">
        <motion.div className={cn('h-full rounded-full', pct > 90 ? 'bg-red-500' : pct > 80 ? 'bg-amber-500' : 'bg-brand-500')} animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 120, damping: 20 }} />
      </div>
      <div className="mt-4 space-y-1.5">
        {items.slice(0, 4).map((it, i) => (
          <motion.div key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="flex items-center justify-between rounded-xl bg-secondary/50 px-3 py-2 text-sm">
            <span className="font-medium">{it.name}</span>
            <span className="font-bold tabular-nums">kr {it.amount}</span>
          </motion.div>
        ))}
      </div>
      <Button className="mt-4 w-full" onClick={add}>
        <Sparkles className="h-4 w-4" /> {t('land.demoAdd')}
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">{t('land.demoTap')}</p>
    </div>
  )
}
