import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  once?: boolean
}

export default function TextReveal({
  text,
  className = '',
  delay = 0,
  once = true,
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-80px' })
  const words = text.split(' ')

  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', rotate: 2 }}
            animate={isInView ? { y: 0, rotate: 0 } : {}}
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
