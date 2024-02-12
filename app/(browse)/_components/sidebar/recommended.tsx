'use client'

import React from 'react'
import { User } from '@prisma/client'

import UserItem, { UserItemSkeleton } from './user-item'
import { Skeleton } from '@/components/ui/skeleton'
import usePersistedStore from '@/store'

interface RecommendedProps {
  data: User[]
}

function Recommended({ data }: RecommendedProps) {
  const { collapsed } = usePersistedStore()

  const showLabel = !collapsed && data.length > 0

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-xs text-muted-foreground">Recommended</p>
        </div>
      )}
      <ul className="space-y-2 px-2">
        {data.map((user) => (
          <UserItem
            key={user.uid}
            username={user.username}
            imageUrl={user.imageUrl ? user.imageUrl : ''}
          />
        ))}
      </ul>
    </div>
  )
}

export const RecommendedSkeleton = () => {
  return (
    <ul className="px-2">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}

export default Recommended
