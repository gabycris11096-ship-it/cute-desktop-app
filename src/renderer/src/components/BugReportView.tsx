import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Bug, Copy, Trash2, Send } from 'lucide-react'

interface BugReport {
  title: string
  steps: string[]
  expected: string
  actual: string
  severity: string
  environment: string
}

interface BugReportViewProps {
  onBack: () => void
}

const BugReportView = ({ onBack }: BugReportViewProps): React.JSX.Element => {
  const [report, setReport] = useState<BugReport>({
    title: '',
    steps: [''],
    expected: '',
    actual: '',
    severity: 'Medium',
    environment: 'Windows 10 / Chrome'
  })
  const [copied, setCopied] = useState(false)

  const handleAddStep = () => {
    setReport({ ...report, steps: [...report.steps, ''] })
  }

  const handleStepChange = (idx: number, val: string) => {
    const newSteps = [...report.steps]
    newSteps[idx] = val
    setReport({ ...report, steps: newSteps })
  }

  const handleRemoveStep = (idx: number) => {
    const newSteps = report.steps.filter((_, i) => i !== idx)
    setReport({ ...report, steps: newSteps })
  }

  const generateReportText = () => {
    const stepsText = report.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')
    return `🐞 BUG REPORT: ${report.title}
---------------------------------
📍 Environment: ${report.environment}
🔥 Severity: ${report.severity}

📝 Steps to Reproduce:
${stepsText}

✅ Expected Result:
${report.expected}

❌ Actual Result:
${report.actual}

---------------------------------
Generated with Cute QA Desktop App ✨`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generateReportText())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      key="bug-report-view"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
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
        <h2 style={{ fontSize: '2rem', color: 'var(--app-text, var(--color-text))', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Bug Reporter <Bug size={28} color="var(--app-primary)" />
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', flex: 1, overflow: 'hidden' }}>
        {/* Form */}
        <div style={{ 
          background: 'var(--app-card-bg, white)', 
          padding: '1.2rem', 
          borderRadius: 'var(--radius-lg)', 
          boxShadow: 'var(--shadow-cute)', 
          border: '3px solid var(--app-primary)', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '1rem', 
          overflowY: 'auto'
        }}>
          <div>
            <label style={{ display: 'block', fontWeight: 800, color: 'var(--app-text, white)', marginBottom: '0.5rem' }}>Título del Bug</label>
            <input 
              value={report.title}
              onChange={(e) => setReport({ ...report, title: e.target.value })}
              placeholder="Ej: El botón de login no responde al hacer clic"
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--app-primary)', outline: 'none' }} 
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: 800, color: 'var(--app-text, white)', marginBottom: '0.5rem' }}>Severidad</label>
              <select 
                value={report.severity}
                onChange={(e) => setReport({ ...report, severity: e.target.value })}
                style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--app-primary)', outline: 'none', background: 'var(--app-bg-soft)', color: 'var(--app-text)' }}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 800, color: 'var(--app-text, white)', marginBottom: '0.5rem' }}>Ambiente</label>
              <input 
                value={report.environment}
                onChange={(e) => setReport({ ...report, environment: e.target.value })}
              style={{ width: '100%', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--app-primary)', outline: 'none', background: 'var(--app-bg-soft)', color: 'var(--app-text)' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, color: 'var(--app-text, var(--color-text))', marginBottom: '0.5rem' }}>
              Pasos para Reproducir
              <button onClick={handleAddStep} style={{ color: 'var(--app-primary)', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.8rem' }}>+ Añadir Paso</button>
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {report.steps.map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 800, color: 'var(--app-primary)', paddingTop: '0.8rem' }}>{idx + 1}.</span>
                  <input 
                    value={step}
                    onChange={(e) => handleStepChange(idx, e.target.value)}
                    style={{ flex: 1, padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--app-primary)', outline: 'none', background: 'var(--app-bg-soft)', color: 'var(--app-text)' }} 
                  />
                  <button onClick={() => handleRemoveStep(idx)} style={{ color: 'var(--color-text-muted)', border: 'none', background: 'none' }}><Trash2 size={16} /></button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 800, color: 'var(--app-text, white)', marginBottom: '0.5rem' }}>Resultado Esperado</label>
            <textarea 
              value={report.expected}
              onChange={(e) => setReport({ ...report, expected: e.target.value })}
              style={{ width: '100%', minHeight: '60px', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--app-primary)', outline: 'none', resize: 'vertical', background: 'var(--app-bg-soft)', color: 'var(--app-text)' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: 800, color: 'var(--app-text, white)', marginBottom: '0.5rem' }}>Resultado Actual</label>
            <textarea 
              value={report.actual}
              onChange={(e) => setReport({ ...report, actual: e.target.value })}
              style={{ width: '100%', minHeight: '60px', padding: '0.8rem', borderRadius: 'var(--radius-sm)', border: '2px solid var(--app-primary)', outline: 'none', resize: 'vertical', background: 'var(--app-bg-soft)', color: 'var(--app-text)' }} 
            />
          </div>
        </div>

        {/* Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ 
            background: 'var(--app-bg-soft, #1e293b)', 
            padding: '2rem', 
            borderRadius: 'var(--radius-lg)', 
            color: '#a5f3fc', 
            fontFamily: 'monospace', 
            fontSize: '0.9rem', 
            whiteSpace: 'pre-wrap',
            flex: 1,
            boxShadow: 'var(--shadow-cute)',
            position: 'relative',
            overflowY: 'auto'
          }}>
            <div style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'rgba(255,255,255,0.2)' }}>
              <Bug size={64} />
            </div>
            {generateReportText()}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopy}
            style={{ 
              background: copied ? 'var(--color-green)' : 'var(--app-primary)', 
              color: 'white', 
              padding: '1.2rem', 
              borderRadius: 'var(--radius-md)', 
              border: 'none', 
              fontSize: '1.1rem', 
              fontWeight: 800, 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              boxShadow: '0 8px 0 rgba(0,0,0,0.1)'
            }}
          >
            {copied ? <><Send size={24} /> ¡Copiado con éxito!</> : <><Copy size={24} /> Copiar Reporte Profesional</>}
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default BugReportView
