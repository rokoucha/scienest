import { globalStyle, style } from '@vanilla-extract/css'

export const ul = style({
  listStyle: 'none',
  paddingLeft: '0.25rem',
})

globalStyle(`${ul} > li::before`, {
  content: '- ',
})

export const blockquote = style({
  borderColor: 'lightgray',
  borderRadius: '0.25rem',
  borderStyle: 'solid',
  borderWidth: '1px',
  margin: 0,
  padding: '1rem',
})

globalStyle(`${blockquote} > p`, {
  margin: 0,
})

globalStyle(`${blockquote} > p::before`, {
  content: '> ',
})
