import { clsx } from 'clsx'
import Link, { LinkProps } from 'next/link'
import React from 'react'
import { label, link, wrapper } from './ButtonLink.css'

export const ButtonLink = React.forwardRef<HTMLAnchorElement, LinkProps<any>>(
  function ButtonLink({ children, className, ...props }, ref) {
    return (
      <Link ref={ref} {...props} className={link}>
        <div className={clsx(wrapper, className)}>
          <span className={label}>{children}</span>
        </div>
      </Link>
    )
  },
) as <RouteType>(props: LinkProps<RouteType>) => JSX.Element
