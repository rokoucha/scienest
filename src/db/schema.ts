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
  latestContentId: text('latest_content_id'),
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
    .references(() => articles.id, { onDelete: 'cascade' }),
  scope: text('scope', { enum: Scopes }).notNull(),
  toc: text('toc', { mode: 'json' }).notNull(),
  heading: text('heading').notNull(),
  content: text('content').notNull(),
  raw: text('raw').notNull(),
  createdAt: text('created_at')
    .notNull()
    .$defaultFn(() => new Date().toISOString()),
})

export const articleLinks = sqliteTable(
  'article_links',
  {
    title: text('title').notNull(),
    from: text('from')
      .notNull()
      .references(() => articles.id, { onDelete: 'cascade' }),
    to: text('to').references(() => articles.id, { onDelete: 'set null' }),
    createdAt: text('created_at')
      .notNull()
      .$defaultFn(() => new Date().toISOString()),
  },
  (t) => ({
    fromTo: primaryKey(t.from, t.to),
  }),
)
