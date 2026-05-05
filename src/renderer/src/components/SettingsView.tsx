import { motion } from 'framer-motion'
import { ArrowLeft, Settings, Palette, RotateCcw, ShieldAlert } from 'lucide-react'

interface SettingsViewProps {
  currentTheme: string
  onBack: () => void
  onSelectTheme: (theme: string) => void
  onResetData: () => void
}

const SettingsView = ({
  currentTheme,
  onBack,
  onSelectTheme,
  onResetData
}: SettingsViewProps): React.JSX.Element => {
  const themes = [
    { id: 'theme-lavender', name: 'Lavanda Sueño', color: '#d8b4fe' },
    { id: 'theme-blue', name: 'Azul Cielo', color: '#b0d0ff' },
    { id: 'theme-mint', name: 'Menta Fresca', color: '#99f6e4' },
    { id: 'theme-dark', name: 'Noche Oscura', color: '#1a1a2e' }
  ]

  return (
    <motion.div
      key="settings-view"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={onBack}
          style={{ color: 'var(--app-primary)', display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeft size={32} />
        </motion.button>
        <h2 style={{ fontSize: '2rem', color: 'var(--app-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Configuración <Settings size={28} color="var(--app-primary)" />
        </h2>
      </div>

      {/* Content */}
      <div style={{ 
        background: 'var(--app-card-bg, white)', 
        padding: '1.2rem', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-cute)', 
        border: '3px solid var(--app-primary)', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem', 
        overflowY: 'auto', 
        flex: 1 
      }}>
        
        {/* Theme Selection */}
        <section>
          <h3 style={{ color: 'var(--app-text)', fontSize: '1.3rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Palette size={22} color="var(--app-primary)" /> Personalización Visual
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
            {themes.map((theme) => (
              <motion.button
                key={theme.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelectTheme(theme.id)}
                style={{
                  padding: '1rem',
                  background: currentTheme === theme.id ? 'var(--app-bg-soft)' : 'var(--app-card-bg)',
                  border: `3px solid ${theme.color}`,
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: currentTheme === theme.id ? `0 0 15px ${theme.color}44` : 'none'
                }}
              >
                <div style={{ width: '40px', height: '40px', background: theme.color, borderRadius: '50%', border: '3px solid var(--app-card-bg)', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--app-text)' }}>{theme.name}</span>
                {currentTheme === theme.id && <span style={{ fontSize: '0.7rem', color: theme.color }}>Activo ✨</span>}
              </motion.button>
            ))}
          </div>
        </section>

        <hr style={{ border: 'none', borderTop: '2px dashed var(--color-blue)', opacity: 0.3 }} />

        {/* Data Management */}
        <section>
          <h3 style={{ color: 'var(--app-text)', fontSize: '1.3rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldAlert size={22} color="var(--color-pink)" /> Gestión de Datos
          </h3>
          <div style={{ background: 'var(--app-bg-soft)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-pink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: 0, color: 'var(--color-pink)', fontSize: '1.1rem' }}>Reiniciar Aplicación</h4>
              <p style={{ margin: '0.5rem 0 0', color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
                Esto borrará todo tu progreso, portafolio y perfil. **Acción irreversible.**
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, background: '#ff4d6d' }}
              whileTap={{ scale: 0.95 }}
              onClick={onResetData}
              style={{
                background: 'var(--color-pink)',
                color: 'white',
                padding: '0.8rem 1.5rem',
                borderRadius: 'var(--radius-full)',
                border: 'none',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={18} /> Reiniciar Todo
            </motion.button>
          </div>
        </section>

        {/* About / Info */}
        <section style={{ textAlign: 'center', marginTop: 'auto', padding: '1rem' }}>
          <p style={{ color: 'var(--app-text-muted)', fontSize: '0.85rem' }}>
            Cute QA Desktop App v1.1.0<br />
            Hecho con ✨ para testers mágicas.
          </p>
        </section>

      </div>
    </motion.div>
  )
}

export default SettingsView
