import { getErrorResponse } from '@/lib/helpers'
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const uid = req.headers.get('X-USER-ID')

  if (!uid) {
    return getErrorResponse(
      401,
      'You are not logged in, please provide token to gain access'
    )
  }

  const user = await prisma.user.findUnique({ where: { uid } })

  return NextResponse.json({
    status: 'success',
    data: { user: { ...user, password: undefined } },
  })
}
