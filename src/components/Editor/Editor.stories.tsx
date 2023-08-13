import type { Meta, StoryObj } from '@storybook/react'
import { Editor } from './Editor'

export default {
  component: Editor,
} satisfies Meta<typeof Editor>

export const Primary: StoryObj<typeof Editor> = {
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
    slug: 'index',
  },
}
