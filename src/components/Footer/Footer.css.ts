import { style } from '@vanilla-extract/css'

export const wrapper = style({
  borderTopColor: 'grey',
  borderTopStyle: 'solid',
  borderTopWidth: '1px',
  marginTop: '1rem',
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

export const poweredBy = style({})
