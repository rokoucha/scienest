import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clsx } from 'clsx'
import NextLink, { LinkProps } from 'next/link'
import React, { useMemo } from 'react'
import { buttonLikeLink, linkIcon, linkText, wrapper } from './Link.css'

export function Link<RouteType>({
  children,
  className,
  href,
  ...props
}: LinkProps<RouteType>): React.ReactNode {
  const isExternal = useMemo<boolean>(() => {
    if (href === undefined) return false

    try {
      new URL(String(href))
      return true
    } catch {
      return false
    }
  }, [href])

  const isButtonLike =
    !isExternal && children && String(children).startsWith('#')

  const encodedHref = useMemo<URL>(() => {
    return new URL(String(href), process.env.BASE_URL)
  }, [href])

  return (
    <NextLink
      className={clsx(className, wrapper, isButtonLike && buttonLikeLink)}
      href={encodedHref}
      {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      <span className={clsx(!isButtonLike && linkText)}>{children}</span>
      {isExternal && (
        <FontAwesomeIcon icon={faUpRightFromSquare} className={linkIcon} />
      )}
    </NextLink>
  )
}
