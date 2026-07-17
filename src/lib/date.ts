import {
  format as dfFormat,
  parseISO,
  isSameMonth,
  isSameDay,
  addMonths,
  addWeeks,
  addDays,
  addYears,
  differenceInCalendarMonths,
  startOfMonth,
  endOfMonth,
  subMonths,
} from 'date-fns'
import { nb, enUS } from 'date-fns/locale'
import type { Language, RecurrenceInterval } from '@/types'

// Active date-fns locale, switched to match the app language.
let activeLocale = nb
export function setDateLocale(lang: Language) {
  activeLocale = lang === 'en' ? enUS : nb
}

// Locale-aware format wrapper used across the app.
export function format(date: Date, pattern: string): string {
  return dfFormat(date, pattern, { locale: activeLocale })
}

export function fmtDate(iso: string, pattern = 'd MMM yyyy'): string {
  try {
    return dfFormat(parseISO(iso), pattern, { locale: activeLocale })
  } catch {
    return iso
  }
}

export function fmtDay(iso: string): string {
  return fmtDate(iso, 'd MMM')
}

export function relativeDay(iso: string): string {
  const d = parseISO(iso)
  const now = new Date()
  const diff = Math.round((d.getTime() - now.getTime()) / 86400000)
  if (diff === 0) return 'Today'
  if (diff === 1) return 'Tomorrow'
  if (diff === -1) return 'Yesterday'
  if (diff > 1 && diff <= 7) return `In ${diff} days`
  if (diff < -1 && diff >= -7) return `${Math.abs(diff)} days ago`
  return fmtDay(iso)
}

export function advanceDate(iso: string, interval: RecurrenceInterval): string {
  const d = parseISO(iso)
  const map: Record<RecurrenceInterval, Date> = {
    weekly: addWeeks(d, 1),
    biweekly: addWeeks(d, 2),
    monthly: addMonths(d, 1),
    quarterly: addMonths(d, 3),
    yearly: addYears(d, 1),
  }
  return format(map[interval], 'yyyy-MM-dd')
}

export function monthlyFactor(interval: RecurrenceInterval): number {
  const map: Record<RecurrenceInterval, number> = {
    weekly: 52 / 12,
    biweekly: 26 / 12,
    monthly: 1,
    quarterly: 1 / 3,
    yearly: 1 / 12,
  }
  return map[interval]
}

export function yearlyFactor(interval: RecurrenceInterval): number {
  return monthlyFactor(interval) * 12
}

export {
  parseISO,
  isSameMonth,
  isSameDay,
  addMonths,
  addDays,
  differenceInCalendarMonths,
  startOfMonth,
  endOfMonth,
  subMonths,
}
