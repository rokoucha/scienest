import React from 'react'
import { signOut } from '../../auth'
import { Button } from '../Button'

export const SignOut: React.FC = () => {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button>Sign Out</Button>
    </form>
  )
}
