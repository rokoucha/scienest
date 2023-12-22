import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clsx } from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import { useMemo } from 'react'
import { linkIcon, linkText, wrapper } from './Link.css'

export function Link<RouteType>({
  children,
  className,
  ...props
}: LinkProps<RouteType>): JSX.Element {
  const isExternal = useMemo<boolean>(() => {
    if (props.href === undefined) return false

    try {
      new URL(props.href as string)
      return true
    } catch {
      return false
    }
  }, [props.href])

  return (
    <NextLink className={clsx(className, wrapper)} {...props}>
      <span className={linkText}>{children}</span>
      {isExternal && (
        <FontAwesomeIcon icon={faUpRightFromSquare} className={linkIcon} />
      )}
    </NextLink>
  )
}
