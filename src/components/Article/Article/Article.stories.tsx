import type { Meta, StoryObj } from '@storybook/react'
import { Scope } from '../../../model/scope'
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
      histories: [
        {
          articleId: '1',
          createdAt: '2021-01-03T00:00:00.000Z',
          id: '3',
          scope: Scope.Public,
        },
        {
          articleId: '1',
          createdAt: '2021-01-02T00:00:00.000Z',
          id: '2',
          scope: Scope.Protected,
        },
        {
          articleId: '1',
          createdAt: '2021-01-01T00:00:00.000Z',
          id: '1',
          scope: Scope.Private,
        },
      ],
      links: [
        {
          id: '1',
          title: 'linked',
          count: 2,
        },
        {
          id: '2',
          title: 'unlinked',
          count: 1,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}
