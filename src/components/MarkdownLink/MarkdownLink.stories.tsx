import type { Meta, StoryObj } from '@storybook/react'
import { TwitterCardLoader } from '../TwitterCardLink'
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

export const Hash: StoryObj<typeof MarkdownLink> = {
  args: {
    children: [],
    href: 'link' as any,
  },
}

export const Twitter: StoryObj<typeof MarkdownLink> = {
  args: {
    children: 'https://twitter.com/i/status/1732824684683784516',
    href: 'https://twitter.com/i/status/1732824684683784516',
  },
  render: (props) => (
    <>
      <TwitterCardLoader />
      <MarkdownLink {...props} />
    </>
  ),
}
