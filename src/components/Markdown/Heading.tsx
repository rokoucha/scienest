import React from 'react'

export type HeadingProps = Readonly<{
  children: React.ReactNode
  id: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}>

export const Heading: React.FC<HeadingProps> = ({ children, id, level }) => {
  return React.createElement(
    `h${level}`,
    { id },
    <>
      <a href={`#${id}`}>{Array(level).fill('#')}</a>
      {children}
    </>,
  )
}
