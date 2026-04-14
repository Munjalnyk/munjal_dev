import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { personalInfo } from '@/data'

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
      <div className="section-padding py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="font-display text-lg font-bold text-text-primary tracking-wider">
              MN<span className="text-accent">.</span>
            </span>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="font-mono text-xs text-text-muted tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            &copy; {year} Munjal Nayak. All rights reserved.
          </motion.p>

          {/* Social links */}
          <motion.div
            className="flex items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="hover-line font-grotesk text-sm text-text-secondary hover:text-accent transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        </div>

        {/* Back to top */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex flex-col items-center gap-2 text-text-muted hover:text-accent transition-colors"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="rotate-180 transition-transform group-hover:-translate-y-1"
            >
              <path d="M7 2V12M7 12L3 8M7 12L11 8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Top</span>
          </button>
        </motion.div>
      </div>

      {/* Large watermark */}
      <div className="overflow-hidden pointer-events-none select-none">
        <div className="section-padding pb-8">
          <p className="font-display text-[clamp(3rem,10vw,8rem)] font-bold text-white/[0.02] leading-none tracking-tight">
            MUNJAL NAYAK
          </p>
        </div>
      </div>
    </footer>
  )
}
