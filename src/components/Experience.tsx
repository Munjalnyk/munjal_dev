import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { experiences } from '@/data'
import TextReveal from './TextReveal'
import SpotlightCard from './SpotlightCard'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <section id="experience" className="section-gap relative bg-dots" ref={ref}>
      <div className="section-padding">
        {/* Section label */}
        <motion.div
          className="mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            02 / Experience
          </span>
          <motion.div
            className="mt-3 h-[1px] bg-accent/30 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '80px' }}
          />
        </motion.div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-8 md:mb-16 leading-tight">
          <TextReveal text="Where I've" delay={0.1} inView={isInView} />
          <br />
          <TextReveal text="Worked & Learned" delay={0.3} inView={isInView} gold />
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Glowing timeline line */}
          <div className="absolute left-[7px] md:left-[31px] top-0 bottom-0 w-[1px]">
            <div className="absolute inset-0 bg-border" />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent via-accent/50 to-transparent"
              initial={{ height: 0 }}
              animate={isInView ? { height: '100%' } : {}}
              transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          {experiences.map((exp, i) => (
            <ExperienceCard key={i} experience={exp} index={i} />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const isWork = experience.type === 'work'

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 md:pl-20 pb-14 last:pb-0 group"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {/* Timeline dot with glow */}
      <div className="absolute left-0 md:left-[24px] top-3 z-10">
        <motion.div
          className="relative"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 + index * 0.1, type: 'spring', stiffness: 300 }}
        >
          <div
            className={`w-[14px] h-[14px] rounded-full border-2 transition-all duration-300 ${
              isWork
                ? 'border-accent bg-accent/30'
                : 'border-text-muted/50 bg-bg'
            }`}
          />
          {isWork && (
            <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" style={{ animationDuration: '3s' }} />
          )}
        </motion.div>
      </div>

      {/* Card */}
      <SpotlightCard className="relative p-6 md:p-8 border border-border bg-bg-card hover:border-accent/20 hover:bg-bg-hover rounded-xl transition-all duration-500 group-hover:glow-gold overflow-hidden">
        {/* Top gradient */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-mono tracking-[0.15em] uppercase rounded-full mb-3 ${
                isWork
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'bg-white/[0.03] text-text-secondary border border-border'
              }`}
            >
              {isWork ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="1" y="3" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="0.8"/><path d="M3 3V2C3 1.5 3.5 1 4 1H6C6.5 1 7 1.5 7 2V3" stroke="currentColor" strokeWidth="0.8"/></svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1L9 3.5V7.5L5 10L1 7.5V3.5L5 1Z" stroke="currentColor" strokeWidth="0.8"/></svg>
              )}
              {isWork ? 'Work' : 'Education'}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary group-hover:text-accent transition-colors duration-300">
              {experience.role}
            </h3>
            <p className="mt-1 font-grotesk text-base text-accent/80">{experience.company}</p>
          </div>
          <div className="sm:text-right shrink-0 flex sm:flex-col items-center sm:items-end gap-2 sm:gap-0">
            <span className="inline-block px-3 py-1 bg-white/[0.02] border border-border/50 rounded-lg font-mono text-sm text-text-muted">
              {experience.duration}
            </span>
            <p className="font-grotesk text-xs text-text-muted sm:mt-1.5 flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="text-text-muted/50">
                <circle cx="5" cy="4" r="2.5" stroke="currentColor" strokeWidth="0.8" />
                <path d="M5 6.5V9" stroke="currentColor" strokeWidth="0.8" />
                <path d="M3.5 9H6.5" stroke="currentColor" strokeWidth="0.8" />
              </svg>
              {experience.location}
            </p>
          </div>
        </div>

        <p className="font-sans text-sm text-text-secondary mb-4">{experience.description}</p>

        {experience.bullets.length > 0 && (
          <ul className="space-y-2.5 mb-5">
            {experience.bullets.map((bullet, j) => (
              <motion.li
                key={j}
                className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed"
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + j * 0.08 }}
              >
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent/40 shrink-0" />
                {bullet}
              </motion.li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] font-mono tracking-wider text-text-muted bg-white/[0.02] border border-border hover:border-accent/20 hover:text-accent/60 rounded-full transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}
