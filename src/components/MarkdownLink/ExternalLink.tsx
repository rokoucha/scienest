import { faUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import React from 'react'
import { linkIcon, linkText, wrapper } from './MarkdownLink.css'

export function ExternalLink<RouteType>({
  children,
  className,
  ...props
}: LinkProps<RouteType>): React.ReactNode {
  return (
    <Link
      className={clsx(className, wrapper)}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      <span className={clsx(linkText)}>{children}</span>
      <FontAwesomeIcon icon={faUpRightFromSquare} className={linkIcon} />
    </Link>
  )
}
