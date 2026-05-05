import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Star, Sparkles, Rocket, Sun, Trophy, Medal, Gift, Briefcase, Moon, Lightbulb } from 'lucide-react'
import logo from '../assets/logo.png'

interface DashboardProps {
  userName?: string
  progress: Record<string, number>
  currentTheme: string
  onSelectFase: (fase: string) => void
}

const tips = [
  "Un buen Bug Report tiene pasos claros, resultados esperados y observados. 🐞",
  "¡No asumas nada! Si tienes dudas, pregunta al equipo. La comunicación es clave. 💬",
  "El Testing de Regresión es tu mejor amigo después de cada cambio importante. 🔄",
  "Calidad no es actuar después del error, es prevenir que ocurra. ✨",
  "¡Prioriza! No todos los bugs tienen el mismo impacto en el usuario. ⚖️",
  "Documentar tus pruebas hoy te ahorrará dolores de cabeza mañana. 📝",
  "¡Recuerda hidratarte! Una mente fresca encuentra mejores bugs. 💧",
  "Explorar la app como un usuario real ayuda a encontrar errores lógicos. 🕵️‍♀️",
  "La automatización es poderosa, pero el ojo humano es insustituible. 👀",
  "¡Felicidades por estudiar hoy! Estás un paso más cerca de tu meta. 🌟"
]

const Dashboard = ({ userName = 'mágica', progress, currentTheme, onSelectFase }: DashboardProps): React.JSX.Element => {
  const [randomTip] = useState(() => tips[Math.floor(Math.random() * tips.length)])
  const isDark = currentTheme === 'theme-dark'
  const renderProgress = (fase: string, color: string): React.JSX.Element => {
    const val = progress[fase] || 0
    return (
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'var(--app-bg-soft, var(--color-bg))', padding: '0.5rem', borderRadius: 'var(--radius-sm)' }}>
        <div className="progress-container">
          <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: `${val}%` }}
            style={{ backgroundColor: color } as React.CSSProperties}
          />
        </div>
        <span className="progress-text font-candy" style={{ color }}>{val}% completado</span>
      </div>
    )
  }

  return (
    <motion.div
      key="dashboard-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
    >
      {/* Welcome Banner */}
      <div className="dashboard-banner">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem' }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                {isDark ? <Moon size={40} color="var(--app-accent)" /> : <Sun size={40} color="var(--color-yellow)" />}
                <h2 style={{ fontSize: '2rem', fontWeight: 900, margin: 0 }}>{isDark ? '¡Buenas noches,' : '¡Buen día,'} {userName.split(' ')[0]}!</h2>
              </div>
              <p style={{ fontSize: '1rem', opacity: 0.95, fontWeight: 600 }}>
                Hoy es un día perfecto para aprender algo nuevo. ¿Qué aventura elegimos hoy?
              </p>
            </div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <img 
                src={logo} 
                alt="App Logo" 
                style={{ width: '100px', height: '100px', borderRadius: 'var(--radius-lg)', border: '4px solid white', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }} 
              />
            </motion.div>
          </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ position: 'absolute', right: '-30px', bottom: '-30px', opacity: 0.2 }}
        >
          <Sparkles size={180} color="white" />
        </motion.div>
      </div>

        {/* Magic Tip Bubble */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring" }}
          style={{ 
            marginTop: '-1rem', 
            marginBottom: '1rem',
            background: 'var(--app-card-bg)', 
            padding: '0.8rem 1.2rem', 
            borderRadius: '20px 20px 20px 5px', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            border: '2px solid var(--app-primary)',
            color: 'var(--app-text)',
            fontSize: '0.95rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            width: 'fit-content',
            maxWidth: '90%',
            position: 'relative'
          }}
        >
          <Lightbulb size={20} color="var(--app-primary)" />
          <span>{randomTip}</span>
          {/* Pequeño triángulo del globo */}
          <div style={{ 
            position: 'absolute', 
            bottom: '-10px', 
            left: '10px', 
            width: 0, 
            height: 0, 
            borderLeft: '10px solid transparent',
            borderRight: '10px solid transparent',
            borderTop: '10px solid var(--app-primary)'
          }} />
        </motion.div>
      <div
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.2rem' }}
      >
        <motion.div
          className="phase-card"
          style={{ '--card-accent': 'var(--color-pink)' } as React.CSSProperties}
          onClick={() => onSelectFase('fase1')}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <Heart size={40} color="var(--color-pink)" fill="var(--color-pink)" />
          </motion.div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--app-text)' }}>Fase 1</h3>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
              Introducción al QA
            </p>
            {renderProgress('fase1', 'var(--color-pink)')}
          </div>
        </motion.div>

        <motion.div
          className="phase-card"
          style={{ '--card-accent': 'var(--color-orange)' } as React.CSSProperties}
          onClick={() => onSelectFase('fase2')}
        >
          <motion.div
            animate={{ y: [0, -8, 0], x: [0, 2, -2, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Rocket size={40} color="var(--color-orange)" />
          </motion.div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--app-text)' }}>Fase 2</h3>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
              Jira y Scrum
            </p>
            {renderProgress('fase2', 'var(--color-orange)')}
          </div>
        </motion.div>

        <motion.div
          className="phase-card"
          style={{ '--card-accent': 'var(--color-teal)' } as React.CSSProperties}
          onClick={() => onSelectFase('fase3')}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
          >
            <Star size={40} color="var(--color-teal)" fill="var(--color-teal)" fillOpacity={0.2} />
          </motion.div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--app-text)' }}>Fase 3</h3>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
              Automatización
            </p>
            {renderProgress('fase3', 'var(--color-teal)')}
          </div>
        </motion.div>

        <motion.div
          className="phase-card"
          style={{ '--card-accent': 'var(--color-indigo)' } as React.CSSProperties}
          onClick={() => onSelectFase('fase4')}
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
          >
            <Trophy size={40} color="var(--color-indigo)" />
          </motion.div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--app-text)' }}>Fase 4</h3>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
              Experiencia Real
            </p>
            {renderProgress('fase4', 'var(--color-indigo)')}
          </div>
        </motion.div>

        <motion.div
          className="phase-card"
          style={{ '--card-accent': 'var(--color-amber)' } as React.CSSProperties}
          onClick={() => onSelectFase('fase5')}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
          >
            <Medal size={40} color="var(--color-amber)" />
          </motion.div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--app-text)' }}>Fase 5</h3>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
              Certificación
            </p>
            {renderProgress('fase5', 'var(--color-amber)')}
          </div>
        </motion.div>

        <motion.div
          className="phase-card"
          style={{ '--card-accent': 'var(--color-fuchsia)' } as React.CSSProperties}
          onClick={() => onSelectFase('fase6')}
        >
          <motion.div
            animate={{ rotate: [0, -5, 5, -5, 0], scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <Gift size={40} color="var(--color-fuchsia)" />
          </motion.div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--app-text)' }}>Extra</h3>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
              Más Sugerencias
            </p>
            {renderProgress('fase6', 'var(--color-fuchsia)')}
          </div>
        </motion.div>

        <motion.div
          className="phase-card"
          style={{ '--card-accent': 'var(--app-primary)' } as React.CSSProperties}
          onClick={() => onSelectFase('portfolio')}
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            <Briefcase size={40} color="var(--app-primary)" />
          </motion.div>
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--app-text)' }}>Portafolio</h3>
            <p style={{ margin: '0.5rem 0 0', color: 'var(--app-text-muted)', fontSize: '0.9rem' }}>
              Mis Proyectos QA
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard
