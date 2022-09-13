import create from 'zustand'

interface State {
  sidebarOpen: boolean
  setSidebar: (isOpen: boolean) => void
  selectedContactIdx: number | null
  setSelectedContactIdx: (idx: number | null) => void
}

export const useStore = create<State>()(set => ({
  sidebarOpen: true,
  selectedContactIdx: null,

  setSidebar: (isOpen: boolean) => {
    set({ sidebarOpen: isOpen })
  },

  setSelectedContactIdx: (idx: number | null) => {
    set({ selectedContactIdx: idx })
  }
}))
