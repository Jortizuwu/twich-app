import { headers } from 'next/headers'
import { prisma } from './db'

export const getSelf = async () => {
  const uid = headers().get('X-USER-ID')

  if (!uid) return null

  const self = await prisma.user.findUnique({
    where: {
      uid,
    },
  })
  return self
}
export const getSelfByUsername = async (username:string) => {
  const currentuser = await getSelf()

  const user = await prisma.user.findUnique({
    where: {
      username
    },
  })

  if(user?.username !== currentuser?.username ) {
    //  throw new Error("Unauthorized")
  }

  return user
}
