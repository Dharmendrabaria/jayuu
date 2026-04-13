import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface BurstHeart {
  id: number
  x: number
  y: number
  rotate: number
  emoji: string
}

function generateBurstHearts(): BurstHeart[] {
  return Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 280,
    y: (Math.random() - 0.5) * 280,
    rotate: Math.random() * 360,
    emoji: ['❤️', '💕', '💖', '💗', '💝', '🌸'][Math.floor(Math.random() * 6)],
  }))
}

export default function EnvelopeCard({ onNext }: { onNext: () => void }) {
  const [isOpen, setIsOpen] = useState(false)
  const [burstHearts, setBurstHearts] = useState<BurstHeart[]>([])
  const [showMessage, setShowMessage] = useState(false)
  const [showNext, setShowNext] = useState(false)

  const handleOpen = () => {
    if (isOpen) return
    setIsOpen(true)
    setBurstHearts(generateBurstHearts())
    setTimeout(() => setShowMessage(true), 900)
    setTimeout(() => setShowNext(true), 2200)
    setTimeout(() => setBurstHearts([]), 2000)
  }

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
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="font-playfair text-2xl sm:text-3xl text-pink-200 glow-text-soft mb-2">
          Something for you...
        </h2>
        {!isOpen && (
          <p className="font-lato text-sm text-pink-300/60 tracking-wide">
            Tap the envelope to open ✨
          </p>
        )}
      </motion.div>

      {/* Envelope + Message Container */}
      <div className="relative flex flex-col items-center w-full max-w-xs">

        {/* Burst hearts */}
        <AnimatePresence>
          {burstHearts.map((h) => (
            <motion.span
              key={h.id}
              className="absolute text-xl pointer-events-none select-none z-20"
              style={{ top: '50%', left: '50%' }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.5, rotate: 0 }}
              animate={{ x: h.x, y: h.y, opacity: 0, scale: 1.4, rotate: h.rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              {h.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Envelope */}
        <motion.div
          className="relative cursor-pointer select-none"
          whileTap={{ scale: 0.96 }}
          onClick={handleOpen}
          animate={isOpen ? {} : {
            y: [0, -8, 0],
          }}
          transition={isOpen ? {} : {
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {/* Envelope body */}
          <div
            className="envelope-body rounded-2xl relative overflow-hidden"
            style={{ width: '260px', height: '180px' }}
          >
            {/* Envelope bottom flap lines */}
            <div
              className="absolute bottom-0 left-0 right-0"
              style={{
                height: '90px',
                background: 'linear-gradient(135deg, #ffe4ec 0%, #ffc2d4 100%)',
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)',
              }}
            />
            <div
              className="absolute bottom-0 left-0"
              style={{
                width: '130px',
                height: '90px',
                background: 'linear-gradient(135deg, #ffd6e5 0%, #ffb3cc 100%)',
                clipPath: 'polygon(0 100%, 0 0, 100% 100%)',
              }}
            />
            <div
              className="absolute bottom-0 right-0"
              style={{
                width: '130px',
                height: '90px',
                background: 'linear-gradient(225deg, #ffd6e5 0%, #ffb3cc 100%)',
                clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
              }}
            />

            {/* Wax seal */}
            {!isOpen && (
              <motion.div
                className="absolute"
                style={{
                  bottom: '24px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 10,
                }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-lg"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b9d, #c94b8a)',
                    boxShadow: '0 2px 12px rgba(255,107,157,0.5)',
                  }}
                >
                  ❤️
                </div>
              </motion.div>
            )}
          </div>

          {/* Envelope top flap */}
          <motion.div
            className="absolute top-0 left-0 right-0"
            style={{
              height: '110px',
              transformOrigin: 'top center',
              zIndex: 5,
            }}
            animate={isOpen ? { rotateX: -180, opacity: 0.3 } : { rotateX: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="w-full h-full"
              style={{
                background: 'linear-gradient(135deg, #ff9ec4 0%, #ff6b9d 60%, #e91e8c 100%)',
                clipPath: 'polygon(0 0, 50% 100%, 100% 0)',
                borderRadius: '12px 12px 0 0',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Message card slides out */}
        <AnimatePresence>
          {showMessage && (
            <motion.div
              className="glass-card-bright rounded-3xl p-7 mt-6 w-full text-center relative overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 180, damping: 20 }}
            >
              {/* Decorative top */}
              <div className="text-3xl mb-4">💌</div>

              <p className="font-playfair italic text-xl sm:text-2xl text-pink-100 leading-relaxed mb-3">
                "I just wanted to say...
              </p>
              <p className="font-dancing text-3xl sm:text-4xl mb-4" style={{
                background: 'linear-gradient(135deg, #ff9ec4, #ff6b9d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                filter: 'drop-shadow(0 0 8px rgba(255,107,157,0.5))',
              }}>
                I really like you, Jayu ❤️"
              </p>

              <div className="w-16 h-0.5 mx-auto mb-4 rounded-full" style={{
                background: 'linear-gradient(90deg, transparent, #ff6b9d, transparent)'
              }} />

              <p className="font-lato text-sm text-pink-200/60 italic tracking-wide">
                — Dhaval
              </p>

              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 pointer-events-none rounded-3xl"
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

      {/* Next button */}
      <AnimatePresence>
        {showNext && (
          <motion.div
            className="mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <button
              id="envelope-next-btn"
              onClick={onNext}
              className="btn-romantic rounded-full px-8 py-3.5 font-lato font-bold text-white text-sm tracking-widest uppercase cursor-pointer"
              aria-label="Continue to next section"
            >
              Keep going 💕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
