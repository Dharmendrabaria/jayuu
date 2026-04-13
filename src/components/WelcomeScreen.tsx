import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAME = 'Jayu'
const SUBTITLE = 'Something special, just for you...'

export default function WelcomeScreen({ onEnter }: { onEnter: () => void }) {
  const [showSubtitle, setShowSubtitle] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [ripple, setRipple] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 1800)
    const t2 = setTimeout(() => setShowButton(true), 3200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const handleClick = () => {
    setRipple(true)
    setTimeout(() => onEnter(), 600)
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-dvh min-h-screen px-6 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {/* Radial glow behind name */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,107,157,0.12) 0%, transparent 70%)',
        }}
      />

      {/* Heart icon */}
      <motion.div
        className="text-6xl mb-6 animate-heartbeat"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
      >
        ❤️
      </motion.div>

      {/* Main name */}
      <motion.div className="mb-4 relative">
        {/* Letter by letter animation */}
        <div className="font-dancing text-7xl sm:text-8xl leading-tight">
          {NAME.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              style={{
                background: 'linear-gradient(135deg, #ff9ec4 0%, #ff6b9d 40%, #ff3d7f 70%, #e91e8c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 12px rgba(255,107,157,0.7))',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5 + i * 0.15,
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
            >
              {char}
            </motion.span>
          ))}
        </div>

        {/* Underline decoration */}
        <motion.div
          className="mt-2 mx-auto h-0.5 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent, #ff6b9d, transparent)',
          }}
          initial={{ width: 0 }}
          animate={{ width: '80%' }}
          transition={{ delay: 1.4, duration: 0.8, ease: 'easeOut' }}
        />
      </motion.div>

      {/* Subtitle */}
      <AnimatePresence>
        {showSubtitle && (
          <motion.p
            className="font-lato text-base sm:text-lg text-pink-200/70 mb-12 max-w-xs tracking-wide"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {SUBTITLE}
          </motion.p>
        )}
      </AnimatePresence>

      {/* CTA button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="relative"
          >
            <button
              id="welcome-enter-btn"
              onClick={handleClick}
              className="btn-romantic relative overflow-hidden rounded-full px-10 py-4 font-lato font-bold text-white text-base tracking-widest uppercase cursor-pointer select-none"
              aria-label="Enter the love letter"
            >
              <span className="relative z-10 flex items-center gap-2">
                Open My Heart
                <span className="text-lg">💌</span>
              </span>

              {/* Ripple */}
              {ripple && (
                <span
                  className="absolute inset-0 rounded-full border-2 border-pink-300"
                  style={{ animation: 'ripple 0.6s ease-out forwards' }}
                />
              )}
            </button>

            {/* Pulse ring */}
            <div
              className="absolute inset-0 rounded-full -z-10"
              style={{
                animation: 'pulse-glow 2s ease-in-out infinite',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating sparkles */}
      {['✨', '💫', '🌸'].map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-2xl pointer-events-none select-none"
          style={{
            left: `${[15, 80, 50][i]}%`,
            top: `${[25, 20, 75][i]}%`,
          }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeInOut',
          }}
        >
          {s}
        </motion.span>
      ))}
    </motion.div>
  )
}
