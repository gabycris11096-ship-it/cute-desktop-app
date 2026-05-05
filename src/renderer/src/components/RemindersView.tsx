import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Bell, Plus, Trash2, CheckCircle, Circle } from 'lucide-react'

interface Reminder {
  id: number
  texto: string
  completado: number
  fecha: string
}

interface RemindersViewProps {
  onBack: () => void
}

const RemindersView = ({ onBack }: RemindersViewProps): React.JSX.Element => {
  const [reminders, setReminders] = useState<Reminder[]>([])
  const [newText, setNewText] = useState('')

  const fetchReminders = async () => {
    const data = await window.api.getReminders()
    setReminders(data)
  }

  useEffect(() => {
    fetchReminders()
  }, [])

  const handleAdd = async () => {
    if (!newText.trim()) return
    await window.api.addReminder(newText)
    setNewText('')
    fetchReminders()
  }

  const handleDelete = async (id: number) => {
    await window.api.deleteReminder(id)
    fetchReminders()
  }

  const handleToggle = async (id: number, current: number) => {
    await window.api.toggleReminder(id, current === 1 ? 0 : 1)
    fetchReminders()
  }

  return (
    <motion.div
      key="reminders-view"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
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
          Recordatorios <Bell size={28} color="var(--app-primary)" />
        </h2>
      </div>

      <div style={{ 
        background: 'var(--app-card-bg, white)', 
        padding: '1.2rem', 
        borderRadius: 'var(--radius-lg)', 
        boxShadow: 'var(--shadow-cute)', 
        border: '3px solid var(--app-primary)', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '1rem', 
        overflowY: 'auto', 
        flex: 1 
      }}>
        
        {/* Input Area */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="¿Qué tienes que hacer hoy, tester mágica? ✨"
            style={{ 
              flex: 1, 
              padding: '1rem', 
              borderRadius: 'var(--radius-md)', 
              border: '2px solid var(--color-lavender)', 
              fontSize: '1rem', 
              fontFamily: 'inherit',
              background: 'var(--app-bg-soft)',
              color: 'var(--app-text)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)'
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            style={{ 
              background: 'var(--app-primary)', 
              color: 'white', 
              width: '50px', 
              borderRadius: 'var(--radius-md)', 
              border: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <Plus size={24} />
          </motion.button>
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
          <AnimatePresence>
            {reminders.map((reminder) => (
              <motion.div
                key={reminder.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{ 
                  background: 'var(--app-bg-soft)', 
                  padding: '1rem', 
                  borderRadius: 'var(--radius-md)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  borderLeft: `5px solid ${reminder.completado ? 'var(--color-green)' : 'var(--color-lavender)'}`,
                  opacity: reminder.completado ? 0.7 : 1
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                  <button 
                    onClick={() => handleToggle(reminder.id, reminder.completado)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: reminder.completado ? 'var(--color-green)' : 'var(--color-lavender)' }}
                  >
                    {reminder.completado ? <CheckCircle size={24} /> : <Circle size={24} />}
                  </button>
                  <span style={{ 
                    fontSize: '1rem', 
                    color: 'var(--app-text)', 
                    textDecoration: reminder.completado ? 'line-through' : 'none',
                    fontWeight: 600
                  }}>
                    {reminder.texto}
                  </span>
                </div>
                <button 
                  onClick={() => handleDelete(reminder.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-pink)', opacity: 0.5 }}
                >
                  <Trash2 size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {reminders.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--app-text-muted)' }}>
              <Bell size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
              <p>No tienes recordatorios pendientes. ¡Buen trabajo! ✨</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default RemindersView
