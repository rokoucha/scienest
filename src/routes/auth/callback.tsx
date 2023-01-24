import { type LoaderArgs } from '@remix-run/cloudflare'

export const loader = async ({ context, request }: LoaderArgs) => {
  return context.authenticator.authenticate('github', request, {
    successRedirect: '/',
    failureRedirect: '/auth/login',
  })
}
