import type { Meta, StoryObj } from '@storybook/react'
import { Article } from './Article'

export default {
  args: {
    componentData: {
      articles: [],
    },
  },
  argTypes: {
    componentData: { table: { disable: true } },
  },
  component: Article,
} satisfies Meta<typeof Article>

export const Primary: StoryObj<typeof Article> = {
  args: {
    article: {
      id: 'id',
      scope: 'Public',
      title: 'index',
      description: 'Description',
      content: '# This is a title\n\nThis is a description\n\nContent',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}
