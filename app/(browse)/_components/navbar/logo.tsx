import React from 'react'

import { Poppins } from 'next/font/google'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
})

export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

function Logo() {
  return (
    <Link href="/">
      <div className="flex items-center gap-x-4 hover:opacity-75 transition">
        <div className="bg-white rounded-full mr-12 lg:mr-0 shrink-0">
          <Image alt="logo" src="/spooky.svg" height="32" width="32" />
        </div>
        <div className={cn('hidden lg:block', font.className)}>
          <p className="text-xl font-semibold">gamehub</p>
          <p className="text-sm text-muted-foreground">Les&apos;t play</p>
        </div>
      </div>
    </Link>
  )
}

export default Logo
