import type { Meta, StoryObj } from '@storybook/react'
import { MarkdownHeading } from './MarkdownHeading'

export default {
  argTypes: {
    ref: { table: { disable: true } },
  },
  component: MarkdownHeading,
} satisfies Meta<typeof MarkdownHeading>

export const Primary: StoryObj<typeof MarkdownHeading> = {
  args: {
    children: 'Heading',
    level: 1,
  },
}
