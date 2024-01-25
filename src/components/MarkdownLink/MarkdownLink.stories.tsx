import type { Meta, StoryObj } from '@storybook/react'
import { MarkdownLink } from './MarkdownLink'

export default {
  component: MarkdownLink,
} satisfies Meta<typeof MarkdownLink>

export const Primary: StoryObj<typeof MarkdownLink> = {
  args: {
    children: 'Link',
    href: 'https://example.com',
  },
}

export const ButtonLike: StoryObj<typeof MarkdownLink> = {
  args: {
    children: '#Link',
    href: '/link' as any,
  },
}
