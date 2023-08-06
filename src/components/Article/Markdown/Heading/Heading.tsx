import clsx from 'clsx'
import React from 'react'
import { hash, inner } from './Heading.css'

export type HeadingProps = Readonly<
  React.ComponentPropsWithRef<'h1'> & {
    level: 1 | 2 | 3 | 4 | 5 | 6
  }
>

export const Heading: React.FC<HeadingProps> = React.forwardRef(
  ({ children, level, ...props }, ref) =>
    React.createElement(
      `h${level}`,
      { ...props, ref },
      <a className={clsx(inner, hash[level])} href={`#${props.id}`}>
        {children}
      </a>,
    ),
)
