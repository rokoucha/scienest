import React from 'react'
import { wrapper } from './ArticleFooter.css'

export type ArticleFooterProps = Readonly<{}>

export const ArticleFooter: React.FC<ArticleFooterProps> = () => (
  <footer className={wrapper}></footer>
)
