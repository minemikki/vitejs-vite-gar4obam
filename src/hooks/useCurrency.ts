import { useCallback } from 'react'
import { useStore } from '@/store/useStore'
import { formatCurrency } from '@/lib/format'

export function useCurrency() {
  const currency = useStore((s) => s.settings.currency)
  const fmt = useCallback(
    (amount: number, opts?: Parameters<typeof formatCurrency>[2]) =>
      formatCurrency(amount, currency, opts),
    [currency],
  )
  return { fmt, currency }
}
