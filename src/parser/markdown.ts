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

export function tokenToRaw(token: Token | undefined): string | undefined {
  return token?.raw
}

export function tokensToRaw(tokens: Token[]): string {
  return tokens.map((t) => t.raw).join('')
}

export function tokensToPlain(tokens: Token[]): string {
  return (tokens as TokenWithoutGeneric[])
    .map((t) => {
      switch (t.type) {
        case 'space':
        case 'hr':
        case 'def':
        case 'image':
        case 'br': {
          return undefined
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
    })
    .filter((t): t is string => t !== undefined)
    .join('')
}

export function parse(src: string): {
  title: Token | undefined
  description: Token | undefined
  contents: Token[]
} {
  const lexer = new Lexer()
  const lex = lexer.lex(src)

  return {
    title: lex.at(0),
    description: lex.at(1),
    contents: lex.slice(2),
  }
}
