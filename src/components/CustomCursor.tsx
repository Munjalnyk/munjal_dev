import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Smooth spring for the ring
  const springX = useSpring(mouseX, { stiffness: 200, damping: 25, mass: 0.5 })
  const springY = useSpring(mouseY, { stiffness: 200, damping: 25, mass: 0.5 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select')
      setHovered(!!isInteractive)
    }

    const handleMouseLeave = () => setVisible(false)
    const handleMouseEnter = () => setVisible(true)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [mouseX, mouseY, visible])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null
  }

  return (
    <>
      {/* Dot (instant follow) */}
      <motion.div
        className="cursor-dot"
        style={{
          left: mouseX,
          top: mouseY,
          opacity: visible ? 1 : 0,
        }}
        animate={{ scale: hovered ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Ring (spring follow) */}
      <motion.div
        className={`cursor-ring ${hovered ? 'hovered' : ''}`}
        style={{
          left: springX,
          top: springY,
          opacity: visible ? 1 : 0,
        }}
        animate={{
          scale: hovered ? 1 : 1,
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
