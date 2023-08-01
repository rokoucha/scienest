import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

export default {
  component: Button,
} satisfies Meta<typeof Button>

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Button',
  },
}
