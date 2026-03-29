import { motion } from 'framer-motion'
import { MapPin, ExternalLink, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { personalInfo } from '@/data'

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } },
}

function BentoCard({ className, children, glowColor }: {
  className?: string
  children: React.ReactNode
  glowColor?: string
}) {
  return (
    <motion.div
      variants={item}
      className={cn(
        'group relative rounded-2xl border border-white/[0.06] bg-[#0d0d16] overflow-hidden transition-all duration-300',
        className
      )}
      whileHover={{ y: -3, borderColor: glowColor ? `${glowColor}25` : 'rgba(255,255,255,0.1)' }}
    >
      {glowColor && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{ background: `radial-gradient(circle at 50% 0%, ${glowColor}08 0%, transparent 60%)` }}
        />
      )}
      {children}
    </motion.div>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="flex items-center gap-3 mb-16"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="font-mono text-xs text-[#00e5ff] tracking-[0.15em] uppercase">01 — About</span>
          <div className="w-16 h-px bg-white/[0.07]" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
          {/* Bio — 2 cols */}
          <BentoCard className="lg:col-span-2 p-8" glowColor="#00e5ff">
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
              Building hardware that{' '}
              <span style={{
                background: 'linear-gradient(120deg, #ffffff 0%, #00e5ff 60%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                just works.
              </span>
            </h2>
            <p className="text-white/40 leading-relaxed text-sm mb-6">{personalInfo.bio}</p>
            <div className="flex flex-wrap gap-1.5">
              {['ESP32', 'STM32', 'PCB Design', 'SIL4', 'ETCS', 'IoT', 'Python', 'Embedded C'].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full text-[10px] font-medium text-white/40 bg-white/[0.04] border border-white/[0.06] hover:text-[#00e5ff] hover:border-[#00e5ff]/20 hover:bg-[#00e5ff]/[0.05] transition-all duration-200 cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>
          </BentoCard>

          {/* Photo */}
          <BentoCard className="overflow-hidden min-h-[280px] row-span-2">
            <img
              src={personalInfo.profileImg}
              alt={personalInfo.name}
              className="w-full h-full object-cover object-top"
              style={{ filter: 'grayscale(20%) contrast(1.05)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-[#0d0d16]/20 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <p className="text-sm font-semibold text-white">{personalInfo.name}</p>
              <p className="text-xs text-white/40 mt-0.5">Hardware · Embedded · IoT</p>
            </div>
          </BentoCard>

          {/* Location */}
          <BentoCard className="p-6" glowColor="#00e5ff">
            <div className="w-9 h-9 rounded-xl bg-[#00e5ff]/[0.08] border border-[#00e5ff]/15 flex items-center justify-center mb-4">
              <MapPin size={16} className="text-[#00e5ff]" />
            </div>
            <p className="text-[10px] text-white/25 font-medium uppercase tracking-wider mb-1">Location</p>
            <p className="text-sm font-semibold text-white/80">{personalInfo.location}</p>
          </BentoCard>

          {/* Status */}
          <BentoCard className="p-6 border-[#00e5ff]/12 bg-[#00e5ff]/[0.02]">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00e5ff] animate-pulse" />
              <span className="text-[10px] text-[#00e5ff] font-semibold uppercase tracking-wider">{personalInfo.status}</span>
            </div>
            <p className="text-sm font-semibold text-white/80 leading-snug">Master's @ UNSW Sydney</p>
            <p className="text-xs text-white/30 mt-1">Electrical Engineering · 2025–2027</p>
          </BentoCard>

          {/* Stats */}
          {personalInfo.stats.map((stat) => (
            <BentoCard key={stat.label} className="p-6 flex flex-col justify-between" glowColor="#00e5ff">
              <span className="text-4xl font-black text-[#00e5ff]">{stat.value}</span>
              <span className="text-xs text-white/35 font-medium mt-2">{stat.label}</span>
            </BentoCard>
          ))}

          {/* Connect */}
          <BentoCard className="p-6 md:col-span-2 lg:col-span-1">
            <p className="text-[10px] text-white/25 font-medium uppercase tracking-wider mb-4">Connect</p>
            <div className="space-y-1">
              {[
                { label: 'LinkedIn', href: personalInfo.linkedin, sub: '/in/munjalnyk' },
                { label: 'GitHub', href: personalInfo.github, sub: '/yorocoboy1' },
                { label: 'Email', href: `mailto:${personalInfo.email}`, sub: personalInfo.email },
              ].map(({ label, href, sub }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-all"
                >
                  <div>
                    <span className="text-sm font-medium text-white/60 group-hover:text-[#00e5ff] transition-colors">{label}</span>
                    <p className="text-[10px] text-white/20">{sub}</p>
                  </div>
                  <ExternalLink size={11} className="text-white/20 group-hover:text-[#00e5ff] transition-colors" />
                </a>
              ))}
            </div>
          </BentoCard>
        </motion.div>
      </div>
    </section>
  )
}
