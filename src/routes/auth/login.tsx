import { Form } from '@remix-run/react'

export default function Login() {
  return (
    <Form action="/auth" method="post">
      <button>Login with GitHub</button>
    </Form>
  )
}
