import { style } from '@vanilla-extract/css'

export const wrapper = style({
  color: 'dodgerblue',
})

export const linkText = style({
  textDecoration: 'underline',
})

export const linkIcon = style({
  height: '0.75rem',
  marginLeft: '0.25rem',
})

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
