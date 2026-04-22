import { motion, AnimatePresence } from 'framer-motion'
import { X, Check } from 'lucide-react'
import { ENGINES, ENGINE_LABELS } from '@/lib/constants'
import { type SelectedEngines, type EngineType } from '@/lib/types'
import { Button } from './ui/Button'
import { Badge } from './ui/Badge'
import dorks from '@/data/dorks.json'

interface FilterSectionProps {
  selectedEngines: SelectedEngines
  onEngineToggle: (engine: EngineType) => void
  onSelectAll: () => void
  onClearAll: () => void
}

/**
 * Filter section with multi-select engine chips
 * Shows count of available dorks per engine
 */
export function FilterSection({
  selectedEngines,
  onEngineToggle,
  onSelectAll,
  onClearAll,
}: FilterSectionProps) {
  const data = dorks as any
  const selectedCount = Object.values(selectedEngines).filter(Boolean).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="w-full space-y-4"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full">
          <label className="text-sm font-semibold text-muted-foreground mb-3 block">
            Select Search Engines ({selectedCount}/4)
          </label>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {ENGINES.map((engine) => {
                const engineKey = engine as EngineType
                const isSelected = selectedEngines[engineKey as keyof SelectedEngines]
                const dorkCount = data.engines[engine]?.length || 0

                return (
                  <motion.div
                    key={engine}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  >
                    <motion.button
                      onClick={() => onEngineToggle(engineKey)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 transition-all duration-200 ${
                        isSelected
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-foreground border-border hover:border-primary/50'
                      }`}
                      aria-pressed={isSelected}
                    >
                      {isSelected && <Check className="h-4 w-4" />}
                      <span className="font-medium">{ENGINE_LABELS[engine]}</span>
                      <Badge
                        variant={isSelected ? 'secondary' : 'outline'}
                        className="ml-1"
                      >
                        {dorkCount}
                      </Badge>
                    </motion.button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            onClick={onSelectAll}
            variant="outline"
            className="w-full"
            aria-label="Select all engines"
          >
            Select All
          </Button>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
          <Button
            onClick={onClearAll}
            variant="outline"
            className="w-full"
            aria-label="Clear all selections"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}
