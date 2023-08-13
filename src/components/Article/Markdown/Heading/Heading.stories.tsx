import type { Meta, StoryObj } from '@storybook/react'
import { Heading } from './Heading'

export default {
  argTypes: {
    ref: { table: { disable: true } },
  },
  component: Heading,
} satisfies Meta<typeof Heading>

export const Primary: StoryObj<typeof Heading> = {
  args: {
    children: 'Heading',
    level: 1,
  },
}
