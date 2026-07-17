import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-xl brand-gradient shadow-glow',
        className,
      )}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-2/3 w-2/3 text-white">
        <path
          d="M5 14.5 12 7l7 7.5M8 17.5 12 13l4 4.5"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Logo className="h-8 w-8" />
      <span className="font-display text-lg font-extrabold tracking-tight">
        North<span className="brand-gradient-text">Budget</span>
      </span>
    </div>
  )
}
