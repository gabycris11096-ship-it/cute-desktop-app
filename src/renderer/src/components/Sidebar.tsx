import { motion } from 'framer-motion'
import { Home, Settings, User, Bell, Coffee, Book, Bug, Ghost, Skull, Moon, Flame, Zap, Wand2 } from 'lucide-react'

interface SidebarProps {
  activeView: string
  currentTheme: string
  onChangeView: (view: string) => void
}

const Sidebar = ({ activeView, currentTheme, onChangeView }: SidebarProps): React.JSX.Element => {
  const isDark = currentTheme === 'theme-dark'

  return (
    <div
      style={{
      width: '90px',
      background: 'var(--app-card-bg, white)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-cute)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '2rem 0',
      gap: '2.5rem',
      border: '4px solid var(--app-border)',
      position: 'relative',
      zIndex: 2
    }}
  >
    <motion.button
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      style={{
        color: activeView === 'dashboard' ? 'var(--app-primary)' : 'var(--color-text-muted)',
        position: 'relative'
      }}
      onClick={() => onChangeView('dashboard')}
    >
      <motion.div
        animate={{ y: [0, -3, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        {isDark ? <Ghost size={32} /> : <Home size={32} />}
      </motion.div>
      {activeView === 'dashboard' && (
        <motion.div
          layoutId="active-indicator"
          style={{
            position: 'absolute',
            bottom: -10,
            left: '50%',
            x: '-50%',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--app-primary)'
          }}
        />
      )}
    </motion.button>

    <motion.button 
      whileHover={{ scale: 1.2 }} 
      style={{ color: activeView === 'profile' ? 'var(--app-primary)' : 'var(--color-text-muted)' }}
      onClick={() => onChangeView('profile')}
    >
      <motion.div
        animate={{ rotate: [0, -5, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
      >
        {isDark ? <Skull size={32} /> : <User size={32} />}
      </motion.div>
    </motion.button>
    <motion.button 
      whileHover={{ scale: 1.2 }} 
      style={{ color: activeView === 'reminders' ? 'var(--app-primary)' : 'var(--color-text-muted)' }}
      onClick={() => onChangeView('reminders')}
    >
      <motion.div
        animate={{ rotate: [0, -15, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", repeatDelay: 1 }}
      >
        {isDark ? <Flame size={32} /> : <Bell size={32} />}
      </motion.div>
    </motion.button>
    <motion.button 
      whileHover={{ scale: 1.2 }} 
      style={{ color: activeView === 'pomodoro' ? 'var(--app-primary)' : 'var(--color-text-muted)' }}
      onClick={() => onChangeView('pomodoro')}
    >
      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        {isDark ? <Moon size={32} /> : <Coffee size={32} />}
      </motion.div>
    </motion.button>

    <motion.button 
      whileHover={{ scale: 1.2 }} 
      style={{ color: activeView === 'glossary' ? 'var(--app-primary)' : 'var(--color-text-muted)' }}
      onClick={() => onChangeView('glossary')}
    >
      <motion.div
        animate={{ rotateY: [0, 360] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", repeatDelay: 2 }}
      >
        {isDark ? <Wand2 size={32} /> : <Book size={32} />}
      </motion.div>
    </motion.button>

    <motion.button 
      whileHover={{ scale: 1.2 }} 
      style={{ color: activeView === 'bug-report' ? 'var(--app-primary)' : 'var(--color-text-muted)' }}
      onClick={() => onChangeView('bug-report')}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      >
        {isDark ? <Zap size={32} /> : <Bug size={32} />}
      </motion.div>
    </motion.button>

    <div style={{ flex: 1 }} />

    <motion.button
      whileHover={{ scale: 1.2, rotate: 90 }}
      style={{ color: activeView === 'settings' ? 'var(--app-primary)' : 'var(--color-text-muted)' }}
      onClick={() => onChangeView('settings')}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        <Settings size={32} />
      </motion.div>
    </motion.button>
  </div>
  )
}

export default Sidebar
