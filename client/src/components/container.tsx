import type React from 'react'

export type ContainerProps = { children?: React.ReactNode }

export const Container: React.FC<ContainerProps> = ({ children }) => (
  <div>
    <div>
      <p></p>
    </div>
    <div>{children}</div>
    <div>
      <p>scienest 1.0</p>
    </div>
  </div>
)
