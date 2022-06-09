import { ZPageJson, type PageBase, type PageJson } from 'scienest-common'
import { z } from 'zod'

const APP_URL = 'http://shizuka.dns.ggrel.net:3300'

export async function findMany(): Promise<PageJson[]> {
  const res = await fetch(`${APP_URL}/pages`)

  const parsed = z.object({ pages: z.array(ZPageJson) }).parse(await res.json())

  return parsed.pages
}

export async function findBySlug(slug: string): Promise<PageJson | null> {
  const res = await fetch(`${APP_URL}/pages/${slug}`)

  if (!res.ok) return null

  const parsed = z.object({ page: ZPageJson }).parse(await res.json())

  return parsed.page
}

export async function create(page: PageBase): Promise<boolean> {
  const res = await fetch(`${APP_URL}/pages`, {
    body: JSON.stringify(page),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })

  return res.ok
}

export async function update(slug: string, page: PageBase): Promise<boolean> {
  const res = await fetch(`${APP_URL}/pages/${slug}`, {
    body: JSON.stringify(page),
    headers: { 'Content-Type': 'application/json' },
    method: 'PUT',
  })

  return res.ok
}

export async function remove(slug: string): Promise<boolean> {
  const res = await fetch(`${APP_URL}/pages/${slug}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
  })

  return res.ok
}
