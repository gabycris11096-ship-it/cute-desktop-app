import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Coffee, Play, Pause, RotateCcw, Zap, Moon, Trophy } from 'lucide-react'

interface PomodoroViewProps {
  onBack: () => void
}

const PomodoroView = ({ onBack }: PomodoroViewProps): React.JSX.Element => {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [mode, setMode] = useState<'work' | 'short' | 'long' | 'marathon'>('work')

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          setIsActive(false)
          new Notification('¡Tiempo terminado! ✨', { body: mode === 'work' ? '¡Es hora de un descanso mágico!' : '¡A estudiar de nuevo!' })
        }
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isActive, minutes, seconds, mode])

  const toggleTimer = () => setIsActive(!isActive)

  const resetTimer = () => {
    setIsActive(false)
    if (mode === 'work') setMinutes(25)
    else if (mode === 'short') setMinutes(5)
    else if (mode === 'long') setMinutes(15)
    else setMinutes(120)
    setSeconds(0)
  }

  const changeMode = (newMode: 'work' | 'short' | 'long' | 'marathon') => {
    setMode(newMode)
    setIsActive(false)
    if (newMode === 'work') setMinutes(25)
    else if (newMode === 'short') setMinutes(5)
    else if (newMode === 'long') setMinutes(15)
    else setMinutes(120)
    setSeconds(0)
  }

  return (
    <motion.div
      key="pomodoro-view"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', alignItems: 'center' }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={onBack}
          style={{ color: 'var(--app-primary)', display: 'flex', alignItems: 'center' }}
        >
          <ArrowLeft size={32} />
        </motion.button>
        <h2 style={{ fontSize: '2rem', color: 'var(--app-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Pomodoro QA <Coffee size={28} color="var(--app-primary)" />
        </h2>
      </div>

      <div style={{ 
        background: 'var(--app-card-bg, white)', 
        padding: '1.5rem 2rem', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-cute)', 
        border: '3px solid var(--app-primary)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        gap: '1.5rem',
        width: '100%',
        maxWidth: '500px'
      }}>
        
        {/* Mode Selector */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--app-bg-soft)', padding: '0.4rem', borderRadius: 'var(--radius-full)', border: '1px solid var(--app-primary)' }}>
          <button 
            onClick={() => changeMode('work')}
            style={{ 
              padding: '0.6rem 1rem', 
              borderRadius: 'var(--radius-full)', 
              border: 'none', 
              background: mode === 'work' ? 'var(--color-green)' : 'transparent',
              color: mode === 'work' ? 'white' : 'var(--app-text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem'
            }}
          >
            <Zap size={14} /> 25m
          </button>
          <button 
            onClick={() => changeMode('short')}
            style={{ 
              padding: '0.6rem 1rem', 
              borderRadius: 'var(--radius-full)', 
              border: 'none', 
              background: mode === 'short' ? 'var(--color-green)' : 'transparent',
              color: mode === 'short' ? 'white' : 'var(--app-text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem'
            }}
          >
            <Coffee size={14} /> 5m
          </button>
          <button 
            onClick={() => changeMode('long')}
            style={{ 
              padding: '0.6rem 1rem', 
              borderRadius: 'var(--radius-full)', 
              border: 'none', 
              background: mode === 'long' ? 'var(--color-green)' : 'transparent',
              color: mode === 'long' ? 'white' : 'var(--app-text-muted)',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.8rem'
            }}
          >
            <Moon size={14} /> 15m
          </button>
          <button 
            onClick={() => changeMode('marathon')}
            style={{ 
              padding: '0.6rem 1.2rem', 
              borderRadius: 'var(--radius-full)', 
              border: 'none', 
              background: mode === 'marathon' ? 'var(--app-primary)' : 'transparent',
              color: mode === 'marathon' ? 'white' : 'var(--app-text-muted)',
              fontWeight: 800,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8rem'
            }}
          >
            <Trophy size={14} /> 2h
          </button>
        </div>

        {/* Timer Display */}
        <div style={{ position: 'relative', width: '250px', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }} width="250" height="250">
            <circle
              cx="125"
              cy="125"
              r="115"
              fill="none"
              stroke="#f0fdf4"
              strokeWidth="10"
            />
            <motion.circle
              cx="125"
              cy="125"
              r="115"
              fill="none"
              stroke="var(--app-primary)"
              strokeWidth="10"
              strokeDasharray="722.5"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 722.5 - (722.5 * (minutes * 60 + seconds)) / (mode === 'work' ? 1500 : mode === 'short' ? 300 : mode === 'long' ? 900 : 7200) }}
              strokeLinecap="round"
            />
          </svg>
          <div style={{ textAlign: 'center', zIndex: 2 }}>
            <span style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--app-text)', display: 'block', lineHeight: 1 }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span style={{ fontSize: '1rem', color: 'var(--app-text-muted)', fontWeight: 600 }}>
              {mode === 'work' || mode === 'marathon' ? '¡Enfocada! 🚀' : '¡Respira! ✨'}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetTimer}
            style={{ background: 'var(--app-bg-soft)', color: 'var(--app-text-muted)', padding: '1rem', borderRadius: '50%', border: 'none', cursor: 'pointer' }}
          >
            <RotateCcw size={24} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTimer}
            style={{ 
              background: 'var(--app-primary)', 
              color: 'white', 
              padding: '1.2rem 3rem', 
              borderRadius: 'var(--radius-full)', 
              border: 'none', 
              fontSize: '1.2rem', 
              fontWeight: 800, 
              cursor: 'pointer',
              boxShadow: '0 8px 0 rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem'
            }}
          >
            {isActive ? <><Pause size={24} /> Pausa</> : <><Play size={24} /> Empezar</>}
          </motion.button>
        </div>

      </div>
    </motion.div>
  )
}

export default PomodoroView
