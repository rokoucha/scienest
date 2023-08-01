import { clsx } from 'clsx'
import React, { forwardRef } from 'react'
import { button } from './Button.css'

export type ButtonProps = Readonly<React.ComponentPropsWithRef<'button'>>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ children, className, ...props }, ref) {
    return (
      <button ref={ref} {...props} className={clsx(button, className)}>
        {children}
      </button>
    )
  },
)
