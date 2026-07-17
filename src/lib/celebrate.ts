import confetti from 'canvas-confetti'

const BRAND = ['#1DB954', '#34d399', '#60A5FA', '#a3e635', '#22c55e']

function reduced(): boolean {
  return (
    document.documentElement.classList.contains('reduce-motion') ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function celebrate() {
  if (reduced()) return
  const end = Date.now() + 900
  const frame = () => {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 60,
      origin: { x: 0, y: 0.7 },
      colors: BRAND,
      disableForReducedMotion: true,
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 60,
      origin: { x: 1, y: 0.7 },
      colors: BRAND,
      disableForReducedMotion: true,
    })
    if (Date.now() < end) requestAnimationFrame(frame)
  }
  frame()
}

export function burst(x = 0.5, y = 0.5) {
  if (reduced()) return
  confetti({
    particleCount: 90,
    spread: 75,
    origin: { x, y },
    colors: BRAND,
    scalar: 0.9,
    disableForReducedMotion: true,
  })
}
