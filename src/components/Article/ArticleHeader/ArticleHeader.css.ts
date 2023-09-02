import { style } from '@vanilla-extract/css'

export const wrapper = style({
  display: 'grid',
})

export const headingContainer = style({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
})

export const heading = style({
  margin: 0,
})

export const pathText = style({
  color: 'grey',
  fontFamily: 'monospace',
  fontSize: '0.8rem',
  margin: 0,
})

export const infoContainer = style({
  display: 'grid',
  gap: '1rem',
  gridTemplateColumns: 'auto 1fr',
})

export const dateText = style({
  color: 'grey',
  fontFamily: 'monospace',
  fontSize: '0.8rem',
  margin: 0,
})
