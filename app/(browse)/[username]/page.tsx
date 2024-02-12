import { isFollowingUser } from '@/lib/follow-service'
import { getUserByUsername } from '@/lib/user-service'
import { notFound } from 'next/navigation'
import React, { use } from 'react'
import Actions from './_components/actions'
import { isBlockedByUser } from '@/lib/block-service'

interface UserPageProps {
  params: {
    username: string
  }
}

async function UserPage({ params }: UserPageProps) {
  const user = await getUserByUsername(params.username)

  if (!user) {
    notFound()
  }

  const isFollowing = await isFollowingUser(user.uid)
  const isBlock = await isBlockedByUser(user.uid)

  if(isBlock) {
     notFound()
  }

  return (
    <div>
      UserPage: {params.username}
      <Actions isFollowing={isFollowing} uid={user.uid} />
    </div>
  )
}

export default UserPage
