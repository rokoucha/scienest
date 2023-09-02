import { clsx } from 'clsx'
import Link, { LinkProps } from 'next/link'
import React, { ComponentPropsWithRef } from 'react'
import { label, link, wrapper } from './ButtonLink.css'

export type ButtonLinkProps<T> = Readonly<
  ComponentPropsWithRef<'a'> & LinkProps<T>
>

export const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  ButtonLinkProps<unknown>
>(function ButtonLink({ children, className, ...props }, ref) {
  return (
    <Link ref={ref} {...props} className={link}>
      <div className={clsx(wrapper, className)}>
        <span className={label}>{children}</span>
      </div>
    </Link>
  )
}) as <RouteType>(props: ButtonLinkProps<RouteType>) => JSX.Element
