import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { personalInfo } from '@/data'

const navLinks = [
  { index: '01', name: 'About', href: '#about' },
  { index: '02', name: 'Experience', href: '#experience' },
  { index: '03', name: 'Skills', href: '#skills' },
  { index: '04', name: 'Work', href: '#projects' },
  { index: '06', name: 'Contact', href: '#contact' },
]

function ThemeIcon({ theme }: { theme: 'light' | 'dark' }) {
  return theme === 'dark' ? (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M8 2V3.5M8 12.5V14M2 8H3.5M12.5 8H14M3.76 3.76L4.82 4.82M11.18 11.18L12.24 12.24M12.24 3.76L11.18 4.82M4.82 11.18L3.76 12.24"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  ) : (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path
        d="M13 9.5A5.5 5.5 0 116.5 3 4 4 0 0013 9.5z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>(() =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark'
  )

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.add('no-transitions')
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.classList.toggle('light', next === 'light')
    const meta = document.getElementById('meta-theme-color') as HTMLMetaElement | null
    if (meta) meta.content = next === 'light' ? '#f6f5f0' : '#111110'
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.classList.remove('no-transitions')
      })
    })
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40)
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
      { threshold: 0.2, rootMargin: '-72px 0px -40% 0px' }
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 border-b border-line bg-bg/95 backdrop-blur-sm transition-all duration-300 ${
          isScrolled ? 'py-0' : 'py-1'
        }`}
      >
        <nav className="px-page flex items-stretch justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="py-4 font-display text-sm font-extrabold uppercase tracking-[0.12em] text-ink hover:text-accent transition-colors duration-200"
            aria-label="Back to top"
          >
            Munjal Nayak<span className="text-accent">.</span>
          </button>

          <div className="hidden md:flex items-stretch">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-4 lg:px-5 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-accent'
                    : 'text-ink-soft hover:text-ink'
                }`}
              >
                <span className="text-ink-faint mr-1.5">{link.index}</span>
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2.5 py-2.5">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 border border-line flex items-center justify-center text-ink-soft hover:text-accent hover:border-accent transition-colors duration-200"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <ThemeIcon theme={theme} />
            </button>

            <a
              href={personalInfo.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 bg-accent px-4 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--text-on-accent)] hover:bg-accent-alt transition-colors duration-200"
            >
              Resume
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 border border-line flex flex-col items-center justify-center gap-[5px]"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block w-4 h-[1.5px] bg-ink origin-center"
                animate={isMobileMenuOpen ? { rotate: 45, y: 3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block w-4 h-[1.5px] bg-ink origin-center"
                animate={isMobileMenuOpen ? { rotate: -45, y: -3.25 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg pt-20 px-page md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mono-label py-3 border-b border-line">Index</div>
            <nav className="flex flex-col">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="group flex items-baseline justify-between border-b border-line py-5 text-left"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <span className="font-display text-2xl font-bold uppercase tracking-wide text-ink group-hover:text-accent transition-colors">
                    {link.name}
                  </span>
                  <span className="font-mono text-xs text-ink-faint">{link.index}</span>
                </motion.button>
              ))}
              <motion.a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-baseline justify-between border-b border-line py-5"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.05 }}
              >
                <span className="font-display text-2xl font-bold uppercase tracking-wide text-accent">
                  Resume ↗
                </span>
                <span className="font-mono text-xs text-ink-faint">PDF</span>
              </motion.a>
              <motion.button
                onClick={toggleTheme}
                className="flex items-center justify-between border-b border-line py-5"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: (navLinks.length + 1) * 0.05 }}
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
                  {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                </span>
                <span className="text-ink-soft">
                  <ThemeIcon theme={theme} />
                </span>
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
