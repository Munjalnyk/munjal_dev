import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, MapPin, ChevronDown, ArrowRight, Download } from 'lucide-react'
import { personalInfo } from '@/data'

const DotGrid = () => (
  <div className="absolute inset-0 overflow-hidden opacity-25 pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }}
    />
  </div>
)

const GlowOrb = ({
  className,
  style,
  delay = 0,
  mouseX,
  mouseY,
  factor = 0.02,
}: {
  className?: string
  style?: React.CSSProperties
  delay?: number
  mouseX: ReturnType<typeof useMotionValue<number>>
  mouseY: ReturnType<typeof useMotionValue<number>>
  factor?: number
}) => {
  const x = useSpring(0, { stiffness: 40, damping: 20 })
  const y = useSpring(0, { stiffness: 40, damping: 20 })

  useEffect(() => {
    const ux = mouseX.on('change', (v) => x.set(v * factor))
    const uy = mouseY.on('change', (v) => y.set(v * factor))
    return () => { ux(); uy() }
  }, [mouseX, mouseY, x, y, factor])

  return (
    <motion.div
      className={className}
      style={{ x, y, ...style }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 8, delay, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const containerRef = useRef<HTMLElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    const id = setInterval(() => setRoleIndex((p) => (p + 1) % personalInfo.roles.length), 3000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const r = containerRef.current?.getBoundingClientRect()
      if (!r) return
      mouseX.set(e.clientX - r.left - r.width / 2)
      mouseY.set(e.clientY - r.top - r.height / 2)
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  }

  return (
    <section id="home" ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-[#080810]">
      {/* Background */}
      <DotGrid />
      <GlowOrb
        className="absolute top-1/4 right-1/3 w-[520px] h-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 65%)' } as React.CSSProperties}
        mouseX={mouseX} mouseY={mouseY} delay={0}
      />
      <GlowOrb
        className="absolute bottom-1/4 left-1/4 w-[380px] h-[380px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 65%)' } as React.CSSProperties}
        mouseX={mouseX} mouseY={mouseY} delay={4} factor={-0.015}
      />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#080810] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          {/* ── Left ── */}
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">

            {/* Status badge */}
            <motion.div variants={item}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-[#00e5ff]/25 bg-[#00e5ff]/[0.06] text-[#00e5ff]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
                {personalInfo.status} · Sydney, AU
              </span>
            </motion.div>

            {/* Name */}
            <motion.div variants={item}>
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-black leading-[0.92] tracking-tight">
                <span className="block text-white">Munjal</span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(120deg, #ffffff 20%, #00e5ff 60%, #7c3aed 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Nayak
                </span>
              </h1>
            </motion.div>

            {/* Animated role */}
            <motion.div variants={item} className="h-7 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={roleIndex}
                  className="text-lg text-white/50 font-medium flex items-center gap-2"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <span className="font-mono text-[#00e5ff] text-sm opacity-70">~/</span>
                  {personalInfo.roles[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Bio */}
            <motion.p variants={item} className="text-white/40 text-[0.95rem] leading-relaxed max-w-[480px]">
              {personalInfo.bioShort}
            </motion.p>

            {/* Location */}
            <motion.div variants={item} className="flex items-center gap-1.5 text-xs text-white/30">
              <MapPin size={11} className="text-[#00e5ff]/60" />
              {personalInfo.location}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 pt-1">
              <motion.button
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm bg-[#00e5ff] text-[#080810] hover:bg-white transition-colors duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View My Work
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:border-[#00e5ff]/30 hover:text-white hover:bg-[#00e5ff]/[0.05] transition-all duration-200"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Download size={13} />
                Resume
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={item} className="flex items-center gap-2 pt-1">
              {[
                { icon: Github, href: personalInfo.github, label: 'GitHub' },
                { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.03] flex items-center justify-center text-white/40 hover:text-[#00e5ff] hover:border-[#00e5ff]/30 hover:bg-[#00e5ff]/[0.05] transition-all duration-200"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: Profile visual ── */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.25 }}
          >
            {/* Rotating outer ring */}
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full border border-[#00e5ff]/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
            />
            {/* Rotating inner ring */}
            <motion.div
              className="absolute w-[320px] h-[320px] rounded-full border border-white/[0.04]"
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Orbit dots */}
            {[0, 120, 240].map((deg, i) => (
              <motion.div
                key={deg}
                className="absolute w-2.5 h-2.5 rounded-full bg-[#00e5ff]"
                style={{
                  top: `calc(50% - ${200 * Math.cos((deg * Math.PI) / 180)}px - 5px)`,
                  left: `calc(50% + ${200 * Math.sin((deg * Math.PI) / 180)}px - 5px)`,
                  boxShadow: '0 0 12px rgba(0,229,255,0.8)',
                }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.8 }}
              />
            ))}

            {/* Photo */}
            <motion.div
              className="relative w-64 h-72 rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 0 0 1px rgba(0,229,255,0.12), 0 32px 80px rgba(0,0,0,0.5)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#080810]/60 via-transparent to-[#00e5ff]/5" />
              <img
                src={personalInfo.profileImg}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
                style={{ filter: 'contrast(1.05) saturate(0.9)' }}
              />
            </motion.div>

            {/* Stat chips */}
            {personalInfo.stats.map((stat, i) => {
              const pos = [
                { top: '8%', right: '-5%' },
                { top: '48%', right: '-14%' },
                { bottom: '8%', right: '-2%' },
              ]
              return (
                <motion.div
                  key={stat.label}
                  className="absolute px-3.5 py-2.5 rounded-xl bg-[#0f0f1a] border border-white/[0.07] flex flex-col items-center"
                  style={pos[i]}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                  whileHover={{ scale: 1.06, y: -2 }}
                >
                  <span className="text-xl font-black text-[#00e5ff] leading-none">{stat.value}</span>
                  <span className="text-[9px] text-white/30 font-medium mt-0.5 whitespace-nowrap">{stat.label}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <span className="text-[9px] font-mono text-white/20 tracking-[0.2em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00e5ff]/40 to-transparent">
            <motion.div
              className="w-full bg-[#00e5ff]"
              animate={{ height: ['0%', '100%', '0%'], y: ['0%', '0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <ChevronDown size={12} className="text-white/20 animate-bounce" />
        </motion.div>
      </div>
    </section>
  )
}
