import { motion } from 'framer-motion'
import { Cpu, Code2, Server, Shield } from 'lucide-react'
import { skillCategories } from '@/data'

const iconMap: Record<string, React.ElementType> = { Cpu, Code2, Server, Shield }

const allSkills = skillCategories.flatMap((c) => c.skills)

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Dot background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-[#00e5ff] tracking-[0.15em] uppercase">03 — Skills</span>
          <div className="w-16 h-px bg-white/[0.07]" />
        </motion.div>

        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Tools &{' '}
            <span style={{
              background: 'linear-gradient(120deg, #ffffff 0%, #00e5ff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Technologies
            </span>
          </h2>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-14">
          {skillCategories.map((cat, i) => {
            const Icon = iconMap[cat.icon] ?? Cpu
            return (
              <motion.div
                key={cat.category}
                className="group relative rounded-2xl border border-white/[0.06] bg-[#0d0d16] p-6 overflow-hidden transition-all duration-300"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                {/* Hover top accent */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${cat.color}70, transparent)` }}
                />
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${cat.color}06 0%, transparent 60%)` }}
                />

                <div
                  className="w-9 h-9 rounded-xl border flex items-center justify-center mb-5"
                  style={{ background: `${cat.color}10`, borderColor: `${cat.color}25`, color: cat.color }}
                >
                  <Icon size={17} />
                </div>

                <h3 className="font-semibold text-white/80 text-sm mb-4">{cat.category}</h3>

                <ul className="space-y-2">
                  {cat.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2 text-[11px] text-white/30 group-hover:text-white/50 transition-colors duration-200">
                      <span className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                      {skill}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>

        {/* Marquee */}
        <motion.div
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#080810] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#080810] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max" style={{ animation: 'marquee 35s linear infinite' }}>
            {[...allSkills, ...allSkills].map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 mx-2.5 px-4 py-2 rounded-full bg-[#0d0d16] border border-white/[0.06] text-[11px] text-white/35 font-medium whitespace-nowrap hover:text-[#00e5ff] hover:border-[#00e5ff]/20 transition-colors cursor-default"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]/40" />
                {skill}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
