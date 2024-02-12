import { SignupUserInput } from '@/lib/validations/user.schema'
import { authService } from '@/shared/services/auth'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const defaultValues = {
  username: '',
  password: '',
  passwordConfirm: '',
}

export const useDefaultValues = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (data: SignupUserInput) => {
    setIsLoading(true)
    try {
      const response = await authService.signup(data)
      router.push('/')
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return {
    submit: handleSubmit,
    defaultValues,
    isLoading,
  }
}
