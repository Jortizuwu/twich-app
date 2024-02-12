import { getSelf } from './auth-services'
import { prisma } from './db'

const getOtherUser = async (uid: string) => {
  return await prisma.user.findUnique({
    where: {
      uid,
    },
  })
}


const getExsitsUser = async (uid: string, otherUid:string) => {
  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: uid,
      followingId: otherUid,
    },
  })
  return existingFollow
}


export const getFollowedUsers = async () => {
  try {
    const self = await getSelf()
    if (!self) {
      return []
    }

    return prisma.follow.findMany({
      where: {
        followerId: self.uid,
        following:{
          blocking:{
            none:{
              blockedId:self.uid
            }
          }
        }
      },
      include: {
        following: true,
      },
    })
  } catch (error) {
    return []
  }
}

export const isFollowingUser = async (id: string) => {
  try {
    const self = await getSelf()

    if (!self) return false

    const otherUser = await getOtherUser(id)

    if (!otherUser) {
      throw new Error('User not found')
    }

    if (otherUser.uid === self.uid) {
      return true
    }
    const existingFollow = await getExsitsUser(self.uid, otherUser.uid)

    return !!existingFollow
  } catch (error) {
    return false
  }
}

export const followUser = async (id: string) => {
  const self = await getSelf()

  if (!self) return false

  const otherUser = await getOtherUser(id)

  if (!otherUser) {
    throw new Error('User not found')
  }

  if (otherUser.uid === self.uid) {
    throw new Error('Cannot follow yourself')
  }

  const existingFollow = await getExsitsUser(self.uid, otherUser.uid)

  if (existingFollow) {
    throw new Error('Already following')
  }

  const follow = await prisma.follow.create({
    data: {
      followerId: self.uid,
      followingId: otherUser.uid,
    },
    include: {
      follower: true,
      following: true,
    },
  })

  return follow
}

export const unfollowUser = async (id: string) => {
  const self = await getSelf()

  if (!self) return false

  const otherUser = await getOtherUser(id)

  if (!otherUser) {
    throw new Error('User not found')
  }

  if (otherUser.uid === self?.uid) {
    throw new Error('Cannot unfollow yourself')
  }

  const existingFollow = await getExsitsUser(self.uid, otherUser.uid)


  if (!existingFollow) {
    throw new Error('Not following')
  }

  const follow = await prisma.follow.delete({
    where: {
      id: existingFollow.id,
    },
    include: {
      following: true,
    },
  })
  return follow
}
