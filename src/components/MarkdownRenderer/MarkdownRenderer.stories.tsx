import type { Meta, StoryObj } from '@storybook/react'
import { MarkdownRenderer } from './MarkdownRenderer'

export default {
  argTypes: {
    options: { table: { disable: true } },
  },
  component: MarkdownRenderer,
} satisfies Meta<typeof MarkdownRenderer>

export const Primary: StoryObj<typeof MarkdownRenderer> = {
  args: {
    contents: '# Hello, world!',
  },
}
