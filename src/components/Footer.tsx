import React from 'react'
import pkg from '../../package.json' assert { type: 'json' }

export type FooterProps = Readonly<{}>

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer>
      <pre>
        {pkg.name}/{pkg.version}
      </pre>
    </footer>
  )
}
