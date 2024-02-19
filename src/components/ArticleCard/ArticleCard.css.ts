import { style } from '@vanilla-extract/css'

export const wrapper = style({
  borderColor: 'grey',
  borderRadius: '0.5rem',
  borderStyle: 'solid',
  borderWidth: '1px',
})

export const thumbnail = style({
  borderTopLeftRadius: '0.5rem',
  borderTopRightRadius: '0.5rem',
  display: 'block',
  height: '10rem',
  marginInline: 'auto',
  objectFit: 'cover',
  width: '100%',
})

export const thumbnailAlt = style({
  display: 'block',
  fontSize: '7rem',
  height: '10rem',
  textAlign: 'center',
})

export const container = style({
  borderTopColor: 'grey',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  paddingBlock: '0.5rem',
  paddingInline: '1rem',
})

export const titleText = style({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: 0,
})

export const dateText = style({
  color: 'grey',
  fontFamily: 'monospace',
  fontSize: '0.8rem',
})

export const descriptionText = style({
  fontSize: '1rem',
  margin: 0,
})

export const linkList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  listStyleType: 'none',
  margin: 0,
  padding: 0,
})

export const link = style({
  borderRadius: '3px',
  borderStyle: 'solid',
  borderWidth: '1px',
  display: 'block',
  fontSize: '0.75rem',
  padding: '0.25rem',
  '::before': {
    content: '#',
  },
})

export const linkedLink = style({
  borderColor: 'dodgerblue',
  color: 'dodgerblue',
})

export const unlinkedLink = style({
  borderColor: 'lightslategrey',
  color: 'lightslategrey',
})
