import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Actions = () => {
  return (
    <div className="flex items-center justify-end gap-x-2">
      <Button 
        size="sm"
        variant="ghost"
        className='text-muted-foreground hover:text-primary'
        asChild
      >
        <Link href="/">
          exit
        </Link>
      </Button>

    </div>
  )
}

export default Actions
