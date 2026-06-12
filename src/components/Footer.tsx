import { personalInfo } from '@/data'
import Reveal from './Reveal'

const socialLinks = [
  { name: 'LinkedIn', href: personalInfo.linkedin, external: true },
  { name: 'GitHub', href: personalInfo.github, external: true },
  { name: 'Email', href: `mailto:${personalInfo.email}`, external: false },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-line-strong">
      <div className="px-page py-14 md:py-20">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-7">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="font-display text-xl font-extrabold uppercase tracking-[0.1em] text-ink hover:text-accent transition-colors duration-200"
              >
                Munjal Nayak<span className="text-accent">.</span>
              </button>
              <p className="mt-4 font-sans text-sm text-ink-faint max-w-xs leading-relaxed">
                Hardware & Embedded Systems Engineer crafting reliable, precise electronic systems.
              </p>
            </div>

            <div className="md:col-span-5">
              <div className="mono-label pb-3 border-b border-line">Connect</div>
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between border-b border-line py-3 transition-colors duration-200 hover:bg-bg-subtle"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-soft group-hover:text-accent transition-colors duration-200">
                    {link.name}
                  </span>
                  <span className="font-mono text-xs text-ink-faint group-hover:text-accent transition-all duration-200 group-hover:translate-x-1">
                    {link.external ? '↗' : '→'}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-line pt-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
              © {year} Munjal Nayak — All rights reserved
            </p>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint hover:text-accent transition-colors duration-200"
            >
              Back to top
              <span className="transition-transform duration-200 group-hover:-translate-y-1">↑</span>
            </button>
          </div>
        </Reveal>
      </div>

      {/* Watermark */}
      <div className="overflow-hidden pointer-events-none select-none">
        <div className="px-page">
          <p className="font-display text-[clamp(3rem,12.5vw,11rem)] font-black uppercase text-ink/[0.05] leading-[0.8] tracking-tight whitespace-nowrap translate-y-[12%]">
            Munjal Nayak
          </p>
        </div>
      </div>

      <div className="border-t border-line py-3 text-center">
        <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-ink-faint">
          — End of file · MN-{year} —
        </span>
      </div>
    </footer>
  )
}
