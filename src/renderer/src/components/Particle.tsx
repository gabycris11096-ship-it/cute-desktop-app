import { motion } from 'framer-motion'

interface ParticleProps {
  color: string
}

const Particle = ({ color }: ParticleProps): React.JSX.Element => (
  <motion.div
    className="particle"
    style={{
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: Math.random() * 8 + 4 + 'px',
      height: Math.random() * 8 + 4 + 'px',
      background: color
    }}
    animate={{
      y: [0, -100],
      x: [0, (Math.random() - 0.5) * 50],
      opacity: [0, 0.6, 0],
      scale: [0, 1.5, 0]
    }}
    transition={{
      duration: Math.random() * 5 + 5,
      repeat: Infinity,
      ease: 'linear'
    }}
  />
)

export default Particle
