import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-50px' })
  const imageRef = useRef(null)
  const { scrollYProgress: imgScroll } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const imgY = useTransform(imgScroll, [0, 1], [30, -30])

  return (
    <section id="about" className="section-gap relative" ref={ref}>
      <div className="section-padding">
        {/* Section label */}
        <motion.div
          className="mb-8 md:mb-16"
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
          {/* Image column */}
          <motion.div
            ref={imageRef}
            className="lg:col-span-5"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Main image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl group">
                <motion.img
                  src={personalInfo.profileImg}
                  alt={personalInfo.name}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-700 scale-110"
                  style={{ y: imgY }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-transparent opacity-70" />
                <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.05] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 border border-accent/10 rounded-2xl" />

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent/30 rounded-tl-lg" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent/30 rounded-br-lg" />
              </div>

            </div>
          </motion.div>

          {/* Text column */}
          <div className="lg:col-span-7">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 leading-tight">
              <TextReveal text="Crafting Precision" delay={0.3} inView={isInView} />
              <br />
              <span className="text-gradient-gold">
                <TextReveal text="in Every Circuit" delay={0.5} inView={isInView} />
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
              className="font-grotesk text-base text-text-muted leading-relaxed mb-6 md:mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {personalInfo.bioShort}
            </motion.p>

            {/* Connect links */}
            <motion.div
              className="flex flex-wrap gap-3 mb-8 md:mb-12"
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
                  className="group inline-flex items-center gap-2 px-5 py-2.5 border border-border bg-bg-card hover:border-accent/30 hover:bg-accent/[0.04] rounded-full transition-all duration-300"
                >
                  <span className="font-grotesk text-sm text-text-secondary group-hover:text-accent transition-colors">
                    {link.label}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="text-text-muted group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300"
                  >
                    <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </a>
              ))}
            </motion.div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-10">
              {personalInfo.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                >
                  <div className="relative p-3 md:p-5 border border-border/50 rounded-xl bg-bg-card/50 hover:border-accent/20 transition-all duration-500 hover:glow-gold">
                    <span className="block font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-gold">
                      <AnimatedCounter value={stat.value} inView={statsInView} />
                    </span>
                    <span className="block mt-1.5 font-grotesk text-[10px] sm:text-[11px] md:text-xs tracking-wider text-text-muted uppercase">
                      {stat.label}
                    </span>
                  </div>
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
