import Reveal from './Reveal'

const values = [
  {
    number: '01',
    title: 'Safety-Critical Engineering',
    description:
      'SIL4-compliant systems design for railway signalling, with rigorous validation and traceability at every step.',
  },
  {
    number: '02',
    title: 'Embedded Systems',
    description:
      'Bare-metal and RTOS firmware on ESP32, STM32 — from sensor integration to cloud connectivity.',
  },
  {
    number: '03',
    title: 'Hardware Design',
    description:
      'End-to-end PCB design from schematic capture to manufacturing, with DFM and signal integrity in mind.',
  },
  {
    number: '04',
    title: 'IoT Solutions',
    description:
      'Connected devices with MQTT, HTTP, and cloud platforms — turning physical systems into smart, data-driven products.',
  },
]

export default function ValueProp() {
  return (
    <section className="py-section relative">
      <div className="px-page">
        <Reveal>
          <p className="font-display text-2xl md:text-4xl lg:text-[2.75rem] font-bold text-ink leading-snug tracking-tight max-w-4xl mb-12 md:mb-16">
            I design systems where <span className="text-accent">precision meets innovation</span>{' '}
            — from safety-critical railway infrastructure to smart connected devices.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="cell-grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((item) => (
              <div
                key={item.number}
                className="group relative p-6 md:p-7 cell-glow transition-colors duration-300 hover:!bg-bg-card"
              >
                <div className="flex items-baseline justify-between mb-8">
                  <span className="font-mono text-xs text-accent">{item.number}</span>
                  <span className="font-mono text-xs text-ink-faint opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ●
                  </span>
                </div>

                <h3 className="font-display text-lg md:text-xl font-bold uppercase tracking-wide text-ink leading-tight mb-4">
                  {item.title}
                </h3>

                <p className="font-sans text-sm text-ink-soft leading-relaxed">
                  {item.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-400" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
