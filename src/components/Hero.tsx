import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { personalInfo } from '@/data'
import MagneticButton from './MagneticButton'

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const [currentRole, setCurrentRole] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % personalInfo.roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-accent/[0.03] rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/[0.02] rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/[0.015] rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
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
              transition={{ duration: 0.6, delay: 3.2 }}
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
                  transition={{ duration: 1, delay: 3.0, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  MUNJAL
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-[clamp(3rem,11vw,9rem)] font-extrabold leading-[0.88] tracking-[-0.02em]"
                  style={{ color: 'transparent', WebkitTextStroke: '1.5px #c8a96e' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 3.15, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  NAYAK
                </motion.h1>
              </div>
            </div>

            {/* Subtitle */}
            <motion.div
              className="max-w-xl mb-8 md:mb-10"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3.5 }}
            >
              <p className="font-grotesk text-lg md:text-xl text-text-secondary leading-relaxed">
                {personalInfo.title}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="font-mono text-xs text-text-muted tracking-wider">~/</span>
                <div className="h-6 overflow-hidden">
                  <motion.span
                    key={currentRole}
                    className="block font-grotesk text-sm text-accent"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    {personalInfo.roles[currentRole]}
                  </motion.span>
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
              transition={{ duration: 0.6, delay: 3.7 }}
            >
              <MagneticButton>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="group inline-flex items-center gap-3 bg-accent text-[#050505] px-7 py-3.5 font-grotesk text-sm font-semibold tracking-wide rounded-full hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(200,169,110,0.25)]"
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
                  className="group inline-flex items-center gap-3 border border-border-strong px-7 py-3.5 font-grotesk text-sm text-text-secondary hover:text-text-primary hover:border-accent/30 transition-all duration-300 rounded-full"
                >
                  Download CV
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-y-0.5">
                    <path d="M7 2V10M7 10L4 7M7 10L10 7M3 12H11" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Right — Profile Visual */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 3.3, ease: [0.215, 0.61, 0.355, 1] }}
          >
            {/* Rotating rings */}
            <motion.div
              className="absolute w-[360px] h-[360px] rounded-full border border-accent/[0.07]"
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[300px] h-[300px] rounded-full border border-accent/[0.04]"
              animate={{ rotate: -360 }}
              transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute w-[240px] h-[240px] rounded-full border border-dashed border-accent/[0.03]"
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            {/* Orbiting dots */}
            {[0, 72, 144, 216, 288].map((deg, i) => (
              <motion.div
                key={deg}
                className="absolute w-1.5 h-1.5 rounded-full bg-accent"
                style={{
                  top: `calc(50% - ${180 * Math.cos((deg * Math.PI) / 180)}px)`,
                  left: `calc(50% + ${180 * Math.sin((deg * Math.PI) / 180)}px)`,
                  boxShadow: '0 0 8px rgba(200,169,110,0.6)',
                }}
                animate={{ scale: [1, 1.8, 1], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
              />
            ))}

            {/* Profile photo */}
            <motion.div
              className="relative w-56 h-64 rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 0 0 1px rgba(200,169,110,0.12), 0 32px 80px rgba(0,0,0,0.5)' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505]/70 via-transparent to-accent/[0.03]" />
              <img
                src={personalInfo.profileImg}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) saturate(0.85)' }}
              />
            </motion.div>

            {/* Floating stat chips */}
            {personalInfo.stats.map((stat, i) => {
              const positions = [
                { top: '5%', right: '-8%' },
                { top: '50%', right: '-16%' },
                { bottom: '8%', right: '-5%' },
              ]
              return (
                <motion.div
                  key={stat.label}
                  className="absolute px-3.5 py-2.5 rounded-xl bg-bg-card/80 backdrop-blur-sm border border-border flex flex-col items-center"
                  style={positions[i]}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 3.6 + i * 0.15 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                >
                  <span className="text-xl font-bold text-accent leading-none font-display">{stat.value}</span>
                  <span className="text-[9px] text-text-muted font-medium mt-0.5 whitespace-nowrap">{stat.label}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 4.2 }}
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
