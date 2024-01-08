import type { Meta, StoryObj } from '@storybook/react'
import { Scope } from '../../../model/scope'
import { ArticleFooter } from './ArticleFooter'

export default {
  component: ArticleFooter,
} satisfies Meta<typeof ArticleFooter>

export const Primary: StoryObj<typeof ArticleFooter> = {
  args: {
    articles: [...Array(13)].map((_, i) => ({
      id: `${i}`,
      scope: Scope.Public,
      title: `Article ${i}`,
      description: 'Article Description',
      links: [
        { title: 'Link1', linked: true },
        { title: 'Link2', linked: true },
        { title: 'Link3', linked: false },
      ],
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    })),
  },
}

export const NoRelatedArticle: StoryObj<typeof ArticleFooter> = {
  args: {
    articles: [],
  },
}
