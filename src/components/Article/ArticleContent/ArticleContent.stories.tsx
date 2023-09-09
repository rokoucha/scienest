import type { Meta, StoryObj } from '@storybook/react'
import { ArticleContent } from './ArticleContent'

export default {
  args: {
    componentData: {
      articles: [],
    },
  },
  argTypes: {
    componentData: { table: { disable: true } },
  },
  component: ArticleContent,
} satisfies Meta<typeof ArticleContent>

export const Primary: StoryObj<typeof ArticleContent> = {
  args: {
    content: '# Hello world!\n\nThis is a test article.',
  },
}
