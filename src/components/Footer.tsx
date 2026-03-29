import { motion } from 'framer-motion'
import { Github, Linkedin, Mail } from 'lucide-react'
import { personalInfo } from '@/data'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#00e5ff] flex items-center justify-center">
            <span className="text-[#080810] text-[9px] font-black">MN</span>
          </div>
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Munjal Nayak · Built with React & Framer Motion
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {[
            { icon: Github, href: personalInfo.github, label: 'GitHub' },
            { icon: Linkedin, href: personalInfo.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-7 h-7 rounded-lg border border-white/[0.06] flex items-center justify-center text-white/25 hover:text-[#00e5ff] hover:border-[#00e5ff]/20 transition-all"
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon size={12} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  )
}
