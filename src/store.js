import { create } from 'zustand'

export const useStore = create((set) => ({
  phase: 'idle', // idle | zooming | screen | about | contact
  activeProject: null,
  highlightedIndex: 0,
  setPhase: (phase) => set({ phase }),
  setActiveProject: (project) => set({ activeProject: project }),
  setHighlightedIndex: (i) => set({ highlightedIndex: i }),
}))