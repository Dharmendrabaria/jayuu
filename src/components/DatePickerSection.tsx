import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DATE_IDEAS = [
  { id: 1, label: "Late night coffee & deep talks ☕", checked: false },
  { id: 2, label: "Long drive with our favorite playlist 🚗", checked: false },
  { id: 3, label: "Street food hopping & momos 🌮", checked: false },
  { id: 4, label: "Stargazing and holding hands ✨", checked: false },
]

export default function DatePickerSection({ onNext }: { onNext: () => void }) {
  const [ideas, setIdeas] = useState(DATE_IDEAS)
  const [showPopup, setShowPopup] = useState(false)
  const [showNext, setShowNext] = useState(false)

  const handleCheck = (id: number) => {
    setIdeas((prev) =>
      prev.map((idea) =>
        idea.id === id ? { ...idea, checked: !idea.checked } : idea
      )
    )

    // Show popup briefly every time they check something
    setShowPopup(true)
    setTimeout(() => setShowPopup(false), 2000)

    // Show next button after at least one is selected
    if (!showNext) {
        setTimeout(() => setShowNext(true), 1500)
    }
  }

  return (
    <motion.div
      className="relative flex flex-col items-center justify-center min-h-dvh min-h-screen px-6 py-16"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-4xl mb-3">🤭</div>
        <h2 className="font-playfair text-2xl sm:text-3xl text-pink-200 glow-text-soft">
          Since you're here...
        </h2>
        <p className="font-lato text-sm text-pink-300/80 mt-2 tracking-wide leading-relaxed max-w-xs mx-auto">
          You officially owe me a date now! <br/> 
          Pick your favorite below 👇
        </p>
      </motion.div>

      {/* Checklist */}
      <div className="w-full max-w-xs space-y-4 relative">
        {ideas.map((idea, index) => (
          <motion.div
            key={idea.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.15 }}
            className={`glass-card rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-300 ${
              idea.checked ? 'border-pink-400 bg-pink-500/10' : 'border-transparent hover:border-pink-400/30'
            }`}
            onClick={() => handleCheck(idea.id)}
            whileTap={{ scale: 0.98 }}
            role="checkbox"
            aria-checked={idea.checked}
          >
             {/* Custom Checkbox */}
            <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                idea.checked ? 'bg-pink-500 border-pink-500' : 'border-pink-300/50'
            }`}>
               {idea.checked && (
                   <motion.svg 
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                   >
                       <polyline points="20 6 9 17 4 12" />
                   </motion.svg>
               )}
            </div>

            <span className={`font-lato text-sm sm:text-base transition-colors ${
                idea.checked ? 'text-white font-semibold' : 'text-pink-100/90'
            }`}>
               {idea.label}
            </span>
          </motion.div>
        ))}

        {/* Cheeky Popup Toast */}
        <AnimatePresence>
            {showPopup && (
                <motion.div
                 className="absolute -top-12 left-1/2 -translate-x-1/2 bg-yellow-400 text-black font-bold text-xs px-4 py-2 rounded-full whitespace-nowrap shadow-lg z-50 pointer-events-none"
                 initial={{ opacity: 0, y: 10, x: '-50%' }}
                 animate={{ opacity: 1, y: 0, x: '-50%' }}
                 exit={{ opacity: 0, y: -10, x: '-50%' }}
                >
                    Noted! I'll pick you up 😉🚗
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      {/* Next button */}
      <AnimatePresence>
        {showNext && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <button
              onClick={onNext}
              className="btn-romantic rounded-full px-8 py-3.5 font-lato font-bold text-white text-sm tracking-widest uppercase cursor-pointer"
            >
               Ready? 💌
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
