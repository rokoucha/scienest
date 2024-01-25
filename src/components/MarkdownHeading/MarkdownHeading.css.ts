import { style } from '@vanilla-extract/css'

export const inner = style({
  '::before': {
    fontWeight: 'normal',
    marginRight: '0.5rem',
  },
  selectors: {
    '&:hover::before': {
      color: 'maroon',
    },
  },
})

export const hash = {
  1: style({
    '::before': {
      content: '#',
    },
  }),
  2: style({
    '::before': {
      content: '##',
    },
  }),
  3: style({
    '::before': {
      content: '###',
    },
  }),
  4: style({
    '::before': {
      content: '####',
    },
  }),
  5: style({
    '::before': {
      content: '#####',
    },
  }),
  6: style({
    '::before': {
      content: '######',
    },
  }),
}
