import Link from 'next/link'
import { Clapperboard } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getSelf } from '@/lib/auth-services'

const Actions = async () => {
  const user = await getSelf()
  return (
    <div className="">
      {!user && (
        <Button size="sm" variant="outline">
          <Link href="/auth/signin">Sign in</Link>
        </Button>
      )}
      {user && (
        <div className="flex items-center gap-x-4">
          <Button
            size="sm"
            variant="ghost"
            className="text-muted-foreground hover:text-primary"
            asChild
          >
            <Link href={`/u/${user.username}`}>
              <Clapperboard className="h-5 w-5 lg:mr-2" />
              <span className="hidden lg:block">Dashboard</span>
            </Link>
          </Button>
          <Avatar>
            <AvatarImage src="https://github.com/jortizuwu.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  )
}

export default Actions
