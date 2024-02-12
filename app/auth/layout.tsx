import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import Logo from './_components/logo'
import RedirectAuth from './_components/redirect'

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen">
      <div className="md:hidden">
        <Logo />
      </div>
      <div className="container relative hidden h-full flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <RedirectAuth />
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            <Logo />
          </div>
          RedirectAuth
        </div>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <div className="lg:p-8">
            {children}
            <section className="max-w-full mx-auto">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t mb-3" />
                </div>
              </div>
              <p className="text-center mt-3 text-sm text-muted-foreground">
                By clicking continue, you agree to our
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>
                and
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthLayout
