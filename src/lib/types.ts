import { z } from 'zod'

export const SearchSchema = z.object({
  query: z
    .string()
    .regex(/^[a-zA-Z0-9\s"'-.]*$/, 'Special characters not allowed except quotes and hyphens'),
})

export type SearchInput = z.infer<typeof SearchSchema>

export interface Dork {
  id: string
  template: string
  description: string
}

export const ENGINES = ['google', 'clouds', 'github', 'shodan', 'censys'] as const
export type EngineType = (typeof ENGINES)[number]

export interface DorksData {
  engines: Record<EngineType, Record<string, Dork[]>>
}

export interface SelectedEngines {
  google: boolean
  clouds: boolean
  github: boolean
  shodan: boolean
  censys: boolean
}
