import { motion } from 'framer-motion'

interface FloatingElementProps {
  children: React.ReactNode
  delay?: number
  duration?: number
  x?: string
  y?: string
}

const FloatingElement = ({
  children,
  delay = 0,
  duration = 4,
  x = '10%',
  y = '10%'
}: FloatingElementProps): React.JSX.Element => (
  <motion.div
    className="floating-icon"
    style={{
      top: y,
      left: x,
      color: 'var(--app-primary)',
      pointerEvents: 'none',
      position: 'absolute'
    }}
    initial={{ opacity: 0, scale: 0 }}
    animate={{
      opacity: [0, 0.8, 0],
      scale: [0.5, 1.2, 0.5],
      y: [0, -40, 0],
      rotate: [0, 20, -20, 0]
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: 'easeInOut'
    }}
  >
    {children}
  </motion.div>
)

export default FloatingElement
