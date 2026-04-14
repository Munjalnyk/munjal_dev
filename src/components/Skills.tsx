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

function SkillBar({ skill, color, delay, inView }: { skill: string; color: string; delay: number; inView: boolean }) {
  const level = Math.floor(70 + Math.random() * 25) // seeded-looking random 70-95%
  return (
    <motion.div
      className="group/skill"
      initial={{ opacity: 0, x: -15 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-sans text-sm text-text-secondary group-hover/skill:text-text-primary transition-colors duration-200">
          {skill}
        </span>
      </div>
      <div className="h-[3px] w-full bg-white/[0.04] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${color}50 0%, ${color} 100%)`,
            boxShadow: `0 0 8px ${color}30`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  )
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
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <span className="font-display text-5xl md:text-6xl font-bold text-gradient-gold">
              {allSkills.length}
            </span>
            <span className="font-grotesk text-sm text-text-muted leading-tight">
              Skills across<br />4 domains
            </span>
          </motion.div>
        </div>

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
                <SpotlightCard className="group relative p-6 md:p-8 border border-border bg-bg-card hover:border-accent/20 rounded-xl transition-all duration-500 hover:glow-gold overflow-hidden h-full">
                  {/* Ambient glow */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: `${cat.color}15` }}
                  />

                  {/* Header */}
                  <div className="relative flex items-center gap-4 mb-7">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${cat.color}10`,
                        border: `1px solid ${cat.color}25`,
                        boxShadow: `0 0 20px ${cat.color}08`,
                      }}
                    >
                      {Icon && <Icon size={18} style={{ color: cat.color }} />}
                    </div>
                    <div>
                      <h3 className="font-grotesk text-lg font-semibold text-text-primary">
                        {cat.category}
                      </h3>
                      <span className="font-mono text-[10px] text-text-muted tracking-wider">
                        {cat.skills.length} skills
                      </span>
                    </div>
                  </div>

                  {/* Skills with animated bars */}
                  <div className="relative space-y-4">
                    {cat.skills.map((skill, j) => (
                      <SkillBar
                        key={skill}
                        skill={skill}
                        color={cat.color}
                        delay={0.3 + i * 0.08 + j * 0.05}
                        inView={isInView}
                      />
                    ))}
                  </div>

                  {/* Bottom gradient line */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
                    style={{ background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)` }}
                  />
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>

        {/* Marquee */}
        <div className="relative overflow-hidden py-6 border-y border-border/50">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-bg to-transparent z-10" />
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
