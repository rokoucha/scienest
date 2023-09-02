import { relations, sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const articles = sqliteTable('articles', {
  id: text('id').primaryKey(),
  scope: text('scope').notNull(),
  title: text('title').notNull().unique(),
  description: text('description'),
  latestContentId: text('latest_content_id').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})

export const articleRelations = relations(articles, ({ one }) => ({
  contents: one(contents, {
    fields: [articles.id],
    references: [contents.articleId],
  }),
}))

export const contents = sqliteTable('contents', {
  id: text('id').primaryKey(),
  articleId: text('article_id')
    .notNull()
    .references(() => articles.id),
  scope: text('scope').notNull(),
  text: text('text').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
})
