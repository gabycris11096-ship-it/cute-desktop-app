import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'path'

const dbPath = join(app.getPath('userData'), 'cute_magic.db')
const db = new Database(dbPath)

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS qa_content (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    objetivo TEXT,
    practica TEXT
  );

  CREATE TABLE IF NOT EXISTS cronograma (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dia TEXT,
    tarea TEXT,
    color TEXT,
    completado INTEGER
  );

  CREATE TABLE IF NOT EXISTS qa_content_fase2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    objetivo TEXT,
    practica TEXT
  );

  CREATE TABLE IF NOT EXISTS cronograma_fase2 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dia TEXT,
    tarea TEXT,
    color TEXT,
    completado INTEGER
  );

  CREATE TABLE IF NOT EXISTS qa_content_fase3 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    objetivo TEXT,
    practica TEXT
  );

  CREATE TABLE IF NOT EXISTS cronograma_fase3 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dia TEXT,
    tarea TEXT,
    color TEXT,
    completado INTEGER
  );

  CREATE TABLE IF NOT EXISTS qa_content_fase4 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    objetivo TEXT,
    practica TEXT
  );

  CREATE TABLE IF NOT EXISTS cronograma_fase4 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dia TEXT,
    tarea TEXT,
    color TEXT,
    completado INTEGER
  );

  CREATE TABLE IF NOT EXISTS qa_content_fase5 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    objetivo TEXT,
    practica TEXT
  );

  CREATE TABLE IF NOT EXISTS sugerencias_fase5 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emoji TEXT,
    texto TEXT,
    completado INTEGER
  );

  CREATE TABLE IF NOT EXISTS qa_content_fase6 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT,
    objetivo TEXT,
    practica TEXT
  );

  CREATE TABLE IF NOT EXISTS sugerencias_fase6 (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    emoji TEXT,
    texto TEXT,
    completado INTEGER
  );

  CREATE TABLE IF NOT EXISTS portfolio_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    seccion TEXT,
    proyecto TEXT,
    herramienta TEXT,
    ejemplo TEXT,
    resultado TEXT
  );

  CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT,
    completado INTEGER DEFAULT 0,
    fecha TEXT
  );

  CREATE TABLE IF NOT EXISTS user_profile (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    rol TEXT,
    bio TEXT,
    linkedin TEXT,
    github TEXT,
    whatsapp TEXT,
    email TEXT,
    foto TEXT
  );
