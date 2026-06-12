import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

interface Tilt3DProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  glare?: boolean
  scale?: number
  perspective?: number
}

export default function Tilt3D({
  children,
  className = '',
  intensity = 8,
  glare = true,
  scale = 1.02,
  perspective = 800,
}: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const glareX = useMotionValue(50)
  const glareY = useMotionValue(50)

  const springConfig = { stiffness: 260, damping: 20 }
  const sRotateX = useSpring(rotateX, springConfig)
  const sRotateY = useSpring(rotateY, springConfig)

  const glareGradient = useMotionTemplate`radial-gradient(ellipse at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 80%)`

  const onMove = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') return
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      rotateX.set((0.5 - y) * intensity)
      rotateY.set((x - 0.5) * intensity)
      glareX.set(x * 100)
      glareY.set(y * 100)
    },
    [intensity, rotateX, rotateY, glareX, glareY]
  )

  const onEnter = useCallback(
    (e: React.PointerEvent) => {
      if (e.pointerType === 'touch') return
      setHovered(true)
    },
    []
  )

  const onLeave = useCallback(() => {
    setHovered(false)
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective }}
      onPointerMove={onMove}
      onPointerEnter={onEnter}
      onPointerLeave={onLeave}
    >
      <motion.div
        className="relative"
        style={{
          rotateX: sRotateX,
          rotateY: sRotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{ scale: hovered ? scale : 1 }}
        transition={{ scale: { type: 'spring', stiffness: 260, damping: 20 } }}
      >
        {children}
        {glare && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]"
            style={{ background: glareGradient }}
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>
    </div>
  )
}
