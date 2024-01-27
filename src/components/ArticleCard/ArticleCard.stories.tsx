import type { Meta, StoryObj } from '@storybook/react'
import { Scope } from '../../model/scope'
import { ArticleCard } from './ArticleCard'

export default {
  component: ArticleCard,
} satisfies Meta<typeof ArticleCard>

export const Primary: StoryObj<typeof ArticleCard> = {
  args: {
    article: {
      id: '1',
      scope: Scope.Public,
      title: 'Article Title',
      description: 'Article Description',
      thumbnailUrl: null,
      links: [
        { title: 'Link1', linked: true },
        { title: 'Link2', linked: true },
        { title: 'Link3', linked: false },
      ],
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
  },
}
