import { clsx } from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import { link } from './Link.css'

export function Link<RouteType>({
  className,
  ...props
}: LinkProps<RouteType>): JSX.Element {
  return <NextLink className={clsx(className, link)} {...props} />
}
