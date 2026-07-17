import { useCallback } from 'react'
import { useStore } from '@/store/useStore'
import { translate } from '@/lib/i18n'

export function useT() {
  const lang = useStore((s) => s.settings.language)
  return useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(lang, key, vars),
    [lang],
  )
}
