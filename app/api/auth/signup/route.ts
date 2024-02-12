import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { hash } from 'bcryptjs'

import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/db'

import {
  SignupUserInput,
  SignupUserSchema,
} from '@/lib/validations/user.schema'

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as SignupUserInput
    const data = SignupUserSchema.parse(body)

    const hashedPassword = await hash(data.password, 12)

    const user = await prisma.user.create({
      data: {
        bio: data.bio,
        imageUrl: data.imageUrl,
        username: data.username,
        password: hashedPassword,
        stream:{
          create:{
            name:`${data.username}s stream`
          }
        }
      },
    })

    const response = new NextResponse(
      JSON.stringify({
        status: 'success',
        data: { user: { ...user, password: undefined } },
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    )

    return response
  } catch (error: any) {
    if (error instanceof ZodError) {
      return getErrorResponse(400, 'failed validations', error)
    }

    if (error.code === 'P2002') {
      return getErrorResponse(409, 'user with that email already exists')
    }

    return getErrorResponse(500, error.message)
  }
}
