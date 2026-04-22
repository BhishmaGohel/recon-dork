import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with proper precedence
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Copy text to clipboard and show toast notification
 * @param text - Text to copy
 * @param onSuccess - Callback on success
 */
export async function copyToClipboard(text: string, onSuccess?: () => void): Promise<void> {
  try {
    await navigator.clipboard.writeText(text)
    onSuccess?.()
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
    throw new Error('Failed to copy to clipboard')
  }
}

/**
 * Generate full search URL from template and query
 * @param template - Dork template
 * @param query - Search query
 * @param engine - Search engine type
 * @returns Full URL
 */
export function generateSearchUrl(
  template: string,
  query: string,
  engine: string
): string {
  const finalDork = template.replace(/{query}/g, encodeURIComponent(query))

  const engines: Record<string, string> = {
    google: 'https://www.google.com/search?q=',
    github: 'https://github.com/search?q=',
    shodan: 'https://www.shodan.io/search?query=',
    censys: 'https://censys.io/ipv4?q=',
  }

  const baseUrl = engines[engine] || 'https://www.google.com/search?q='
  return baseUrl + encodeURIComponent(finalDork)
}

/**
 * Open URL in new tab
 * @param url - URL to open
 */
export function openInNewTab(url: string): void {
  window.open(url, '_blank', 'noopener,noreferrer')
}

/**
 * Get theme preference from localStorage or system
 * @returns Current theme
 */
export function getThemePreference(): 'light' | 'dark' {
  const stored = localStorage.getItem('theme-preference')
  if (stored) {
    return stored as 'light' | 'dark'
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

/**
 * Set theme preference
 * @param theme - Theme to set
 */
export function setThemePreference(theme: 'light' | 'dark'): void {
  localStorage.setItem('theme-preference', theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
}
