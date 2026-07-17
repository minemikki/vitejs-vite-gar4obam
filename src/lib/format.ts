import type { Currency } from '@/types'

const CURRENCY_META: Record<Currency, { locale: string; symbol: string; code: string }> = {
  NOK: { locale: 'nb-NO', symbol: 'kr', code: 'NOK' },
  SEK: { locale: 'sv-SE', symbol: 'kr', code: 'SEK' },
  DKK: { locale: 'da-DK', symbol: 'kr', code: 'DKK' },
  ISK: { locale: 'is-IS', symbol: 'kr', code: 'ISK' },
  EUR: { locale: 'fi-FI', symbol: '€', code: 'EUR' },
  USD: { locale: 'en-US', symbol: '$', code: 'USD' },
}

export function formatCurrency(
  amount: number,
  currency: Currency = 'NOK',
  opts: { compact?: boolean; decimals?: number; signed?: boolean } = {},
): string {
  const meta = CURRENCY_META[currency]
  const { compact, decimals = 0, signed } = opts
  const sign = signed && amount > 0 ? '+' : ''
  try {
    const formatted = new Intl.NumberFormat(meta.locale, {
      style: 'currency',
      currency: meta.code,
      notation: compact ? 'compact' : 'standard',
      maximumFractionDigits: compact ? 1 : decimals,
      minimumFractionDigits: 0,
    }).format(amount)
    return sign + formatted
  } catch {
    return `${sign}${meta.symbol} ${amount.toLocaleString()}`
  }
}

export function formatNumber(n: number, compact = false): string {
  return new Intl.NumberFormat('en-US', {
    notation: compact ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(n)
}

export function formatPercent(n: number, decimals = 0): string {
  return `${n >= 0 ? '' : ''}${n.toFixed(decimals)}%`
}

export function currencySymbol(currency: Currency): string {
  return CURRENCY_META[currency].symbol
}
