import { style } from '@vanilla-extract/css'

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '1rem',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  borderTopColor: 'grey',
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
