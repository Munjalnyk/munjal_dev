import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { personalInfo } from '@/data'
import TextReveal from './TextReveal'
import MagneticButton from './MagneticButton'

const contactLinks = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M1 4.5L8 9L15 4.5" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: personalInfo.phone,
    href: `tel:${personalInfo.phone}`,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M3 2H6L7.5 5.5L5.5 7C6.5 9 7 9.5 9 10.5L10.5 8.5L14 10V13C14 13.5 13.5 14 13 14C7 14 2 9 2 3C2 2.5 2.5 2 3 2Z" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/munjalnyk',
    href: personalInfo.linkedin,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 7V11M5 4.5V4.51M8 11V8.5C8 7.5 9 7 9.5 7C10 7 11 7.5 11 8.5V11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/yorocoboy1',
    href: personalInfo.github,
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8 1C4.13 1 1 4.13 1 8C1 11.09 3.05 13.68 5.86 14.53C6.23 14.6 6.36 14.37 6.36 14.18V12.87C4.34 13.31 3.91 11.97 3.91 11.97C3.58 11.22 3.09 11 3.09 11C2.42 10.55 3.14 10.56 3.14 10.56C3.88 10.61 4.27 11.31 4.27 11.31C4.93 12.45 6 12.13 6.38 11.95C6.44 11.47 6.63 11.14 6.84 10.96C5.25 10.77 3.58 10.13 3.58 7.56C3.58 6.85 3.83 6.27 4.28 5.82C4.21 5.63 3.96 4.97 4.35 4.08C4.35 4.08 4.97 3.87 6.35 4.71C6.91 4.54 7.46 4.46 8 4.46C8.54 4.46 9.09 4.54 9.65 4.71C11.03 3.87 11.65 4.08 11.65 4.08C12.04 4.97 11.79 5.63 11.72 5.82C12.17 6.27 12.42 6.85 12.42 7.56C12.42 10.14 10.74 10.77 9.15 10.95C9.41 11.18 9.64 11.62 9.64 12.3V14.18C9.64 14.38 9.77 14.61 10.15 14.53C12.95 13.68 15 11.09 15 8C15 4.13 11.87 1 8 1Z" stroke="currentColor" strokeWidth="0.5" fill="currentColor" opacity="0.8" />
      </svg>
    ),
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Portfolio Contact from ${formState.name}`
    const body = `Name: ${formState.name}%0D%0AEmail: ${formState.email}%0D%0A%0D%0A${formState.message}`
    window.open(`mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${body}`, '_self')
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section id="contact" className="section-gap relative bg-dots" ref={ref}>
      <div className="section-padding">
        {/* Section label */}
        <motion.div
          className="mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            06 / Contact
          </span>
          <motion.div
            className="mt-3 h-[1px] bg-accent/30 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ maxWidth: '80px' }}
          />
        </motion.div>

        {/* Large CTA text */}
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-8 md:mb-16 leading-tight">
          <TextReveal text="Let's Build" delay={0.2} inView={isInView} />
          <br />
          <TextReveal text="Something" delay={0.35} inView={isInView} />
          {' '}
          <TextReveal text="Great" delay={0.5} inView={isInView} gold />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="font-sans text-lg text-text-secondary leading-relaxed mb-10 max-w-md">
              Have a project in mind or want to collaborate? I'm always open to discussing new
              opportunities and ideas.
            </p>

            <div className="space-y-2">
              {contactLinks.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
                >
                  <MagneticButton strength={0.1}>
                    <a
                      href={item.href}
                      target={
                        item.href.startsWith('mailto') || item.href.startsWith('tel')
                          ? undefined
                          : '_blank'
                      }
                      rel="noopener noreferrer"
                      className="group flex items-center gap-5 py-4 px-4 -mx-4 border border-transparent hover:border-border/50 hover:bg-bg-card/50 rounded-xl transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-accent/[0.06] border border-accent/10 flex items-center justify-center text-text-muted group-hover:text-accent group-hover:border-accent/25 transition-all duration-300 shrink-0">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="block font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase mb-0.5">
                          {item.label}
                        </span>
                        <span className="block font-grotesk text-text-secondary group-hover:text-accent transition-colors duration-300 truncate">
                          {item.value}
                        </span>
                      </div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="text-text-muted/30 group-hover:text-accent transition-all group-hover:translate-x-1 duration-300 shrink-0"
                      >
                        <path d="M1 7H13M13 7L8 2M13 7L8 12" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </a>
                  </MagneticButton>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="p-6 md:p-8 border border-border/50 bg-bg-card/30 rounded-2xl">
              <form onSubmit={handleSubmit} className="space-y-7">
                {[
                  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="block font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase mb-2.5">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formState[field.name as keyof typeof formState]}
                      onChange={(e) =>
                        setFormState((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                      required
                      className="w-full bg-transparent border-b border-border/70 py-3.5 font-sans text-base text-text-primary placeholder:text-text-muted/25 focus:border-accent/50 focus:outline-none transition-colors duration-300"
                    />
                  </div>
                ))}

                <div>
                  <label className="block font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase mb-2.5">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-border/70 py-3.5 font-sans text-base text-text-primary placeholder:text-text-muted/25 focus:border-accent/50 focus:outline-none transition-colors duration-300 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitted}
                  className="group w-full inline-flex items-center justify-center gap-3 bg-accent text-[var(--text-on-accent)] px-8 py-4 font-grotesk text-sm font-semibold tracking-wide rounded-xl hover:bg-accent-light transition-all duration-300 disabled:opacity-60 hover:shadow-[0_0_40px_rgb(var(--c-accent)/0.2)]"
                >
                  {isSubmitted ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8L7 12L13 4" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        <path
                          d="M1 7H13M13 7L8 2M13 7L8 12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Available for work banner */}
        <motion.div
          className="mt-20 relative overflow-hidden rounded-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.06] via-bg-card to-bg-card" />
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <div className="relative p-8 md:p-10 border border-accent/10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase">
                    Available for Projects
                  </span>
                </div>
                <p className="font-grotesk text-base sm:text-xl text-text-primary font-semibold">
                  Currently pursuing Master's — open to part-time or contract work
                </p>
                <p className="mt-1.5 font-sans text-sm text-text-muted flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-accent/40">
                    <circle cx="6" cy="5" r="3" stroke="currentColor" strokeWidth="1" />
                    <path d="M6 8V11" stroke="currentColor" strokeWidth="1" />
                    <path d="M4 11H8" stroke="currentColor" strokeWidth="1" />
                  </svg>
                  Based in Sydney, Australia · Remote-friendly
                </p>
              </div>
              <MagneticButton>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="group shrink-0 inline-flex items-center gap-3 bg-accent text-[var(--text-on-accent)] px-7 py-3.5 font-grotesk text-sm font-semibold tracking-wide rounded-full hover:bg-accent-light transition-all duration-300 hover:shadow-[0_0_30px_rgb(var(--c-accent)/0.25)]"
                >
                  Get in Touch
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  >
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </a>
              </MagneticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
