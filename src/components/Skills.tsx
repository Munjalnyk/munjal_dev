import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { skillCategories } from '@/data'
import { Cpu, Code2, Server, Shield } from 'lucide-react'
import TextReveal from './TextReveal'
import SpotlightCard from './SpotlightCard'

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Code2,
  Server,
  Shield,
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const allSkills = skillCategories.flatMap((cat) => cat.skills)

  return (
    <section id="skills" className="section-gap relative" ref={ref}>
      <div className="section-padding">
        {/* Section label */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            03 / Skills
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
          <TextReveal text="Technical" delay={0.1} />
          <br />
          <span className="text-gradient-gold">
            <TextReveal text="Arsenal" delay={0.3} />
          </span>
        </h2>

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
              <SpotlightCard className="group relative p-6 md:p-8 border border-border bg-bg-card hover:border-accent/20 rounded-lg transition-all duration-500 hover:glow-gold overflow-hidden">
                <div
                  className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ backgroundColor: `${cat.color}12` }}
                />

                <div className="relative flex items-center gap-4 mb-6">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: `${cat.color}10`,
                      border: `1px solid ${cat.color}25`,
                    }}
                  >
                    {Icon && <Icon size={18} style={{ color: cat.color }} />}
                  </div>
                  <h3 className="font-grotesk text-lg font-semibold text-text-primary">
                    {cat.category}
                  </h3>
                  <span className="ml-auto font-mono text-xs text-text-muted">
                    {cat.skills.length}
                  </span>
                </div>

                <div className="relative space-y-3">
                  {cat.skills.map((skill, j) => (
                    <motion.div
                      key={skill}
                      className="flex items-center gap-3 group/skill"
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.1 + j * 0.04 }}
                    >
                      <div
                        className="w-1 h-1 rounded-full transition-colors duration-300"
                        style={{ backgroundColor: `${cat.color}60` }}
                      />
                      <span className="font-sans text-sm text-text-secondary group-hover/skill:text-text-primary transition-colors duration-200">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </SpotlightCard>
              </motion.div>
            )
          })}
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-6 border-y border-border">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg to-transparent z-10" />
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span key={i} className="inline-flex items-center mx-4">
                <span className="font-grotesk text-sm text-text-muted/30">{skill}</span>
                <span className="mx-4 text-accent/15 text-xs">&#9670;</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
