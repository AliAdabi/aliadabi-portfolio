import { create } from 'zustand'

export const useStore = create((set) => ({
  phase: 'idle', // idle | zooming | screen
  activeProject: null,
  setPhase: (phase) => set({ phase }),
  setActiveProject: (project) => set({ activeProject: project }),
}))