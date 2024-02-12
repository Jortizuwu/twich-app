import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import React from 'react'

interface HintProps {
  label?: string
  children: React.ReactNode
  asChild?: boolean
  side?: 'top' | 'left' | 'right' | 'bottom'
  aling?: 'start' | 'center' | 'end'
}

export function Hint({ children, aling, asChild, label, side }: HintProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
        <TooltipContent
          className="text-black bg-white"
          side={side}
          align={aling}
        >
          <p className="font-semibold">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
