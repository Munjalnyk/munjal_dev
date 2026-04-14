import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
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
