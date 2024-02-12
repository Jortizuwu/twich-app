'use server'

import { followUser, unfollowUser } from '@/lib/follow-service'
import { revalidatePath } from 'next/cache'

export const onFollow = async (id: string) => {
 
    const followedUser = await followUser(id)

    revalidatePath('/')

    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`)
    }

    return followedUser

}

export const onUnFollow = async (id: string) => {

    const unfollowdUser = await unfollowUser(id)

    revalidatePath('/')

    if (unfollowdUser) {
      revalidatePath(`/${unfollowdUser.following.username}`)
    }

    return unfollowdUser

}
