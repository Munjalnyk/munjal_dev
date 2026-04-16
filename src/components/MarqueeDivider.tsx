import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const words = [
  'HARDWARE',
  'EMBEDDED',
  'IoT',
  'PCB DESIGN',
  'FIRMWARE',
  'SYSTEMS',
  'SIL4',
  'ENGINEERING',
]

export default function MarqueeDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="relative py-10 md:py-14 overflow-hidden border-y border-border"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-bg to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-bg to-transparent z-10" />

      {/* Row 1 - normal direction */}
      <div className="animate-marquee whitespace-nowrap flex items-center mb-4">
        {[...words, ...words, ...words].map((word, i) => (
          <span key={`a-${i}`} className="inline-flex items-center">
            <span className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-[rgb(var(--overlay)/0.08)] mx-3 md:mx-6 select-none">
              {word}
            </span>
            <span className="text-accent/25 text-sm md:text-lg mx-1.5 md:mx-2">&#9670;</span>
          </span>
        ))}
      </div>

      {/* Row 2 - reverse direction */}
      <div className="animate-marquee-reverse whitespace-nowrap flex items-center">
        {[...words, ...words, ...words].map((word, i) => (
          <span key={`b-${i}`} className="inline-flex items-center">
            <span className="font-display text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-accent/[0.12] mx-3 md:mx-6 select-none">
              {word}
            </span>
            <span className="text-accent/20 text-xs md:text-sm mx-1.5 md:mx-2">&#9670;</span>
          </span>
        ))}
      </div>
    </motion.div>
  )
}
