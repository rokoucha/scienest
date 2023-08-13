import type { Meta, StoryObj } from '@storybook/react'
import { Editor } from './Editor'
import { EditorElement } from './Editor.Element'

export default {
  args: {
    action: 'https://httpbin.org/post',
    method: 'POST',
  },
  argTypes: {
    action: { table: { disable: true } },
    method: { table: { disable: true } },
  },
  component: EditorElement,
} satisfies Meta<typeof EditorElement>

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
