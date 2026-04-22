import { useState, useEffect } from 'react'
import { Toaster } from 'sonner'
import { motion } from 'framer-motion'
import { getThemePreference } from './lib/utils'
import { INPUT_MIN_LENGTH } from './lib/constants'
import { type SelectedEngines, type EngineType } from './lib/types'
import { ThemeToggle } from './components/ThemeToggle'
import { InputSection } from './components/InputSection'
import { FilterSection } from './components/FilterSection'
import { DorkList } from './components/DorkList'
import './globals.css'

/**
 * Main application component
 * FAANG-level production-ready dork generator
 */
function App() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEngines, setSelectedEngines] = useState<SelectedEngines>({
    google: true,
    github: false,
    shodan: false,
    censys: false,
  })

  // Initialize theme on mount
  useEffect(() => {
    const theme = getThemePreference()
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.length < INPUT_MIN_LENGTH) return

    setIsLoading(true)
    // Simulate generation delay for UX
    setTimeout(() => {
      setQuery(searchQuery)
      setIsLoading(false)
    }, 300)
  }

  const handleEngineToggle = (engine: EngineType) => {
    setSelectedEngines((prev) => ({
      ...prev,
      [engine]: !prev[engine as keyof SelectedEngines],
    } as SelectedEngines))
  }

  const handleSelectAll = () => {
    setSelectedEngines({
      google: true,
      github: true,
      shodan: true,
      censys: true,
    })
  }

  const handleClearAll = () => {
    setSelectedEngines({
      google: false,
      github: false,
      shodan: false,
      censys: false,
    })
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-300">
        {/* Header with theme toggle */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-lg hidden sm:inline">Dork Generator</h2>
            </div>
            <ThemeToggle />
          </div>
        </motion.header>

        {/* Main content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="space-y-8">
            {/* Input Section */}
            <InputSection onSearch={handleSearch} isLoading={isLoading} />

            {/* Filter Section - always visible */}
            <FilterSection
              selectedEngines={selectedEngines}
              onEngineToggle={handleEngineToggle}
              onSelectAll={handleSelectAll}
              onClearAll={handleClearAll}
            />

            {/* Results Section */}
            {query && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-12 pt-8 border-t"
              >
                <DorkList query={query} selectedEngines={selectedEngines} />
              </motion.div>
            )}
          </div>
        </main>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-border/50 mt-16 py-8 bg-muted/50"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
            <p>
              Built with ❤️ by Bhishma
            </p>
            <p className="mt-2">
              Use responsibly for authorized security testing only
            </p>
          </div>
        </motion.footer>
      </div>

      {/* Toast notifications */}
      <Toaster
        position="bottom-right"
        richColors
        theme="system"
      />
    </>
  )
}

export default App
