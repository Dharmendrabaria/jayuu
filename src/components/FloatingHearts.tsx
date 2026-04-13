import { useEffect, useRef } from 'react'

interface FloatingHeart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  emoji: string
}

const HEARTS: FloatingHeart[] = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  size: 12 + Math.random() * 20,
  duration: 8 + Math.random() * 12,
  delay: Math.random() * 10,
  emoji: ['❤️', '💕', '💗', '💖', '💝', '🌸'][Math.floor(Math.random() * 6)],
}))

export default function FloatingHearts() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {HEARTS.map((heart) => (
        <div
          key={heart.id}
          className="absolute select-none"
          style={{
            left: `${heart.x}%`,
            bottom: '-60px',
            fontSize: `${heart.size}px`,
            animationName: 'floatUp',
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
            animationFillMode: 'both',
            opacity: 0,
          }}
        >
          {heart.emoji}
        </div>
      ))}
    </div>
  )
}
