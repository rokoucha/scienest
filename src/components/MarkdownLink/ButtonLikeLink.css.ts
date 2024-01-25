import { style } from '@vanilla-extract/css'

export const buttonLikeLink = style({
  borderRadius: '3px',
  borderStyle: 'solid',
  borderWidth: '1px',
  padding: '0.25rem',
})

export const linkedButtonLikeLink = style({
  borderColor: 'dodgerblue',
  color: 'dodgerblue',
})

export const unlinkedButtonLikeLink = style({
  borderColor: 'lightslategrey',
  color: 'lightslategrey',
})
