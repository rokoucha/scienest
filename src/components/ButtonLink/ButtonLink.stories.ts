import type { Meta, StoryObj } from '@storybook/react'
import { ButtonLink } from './ButtonLink'

export default {
  args: {
    href: '#',
  },
  argTypes: {
    href: { table: { disable: true } },
  },
  component: ButtonLink,
} satisfies Meta<typeof ButtonLink>

export const Primary: StoryObj<typeof ButtonLink> = {
  args: {
    children: 'Button',
  },
}
