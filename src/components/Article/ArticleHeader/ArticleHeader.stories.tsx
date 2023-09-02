import type { Meta, StoryObj } from '@storybook/react'
import { Scope } from '../../../model/scope'
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
    ],
    path: '/index',
    scope: Scope.Public,
    title: '# index',
  },
}
