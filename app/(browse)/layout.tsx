import React, { Suspense } from 'react'
import Navbar from './_components/navbar'
import Sidebar, { SidebarSkeleton } from './_components/sidebar'
import Container from './_components/container'

function LayoutHome({ children }: { children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Navbar />
      <div className="flex h-full pt-14">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </React.Fragment>
  )
}

export default LayoutHome
