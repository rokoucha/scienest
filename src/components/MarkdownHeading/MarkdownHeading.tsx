import clsx from 'clsx'
import React from 'react'
import { hash, inner } from './MarkdownHeading.css'

export type MarkdownHeadingProps = Readonly<
  React.ComponentPropsWithRef<'h1'> & {
    level: 1 | 2 | 3 | 4 | 5 | 6
  }
>

export const MarkdownHeading = React.forwardRef<
  HTMLAnchorElement,
  MarkdownHeadingProps
>(({ children, level, ...props }, ref) =>
  React.createElement(
    `h${level}`,
    { ...props, ref },
    <a className={clsx(inner, hash[level])} href={`#${props.id}`}>
      {children}
    </a>,
  ),
)
