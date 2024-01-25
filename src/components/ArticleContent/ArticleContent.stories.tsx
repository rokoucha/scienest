import type { Meta, StoryObj } from '@storybook/react'
import { ArticleContent } from './ArticleContent'

export default {
  component: ArticleContent,
} satisfies Meta<typeof ArticleContent>

export const Primary: StoryObj<typeof ArticleContent> = {
  args: {
    content: '# Hello world!\n\nThis is a test article.',
  },
}
