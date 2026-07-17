import { motion } from 'framer-motion'

// Semi-circular gauge for the financial health score.
export function Gauge({
  value,
  max = 100,
  label,
  sublabel,
  size = 220,
}: {
  value: number
  max?: number
  label?: string
  sublabel?: string
  size?: number
}) {
  const stroke = 16
  const r = (size - stroke) / 2
  const cx = size / 2
  const cy = size / 2
  const circumference = Math.PI * r // semicircle
  const pct = Math.min(1, Math.max(0, value / max))
  const offset = circumference * (1 - pct)

  const color =
    value >= 85 ? '#1DB954' : value >= 70 ? '#34d399' : value >= 55 ? '#60A5FA' : value >= 40 ? '#f59e0b' : '#ef4444'

  return (
    <div className="relative flex flex-col items-center" style={{ width: size, height: size / 2 + 44 }}>
      <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="55%" stopColor="#1DB954" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        <path
          d={`M ${stroke / 2} ${cy} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${cy}`}
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        <motion.path
          d={`M ${stroke / 2} ${cy} A ${r} ${r} 0 0 1 ${size - stroke / 2} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="font-display text-4xl font-black tabular-nums"
          style={{ color }}
        >
          {Math.round(value)}
        </motion.span>
        {label && <span className="text-sm font-bold text-foreground -mt-1">{label}</span>}
        {sublabel && <span className="text-xs text-muted-foreground">{sublabel}</span>}
      </div>
    </div>
  )
}
