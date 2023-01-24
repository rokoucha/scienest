import { type ActionArgs } from '@remix-run/cloudflare'

export const loader = async ({ context, request }: ActionArgs) => {
  await context.authenticator.logout(request, { redirectTo: '/' })
}
