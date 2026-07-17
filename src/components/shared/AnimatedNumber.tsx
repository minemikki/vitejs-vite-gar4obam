import { useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'

export function AnimatedNumber({
  value,
  format,
  className,
  duration = 1.1,
}: {
  value: number
  format: (n: number) => string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const prev = useRef(0)

  useEffect(() => {
    if (!inView) return
    const node = ref.current
    if (!node) return
    const reduce =
      document.documentElement.classList.contains('reduce-motion') ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      node.textContent = format(value)
      prev.current = value
      return
    }
    const controls = animate(prev.current, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = format(v)
      },
    })
    prev.current = value
    return () => controls.stop()
  }, [value, inView, format, duration])

  return <span ref={ref} className={className}>{format(0)}</span>
}
