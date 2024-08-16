import React from 'react'
import { signIn } from '../../auth'
import { Button } from '../Button'

export const SignIn: React.FC = () => {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('github')
      }}
      method="post"
    >
      <Button>Sign In</Button>
    </form>
  )
}
