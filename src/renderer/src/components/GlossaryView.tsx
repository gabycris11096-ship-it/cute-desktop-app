import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Book, Search, Info, AlertCircle } from 'lucide-react'

interface GlossaryTerm {
  id: string
  term: string
  definition: string
  category: 'fundamentos' | 'tecnicas' | 'tipos' | 'automatizacion'
}

const terms: GlossaryTerm[] = [
  { id: '1', term: 'Smoke Test', category: 'tipos', definition: 'Prueba rápida para verificar que las funciones críticas de una aplicación funcionan correctamente antes de realizar pruebas más profundas.' },
  { id: '2', term: 'Regression Test', category: 'tipos', definition: 'Pruebas realizadas después de un cambio en el código para asegurar que no se hayan introducido nuevos errores en funcionalidades existentes.' },
  { id: '3', term: 'Boundary Value Analysis', category: 'tecnicas', definition: 'Técnica de diseño de pruebas basada en probar los valores en los límites de los rangos de entrada permitidos.' },
  { id: '4', term: 'Equivalence Partitioning', category: 'tecnicas', definition: 'Técnica que divide los datos de entrada en grupos que se espera que se comporten de la misma manera.' },
  { id: '5', term: 'Bug Life Cycle', category: 'fundamentos', definition: 'El camino que sigue un error desde que es descubierto hasta que es cerrado (New, Assigned, Open, Fixed, Retest, Closed).' },
  { id: '6', term: 'Exploratory Testing', category: 'tipos', definition: 'Enfoque de pruebas donde el tester aprende, diseña y ejecuta pruebas de manera simultánea, basándose en su intuición y experiencia.' },
  { id: '7', term: 'API Testing', category: 'automatizacion', definition: 'Pruebas centradas en verificar que las interfaces de programación de aplicaciones (API) cumplan con su funcionalidad, fiabilidad y seguridad.' },
  { id: '8', term: 'UAT (User Acceptance Testing)', category: 'tipos', definition: 'Fase final de las pruebas donde los usuarios finales verifican que el sistema cumple con sus necesidades reales de negocio.' },
  { id: '9', term: 'Sanity Test', category: 'tipos', definition: 'Subconjunto de las pruebas de regresión que se enfoca en verificar que una sección específica de la app funciona tras un arreglo.' },
  { id: '10', term: 'Heurísticas de Prueba', category: 'fundamentos', definition: 'Reglas prácticas o "atajos" mentales que ayudan a los testers a descubrir errores de manera más creativa.' }
]

interface GlossaryViewProps {
  onBack: () => void
}

const GlossaryView = ({ onBack }: GlossaryViewProps): React.JSX.Element => {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredTerms = terms.filter(t => 
    t.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.definition.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'fundamentos': return 'var(--color-blue)'
      case 'tecnicas': return 'var(--color-pink)'
      case 'tipos': return 'var(--color-lavender)'
      case 'automatizacion': return 'var(--color-teal)'
      default: return 'var(--color-text-muted)'
    }
  }

  return (
    <motion.div
      key="glossary-view"
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
          Glosario QA <Book size={28} color="var(--app-primary)" />
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
        
        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--app-primary)' }} />
          <input
            type="text"
            placeholder="Busca un término (ej. Smoke, Regresión)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              flex: 1, 
              padding: '1rem 1rem 1rem 3rem', 
              borderRadius: 'var(--radius-md)', 
              border: '2px solid var(--app-primary)', 
              fontSize: '1.1rem', 
              fontFamily: 'inherit',
              outline: 'none',
              background: 'var(--app-bg-soft)',
              color: 'var(--app-text)',
              boxShadow: '0 4px 10px rgba(176, 208, 255, 0.1)'
            }}
          />
        </div>

        {/* Terms Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.2rem' }}>
          <AnimatePresence>
            {filteredTerms.map((t) => (
              <motion.div
                key={t.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                style={{ 
                  background: 'var(--app-bg-soft)', 
                  padding: '1.5rem', 
                  borderRadius: 'var(--radius-md)', 
                  borderTop: `6px solid ${getCategoryColor(t.category)}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--app-text)', fontWeight: 800 }}>{t.term}</h4>
                  <span style={{ 
                    fontSize: '0.65rem', 
                    textTransform: 'uppercase', 
                    fontWeight: 900, 
                    color: 'white', 
                    background: getCategoryColor(t.category),
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    {t.category}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--app-text-muted)', lineHeight: 1.5 }}>
                  {t.definition}
                </p>
                <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
                  <Info size={14} color={getCategoryColor(t.category)} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: getCategoryColor(t.category) }}>Saber más</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredTerms.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--app-text-muted)' }}>
            <AlertCircle size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>No encontramos ese término en el grimorio mágico. ✨</p>
          </div>
        )}

      </div>
    </motion.div>
  )
}

export default GlossaryView
