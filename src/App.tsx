import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { motion } from 'framer-motion'
import { getThemePreference } from './lib/utils'
import { INPUT_MIN_LENGTH } from './lib/constants'
import { type SelectedEngines, type EngineType } from './lib/types'
import { ThemeToggle } from './components/ThemeToggle'
import { InputSection } from './components/InputSection'
import { FilterSection } from './components/FilterSection'
import { DorkList } from './components/DorkList'
import { Footer } from './components/Footer'
import { EthicsPage } from './pages/EthicsPage'
import { TermsPage } from './pages/TermsPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { ReleasesPage } from './pages/ReleasesPage'
import './globals.css'

/**
 * Home page component - Dork generator
 */
function HomePage({
  query,
  isLoading,
  selectedEngines,
  onSearch,
  onEngineToggle,
  onSelectAll,
  onClearAll,
}: {
  query: string
  isLoading: boolean
  selectedEngines: SelectedEngines
  onSearch: (q: string) => void
  onEngineToggle: (e: EngineType) => void
  onSelectAll: () => void
  onClearAll: () => void
}) {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="space-y-8">
        {/* Input Section */}
        <InputSection onSearch={onSearch} isLoading={isLoading} />

        {/* Filter Section - always visible */}
        <FilterSection
          selectedEngines={selectedEngines}
          onEngineToggle={onEngineToggle}
          onSelectAll={onSelectAll}
          onClearAll={onClearAll}
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
  )
}

/**
 * Main application component
 * FAANG-level production-ready dork generator with routing
 */
function App() {
  const [query, setQuery] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedEngines, setSelectedEngines] = useState<SelectedEngines>({
    google: false,
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
    <Router>
      <>
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 transition-colors duration-300">
          {/* Header with theme toggle */}
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
          >
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <h2 className="font-bold text-lg hidden sm:inline">Dork Generator</h2>
              </a>
              <ThemeToggle />
            </div>
          </motion.header>

          {/* Routes */}
          <Routes>
            <Route
              path="/recon-dork/"
              element={
                <HomePage
                  query={query}
                  isLoading={isLoading}
                  selectedEngines={selectedEngines}
                  onSearch={handleSearch}
                  onEngineToggle={handleEngineToggle}
                  onSelectAll={handleSelectAll}
                  onClearAll={handleClearAll}
                />
              }
            />
            <Route path="/recon-dork/ethics" element={<EthicsPage />} />
            <Route path="/recon-dork/terms" element={<TermsPage />} />
            <Route path="/recon-dork/resources" element={<ResourcesPage />} />
            <Route path="/recon-dork/releases" element={<ReleasesPage />} />
          </Routes>

          {/* Footer */}
          <Footer />
        </div>

        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          richColors
          theme="system"
        />
      </>
    </Router>
  )
}

export default App
