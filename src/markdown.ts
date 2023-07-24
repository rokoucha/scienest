import { Lexer, marked } from 'marked'

export function tokensToPlain(tokens: marked.Token[]): string {
  return tokens
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
          return tokensToPlain(t.tokens)
        }

        case 'table': {
          return tokensToPlain([
            ...t.header.flatMap((t) => t.tokens),
            ...t.rows.flatMap((r) => r.flatMap((t) => t.tokens)),
          ])
        }

        case 'list': {
          return tokensToPlain(t.items.flatMap((i) => i.tokens))
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
  title: marked.Token | undefined
  description: marked.Token | undefined
  contents: marked.Token[]
} {
  const lexer = new Lexer()
  const lex = lexer.lex(src)

  return {
    title: lex.at(0),
    description: lex.at(1),
    contents: lex.slice(2),
  }
}
