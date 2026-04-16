import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const CRITICAL_IMAGES = [
  '/img/perfil.png',
  '/img/hero.jpg',
  '/img/MRTS.jpeg',
]

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const displayRef = useRef<HTMLSpanElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const completed = useRef(false)

  useEffect(() => {
    let loaded = 0
    const total = CRITICAL_IMAGES.length

    const finish = () => {
      if (completed.current) return
      completed.current = true
      setProgress(100)
      setTimeout(onComplete, 400)
    }

    const updateProgress = () => {
      loaded++
      const pct = Math.round((loaded / total) * 100)
      setProgress(pct)
      if (loaded >= total) finish()
    }

    CRITICAL_IMAGES.forEach((src) => {
      const img = new Image()
      img.onload = updateProgress
      img.onerror = updateProgress
      img.src = src
    })

    const timeout = setTimeout(finish, 8000)
    return () => clearTimeout(timeout)
  }, [onComplete])

  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.textContent = String(progress).padStart(3, '0')
    }
    if (barRef.current) {
      barRef.current.style.width = `${progress}%`
    }
  }, [progress])

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] rounded-full blur-[200px]" />

      <div className="relative flex flex-col items-center">
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
        >
          <span className="font-display text-6xl md:text-8xl font-bold tracking-[0.2em] text-text-primary">
            M
          </span>
          <span className="font-display text-6xl md:text-8xl font-bold tracking-[0.2em] text-gradient-gold">
            N
          </span>
        </motion.div>

        <motion.div
          className="h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent"
          initial={{ width: 0 }}
          animate={{ width: 120 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
        />

        <motion.div
          className="mt-8 flex items-baseline gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <span
            ref={displayRef}
            className="font-mono text-4xl md:text-5xl font-light text-accent tabular-nums"
          >
            000
          </span>
          <span className="font-mono text-lg text-accent/40">%</span>
        </motion.div>

        <motion.div
          className="mt-6 w-48 h-[1px] bg-white/5 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <div
            ref={barRef}
            className="h-full bg-gradient-to-r from-accent/60 to-accent rounded-full transition-all duration-300 ease-out"
            style={{ width: '0%' }}
          />
        </motion.div>

        <motion.span
          className="mt-5 font-mono text-[9px] tracking-[0.4em] uppercase text-text-muted/60"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          Loading assets
        </motion.span>
      </div>

      <motion.div
        className="absolute top-6 left-6 w-8 h-8 border-t border-l border-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.div
        className="absolute top-6 right-6 w-8 h-8 border-t border-r border-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />
      <motion.div
        className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      />
      <motion.div
        className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-accent/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      />
    </motion.div>
  )
}
