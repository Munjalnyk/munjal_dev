import { experiences } from '@/data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function ExperienceRow({
  experience,
  index,
}: {
  experience: (typeof experiences)[0]
  index: number
}) {
  const isWork = experience.type === 'work'

  return (
    <Reveal delay={Math.min(index * 0.06, 0.2)}>
      <div className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 border-b border-line py-8 md:py-10 transition-colors duration-300 hover:bg-bg-subtle md:px-4 md:-mx-4">
        {/* Meta column */}
        <div className="md:col-span-3 flex md:flex-col flex-wrap items-baseline md:items-start gap-x-4 gap-y-2">
          <span
            className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
              isWork ? 'text-accent' : 'text-ink-faint'
            }`}
          >
            [ {isWork ? 'Work' : 'Education'} ]
          </span>
          <span className="font-mono text-sm text-ink">{experience.duration}</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint">
            {experience.location}
          </span>
        </div>

        {/* Content column */}
        <div className="md:col-span-9">
          <h3 className="font-display text-xl md:text-2xl font-bold text-ink leading-tight group-hover:text-accent transition-colors duration-300">
            {experience.role}
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {experience.company}
          </p>

          <p className="mt-4 font-sans text-sm text-ink-soft">{experience.description}</p>

          {experience.bullets.length > 0 && (
            <ul className="mt-4 space-y-2.5">
              {experience.bullets.map((bullet, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3 font-sans text-sm text-ink-soft leading-relaxed"
                >
                  <span className="mt-[0.55em] h-[1px] w-4 bg-accent shrink-0" />
                  {bullet}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1.5">
            {experience.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint"
              >
                [{tag}]
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-section relative">
      <div className="px-page">
        <SectionHeading index="02" title="Experience" refCode="MN-E-02" />

        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.05] tracking-tight mb-10 md:mb-14">
            Where I've worked
            <br />
            <span className="text-accent">& learned.</span>
          </h2>
        </Reveal>

        <div className="border-t border-line">
          {experiences.map((exp, i) => (
            <ExperienceRow key={i} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
