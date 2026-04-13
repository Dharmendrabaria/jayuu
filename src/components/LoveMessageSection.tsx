import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const MESSAGES = [
  {
    text: "I don't know where this goes...",
    pause: 900,
  },
  {
    text: "But talking to you just makes my day so much better.",
    pause: 1200,
  },
  {
    text: "You've become a small, happy part of my life 😊",
    pause: 1000,
  },
  {
    text: "And I thought you should know that.",
    pause: 800,
  },
]

interface TypedMessage {
  full: string
  typed: string
  done: boolean
}

export default function LoveMessageSection({ onNext }: { onNext: () => void }) {
  const [messages, setMessages] = useState<TypedMessage[]>(
    MESSAGES.map((m) => ({ full: m.text, typed: '', done: false }))
  )
  const [currentMsg, setCurrentMsg] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [showNext, setShowNext] = useState(false)

  useEffect(() => {
    if (currentMsg >= MESSAGES.length) {
      setTimeout(() => setShowNext(true), 800)
      return
    }

    const msg = MESSAGES[currentMsg]

    if (currentChar < msg.text.length) {
      const timeout = setTimeout(() => {
        setMessages((prev) =>
          prev.map((m, i) =>
            i === currentMsg
              ? { ...m, typed: msg.text.slice(0, currentChar + 1) }
              : m
          )
        )
        setCurrentChar((c) => c + 1)
      }, 45)
      return () => clearTimeout(timeout)
    } else {
      // Message done — wait, then move next
      setMessages((prev) =>
        prev.map((m, i) => (i === currentMsg ? { ...m, done: true } : m))
      )
      const timeout = setTimeout(() => {
        setCurrentMsg((m) => m + 1)
        setCurrentChar(0)
      }, msg.pause)
      return () => clearTimeout(timeout)
    }
  }, [currentMsg, currentChar])

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
        transition={{ delay: 0.2 }}
      >
        <div className="text-4xl mb-3">💬</div>
        <h2 className="font-playfair text-2xl sm:text-3xl text-pink-200 glow-text-soft">
          A little something...
        </h2>
      </motion.div>

      {/* Messages container */}
      <div className="w-full max-w-sm space-y-5">
        {messages.map((msg, i) => {
          const isVisible = i <= currentMsg
          const isTyping = i === currentMsg && !msg.done

          if (!isVisible || msg.typed.length === 0) return null

          return (
            <motion.div
              key={i}
              className="glass-card rounded-2xl px-5 py-4"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              {/* Typing indicator dots */}
              {isTyping && msg.typed.length === 0 && (
                <div className="flex gap-1.5 items-center h-5">
                  {[0, 1, 2].map((dot) => (
                    <motion.div
                      key={dot}
                      className="w-2 h-2 rounded-full bg-pink-400"
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: dot * 0.15,
                      }}
                    />
                  ))}
                </div>
              )}

              <p
                className="font-lato text-base sm:text-lg text-pink-100 leading-relaxed"
              >
                {msg.typed}
                {isTyping && (
                  <span className="inline-block w-0.5 h-4 bg-pink-400 ml-0.5 align-middle animate-pulse" />
                )}
              </p>
            </motion.div>
          )
        })}
      </div>

      {/* Typing indicator when waiting for next message */}
      {currentMsg < MESSAGES.length && messages[currentMsg]?.typed.length === 0 && (
        <motion.div
          className="mt-5 glass-card rounded-2xl px-5 py-4 w-full max-w-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex gap-1.5 items-center h-5">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 rounded-full bg-pink-400"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: dot * 0.15 }}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Next button */}
      {showNext && (
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <button
            id="love-msg-next-btn"
            onClick={onNext}
            className="btn-romantic rounded-full px-8 py-3.5 font-lato font-bold text-white text-sm tracking-widest uppercase cursor-pointer"
            aria-label="Continue to next section"
          >
            There's more ✨
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}
