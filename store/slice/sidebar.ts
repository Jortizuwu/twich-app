import { StateCreator } from 'zustand'

export interface SidebarSlice {
  collapsed: boolean
  onExpand: () => void
  onCollapse: () => void
}

export const createSidebarSlice: StateCreator<
  SidebarSlice,
  [],
  [],
  SidebarSlice
> = (set) => ({
  collapsed: false,
  onCollapse: () =>
    set(() => ({
      collapsed: true,
    })),
  onExpand: () =>
    set(() => ({
      collapsed: false,
    })),
})
