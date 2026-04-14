import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Preloader from '@/components/Preloader'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import ValueProp from '@/components/ValueProp'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Contact from '@/components/Contact'
import MarqueeDivider from '@/components/MarqueeDivider'
import Footer from '@/components/Footer'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'
import SmoothScroll from '@/components/SmoothScroll'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showBanner, setShowBanner] = useState(true)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => {
      setIsLoading(false)
      document.body.style.overflow = 'auto'
    }, 2800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <CustomCursor />
      <div className="grain-overlay" />

      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      {/* Under Development Popup */}
      <AnimatePresence>
        {showBanner && !isLoading && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setShowBanner(false)}
          >
            <motion.div
              className="relative mx-4 max-w-md w-full p-8 md:p-10 bg-bg-card border border-accent/20 rounded-2xl text-center"
              style={{ boxShadow: '0 0 80px rgba(200,169,110,0.08)' }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
              <div className="w-12 h-12 mx-auto mb-5 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-accent">
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-text-primary mb-2">Under Development</h3>
              <p className="font-sans text-sm text-text-secondary leading-relaxed mb-6">
                This portfolio is currently being built. Some features and sections may be incomplete or change soon.
              </p>
              <button
                onClick={() => setShowBanner(false)}
                className="inline-flex items-center gap-2 bg-accent text-[#050505] px-6 py-2.5 font-grotesk text-sm font-semibold rounded-full hover:bg-accent-light transition-colors duration-300"
              >
                Got it, explore anyway
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <main>
            <Hero />
            <MarqueeDivider />
            <About />
            <ValueProp />
            <Experience />
            <Skills />
            <Projects />
            <MarqueeDivider />
            <Contact />
          </main>
          <Footer />
        </SmoothScroll>
      )}
    </>
  )
}
