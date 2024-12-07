import { SignedOut } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { auth } from '@clerk/nextjs/server'

const Navbar = async () => {

  const { userId } = await auth()
  console.log(userId)

  return (
    <div className='flex justify-between gap-4 bg-gray-50 p-4'>
      <Link href="/"> <Button>Home</Button> </Link>
      <Link href="/profile"> <Button>Profile</Button> </Link>

      <SignedOut>
        <Link href='/sign-up'>Sign up</Link>
      </SignedOut>

    </div>
  )
}

export default Navbar