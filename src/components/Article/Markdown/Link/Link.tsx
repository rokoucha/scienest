import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clsx } from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import { useMemo } from 'react'
import { linkIcon, linkText, wrapper } from './Link.css'

export function Link<RouteType>({
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
    <span className={wrapper}>
      <NextLink className={clsx(className, linkText)} {...props} />
      {isExternal && (
        <FontAwesomeIcon icon={faUpRightFromSquare} className={linkIcon} />
      )}
    </span>
  )
}
