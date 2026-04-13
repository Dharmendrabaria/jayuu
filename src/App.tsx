import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import FloatingHearts from './components/FloatingHearts'
import StarField from './components/StarField'
import WelcomeScreen from './components/WelcomeScreen'
import LoveMessageSection from './components/LoveMessageSection'
import EnvelopeCard from './components/EnvelopeCard'
import SurpriseSection from './components/SurpriseSection'
import FinalMessage from './components/FinalMessage'

import MiniGameSection from './components/MiniGameSection'
import DatePickerSection from './components/DatePickerSection'

type Section = 'welcome' | 'message' | 'envelope' | 'surprise' | 'minigame' | 'date' | 'final'

const SECTION_ORDER: Section[] = ['welcome', 'message', 'envelope', 'surprise', 'minigame', 'date', 'final']

/* Progress dots */
function ProgressDots({ current }: { current: Section }) {
  const idx = SECTION_ORDER.indexOf(current)
  return (
    <div className="fixed top-5 left-0 right-0 flex justify-center gap-2 z-50 pointer-events-none" aria-hidden="true">
      {SECTION_ORDER.slice(1).map((s, i) => {
        const dotIdx = i + 1
        const active = dotIdx <= idx
        return (
          <motion.div
            key={s}
            className="rounded-full"
            animate={{
              width: active ? 20 : 6,
              height: 6,
              backgroundColor: active ? '#ff6b9d' : 'rgba(255,107,157,0.25)',
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        )
      })}
    </div>
  )
}

export default function App() {
  const [section, setSection] = useState<Section>('welcome')

  const goTo = (next: Section) => setSection(next)

  return (
    <div className="bg-romantic relative">
      {/* Layered backgrounds */}
      <StarField />
      <FloatingHearts />

      {/* Progress indicator (hidden on welcome) */}
      {section !== 'welcome' && <ProgressDots current={section} />}

      {/* Section router with AnimatePresence */}
      <AnimatePresence mode="wait">
        {section === 'welcome' && (
          <motion.div key="welcome">
            <WelcomeScreen onEnter={() => goTo('message')} />
          </motion.div>
        )}

        {section === 'message' && (
          <motion.div key="message">
            <LoveMessageSection onNext={() => goTo('envelope')} />
          </motion.div>
        )}

        {section === 'envelope' && (
          <motion.div key="envelope">
            <EnvelopeCard onNext={() => goTo('surprise')} />
          </motion.div>
        )}

        {section === 'surprise' && (
          <motion.div key="surprise">
            <SurpriseSection onNext={() => goTo('minigame')} />
          </motion.div>
        )}

        {section === 'minigame' && (
          <motion.div key="minigame">
            <MiniGameSection onNext={() => goTo('date')} />
          </motion.div>
        )}

        {section === 'date' && (
          <motion.div key="date">
            <DatePickerSection onNext={() => goTo('final')} />
          </motion.div>
        )}

        {section === 'final' && (
          <motion.div key="final">
            <FinalMessage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

