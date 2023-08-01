import React from 'react'
import { container, wrapper } from './Main.css'

export type MainProps = Readonly<{ children?: React.ReactNode | undefined }>

export const Main: React.FC<MainProps> = ({ children }) => (
  <main className={wrapper}>
    <div className={container}>{children}</div>
  </main>
)
