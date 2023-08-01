import React from 'react'
import { CSRF_experimental } from '../auth'
import { Button } from './Button'

export const SignIn: React.FC = () => {
  return (
    <form action="/auth/signin/github" method="post">
      <Button>Sign In</Button>
      <CSRF_experimental />
    </form>
  )
}
