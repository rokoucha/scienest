import type { Meta, StoryObj } from '@storybook/react'
import { Editor } from './Editor'

export default {
  component: Editor,
} satisfies Meta<typeof Editor>

export const Primary: StoryObj<typeof Editor> = {
  args: {
    raw: '',
  },
}
