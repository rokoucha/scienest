import React from 'react'
import { History } from '../../../model/history'
import { Link } from '../../../model/link'
import { Scope } from '../../../model/scope'
import { Toc } from '../../../parser/markdown'
import { Heading } from '../Markdown/Heading'
import { MarkdownRenderer } from '../Markdown/MarkdownRenderer'
import {
  headingTitle,
  historiesList,
  info,
  infoContainer,
  infoLabel,
  linkedLink,
  linksList,
  pathText,
  scopeText,
  tocHeadingsList,
  tocHeadingsListItem,
  unlinkedLink,
  wrapper,
} from './ArticleHeader.css'

function scopeToEmoji(scope: Scope): string {
  switch (scope) {
    case Scope.Public:
      return '🌐'
    case Scope.Protected:
      return '🔓'
    case Scope.Private:
      return '🔒'
    default:
      throw new Error(`Unknown scope: ${scope satisfies never}`)
  }
}

export type ArticleHeaderProps = Readonly<{
  createdAt: Date
  heading: string
  histories: History[]
  links: Link[]
  path: string
  scope: Scope
  toc: Toc
}>

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  createdAt,
  heading,
  histories,
  links,
  path,
  scope,
  toc,
}) => (
  <header className={wrapper}>
    <MarkdownRenderer
      contents={heading}
      options={{
        overrides: {
          h1: {
            component: Heading,
            props: {
              className: headingTitle,
              level: 1,
            },
          },
        },
      }}
    />
    <div className={infoContainer}>
      <div className={info}>
        <span className={infoLabel}>scope</span>
        <span className={scopeText}>{scopeToEmoji(scope)}</span>
      </div>
      <div className={info}>
        <span className={infoLabel}>created at</span>
        <time>
          {createdAt.getFullYear()}-
          {String(createdAt.getMonth() + 1).padStart(2, '0')}-
          {String(createdAt.getDate()).padStart(2, '0')}
        </time>
      </div>
      <div className={info}>
        <span className={infoLabel}>path</span>
        <pre className={pathText}>{path}</pre>
      </div>
      <div className={info}>
        <span className={infoLabel}>links</span>
        <details>
          <summary>[]</summary>
          <nav>
            <ul className={linksList}>
              {links.map(({ title, linked }) => (
                <li key={title}>
                  <a
                    href={`/${title}`}
                    className={linked ? linkedLink : unlinkedLink}
                  >
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
      <div className={info}>
        <span className={infoLabel}>toc</span>
        <details>
          <summary>headings</summary>
          <nav>
            <TableOfContents toc={toc} />
          </nav>
        </details>
      </div>
      <div className={info}>
        <span className={infoLabel}>histories</span>
        <details>
          <summary>commits</summary>
          <nav>
            <ul className={historiesList}>
              {histories.map(({ id, createdAt }) => (
                <li key={id}>
                  <time>{createdAt}</time>
                </li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </div>
  </header>
)

const TableOfContents: React.FC<{ toc: Toc }> = ({ toc }) => {
  return (
    <ol className={tocHeadingsList}>
      {toc.map(({ id, title, children }) => (
        <li key={id} className={tocHeadingsListItem}>
          <a href={`#${id}`}>{title}</a>
          {children && <TableOfContents toc={children} />}
        </li>
      ))}
    </ol>
  )
}
