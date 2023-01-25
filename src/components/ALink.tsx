import { Link } from '@remix-run/react'
import React from 'react'

export type ALinkProps = Readonly<
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    href: string
    preventScrollReset?: boolean
    relative?: 'route' | 'path'
    reloadDocument?: boolean
    replace?: boolean
    state?: any
  }
>

export const ALink: React.FC<ALinkProps> = ({
  href,
  preventScrollReset,
  relative,
  reloadDocument,
  replace,
  state,
  ...props
}) => {
  let internal = false
  try {
    new URL(href)
  } catch (_) {
    internal = true
  }

  return internal ? (
    <Link
      to={href}
      preventScrollReset={preventScrollReset}
      relative={relative}
      reloadDocument={reloadDocument}
      replace={replace}
      state={state}
      {...props}
    />
  ) : (
    <a href={href} {...props} />
  )
}
