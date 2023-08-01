import React from 'react'
import { CSRF_experimental } from '../auth'
import { Button } from './Button'

export const SignOut: React.FC = () => {
  return (
    <form action="/auth/signout" method="post">
      <Button>Sign Out</Button>
      <CSRF_experimental />
    </form>
  )
}
