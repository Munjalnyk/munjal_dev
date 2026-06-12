import { useState, useEffect, lazy, Suspense } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ScrollProgress from '@/components/ScrollProgress'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

const About = lazy(() => import('@/components/About'))
const ValueProp = lazy(() => import('@/components/ValueProp'))
const Experience = lazy(() => import('@/components/Experience'))
const Skills = lazy(() => import('@/components/Skills'))
const Projects = lazy(() => import('@/components/Projects'))
const Testimonials = lazy(() => import('@/components/Testimonials'))
const Contact = lazy(() => import('@/components/Contact'))
const Gallery = lazy(() => import('@/components/Gallery'))
const MarqueeDivider = lazy(() => import('@/components/MarqueeDivider'))
const Footer = lazy(() => import('@/components/Footer'))

function dismissHtmlPreloader() {
  const el = document.getElementById('html-preloader')
  if (!el) return
  el.classList.add('fade-out')
  setTimeout(() => el.remove(), 600)
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (typeof window.__onAppReady === 'function') {
      window.__onAppReady()
    }

    const timer = setTimeout(() => {
      setIsReady(true)
      document.body.style.overflow = 'auto'
      dismissHtmlPreloader()
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showBanner) return
    const t = setTimeout(() => setShowBanner(false), 3000)
    return () => clearTimeout(t)
  }, [showBanner])

  if (!isReady) return null

  return (
    <>
      <ScrollProgress />

      <AnimatePresence>
        {showBanner && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/80 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowBanner(false)}
          >
            <motion.div
              className="relative max-w-md w-full border border-line-strong bg-bg-card"
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 16, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between bg-accent px-4 py-2.5">
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-[var(--text-on-accent)]">
                  Notice — Under development
                </span>
                <span className="font-mono text-[10px] text-[var(--text-on-accent)]">!</span>
              </div>
              <div className="p-6 md:p-8">
                <p className="font-sans text-sm text-ink-soft leading-relaxed mb-6">
                  This portfolio is currently being built. Some features and sections may be
                  incomplete or change soon.
                </p>
                <button onClick={() => setShowBanner(false)} className="btn-outline w-full">
                  Acknowledge →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <MarqueeDivider />
          <About />
          <ValueProp />
          <Experience />
          <Skills />
          <Projects />
          <Testimonials />
          <MarqueeDivider />
          <Contact />
          <Gallery />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}
