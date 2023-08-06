import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { HeaderElement } from './Header.element'

export default {
  args: {
    signIn: <Button>Sign In</Button>,
    signOut: <Button>Sign Out</Button>,
  },
  argTypes: {
    signIn: { control: false },
    signOut: { control: false },
  },
  component: HeaderElement,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof HeaderElement>

export const Primary: StoryObj<typeof HeaderElement> = {
  args: {
    isSignedIn: false,
    siteName: 'Scienest',
  },
}