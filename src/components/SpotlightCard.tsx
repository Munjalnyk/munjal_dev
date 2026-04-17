import { useRef, useState, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
}

export default function SpotlightCard({ children, className = '' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${(mousePos.y / (ref.current?.clientHeight || 1) - 0.5) * -4}deg) rotateY(${(mousePos.x / (ref.current?.clientWidth || 1) - 0.5) * 4}deg)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.15s ease-out',
      }}
    >
      {/* Spotlight gradient */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgb(var(--c-accent) / 0.06), transparent 50%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  )
}
