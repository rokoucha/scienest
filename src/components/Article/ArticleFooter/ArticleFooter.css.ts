import { style } from '@vanilla-extract/css'

export const hr = style({
  borderTopColor: 'grey',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
})

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
})

export const titleText = style({
  marginBlock: '1rem',
})

export const articleList = style({
  alignContent: 'flex-start',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '2rem',
})

export const articleItem = style({
  width: '20rem',
})
