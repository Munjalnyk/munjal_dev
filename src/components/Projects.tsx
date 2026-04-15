import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { projects, publications } from '@/data'
import TextReveal from './TextReveal'
import SpotlightCard from './SpotlightCard'

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const featured = projects.find((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

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

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
            <TextReveal text="Selected" delay={0.1} />
            <br />
            <span className="text-gradient-gold">
              <TextReveal text="Projects" delay={0.3} />
            </span>
          </h2>
          <motion.p
            className="max-w-sm font-sans text-sm text-text-muted leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A curated selection of engineering projects spanning safety-critical systems, IoT, and power electronics.
          </motion.p>
        </div>

        {/* Featured Project */}
        {featured && <FeaturedProject project={featured} />}

        {/* Remaining projects grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-24">
          {rest.map((project, i) => (
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
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-accent">
                <path d="M3 2H14L17 5V18H3V2Z" stroke="currentColor" strokeWidth="1.2" />
                <path d="M6 8H14M6 11H14M6 14H10" stroke="currentColor" strokeWidth="1" opacity="0.5" />
              </svg>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-text-primary">
                Publications
              </h3>
            </div>
            <div className="flex-1 h-[1px] bg-gradient-to-r from-border to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

function FeaturedProject({ project }: { project: (typeof projects)[0] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const imageRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })

  const imgScale = useTransform(scrollYProgress, [0, 1], [1.1, 1])

  return (
    <motion.div
      ref={ref}
      className="mb-8"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="group relative rounded-xl overflow-hidden border border-border hover:border-accent/20 transition-all duration-700 hover:glow-gold">
        
        {/* Top gradient border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent/50 to-transparent z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[16/10] lg:aspect-auto overflow-hidden bg-bg-subtle"
          >
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              style={{ scale: imgScale, filter: 'saturate(0.8) contrast(1.05)' }}
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-bg-card/90 hidden lg:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent lg:hidden" />

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background: `linear-gradient(135deg, ${project.accent}08 0%, transparent 60%)`,
              }}
            />

            {/* Featured badge */}
            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-bg/70 backdrop-blur-md border border-accent/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-accent">
                  Featured
                </span>
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-bg-card">
            
            {/* Category */}
            <span
              className="font-mono text-[10px] tracking-[0.25em] uppercase mb-4 block"
              style={{ color: project.accent }}
            >
              {project.category}
            </span>

            {/* Title */}
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-5 leading-tight group-hover:text-accent transition-colors duration-500">
              {project.title}
            </h3>

            {/* Description */}
            <p className="font-sans text-base text-text-secondary leading-relaxed mb-8 max-w-lg">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 text-[10px] font-mono tracking-wider border rounded-full transition-all duration-300 hover:scale-105"
                  style={{
                    color: `${project.accent}cc`,
                    borderColor: `${project.accent}25`,
                    backgroundColor: `${project.accent}08`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA + Index Row */}
            <div className="flex items-center justify-between mt-4">
              
              {/* CTA */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta inline-flex items-center gap-3 px-5 py-2.5 rounded-full border font-mono text-xs tracking-wider transition-all duration-300 hover:shadow-lg"
                  style={{
                    color: project.accent,
                    borderColor: `${project.accent}40`,
                    background: `${project.accent}08`,
                  }}
                >
                  <span className="uppercase">View Project</span>
                  <span className="transition-transform duration-300 group-hover/cta:translate-x-1">
                    →
                  </span>
                </a>
              )}

              {/* Index */}
              <div className="flex items-center gap-4">
                <div
                  className="h-[1px] w-12"
                  style={{ backgroundColor: `${project.accent}40` }}
                />
                <span className="font-mono text-[10px] text-text-muted tracking-wider">
                  01 / 0{projects.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"
          style={{ backgroundColor: project.accent }}
        />
      </div>
    </motion.div>
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
      <SpotlightCard className="group relative border border-border bg-bg-card rounded-xl overflow-hidden transition-all duration-500 hover:border-accent/20 hover:glow-gold h-full flex flex-col">
        {/* Project image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            style={{ filter: 'saturate(0.7) contrast(1.05)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-bg-card/20 to-transparent" />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay"
            style={{ background: `linear-gradient(135deg, ${project.accent}20 0%, transparent 70%)` }}
          />
          {/* Number badge */}
          <div className="absolute top-4 right-4">
            <span className="font-mono text-xs text-text-muted/70 bg-bg/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/5">
              0{index + 2}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6 flex-1 flex flex-col">
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3 block"
            style={{ color: project.accent }}
          >
            {project.category}
          </span>

          <h3 className="font-display text-lg md:text-xl font-bold text-text-primary mb-3 group-hover:text-accent transition-colors duration-300 leading-snug">
            {project.title}
          </h3>

          <p className="font-sans text-sm text-text-secondary leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[9px] font-mono tracking-wider border rounded-full"
                style={{
                  color: `${project.accent}bb`,
                  borderColor: `${project.accent}18`,
                  backgroundColor: `${project.accent}06`,
                }}
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="px-2.5 py-1 text-[9px] font-mono tracking-wider text-text-muted border border-border rounded-full">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Bottom accent */}
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <SpotlightCard className="group relative p-6 md:p-8 border border-border bg-bg-card hover:border-accent/20 rounded-xl transition-all duration-500 hover:glow-gold overflow-hidden h-full">
        {/* Year badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center px-3 py-1 bg-accent/[0.06] border border-accent/15 rounded-full font-mono text-xs text-accent">
            {publication.year}
          </span>
          <div className="flex-1 h-[1px] bg-border" />
        </div>

        <span className="block font-mono text-[10px] text-accent/60 tracking-wider uppercase mb-3">
          {publication.journal}
        </span>

        <p className="font-sans text-sm text-text-secondary leading-relaxed group-hover:text-text-primary transition-colors duration-300">
          {publication.title}
        </p>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/10 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-accent/30 via-accent/10 to-transparent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
      </SpotlightCard>
    </motion.div>
  )
}
