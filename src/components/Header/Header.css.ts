import { style } from '@vanilla-extract/css'
import { maxWidth } from '../../global.css'

export const wrapper = style({
  borderBottomColor: 'grey',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  marginBottom: '1rem',
})

export const container = style({
  alignItems: 'center',
  boxSizing: 'border-box',
  columnGap: '1rem',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  margin: '0 auto',
  maxWidth,
  padding: '0 1rem',
  width: '100%',
})

export const brand = style({})

export const brandLink = style({
  color: 'inherit',
  textDecoration: 'none',
})

export const brandName = style({
  margin: 0,
})

export const navigationWrapper = style({
  display: 'grid',
})

export const navigation = style({
  columnGap: '1rem',
  display: 'flex',
  justifySelf: 'end',
  listStyle: 'none',
})
