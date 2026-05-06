import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

export interface CronogramaItem {
  id: number
  dia: string
  tarea: string
  color: string
  completado: boolean
}

interface CronogramaCardProps {
  item: CronogramaItem
  isEditing: boolean
  onToggle: () => void
  onEditTask: (value: string) => void
  compact?: boolean
}

const CronogramaCard = ({
  item,
  isEditing,
  onToggle,
  onEditTask,
  compact = false
}: CronogramaCardProps): React.JSX.Element => (
  <motion.div
    key={item.id}
    whileHover={{ y: -5, scale: 1.02 }}
    onClick={() => !isEditing && onToggle()}
    style={{
      background: item.completado ? 'var(--color-green)' : 'var(--app-card-bg, white)',
      borderRadius: 'var(--radius-md)',
      padding: compact ? '0.6rem 0.8rem' : '1.2rem',
      border: `3px solid ${item.completado ? 'white' : item.color}`,
      borderBottom: `6px solid ${item.completado ? 'rgba(0,0,0,0.1)' : item.color}`,
      backgroundImage: item.completado ? 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 20%)' : 'none',
      boxShadow: 'var(--shadow-cute)',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.4rem',
      minHeight: compact ? '60px' : '100px',
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.3s ease'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontWeight: 800, fontSize: '0.7rem', color: item.completado ? 'white' : item.color, textTransform: 'uppercase' }}>
        {item.dia}
      </span>
      {item.completado && (
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
          <Heart size={16} color="white" fill="white" />
        </motion.div>
      )}
    </div>
    {isEditing ? (
      <textarea
        value={item.tarea}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => onEditTask(e.target.value)}
        style={{ flex: 1, border: 'none', fontSize: '0.8rem', color: 'var(--app-text)', background: 'var(--app-bg-soft)', borderRadius: '4px', padding: '4px', resize: 'none', fontFamily: 'inherit' }}
      />
    ) : (
      <p style={{ fontSize: '0.8rem', color: item.completado ? 'white' : 'var(--app-text)', lineHeight: '1.3', fontWeight: 600, textDecoration: item.completado ? 'line-through' : 'none', opacity: item.completado ? 0.9 : 1 }}>
        {item.tarea}
      </p>
    )}
  </motion.div>
)

export default CronogramaCard
