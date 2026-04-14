import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { projects, publications } from '@/data'
import TextReveal from './TextReveal'
import SpotlightCard from './SpotlightCard'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-gap relative bg-grid" ref={ref}>
      <div className="section-padding">
        {/* Section label */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            04 / Work
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
          <TextReveal text="Selected" delay={0.1} />
          <br />
          <span className="text-gradient-gold">
            <TextReveal text="Projects" delay={0.3} />
          </span>
        </h2>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Publications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-10">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
              Publications
            </h3>
            <div className="flex-1 h-[1px] bg-border" />
          </div>

          <div className="space-y-4">
            {publications.map((pub, i) => (
              <PublicationCard key={i} publication={pub} index={i} />
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12 }}
    >
      <SpotlightCard className="group relative p-6 md:p-8 border border-border bg-bg-card rounded-lg transition-all duration-500 hover:border-accent/20 hover:glow-gold">
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ backgroundColor: `${project.accent}12` }}
        />

        <span className="relative font-mono text-xs text-text-muted/50 mb-6 block">
          0{index + 1}
        </span>

        <span
          className="relative font-mono text-[10px] tracking-[0.2em] uppercase mb-4 block"
          style={{ color: project.accent }}
        >
          {project.category}
        </span>

        <h3 className="relative font-display text-xl md:text-2xl font-bold text-text-primary mb-4 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h3>

        <p className="relative font-sans text-sm text-text-secondary leading-relaxed mb-6">
          {project.description}
        </p>

        <div className="relative flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[10px] font-mono tracking-wider border rounded-full transition-colors duration-300"
              style={{
                color: `${project.accent}cc`,
                borderColor: `${project.accent}20`,
                backgroundColor: `${project.accent}08`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ backgroundColor: project.accent }}
        />
      </SpotlightCard>
    </motion.div>
  )
}

function PublicationCard({
  publication,
  index,
}: {
  publication: (typeof publications)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="group p-6 border border-border bg-bg-card hover:border-accent/20 rounded-lg transition-all duration-500 hover:glow-gold"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="font-mono text-xs text-accent tracking-wider">
            {publication.journal}
          </span>
          <p className="mt-2 font-sans text-sm text-text-secondary leading-relaxed">
            {publication.title}
          </p>
        </div>
        <span className="font-mono text-sm text-text-muted shrink-0">{publication.year}</span>
      </div>
    </motion.div>
  )
}
