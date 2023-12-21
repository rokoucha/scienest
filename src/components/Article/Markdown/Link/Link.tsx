import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clsx } from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import { linkIcon, linkText, wrapper } from './Link.css'

export function Link<RouteType>({
  className,
  ...props
}: LinkProps<RouteType>): JSX.Element {
  return (
    <span className={wrapper}>
      <NextLink className={clsx(className, linkText)} {...props} />
      <FontAwesomeIcon icon={faUpRightFromSquare} className={linkIcon} />
    </span>
  )
}
