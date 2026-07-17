import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import type { ReactNode } from 'react'
import { formatNumber } from '@/lib/format'

const AXIS = { fontSize: 11, fill: 'hsl(var(--muted-foreground))' }

function ChartTooltip({ active, payload, label, fmt }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-border bg-popover/95 px-3 py-2 shadow-float backdrop-blur-xl">
      {label && <p className="mb-1 text-xs font-semibold text-muted-foreground">{label}</p>}
      <div className="space-y-0.5">
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
            <span className="text-muted-foreground">{p.name}</span>
            <span className="ml-auto font-bold tabular-nums">
              {fmt ? fmt(p.value) : formatNumber(p.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CashflowChart({
  data,
  fmt,
}: {
  data: { label: string; income: number; expenses: number }[]
  fmt?: (n: number) => string
}) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 6, left: -18, bottom: 0 }}>
        <defs>
          <linearGradient id="inc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1DB954" stopOpacity={0.35} />
            <stop offset="100%" stopColor="#1DB954" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.3} />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis
          tick={AXIS}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => formatNumber(v, true)}
        />
        <Tooltip content={(p) => <ChartTooltip {...p} fmt={fmt} />} />
        <Area
          type="monotone"
          dataKey="income"
          name="Income"
          stroke="#1DB954"
          strokeWidth={2.5}
          fill="url(#inc)"
        />
        <Area
          type="monotone"
          dataKey="expenses"
          name="Expenses"
          stroke="#60A5FA"
          strokeWidth={2.5}
          fill="url(#exp)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export function TrendBars({
  data,
  fmt,
  height = 260,
}: {
  data: { label: string; income: number; expenses: number; savings?: number }[]
  fmt?: (n: number) => string
  height?: number
}) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 6, left: -18, bottom: 0 }} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v, true)} />
        <Tooltip cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.5 }} content={(p) => <ChartTooltip {...p} fmt={fmt} />} />
        <Bar dataKey="income" name="Income" fill="#1DB954" radius={[6, 6, 0, 0]} maxBarSize={22} />
        <Bar dataKey="expenses" name="Expenses" fill="#60A5FA" radius={[6, 6, 0, 0]} maxBarSize={22} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export function SavingsLine({
  data,
  fmt,
}: {
  data: { label: string; value: number }[]
  fmt?: (n: number) => string
}) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -18, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
        <XAxis dataKey="label" tick={AXIS} axisLine={false} tickLine={false} />
        <YAxis tick={AXIS} axisLine={false} tickLine={false} tickFormatter={(v) => formatNumber(v, true)} />
        <Tooltip content={(p) => <ChartTooltip {...p} fmt={fmt} />} />
        <Line
          type="monotone"
          dataKey="value"
          name="Saved"
          stroke="#1DB954"
          strokeWidth={3}
          dot={{ r: 3, fill: '#1DB954' }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function DonutChart({
  data,
  fmt,
  center,
}: {
  data: { name: string; value: number; color: string }[]
  fmt?: (n: number) => string
  center?: ReactNode
}) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={72}
            outerRadius={104}
            paddingAngle={2}
            stroke="none"
          >
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
          <Tooltip content={(p) => <ChartTooltip {...p} fmt={fmt} />} />
        </PieChart>
      </ResponsiveContainer>
      {center && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {center}
        </div>
      )}
    </div>
  )
}

export { ResponsiveContainer }
