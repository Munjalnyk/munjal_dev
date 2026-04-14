import { motion } from 'framer-motion'

export default function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
    >
      <motion.div className="relative flex flex-col items-center">
        {/* Initials */}
        <motion.span
          className="font-display text-5xl md:text-7xl font-bold tracking-[0.15em] text-text-primary"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        >
          MN
        </motion.span>

        {/* Gold line */}
        <motion.div
          className="mt-5 h-[1px] bg-accent"
          initial={{ width: 0 }}
          animate={{ width: 80 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
        />

        {/* Loading text */}
        <motion.span
          className="mt-5 font-mono text-[10px] tracking-[0.35em] uppercase text-text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.3 }}
        >
          Loading
        </motion.span>

        {/* Progress dots */}
        <div className="mt-4 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-1 w-1 rounded-full bg-accent"
              initial={{ opacity: 0.2 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: 1.5 + i * 0.15,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
