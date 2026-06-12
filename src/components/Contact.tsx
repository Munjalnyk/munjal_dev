import { useState } from 'react'
import { personalInfo } from '@/data'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const contactLinks = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/munjalnyk', href: personalInfo.linkedin },
  { label: 'Website', value: 'munjal.dev', href: 'https://www.munjal.dev' },
  { label: 'GitHub', value: 'github.com/yorocoboy1', href: personalInfo.github },
]

export default function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Portfolio Contact from ${formState.name}`
    const body = `Name: ${formState.name}%0D%0AEmail: ${formState.email}%0D%0A%0D%0A${formState.message}`
    window.open(
      `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${body}`,
      '_self'
    )
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="py-section relative">
      <div className="px-page">
        <SectionHeading index="06" title="Contact" refCode="MN-C-06" />

        <Reveal>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink leading-[1.02] tracking-tight mb-10 md:mb-16">
            Let's build
            <br />
            something <span className="text-accent">great.</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact ledger */}
          <Reveal delay={0.1}>
            <p className="font-sans text-base md:text-lg text-ink-soft leading-relaxed mb-10 max-w-md">
              Have a project in mind or want to collaborate? I'm always open to discussing new
              opportunities and ideas.
            </p>

            <div className="border-t border-line">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={
                    item.href.startsWith('mailto') || item.href.startsWith('tel')
                      ? undefined
                      : '_blank'
                  }
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[90px_1fr_auto] items-baseline gap-4 border-b border-line py-4 transition-colors duration-200 hover:bg-bg-subtle"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                    {item.label}
                  </span>
                  <span className="font-sans text-sm text-ink-soft group-hover:text-accent transition-colors duration-200 truncate">
                    {item.value}
                  </span>
                  <span className="font-mono text-xs text-ink-faint group-hover:text-accent transition-all duration-200 group-hover:translate-x-1">
                    {item.href.startsWith('mailto') || item.href.startsWith('tel') ? '→' : '↗'}
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15}>
            <form
              onSubmit={handleSubmit}
              className="border border-line-strong bg-bg-card p-6 md:p-8 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-line pb-3 -mt-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink-faint">
                  Transmission form
                </span>
                <span className="font-mono text-[10px] text-accent">●</span>
              </div>

              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="mono-label block mb-2.5">{field.label}</label>
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={(e) =>
                      setFormState((prev) => ({ ...prev, [field.name]: e.target.value }))
                    }
                    required
                    className="w-full bg-bg border border-line px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint/50 focus:border-accent focus:outline-none transition-colors duration-200"
                  />
                </div>
              ))}

              <div>
                <label className="mono-label block mb-2.5">Message</label>
                <textarea
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                  required
                  rows={5}
                  className="w-full bg-bg border border-line px-4 py-3 font-sans text-sm text-ink placeholder:text-ink-faint/50 focus:border-accent focus:outline-none transition-colors duration-200 resize-none"
                />
              </div>

              <button type="submit" disabled={isSubmitted} className="btn-solid w-full disabled:opacity-60">
                {isSubmitted ? 'Message sent ✓' : 'Send message →'}
              </button>
            </form>
          </Reveal>
        </div>

        {/* Availability strip */}
        <Reveal delay={0.1}>
          <div className="mt-16 md:mt-20 border border-line-strong">
            <div className="flex items-center justify-between border-b border-line px-5 md:px-8 py-3">
              <span className="inline-flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.25em] text-accent">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full bg-accent/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 bg-accent" />
                </span>
                Available for projects
              </span>
              <span className="hidden sm:block font-mono text-[10px] uppercase tracking-[0.2em] text-ink-faint">
                Status: Active
              </span>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 md:p-8">
              <div>
                <p className="font-display text-lg md:text-xl font-bold text-ink tracking-tight">
                  Currently pursuing Master's — open to part-time or contract work
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ink-faint">
                  Based in Sydney, Australia · Remote-friendly
                </p>
              </div>
              <a href={`mailto:${personalInfo.email}`} className="btn-solid shrink-0 group">
                Get in touch
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
