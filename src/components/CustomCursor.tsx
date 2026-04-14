import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springX = useSpring(cursorX, { stiffness: 300, damping: 28 })
  const springY = useSpring(cursorY, { stiffness: 300, damping: 28 })

  const handleEnter = useCallback(() => setIsHovering(true), [])
  const handleLeave = useCallback(() => setIsHovering(false), [])

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    setIsTouchDevice(isTouch)
    if (isTouch) return

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [isVisible, cursorX, cursorY])

  useEffect(() => {
    if (isTouchDevice) return

    const attach = () => {
      const els = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, [data-cursor-hover]'
      )
      els.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
    }

    attach()
    const observer = new MutationObserver(attach)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      const els = document.querySelectorAll(
        'a, button, [role="button"], input, textarea, [data-cursor-hover]'
      )
      els.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
    }
  }, [isTouchDevice, handleEnter, handleLeave])

  if (isTouchDevice) return null

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ scale: { duration: 0.2 }, opacity: { duration: 0.3 } }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[9999]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: isHovering ? 48 : 32,
          height: isHovering ? 48 : 32,
          opacity: isVisible ? 0.5 : 0,
          borderColor: isHovering
            ? 'rgba(200, 169, 110, 0.5)'
            : 'rgba(200, 169, 110, 0.2)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      />
    </>
  )
}
