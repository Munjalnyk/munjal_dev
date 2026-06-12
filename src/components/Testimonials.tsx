import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { testimonials } from '@/data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Tilt3D from './Tilt3D'

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px 80px 0px' })
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (!isInView || paused) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [isInView, paused])

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length)
  const next = () => setActive((a) => (a + 1) % testimonials.length)

  const t = testimonials[active]

  return (
    <section className="py-section relative" ref={ref}>
      <div className="px-page">
        <SectionHeading index="05" title="Testimonials" refCode="MN-T-05" />

        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.05] tracking-tight mb-10 md:mb-14">
            What people
            <br />
            <span className="text-accent">say.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Tilt3D className="max-w-4xl" intensity={4} scale={1.01}>
          <div
            className="relative border border-line-strong bg-bg-card"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Header bar */}
            <div className="flex items-center justify-between border-b border-line px-5 md:px-8 py-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
                Record {String(active + 1).padStart(2, '0')} /{' '}
                {String(testimonials.length).padStart(2, '0')}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                Verified
              </span>
            </div>

            <div className="p-5 md:p-8 lg:p-10">
              <div className="min-h-[160px] md:min-h-[130px]">
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={active}
                    className="font-sans text-base md:text-lg text-ink-soft leading-relaxed"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.35 }}
                  >
                    "{t.quote}"
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {t.image ? (
                      <div className="w-11 h-11 overflow-hidden border border-line shrink-0">
                        <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-11 h-11 border border-line shrink-0 flex items-center justify-center font-mono text-xs text-ink-faint">
                        {t.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <span className="block font-display text-sm font-bold text-ink">
                        {t.name}
                      </span>
                      <span className="block font-mono text-[10px] uppercase tracking-[0.15em] text-ink-faint mt-0.5">
                        {t.role} — {t.company}
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prev}
                    className="w-9 h-9 border border-line flex items-center justify-center text-ink-soft hover:text-accent hover:border-accent transition-colors duration-200"
                    aria-label="Previous testimonial"
                  >
                    ←
                  </button>
                  <div className="flex items-center gap-1.5">
                    {testimonials.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`h-1.5 transition-all duration-300 ${
                          i === active ? 'bg-accent w-6' : 'bg-line-strong hover:bg-ink-faint w-1.5'
                        }`}
                        aria-label={`View testimonial ${i + 1}`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={next}
                    className="w-9 h-9 border border-line flex items-center justify-center text-ink-soft hover:text-accent hover:border-accent transition-colors duration-200"
                    aria-label="Next testimonial"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="h-[2px] bg-line/50 overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                key={`${active}-${paused}`}
                initial={{ width: paused ? undefined : '0%' }}
                animate={{ width: paused ? undefined : '100%' }}
                transition={{ duration: paused ? 0 : 6, ease: 'linear' }}
              />
            </div>
          </div>
          </Tilt3D>
        </Reveal>
      </div>
    </section>
  )
}
