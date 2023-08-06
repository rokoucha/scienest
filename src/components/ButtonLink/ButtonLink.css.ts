import { style } from '@vanilla-extract/css'

export const link = style({})

export const wrapper = style({
  alignItems: 'center',
  backgroundColor: 'transparent',
  borderColor: 'grey',
  borderRadius: '0.5rem',
  borderStyle: 'solid',
  borderWidth: '1px',
  boxSizing: 'border-box',
  color: 'black',
  cursor: 'pointer',
  display: 'flex',
  margin: 0,
  padding: '0.5rem',
  whiteSpace: 'nowrap',
  width: 'fit-content',
  ':hover': {
    backgroundColor: 'grey',
    color: 'white',
  },
  ':active': {
    backgroundColor: 'black',
    color: 'white',
  },
})

export const label = style({
  verticalAlign: 'middle',
})
