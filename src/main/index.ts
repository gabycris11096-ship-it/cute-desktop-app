import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { autoUpdater } from 'electron-updater'
import { writeFileSync } from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import db from './db'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    autoHideMenuBar: true,
    title: 'Cute App',
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  // Database Handlers
  ipcMain.handle('db:get-qa-content', () => {
    return db.prepare('SELECT * FROM qa_content LIMIT 1').get()
  })

  ipcMain.handle('db:save-qa-content', (_, content) => {
    return db.prepare('UPDATE qa_content SET titulo = ?, objetivo = ?, practica = ? WHERE id = 1')
      .run(content.titulo, content.objetivo, content.practica)
  })

  ipcMain.handle('db:get-cronograma', () => {
    return db.prepare('SELECT * FROM cronograma').all()
  })

  ipcMain.handle('db:update-cronograma-item', (_, item) => {
    return db.prepare('UPDATE cronograma SET tarea = ?, completado = ? WHERE id = ?')
      .run(item.tarea, item.completado ? 1 : 0, item.id)
  })

  // Fase 2 Database Handlers
  ipcMain.handle('db:get-qa-content-fase2', () => {
    return db.prepare('SELECT * FROM qa_content_fase2 LIMIT 1').get()
  })

  ipcMain.handle('db:save-qa-content-fase2', (_, content) => {
    return db.prepare('UPDATE qa_content_fase2 SET titulo = ?, objetivo = ?, practica = ? WHERE id = 1')
      .run(content.titulo, content.objetivo, content.practica)
  })

  ipcMain.handle('db:get-cronograma-fase2', () => {
    return db.prepare('SELECT * FROM cronograma_fase2').all()
  })

  ipcMain.handle('db:update-cronograma-item-fase2', (_, item) => {
    return db.prepare('UPDATE cronograma_fase2 SET tarea = ?, completado = ? WHERE id = ?')
      .run(item.tarea, item.completado ? 1 : 0, item.id)
  })

  // Fase 3 Database Handlers
  ipcMain.handle('db:get-qa-content-fase3', () => {
    return db.prepare('SELECT * FROM qa_content_fase3 LIMIT 1').get()
  })

  ipcMain.handle('db:save-qa-content-fase3', (_, content) => {
    return db.prepare('UPDATE qa_content_fase3 SET titulo = ?, objetivo = ?, practica = ? WHERE id = 1')
      .run(content.titulo, content.objetivo, content.practica)
  })

  ipcMain.handle('db:get-cronograma-fase3', () => {
    return db.prepare('SELECT * FROM cronograma_fase3').all()
  })

  ipcMain.handle('db:update-cronograma-item-fase3', (_, item) => {
    return db.prepare('UPDATE cronograma_fase3 SET tarea = ?, completado = ? WHERE id = ?')
      .run(item.tarea, item.completado ? 1 : 0, item.id)
  })

  // Fase 4 Database Handlers
  ipcMain.handle('db:get-qa-content-fase4', () => {
    return db.prepare('SELECT * FROM qa_content_fase4 LIMIT 1').get()
  })

  ipcMain.handle('db:save-qa-content-fase4', (_, content) => {
    return db.prepare('UPDATE qa_content_fase4 SET titulo = ?, objetivo = ?, practica = ? WHERE id = 1')
      .run(content.titulo, content.objetivo, content.practica)
  })

  ipcMain.handle('db:get-cronograma-fase4', () => {
    return db.prepare('SELECT * FROM cronograma_fase4').all()
  })

  ipcMain.handle('db:update-cronograma-item-fase4', (_, item) => {
    return db.prepare('UPDATE cronograma_fase4 SET tarea = ?, completado = ? WHERE id = ?')
      .run(item.tarea, item.completado ? 1 : 0, item.id)
  })

  // Fase 5 Database Handlers
  ipcMain.handle('db:get-qa-content-fase5', () => {
    return db.prepare('SELECT * FROM qa_content_fase5 LIMIT 1').get()
  })

  ipcMain.handle('db:save-qa-content-fase5', (_, content) => {
    return db.prepare('UPDATE qa_content_fase5 SET titulo = ?, objetivo = ?, practica = ? WHERE id = 1')
      .run(content.titulo, content.objetivo, content.practica)
  })

  ipcMain.handle('db:get-sugerencias-fase5', () => {
    return db.prepare('SELECT * FROM sugerencias_fase5').all()
  })

  ipcMain.handle('db:toggle-sugerencia-fase5', (_, item) => {
    return db.prepare('UPDATE sugerencias_fase5 SET completado = ? WHERE id = ?')
      .run(item.completado ? 1 : 0, item.id)
  })

  // Fase 6 Database Handlers
  ipcMain.handle('db:get-qa-content-fase6', () => {
    return db.prepare('SELECT * FROM qa_content_fase6 LIMIT 1').get()
  })

  ipcMain.handle('db:save-qa-content-fase6', (_, content) => {
    return db.prepare('UPDATE qa_content_fase6 SET titulo = ?, objetivo = ?, practica = ? WHERE id = 1')
      .run(content.titulo, content.objetivo, content.practica)
  })

  ipcMain.handle('db:get-sugerencias-fase6', () => {
    return db.prepare('SELECT * FROM sugerencias_fase6').all()
  })

  ipcMain.handle('db:toggle-sugerencia-fase6', (_, item) => {
    return db.prepare('UPDATE sugerencias_fase6 SET completado = ? WHERE id = ?')
      .run(item.completado ? 1 : 0, item.id)
  })

  // Portfolio Database Handlers
  ipcMain.handle('db:get-portfolio', () => {
    return db.prepare('SELECT * FROM portfolio_items').all()
  })

  ipcMain.handle('db:update-portfolio-item', (_, item) => {
    return db.prepare('UPDATE portfolio_items SET seccion = ?, proyecto = ?, herramienta = ?, ejemplo = ?, resultado = ? WHERE id = ?')
      .run(item.seccion, item.proyecto, item.herramienta, item.ejemplo, item.resultado, item.id)
  })

  ipcMain.handle('db:add-portfolio-item', () => {
    return db.prepare('INSERT INTO portfolio_items (seccion, proyecto, herramienta, ejemplo, resultado) VALUES (?, ?, ?, ?, ?)')
      .run('Nueva Sección', 'Nuevo Proyecto', 'Herramienta', 'Ejemplo...', 'Pendiente')
  })

  ipcMain.handle('db:delete-portfolio-item', (_, id) => {
    return db.prepare('DELETE FROM portfolio_items WHERE id = ?').run(id)
  })

  ipcMain.handle('db:export-portfolio', async (_, data) => {
    const { filePath } = await dialog.showSaveDialog({
      title: 'Exportar Portafolio QA',
      defaultPath: join(app.getPath('documents'), 'Mi_Portafolio_QA.json'),
      filters: [{ name: 'JSON Files', extensions: ['json'] }]
    })

    if (filePath) {
      writeFileSync(filePath, JSON.stringify(data, null, 2))
      return true
    }
    return false
  })

  ipcMain.handle('db:reset-all', async () => {
    try {
      // Drop all tables
      const tables = [
        'user_profile', 'portfolio_items', 
        'qa_content', 'cronograma', 
        'qa_content_fase2', 'cronograma_fase2',
        'qa_content_fase3', 'cronograma_fase3',
        'qa_content_fase4', 'cronograma_fase4',
        'qa_content_fase5', 'sugerencias_fase5',
        'qa_content_fase6', 'sugerencias_fase6'
      ]
      tables.forEach(table => {
        db.prepare(`DROP TABLE IF EXISTS ${table}`).run()
      })
      
      // Re-initialize (db.ts runs automatically on next reload or we can trigger it)
      // Actually, since we're in the same process, we just need to restart or call the init function.
      // Easiest is to tell the renderer to reload after this.
      return true
    } catch (err) {
      console.error('Reset error:', err)
      return false
    }
  })

  // Reminders Handlers
  ipcMain.handle('db:get-reminders', () => {
    return db.prepare('SELECT * FROM reminders ORDER BY id DESC').all()
  })

  ipcMain.handle('db:add-reminder', (_, texto) => {
    return db.prepare('INSERT INTO reminders (texto, fecha) VALUES (?, ?)').run(texto, new Date().toISOString())
  })

  ipcMain.handle('db:delete-reminder', (_, id) => {
    return db.prepare('DELETE FROM reminders WHERE id = ?').run(id)
  })

  ipcMain.handle('db:toggle-reminder', (_, id, completado) => {
    return db.prepare('UPDATE reminders SET completado = ? WHERE id = ?').run(completado, id)
  })

  // User Profile Handlers
  ipcMain.handle('db:get-profile', () => {
    return db.prepare('SELECT * FROM user_profile LIMIT 1').get()
  })

  ipcMain.handle('db:save-profile', (_, profile) => {
    return db.prepare('UPDATE user_profile SET nombre = ?, rol = ?, bio = ?, linkedin = ?, github = ?, whatsapp = ?, email = ?, foto = ? WHERE id = 1')
      .run(profile.nombre, profile.rol, profile.bio, profile.linkedin, profile.github, profile.whatsapp, profile.email, profile.foto)
  })

  // Auto Updates Check
  if (!is.dev) {
    autoUpdater.checkForUpdatesAndNotify()
  }

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
