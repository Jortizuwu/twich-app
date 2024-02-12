'use client'
import { onBlock, onUnBlock } from '@/actions/block'
import { onFollow, onUnFollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionsProps {
  isFollowing: boolean
  uid: string
}

function Actions({ isFollowing, uid }: ActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handleFollow = () => {
    startTransition(() => {
      onFollow(uid)
        .then((data) => toast.success(`You are now  following ${data}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }
  const handleUnFollow = () => {
    startTransition(() => {
      onUnFollow(uid)
        .then((data) => toast.success(`You have unfollowed ${data}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }
  const handleBlock = () => {
    startTransition(() => {
      onBlock(uid)
        .then((data) => toast.success(`You are now block ${data}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }
  const handleUnBlock = () => {
    startTransition(() => {
      onUnBlock(uid)
        .then((data) => toast.success(`You have unblocked ${data}`))
        .catch(() => toast.error('Something went wrong'))
    })
  }

  const onClick = () => {
    if (isFollowing) {
      handleUnFollow()
    } else {
      handleFollow()
    }
  }

  return (
    <>
    
      <Button
        disabled={isPending}
        onClick={onClick}
        variant="secondary"
        className="w-full"
      >
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Button>
    </>
  )
}

export default Actions
