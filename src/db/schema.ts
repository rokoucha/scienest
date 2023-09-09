import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  scope: text('scope').notNull(),
  title: text('title').notNull().unique(),
  description: text('description'),
  latestContentId: text('latest_content_id').notNull(),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
})

export const contents = sqliteTable('contents', {
  id: text('id').primaryKey(),
  articleId: text('article_id')
    .notNull()
    .references(() => articles.id),
  scope: text('scope').notNull(),
  text: text('text').notNull(),
  createdAt: text('created_at').notNull(),
})

export const links = sqliteTable('links', {
  id: text('id').primaryKey(),
  title: text('text').notNull().unique(),
  createdAt: text('created_at').notNull(),
})

export const articleLinks = sqliteTable('article_links', {
  id: text('id').primaryKey(),
  articleId: text('article_id')
    .notNull()
    .references(() => articles.id),
  linkId: text('link_id')
    .notNull()
    .references(() => links.id),
  createdAt: text('created_at').notNull(),
})
