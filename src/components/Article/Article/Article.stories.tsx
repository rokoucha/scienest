import type { Meta, StoryObj } from '@storybook/react'
import { Article } from './Article'

export default {
  args: {
    componentData: {
      posts: [],
    },
  },
  argTypes: {
    componentData: {
      control: false,
    },
  },
  component: Article,
} satisfies Meta<typeof Article>

export const Primary: StoryObj<typeof Article> = {
  args: {
    post: {
      id: 'id',
      slug: 'index',
      scope: 'Public',
      title: 'Title',
      description: 'Description',
      content: '# This is a title\n\nThis is a description\n\nContent',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  },
}
