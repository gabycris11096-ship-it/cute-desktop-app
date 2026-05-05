import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export interface Sugerencia {
  id: number
  emoji: string
  texto: string
  completado: boolean
}

interface SugerenciaCardProps {
  item: Sugerencia
  onToggle: () => void
}

const SugerenciaCard = ({ item, onToggle }: SugerenciaCardProps): React.JSX.Element => (
  <motion.div
    layout
    whileHover={{ x: 4, scale: 1.01 }}
    onClick={onToggle}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      background: item.completado ? 'var(--color-green)' : 'var(--app-card-bg, white)',
      borderRadius: 'var(--radius-md)',
      padding: '0.6rem 1rem',
      boxShadow: 'var(--shadow-cute)',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      borderLeft: `5px solid ${item.completado ? 'white' : 'var(--color-amber)'}`
    }}
  >
    {/* Emoji */}
    <span style={{ fontSize: '1.3rem', lineHeight: 1, flexShrink: 0 }}>{item.emoji}</span>

    {/* Text */}
    <p style={{
      flex: 1,
      fontSize: '0.85rem',
      fontWeight: 600,
      color: item.completado ? 'white' : 'var(--app-text)',
      lineHeight: '1.4',
      textDecoration: item.completado ? 'line-through' : 'none',
      opacity: item.completado ? 0.9 : 1
    }}>
      {item.texto}
    </p>

    {/* Check badge */}
    {item.completado ? (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{ flexShrink: 0 }}
      >
        <Check size={22} color="white" strokeWidth={3} />
      </motion.div>
    ) : (
      <div style={{
        width: 22,
        height: 22,
        borderRadius: '50%',
        border: '2px solid var(--color-amber)',
        flexShrink: 0
      }} />
    )}
  </motion.div>
)

export default SugerenciaCard
