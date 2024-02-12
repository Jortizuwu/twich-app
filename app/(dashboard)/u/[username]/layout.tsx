import { getSelfByUsername } from '@/lib/auth-services'
import { redirect } from 'next/navigation'
import React from 'react'
import Navbar from './_components/navbar'
import { Sidebar } from './_components/sidebar'
import { Container } from './_components/container'
interface CreatorLayoutProps {
    params: {
        username: string
    },
    children: React.ReactNode
}
async function CreatorLayout({ children, params }: CreatorLayoutProps) {

    const self = await getSelfByUsername(params.username)

    if (!self) {
        redirect("/")
    }

    console.log(self)

    return (
        <>
            <Navbar />
            <div className="flex h-full pt-14">
                <Sidebar />
                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}

export default CreatorLayout