import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { clsx } from 'clsx'
import Link, { LinkProps } from 'next/link'
import React, { useMemo } from 'react'
import { TwitterCard } from '../TwitterCard'
import { ButtonLikeLink } from './ButtonLikeLink'
import { linkIcon, linkText, wrapper } from './MarkdownLink.css'

export function MarkdownLink<RouteType>({
  children,
  className,
  ...props
}: LinkProps<RouteType>): React.ReactNode {
  const inline = useMemo<boolean>(() => {
    return !Boolean(Array.isArray(children) ? children.at(0) : children)
  }, [children])

  const card = useMemo<boolean>(() => {
    return (Array.isArray(children) ? children.at(0) : children) === props.href
  }, [children, props.href])

  const url = useMemo<URL | string>(() => {
    if (props.href === undefined) return ''

    try {
      return new URL(props.href.toString())
    } catch {
      return props.href.toString()
    }
  }, [props.href])

  const external = typeof url !== 'string'

  // Old
  if (
    !external &&
    ((Array.isArray(children) && children.at(0)?.startsWith('#')) ||
      (typeof children === 'string' && children.startsWith('#')))
  ) {
    return (
      <ButtonLikeLink className={className} children={children} {...props} />
    )
  }

  // hash
  if (inline && !external) {
    return (
      <ButtonLikeLink
        {...props}
        className={className}
        children={`#${url}`}
        href={`/${url}`}
      />
    )
  }

  // twitter
  if (
    card &&
    external &&
    url.hostname === 'twitter.com' &&
    url.pathname.split('/').at(2) === 'status' &&
    url.pathname.split('/').at(3) !== undefined
  ) {
    return <TwitterCard tweetId={url.pathname.split('/').at(3)!} />
  }

  return (
    <Link
      className={clsx(className, wrapper)}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      <span className={clsx(linkText)}>{children}</span>
      {external && (
        <FontAwesomeIcon icon={faUpRightFromSquare} className={linkIcon} />
      )}
    </Link>
  )
}
