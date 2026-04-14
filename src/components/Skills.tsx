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

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            <TextReveal text="Technical" delay={0.1} />
            <br />
            <span className="text-gradient-gold">
              <TextReveal text="Arsenal" delay={0.3} />
            </span>
          </h2>
          <motion.p
            className="max-w-xs font-sans text-sm text-text-muted leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            {allSkills.length} skills across {skillCategories.length} core domains — from bare-metal firmware to safety-critical infrastructure.
          </motion.p>
        </div>

        {/* Skill categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-20">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon]
            return (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              >
                <SpotlightCard className="group relative p-7 md:p-8 border border-border bg-bg-card hover:border-accent/15 rounded-xl transition-all duration-500 overflow-hidden h-full">
                  {/* Header */}
                  <div className="relative flex items-center gap-4 mb-6">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        backgroundColor: `${cat.color}0a`,
                        border: `1px solid ${cat.color}18`,
                      }}
                    >
                      {Icon && <Icon size={18} style={{ color: cat.color }} />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-grotesk text-base font-semibold text-text-primary">
                        {cat.category}
                      </h3>
                    </div>
                    <span className="font-mono text-[10px] text-text-muted/40">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Skills as pills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, j) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1.5 font-grotesk text-[13px] text-text-secondary border border-border rounded-lg hover:text-text-primary hover:border-accent/20 transition-colors duration-200"
                        style={{ backgroundColor: `${cat.color}04` }}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.08 + j * 0.03 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Bottom accent */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                    style={{ backgroundColor: cat.color }}
                  />
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom marquee */}
        <div className="relative overflow-hidden py-6 border-y border-border/40">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span key={i} className="inline-flex items-center mx-5">
                <span className="font-grotesk text-sm text-text-muted/20">{skill}</span>
                <span className="mx-5 text-accent/10 text-xs">&#9670;</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
