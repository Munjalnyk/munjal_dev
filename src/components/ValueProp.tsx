import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import SpotlightCard from './SpotlightCard'

const values = [
  {
    number: '01',
    title: 'Safety-Critical',
    subtitle: 'Engineering',
    description:
      'SIL4-compliant systems design for railway signalling, with rigorous validation and traceability at every step.',
    accent: '#c8a96e',
  },
  {
    number: '02',
    title: 'Embedded',
    subtitle: 'Systems',
    description:
      'Bare-metal and RTOS firmware on ESP32, STM32 — from sensor integration to cloud connectivity.',
    accent: '#a08548',
  },
  {
    number: '03',
    title: 'Hardware',
    subtitle: 'Design',
    description:
      'End-to-end PCB design from schematic capture to manufacturing, with DFM and signal integrity in mind.',
    accent: '#dfc49b',
  },
  {
    number: '04',
    title: 'IoT',
    subtitle: 'Solutions',
    description:
      'Connected devices with MQTT, HTTP, and cloud platforms — turning physical systems into smart, data-driven products.',
    accent: '#c8a96e',
  },
]

export default function ValueProp() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="section-gap relative" ref={ref}>
      <div className="section-padding">
        {/* Large statement */}
        <motion.div
          className="mb-20 max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary leading-snug">
            I design systems where{' '}
            <span className="text-gradient-gold">precision meets innovation</span> — from
            safety-critical railway infrastructure to smart connected devices.
          </p>
        </motion.div>

        {/* Value cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {values.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
            >
              <SpotlightCard className="group h-full p-6 md:p-7 border border-border bg-bg-card hover:border-accent/20 rounded-lg transition-all duration-500 hover:glow-gold light-card-shadow">
                <span
                  className="font-mono text-[10px] tracking-[0.2em] uppercase block mb-6"
                  style={{ color: item.accent }}
                >
                  {item.number}
                </span>

                <h3 className="font-display text-xl md:text-2xl font-bold text-text-primary leading-tight mb-1">
                  {item.title}
                </h3>
                <h3 className="font-display text-xl md:text-2xl font-bold text-gradient-gold leading-tight mb-4">
                  {item.subtitle}
                </h3>

                <p className="font-sans text-sm text-text-secondary leading-relaxed">
                  {item.description}
                </p>

                {/* Bottom line accent */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-[1px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                  style={{ backgroundColor: item.accent }}
                />
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
