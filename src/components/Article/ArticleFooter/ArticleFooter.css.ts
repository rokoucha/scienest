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
  gap: '1.5rem',
  '@media': {
    'screen and (max-width: 768px)': {
      flexDirection: 'column',
    },
  },
})

export const articleItem = style({
  maxWidth: 'calc((768px - 1.5rem * 2) / 2)',
  width: '100%',
  '@media': {
    'screen and (max-width: 768px)': {
      maxWidth: '100%',
    },
  },
})
