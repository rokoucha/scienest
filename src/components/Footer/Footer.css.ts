import { style } from '@vanilla-extract/css'
import { maxWidth } from '../../global.css'

export const wrapper = style({
  borderTopColor: 'grey',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  marginTop: '1rem',
})

export const container = style({
  alignItems: 'center',
  boxSizing: 'border-box',
  columnGap: '1rem',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  marginBlock: 0,
  marginInline: 'auto',
  maxWidth,
  padding: '0 1rem',
  width: '100%',
})

export const poweredBy = style({})
