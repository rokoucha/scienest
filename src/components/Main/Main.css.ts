import { style } from '@vanilla-extract/css'

export const wrapper = style({})

export const container = style({
  boxSizing: 'border-box',
  marginBlock: 0,
  marginInline: 'auto',
  maxWidth: '1200px',
  paddingInline: '1rem',
  width: '100%',
  '@media': {
    'screen and (min-width: 1200px)': {
      paddingInline: 0,
    },
  },
})
