import { style } from '@vanilla-extract/css'

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

export const heading = style({
  margin: 0,
})

export const infoContainer = style({
  color: 'grey',
  display: 'flex',
  fontSize: '0.8rem',
  gap: '0.8rem',
})

export const info = style({
  display: 'flex',
  flexDirection: 'row',
  selectors: {
    '&:not(:last-child)::after': {
      content: ',',
    },
  },
})

export const infoLabel = style({
  marginRight: '0.3rem',
  '::after': {
    content: ':',
  },
})

export const scopeText = style({
  fontSize: '1rem',
  position: 'relative',
  top: '-0.1rem',
})

export const dateText = style({
  fontFamily: 'monospace',
})

export const pathText = style({
  fontFamily: 'monospace',
  margin: 0,
  paddingTop: '0.1rem',
})

export const tagsText = style({
  margin: 0,
  paddingTop: '0.1rem',
})

export const tocHeadingsList = style({
  counterReset: 'counter',
  listStyleType: 'none',
  paddingLeft: '1rem',
})

export const tocHeadingsListItem = style({
  '::before': {
    content: ' counters(counter, ".") ". "',
    counterIncrement: 'counter',
  },
})
