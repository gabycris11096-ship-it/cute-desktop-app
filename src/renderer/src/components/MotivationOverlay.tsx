import { AnimatePresence, motion } from 'framer-motion'

interface MotivationOverlayProps {
  message: string
}

const MotivationOverlay = ({ message }: MotivationOverlayProps): React.JSX.Element => (
  <AnimatePresence>
    {message && (
      <motion.div
        initial={{ opacity: 0, scale: 0.5, x: '-50%', y: '-50%' }}
        animate={{ opacity: 1, scale: 1.1, x: '-50%', y: '-50%' }}
        exit={{ opacity: 0, scale: 1.5, x: '-50%', y: '-50%' }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 2000,
          background:
            'radial-gradient(circle, var(--color-green) 0%, rgba(74, 222, 128, 0.8) 40%, transparent 75%)',
          color: 'white',
          padding: '8rem 10rem',
          fontWeight: 900,
          fontSize: '3rem',
          pointerEvents: 'none',
          textAlign: 'center',
          textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          whiteSpace: 'nowrap',
          fontFamily: '"Fredoka", sans-serif'
        }}
      >
        <motion.span
          animate={{
            rotate: [-3, 3, -3],
            scale: [1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          {message}
        </motion.span>
      </motion.div>
    )}
  </AnimatePresence>
)

export default MotivationOverlay
