import { skillCategories } from '@/data'
import { Cpu, Code2, Server, Shield } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const iconMap: Record<string, React.ElementType> = {
  Cpu,
  Code2,
  Server,
  Shield,
}

export default function Skills() {
  const allSkills = skillCategories.flatMap((cat) => cat.skills)

  return (
    <section id="skills" className="py-section relative">
      <div className="px-page">
        <SectionHeading index="03" title="Skills" refCode="MN-S-03" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-14">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.05] tracking-tight">
              Technical
              <br />
              <span className="text-accent">arsenal.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-xs font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint leading-relaxed">
              {allSkills.length} skills / {skillCategories.length} domains — bare-metal firmware to
              safety-critical infrastructure
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="cell-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-14 md:mb-20">
            {skillCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon]
              return (
                <div key={cat.category} className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-accent">{Icon && <Icon size={18} strokeWidth={1.5} />}</span>
                    <span className="font-mono text-[10px] text-ink-faint">0{i + 1}</span>
                  </div>

                  <h3 className="font-display text-base font-bold uppercase tracking-wide text-ink mb-5">
                    {cat.category}
                  </h3>

                  <ul>
                    {cat.skills.map((skill, j) => (
                      <li
                        key={skill}
                        className="flex items-baseline gap-3 border-b border-line py-2 last:border-0"
                      >
                        <span className="font-mono text-[9px] text-ink-faint shrink-0">
                          {String(j + 1).padStart(2, '0')}
                        </span>
                        <span className="font-sans text-[13px] text-ink-soft leading-snug">
                          {skill}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </Reveal>

        {/* Skills ticker */}
        <Reveal delay={0.1}>
          <div className="relative overflow-hidden border-y border-line py-3">
            <div className="animate-ticker flex w-max items-center whitespace-nowrap">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
                  {allSkills.map((skill, i) => (
                    <span key={`${dup}-${i}`} className="inline-flex items-center">
                      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-faint mx-4 select-none">
                        {skill}
                      </span>
                      <span className="text-accent/60 text-[10px] select-none">/</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
