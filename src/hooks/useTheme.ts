import { useEffect } from 'react'
import { useStore } from '@/store/useStore'
import { setDateLocale } from '@/lib/date'

export function useTheme() {
  const theme = useStore((s) => s.settings.theme)
  const reduceMotion = useStore((s) => s.settings.reduceMotion)
  const highContrast = useStore((s) => s.settings.highContrast)
  const language = useStore((s) => s.settings.language)

  useEffect(() => {
    setDateLocale(language)
  }, [language])

  useEffect(() => {
    const root = document.documentElement
    const apply = () => {
      const isDark =
        theme === 'dark' ||
        (theme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      root.classList.toggle('dark', isDark)
    }
    apply()
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    if (theme === 'system') {
      mq.addEventListener('change', apply)
      return () => mq.removeEventListener('change', apply)
    }
  }, [theme])

  useEffect(() => {
    document.documentElement.classList.toggle('reduce-motion', reduceMotion)
  }, [reduceMotion])

  useEffect(() => {
    document.documentElement.classList.toggle('contrast-high', highContrast)
  }, [highContrast])
}
