import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { experiences } from '@/data'
import TextReveal from './TextReveal'
import SpotlightCard from './SpotlightCard'

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-gap relative bg-dots" ref={ref}>
      <div className="section-padding">
        {/* Section label */}
        <motion.div
          className="mb-16 md:mb-20"
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

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-16 leading-tight">
          <TextReveal text="Where I've" delay={0.1} />
          <br />
          <span className="text-gradient-gold">
            <TextReveal text="Worked & Learned" delay={0.3} />
          </span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-border" />
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
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-8 top-2 -translate-x-1/2 z-10">
        <div
          className={`w-3 h-3 rounded-full border-2 transition-colors duration-300 ${
            isWork
              ? 'border-accent bg-accent/20 group-hover:bg-accent/40'
              : 'border-text-muted bg-bg group-hover:border-accent/50'
          }`}
        />
      </div>

      {/* Card */}
      <SpotlightCard className="p-6 md:p-8 border border-border bg-bg-card hover:border-accent/20 hover:bg-bg-hover rounded-lg transition-all duration-500 group-hover:glow-gold">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <span
              className={`inline-block px-3 py-1 text-[10px] font-mono tracking-[0.15em] uppercase rounded-full mb-3 ${
                isWork
                  ? 'bg-accent/10 text-accent border border-accent/20'
                  : 'bg-white/[0.03] text-text-secondary border border-border'
              }`}
            >
              {isWork ? 'Work' : 'Education'}
            </span>
            <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary">
              {experience.role}
            </h3>
            <p className="mt-1 font-grotesk text-base text-accent">{experience.company}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="font-mono text-sm text-text-muted">{experience.duration}</span>
            <p className="font-grotesk text-xs text-text-muted mt-1">{experience.location}</p>
          </div>
        </div>

        <p className="font-sans text-sm text-text-secondary mb-4">{experience.description}</p>

        {experience.bullets.length > 0 && (
          <ul className="space-y-2.5 mb-5">
            {experience.bullets.map((bullet, j) => (
              <li key={j} className="flex items-start gap-3 text-sm text-text-secondary leading-relaxed">
                <span className="mt-2 w-1 h-1 rounded-full bg-accent/60 shrink-0" />
                {bullet}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] font-mono tracking-wider text-text-muted bg-white/[0.02] border border-border rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </SpotlightCard>
    </motion.div>
  )
}
