import type { Meta, StoryObj } from '@storybook/react'
import { Scope } from '../../model/scope'
import { Article } from './Article'

export default {
  component: Article,
} satisfies Meta<typeof Article>

export const Primary: StoryObj<typeof Article> = {
  args: {
    article: {
      id: 'id',
      scope: 'Public',
      title: 'index',
      description: 'description',
      thumbnailUrl: null,
      toc: [
        {
          id: 'first',
          title: 'First',
          children: [],
        },
        {
          id: 'second',
          title: 'Second',
          children: [
            {
              id: 'second-first',
              title: 'Second > First',
              children: [],
            },
            {
              id: 'second-second',
              title: 'Second > Second',
              children: [],
            },
          ],
        },
        {
          id: 'third',
          title: 'Third',
          children: [],
        },
      ],
      heading: '# index',
      content: 'description\n\ncontent',
      raw: '# index\n\ndescription\n\ncontent',
      histories: [
        {
          articleId: '1',
          createdAt: '2021-01-03T00:00:00.000Z',
          id: '3',
          scope: Scope.Public,
        },
        {
          articleId: '1',
          createdAt: '2021-01-02T00:00:00.000Z',
          id: '2',
          scope: Scope.Protected,
        },
        {
          articleId: '1',
          createdAt: '2021-01-01T00:00:00.000Z',
          id: '1',
          scope: Scope.Private,
        },
      ],
      links: [
        {
          title: 'linked',
          linked: true,
        },
        {
          title: 'unlinked',
          linked: false,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    links: [...Array(13)].map((_, i) => ({
      id: `${i}`,
      scope: Scope.Public,
      title: `Article ${i}`,
      description: 'Article Description',
      thumbnailUrl: null,
      links: [
        { title: 'Link1', linked: true },
        { title: 'Link2', linked: true },
        { title: 'Link3', linked: false },
      ],
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    })),
  },
}

export const WithoutContent: StoryObj<typeof Article> = {
  args: {
    article: {
      id: 'id',
      scope: 'Public',
      title: 'index',
      description: null,
      thumbnailUrl: null,
      toc: [],
      heading: '# index',
      content: null,
      raw: null,
      histories: [],
      links: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    links: [...Array(13)].map((_, i) => ({
      id: `${i}`,
      scope: Scope.Public,
      title: `Article ${i}`,
      description: 'Article Description',
      thumbnailUrl: null,
      links: [
        { title: 'Link1', linked: true },
        { title: 'Link2', linked: true },
        { title: 'Link3', linked: false },
      ],
      createdAt: '2021-01-01T00:00:00.000Z',
      updatedAt: '2021-01-01T00:00:00.000Z',
    })),
  },
}
