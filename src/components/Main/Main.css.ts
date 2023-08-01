import { style } from '@vanilla-extract/css'
import { maxWidth } from '../../global.css'

export const wrapper = style({})

export const container = style({
  boxSizing: 'border-box',
  marginBlock: 0,
  marginInline: 'auto',
  maxWidth,
  width: '100%',
})
