import clsx from 'clsx'
import Link, { type LinkProps } from 'next/link'
import React from 'react'
import { buttonLikeLink } from './ButtonLikeLink.css'
import { wrapper } from './MarkdownLink.css'

export function ButtonLikeLink<RouteType>({
  children,
  className,
  ...props
}: LinkProps<RouteType>): React.ReactNode {
  return (
    <Link className={clsx(className, wrapper, buttonLikeLink)} {...props}>
      <span>{children}</span>
    </Link>
  )
}
