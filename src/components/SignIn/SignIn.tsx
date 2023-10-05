import React from 'react'
import { Button } from '../Button'

export const SignIn: React.FC = () => {
  return (
    <form action="/auth/signin/github" method="post">
      <Button>Sign In</Button>
    </form>
  )
}
