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
      links: Array(10)
        .fill(null)
        .map((_, i) => ({
          linked: i % 2 === 0,
          title: `Link ${i + 1}`,
        })),
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    },
  },
  render: (props) => (
    <div style={{ width: 'calc((768px - 1.5rem * 2) / 2)' }}>
      <ArticleCard {...props} />
    </div>
  ),
}
