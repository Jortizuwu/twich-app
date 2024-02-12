import { getSelf } from './auth-services'
import { prisma } from './db'

export const getRecommended = async () => {
  try {
    const user = await getSelf()
    let users = []

    if (!user) {
      users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else {
      users = await prisma.user.findMany({
        where: {
          AND: [
            {
              NOT: {
                uid: user.uid,
              },
            },
            {
              NOT: {
                followedBy: {
                  some: {
                    followerId: user.uid,
                  },
                },
              },
            }, {
              NOT:{
                blocking:{
                  some:{
                    blockedId:user.uid
                  }
                }
              }
            }
          ],
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }

    return users
  } catch (error) {
    console.error('Error fetching recommended users:', error)
    throw error
  }
}
