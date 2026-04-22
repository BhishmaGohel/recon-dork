import { z } from 'zod'

export const SearchSchema = z.object({
  query: z
    .string()
    .min(3, 'Search term must be at least 3 characters')
    .regex(/^[a-zA-Z0-9\s"'-.]*$/, 'Special characters not allowed except quotes and hyphens'),
})

export type SearchInput = z.infer<typeof SearchSchema>

export interface Dork {
  id: string
  template: string
  description: string
  category: string
}

export const ENGINES = ['google', 'github', 'shodan', 'censys'] as const
export type EngineType = (typeof ENGINES)[number]

export interface DorksData {
  engines: Record<EngineType, Dork[]>
}

export interface SelectedEngines {
  google: boolean
  github: boolean
  shodan: boolean
  censys: boolean
}
