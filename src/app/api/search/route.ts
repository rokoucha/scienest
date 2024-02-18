import { NextRequest, NextResponse } from 'next/server'
import { articleService } from '../../../app'

export const runtime = 'edge'

export async function GET(req: NextRequest): Promise<Response> {
  const query = new URL(req.url).searchParams.get('q') ?? ''

  const articles = await articleService.searchManyByTitle({ query })

  return NextResponse.json(articles)
}
