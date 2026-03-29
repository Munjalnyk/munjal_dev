import { motion } from 'framer-motion'
import { BookOpen, Tag, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { projects, publications } from '@/data'

export default function Projects() {
  return (
    <section id="projects" className="relative py-28">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs text-[#00e5ff] tracking-[0.15em] uppercase">04 — Projects</span>
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
            Things I've{' '}
            <span style={{
              background: 'linear-gradient(120deg, #ffffff 0%, #00e5ff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              built & shipped
            </span>
          </h2>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              className="group relative rounded-2xl border border-white/[0.06] bg-[#0d0d16] p-7 overflow-hidden cursor-default transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4, borderColor: `${project.accent}25` }}
            >
              {/* Top line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${project.accent}60, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 + 0.3, duration: 0.7 }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${project.accent}06 0%, transparent 65%)` }}
              />

              <div className="relative">
                {/* Category + arrow */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wider border"
                    style={{
                      background: `${project.accent}10`,
                      color: project.accent,
                      borderColor: `${project.accent}20`,
                    }}
                  >
                    <Tag size={8} />
                    {project.category}
                  </span>
                  <div
                    className="w-7 h-7 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/20 opacity-0 group-hover:opacity-100 group-hover:text-[#00e5ff] group-hover:border-[#00e5ff]/20 transition-all duration-200"
                  >
                    <ArrowUpRight size={12} />
                  </div>
                </div>

                <h3 className="font-bold text-white text-[1.05rem] leading-snug mb-3 group-hover:text-white transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/35 text-sm leading-relaxed mb-5">{project.description}</p>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-medium border border-white/[0.06] text-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Publications */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center border border-purple-500/20 bg-purple-500/[0.08]">
              <BookOpen size={14} className="text-purple-400" />
            </div>
            <h3 className="font-semibold text-white/70 text-sm">Research Publications</h3>
          </div>

          <div className="space-y-2.5">
            {publications.map((pub, i) => (
              <motion.div
                key={i}
                className="group rounded-2xl border border-white/[0.06] bg-[#0d0d16] p-5 transition-all duration-300"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -2, borderColor: 'rgba(167,139,250,0.18)' }}
              >
                <div className="flex items-start gap-4">
                  <span
                    className="flex-shrink-0 mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold border border-purple-500/20 text-purple-400"
                    style={{ background: 'rgba(167,139,250,0.08)' }}
                  >
                    {pub.year}
                  </span>
                  <div>
                    <p className="text-[10px] text-white/25 font-medium uppercase tracking-wider mb-1.5">{pub.journal}</p>
                    <p className="text-sm text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                      {pub.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
