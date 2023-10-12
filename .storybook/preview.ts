import type { Preview } from '@storybook/react'
import {} from '../src/global.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /(Date|createdAt|updatedAt)$/,
      },
    },
  },
}

export default preview
