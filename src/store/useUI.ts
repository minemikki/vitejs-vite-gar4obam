import { create } from 'zustand'

interface UIState {
  quickAddOpen: boolean
  commandOpen: boolean
  notificationsOpen: boolean
  mobileNavOpen: boolean
  setQuickAdd: (v: boolean) => void
  setCommand: (v: boolean) => void
  setNotifications: (v: boolean) => void
  setMobileNav: (v: boolean) => void
}

export const useUI = create<UIState>((set) => ({
  quickAddOpen: false,
  commandOpen: false,
  notificationsOpen: false,
  mobileNavOpen: false,
  setQuickAdd: (v) => set({ quickAddOpen: v }),
  setCommand: (v) => set({ commandOpen: v }),
  setNotifications: (v) => set({ notificationsOpen: v }),
  setMobileNav: (v) => set({ mobileNavOpen: v }),
}))
