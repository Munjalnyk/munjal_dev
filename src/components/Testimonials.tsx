import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { testimonials } from '@/data'
import TextReveal from './TextReveal'

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isInView])

  const t = testimonials[active]

  return (
    <section className="section-gap relative" ref={ref}>
      <div className="section-padding">
        <motion.div
          className="mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            05 / Testimonials
          </span>
          <motion.div
            className="mt-3 h-[1px] bg-accent/30 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '80px' }}
          />
        </motion.div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-10 md:mb-16 leading-tight">
          <TextReveal text="What People" delay={0.1} inView={isInView} />
          <br />
          <TextReveal text="Say" delay={0.3} inView={isInView} gold />
        </h2>

        <motion.div
          className="max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="relative p-6 md:p-10 lg:p-12 border border-border/50 bg-bg-card/30 rounded-2xl overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            {/* Quote icon */}
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              className="text-accent/10 mb-6"
            >
              <path
                d="M14 28C14 24 16 20 20 16L18 14C12 18 8 24 8 30C8 34 10 38 14 38C17 38 20 36 20 32C20 29 18 28 14 28ZM34 28C34 24 36 20 40 16L38 14C32 18 28 24 28 30C28 34 30 38 34 38C37 38 40 36 40 32C40 29 38 28 34 28Z"
                fill="currentColor"
              />
            </svg>

            {/* Testimonial content */}
            <div className="min-h-[120px] md:min-h-[100px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active}
                  className="font-sans text-lg md:text-xl text-text-secondary leading-relaxed italic"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  "{t.quote}"
                </motion.blockquote>
              </AnimatePresence>
            </div>

            {/* Author */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-border/60 shrink-0">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                      style={{ filter: 'saturate(0.8) contrast(1.05)' }}
                    />
                  </div>
                  <div>
                    <span className="block font-grotesk text-base font-semibold text-text-primary">
                      {t.name}
                    </span>
                    <span className="block font-mono text-[10px] text-text-muted tracking-wider">
                      {t.role} · {t.company}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === active
                        ? 'bg-accent w-6'
                        : 'bg-text-muted/20 hover:bg-text-muted/40'
                    }`}
                    aria-label={`View testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-[1px] bg-border/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent/40"
                key={active}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
