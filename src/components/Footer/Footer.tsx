import React from 'react'
import pkg from '../../../package.json' assert { type: 'json' }
import { FooterElement } from './Footer.element'

export const Footer: React.FC = () => {
  return <FooterElement name={pkg.name} version={pkg.version} />
}
