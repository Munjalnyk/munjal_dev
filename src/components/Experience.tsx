import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { experiences } from '@/data'

type Exp = (typeof experiences)[number]

function Card({ exp, side }: { exp: Exp; side: 'left' | 'right' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const isWork = exp.type === 'work'
  const accent = isWork ? '#00e5ff' : '#a78bfa'

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative rounded-2xl border bg-[#0d0d16] p-6 transition-all duration-300 group',
        side === 'left' ? 'md:mr-8' : 'md:ml-8'
      )}
      style={{ borderColor: 'rgba(255,255,255,0.06)' }}
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -3, borderColor: `${accent}25` }}
    >
      {/* Top accent line */}
      <motion.div
        className="absolute top-0 left-6 right-6 h-px"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}50, transparent)` }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
      />

      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="w-9 h-9 rounded-xl border flex-shrink-0 flex items-center justify-center mt-0.5"
          style={{ background: `${accent}10`, borderColor: `${accent}25`, color: accent }}
        >
          {isWork ? <Briefcase size={15} /> : <GraduationCap size={15} />}
        </div>
        <div>
          <h3 className="font-semibold text-white text-[0.9rem] leading-snug">{exp.role}</h3>
          <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{exp.company}</p>
        </div>
      </div>

      {/* Meta */}
      <div className="flex flex-wrap gap-3 mb-3">
        <span className="flex items-center gap-1 text-[10px] text-white/25">
          <Calendar size={9} /> {exp.duration}
        </span>
        <span className="flex items-center gap-1 text-[10px] text-white/25">
          <MapPin size={9} /> {exp.location}
        </span>
      </div>

      <p className="text-xs text-white/35 mb-3 leading-relaxed">{exp.description}</p>

      {exp.bullets.length > 0 && (
        <ul className="space-y-1.5 mb-4">
          {exp.bullets.map((b, i) => (
            <li key={i} className="flex items-start gap-2 text-[11px] text-white/40 leading-relaxed">
              <span className="mt-1 flex-shrink-0 w-1 h-1 rounded-full" style={{ background: accent }} />
              {b}
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-wrap gap-1.5">
        {exp.tags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 rounded-full text-[9px] font-medium border"
            style={{ color: `${accent}99`, background: `${accent}08`, borderColor: `${accent}20` }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative py-28">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-[#00e5ff] tracking-[0.15em] uppercase">02 — Experience</span>
          <div className="w-16 h-px bg-white/[0.07]" />
        </motion.div>

        <motion.div
          className="mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Where I've{' '}
            <span style={{
              background: 'linear-gradient(120deg, #ffffff 0%, #00e5ff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              worked & studied
            </span>
          </h2>
          <div className="hidden md:flex items-center gap-5 text-[10px] text-white/25">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]/60" />Work</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-purple-400/60" />Education</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/[0.04] overflow-hidden">
            <motion.div className="w-full bg-gradient-to-b from-[#00e5ff]/40 to-purple-400/30" style={{ height: lineHeight }} />
          </div>

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => {
              const isWork = exp.type === 'work'
              const side = isWork ? 'left' : 'right'
              const ref2 = useRef(null)
              const inView = useInView(ref2, { once: true, margin: '-80px' })

              return (
                <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_48px_1fr] gap-0 items-start">
                  {/* Left slot */}
                  <div className="hidden md:block">
                    {isWork && <Card exp={exp} side="left" />}
                  </div>

                  {/* Center dot */}
                  <div ref={ref2} className="hidden md:flex flex-col items-center py-6">
                    <motion.div
                      className="w-8 h-8 rounded-xl border z-10 flex items-center justify-center"
                      style={{
                        background: isWork ? 'rgba(0,229,255,0.08)' : 'rgba(167,139,250,0.08)',
                        borderColor: isWork ? 'rgba(0,229,255,0.25)' : 'rgba(167,139,250,0.25)',
                        color: isWork ? '#00e5ff' : '#a78bfa',
                      }}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={inView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ duration: 0.4, type: 'spring', stiffness: 300 }}
                    >
                      {isWork ? <Briefcase size={13} /> : <GraduationCap size={13} />}
                    </motion.div>
                  </div>

                  {/* Right slot */}
                  <div className="hidden md:block">
                    {!isWork && <Card exp={exp} side="right" />}
                  </div>

                  {/* Mobile: always show */}
                  <div className="md:hidden">
                    <Card exp={exp} side="left" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
