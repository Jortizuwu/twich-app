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
  const existingBlock = await prisma.block.findUnique({
    where: {
      blockerId_blockedId: {
        blockedId: uid,
        blockerId: otherUid,
      },
    },
  })
  return existingBlock
}

// export const isBlockedByUser = async (id:string) => {
//   try {
//     const self = await getSelf()
//     if (!self) {
//       return []
//     }

//     return prisma.follow.findMany({
//       where: {
//         followerId: self.uid,
//       },
//       include: {
//         following: true,
//       },
//     })
//   } catch (error) {
//     return []
//   }
// }

export const isBlockedByUser = async (id: string) => {
  try {
    const self = await getSelf()

    if (!self) return false

    const otherUser = await getOtherUser(id)

    if (!otherUser) {
      throw new Error('User not found')
    }

    if (otherUser.uid === self.uid) {
      return false
    }

    
    const existingBlock = await getExsitsUser(self.uid, otherUser.uid)
    return !!existingBlock
  } catch (error) {
    return false
  }
}

export const blockUser = async (id: string) => {
  const self = await getSelf()

  if (!self) return false

  const otherUser = await getOtherUser(id)

  if (!otherUser) {
    throw new Error('User not found')
  }

  if (otherUser.uid === self.uid) {
    throw new Error('Cannot blocked yourself')
  }

  const existingBlock = await getExsitsUser(self.uid, otherUser.uid)


  if (existingBlock) {
    throw new Error('Already blocked')
  }

  const block = await prisma.block.create({
    data: {
      blockerId: self.uid,
      blockedId: otherUser.uid,
    },
    include: {
      blocked: true,
      blocker: true,
    },
  })

  return block
}

export const unBlockUser = async (id: string) => {
  const self = await getSelf()

  if (!self) return false

  const otherUser = await getOtherUser(id)

  if (!otherUser) {
    throw new Error('User not found')
  }

  if (otherUser.uid === self?.uid) {
    throw new Error('Cannot unfollow yourself')
  }

  const existingBlock = await getExsitsUser(self.uid, otherUser.uid)


  if (!existingBlock) {
    throw new Error('Not blocked')
  }

  const unblock = await prisma.block.delete({
    where: {
      id: existingBlock.id,
    },
    include: {
      blocked: true,
    },
  })
  return unblock
}
