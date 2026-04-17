import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo } from '@/data'
import MagneticButton from './MagneticButton'

const socialLinks = [
  { name: 'LinkedIn', href: personalInfo.linkedin },
  { name: 'GitHub', href: personalInfo.github },
  { name: 'Email', href: `mailto:${personalInfo.email}` },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const year = new Date().getFullYear()

  return (
    <footer ref={ref} className="relative border-t border-border">
      <div className="section-padding py-16 md:py-20">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 mb-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <MagneticButton>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-display text-2xl font-bold text-text-primary tracking-wider hover:text-accent transition-colors duration-300"
              >
                MN<span className="text-accent">.</span>
              </button>
            </MagneticButton>
            <p className="mt-3 font-sans text-sm text-text-muted max-w-xs leading-relaxed">
              Hardware & Embedded Systems Engineer crafting reliable, precise electronic systems.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {socialLinks.map((link) => (
              <MagneticButton key={link.name} strength={0.15}>
                <a
                  href={link.href}
                  target={link.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-border hover:border-accent/30 bg-bg-card hover:bg-accent/[0.04] rounded-full transition-all duration-300 group"
                >
                  <span className="font-grotesk text-sm text-text-secondary group-hover:text-accent transition-colors duration-300">
                    {link.name}
                  </span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className="text-text-muted/40 group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300"
                  >
                    <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1" />
                  </svg>
                </a>
              </MagneticButton>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            className="font-mono text-[11px] text-text-muted/60 tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            &copy; {year} Munjal Nayak — All rights reserved.
          </motion.p>

          {/* Back to top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <MagneticButton>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="group flex items-center gap-2 text-text-muted hover:text-accent transition-colors duration-300"
              >
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase">Back to top</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="transition-transform group-hover:-translate-y-1"
                >
                  <path d="M6 10V2M6 2L2 6M6 2L10 6" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </button>
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Large watermark */}
      <div className="overflow-hidden pointer-events-none select-none">
        <div className="section-padding pb-6">
          <p className="font-display text-[clamp(3rem,12vw,10rem)] font-bold watermark-text leading-none tracking-tight whitespace-nowrap">
            MUNJAL NAYAK
          </p>
        </div>
      </div>
    </footer>
  )
}
