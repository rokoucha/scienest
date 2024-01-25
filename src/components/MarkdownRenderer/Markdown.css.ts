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
  display: 'block',
  margin: 0,
  padding: '1rem',
})

globalStyle(`${blockquote} > p`, {
  margin: 0,
})

globalStyle(`${blockquote} > p::before`, {
  content: '> ',
})

export const code = style({
  backgroundColor: 'whitesmoke',
  '::before': {
    content: '`',
  },
  '::after': {
    content: '`',
  },
  paddingInline: '0.25rem',
  borderRadius: '0.25rem',
})

export const pre = style({
  '::before': {
    content: '"```" attr(data-language-code) "\\A"',
    fontSize: '0.75rem',
  },
  '::after': {
    content: '```',
    fontSize: '0.75rem',
  },
})

globalStyle(`${pre} > code`, {
  backgroundColor: 'black',
  color: 'white',
  display: 'block',
  padding: '0.5rem',
})

globalStyle(`${pre} > code::before`, {
  content: '',
})

globalStyle(`${pre} > code::after`, {
  content: '',
})

export const ol = style({
  counterReset: 'list',
  listStyle: 'none',
  paddingLeft: '0.25rem',
})

globalStyle(`${ol} > li::before`, {
  content: 'counter(list) ". "',
  counterIncrement: 'list',
})

export const img = style({
  height: 'auto',
  maxWidth: '100%',
})
