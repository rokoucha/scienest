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
    case 'space':
    case 'hr':
    case 'def':
    case 'image':
    case 'br': {
      return ''
    }

    case 'code':
    case 'html':
    case 'text':
    case 'escape':
    case 'codespan': {
      return t.text.replaceAll('\n', ' ')
    }

    case 'heading':
    case 'blockquote':
    case 'list_item':
    case 'paragraph':
    case 'link':
    case 'strong':
    case 'em':
    case 'del': {
      return tokensToPlain(t.tokens ?? [])
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
  return tokens.map((t) => tokenToPlain(t)).join('')
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

function pageLinksFromTokens(tokens: Token[]): string[] {
  return [
    ...new Set(
      tokens
        .filter((t): t is Tokens.Link => t.type === 'link')
        .map((t) => t.href)
        .filter((href) => {
          try {
            new URL(href)
            return false
          } catch {
            return true
          }
        }),
    ).values(),
  ]
}

export function parse(src: string): {
  contents: Token[]
  description: Token | undefined
  links: string[]
  title: Token
  toc: Toc
} {
  const lexer = new Lexer()
  const lex = lexer.lex(src)

  const title = lex.at(0)
  if (title === undefined) {
    throw new Error('No title found')
  }

  return {
    contents: lex.slice(1),
    description: lex.at(1),
    links: pageLinksFromTokens(lex),
    title,
    toc: parseHeadings(lex.slice(1)),
  }
}
