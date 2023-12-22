import { globalStyle, style } from '@vanilla-extract/css'

export const ul = style({
  listStyle: 'none',
  paddingLeft: 0,
})

globalStyle(`${ul} > li::before`, {
  content: '- ',
})
