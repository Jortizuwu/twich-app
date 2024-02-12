import { SigninUserInput } from '@/lib/validations/user.schema'
import { authService } from '@/shared/services/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const defaultValues = {
  username: '',
  password: '',
}

export const useDefaultValues = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (data: SigninUserInput) => {
    setIsLoading(true)
    try {
      const response = await authService.signin(data)
      window.localStorage.setItem('token', response.token)
      setIsLoading(false)
      router.push('/')
    } catch (error) {
      setIsLoading(false)
    }
  }

  return {
    submit: handleSubmit,
    defaultValues,
    isLoading,
  }
}
