import { NextRequest, NextResponse } from 'next/server'
import { articleService } from '../../../app'

export const runtime = 'edge'

export async function GET(
  req: NextRequest,
  { params }: { params: { title?: string[] | undefined } },
): Promise<Response> {
  const title = params.title?.join('/')

  const articles = await articleService.findMany({ link: title })

  return NextResponse.json({
    $schema: 'https://json.schemastore.org/feed.json',
    version: 'https://jsonfeed.org/version/1.1',
    title: process.env.SITE_NAME,
    home_page_url: process.env.BASE_URL,
    feed_url: req.url,
    language: process.env.SITE_LANG,
    items: articles.map((article) => ({
      id: article.id,
      url: `${process.env.BASE_URL}/${encodeURIComponent(article.title)}`,
      title: article.title,
      content_text: article.description,
      date_published: article.createdAt,
      date_modified: article.updatedAt,
      tags: article.links?.map((link) => link.title),
    })),
  })
}
