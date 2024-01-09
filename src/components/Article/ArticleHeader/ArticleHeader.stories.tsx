import type { Meta, StoryObj } from '@storybook/react'
import { Scope } from '../../../model/scope'
import { ArticleHeader } from './ArticleHeader'

export default {
  component: ArticleHeader,
} satisfies Meta<typeof ArticleHeader>

export const Primary: StoryObj<typeof ArticleHeader> = {
  args: {
    createdAt: new Date(),
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
    scope: Scope.Public,
    heading: '# index',
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
  },
}
