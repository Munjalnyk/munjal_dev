import { projects, publications } from '@/data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Tilt3D from './Tilt3D'

function FeaturedProject({ project, total }: { project: (typeof projects)[0]; total: number }) {
  return (
    <Reveal>
      <Tilt3D intensity={5} scale={1.01}>
        <div className="group relative border border-line-strong bg-bg-card card-glow mb-10 md:mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <figure className="relative border-b lg:border-b-0 lg:border-r border-line">
              <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-bg-subtle">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <span className="absolute top-4 left-4 bg-accent px-2.5 py-1 font-mono text-[9px] font-medium uppercase tracking-[0.25em] text-[var(--text-on-accent)]">
                Featured
              </span>
              <figcaption className="fig-caption absolute bottom-0 left-0 right-0">
                <span>Fig. 4.1 — {project.category}</span>
                <span>01 / {String(total).padStart(2, '0')}</span>
              </figcaption>
            </figure>

            <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent mb-4">
                {project.category}
              </span>

              <h3 className="font-display text-2xl md:text-3xl font-extrabold text-ink leading-tight tracking-tight mb-5">
                {project.title}
              </h3>

              <p className="font-sans text-sm md:text-base text-ink-soft leading-relaxed mb-7 max-w-lg">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>

              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline self-start group/cta"
                >
                  Open Project
                  <span className="transition-transform duration-200 group-hover/cta:translate-x-1 group-hover/cta:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              )}
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </div>
      </Tilt3D>
    </Reveal>
  )
}

function ProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof projects)[0]
  index: number
  total: number
}) {
  return (
    <Reveal delay={Math.min(index * 0.08, 0.24)} className="h-full">
      <Tilt3D className="h-full" intensity={8} scale={1.03}>
        <div className="group relative h-full flex flex-col card-glow">
          <figure className="relative">
            <div className="aspect-[16/10] overflow-hidden bg-bg-subtle">
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
            <figcaption className="fig-caption">
              <span>Fig. 4.{index + 2}</span>
              <span>
                {String(index + 2).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>

          <div className="flex-1 flex flex-col pt-5 pb-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mb-3">
              {project.category}
            </span>

            <h3 className="font-display text-lg font-bold text-ink leading-snug tracking-tight mb-3 group-hover:text-accent transition-colors duration-300">
              {project.title}
            </h3>

            <p className="font-sans text-sm text-ink-soft leading-relaxed mb-5 flex-1">
              {project.description}
            </p>

            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="font-mono text-[9px] uppercase tracking-[0.12em] text-ink-faint"
                  >
                    [{tag}]
                  </span>
                ))}
              </div>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 font-mono text-xs text-ink-faint group-hover:text-accent transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-label={`Open ${project.title}`}
                >
                  ↗
                </a>
              )}
            </div>
          </div>
        </div>
      </Tilt3D>
    </Reveal>
  )
}

export default function Projects() {
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <section id="projects" className="py-section relative">
      <div className="px-page">
        <SectionHeading index="04" title="Work" refCode="MN-W-04" />

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-6 mb-10 md:mb-14">
          <Reveal>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.05] tracking-tight">
              Selected
              <br />
              <span className="text-accent">projects.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm font-sans text-sm text-ink-faint leading-relaxed">
              A curated selection of engineering projects spanning safety-critical systems, IoT,
              and power electronics.
            </p>
          </Reveal>
        </div>

        {featured && <FeaturedProject project={featured} total={projects.length} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mb-16 md:mb-24">
          {rest.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} total={projects.length} />
          ))}
        </div>

        {/* Publications */}
        <Reveal>
          <div className="flex items-baseline justify-between border-y border-line py-3 mb-0">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-ink">
              <span className="text-accent">04.A</span>
              <span className="text-ink-faint"> / </span>
              Publications
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              {String(publications.length).padStart(2, '0')} entries
            </span>
          </div>
          {publications.map((pub, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 border-b border-line py-6 md:py-7 transition-colors duration-300 hover:bg-bg-subtle md:px-4 md:-mx-4"
            >
              <span className="md:col-span-2 font-mono text-sm text-accent">{pub.year}</span>
              <div className="md:col-span-10">
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint mb-2">
                  {pub.journal}
                </span>
                <p className="font-sans text-sm md:text-base text-ink-soft leading-relaxed">
                  {pub.title}
                </p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
