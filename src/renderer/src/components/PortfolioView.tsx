import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Briefcase, ExternalLink, Edit2, Save, Plus, Trash2 } from 'lucide-react'

export interface PortfolioItem {
  id?: number
  seccion: string
  proyecto: string
  herramienta: string
  ejemplo: string
  resultado: string
}

interface PortfolioViewProps {
  portfolioData: PortfolioItem[]
  isEditing: boolean
  onBack: () => void
  onToggleEdit: () => void
  onSave: () => void
  onAddItem: () => void
  onDeleteItem: (id: number) => void
  onExport: () => void
  onChangeItem: (index: number, updatedItem: Partial<PortfolioItem>) => void
}

const PortfolioView = ({
  portfolioData,
  isEditing,
  onBack,
  onToggleEdit,
  onSave,
  onAddItem,
  onDeleteItem,
  onExport,
  onChangeItem
}: PortfolioViewProps): React.JSX.Element => {
  return (
    <motion.div
      key="portfolio-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={onBack}
            style={{ color: 'var(--app-primary)', display: 'flex', alignItems: 'center' }}
          >
            <ArrowLeft size={32} />
          </motion.button>
          <h2 style={{ fontSize: '2rem', color: 'var(--app-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Portafolio QA <Briefcase size={28} color="var(--app-primary)" />
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {isEditing && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onAddItem}
              style={{
                background: 'var(--color-blue)',
                color: 'white',
                padding: '0.6rem 1.2rem',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: '0 4px 0 rgba(0,0,0,0.1)'
              }}
            >
              <Plus size={18} /> Agregar Fila
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={isEditing ? onSave : onToggleEdit}
            style={{
              background: isEditing ? 'var(--color-green)' : 'var(--app-primary)',
              color: 'white',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 4px 0 rgba(0,0,0,0.1)'
            }}
          >
            {isEditing ? <><Save size={18} /> Guardar</> : <><Edit2 size={18} /> Editar</>}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onExport}
            style={{
              background: 'white',
              color: 'var(--app-primary)',
              border: '2px solid var(--app-primary)',
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              boxShadow: '0 4px 0 rgba(0,0,0,0.05)'
            }}
          >
            <ExternalLink size={18} /> Exportar
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: 'var(--app-card-bg, white)', padding: '1rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-cute)', border: '3px solid var(--app-primary)', display: 'flex', flexDirection: 'column', gap: '0.8rem', overflowY: 'hidden', flex: 1, paddingRight: '0.8rem' }}>
        {/* Table wrapper for horizontal scrolling — Vertical scroll disabled as requested */}

        {/* Table wrapper for horizontal scrolling */}
        <div style={{ overflowX: 'auto', borderRadius: 'var(--radius-md)', border: '2px solid var(--app-primary)' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: `minmax(120px, 1fr) minmax(140px, 1fr) minmax(100px, 1fr) minmax(250px, 2fr) minmax(120px, 1fr)${isEditing ? ' 50px' : ''}`,
            gap: '1px',
            background: 'var(--app-primary)',
            minWidth: '850px'
          }}>
          {/* Header row */}
          <div style={{ display: 'contents', fontWeight: 'bold' }}>
            {['Sección', 'Proyecto', 'Herramienta', 'Ejemplo Documentado', 'Resultado'].map((header, i) => (
              <div key={i} style={{ background: 'var(--app-primary)', color: 'white', padding: '0.6rem 0.8rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {header}
              </div>
            ))}
            {isEditing && <div style={{ background: 'var(--app-primary)' }} />}
          </div>

          {/* Data rows */}
          <AnimatePresence>
            {portfolioData.map((row, idx) => (
              <motion.div 
                key={row.id || idx} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ display: 'contents' }}
              >
                <div style={{ background: idx % 2 === 0 ? 'var(--app-card-bg, white)' : 'var(--app-bg-soft, var(--color-bg))', padding: '0.6rem 0.8rem', color: 'var(--app-text, var(--color-text))', fontWeight: 700, fontSize: '0.85rem' }}>
                  {isEditing ? (
                    <input value={row.seccion} onChange={e => onChangeItem(idx, { seccion: e.target.value })} style={{ width: '100%', padding: '0.3rem', border: '1px solid var(--color-pink)', borderRadius: '4px', fontSize: '0.85rem' }} />
                  ) : row.seccion}
                </div>
                <div style={{ background: idx % 2 === 0 ? 'var(--app-card-bg)' : 'var(--app-bg-soft)', padding: '0.6rem 0.8rem', color: 'var(--app-text-muted)', fontSize: '0.8rem' }}>
                  {isEditing ? (
                    <input value={row.proyecto} onChange={e => onChangeItem(idx, { proyecto: e.target.value })} style={{ width: '100%', padding: '0.3rem', border: '1px solid var(--color-pink)', borderRadius: '4px', fontSize: '0.8rem' }} />
                  ) : row.proyecto}
                </div>
                <div style={{ background: idx % 2 === 0 ? 'var(--app-card-bg)' : 'var(--app-bg-soft)', padding: '0.6rem 0.8rem', color: 'var(--app-text)' }}>
                  {isEditing ? (
                    <input value={row.herramienta} onChange={e => onChangeItem(idx, { herramienta: e.target.value })} style={{ width: '100%', padding: '0.3rem', border: '1px solid var(--app-primary)', borderRadius: '4px', fontSize: '0.8rem' }} />
                  ) : (
                    <span style={{ background: 'var(--app-primary)', color: 'white', padding: '0.15rem 0.5rem', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 600 }}>
                      {row.herramienta}
                    </span>
                  )}
                </div>
                <div style={{ background: idx % 2 === 0 ? 'var(--app-card-bg)' : 'var(--app-bg-soft)', padding: '0.6rem 0.8rem', color: 'var(--app-text-muted)', fontSize: '0.8rem', lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
                  {isEditing ? (
                    <textarea value={row.ejemplo} onChange={e => onChangeItem(idx, { ejemplo: e.target.value })} style={{ width: '100%', minHeight: '60px', padding: '0.3rem', border: '1px solid var(--color-pink)', borderRadius: '4px', resize: 'vertical', fontSize: '0.8rem' }} />
                  ) : row.ejemplo}
                </div>
                <div style={{ background: idx % 2 === 0 ? 'var(--app-card-bg)' : 'var(--app-bg-soft)', padding: '0.6rem 0.8rem', color: row.resultado?.includes('Correcto') || row.resultado?.includes('éxito') ? 'var(--color-green)' : 'var(--app-text)', fontWeight: 600, fontSize: '0.8rem' }}>
                  {isEditing ? (
                    <input value={row.resultado} onChange={e => onChangeItem(idx, { resultado: e.target.value })} style={{ width: '100%', padding: '0.3rem', border: '1px solid var(--color-pink)', borderRadius: '4px', fontSize: '0.8rem' }} />
                  ) : row.resultado}
                </div>
                {isEditing && (
                  <div style={{ background: idx % 2 === 0 ? 'var(--app-card-bg)' : 'var(--app-bg-soft)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <motion.button
                      whileHover={{ scale: 1.2, color: 'red' }}
                      onClick={() => row.id && onDeleteItem(row.id)}
                      style={{ color: 'var(--app-primary)' }}
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          </div>
        </div>

        {/* Suggestion block removed to avoid scrolling */}
      </div>
    </motion.div>
  )
}

export default PortfolioView
