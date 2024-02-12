'use client'
import { usePathname } from 'next/navigation'
import React from 'react'

const resp: Record<string, { title: string; desc: string }> = {
  signin: {
    title: 'Sign in',
    desc: 'Enter your user name and password below to sign in your account',
  },
  signup: {
    title: 'Sign up',
    desc: 'Enter your data below to sign up your account',
  },
}

function HeaderAuth() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col space-y-2 text-center mb-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        {' '}
        {resp[pathname.substring(6)]?.title}
      </h1>
      <p className="text-sm text-muted-foreground">
        {resp[pathname.substring(6)]?.desc}
      </p>
    </div>
  )
}

export default HeaderAuth
