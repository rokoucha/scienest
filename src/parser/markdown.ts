import { Lexer, Token, Tokens } from 'marked'

export type TokenWithoutGeneric = (
  | Tokens.Space
  | Tokens.Code
  | Tokens.Heading
  | Tokens.Table
  | Tokens.Hr
  | Tokens.Blockquote
  | Tokens.List
  | Tokens.ListItem
  | Tokens.Paragraph
  | Tokens.HTML
  | Tokens.Text
  | Tokens.Def
  | Tokens.Escape
  | Tokens.Tag
  | Tokens.Image
  | Tokens.Link
  | Tokens.Strong
  | Tokens.Em
  | Tokens.Codespan
  | Tokens.Br
  | Tokens.Del
) & { loose?: boolean; tokens?: Token[] }

type Heading = { id: string; title: string; children: Heading[] }
export type Toc = Heading[]

export function tokenToRaw(token: Token): string {
  return token.raw
}

export function tokensToRaw(tokens: Token[]): string {
  return tokens.map((t) => tokenToRaw(t)).join('')
}

export function tokenToPlain(token: Token): string {
  // fuck off
  const t = token as TokenWithoutGeneric

  switch (t.type) {
    case 'text': {
      return t.tokens ? tokensToPlain(t.tokens) : t.text.replaceAll('\n', ' ')
    }

    case 'space':
    case 'hr':
    case 'def':
    case 'image':
    case 'br': {
      return ''
    }

    case 'code':
    case 'html':
    case 'escape':
    case 'codespan': {
      return t.text.replaceAll('\n', ' ')
    }

    case 'heading':
    case 'blockquote':
    case 'list_item':
    case 'paragraph':
    case 'strong':
    case 'em':
    case 'del': {
      return tokensToPlain(t.tokens ?? [])
    }

    case 'link': {
      return t.text === '' && t.tokens.length === 0
        ? t.href
        : tokensToPlain(t.tokens ?? [])
    }

    case 'table': {
      return tokensToPlain([
        ...t.header.flatMap((t) => t.tokens ?? []),
        ...t.rows.flatMap((r) => r.flatMap((t) => t.tokens ?? [])),
      ])
    }

    case 'list': {
      return tokensToPlain(t.items.flatMap((i) => i.tokens ?? []))
    }

    default: {
      throw new Error(`Unknown token: ${t satisfies never}`)
    }
  }
}

export function tokensToPlain(tokens: Token[]): string {
  return tokens
    .map((t) => tokenToPlain(t))
    .filter((t) => !t.match(/^\s*$/))
    .join(' ')
}

function parseHeadings(tokens: Token[]): Toc {
  type h = { id: string; title: string; depth: number }

  const headings = tokens
    .filter((t): t is Tokens.Heading => t.type === 'heading')
    .map((t) => {
      const title = tokenToPlain(t)
      return {
        id: title.replaceAll(' ', '-').toLowerCase(),
        title,
        depth: t.depth - 1,
      }
    })

  function depthToTree(headings: h[]): Toc {
    const toc: Toc = []

    for (let i = 0; i < headings.length; i++) {
      if (i + 1 < headings.length && headings[i + 1].depth > 1) {
        const searchNextDepth1 = headings
          .slice(i + 1)
          .findIndex((h) => h.depth === 1)
        const nextReturnIndex =
          searchNextDepth1 === -1 ? headings.length : searchNextDepth1 + i

        const start = i + 1
        const end = nextReturnIndex + 1

        toc.push({
          id: headings[i].id,
          title: headings[i].title,
          children: depthToTree(
            headings
              .slice(start, end)
              .map((h) => ({ ...h, depth: h.depth - 1 })),
          ),
        })
        i = nextReturnIndex
        continue
      }

      toc.push({
        id: headings[i].id,
        title: headings[i].title,
        children: [],
      })
    }

    return toc
  }

  return depthToTree(headings)
}

function collectLinks(tokens: Token[]): string[] {
  return (tokens as TokenWithoutGeneric[])
    .flatMap((t) => {
      switch (t.type) {
        case 'space':
        case 'code':
        case 'hr':
        case 'html':
        case 'def':
        case 'escape':
        case 'image':
        case 'codespan':
        case 'br': {
          return null
        }

        case 'heading':
        case 'blockquote':
        case 'list_item':
        case 'paragraph':
        case 'text':
        case 'strong':
        case 'em':
        case 'del': {
          return collectLinks(t.tokens ?? [])
        }

        case 'link': {
          return [t.href, ...collectLinks(t.tokens ?? [])]
        }

        case 'table': {
          return collectLinks([
            ...t.header.flatMap((t) => t.tokens),
            ...t.rows.flatMap((r) => r.flatMap((t) => t.tokens)),
          ])
        }

        case 'list': {
          return collectLinks(t.items.flatMap((i) => i.tokens))
        }

        default: {
          throw new Error(`Unknown token: ${t satisfies never}`)
        }
      }
    })
    .filter((l): l is string => l !== null)
}

function collectImages(tokens: Token[]): string[] {
  return (tokens as TokenWithoutGeneric[])
    .flatMap((t) => {
      switch (t.type) {
        case 'space':
        case 'code':
        case 'hr':
        case 'html':
        case 'def':
        case 'escape':
        case 'codespan':
        case 'br': {
          return null
        }

        case 'heading':
        case 'blockquote':
        case 'list_item':
        case 'paragraph':
        case 'text':
        case 'link':
        case 'strong':
        case 'em':
        case 'del': {
          return collectImages(t.tokens ?? [])
        }

        case 'image': {
          return t.href
        }

        case 'table': {
          return collectImages([
            ...t.header.flatMap((t) => t.tokens),
            ...t.rows.flatMap((r) => r.flatMap((t) => t.tokens)),
          ])
        }

        case 'list': {
          return collectImages(t.items.flatMap((i) => i.tokens))
        }

        default: {
          throw new Error(`Unknown token: ${t satisfies never}`)
        }
      }
    })
    .filter((l): l is string => l !== null)
}

function pageLinksFromTokens(tokens: Token[]): string[] {
  return [
    ...new Set(
      collectLinks(tokens)
        .filter((l) => {
          try {
            new URL(l)
            return false
          } catch {
            return true
          }
        })
        .map((l) => (l.startsWith('/') ? l.slice(1) : l))
        .map((l) => (l === '' ? 'index' : l)),
    ).values(),
  ]
}

export function parse(src: string): {
  title: string
  description: string | null
  thumbnailUrl: string | null
  toc: Toc
  heading: string
  content: string
  links: string[]
} {
  const lexer = new Lexer()
  const lex = lexer.lex(src)

  const titleToken = lex.at(0)
  const contentTokens = lex.slice(1)

  if (titleToken === undefined) {
    throw new Error('No title found')
  }

  const description =
    contentTokens.length > 0 ? tokensToPlain(contentTokens) : null

  return {
    title: tokenToPlain(titleToken),
    description: description
      ? description.length > 32
        ? description.slice(0, 32).trimEnd() + '…'
        : description
      : null,
    thumbnailUrl: collectImages(contentTokens).at(0) ?? null,
    toc: parseHeadings(contentTokens),
    heading: tokenToRaw(titleToken),
    content: tokensToRaw(contentTokens),
    links: pageLinksFromTokens(contentTokens),
  }
}
