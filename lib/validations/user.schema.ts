import { z } from 'zod'

export const SignupUserSchema = z
  .object({
    username: z
      .string({
        required_error: 'user name is required',
      })
      .min(1, 'user name is required'),
    imageUrl: z.string().optional(),
    bio: z.string().optional(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(1, 'Password is required')
      .min(8, 'Password must be more than 8 characters'),
    passwordConfirm: z
      .string({
        required_error: 'Confirm your password',
      })
      .min(1, 'Confirm your password'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ['passwordConfirm'],
    message: 'Passwords do not match',
  })

export const SigninUserSchema = z.object({
  username: z
    .string({
      required_error: 'user name is required',
    })
    .min(1, 'user name is required'),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .trim()
    .min(1, 'Password is required'),
})

export type SigninUserInput = z.infer<typeof SigninUserSchema>
export type SignupUserInput = z.infer<typeof SignupUserSchema>
