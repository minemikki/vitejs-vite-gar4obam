import { Logo } from '@/components/shared/Logo'

export function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse-ring rounded-2xl bg-brand-500/40" />
          <Logo className="relative h-11 w-11" />
        </div>
        <div className="h-1 w-24 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-1/2 animate-shimmer rounded-full bg-brand-500" />
        </div>
      </div>
    </div>
  )
}
