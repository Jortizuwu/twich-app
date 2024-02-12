import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'

import { AuthSlice, createAuthSlice } from './slice/auth'
import { SidebarSlice, createSidebarSlice } from './slice/sidebar'

const usePersistedStore = create<AuthSlice & SidebarSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
        ...createSidebarSlice(...a),
      }),
      {
        name: 'bound-persisted-store',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
)

export default usePersistedStore
