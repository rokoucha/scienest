import { createVar, globalStyle, style } from '@vanilla-extract/css'

export const body = style({})

globalStyle('html, body', {
  fontFamily: 'sans-serif',
  margin: 0,
})

export const maxWidth = createVar()

globalStyle(':root', {
  vars: {
    [maxWidth]: '1200px',
  },
})
