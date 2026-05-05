import { motion } from 'framer-motion'
import { ArrowLeft, Edit2, Save, Sparkles, Bell, Rocket, Layers, Star, Zap, Trophy, Target, Medal, Lightbulb, Gift, Compass, LucideIcon } from 'lucide-react'
import CronogramaCard from './CronogramaCard'
import SugerenciaCard from './SugerenciaCard'

interface QAContent {
  titulo: string
  objetivo: string
  practica: string
  notas?: string
}

interface GenericPhaseViewProps {
  phaseNumber: number
  qaContent: QAContent
  items: any[] // Can be CronogramaItem[] or Sugerencia[]
  isEditing: boolean
  onBack: () => void
  onToggleEdit: () => void
  onSave: () => void
  onChangeContent: (updated: Partial<QAContent>) => void
  onToggleItem: (idx: number) => void
  onEditItemText?: (idx: number, value: string) => void
}

const GenericPhaseView = ({
  phaseNumber,
  qaContent,
  items,
  isEditing,
  onBack,
  onToggleEdit,
  onSave,
  onChangeContent,
  onToggleItem,
  onEditItemText
}: GenericPhaseViewProps): React.JSX.Element => {
  
  // Icon and Color configuration per phase
  const config: Record<number, { primary: string, icon: LucideIcon, subIcon: LucideIcon, suffix: string, courseTitle: string, link: string }> = {
    1: { primary: 'var(--color-blue)', icon: Sparkles, subIcon: Bell, suffix: '✨', courseTitle: 'Cursa – Cómo ser Tester de Software', link: 'https://cursa.app/es/curso/como-ser-tester-de-software' },
    2: { primary: 'var(--color-orange)', icon: Rocket, subIcon: Layers, suffix: '🚀', courseTitle: 'Jira y Scrum para QA', link: 'https://www.youtube.com/results?search_query=jira+y+scrum+para+qa' },
    3: { primary: 'var(--color-teal)', icon: Star, subIcon: Zap, suffix: '🌟', courseTitle: 'Automatización con Selenium', link: 'https://www.selenium.dev/documentation/' },
    4: { primary: 'var(--color-indigo)', icon: Trophy, subIcon: Target, suffix: '🏆', courseTitle: 'Experiencia en Proyectos Reales', link: 'https://github.com/' },
    5: { primary: 'var(--color-amber)', icon: Medal, subIcon: Lightbulb, suffix: '🏅', courseTitle: 'ISTQB Foundation Level', link: 'https://www.istqb.org/' },
    6: { primary: 'var(--color-fuchsia)', icon: Gift, subIcon: Compass, suffix: '🎁', courseTitle: 'Tips de Entrevista y CV', link: 'https://www.linkedin.com/' }
  }

  const { primary, icon: MainIcon, subIcon: SubIcon, suffix, courseTitle } = config[phaseNumber] || config[1]
  const isCrono = phaseNumber <= 4
  const completed = items.filter(i => i.completado).length
  const total = items.length
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <motion.div
      key={`fase${phaseNumber}-view`}
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
          {isEditing ? (
            <input
              type="text"
              value={qaContent.titulo}
              onChange={(e) => onChangeContent({ titulo: e.target.value })}
              style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--app-text)',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px dashed ${primary}`,
                outline: 'none',
                width: '400px',
                fontFamily: 'inherit'
              }}
            />
          ) : (
            <h2 style={{ fontSize: '2rem', color: 'var(--app-text)' }}>
              Fase {phaseNumber}: {qaContent.titulo} {suffix}
            </h2>
          )}
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open(config[phaseNumber]?.link, '_blank')}
            style={{
              background: 'white',
              color: primary,
              padding: '0.6rem 1.2rem',
              borderRadius: 'var(--radius-full)',
              border: `2px solid ${primary}`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontWeight: 800,
              fontSize: '0.9rem'
            }}
          >
            Abrir Curso <Compass size={18} />
          </motion.button>

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
        </div>
      </div>

      {/* Content Area */}
      <div style={{ background: 'var(--app-card-bg, white)', padding: '0.8rem 1rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-cute)', border: '3px solid var(--app-primary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', overflowY: 'auto', flex: 1, paddingRight: '0.8rem' }}>
        
        {/* Objectives Section */}
        <section>
          <h3 style={{ color: primary, fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <MainIcon size={24} /> {courseTitle}
          </h3>
          <div style={{ 
              background: 'var(--app-bg-soft)', 
            padding: isCrono ? '0.8rem 1.2rem' : '1.5rem', 
            borderRadius: 'var(--radius-md)', 
            borderLeft: `6px solid var(--app-primary)`, 
            display: 'flex', 
            flexDirection: 'column', 
            gap: isCrono ? '0.5rem' : '1rem' 
          }}>
            <div>
              <p style={{ fontWeight: 800, color: primary, marginBottom: '0.3rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Objetivo:</p>
              {isEditing ? (
                <textarea
                  value={qaContent.objetivo}
                  onChange={(e) => onChangeContent({ objetivo: e.target.value })}
                  style={{ width: '100%', minHeight: '60px', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: `2px solid ${primary}`, fontFamily: 'inherit', fontSize: '0.9rem', color: 'var(--app-text)', outline: 'none', resize: 'vertical', background: 'var(--app-bg-soft)' }}
                />
              ) : (
                <p style={{ color: 'var(--app-text)', lineHeight: '1.4', fontSize: '0.95rem' }}>{qaContent.objetivo}</p>
              )}
            </div>

            <div style={{ borderTop: `2px dashed ${primary}44`, paddingTop: '1rem' }}>
              <p style={{ fontWeight: 800, color: 'var(--app-secondary)', marginBottom: '0.3rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px' }}>Práctica Sugerida:</p>
              {isEditing ? (
                <textarea
                  value={qaContent.practica}
                  onChange={(e) => onChangeContent({ practica: e.target.value })}
                  style={{ width: '100%', minHeight: '60px', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--color-pink)', fontFamily: 'inherit', fontSize: '0.9rem', color: 'var(--app-text)', outline: 'none', resize: 'vertical', background: 'var(--app-bg-soft)' }}
                />
              ) : (
                <p style={{ color: 'var(--app-text)', lineHeight: '1.4', fontSize: '0.95rem' }}>{qaContent.practica}</p>
              )}
            </div>
          </div>
        </section>

        {/* Tasks Section */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <h3 style={{ color: 'var(--app-secondary)', fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <SubIcon size={24} /> {isCrono ? 'Cronograma Semanal' : 'Sugerencias Mágicas'}
            </h3>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: progress === 100 ? 'var(--color-green)' : primary }}>
              {completed}/{total} ✓ ({progress}%)
            </span>
          </div>

          {!isCrono && (
            <div style={{ height: '8px', background: 'var(--color-bg)', borderRadius: 'var(--radius-full)', overflow: 'hidden', marginBottom: '1.5rem' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                style={{ height: '100%', background: `linear-gradient(90deg, ${primary}, var(--color-green))`, borderRadius: 'var(--radius-full)' }}
              />
            </div>
          )}

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: isCrono ? 'repeat(7, 1fr)' : 'repeat(2, 1fr)', 
            gap: isCrono ? '0.5rem' : '0.75rem' 
          }}>
            {items.map((item, idx) => (
              isCrono ? (
                <CronogramaCard
                  key={item.dia}
                  item={item}
                  isEditing={isEditing}
                  onToggle={() => onToggleItem(idx)}
                  onEditTask={(value) => onEditItemText && onEditItemText(idx, value)}
                  compact={isCrono}
                />
              ) : (
                <SugerenciaCard
                  key={item.id}
                  item={item}
                  onToggle={() => onToggleItem(idx)}
                />
              )
            ))}
          </div>
        </section>

        {/* My Notes Section */}
        <section style={{ borderTop: `3px dashed ${primary}44`, paddingTop: isCrono ? '0.8rem' : '1.5rem', marginTop: isCrono ? '0.5rem' : '1rem' }}>
          <h3 style={{ color: 'var(--color-lavender)', fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Edit2 size={24} /> Mis Notas Mágicas 📓
          </h3>
          <div style={{ position: 'relative' }}>
            {isEditing ? (
              <textarea
                value={qaContent.notas || ''}
                onChange={(e) => onChangeContent({ notas: e.target.value })}
                placeholder="Escribe aquí tus descubrimientos, dudas o secretos del QA... ✨"
                style={{
                  width: '100%',
                  minHeight: '120px',
                  padding: '1.2rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--app-bg-soft)',
                  border: `3px dashed var(--color-lavender)`,
                  color: 'var(--app-text)',
                  fontSize: '1rem',
                  fontFamily: 'inherit',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                minHeight: '80px',
                padding: '1.2rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--app-bg-soft)',
                borderLeft: `6px solid var(--color-lavender)`,
                color: 'var(--app-text)',
                fontSize: '1rem',
                lineHeight: 1.5,
                whiteSpace: 'pre-wrap'
              }}>
                {qaContent.notas || 'Aún no has escrito notas en esta fase. ¡Dale a Editar y empieza tu diario de tester! ✨'}
              </div>
            )}
          </div>
        </section>

        {progress === 100 && !isEditing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'linear-gradient(135deg, var(--color-green) 0%, var(--color-teal) 100%)',
              padding: '1.5rem',
              borderRadius: 'var(--radius-lg)',
              color: 'white',
              textAlign: 'center',
              marginTop: '1.5rem',
              boxShadow: '0 10px 20px rgba(74, 222, 128, 0.3)',
              border: '4px solid white'
            }}
          >
            <h2 style={{ fontSize: '2rem', margin: 0 }}>¡Fase Completada! 🏆🎉</h2>
            <p style={{ fontWeight: 600, margin: '0.5rem 0 0' }}>Eres una tester mágica oficial de este nivel. ¡A por el siguiente! ✨</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default GenericPhaseView
