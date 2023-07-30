import { globalStyle, style } from '@vanilla-extract/css'

globalStyle('html, body', {
  fontFamily: 'sans-serif',
  margin: 0,
})

export const body = style({})
