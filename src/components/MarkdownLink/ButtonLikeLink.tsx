import clsx from 'clsx'
import Link, { LinkProps } from 'next/link'
import React from 'react'
import { buttonLikeLink } from './ButtonLikeLink.css'
import { wrapper } from './MarkdownLink.css'

export function ButtonLikeLink<RouteType>({
  children,
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> &
  LinkProps<RouteType>): React.ReactNode {
  return (
    <Link className={clsx(className, wrapper, buttonLikeLink)} {...props}>
      <span>{children}</span>
    </Link>
  )
}
