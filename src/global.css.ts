import { globalStyle, style } from '@vanilla-extract/css'

export const body = style({})

globalStyle('html, body', {
  fontFamily: 'sans-serif',
  margin: 0,
})

globalStyle('a', {
  color: 'inherit',
  textDecoration: 'none',
})
