import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { personalInfo } from '@/data'
import TextReveal from './TextReveal'

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const numMatch = value.match(/(\d+)/)
  const num = numMatch ? parseInt(numMatch[1]) : 0
  const suffix = value.replace(/\d+/, '')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 2000
    const step = duration / num
    const timer = setInterval(() => {
      start++
      if (start >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, step)
    return () => clearInterval(timer)
  }, [inView, num])

  return <>{inView ? `${count}${suffix}` : `0${suffix}`}</>
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })

  return (
    <section id="about" className="section-gap relative" ref={ref}>
      <div className="section-padding">
        {/* Section label */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            01 / About
          </span>
          <motion.div
            className="mt-3 h-[1px] bg-accent/30 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '80px' }}
          />
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Image */}
          <motion.div
            className="lg:col-span-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-[3/4] max-w-sm mx-auto lg:mx-0 overflow-hidden rounded-lg group">
              <img
                src={personalInfo.profileImg}
                alt={personalInfo.name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
              <div className="absolute inset-0 border border-accent/10 rounded-lg" />
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-accent/40" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-accent/40" />
              <div className="absolute inset-0 bg-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </motion.div>

          {/* Text */}
          <div className="lg:col-span-8">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 leading-tight">
              <TextReveal text="Crafting Precision" delay={0.3} />
              <br />
              <span className="text-gradient-gold">
                <TextReveal text="in Every Circuit" delay={0.5} />
              </span>
            </h2>

            <motion.p
              className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed mb-6 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {personalInfo.bio}
            </motion.p>

            <motion.p
              className="font-grotesk text-base text-text-muted leading-relaxed mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {personalInfo.bioShort}
            </motion.p>

            {/* Connect links */}
            <motion.div
              className="flex flex-wrap gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {[
                { label: 'LinkedIn', href: personalInfo.linkedin },
                { label: 'GitHub', href: personalInfo.github },
                { label: 'Email', href: `mailto:${personalInfo.email}` },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-4 py-2 border border-border bg-bg-card hover:border-accent/30 hover:bg-accent/[0.04] rounded-full transition-all duration-300"
                >
                  <span className="font-grotesk text-sm text-text-secondary group-hover:text-accent transition-colors">
                    {link.label}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="text-text-muted group-hover:text-accent transition-colors"
                  >
                    <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-6 md:gap-10">
              {personalInfo.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                >
                  <span className="block font-display text-4xl md:text-5xl font-bold text-gradient-gold">
                    <AnimatedCounter value={stat.value} inView={statsInView} />
                  </span>
                  <span className="block mt-1 font-grotesk text-xs md:text-sm tracking-wide text-text-muted uppercase">
                    {stat.label}
                  </span>
                  {i < personalInfo.stats.length - 1 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-12 bg-border hidden md:block" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
