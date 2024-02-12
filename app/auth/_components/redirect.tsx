'use client'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import React from 'react'

function RedirectAuth() {
  const pathname = usePathname()
  return (
    <Link
      href={pathname === '/auth/signin' ? '/auth/signup' : '/auth/signin'}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'absolute right-4 top-4 md:right-8 md:top-8'
      )}
    >
      {pathname === '/auth/signin' ? 'sign up' : 'sign in'}
    </Link>
  )
}

export default RedirectAuth
