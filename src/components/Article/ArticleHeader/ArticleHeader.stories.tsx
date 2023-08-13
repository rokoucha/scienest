import type { Meta, StoryObj } from '@storybook/react'
import { ArticleHeader } from './ArticleHeader'

export default {
  args: {
    title: undefined,
  },
  argTypes: {
    title: { table: { disable: true } },
  },
  component: ArticleHeader,
} satisfies Meta<typeof ArticleHeader>

export const Primary: StoryObj<typeof ArticleHeader> = {
  args: {
    createdAt: new Date(),
    description: 'This is a description',
    slug: 'index',
    title: '# This is a title',
  },
}
