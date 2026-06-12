import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { personalInfo } from '@/data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
  const numMatch = value.match(/(\d+)/)
  const num = numMatch ? parseInt(numMatch[1]) : 0
  const suffix = value.replace(/\d+/, '')
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView || num <= 0) return
    const duration = 1600
    const step = duration / num
    let current = 0
    const timer = setInterval(() => {
      current++
      if (current >= num) {
        setCount(num)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, step)
    return () => clearInterval(timer)
  }, [inView, num])

  return <>{inView ? `${count}${suffix}` : `0${suffix}`}</>
}

const connectLinks = [
  { label: 'LinkedIn', href: personalInfo.linkedin, external: true },
  { label: 'GitHub', href: personalInfo.github, external: true },
  { label: 'Email', href: `mailto:${personalInfo.email}`, external: false },
]

export default function About() {
  const statsRef = useRef(null)
  const statsInView = useInView(statsRef, { once: true, margin: '0px 0px 80px 0px' })

  return (
    <section id="about" className="py-section relative">
      <div className="px-page">
        <SectionHeading index="01" title="About" refCode="MN-A-01" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Portrait figure */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <figure className="relative max-w-md mx-auto lg:mx-0">
              <span className="absolute -top-3 -left-2.5 font-mono text-sm text-ink-faint select-none">+</span>
              <span className="absolute -top-3 -right-2.5 font-mono text-sm text-ink-faint select-none">+</span>
              <span className="absolute -bottom-3 -left-2.5 font-mono text-sm text-ink-faint select-none">+</span>
              <span className="absolute -bottom-3 -right-2.5 font-mono text-sm text-ink-faint select-none">+</span>
              <div className="border border-line-strong bg-bg-card">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={personalInfo.profileImg}
                    alt={personalInfo.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="fig-caption">
                  <span>Fig. 1.0 — Portrait</span>
                  <span>{personalInfo.name}</span>
                </figcaption>
              </div>
            </figure>
          </Reveal>

          {/* Text */}
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-ink leading-[1.05] tracking-tight mb-8">
                Crafting <span className="text-accent">precision</span>
                <br />
                in every circuit.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="font-sans text-base md:text-lg text-ink-soft leading-relaxed mb-5 max-w-2xl">
                {personalInfo.bio}
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="font-sans text-sm md:text-base text-ink-faint leading-relaxed mb-10 max-w-2xl">
                {personalInfo.bioShort}
              </p>
            </Reveal>

            {/* Connect ledger */}
            <Reveal delay={0.2}>
              <div className="border-t border-line mb-12">
                {connectLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border-b border-line py-3.5 transition-colors duration-200 hover:bg-bg-subtle"
                  >
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft group-hover:text-accent transition-colors duration-200">
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-ink-faint group-hover:text-accent transition-all duration-200 group-hover:translate-x-1">
                      {link.external ? '↗' : '→'}
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Stats */}
            <div ref={statsRef} className="cell-grid grid-cols-3">
              {personalInfo.stats.map((stat) => (
                <div key={stat.label} className="p-4 md:p-6">
                  <span className="block font-display text-2xl sm:text-3xl md:text-4xl font-black text-accent leading-none">
                    <AnimatedCounter value={stat.value} inView={statsInView} />
                  </span>
                  <span className="mt-2 block font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
