import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect, useRef } from 'react'

export default function Preloader() {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.round(latest))
  const displayRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const unsub = rounded.on('change', (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = String(latest).padStart(3, '0')
      }
    })
    const animation = animate(count, 100, {
      duration: 2.2,
      ease: [0.16, 1, 0.3, 1],
    })
    return () => {
      animation.stop()
      unsub()
    }
  }, [count, rounded])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-grid opacity-30" />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[200px]" />

      <div className="relative flex flex-col items-center">
        {/* Logo monogram */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <span className="font-display text-6xl md:text-8xl font-bold tracking-[0.2em] text-text-primary">
            M
          </span>
          <span className="font-display text-6xl md:text-8xl font-bold tracking-[0.2em] text-gradient-gold">
            N
          </span>
        </motion.div>

        {/* Divider line */}
        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
        />

        {/* Counter */}
        <motion.div
          className="mt-8 flex items-baseline gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <span
            ref={displayRef}
            className="font-mono text-4xl md:text-5xl font-light text-accent tabular-nums"
          >
            000
          </span>
          <span className="font-mono text-lg text-accent/40">%</span>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="mt-6 w-48 h-[1px] bg-white/5 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </motion.div>

        {/* Subtitle */}
        <motion.span
          className="mt-5 font-mono text-[9px] tracking-[0.4em] uppercase text-text-muted/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          Portfolio
        </motion.span>
      </div>

      {/* Corner markers */}
      <motion.div
        className="absolute top-6 left-6 w-8 h-8 border-t border-l border-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.div
        className="absolute top-6 right-6 w-8 h-8 border-t border-r border-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      />
    </motion.div>
  )
}
