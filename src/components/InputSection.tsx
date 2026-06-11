import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Loader2 } from 'lucide-react'
import { SearchSchema, type SearchInput } from '@/lib/types'
import { INPUT_MIN_LENGTH } from '@/lib/constants'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { useEffect, useState, useRef } from 'react'
import { i } from 'framer-motion/client'

interface InputSectionProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

/**
 * Input section component for search term entry
 * Includes autocomplete of recent queries stored under `recondork`
 */
export function InputSection({ onSearch, isLoading = false }: InputSectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
  } = useForm<SearchInput>({
    resolver: zodResolver(SearchSchema),
    mode: 'onChange',
    defaultValues: { query: '' },
  })

  const query = watch('query')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [filtered, setFiltered] = useState<string[]>([])
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isFocused, setIsFocused] = useState(false);

  const onSubmit = (data: SearchInput) => onSearch(data.query)

  // listen for programmatic selection from other components
  useEffect(() => {
    const handler = (e: Event) => {
      try {
        const detail = (e as CustomEvent).detail as string
        if (detail) {
          setValue('query', detail)
          onSearch(detail)
          setFiltered([])
        }
      } catch (_) {
        // ignore
      }
    }
    window.addEventListener('recondork:selectQuery', handler as EventListener)
    return () => window.removeEventListener('recondork:selectQuery', handler as EventListener)
  }, [setValue, onSearch])

  // load recent suggestions (most-recent first)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('recondork')
      const repo = raw ? JSON.parse(raw) : {}
      const keys = Object.keys(repo || {})
      setSuggestions(keys.slice(-20).reverse())
    } catch (_) {
      setSuggestions([])
    }
  }, [])

  // filter suggestions as user types
  useEffect(() => {
    if (!query) setFiltered(suggestions)
    else setFiltered(suggestions.filter((s) => s.toLowerCase().includes(query.toLowerCase())))
  }, [query, suggestions])

  // if user types an exact match that exists in storage, auto-load it and close suggestions
  useEffect(() => {
    try {
      if (!query) return
      const raw = localStorage.getItem('recondork')
      const repo = raw ? JSON.parse(raw) : {}
      if (repo && repo[query]) {
        window.dispatchEvent(new CustomEvent('recondork:selectQuery', { detail: query }))
        setFiltered([])
      }
    } catch (_) {
      // ignore
    }
  }, [query])

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="w-full space-y-4">
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">Dork Generator</h1>
        <p className="text-muted-foreground text-lg">Generate powerful search engine dorks with advanced filters</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative" onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}>
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input {...register('query')} type="text" placeholder="Enter your site domain or keyword (e.g. example.com)" className="pl-10 text-base h-12" disabled={isLoading} aria-invalid={!!errors.query} aria-describedby={errors.query ? 'query-error' : undefined} maxLength={100} />

          <AnimatePresence>
            {filtered.length > 0 && isFocused && (
              <motion.div ref={containerRef} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.18 }} className="absolute left-0 right-0 top-full mt-0 z-50 bg-card/0 border border-border/10 rounded-b-md shadow-sm max-h-48 overflow-auto">
                {filtered.map((s) => (
                  <button key={s} type="button" onClick={() => { setValue('query', s); setFiltered([]); onSearch(s); }} className="w-full text-left px-3 py-2 text-sm hover:bg-primary bg-secondary">
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {errors.query && (
          <motion.p id="query-error" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="text-sm text-destructive">
            {errors.query.message}
          </motion.p>
        )}

        <motion.div whileHover={{ scale: isValid && !isLoading ? 1.02 : 1 }} whileTap={{ scale: isValid && !isLoading ? 0.98 : 1 }}>
          <Button type="submit" disabled={!isValid || isLoading} className="w-full h-12 text-base font-semibold">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                Generate Dorks
              </>
            )}
          </Button>
        </motion.div>
      </form>
    </motion.div>
  )
}

