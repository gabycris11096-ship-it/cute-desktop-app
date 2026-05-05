import { motion } from 'framer-motion'
import { Heart, Star, Sparkles } from 'lucide-react'
import FloatingElement from './FloatingElement'

interface WelcomeScreenProps {
  onEnter: () => void
}

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps): React.JSX.Element => (
  <motion.div
    key="welcome"
    initial={{ opacity: 1 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.5 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 1
    }}
  >
    <FloatingElement x="5%" y="15%">
      <Heart fill="currentColor" size={32} />
    </FloatingElement>
    <FloatingElement x="85%" y="10%" delay={1}>
      <Star fill="currentColor" size={40} />
    </FloatingElement>
    <FloatingElement x="15%" y="75%" delay={2}>
      <Heart fill="currentColor" size={24} />
    </FloatingElement>
    <FloatingElement x="80%" y="80%" delay={0.5}>
      <Star fill="currentColor" size={48} />
    </FloatingElement>

    <motion.div
      className="card"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <motion.div
        animate={{ rotate: [0, 5, -5, 0], y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ marginBottom: '1.5rem', display: 'inline-block' }}
      >
        <img 
          src={new URL('../../../resources/icon.png', import.meta.url).href} 
          alt="Cute QA Logo" 
          style={{ width: '120px', height: '120px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-cute)', border: '4px solid var(--app-primary)' }} 
        />
      </motion.div>

      <h1 className="title">Hello, beautiful!</h1>
      <p className="subtitle">
        Tu escritorio ahora es mucho más tierno. Cada interacción es un poquito de magia para tu
        día.
      </p>

      <motion.button
        className="button-primary"
        whileHover={{ scale: 1.1, backgroundColor: 'var(--app-secondary)' }}
        whileTap={{ scale: 0.9 }}
        onClick={onEnter}
      >
        ¡Reparte Amor!
      </motion.button>
    </motion.div>
  </motion.div>
)

export default WelcomeScreen
