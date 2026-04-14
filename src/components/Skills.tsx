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
  // Deterministic levels based on skill name length so they don't re-randomize
  const level = 70 + ((skill.charCodeAt(0) + skill.length * 7) % 26)
  return (
    <motion.div
      className="group/skill py-1"
      initial={{ opacity: 0, x: -15 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-grotesk text-[13px] text-text-secondary group-hover/skill:text-text-primary transition-colors duration-200">
          {skill}
        </span>
        <motion.span
          className="font-mono text-[10px] tracking-wider opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
          style={{ color }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-[4px] w-full rounded-full overflow-hidden" style={{ backgroundColor: `${color}08` }}>
        <motion.div
          className="h-full rounded-full relative"
          style={{
            background: `linear-gradient(90deg, ${color}40 0%, ${color} 100%)`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.4, delay: delay + 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}80` }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const allSkills = skillCategories.flatMap((cat) => cat.skills)

  return (
    <section id="skills" className="section-gap relative overflow-hidden" ref={ref}>
      {/* Rich background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Diagonal grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(45deg, #c8a96e 1px, transparent 1px), linear-gradient(-45deg, #c8a96e 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Large ambient blobs */}
        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-[#00e5ff]/[0.02] rounded-full blur-[180px]" />
        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-[#7c3aed]/[0.02] rounded-full blur-[180px]" />
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.015] rounded-full blur-[200px]" />
      </div>

      <div className="section-padding relative">
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
            className="flex items-center gap-5"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="relative">
              <span className="font-display text-5xl md:text-6xl font-bold text-gradient-gold">
                {allSkills.length}
              </span>
              <div className="absolute -inset-3 bg-accent/[0.04] rounded-full blur-xl -z-10" />
            </div>
            <div className="h-10 w-[1px] bg-border" />
            <span className="font-grotesk text-sm text-text-muted leading-tight">
              Skills across<br />{skillCategories.length} domains
            </span>
          </motion.div>
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
                <SpotlightCard className="group relative p-7 md:p-9 border border-border/60 bg-bg-card/70 backdrop-blur-sm hover:border-accent/20 rounded-2xl transition-all duration-500 hover:glow-gold overflow-hidden h-full">
                  {/* Category color glow — larger and more visible */}
                  <div
                    className="absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[80px] opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: cat.color }}
                  />
                  <div
                    className="absolute -bottom-16 -left-16 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none"
                    style={{ backgroundColor: cat.color }}
                  />

                  {/* Top gradient border */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${cat.color}50, transparent)` }}
                  />

                  {/* Header */}
                  <div className="relative flex items-center gap-4 mb-8">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
                      style={{
                        backgroundColor: `${cat.color}0d`,
                        border: `1px solid ${cat.color}20`,
                        boxShadow: `0 0 0 0 ${cat.color}00`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 25px ${cat.color}25`
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 0 0 0 ${cat.color}00`
                      }}
                    >
                      {Icon && <Icon size={20} style={{ color: cat.color }} />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-grotesk text-lg font-semibold text-text-primary group-hover:text-white transition-colors duration-300">
                        {cat.category}
                      </h3>
                      <span className="font-mono text-[10px] tracking-wider" style={{ color: `${cat.color}80` }}>
                        {cat.skills.length} skills
                      </span>
                    </div>
                    {/* Category number */}
                    <span className="font-mono text-[11px] text-text-muted/30 group-hover:text-text-muted/50 transition-colors duration-300">
                      0{i + 1}
                    </span>
                  </div>

                  {/* Separator */}
                  <div
                    className="h-[1px] mb-6 transition-all duration-500"
                    style={{ background: `linear-gradient(90deg, ${cat.color}15, transparent)` }}
                  />

                  {/* Skills with animated bars */}
                  <div className="relative space-y-3">
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

        {/* Bottom marquee */}
        <div className="relative overflow-hidden py-7 border-y border-border/30">
          <div className="absolute left-0 top-0 bottom-0 w-40 bg-gradient-to-r from-bg to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-40 bg-gradient-to-l from-bg to-transparent z-10" />
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span key={i} className="inline-flex items-center mx-5">
                <span className="font-grotesk text-sm text-text-muted/20 hover:text-text-muted/50 transition-colors duration-300">{skill}</span>
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
