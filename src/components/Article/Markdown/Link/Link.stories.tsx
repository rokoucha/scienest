import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

export default {
  component: Link,
} satisfies Meta<typeof Link>

export const Primary: StoryObj<typeof Link> = {
  args: {
    children: 'Link',
    href: 'https://example.com',
  },
}
