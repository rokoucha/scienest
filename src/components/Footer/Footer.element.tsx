import React from 'react'
import { container, poweredBy, wrapper } from './Footer.css'

export type FooterElementProps = Readonly<{
  name: string
  version: string
}>

export const FooterElement: React.FC<FooterElementProps> = ({
  name,
  version,
}) => {
  return (
    <footer className={wrapper}>
      <div className={container}>
        <div className={poweredBy}>
          <pre>
            {name}/{version}
          </pre>
        </div>
      </div>
    </footer>
  )
}
