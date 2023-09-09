import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { Scopes } from '../model/scope'
import { nanoid } from '../nanoid'

export const articles = sqliteTable('articles', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  scope: text('scope', { enum: Scopes }).notNull(),
  title: text('title').notNull().unique(),
  description: text('description'),
  latestContentId: text('latest_content_id').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
  updatedAt: text('updated_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

export const contents = sqliteTable('contents', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  articleId: text('article_id')
    .notNull()
    .references(() => articles.id),
  scope: text('scope', { enum: Scopes }).notNull(),
  toc: text('toc', { mode: 'json' }).notNull(),
  heading: text('heading').notNull(),
  content: text('content').notNull(),
  raw: text('raw').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

export const links = sqliteTable('links', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => nanoid()),
  title: text('text').notNull().unique(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

export const articleLinks = sqliteTable(
  'article_links',
  {
    articleId: text('article_id')
      .notNull()
      .references(() => articles.id),
    linkId: text('link_id')
      .notNull()
      .references(() => links.id),
    createdAt: text('created_at')
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (t) => ({
    articleIdLinkId: primaryKey(t.articleId, t.linkId),
  }),
)
