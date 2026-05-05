import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      getQAContent: () => Promise<any>
      saveQAContent: (content: any) => Promise<any>
      getCronograma: () => Promise<any[]>
      updateCronogramaItem: (item: any) => Promise<any>
      // Fase 2
      getQAContentFase2: () => Promise<any>
      saveQAContentFase2: (content: any) => Promise<any>
      getCronogramaFase2: () => Promise<any[]>
      updateCronogramaItemFase2: (item: any) => Promise<any>
      // Fase 3
      getQAContentFase3: () => Promise<any>
      saveQAContentFase3: (content: any) => Promise<any>
      getCronogramaFase3: () => Promise<any[]>
      updateCronogramaItemFase3: (item: any) => Promise<any>
      // Fase 4
      getQAContentFase4: () => Promise<any>
      saveQAContentFase4: (content: any) => Promise<any>
      getCronogramaFase4: () => Promise<any[]>
      updateCronogramaItemFase4: (item: any) => Promise<any>
      // Fase 5
      getQAContentFase5: () => Promise<any>
      saveQAContentFase5: (content: any) => Promise<any>
      getSugerenciasFase5: () => Promise<any[]>
      toggleSugerenciaFase5: (item: any) => Promise<any>
      // Fase 6
      getQAContentFase6: () => Promise<any>
      saveQAContentFase6: (content: any) => Promise<any>
      getSugerenciasFase6: () => Promise<any[]>
      toggleSugerenciaFase6: (item: any) => Promise<any>
      // Portfolio
      getPortfolio: () => Promise<any[]>
      updatePortfolioItem: (item: any) => Promise<any>
      addPortfolioItem: () => Promise<any>
      deletePortfolioItem: (id: number) => Promise<any>
      exportPortfolio: (data: any[]) => Promise<boolean>
      // Profile
      getProfile: () => Promise<any>
      saveProfile: (profile: any) => Promise<any>
      resetAll: () => Promise<boolean>
      getReminders: () => Promise<any[]>
      addReminder: (texto: string) => Promise<any>
      deleteReminder: (id: number) => Promise<any>
      toggleReminder: (id: number, completado: number) => Promise<any>
    }
  }
}
