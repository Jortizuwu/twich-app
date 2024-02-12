import React from 'react'

import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import Image from 'next/image'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

function Logo({ ...props }: LogoProps) {
  return (
    <div className="flex flex-col items-center gap-y-4" {...props}>
      <div className="bg-white rounded-full p-1">
        <Image alt="logo" src="/spooky.svg" height="30" width="30" />
      </div>
      <div className={cn('flex flex-col items-center', font.className)}>
        <p className="text-xl font-semibold">gamehub</p>
        <p className="text-sm text-muted-foreground">Les&apos;t play</p>
      </div>
    </div>
  )
}

export default Logo
