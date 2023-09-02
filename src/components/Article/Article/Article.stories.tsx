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
      content:
        '# This is a title\n\nThis is a **description** line\n\nand Contents!!!',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    histories: [
      {
        articleId: '1',
        createdAt: '2021-01-03T00:00:00.000Z',
        id: '3',
      },
      {
        articleId: '1',
        createdAt: '2021-01-02T00:00:00.000Z',
        id: '2',
      },
      {
        articleId: '1',
        createdAt: '2021-01-01T00:00:00.000Z',
        id: '1',
      },
    ],
  },
}
