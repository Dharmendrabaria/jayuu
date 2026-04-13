import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SURPRISE_MESSAGES = [
  {
    quote: "Every time you smile, you light up my entire world. 🌟",
    from: "Your secret admirer... Dhaval 😊",
  },
  {
    quote: "If happiness had a face, it would look just like yours, Jayu. 🌸",
    from: "— Dhaval",
  },
  {
    quote: "Talking to you is my favorite part of any day. 💬",
    from: "— Someone who really means it",
  },
  {
    quote: "You don't even know how happy your presence makes me. 🌷",
    from: "— Dhaval ❤️",
  },
  {
    quote: "Every click brings you closer to my heart... and I don't mind at all. 💓",
    from: "— Dhaval 🥺",
  },
]

interface RipplePos { x: number; y: number }

export default function SurpriseSection({ onNext }: { onNext: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const [ripples, setRipples] = useState<RipplePos[]>([])
  const [showQuote, setShowQuote] = useState(true)
  const [allDone, setAllDone] = useState(false)

  const handleSurpriseClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const newRipple = { x, y }
    setRipples((r) => [...r, newRipple])
    setTimeout(() => setRipples((r) => r.slice(1)), 800)

    const newCount = clickCount + 1
    setClickCount(newCount)
    setShowQuote(false)
    setTimeout(() => {
      setMessageIndex((prev) => (prev + 1) % SURPRISE_MESSAGES.length)
      setShowQuote(true)
    }, 300)

    if (newCount >= 4) {
      setTimeout(() => setAllDone(true), 600)
    }
  }

  const current = SURPRISE_MESSAGES[messageIndex]

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-dvh min-h-screen px-6 py-16"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-4xl mb-3">🎁</div>
        <h2 className="font-playfair text-2xl sm:text-3xl text-pink-200 glow-text-soft">
          Your Surprise
        </h2>
        <p className="font-lato text-sm text-pink-300/50 mt-2 tracking-wide">
          Keep clicking for more 💝
        </p>
      </motion.div>

      {/* Quote card */}
      <div className="w-full max-w-sm mb-8">
        <AnimatePresence mode="wait">
          {showQuote && (
            <motion.div
              key={messageIndex}
              className="glass-card-bright rounded-3xl p-8 text-center relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            >
              {/* Quote mark */}
              <div
                className="font-playfair text-7xl text-pink-400/20 absolute -top-2 left-4 leading-none select-none"
                aria-hidden="true"
              >
                "
              </div>

              <p className="font-playfair italic text-lg sm:text-xl text-pink-100 leading-relaxed mb-5 relative z-10">
                {current.quote}
              </p>

              <div className="w-12 h-0.5 mx-auto mb-4 rounded-full" style={{
                background: 'linear-gradient(90deg, transparent, #ff6b9d, transparent)'
              }} />

              <p className="font-dancing text-xl text-pink-300/70">
                {current.from}
              </p>

              {/* Shimmer */}
              <div
                className="absolute inset-0 rounded-3xl pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.04) 50%, transparent 70%)',
                  backgroundSize: '200% auto',
                  animation: 'shimmer 3s linear infinite',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click counter */}
      {clickCount > 0 && (
        <motion.div
          className="mb-6 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-pink-300/50 font-lato text-xs tracking-widest">
            {clickCount} surprise{clickCount !== 1 ? 's' : ''} revealed
          </span>
          <div className="flex gap-1">
            {Array.from({ length: Math.min(clickCount, 5) }).map((_, i) => (
              <motion.span
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm"
              >
                💕
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Surprise button */}
      {!allDone && (
        <motion.button
          id="surprise-click-btn"
          onClick={handleSurpriseClick}
          className="btn-romantic relative overflow-hidden rounded-full px-10 py-4 font-lato font-bold text-white text-base tracking-widest uppercase cursor-pointer select-none"
          whileTap={{ scale: 0.94 }}
          aria-label="Click for a surprise"
        >
          <span className="relative z-10 flex items-center gap-2">
            Click for a surprise ❤️
          </span>

          {/* Ripple effects */}
          {ripples.map((r, i) => (
            <motion.span
              key={i}
              className="absolute rounded-full bg-white/20 pointer-events-none"
              style={{ left: r.x - 20, top: r.y - 20, width: 40, height: 40 }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 5, opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            />
          ))}
        </motion.button>
      )}

      {/* All done — transition button */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <p className="font-playfair italic text-pink-200/80 text-lg text-center max-w-xs">
              You've unlocked all my little secrets 🥺
            </p>
            <button
              id="surprise-finish-btn"
              onClick={onNext}
              className="btn-romantic rounded-full px-8 py-3.5 font-lato font-bold text-white text-sm tracking-widest uppercase cursor-pointer"
              aria-label="Go to final message"
            >
              One last thing... 💖
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
