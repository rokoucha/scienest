import type { Meta, StoryObj } from '@storybook/react'
import { TwitterCardLink } from './TwitterCardLink'
import { TwitterCardLoader } from './TwitterCardLoader'

export default {
  component: TwitterCardLink,
} satisfies Meta<typeof TwitterCardLink>

export const Primary: StoryObj<typeof TwitterCardLink> = {
  args: {
    url: 'https://twitter.com/i/status/1732824684683784516',
  },
  render: (props) => (
    <>
      <TwitterCardLoader />
      <TwitterCardLink {...props} />
    </>
  ),
}
