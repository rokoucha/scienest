import type { Meta, StoryObj } from '@storybook/react'
import { FooterElement } from './Footer.element'

export default {
  component: FooterElement,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FooterElement>

export const Primary: StoryObj<typeof FooterElement> = {
  args: {
    name: 'Scienest',
    version: '1.0.0',
  },
}
