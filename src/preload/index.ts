import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  getQAContent: () => ipcRenderer.invoke('db:get-qa-content'),
  saveQAContent: (content) => ipcRenderer.invoke('db:save-qa-content', content),
  getCronograma: () => ipcRenderer.invoke('db:get-cronograma'),
  updateCronogramaItem: (item) => ipcRenderer.invoke('db:update-cronograma-item', item),
  // Fase 2
  getQAContentFase2: () => ipcRenderer.invoke('db:get-qa-content-fase2'),
  saveQAContentFase2: (content) => ipcRenderer.invoke('db:save-qa-content-fase2', content),
  getCronogramaFase2: () => ipcRenderer.invoke('db:get-cronograma-fase2'),
  updateCronogramaItemFase2: (item) => ipcRenderer.invoke('db:update-cronograma-item-fase2', item),
  // Fase 3
  getQAContentFase3: () => ipcRenderer.invoke('db:get-qa-content-fase3'),
  saveQAContentFase3: (content) => ipcRenderer.invoke('db:save-qa-content-fase3', content),
  getCronogramaFase3: () => ipcRenderer.invoke('db:get-cronograma-fase3'),
  updateCronogramaItemFase3: (item) => ipcRenderer.invoke('db:update-cronograma-item-fase3', item),
  // Fase 4
  getQAContentFase4: () => ipcRenderer.invoke('db:get-qa-content-fase4'),
  saveQAContentFase4: (content) => ipcRenderer.invoke('db:save-qa-content-fase4', content),
  getCronogramaFase4: () => ipcRenderer.invoke('db:get-cronograma-fase4'),
  updateCronogramaItemFase4: (item) => ipcRenderer.invoke('db:update-cronograma-item-fase4', item),
  // Fase 5
  getQAContentFase5: () => ipcRenderer.invoke('db:get-qa-content-fase5'),
  saveQAContentFase5: (content) => ipcRenderer.invoke('db:save-qa-content-fase5', content),
  getSugerenciasFase5: () => ipcRenderer.invoke('db:get-sugerencias-fase5'),
  toggleSugerenciaFase5: (item) => ipcRenderer.invoke('db:toggle-sugerencia-fase5', item),
  // Fase 6
  getQAContentFase6: () => ipcRenderer.invoke('db:get-qa-content-fase6'),
  saveQAContentFase6: (content) => ipcRenderer.invoke('db:save-qa-content-fase6', content),
  getSugerenciasFase6: () => ipcRenderer.invoke('db:get-sugerencias-fase6'),
  toggleSugerenciaFase6: (item) => ipcRenderer.invoke('db:toggle-sugerencia-fase6', item),
  // Portfolio
  getPortfolio: () => ipcRenderer.invoke('db:get-portfolio'),
  updatePortfolioItem: (item) => ipcRenderer.invoke('db:update-portfolio-item', item),
  addPortfolioItem: () => ipcRenderer.invoke('db:add-portfolio-item'),
  deletePortfolioItem: (id) => ipcRenderer.invoke('db:delete-portfolio-item', id),
  exportPortfolio: (data) => ipcRenderer.invoke('db:export-portfolio', data),
  // Profile
  getProfile: () => ipcRenderer.invoke('db:get-profile'),
  saveProfile: (profile) => ipcRenderer.invoke('db:save-profile', profile),
  resetAll: () => ipcRenderer.invoke('db:reset-all'),
  // Reminders
  getReminders: () => ipcRenderer.invoke('db:get-reminders'),
  addReminder: (texto) => ipcRenderer.invoke('db:add-reminder', texto),
  deleteReminder: (id) => ipcRenderer.invoke('db:delete-reminder', id),
  toggleReminder: (id, completado) => ipcRenderer.invoke('db:toggle-reminder', id, completado)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
