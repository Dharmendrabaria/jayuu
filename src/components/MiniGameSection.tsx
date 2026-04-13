import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function MiniGameSection({ onNext }: { onNext: () => void }) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  const [velocity, setVelocity] = useState({ vx: 1, vy: 1 })
  const [caught, setCaught] = useState(false)
  const [showNext, setShowNext] = useState(false)
  
  // Start heart movement
  useEffect(() => {
    if (caught) return

    const moveHeart = () => {
      setPosition((prev) => {
        let newX = prev.x + velocity.vx * 15
        let newY = prev.y + velocity.vy * 15
        let newVx = velocity.vx
        let newVy = velocity.vy

        // Bounce off edges (keep within 15% to 85% to not overflow screen)
        if (newX <= 15 || newX >= 85) newVx *= -1
        if (newY <= 15 || newY >= 75) newVy *= -1

        // Add some randomness to speed so it's not predictable
        if (Math.random() > 0.8) {
           newVx = (Math.random() > 0.5 ? 1 : -1) * (0.8 + Math.random())
           newVy = (Math.random() > 0.5 ? 1 : -1) * (0.8 + Math.random())
        }

        setVelocity({ vx: newVx, vy: newVy })

        // Clamp values
        return {
          x: Math.max(15, Math.min(newX, 85)),
          y: Math.max(15, Math.min(newY, 75))
        }
      })
    }

    const intervalId = setInterval(moveHeart, 600) // Change position every 600ms to be catchable but tricky
    return () => clearInterval(intervalId)
  }, [caught, velocity])

  const handleCatch = () => {
    if (caught) return
    setCaught(true)
    setTimeout(() => setShowNext(true), 2500)
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-dvh min-h-screen px-6 py-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-10 z-10 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="text-4xl mb-3">🎯</div>
        <h2 className="font-playfair text-2xl sm:text-3xl text-pink-200 glow-text-soft">
          Catch My Heart!
        </h2>
        {!caught && (
          <p className="font-lato text-sm text-pink-300/60 mt-2 tracking-wide">
            Tap the heart before it escapes...
          </p>
        )}
      </motion.div>

      {/* The escaping heart */}
      <div className="relative w-full flex-grow max-h-[50vh]">
         <AnimatePresence>
            {!caught && (
                <motion.div
                className="absolute inset-0 z-20 cursor-pointer"
                animate={{
                    left: `${position.x}%`,
                    top: `${position.y}%`,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                transition={{ type: "spring", stiffness: 60, damping: 15 }} // Smooth movement between jumps
                onClick={handleCatch}
                whileTap={{ scale: 0.8 }}
                >
                <motion.div
                    className="text-6xl drop-shadow-[0_0_15px_rgba(255,107,157,0.8)]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    💖
                </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

       {/* Caught Success Message */}
       <AnimatePresence>
        {caught && (
          <motion.div
            className="absolute z-30 glass-card-bright rounded-3xl p-8 w-full max-w-sm text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div className="text-6xl mb-4">💕</div>
            <h3 className="font-dancing text-4xl text-pink-100 mb-3" style={{
                background: 'linear-gradient(135deg, #ff9ec4, #ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>
                Gotcha!
            </h3>
            <p className="font-playfair italic text-lg text-pink-200/80 leading-relaxed mb-1">
               You finally caught my heart...
            </p>
            <p className="font-lato text-sm text-pink-300/60 uppercase tracking-widest mt-4">
               (Took you long enough 😉)
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Next button */}
      <AnimatePresence>
        {showNext && (
          <motion.div
            className="mt-10 z-40 fixed bottom-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <button
              onClick={onNext}
              className="btn-romantic rounded-full px-8 py-3.5 font-lato font-bold text-white text-sm tracking-widest uppercase cursor-pointer"
            >
              What's Next? 🦋
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  )
}
