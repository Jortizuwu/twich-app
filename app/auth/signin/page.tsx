'use client'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Icons } from '@/components/icons'
import { InputLabel } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import {
  SigninUserSchema,
  SigninUserInput,
} from '@/lib/validations/user.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDefaultValues } from './_components/utils/form-props'
import HeaderAuth from '../_components/header'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

function SigninAuthForm({ className, ...props }: UserAuthFormProps) {
  const { defaultValues, submit, isLoading } = useDefaultValues()

  const methods = useForm<SigninUserInput>({
    resolver: zodResolver(SigninUserSchema),
    defaultValues,
  })
  const {
    handleSubmit,
    formState: { errors },
  } = methods

  return (
    <React.Fragment>
      <HeaderAuth />
      <div className={cn('grid gap-6', className)}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(submit)}>
            <div className="grid gap-3">
              <InputLabel
                id="username"
                type="text"
                disabled={isLoading}
                label="User Name"
                name="username"
                placeholder="user name"
                error={!!errors.username}
                errorMessage={errors.username?.message}
              />
              <InputLabel
                id="password"
                disabled={isLoading}
                label="Password"
                type="password"
                name="password"
                placeholder="**************"
                error={!!errors.password}
                errorMessage={errors.password?.message}
              />
              <Button disabled={isLoading}>
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In with Email
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </React.Fragment>
  )
}

export default SigninAuthForm
