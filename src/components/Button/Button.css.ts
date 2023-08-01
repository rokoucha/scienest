import { style } from '@vanilla-extract/css'

export const button = style({
  backgroundColor: 'transparent',
  borderColor: 'grey',
  borderRadius: '0.5rem',
  borderStyle: 'solid',
  borderWidth: '1px',
  color: 'black',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: '1rem',
  margin: 0,
  padding: '0.5rem',
  whiteSpace: 'nowrap',
  ':hover': {
    backgroundColor: 'grey',
    color: 'white',
  },
  ':active': {
    backgroundColor: 'black',
    color: 'white',
  },
})
