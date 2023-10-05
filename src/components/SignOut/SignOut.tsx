import React from 'react'
import { Button } from '../Button'

export const SignOut: React.FC = () => {
  return (
    <form action="/auth/signout" method="post">
      <Button>Sign Out</Button>
    </form>
  )
}
