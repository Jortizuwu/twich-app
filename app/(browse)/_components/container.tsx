'use client'
import React, { useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

import { cn } from '@/lib/utils'
import usePersistedStore from '@/store'

interface ContainerProps {
  children: React.ReactNode
}

function Container({ children }: ContainerProps) {
  const matches = useMediaQuery('(max-width: 1020px)')
  const { collapsed, onCollapse, onExpand } = usePersistedStore()

  useEffect(() => {
    if (matches) {
      onCollapse()
    } else {
      onExpand()
    }
  }, [matches, onCollapse, onExpand])

  return (
    <div
      className={cn('flex-1', collapsed ? 'ml-[70px]' : 'ml-[70px] lg:ml-60')}
    >
      {children}
    </div>
  )
}

export default Container
