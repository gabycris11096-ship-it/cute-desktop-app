import { useState, useMemo } from 'react'
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

  const globalProgress = useMemo(() => {
    const values = Object.values(progress)
    if (values.length === 0) return 0
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
  }, [progress])

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
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1.5rem',
        height: '100%',
        overflowY: 'auto',
        paddingRight: '0.5rem',
        justifyContent: 'center',
        padding: '1rem' 
      }}
    >
      <div
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
          gap: '1.5rem',
          width: '100%'
        }}
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
            <h3 className="phase-title">Fase 1 – Fundamentos</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
              Fundamentos y QA Efectivo
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
            <h3 className="phase-title">Fase 2 – Bases sólidas</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
              De Cero a QA Engineer
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
            <h3 className="phase-title">Fase 3 – Automatización inicial</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
              Selenium / Cypress
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
            <h3 className="phase-title">Fase 4 – APIs y certificación</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
              Postman & ISTQB
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
            <h3 className="phase-title">Fase 5 – Inmersión Total</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
              Bootcamp Yuri Kanu
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
            <h3 className="phase-title">Fase 6 – Carrera y CV</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
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
            <h3 className="phase-title">Portafolio</h3>
            <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem' }}>
              Mis Proyectos QA
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default Dashboard
