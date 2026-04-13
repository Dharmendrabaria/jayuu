import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const FINAL_LINES = [
  "Jayu,",
  "I don't have big grand words.",
  "Just this — you make things feel lighter.",
  "And I'm really, really glad",
  "that you're in my life. 🌸",
  "— Dhaval ❤️",
]

interface BurstHeart {
  id: number; x: number; y: number; emoji: string; rotate: number
}

export default function FinalMessage() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showCelebration, setShowCelebration] = useState(false)
  const [hearts, setHearts] = useState<BurstHeart[]>([])

  useEffect(() => {
    if (visibleLines < FINAL_LINES.length) {
      const timer = setTimeout(() => {
        setVisibleLines((v) => v + 1)
      }, visibleLines === 0 ? 600 : 900)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setShowCelebration(true)
        triggerHearts()
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [visibleLines])

  const triggerHearts = () => {
    const newHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 340,
      y: (Math.random() - 0.5) * 340,
      emoji: ['❤️', '💕', '💖', '💗', '💝', '🌸', '✨'][Math.floor(Math.random() * 7)],
      rotate: Math.random() * 360,
    }))
    setHearts(newHearts)
    setTimeout(() => setHearts([]), 2500)
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-dvh min-h-screen px-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Glow radial */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,107,157,0.1) 0%, transparent 70%)',
        }}
      />

      {/* Burst hearts on celebration */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.span
            key={h.id}
            className="absolute text-2xl pointer-events-none select-none z-20"
            style={{ top: '50%', left: '50%' }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{ x: h.x, y: h.y, opacity: 0, scale: 1.6, rotate: h.rotate }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {h.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Header heart */}
      <motion.div
        className="text-6xl mb-10 animate-heartbeat"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
      >
        ❤️
      </motion.div>

      {/* Lettercard */}
      <div
        className="glass-card-bright rounded-3xl p-8 w-full max-w-sm text-center relative overflow-hidden"
      >
        {/* Decorative corner roses */}
        {['🌸', '🌹'].map((r, i) => (
          <span
            key={i}
            className="absolute text-2xl pointer-events-none select-none opacity-40"
            style={{ top: 12, [i === 0 ? 'left' : 'right']: 12 }}
          >
            {r}
          </span>
        ))}

        <div className="space-y-3 min-h-[200px] flex flex-col justify-center">
          {FINAL_LINES.map((line, i) => (
            <AnimatePresence key={i}>
              {i < visibleLines && (
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className={
                    i === 0
                      ? 'font-dancing text-4xl mb-2'
                      : i === FINAL_LINES.length - 1
                      ? 'font-lato text-base text-pink-300/80 italic mt-4'
                      : 'font-playfair text-lg sm:text-xl text-pink-100 leading-relaxed'
                  }
                  style={
                    i === 0
                      ? {
                          background: 'linear-gradient(135deg, #ff9ec4, #ff6b9d)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text',
                          filter: 'drop-shadow(0 0 8px rgba(255,107,157,0.5))',
                        }
                      : {}
                  }
                >
                  {line}
                </motion.p>
              )}
            </AnimatePresence>
          ))}
        </div>

        {/* Shimmer */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)',
            backgroundSize: '200% auto',
            animation: 'shimmer 3s linear infinite',
          }}
        />
      </div>

      {/* Celebration message */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            className="mt-10 text-center"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <p className="font-dancing text-3xl mb-3" style={{
              background: 'linear-gradient(135deg, #ff9ec4, #ff6b9d, #e91e8c)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 10px rgba(255,107,157,0.5))',
            }}>
              With all my heart 💕
            </p>

            <p className="font-lato text-xs text-pink-300/40 tracking-widest uppercase">
              made with love, just for you
            </p>

            {/* Reply on Snapchat */}
            <motion.a
              href="https://snapchat.com/add/dhvl_2411"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 border border-pink-400/30 rounded-full px-6 py-2.5 font-lato text-xs text-pink-300/60
                         tracking-widest uppercase cursor-pointer hover:border-pink-400/60 hover:text-pink-300/90
                         transition-all duration-300 inline-block"
              whileTap={{ scale: 0.96 }}
              aria-label="Reply to me on Snapchat"
            >
              💌 Replay
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
