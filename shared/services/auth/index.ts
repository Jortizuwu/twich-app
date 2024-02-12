import { BASE_API } from '@/shared/api'
import { IsigninResponse, IsignupResponse } from '@/shared/types/user'

type ParamsSignin = { username: string; password: string }
type ParamsSignup = {
  username: string
  password: string
  passwordConfirm: string
}

export const authService = {
  signin: async (params: ParamsSignin) => {
    const { data } = await BASE_API.post<IsigninResponse>('/auth/signin', {
      ...params,
    })
    return data
  },
  signup: async (params: ParamsSignup) => {
    const { data } = await BASE_API.post<IsignupResponse>(
      '/auth/signup',
      params
    )
    return data
  },
}
