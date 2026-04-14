import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { personalInfo } from '@/data'
import TextReveal from './TextReveal'
import MagneticButton from './MagneticButton'

const contactLinks = [
  { label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}` },
  { label: 'LinkedIn', value: 'linkedin.com/in/munjalnyk', href: personalInfo.linkedin },
  { label: 'GitHub', value: 'github.com/yorocoboy1', href: personalInfo.github },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-accent">
            05 / Contact
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
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-16 leading-tight">
          <TextReveal text="Let's Build" delay={0.2} />
          <br />
          <TextReveal text="Something" delay={0.35} />
          <span className="text-gradient-gold">
            {' '}
            <TextReveal text="Great" delay={0.5} />
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
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

            <div className="space-y-1">
              {contactLinks.map((item) => (
                <MagneticButton key={item.label} strength={0.1}>
                  <a
                    href={item.href}
                    target={
                      item.href.startsWith('mailto') || item.href.startsWith('tel')
                        ? undefined
                        : '_blank'
                    }
                    rel="noopener noreferrer"
                    className="group flex items-center gap-6 py-3.5 border-b border-border/50 hover:border-accent/20 transition-all duration-300"
                  >
                    <span className="font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase w-16 shrink-0">
                      {item.label}
                    </span>
                    <span className="font-grotesk text-text-secondary group-hover:text-accent transition-colors duration-300">
                      {item.value}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      className="ml-auto text-text-muted group-hover:text-accent transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-300"
                    >
                      <path
                        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {[
                { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase mb-3">
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
                    className="w-full bg-transparent border-b border-border py-3 font-sans text-text-primary placeholder:text-text-muted/30 focus:border-accent/50 focus:outline-none transition-colors duration-300"
                  />
                </div>
              ))}

              <div>
                <label className="block font-mono text-[10px] text-text-muted tracking-[0.2em] uppercase mb-3">
                  Message
                </label>
                <textarea
                  placeholder="Tell me about your project..."
                  value={formState.message}
                  onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-border py-3 font-sans text-text-primary placeholder:text-text-muted/30 focus:border-accent/50 focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="group inline-flex items-center gap-3 bg-accent text-[#050505] px-8 py-4 font-grotesk text-sm font-semibold tracking-wide rounded-full hover:bg-accent-light transition-all duration-300 disabled:opacity-60"
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
