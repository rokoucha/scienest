import type { Meta, StoryObj } from '@storybook/react'
import { Main } from './Main'

export default {
  component: Main,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Main>

export const Primary: StoryObj<typeof Main> = {
  args: {
    children: 'Hello, world!',
  },
}
