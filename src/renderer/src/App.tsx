import { useState, useEffect, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Particle from './components/Particle'
import MotivationOverlay from './components/MotivationOverlay'
import WelcomeScreen from './components/WelcomeScreen'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import GenericPhaseView from './components/GenericPhaseView'
import PortfolioView, { PortfolioItem } from './components/PortfolioView'
import ProfileView, { UserProfile } from './components/ProfileView'
import SettingsView from './components/SettingsView'
import PomodoroView from './components/PomodoroView'
import RemindersView from './components/RemindersView'
import GlossaryView from './components/GlossaryView'
import BugReportView from './components/BugReportView'
import { Sugerencia } from './components/SugerenciaCard'
import { CronogramaItem } from './components/CronogramaCard'

interface QAContent {
  titulo: string
  objetivo: string
  practica: string
  notas?: string
  cronograma: CronogramaItem[]
}

const POSITIVE_MESSAGES = [
  '¡Eres increíble! ✨',
  '¡Lo lograste, preciosa! 💖',
  '¡Un paso más cerca de tu meta! 🚀',
  '¡Brillas más que una estrella! 🌟',
  '¡Qué orgullo, sigue así! 🌸',
  '¡Tu esfuerzo vale oro! 💎',
  '¡Magia pura en tus manos! ✨',
  '¡Eres la mejor tester del mundo! 🧪'
]

function App(): React.JSX.Element {
  const [isInside, setIsInside] = useState(false)
  const [activeView, setActiveView] = useState(localStorage.getItem('app-view') || 'dashboard')
  const [motivationMessage, setMotivationMessage] = useState('')
  const [theme, setTheme] = useState(localStorage.getItem('app-theme') || 'theme-lavender')

  useEffect(() => {
    document.body.className = theme
    localStorage.setItem('app-theme', theme)
  }, [theme])


  useEffect(() => {
    localStorage.setItem('app-view', activeView)
  }, [activeView])
  const [isEditingQA, setIsEditingQA] = useState(false)
  const [qaContent, setQaContent] = useState<QAContent>({
    titulo: 'Fase 1 – Fundamentos',
    objetivo:
      'Curso: QA Testing Efectivo – Testing IT University\n\nObjetivo: Entender qué es QA, tipos de pruebas, ciclo de vida del software, documentación básica.',
    practica:
      'Documenta casos de prueba simples para una app que uses a diario (ej. WhatsApp o Gmail).',
    notas: '',
    cronograma: [
      { id: 1, dia: 'Día 1', tarea: 'Leer introducción a QA y ciclo de vida del software.', color: 'var(--color-pink)', completado: false },
      { id: 2, dia: 'Día 2', tarea: 'Estudiar tipos de pruebas (funcionales y no funcionales).', color: 'var(--color-pink)', completado: false },
      { id: 3, dia: 'Día 3', tarea: 'Practicar documentación de casos de prueba.', color: 'var(--color-pink)', completado: false },
      { id: 4, dia: 'Día 4', tarea: 'Diseñar casos de prueba para una app que uses (ej. WhatsApp).', color: 'var(--color-pink)', completado: false }
    ]
  })

  // Fase 2 state
  const [isEditingQA2, setIsEditingQA2] = useState(false)
  const [qaContent2, setQaContent2] = useState<QAContent>({
    titulo: 'Fase 2 – Bases sólidas',
    objetivo: 'Curso: Curso de Testing de Software – De Cero a QA Engineer (Alejandro Canosa)\n\nObjetivo: Profundizar en pruebas funcionales y no funcionales, herramientas básicas, certificaciones ISTQB.',
    practica: 'Haz un mini-proyecto de pruebas manuales sobre una web sencilla (ej. una tienda online).',
    notas: '',
    cronograma: [
      { id: 11, dia: 'Semana 4', tarea: 'Diferencias QA vs QC + fundamentos de testing.', color: 'var(--color-orange)', completado: false },
      { id: 12, dia: 'Semana 5', tarea: 'Tipos de pruebas y ciclo completo.', color: 'var(--color-orange)', completado: false },
      { id: 13, dia: 'Semana 6', tarea: 'Herramientas básicas + mini-proyecto en tienda online demo.', color: 'var(--color-orange)', completado: false }
    ]
  })

  // Fase 3 state
  const [isEditingQA3, setIsEditingQA3] = useState(false)
  const [qaContent3, setQaContent3] = useState<QAContent>({
    titulo: 'Fase 3 – Automatización inicial',
    objetivo: 'Curso: Automação de Testes com Selenium / Cypress (Udemy o Cursa)\n\nObjetivo: Aprender a automatizar pruebas web.',
    practica: 'Automatiza un flujo simple (ej. login y compra en una web demo).',
    notas: '',
    cronograma: [
      { id: 21, dia: 'Semana 7', tarea: 'Introducción a Selenium y Cypress.', color: 'var(--color-teal)', completado: false },
      { id: 22, dia: 'Semana 8', tarea: 'Automatizar login y flujo de compra en web demo.', color: 'var(--color-teal)', completado: false },
      { id: 23, dia: 'Semana 9', tarea: 'Proyecto práctico: pruebas end-to-end automatizadas.', color: 'var(--color-teal)', completado: false }
    ]
  })

  // Fase 4 state
  const [isEditingQA4, setIsEditingQA4] = useState(false)
  const [qaContent4, setQaContent4] = useState<QAContent>({
    titulo: 'Fase 4 – APIs y certificación',
    objetivo: 'Curso: Testando APIs utilizando Postman + Preparatório para Certificação CTFL (Galiclerc)\n\nObjetivo: Validar endpoints REST y prepararte para certificación internacional.',
    practica: 'Testea una API pública (ej. Pokémon API) y documenta resultados.',
    notas: '',
    cronograma: [
      { id: 31, dia: 'Semana 10', tarea: 'Fundamentos de APIs y pruebas con Postman.', color: 'var(--color-indigo)', completado: false },
      { id: 32, dia: 'Semana 11', tarea: 'Proyecto práctico: testear una API pública (ej. Pokémon API).', color: 'var(--color-indigo)', completado: false },
      { id: 33, dia: 'Semana 12', tarea: 'Repaso ISTQB + simulación de examen CTFL.', color: 'var(--color-indigo)', completado: false }
    ]
  })

  // Fase 5 state
  const [isEditingQA5, setIsEditingQA5] = useState(false)
  const [qaContent5, setQaContent5] = useState<QAContent>({
    titulo: 'Fase 5 – Inmersión Total',
    objetivo: 'Curso: Yuri Kanu - Formação Completa em QA\n\nObjetivo: Dominar el stack completo de QA, desde unitarias hasta CI/CD y Chaos Engineering.',
    practica: 'Completa el pipeline de pruebas de un proyecto real y simula fallos complejos.',
    notas: '',
    cronograma: [
      { id: 501, dia: 'Lunes', tarea: 'Leer teoría del módulo correspondiente, tomar apuntes y practicar unitarias.', color: 'var(--color-amber)', completado: false },
      { id: 502, dia: 'Martes', tarea: 'Estudiar tipos de pruebas, documentar ciclo en web demo y repasar ISTQB.', color: 'var(--color-amber)', completado: false },
      { id: 503, dia: 'Miércoles', tarea: 'Configurar Selenium/Cypress/Playwright, automatizar login y testear APIs.', color: 'var(--color-amber)', completado: false },
      { id: 504, dia: 'Jueves', tarea: 'Automatizar flujo de compra, probar GraphQL/Docker y crear pipeline CI/CD.', color: 'var(--color-amber)', completado: false },
      { id: 505, dia: 'Viernes', tarea: 'Ejecutar pruebas en Docker, caos engineering y documentar APIs.', color: 'var(--color-amber)', completado: false },
      { id: 506, dia: 'Sábado', tarea: 'Configurar emuladores móviles y probar apps en dispositivos reales.', color: 'var(--color-amber)', completado: false },
      { id: 507, dia: 'Domingo', tarea: 'Plan de pruebas, resolver 20 preguntas de entrevista y simular entrevista técnica.', color: 'var(--color-amber)', completado: false }
    ]
  })
  const [sugerencias5, setSugerencias5] = useState<Sugerencia[]>([])

  // Fase 6 state
  const [isEditingQA6, setIsEditingQA6] = useState(false)
  const [qaContent6, setQaContent6] = useState<QAContent>({
    titulo: 'Fase 6 – Carrera y CV',
    objetivo: 'Continuar expandiendo tus habilidades como QA y mantenerte al día con las nuevas tecnologías del mercado.',
    practica: 'Investiga sobre nuevas tendencias y herramientas de testing para sumar a tu toolkit personal.',
    notas: '',
    cronograma: []
  })
  const [sugerencias6, setSugerencias6] = useState<Sugerencia[]>([])

  // Portfolio state
  const [isEditingPortfolio, setIsEditingPortfolio] = useState(false)
  const [portfolioData, setPortfolioData] = useState<PortfolioItem[]>([
    {
      seccion: 'Casos de Prueba',
      proyecto: 'App de mensajería (WhatsApp)',
      herramienta: 'Manual',
      ejemplo: 'Caso: Enviar mensaje de texto\nPasos: Abrir chat → Escribir → Enviar\nEsperado: Mensaje aparece en chat',
      resultado: 'Correcto'
    },
    {
      seccion: 'Reportes de Bugs',
      proyecto: 'App de compras online',
      herramienta: 'Jira',
      ejemplo: 'Bug: Botón "Finalizar compra" no responde\nSeveridad: Alta\nPasos: Agregar producto → Checkout → Finalizar compra',
      resultado: 'Error reproducido'
    },
    {
      seccion: 'Automatización',
      proyecto: 'Demo App de login',
      herramienta: 'Selenium',
      ejemplo: 'Script: Login con credenciales válidas e inválidas\nLenguaje: Python\nEsperado: Acceso correcto / error',
      resultado: 'Script ejecutado con éxito'
    },
    {
      seccion: 'Pruebas de API',
      proyecto: 'Pokémon API',
      herramienta: 'Postman',
      ejemplo: 'Prueba: GET /pokemon/25\nEsperado: Datos de Pikachu\nObtenido: Status 200, JSON correcto',
      resultado: 'Correcto'
    },
    {
      seccion: 'Proyectos en Jira',
      proyecto: 'Proyecto demo Scrum',
      herramienta: 'Jira',
      ejemplo: 'Ejemplo: Tablero con historias de usuario, bugs y tareas\nCapturas: Sprint backlog y flujo Kanban',
      resultado: 'Proyecto simulado'
    },
    {
      seccion: 'Conclusión',
      proyecto: '—',
      herramienta: '—',
      ejemplo: 'Resumen: Habilidades en QA manual, automatización, APIs y gestión ágil\nPróximos pasos: ISTQB Foundation',
      resultado: 'Portafolio actualizado'
    }
  ])

  // Profile state
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileData, setProfileData] = useState<UserProfile>({
    nombre: 'Aspirante a QA',
    rol: 'QA Tester Junior',
    bio: '¡Hola! Estoy aprendiendo automatización y metodologías ágiles para convertirme en una experta en aseguramiento de calidad.',
    linkedin: 'https://linkedin.com/in/tu-perfil',
    github: 'https://github.com/tu-usuario',
    whatsapp: '+1234567890',
    email: 'hola@ejemplo.com',
    foto: ''
  })

  // Load data from SQLite on entering the app
  useEffect(() => {
    if (!isInside) return

    const loadContent = async (): Promise<void> => {
      try {
        const content = await window.api.getQAContent()
        const crono = await window.api.getCronograma()
        if (content) {
          setQaContent((prev) => ({ 
            ...prev, 
            titulo: content.titulo, 
            objetivo: content.objetivo, 
            practica: content.practica,
            cronograma: crono && crono.length > 0 
              ? crono.map((c: any) => ({ ...c, completado: !!c.completado }))
              : prev.cronograma
          }))
        }
      } catch (err) {
        console.error('Error loading DB data:', err)
      }
    }

    const loadContent2 = async (): Promise<void> => {
      try {
        const content2 = await window.api.getQAContentFase2()
        const crono2 = await window.api.getCronogramaFase2()
        if (content2) {
          setQaContent2((prev) => ({ 
            ...prev, 
            titulo: content2.titulo, 
            objetivo: content2.objetivo, 
            practica: content2.practica,
            cronograma: crono2 && crono2.length > 0 
              ? crono2.map((c: any) => ({ ...c, completado: !!c.completado }))
              : prev.cronograma
          }))
        }
      } catch (err) {
        console.error('Error loading Fase 2 DB data:', err)
      }
    }

    const loadContent3 = async (): Promise<void> => {
      try {
        const content3 = await window.api.getQAContentFase3()
        const crono3 = await window.api.getCronogramaFase3()
        if (content3) {
          setQaContent3((prev) => ({ 
            ...prev, 
            titulo: content3.titulo, 
            objetivo: content3.objetivo, 
            practica: content3.practica,
            cronograma: crono3 && crono3.length > 0 
              ? crono3.map((c: any) => ({ ...c, completado: !!c.completado }))
              : prev.cronograma
          }))
        }
      } catch (err) {
        console.error('Error loading Fase 3 DB data:', err)
      }
    }

    const loadContent4 = async (): Promise<void> => {
      try {
        const content4 = await window.api.getQAContentFase4()
        const crono4 = await window.api.getCronogramaFase4()
        if (content4) {
          setQaContent4((prev) => ({ 
            ...prev, 
            titulo: content4.titulo, 
            objetivo: content4.objetivo, 
            practica: content4.practica,
            cronograma: crono4 && crono4.length > 0 
              ? crono4.map((c: any) => ({ ...c, completado: !!c.completado }))
              : prev.cronograma
          }))
        }
      } catch (err) {
        console.error('Error loading Fase 4 DB data:', err)
      }
    }

    const loadContent5 = async (): Promise<void> => {
      try {
        const content5 = await window.api.getQAContentFase5()
        const crono5 = await window.api.getCronogramaFase5()
        if (content5) {
          setQaContent5((prev) => ({ 
            ...prev, 
            titulo: content5.titulo, 
            objetivo: content5.objetivo, 
            practica: content5.practica,
            cronograma: crono5 && crono5.length > 0 
              ? crono5.map((c: any) => ({ ...c, completado: !!c.completado }))
              : prev.cronograma
          }))
        }
        const sug5 = await window.api.getSugerenciasFase5()
        if (sug5 && sug5.length > 0) {
          setSugerencias5(sug5.map((item: any) => ({ ...item, completado: !!item.completado })))
        }
      } catch (err) {
        console.error('Error loading Fase 5 DB data:', err)
      }
    }

    const loadContent6 = async (): Promise<void> => {
      try {
        const content6 = await window.api.getQAContentFase6()
        if (content6) {
          setQaContent6((prev) => ({ ...prev, titulo: content6.titulo, objetivo: content6.objetivo, practica: content6.practica }))
        }
        const sug6 = await window.api.getSugerenciasFase6()
        if (sug6 && sug6.length > 0) {
          setSugerencias6(sug6.map((item: any) => ({ ...item, completado: !!item.completado })))
        }
      } catch (err) {
        console.error('Error loading Fase 6 DB data:', err)
      }
    }

    const loadPortfolio = async (): Promise<void> => {
      try {
        const pData = await window.api.getPortfolio()
        if (pData && pData.length > 0) {
          setPortfolioData(pData)
        }
      } catch (err) {
        console.error('Error loading Portfolio DB data:', err)
      }
    }

    const loadProfile = async (): Promise<void> => {
      try {
        const prData = await window.api.getProfile()
        if (prData) {
          setProfileData(prData)
        }
      } catch (err) {
        console.error('Error loading Profile DB data:', err)
      }
    }

    loadContent()
    loadContent2()
    loadContent3()
    loadContent4()
    loadContent5()
    loadContent6()
    loadPortfolio()
    loadProfile()
  }, [isInside])

  const handleSaveQA = async (): Promise<void> => {
    try {
      await window.api.saveQAContent({ titulo: qaContent.titulo, objetivo: qaContent.objetivo, practica: qaContent.practica })
      for (const item of qaContent.cronograma) {
        await window.api.updateCronogramaItem(item)
      }
      setIsEditingQA(false)
      setMotivationMessage('¡Cambios guardados! ✨')
      setTimeout(() => setMotivationMessage(''), 2000)
    } catch (err) {
      console.error('Error saving QA content:', err)
    }
  }

  const handleToggleDay = async (idx: number): Promise<void> => {
    const newCrono = [...qaContent.cronograma]
    const item = newCrono[idx]
    const wasCompleted = item.completado
    newCrono[idx] = { ...item, completado: !wasCompleted }
    setQaContent((prev) => ({ ...prev, cronograma: newCrono }))
    try {
      await window.api.updateCronogramaItem(newCrono[idx])
    } catch (err) {
      console.error('Error updating item in DB:', err)
    }
    if (!wasCompleted) {
      const randomMsg = POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)]
      setMotivationMessage(randomMsg)
      setTimeout(() => setMotivationMessage(''), 3000)
    }
  }

  const handleChangeContent = (updated: Partial<QAContent>): void => {
    setQaContent((prev) => ({ ...prev, ...updated }))
  }

  const handleBack = (): void => {
    setActiveView('dashboard')
    setIsEditingQA(false)
    setIsEditingQA2(false)
    setIsEditingQA3(false)
    setIsEditingQA4(false)
    setIsEditingQA5(false)
    setIsEditingQA6(false)
    setIsEditingPortfolio(false)
    setIsEditingProfile(false)
  }

  const handleSaveQA2 = async (): Promise<void> => {
    try {
      await window.api.saveQAContentFase2({ titulo: qaContent2.titulo, objetivo: qaContent2.objetivo, practica: qaContent2.practica })
      for (const item of qaContent2.cronograma) {
        await window.api.updateCronogramaItemFase2(item)
      }
      setIsEditingQA2(false)
      setMotivationMessage('¡Fase 2 guardada! 🚀')
      setTimeout(() => setMotivationMessage(''), 2000)
    } catch (err) {
      console.error('Error saving Fase 2 QA content:', err)
    }
  }

  const handleToggleDay2 = async (idx: number): Promise<void> => {
    const newCrono = [...qaContent2.cronograma]
    const item = newCrono[idx]
    const wasCompleted = item.completado
    newCrono[idx] = { ...item, completado: !wasCompleted }
    setQaContent2((prev) => ({ ...prev, cronograma: newCrono }))
    try {
      await window.api.updateCronogramaItemFase2(newCrono[idx])
    } catch (err) {
      console.error('Error updating Fase 2 item in DB:', err)
    }
    if (!wasCompleted) {
      const randomMsg = POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)]
      setMotivationMessage(randomMsg)
      setTimeout(() => setMotivationMessage(''), 3000)
    }
  }

  const handleChangeContent2 = (updated: Partial<QAContent>): void => {
    setQaContent2((prev) => ({ ...prev, ...updated }))
  }

  const handleSaveQA3 = async (): Promise<void> => {
    try {
      await window.api.saveQAContentFase3({ titulo: qaContent3.titulo, objetivo: qaContent3.objetivo, practica: qaContent3.practica })
      for (const item of qaContent3.cronograma) {
        await window.api.updateCronogramaItemFase3(item)
      }
      setIsEditingQA3(false)
      setMotivationMessage('¡Automatización guardada! 🌟')
      setTimeout(() => setMotivationMessage(''), 2000)
    } catch (err) {
      console.error('Error saving Fase 3 QA content:', err)
    }
  }

  const handleToggleDay3 = async (idx: number): Promise<void> => {
    const newCrono = [...qaContent3.cronograma]
    const item = newCrono[idx]
    const wasCompleted = item.completado
    newCrono[idx] = { ...item, completado: !wasCompleted }
    setQaContent3((prev) => ({ ...prev, cronograma: newCrono }))
    try {
      await window.api.updateCronogramaItemFase3(newCrono[idx])
    } catch (err) {
      console.error('Error updating Fase 3 item in DB:', err)
    }
    if (!wasCompleted) {
      const randomMsg = POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)]
      setMotivationMessage(randomMsg)
      setTimeout(() => setMotivationMessage(''), 3000)
    }
  }

  const handleChangeContent3 = (updated: Partial<QAContent>): void => {
    setQaContent3((prev) => ({ ...prev, ...updated }))
  }

  const handleSaveQA4 = async (): Promise<void> => {
    try {
      await window.api.saveQAContentFase4({ titulo: qaContent4.titulo, objetivo: qaContent4.objetivo, practica: qaContent4.practica })
      for (const item of qaContent4.cronograma) {
        await window.api.updateCronogramaItemFase4(item)
      }
      setIsEditingQA4(false)
      setMotivationMessage('¡Experiencia guardada! 🏆')
      setTimeout(() => setMotivationMessage(''), 2000)
    } catch (err) {
      console.error('Error saving Fase 4 QA content:', err)
    }
  }

  const handleToggleDay4 = async (idx: number): Promise<void> => {
    const newCrono = [...qaContent4.cronograma]
    const item = newCrono[idx]
    const wasCompleted = item.completado
    newCrono[idx] = { ...item, completado: !wasCompleted }
    setQaContent4((prev) => ({ ...prev, cronograma: newCrono }))
    try {
      await window.api.updateCronogramaItemFase4(newCrono[idx])
    } catch (err) {
      console.error('Error updating Fase 4 item in DB:', err)
    }
    if (!wasCompleted) {
      const randomMsg = POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)]
      setMotivationMessage(randomMsg)
      setTimeout(() => setMotivationMessage(''), 3000)
    }
  }

  const handleChangeContent4 = (updated: Partial<QAContent>): void => {
    setQaContent4((prev) => ({ ...prev, ...updated }))
  }

  const handleSaveQA5 = async (): Promise<void> => {
    try {
      await window.api.saveQAContentFase5({ titulo: qaContent5.titulo, objetivo: qaContent5.objetivo, practica: qaContent5.practica })
      for (const item of qaContent5.cronograma) {
        await window.api.updateCronogramaItemFase5(item)
      }
      setIsEditingQA5(false)
      setMotivationMessage('¡Inmersión Total guardada! 🏅')
      setTimeout(() => setMotivationMessage(''), 2000)
    } catch (err) {
      console.error('Error saving Fase 5 QA content:', err)
    }
  }

  const handleChangeContent5 = (updated: Partial<QAContent>): void => {
    setQaContent5((prev) => ({ ...prev, ...updated }))
  }

  const handleSaveQA6 = async (): Promise<void> => {
    try {
      await window.api.saveQAContentFase6({ titulo: qaContent6.titulo, objetivo: qaContent6.objetivo, practica: qaContent6.practica })
      setIsEditingQA6(false)
    } catch (err) {
      console.error('Error saving Fase 6 QA content:', err)
    }
  }

  const handleToggleSugerencia6 = async (idx: number): Promise<void> => {
    const newSug = [...sugerencias6]
    const item = newSug[idx]
    const wasCompleted = item.completado
    newSug[idx] = { ...item, completado: !wasCompleted }
    setSugerencias6(newSug)
    try {
      await window.api.toggleSugerenciaFase6(newSug[idx])
    } catch (err) {
      console.error('Error updating Fase 6 sugerencia in DB:', err)
    }
    if (!wasCompleted) {
      const randomMsg = POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)]
      setMotivationMessage(randomMsg)
      setTimeout(() => setMotivationMessage(''), 3000)
    }
  }

  const handleChangeContent6 = (updated: Partial<{ titulo: string; objetivo: string; practica: string }>): void => {
    setQaContent6((prev) => ({ ...prev, ...updated }))
  }

  const handleSavePortfolio = async (): Promise<void> => {
    try {
      for (const item of portfolioData) {
        await window.api.updatePortfolioItem(item)
      }
      setIsEditingPortfolio(false)
      setMotivationMessage('¡Portafolio actualizado! 💼')
      setTimeout(() => setMotivationMessage(''), 2000)
    } catch (err) {
      console.error('Error saving Portfolio content:', err)
    }
  }

  const handleChangePortfolioItem = (index: number, updatedItem: Partial<PortfolioItem>): void => {
    const newData = [...portfolioData]
    newData[index] = { ...newData[index], ...updatedItem }
    setPortfolioData(newData)
  }

  const handleSaveProfile = async (): Promise<void> => {
    try {
      await window.api.saveProfile(profileData)
      setIsEditingProfile(false)
      setMotivationMessage('¡Perfil guardado! 🌸')
      setTimeout(() => setMotivationMessage(''), 2000)
    } catch (err) {
      console.error('Error saving Profile content:', err)
    }
  }

  const handleResetData = async (): Promise<void> => {
    if (!window.confirm('⚠️ ¿ESTÁS COMPLETAMENTE SEGURA? ⚠️\n\nEsta acción borrará TODO: Perfil, Portafolio y Progreso de las 6 fases.\nNo se puede deshacer.')) return
    
    try {
      const success = await window.api.resetAll()
      if (success) {
        window.location.reload()
      }
    } catch (err) {
      console.error('Error resetting data:', err)
    }
  }

  const handleExportPortfolio = async (): Promise<void> => {
    try {
      const success = await window.api.exportPortfolio(portfolioData)
      if (success) {
        setMotivationMessage('¡Portafolio exportado con éxito! 📄✨')
        setTimeout(() => setMotivationMessage(''), 3000)
      }
    } catch (err) {
      console.error('Error exporting portfolio:', err)
    }
  }

  const handleChangeProfile = (updated: Partial<UserProfile>): void => {
    setProfileData((prev) => ({ ...prev, ...updated }))
  }

  const handleAddPortfolioItem = async (): Promise<void> => {
    try {
      await window.api.addPortfolioItem()
      const pData = await window.api.getPortfolio()
      setPortfolioData(pData)
      setMotivationMessage('¡Nueva entrada creada! ✨')
      setTimeout(() => setMotivationMessage(''), 2000)
    } catch (err) {
      console.error('Error adding portfolio item:', err)
    }
  }

  const handleDeletePortfolioItem = async (id: number): Promise<void> => {
    if (!window.confirm('¿Estás segura de que quieres eliminar esta entrada? 🌸')) return
    try {
      await window.api.deletePortfolioItem(id)
      const pData = await window.api.getPortfolio()
      setPortfolioData(pData)
    } catch (err) {
      console.error('Error deleting portfolio item:', err)
    }
  }

  const progress = useMemo(() => {
    const calc = (items: any[]): number => (items.length === 0 ? 0 : Math.round((items.filter((i) => i.completado).length / items.length) * 100))
    return {
      fase1: calc(qaContent.cronograma),
      fase2: calc(qaContent2.cronograma),
      fase3: calc(qaContent3.cronograma),
      fase4: calc(qaContent4.cronograma),
      fase5: calc(qaContent5.cronograma),
      fase6: calc(qaContent6.cronograma),
    }
  }, [qaContent, qaContent2, qaContent3, qaContent4, qaContent5, sugerencias5, sugerencias6])

  return (
    <div className="app-container">
      {/* Background Particles */}
      {isInside && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
          {[...Array(20)].map((_, i) => (
            <Particle key={i} color={i % 2 === 0 ? 'var(--app-primary)' : 'var(--app-secondary)'} />
          ))}
        </div>
      )}

      <MotivationOverlay message={motivationMessage} />

      <AnimatePresence mode="wait">
        {!isInside ? (
          <WelcomeScreen key="welcome" onEnter={() => setIsInside(true)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            style={{ width: '100%', height: '100%', display: 'flex', padding: '1.5rem', position: 'relative', zIndex: 1 }}
          >
            <Sidebar
              activeView={activeView}
              currentTheme={theme}
              onChangeView={setActiveView}
            />

            <div style={{ flex: 1, marginLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', height: 'calc(100vh - 3rem)', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                {activeView === 'dashboard' ? (
                  <Dashboard key="dashboard" progress={progress} onSelectFase={setActiveView} />
                ) : activeView === 'fase1' ? (
                  <GenericPhaseView
                    phaseNumber={1}
                    qaContent={qaContent}
                    items={qaContent.cronograma}
                    isEditing={isEditingQA}
                    onBack={handleBack}
                    onToggleEdit={() => setIsEditingQA(true)}
                    onSave={handleSaveQA}
                    onChangeContent={handleChangeContent}
                    onToggleItem={handleToggleDay}
                    onEditItemText={(idx, val) => {
                      const newCrono = [...qaContent.cronograma]
                      newCrono[idx] = { ...newCrono[idx], tarea: val }
                      handleChangeContent({ cronograma: newCrono })
                    }}
                  />
                ) : activeView === 'fase2' ? (
                  <GenericPhaseView
                    phaseNumber={2}
                    qaContent={qaContent2}
                    items={qaContent2.cronograma}
                    isEditing={isEditingQA2}
                    onBack={handleBack}
                    onToggleEdit={() => setIsEditingQA2(true)}
                    onSave={handleSaveQA2}
                    onChangeContent={handleChangeContent2}
                    onToggleItem={handleToggleDay2}
                    onEditItemText={(idx, val) => {
                      const newCrono = [...qaContent2.cronograma]
                      newCrono[idx] = { ...newCrono[idx], tarea: val }
                      handleChangeContent2({ cronograma: newCrono })
                    }}
                  />
                ) : activeView === 'fase3' ? (
                  <GenericPhaseView
                    phaseNumber={3}
                    qaContent={qaContent3}
                    items={qaContent3.cronograma}
                    isEditing={isEditingQA3}
                    onBack={handleBack}
                    onToggleEdit={() => setIsEditingQA3(true)}
                    onSave={handleSaveQA3}
                    onChangeContent={handleChangeContent3}
                    onToggleItem={handleToggleDay3}
                    onEditItemText={(idx, val) => {
                      const newCrono = [...qaContent3.cronograma]
                      newCrono[idx] = { ...newCrono[idx], tarea: val }
                      handleChangeContent3({ cronograma: newCrono })
                    }}
                  />
                ) : activeView === 'fase4' ? (
                  <GenericPhaseView
                    phaseNumber={4}
                    qaContent={qaContent4}
                    items={qaContent4.cronograma}
                    isEditing={isEditingQA4}
                    onBack={handleBack}
                    onToggleEdit={() => setIsEditingQA4(true)}
                    onSave={handleSaveQA4}
                    onChangeContent={handleChangeContent4}
                    onToggleItem={handleToggleDay4}
                    onEditItemText={(idx, val) => {
                      const newCrono = [...qaContent4.cronograma]
                      newCrono[idx] = { ...newCrono[idx], tarea: val }
                      handleChangeContent4({ cronograma: newCrono })
                    }}
                  />
                ) : activeView === 'fase5' ? (
                  <GenericPhaseView
                    phaseNumber={5}
                    qaContent={qaContent5}
                    items={qaContent5.cronograma}
                    isEditing={isEditingQA5}
                    onBack={handleBack}
                    onToggleEdit={() => setIsEditingQA5(true)}
                    onSave={handleSaveQA5}
                    onChangeContent={handleChangeContent5}
                    onToggleItem={async (idx) => {
                      const newCrono = [...qaContent5.cronograma]
                      const item = newCrono[idx]
                      const wasCompleted = item.completado
                      newCrono[idx] = { ...item, completado: !wasCompleted }
                      setQaContent5((prev) => ({ ...prev, cronograma: newCrono }))
                      try {
                        await window.api.updateCronogramaItemFase5(newCrono[idx])
                      } catch (err) {
                        console.error('Error updating Fase 5 item in DB:', err)
                      }
                      if (!wasCompleted) {
                        const randomMsg = POSITIVE_MESSAGES[Math.floor(Math.random() * POSITIVE_MESSAGES.length)]
                        setMotivationMessage(randomMsg)
                        setTimeout(() => setMotivationMessage(''), 3000)
                      }
                    }}
                    onEditItemText={(idx, val) => {
                      const newCrono = [...qaContent5.cronograma]
                      newCrono[idx] = { ...newCrono[idx], tarea: val }
                      handleChangeContent5({ cronograma: newCrono })
                    }}
                  />
                ) : activeView === 'fase6' ? (
                  <GenericPhaseView
                    phaseNumber={6}
                    qaContent={qaContent6}
                    items={sugerencias6}
                    isEditing={isEditingQA6}
                    onBack={handleBack}
                    onToggleEdit={() => setIsEditingQA6(true)}
                    onSave={handleSaveQA6}
                    onChangeContent={handleChangeContent6}
                    onToggleItem={handleToggleSugerencia6}
                  />
                ) : activeView === 'portfolio' ? (
                  <PortfolioView
                    key="portfolio"
                    portfolioData={portfolioData}
                    isEditing={isEditingPortfolio}
                    onBack={handleBack}
                    onToggleEdit={() => setIsEditingPortfolio(true)}
                    onSave={handleSavePortfolio}
                    onAddItem={handleAddPortfolioItem}
                    onDeleteItem={handleDeletePortfolioItem}
                    onExport={handleExportPortfolio}
                    onChangeItem={handleChangePortfolioItem}
                  />
                ) : activeView === 'profile' ? (
                  <ProfileView
                    key="profile"
                    profile={profileData}
                    isEditing={isEditingProfile}
                    onBack={handleBack}
                    onToggleEdit={() => setIsEditingProfile(true)}
                    onSave={handleSaveProfile}
                    onChangeProfile={handleChangeProfile}
                    onExit={() => setIsInside(false)}
                  />
                ) : activeView === 'settings' ? (
                  <SettingsView
                    key="settings"
                    currentTheme={theme}
                    onBack={handleBack}
                    onSelectTheme={setTheme}
                    onResetData={handleResetData}
                  />
                ) : activeView === 'pomodoro' ? (
                  <PomodoroView key="pomodoro" onBack={handleBack} />
                ) : activeView === 'reminders' ? (
                  <RemindersView key="reminders" onBack={handleBack} />
                ) : activeView === 'glossary' ? (
                  <GlossaryView key="glossary" onBack={handleBack} />
                ) : activeView === 'bug-report' ? (
                  <BugReportView key="bug-report" onBack={handleBack} />
                ) : null}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isInside && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ position: 'absolute', bottom: '2rem', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}
        >
          ¡Haz clic para entrar a tu mundo mágico! ✨
        </motion.div>
      )}
    </div>
  )
}

export default App
