import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { personalInfo } from '@/data'
import Tilt3D from './Tilt3D'

function Typewriter({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = words[index]
    const speed = isDeleting ? 35 : 65

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
      <span className="inline-block w-[0.55em] h-[1.05em] bg-accent align-text-bottom ml-1 animate-blink" />
    </span>
  )
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

export default function Hero() {
  const mouseX = useMotionValue(-1000)
  const mouseY = useMotionValue(-1000)

  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgb(var(--c-accent) / 0.07), transparent 80%)`

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') return
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-end pt-24 md:pt-28"
      onPointerMove={onPointerMove}
    >
      <div className="absolute inset-0 blueprint-grid pointer-events-none" />

      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ background: spotlight }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-accent/[0.03] blur-[120px] animate-float-slow" />
        <div className="absolute bottom-[10%] -left-[15%] w-[35vw] h-[35vw] rounded-full bg-accent/[0.04] blur-[100px] animate-float-reverse" />
      </div>

      <div className="relative px-page flex-1 flex flex-col justify-center py-10 z-[2]">
        <motion.div
          {...fadeUp(0.1)}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-line pb-4 mb-8 md:mb-12"
        >
          <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-accent/60" />
              <span className="relative inline-flex h-1.5 w-1.5 bg-accent" />
            </span>
            {personalInfo.status}
          </span>
          <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
            Sydney, AU — 33.87°S / 151.21°E
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-end">
          <div>
            <div className="mb-8 md:mb-10">
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-[clamp(3.2rem,12vw,10rem)] font-black uppercase leading-[0.92] tracking-[-0.015em] text-ink"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  Munjal
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display text-[clamp(3.2rem,12vw,10rem)] font-black uppercase leading-[0.92] tracking-[-0.015em] text-accent"
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
                >
                  Nayak
                </motion.h1>
              </div>
            </div>

            <motion.div {...fadeUp(0.45)} className="max-w-xl mb-8 md:mb-10">
              <p className="font-sans text-lg md:text-xl text-ink-soft leading-relaxed">
                {personalInfo.title}
              </p>
              <div className="mt-3 flex items-center gap-3 font-mono text-sm">
                <span className="text-ink-faint">~/$</span>
                <span className="h-6 flex items-center">
                  <Typewriter words={personalInfo.roles} />
                </span>
              </div>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint">
                {personalInfo.location}
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.6)} className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-solid group"
              >
                View Projects
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline group"
              >
                Download CV
                <span className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Tilt3D intensity={10} scale={1.03}>
              <figure className="relative">
                <span className="absolute -top-3 -left-2.5 font-mono text-sm text-ink-faint select-none">+</span>
                <span className="absolute -top-3 -right-2.5 font-mono text-sm text-ink-faint select-none">+</span>
                <span className="absolute -bottom-3 -left-2.5 font-mono text-sm text-ink-faint select-none">+</span>
                <span className="absolute -bottom-3 -right-2.5 font-mono text-sm text-ink-faint select-none">+</span>
                <div className="border border-line-strong bg-bg-card">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={personalInfo.heroimg}
                      alt={personalInfo.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="fig-caption">
                    <span>Fig. 0.1 — M. Nayak</span>
                    <span>Sydney, AU</span>
                  </figcaption>
                </div>
              </figure>
            </Tilt3D>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="relative border-t border-line z-[2]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.75 }}
      >
        <div className="px-page grid grid-cols-3">
          {personalInfo.stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`py-5 md:py-7 ${i > 0 ? 'border-l border-line pl-4 md:pl-8' : ''} ${
                i < personalInfo.stats.length - 1 ? 'pr-4 md:pr-8' : ''
              }`}
            >
              <span className="block font-display text-2xl sm:text-3xl md:text-5xl font-black text-ink leading-none">
                {stat.value}
              </span>
              <span className="mt-2 block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
        <div className="absolute right-5 md:right-10 lg:right-16 xl:right-24 bottom-full mb-5 hidden sm:flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink-faint">Scroll</span>
          <motion.span
            className="block w-[1px] h-7 bg-accent"
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
