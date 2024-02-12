'use client'

import { cn } from '@/lib/utils'
import React from 'react'
import { ToggleSkeleton } from './toggle'
import { RecommendedSkeleton } from './recommended'
import { useIsClient } from 'usehooks-ts'
import usePersistedStore from '@/store'
import { FollowingSkeleton } from './following'

interface WrapperProps {
  children: React.ReactNode
}

function Wrapper({ children }: WrapperProps) {
  const isClient = useIsClient()
  const { collapsed } = usePersistedStore()

  if (!isClient)
    return (
      <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50">
        <ToggleSkeleton />
        <FollowingSkeleton />
        <RecommendedSkeleton />
      </aside>
    )

  return (
    <aside
      className={cn(
        'fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  )
}

export default Wrapper
