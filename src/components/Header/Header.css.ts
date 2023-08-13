import { style } from '@vanilla-extract/css'

export const wrapper = style({
  borderBottomColor: 'grey',
  borderBottomStyle: 'solid',
  borderBottomWidth: '1px',
  marginBottom: '1rem',
})

export const container = style({
  alignItems: 'center',
  boxSizing: 'border-box',
  columnGap: '1rem',
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  marginBlock: 0,
  marginInline: 'auto',
  maxWidth: '1200px',
  paddingInline: '1rem',
  width: '100%',
  '@media': {
    'screen and (min-width: 1200px)': {
      paddingInline: 0,
    },
  },
})

export const brand = style({})

export const brandLink = style({
  color: 'inherit',
})

export const brandName = style({
  margin: 0,
})

export const navigationWrapper = style({
  display: 'grid',
})

export const navigation = style({
  columnGap: '1rem',
  display: 'flex',
  justifySelf: 'end',
  listStyle: 'none',
  marginBlock: '0.5rem',
})
