import { IsigninResponse } from '@/shared/types/user'
import { User } from '@prisma/client'
import { StateCreator } from 'zustand'

export interface AuthSlice {
  // user: User | null
  token: string
  setUser: (payload: IsigninResponse) => void
  removeUser: () => void
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set
) => ({
  // user: null,
  token: '',
  setUser: ({ token }) => set({ token }),
  removeUser: () => set({ token: '' }),
})
