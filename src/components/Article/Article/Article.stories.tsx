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
      description: 'description',
      toc: [
        {
          id: 'first',
          title: 'First',
          children: [],
        },
        {
          id: 'second',
          title: 'Second',
          children: [
            {
              id: 'second-first',
              title: 'Second > First',
              children: [],
            },
            {
              id: 'second-second',
              title: 'Second > Second',
              children: [],
            },
          ],
        },
        {
          id: 'third',
          title: 'Third',
          children: [],
        },
      ],
      heading: '# index',
      content: 'description\n\ncontent',
      raw: '# index\n\ndescription\n\ncontent',
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
          title: 'linked',
          linked: true,
        },
        {
          title: 'unlinked',
          linked: false,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  },
}
