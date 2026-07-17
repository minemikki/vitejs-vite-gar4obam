import { forwardRef } from 'react'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger' | 'glass'
type Size = 'sm' | 'md' | 'lg' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-500 text-white shadow-soft hover:bg-brand-600 hover:shadow-glow active:scale-[0.98]',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-muted active:scale-[0.98]',
  ghost: 'hover:bg-secondary text-foreground/80 hover:text-foreground',
  outline: 'border border-border bg-transparent hover:bg-secondary active:scale-[0.98]',
  danger: 'bg-danger text-white hover:brightness-110 active:scale-[0.98]',
  glass: 'glass-strong text-foreground hover:bg-card/90 active:scale-[0.98]',
}

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-4 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-6 text-base gap-2 rounded-xl',
  icon: 'h-10 w-10 rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-ring disabled:pointer-events-none disabled:opacity-50 select-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
)
Button.displayName = 'Button'