`)

// Add new columns if they don't exist
try {
  db.exec('ALTER TABLE user_profile ADD COLUMN whatsapp TEXT;')
  db.exec('ALTER TABLE user_profile ADD COLUMN email TEXT;')
} catch (e) {
  // Columns already exist, safe to ignore
}
try {
  db.exec('ALTER TABLE user_profile ADD COLUMN foto TEXT;')
} catch (e) {
  // Column already exists, safe to ignore
}

// Seed default data if empty
const contentCount = db.prepare('SELECT COUNT(*) as count FROM qa_content').get() as { count: number }
if (contentCount.count === 0) {
  db.prepare('INSERT INTO qa_content (titulo, objetivo, practica) VALUES (?, ?, ?)')
    .run(
      'Introducción al QA',
      'Entender qué es QA, conocer los diferentes tipos de pruebas (funcionales, caja negra, regresión) y aprender la metodología correcta para documentar bugs de manera efectiva.',
      'Crea casos de prueba simples para las aplicaciones que usas todos los días. Intenta encontrar escenarios curiosos en apps como WhatsApp o Gmail.'
    )

  const defaultCrono = [
    { dia: 'Lunes', tarea: 'Introducción al QA (Cursa – módulo 1)', color: '#7fb3ff' },
    { dia: 'Martes', tarea: 'Tipos de pruebas (funcionales, regresión, caja negra)', color: '#ff8fa3' },
    { dia: 'Miércoles', tarea: 'Diseño de casos de prueba', color: '#c084fc' },
    { dia: 'Jueves', tarea: 'Documentación de bugs', color: '#fde047' },
    { dia: 'Viernes', tarea: 'Ejercicio práctico: prueba una app que uses (ej. WhatsApp)', color: '#4ade80' },
    { dia: 'Sábado', tarea: 'Repaso y notas en tu portafolio', color: '#7fb3ff' },
    { dia: 'Domingo', tarea: 'Descanso o lectura ligera sobre QA', color: '#6b7280' },
  ]

  const insertCrono = db.prepare('INSERT INTO cronograma (dia, tarea, color, completado) VALUES (?, ?, ?, ?)')
  for (const item of defaultCrono) {
    insertCrono.run(item.dia, item.tarea, item.color, 0)
  }
}

// Fase 2 correct schedule — source of truth applied on every startup
const fase2Schedule = [
  { dia: 'Lunes',      tarea: 'Introducción a Jira (Galiclerc – módulo 1)',       color: '#f97316' },
  { dia: 'Martes',     tarea: 'Creación de tickets y gestión de incidencias',      color: '#a78bfa' },
  { dia: 'Miércoles',  tarea: 'Scrum: roles y ceremonias',                         color: '#38bdf8' },
  { dia: 'Jueves',     tarea: 'Kanban: tableros y flujo de trabajo',               color: '#fb7185' },
  { dia: 'Viernes',    tarea: 'Simulación de proyecto en Jira',                    color: '#4ade80' },
  { dia: 'Sábado',     tarea: 'Repaso y documentación en tu portafolio',           color: '#fde047' },
  { dia: 'Domingo',    tarea: 'Descanso',                                          color: '#6b7280' },
]

// Seed Fase 2 if empty (fresh install)
const fase2Count = db.prepare('SELECT COUNT(*) as count FROM qa_content_fase2').get() as { count: number }
if (fase2Count.count === 0) {
  db.prepare('INSERT INTO qa_content_fase2 (titulo, objetivo, practica) VALUES (?, ?, ?)')
    .run(
      'QA y Testing',
      'Aprender Jira, Scrum/Kanban y la gestión de incidencias para trabajar en equipos de desarrollo de software de manera profesional.',
      'Abre una cuenta gratuita en Jira y simula un proyecto con tareas y bugs. Crea al menos 3 historias de usuario y 2 incidencias con distintas prioridades.'
    )
  const insertCronoFase2 = db.prepare('INSERT INTO cronograma_fase2 (dia, tarea, color, completado) VALUES (?, ?, ?, ?)')
  for (const item of fase2Schedule) {
    insertCronoFase2.run(item.dia, item.tarea, item.color, 0)
  }
}

// Always sync cronograma_fase2 content (keeps completado untouched)
const updateCronoFase2 = db.prepare('UPDATE cronograma_fase2 SET tarea = ?, color = ? WHERE dia = ?')
for (const item of fase2Schedule) {
  updateCronoFase2.run(item.tarea, item.color, item.dia)
}

// Fase 3 correct schedule — source of truth applied on every startup
const fase3Schedule = [
  { dia: 'Lunes',      tarea: 'Fundamentos de automatización (Yuri Kan – módulo 1)',          color: '#2dd4bf' },
  { dia: 'Martes',     tarea: 'Selenium: instalación y primeros scripts',                      color: '#f97316' },
  { dia: 'Miércoles',  tarea: 'Cypress: pruebas de interfaz web',                             color: '#a78bfa' },
  { dia: 'Jueves',     tarea: 'Playwright: pruebas modernas',                                  color: '#38bdf8' },
  { dia: 'Viernes',    tarea: 'Ejercicio práctico: automatiza un login en una demo app',       color: '#fb7185' },
  { dia: 'Sábado',     tarea: 'Repaso y portafolio',                                           color: '#fde047' },
  { dia: 'Domingo',    tarea: 'Descanso',                                                      color: '#6b7280' },
]

// Seed Fase 3 if empty (fresh install)
const fase3Count = db.prepare('SELECT COUNT(*) as count FROM qa_content_fase3').get() as { count: number }
if (fase3Count.count === 0) {
  db.prepare('INSERT INTO qa_content_fase3 (titulo, objetivo, practica) VALUES (?, ?, ?)')
    .run(
      'Automatización',
      'Aprender Selenium, Cypress, Playwright y pruebas de APIs para automatizar el proceso de testing de software.',
      'Automatiza pruebas en una página web sencilla, por ejemplo el login en una demo app como The Internet (Heroku).'
    )
  const insertCronoFase3 = db.prepare('INSERT INTO cronograma_fase3 (dia, tarea, color, completado) VALUES (?, ?, ?, ?)')
  for (const item of fase3Schedule) {
    insertCronoFase3.run(item.dia, item.tarea, item.color, 0)
  }
}

// Always sync cronograma_fase3 content (keeps completado untouched)
const updateCronoFase3 = db.prepare('UPDATE cronograma_fase3 SET tarea = ?, color = ? WHERE dia = ?')
for (const item of fase3Schedule) {
  updateCronoFase3.run(item.tarea, item.color, item.dia)
}

// Fase 4 correct schedule — source of truth applied on every startup
const fase4Schedule = [
  { dia: 'Lunes',      tarea: 'Introducción a pruebas de APIs',                                    color: '#6366f1' },
  { dia: 'Martes',     tarea: 'Postman: creación de colecciones y pruebas',                        color: '#f97316' },
  { dia: 'Miércoles',  tarea: 'Automatización de APIs con scripts',                                color: '#2dd4bf' },
  { dia: 'Jueves',     tarea: 'Integración QA + DevOps',                                           color: '#fb7185' },
  { dia: 'Viernes',    tarea: 'Ejercicio práctico: prueba una API pública (ej. Pokémon API)',        color: '#4ade80' },
  { dia: 'Sábado',     tarea: 'Repaso y portafolio',                                               color: '#fde047' },
  { dia: 'Domingo',    tarea: 'Descanso',                                                         color: '#6b7280' },
]

// Seed Fase 4 if empty (fresh install)
const fase4Count = db.prepare('SELECT COUNT(*) as count FROM qa_content_fase4').get() as { count: number }
if (fase4Count.count === 0) {
  db.prepare('INSERT INTO qa_content_fase4 (titulo, objetivo, practica) VALUES (?, ?, ?)')
    .run(
      'Experiencia Real',
      'Aplicar lo aprendido en proyectos reales y ganar experiencia práctica participando en plataformas freelance de testing como uTest y TestIO.',
      'Participa en proyectos de prueba en uTest o TestIO y documenta tus hallazgos con capturas, pasos para reproducir y severidad.'
    )
  const insertCronoFase4 = db.prepare('INSERT INTO cronograma_fase4 (dia, tarea, color, completado) VALUES (?, ?, ?, ?)')
  for (const item of fase4Schedule) {
    insertCronoFase4.run(item.dia, item.tarea, item.color, 0)
  }
}

// Always sync cronograma_fase4 content (keeps completado untouched)
const updateCronoFase4 = db.prepare('UPDATE cronograma_fase4 SET tarea = ?, color = ? WHERE dia = ?')
for (const item of fase4Schedule) {
  updateCronoFase4.run(item.tarea, item.color, item.dia)
}

// Fase 5 suggestions — source of truth
const fase5Sugerencias = [
  { emoji: '💻', texto: 'Participa en plataformas como uTest o TestIO.' },
  { emoji: '📂', texto: 'Documenta tus proyectos en un portafolio.' },
  { emoji: '⏳', texto: 'Dedica 2–3 meses a preparar la certificación ISTQB Foundation Level.' },
]

// Seed Fase 5 if empty (fresh install)
const fase5Count = db.prepare('SELECT COUNT(*) as count FROM qa_content_fase5').get() as { count: number }
if (fase5Count.count === 0) {
  db.prepare('INSERT INTO qa_content_fase5 (titulo, objetivo, practica) VALUES (?, ?, ?)')
    .run(
      'Certificación',
      'Validar tus conocimientos con la certificación ISTQB Foundation Level y aumentar tu empleabilidad en el mercado de QA.',
      'Repasa con simuladores de examen y guías gratuitas. El examen tiene 40 preguntas de opción múltiple y necesitás el 65% para aprobarlo.'
    )
}

// Seed Fase 5 suggestions ONLY if empty
const fase5SugCount = db.prepare('SELECT COUNT(*) as count FROM sugerencias_fase5').get() as { count: number }
if (fase5SugCount.count === 0) {
  const insertSug = db.prepare('INSERT INTO sugerencias_fase5 (emoji, texto, completado) VALUES (?, ?, ?)')
  for (const s of fase5Sugerencias) {
    insertSug.run(s.emoji, s.texto, 0)
  }
}

// Fase 6 suggestions — source of truth
const fase6Sugerencias = [
  { emoji: '🗣️', texto: 'Soft Skills en QA: Comunicación clara en reportes, trabajo en equipo ágil y pensamiento crítico.' },
  { emoji: '📂', texto: 'Portafolio estructurado: Casos de prueba, bugs, scripts automatizados y proyectos simulados con capturas.' },
  { emoji: '🛠️', texto: 'Práctica con proyectos reales: Descarga demos (OrangeHRM, Buggy Cars) y documenta todo profesionalmente.' },
  { emoji: '⚙️', texto: 'Conocimientos complementarios: SQL básico, CI/CD (Jenkins, GitHub Actions) y seguridad básica en QA.' },
  { emoji: '🤝', texto: 'Networking: Comparte en LinkedIn, participa en comunidades de QA y contribuye en open source.' },
]

// Seed Fase 6 if empty (fresh install)
const fase6Count = db.prepare('SELECT COUNT(*) as count FROM qa_content_fase6').get() as { count: number }
if (fase6Count.count === 0) {
  db.prepare('INSERT INTO qa_content_fase6 (titulo, objetivo, practica) VALUES (?, ?, ?)')
    .run(
      'Más Sugerencias',
      'Continuar expandiendo tus habilidades como QA y mantenerte al día con las nuevas tecnologías del mercado.',
      'Investiga sobre nuevas tendencias y herramientas de testing para sumar a tu toolkit personal.'
    )
}

// Seed Fase 6 suggestions ONLY if empty
const fase6SugCount = db.prepare('SELECT COUNT(*) as count FROM sugerencias_fase6').get() as { count: number }
if (fase6SugCount.count === 0) {
  const insertSug6 = db.prepare('INSERT INTO sugerencias_fase6 (emoji, texto, completado) VALUES (?, ?, ?)')
  for (const s of fase6Sugerencias) {
    insertSug6.run(s.emoji, s.texto, 0)
  }
}

// Seed Portfolio if empty
const portfolioCount = db.prepare('SELECT COUNT(*) as count FROM portfolio_items').get() as { count: number }
if (portfolioCount.count === 0) {
  const insertPortfolio = db.prepare('INSERT INTO portfolio_items (seccion, proyecto, herramienta, ejemplo, resultado) VALUES (?, ?, ?, ?, ?)')
  
  const defaultPortfolio = [
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
  ]

  for (const p of defaultPortfolio) {
    insertPortfolio.run(p.seccion, p.proyecto, p.herramienta, p.ejemplo, p.resultado)
  }
}

// Seed Profile if empty
const profileCount = db.prepare('SELECT COUNT(*) as count FROM user_profile').get() as { count: number }
if (profileCount.count === 0) {
  db.prepare('INSERT INTO user_profile (nombre, rol, bio, linkedin, github, whatsapp, email, foto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
    .run(
      'Aspirante a QA',
      'QA Tester Junior',
      '¡Hola! Estoy aprendiendo automatización y metodologías ágiles para convertirme en una experta en aseguramiento de calidad.',
      'https://linkedin.com/in/tu-perfil',
      'https://github.com/tu-usuario',
      '+1234567890',
      'hola@ejemplo.com',
      null
    )
}

export default db

