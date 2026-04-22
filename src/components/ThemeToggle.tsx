import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { motion } from 'framer-motion'
import { getThemePreference, setThemePreference } from '@/lib/utils'
import { Button } from './ui/Button'
import { Tooltip } from './ui/Tooltip'

/**
 * Theme toggle component with system preference detection
 * Persists theme preference to localStorage
 */
export function ThemeToggle() {
  const [theme, setTheme] = React.useState<'light' | 'dark'>(() => {
    return getThemePreference()
  })

  const toggleTheme = React.useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    setThemePreference(newTheme)
  }, [theme])

  return (
    <motion.div
    initial={false}
    animate={{ rotate: theme === 'dark' ? 180 : 0 }}
    transition={{ duration: 0.3 }}
    >
    <Button
        variant="outline"
        size="icon"
        onClick={toggleTheme}
        aria-label="Toggle theme"
        className="h-9 w-9 rounded-lg"
    >
        {theme === 'light' ? (
        <Moon className="h-5 w-5" />
        ) : (
        <Sun className="h-5 w-5" />
        )}
    </Button>
    </motion.div>
  )
}
