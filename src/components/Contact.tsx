import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Linkedin, Github, ArrowRight, Send, CheckCircle2 } from 'lucide-react'
import { personalInfo } from '@/data'

const links = [
  { icon: Mail, label: 'Email', value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: '#00e5ff' },
  { icon: Phone, label: 'Phone', value: personalInfo.phone, href: `tel:${personalInfo.phone}`, color: '#34d399' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/munjalnyk', href: personalInfo.linkedin, color: '#60a5fa' },
  { icon: Github, label: 'GitHub', value: 'github.com/yorocoboy1', href: personalInfo.github, color: '#a78bfa' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((r) => setTimeout(r, 900))
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contact" className="relative py-28">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full blur-[120px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-6">
        <motion.div
          className="flex items-center gap-3 mb-4"
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="font-mono text-xs text-[#00e5ff] tracking-[0.15em] uppercase">05 — Contact</span>
          <div className="w-16 h-px bg-white/[0.07]" />
        </motion.div>

        <motion.div
          className="mb-14 max-w-xl"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">
            Let's build something{' '}
            <span style={{
              background: 'linear-gradient(120deg, #ffffff 0%, #00e5ff 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              remarkable.
            </span>
          </h2>
          <p className="text-white/35 text-sm leading-relaxed">
            Open to new opportunities, collaborations, or just a good conversation about embedded systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_420px] gap-6 items-start">
          {/* Left: contact links */}
          <motion.div
            className="grid sm:grid-cols-2 gap-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3.5 p-5 rounded-2xl border border-white/[0.06] bg-[#0d0d16] transition-all duration-300"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -3, borderColor: `${link.color}25` }}
              >
                <div
                  className="w-9 h-9 rounded-xl border flex-shrink-0 flex items-center justify-center"
                  style={{ background: `${link.color}10`, borderColor: `${link.color}20`, color: link.color }}
                >
                  <link.icon size={15} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] text-white/25 font-medium uppercase tracking-wider mb-0.5">{link.label}</p>
                  <p className="text-sm font-medium text-white/60 truncate group-hover:text-white transition-colors">{link.value}</p>
                </div>
                <ArrowRight size={12} className="flex-shrink-0 self-center text-white/15 group-hover:text-[#00e5ff] group-hover:translate-x-0.5 transition-all duration-200 mt-0.5" />
              </motion.a>
            ))}

            {/* CTA banner */}
            <motion.div
              className="sm:col-span-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl border border-[#00e5ff]/15 bg-[#00e5ff]/[0.03]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32 }}
              whileHover={{ borderColor: 'rgba(0,229,255,0.22)' }}
            >
              <div>
                <p className="text-sm font-semibold text-white/70">Available for projects</p>
                <p className="text-xs text-white/30 mt-0.5">Currently pursuing Master's · open to part-time or contract</p>
              </div>
              <motion.a
                href={`mailto:${personalInfo.email}`}
                className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00e5ff] text-[#080810] font-semibold text-xs hover:bg-white transition-colors"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                Get in touch <ArrowRight size={11} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            className="rounded-2xl border border-white/[0.06] bg-[#0d0d16] p-7"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {sent ? (
              <motion.div
                className="flex flex-col items-center justify-center py-10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="w-14 h-14 rounded-full bg-[#00e5ff]/[0.08] border border-[#00e5ff]/20 flex items-center justify-center mb-4">
                  <CheckCircle2 size={22} className="text-[#00e5ff]" />
                </div>
                <p className="font-semibold text-white/70 mb-1">Message sent!</p>
                <p className="text-xs text-white/30">I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <p className="text-sm font-semibold text-white/60 mb-5">Send a message</p>
                {[
                  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map((f) => (
                  <div key={f.name}>
                    <label className="block text-[10px] text-white/25 font-medium uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input
                      type={f.type}
                      name={f.name}
                      value={form[f.name as keyof typeof form]}
                      onChange={onChange}
                      placeholder={f.placeholder}
                      required
                      className="w-full bg-[#080810] rounded-xl border border-white/[0.07] px-4 py-2.5 text-sm text-white/70 placeholder:text-white/15 focus:outline-none focus:border-[#00e5ff]/30 transition-colors"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] text-white/25 font-medium uppercase tracking-wider mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={4}
                    className="w-full bg-[#080810] rounded-xl border border-white/[0.07] px-4 py-2.5 text-sm text-white/70 placeholder:text-white/15 focus:outline-none focus:border-[#00e5ff]/30 transition-colors resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#00e5ff] text-[#080810] font-semibold text-sm hover:bg-white transition-colors disabled:opacity-50"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {sending
                    ? <span className="w-4 h-4 border-2 border-[#080810]/30 border-t-[#080810] rounded-full animate-spin" />
                    : <><Send size={13} /> Send Message</>
                  }
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
