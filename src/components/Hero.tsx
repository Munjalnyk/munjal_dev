import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { personalInfo } from '@/data'
import MagneticButton from './MagneticButton'

function Typewriter({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[index]
    const speed = isDeleting ? 40 : 70

    if (!isDeleting && text === current) {
      const pause = setTimeout(() => setIsDeleting(true), interval)
      return () => clearTimeout(pause)
    }

    if (isDeleting && text === '') {
      setIsDeleting(false)
      setIndex((prev) => (prev + 1) % words.length)
      return
    }

    const timer = setTimeout(() => {
      setText(isDeleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
    }, speed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, index, words, interval])

  return (
    <span className="text-accent">
      {text}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-accent ml-0.5 align-middle"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
      />
    </span>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="aurora-blob aurora-blob-1" />
        <div className="aurora-blob aurora-blob-2" />
        <div className="aurora-blob aurora-blob-3" />
      </div>

      <motion.div
        style={{ y, opacity }}
        className="relative section-padding pt-28 pb-20 md:pt-36 md:pb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <div>
            {/* Status badge */}
            <motion.div
              className="mb-10 md:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="inline-flex items-center gap-2.5 border border-accent/20 bg-accent/[0.04] px-4 py-2 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-accent/80 uppercase">
                  {personalInfo.status}
                </span>
              </div>
            </motion.div>

            {/* Main heading */}
            <div className="mb-6 md:mb-8">
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-[clamp(3rem,11vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.02em] text-text-primary"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  MUNJAL
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-[clamp(3rem,11vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.02em]"
                  style={{ color: 'transparent', WebkitTextStroke: '1.5px var(--accent-hex)' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  NAYAK
                </motion.h1>
              </div>
            </div>

            {/* Subtitle with typewriter */}
            <motion.div
              className="max-w-xl mb-8 md:mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <p className="font-grotesk text-lg md:text-xl text-text-secondary leading-relaxed">
                {personalInfo.title}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-mono text-xs text-text-muted tracking-wider">~/</span>
                <div className="h-6 flex items-center">
                  <span className="font-grotesk text-sm">
                    <Typewriter words={personalInfo.roles} />
                  </span>
                </div>
              </div>
              <p className="mt-3 font-grotesk text-sm text-text-muted flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-accent/50">
                  <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1" />
                  <path d="M6 8V11" stroke="currentColor" strokeWidth="1" />
                  <path d="M4 11H8" stroke="currentColor" strokeWidth="1" />
                </svg>
                {personalInfo.location}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group inline-flex items-center gap-3 bg-accent text-[var(--text-on-accent)] px-5 py-3 md:px-7 md:py-3.5 font-grotesk text-sm font-semibold tracking-wide rounded-full hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_30px_rgb(var(--c-accent)/0.25)]"
                >
                  View Projects
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              </MagneticButton>
              <MagneticButton>
                <a
                  href={personalInfo.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 border border-border-strong px-5 py-3 md:px-7 md:py-3.5 font-grotesk text-sm text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all duration-300 rounded-full"
                >
                  Download CV
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-y-0.5">
                    <path d="M7 2V10M7 10L4 7M7 10L10 7M3 12H11" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — Profile Visual (desktop) */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Rotating rings */}
            <motion.div
              className="absolute w-[380px] h-[380px] rounded-full border border-accent/[0.06]"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            >
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute w-[1px] h-3 bg-accent/20"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                    transform: `rotate(${deg}deg) translateY(-190px) translateX(-0.5px)`,
                  }}
                />
              ))}
            </motion.div>
            <motion.div
              className="absolute w-[320px] h-[320px] rounded-full border border-dashed border-accent/[0.04]"
              animate={{ rotate: -360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[260px] h-[260px] rounded-full border border-accent/[0.03]"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Profile photo */}
            <div className="relative w-56 h-64 rounded-2xl overflow-hidden border border-border/60">
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-bg/60 via-transparent to-transparent img-overlay-dark" />
              <img
                src={personalInfo.heroimg}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) saturate(0.85)' }}
              />
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-accent/25" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-b border-r border-accent/25" />
            </div>

            {/* Stat chips */}
            {personalInfo.stats.map((stat, i) => {
              const positions = [
                { top: '2%', right: '-10%' },
                { top: '45%', right: '-20%' },
                { bottom: '5%', right: '-8%' },
              ]
              return (
                <motion.div
                  key={stat.label}
                  className="absolute px-3.5 py-2 rounded-lg bg-bg-card/90 backdrop-blur-sm border border-border flex flex-col items-center"
                  style={positions[i]}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.12 }}
                >
                  <span className="text-lg font-bold text-accent leading-none font-display">{stat.value}</span>
                  <span className="text-[9px] text-text-muted font-medium mt-0.5 whitespace-nowrap">{stat.label}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Mobile profile card */}
        <motion.div
          className="lg:hidden mt-10 flex items-center gap-5 p-4 border border-border/50 rounded-2xl bg-bg-card/50 backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-border/60 shrink-0">
            <img
              src={personalInfo.heroimg}
              alt={personalInfo.name}
              className="w-full h-full object-cover"
              style={{ filter: 'contrast(1.05) saturate(0.85)' }}
            />
            <div className="absolute inset-0 border border-accent/10 rounded-xl" />
          </div>
          <div className="flex-1 flex items-center gap-4 overflow-x-auto no-scrollbar">
            {personalInfo.stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col items-center shrink-0">
                <span className="text-lg font-bold text-accent leading-none font-display">{stat.value}</span>
                <span className="text-[9px] text-text-muted font-medium mt-0.5 whitespace-nowrap">{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-muted">Scroll</span>
          <motion.div
            className="w-[1px] h-8 bg-gradient-to-b from-accent/50 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
