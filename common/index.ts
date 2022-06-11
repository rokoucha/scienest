import { z } from 'zod'

export const Scope = {
  private: 'private',
  protected: 'protected',
  public: 'public',
} as const

export type Scope = keyof typeof Scope

export const ScopeLevel = {
  [Scope.private]: [Scope.public, Scope.protected, Scope.private],
  [Scope.protected]: [Scope.public, Scope.protected],
  [Scope.public]: [Scope.public],
}

export type ScopeLevel = typeof ScopeLevel

export const MatchMode = {
  forward: 'forward',
  backward: 'backward',
  fuzzy: 'fuzzy',
} as const

export type MatchMode = keyof typeof MatchMode

export const ZPageBase = z.object({
  content: z.string(),
  scope: z.nativeEnum(Scope),
  slug: z.string(),
  tags: z.array(z.string()),
})

export type PageBase = z.infer<typeof ZPageBase>

export const toPageBase = (data: unknown): PageBase => ZPageBase.parse(data)

export const ZPage = z.object({
  content: z.string(),
  contentId: z.string(),
  createdAt: z.union([z.string(), z.date()]).transform((v) => new Date(v)),
  id: z.string(),
  scope: z.nativeEnum(Scope),
  slug: z.string(),
  tags: z.array(z.string()),
  updatedAt: z.union([z.string(), z.date()]).transform((v) => new Date(v)),
})

export type Page = z.infer<typeof ZPage>

export const toPage = (data: unknown): Page => ZPage.parse(data)

export const ZPageJson = z.object({
  content: z.string(),
  contentId: z.string(),
  createdAt: z.union([z.string(), z.date()]).transform((v) => v.toString()),
  id: z.string(),
  scope: z.nativeEnum(Scope),
  slug: z.string(),
  tags: z.array(z.string()),
  updatedAt: z.union([z.string(), z.date()]).transform((v) => v.toString()),
})

export type PageJson = z.infer<typeof ZPageJson>

export const toPageJson = (data: unknown): PageJson => ZPageJson.parse(data)

export const ZContent = z.object({
  id: z.string(),
  createdAt: z.string().transform((v) => new Date(v)),
  text: z.string(),
  parentId: z.nullable(z.string()),
  scope: z.nativeEnum(Scope),
})

export type Content = z.infer<typeof ZContent>

export const toContent = (data: unknown): Content => ZContent.parse(data)
