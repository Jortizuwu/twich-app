import { compare } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'

import { getEnvVariable, getErrorResponse } from '@/lib/helpers'
import {
  SigninUserInput,
  SigninUserSchema,
} from '@/lib/validations/user.schema'
import { prisma } from '@/lib/db'
import { signJWT } from '@/lib/token'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SigninUserInput
    const data = SigninUserSchema.parse(body)

    const user = await prisma.user.findUnique({
      where: { username: data.username },
    })

    if (!user || !(await compare(data.password, user.password))) {
      return getErrorResponse(401, 'Invalid email or password')
    }

    const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN')
    const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60

    const token = await signJWT(
      { sub: user.uid },
      { exp: `${JWT_EXPIRES_IN}h` }
    )

    const cookieOptions = {
      name: 'token',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: tokenMaxAge,
    }

    const response = new NextResponse(
      JSON.stringify({
        status: 'success',
        token,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    )

    await Promise.all([
      response.cookies.set(cookieOptions),
      response.cookies.set({
        name: 'logged-in',
        value: 'true',
        maxAge: tokenMaxAge,
      }),
    ])

    return response
  } catch (error) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'Validation failed', error)
    }

    return getErrorResponse(500, 'Internal server error')
  }
}
