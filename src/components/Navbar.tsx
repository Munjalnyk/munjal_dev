import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '@/data'
import MagneticButton from './MagneticButton'

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' }
    )
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'glass py-3' : 'py-5 bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.215, 0.61, 0.355, 1] }}
      >
        <nav className="section-padding flex items-center justify-between">
          {/* Logo */}
          <MagneticButton>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-display text-xl font-bold tracking-wider text-text-primary hover:text-accent transition-colors duration-300"
            >
              MN<span className="text-accent">.</span>
            </button>
          </MagneticButton>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <MagneticButton key={link.name} strength={0.15}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`hover-line font-grotesk text-sm tracking-wide transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.name}
                </button>
              </MagneticButton>
            ))}
          </div>

          {/* Resume + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <MagneticButton>
              <a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 border border-accent/30 px-5 py-2 font-grotesk text-sm text-accent hover:bg-accent/10 transition-all duration-300 rounded-full"
              >
                Resume
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-60">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </a>
            </MagneticButton>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-6 h-[1.5px] bg-text-primary origin-center"
                animate={isMobileMenuOpen ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block w-4 h-[1.5px] bg-text-primary"
                animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block w-6 h-[1.5px] bg-text-primary origin-center"
                animate={isMobileMenuOpen ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="font-display text-3xl font-semibold text-text-primary hover:text-accent transition-colors"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 border border-accent/30 px-8 py-3 font-grotesk text-accent hover:bg-accent/10 transition-all rounded-full"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: navLinks.length * 0.08 }}
              >
                Resume
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
