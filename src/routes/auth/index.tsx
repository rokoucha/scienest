import { redirect, type ActionArgs } from '@remix-run/cloudflare'

export const loader = async () => {
  return redirect('/auth/login')
}

export const action = async ({ context, request }: ActionArgs) => {
  return context.authenticator.authenticate('github', request)
}
