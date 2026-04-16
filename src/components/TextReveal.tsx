import { motion } from 'framer-motion'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  inView?: boolean
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  inView = true,
}: TextRevealProps) {
  const words = text.split(' ')

  return (
    <span className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 2 }}
            animate={inView ? { y: 0, rotate: 0 } : { y: '110%', rotate: 2 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.04,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
