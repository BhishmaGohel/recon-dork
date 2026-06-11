export const ENGINES = ['google', 'clouds', 'github', 'shodan', 'censys'] as const

export const ENGINE_LABELS: Record<string, string> = {
  google: 'Google',
  clouds: 'Clouds',
  github: 'GitHub',
  shodan: 'Shodan',
  censys: 'Censys',
}

export const ENGINE_DESCRIPTIONS: Record<string, string> = {
  google: 'Web search engine',
  clouds: 'Cloud service search',
  github: 'Repository search',
  shodan: 'IoT device search',
  censys: 'Certificate search',
}

export const ANIMATION_DURATION = 300

export const INPUT_MIN_LENGTH = 3
export const INPUT_MAX_LENGTH = 100
