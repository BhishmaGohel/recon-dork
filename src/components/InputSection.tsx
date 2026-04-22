import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Search, Loader2 } from 'lucide-react'
import { SearchSchema, type SearchInput } from '@/lib/types'
import { INPUT_MIN_LENGTH } from '@/lib/constants'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

interface InputSectionProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

/**
 * Input section component for search term entry
 * Includes real-time validation with min 3 chars, no special chars except quotes
 */
export function InputSection({ onSearch, isLoading = false }: InputSectionProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<SearchInput>({
    resolver: zodResolver(SearchSchema),
    mode: 'onChange',
    defaultValues: {
      query: '',
    },
  })

  const query = watch('query')

  const onSubmit = (data: SearchInput) => {
    onSearch(data.query)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full space-y-4"
    >
      <div className="text-center space-y-2 mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
          Dork Generator
        </h1>
        <p className="text-muted-foreground text-lg">
          Generate powerful search engine dorks with advanced filters
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            {...register('query')}
            type="text"
            placeholder="Enter your search term (e.g., 'admin login')"
            className="pl-10 text-base h-12"
            disabled={isLoading}
            aria-invalid={!!errors.query}
            aria-describedby={errors.query ? 'query-error' : undefined}
            maxLength={100}
          />
        </div>

        {errors.query && (
          <motion.p
            id="query-error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-sm text-destructive"
          >
            {errors.query.message}
          </motion.p>
        )}

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">
            {query.length}/{INPUT_MIN_LENGTH} characters
          </span>
        </div>

        <motion.div
          whileHover={{ scale: isValid && !isLoading ? 1.02 : 1 }}
          whileTap={{ scale: isValid && !isLoading ? 0.98 : 1 }}
        >
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="w-full h-12 text-base font-semibold"
          >
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
