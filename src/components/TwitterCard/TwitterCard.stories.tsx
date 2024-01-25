import type { Meta, StoryObj } from '@storybook/react'
import { TwitterCard } from './TwitterCard'
import { TwitterCardLoader } from './TwitterCardLoader'

export default {
  component: TwitterCard,
} satisfies Meta<typeof TwitterCard>

export const Primary: StoryObj<typeof TwitterCard> = {
  args: {
    tweetId: 'https://twitter.com/i/status/1732824684683784516',
  },
  render: (props) => (
    <>
      <TwitterCardLoader />
      <TwitterCard {...props} />
    </>
  ),
}
