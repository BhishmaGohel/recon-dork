import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/Accordion'
import { Checkbox } from './ui/Checkbox'
import { Button } from './ui/Button'
import { copyToClipboard, generateSearchUrl, openInNewTab } from '@/lib/utils'
import { ENGINE_LABELS } from '@/lib/constants'
import { type Dork, type EngineType, type SelectedEngines } from '@/lib/types'
import dorks from '@/data/dorks.json'
import { useEffect, useState, useRef } from 'react'

interface DorkListProps {
  query: string
  selectedEngines: SelectedEngines
}

/**
 * Dork list component with accordion sections per engine
 * Each dork card has copy and open buttons
 */
export function DorkList({ query, selectedEngines }: DorkListProps) {
  const data = dorks as any
  const [openAccordions, setOpenAccordions] = React.useState<string[]>([])

  const getJsonEngineKey = (engine: EngineType) => (engine === 'clouds' ? 'Clouds' : engine)
  const getEngineData = (engine: EngineType) =>
    (data.engines[getJsonEngineKey(engine)] || {}) as Record<string, Dork[]>

  // Get selected engines
  const activeEngines = (Object.entries(selectedEngines) as [EngineType, boolean][])
    .filter(([, selected]) => selected)
    .map(([engine]) => engine)

  const storageKey = 'checkedDorks'
  const [checkedDorks, setCheckedDorks] = useState<Set<string>>(new Set())
  const previousQueryRef = useRef<string>('')

  const REPO_KEY = 'recondork'

  const loadRepoStorage = () => {
    try {
      const raw = localStorage.getItem(REPO_KEY)
      return raw ? JSON.parse(raw) : {}
    } catch (e) {
      return {}
    }
  }

  const saveRepoStorage = (obj: Record<string, any>) => {
    try {
      localStorage.setItem(REPO_KEY, JSON.stringify(obj))
    } catch (e) {
      // ignore
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      setCheckedDorks(new Set(JSON.parse(saved)))
    }
  }, [])

  useEffect(() => {
    // when query changes, try to load saved selections for that query
    const repo = loadRepoStorage()
    if (previousQueryRef.current && previousQueryRef.current !== query) {
      const savedForQuery = repo[query]
      if (savedForQuery) {
        // flatten saved ids for all engines/categories
        const ids: string[] = []
        Object.values(savedForQuery as Record<string, Record<string, string[]>>).forEach((eng) => {
          Object.values(eng).forEach((arr) => ids.push(...arr))
        })
        setCheckedDorks(new Set(ids))
        localStorage.setItem(storageKey, JSON.stringify(ids))
      } else {
        setCheckedDorks(new Set())
        localStorage.removeItem(storageKey)
      }
    }
    previousQueryRef.current = query
  }, [query])

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(Array.from(checkedDorks)))
  }, [checkedDorks])

  const toggleDork = (dorkId: string) => {
    // Find engine and category for this dork so we can persist under the query
    const findLocation = () => {
      for (const engineKey of Object.keys(data.engines)) {
        const categories = data.engines[engineKey]
        for (const [category, items] of Object.entries(categories)) {
          if (Array.isArray(items) && items.find((i: any) => i.id === dorkId)) {
            return { engine: engineKey, category }
          }
        }
      }
      return null
    }

    const loc = findLocation()
    setCheckedDorks((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(dorkId)) newSet.delete(dorkId)
      else newSet.add(dorkId)

      // persist into repo storage under current query
      try {
        const repo = loadRepoStorage()
        const q = query || ''
        if (!repo[q]) repo[q] = {}
        if (loc) {
          if (!repo[q][loc.engine]) repo[q][loc.engine] = {}
          if (!repo[q][loc.engine][loc.category]) repo[q][loc.engine][loc.category] = []
          // compute ids for this category from newSet
          const categoryItems = (data.engines[loc.engine][loc.category] || []).map((i: any) => i.id)
          const selectedIds = categoryItems.filter((id: string) => newSet.has(id))
          repo[q][loc.engine][loc.category] = selectedIds
        }
        saveRepoStorage(repo)
      } catch (e) {
        // ignore
      }

      localStorage.setItem(storageKey, JSON.stringify(Array.from(newSet)))
      return newSet
    })
  }

  if (activeEngines.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <p className="text-muted-foreground text-lg">
          Select at least one search engine to generate dorks
        </p>
      </motion.div>
    )
  }

  const handleCopyDork = (template: string) => {
    const finalDork = template.replace(/{query}/g, query)
    copyToClipboard(finalDork, () => {
      toast.success('Copied to clipboard!', {
        description: finalDork.substring(0, 50) + '...',
      })
    })
  }

  const handleOpenDork = (template: string, engine: string) => {
    const url = generateSearchUrl(template, query, engine)
    openInNewTab(url)
  }

  const handleOpenAll = (engine: EngineType) => {
    const engineDorks = Object.values(getEngineData(engine)).flat() as Dork[]
    engineDorks.forEach((dork) => {
      handleOpenDork(dork.template, engine)
    })
    toast.success(`Opened ${engineDorks.length} dorks in new tabs`, {
      description: `All ${ENGINE_LABELS[engine]} dorks opened`,
    })
  }

  const handleOpenAllDorks = () => {
    let totalOpened = 0
    activeEngines.forEach((engine) => {
      const engineDorks = Object.values(getEngineData(engine)).flat() as Dork[]
      engineDorks.forEach((dork) => {
        handleOpenDork(dork.template, engine)
        totalOpened++
      })
    })
    toast.success(`Opened ${totalOpened} dorks in new tabs`, {
      description: 'All selected dorks opened',
    })
  }

  const countCheckedDorks = (ids: string[]): number => {
    return ids.filter((id) => checkedDorks.has(id)).length
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="w-full space-y-4"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Generated Dorks</h2>
          <p className="text-muted-foreground text-sm mt-1">
            {activeEngines.length} engine{activeEngines.length !== 1 ? 's' : ''} selected
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button onClick={handleOpenAllDorks} className="gap-2">
            <ExternalLink className="h-4 w-4" />
            Open All
          </Button>
        </motion.div>
      </div>

      <Accordion
        type="multiple"
        value={openAccordions}
        onValueChange={setOpenAccordions}
        className="w-full space-y-2 border rounded-lg overflow-hidden"
      >
        <AnimatePresence>
          {activeEngines.map((engine) => {
            const engineData = getEngineData(engine)
            const engineCategories = Object.entries(engineData) as [string, Dork[]][]
            const engineDorks = engineCategories.flatMap(([, dorks]) => dorks)
            const engineCheckedCount = countCheckedDorks(engineDorks.map((dork) => dork.id))

            return (
              <motion.div
                key={engine}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <AccordionItem value={engine} className="border-b last:border-b-0">
                  <AccordionTrigger value={engine} className="hover:bg-muted/50 transition-colors w-full">
                    <div className="flex w-full items-center gap-2">
                      <span className="font-semibold text-xl mb-2">{ENGINE_LABELS[engine]}</span>
                      <span className="text-xs ml-auto bg-muted px-2 py-1 rounded-full">
                        {engineCheckedCount}/{engineDorks.length} dork{engineDorks.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent value={engine} className="space-y-2 pt-2">
                    <Accordion type="multiple" className="space-y-2 pb-2">
                      {engineCategories.map(([category, dorks]) => (
                        <AccordionItem key={`${engine}-${category}`} value={`${engine}-${category}`} className="border rounded-lg overflow-hidden">
                          <AccordionTrigger
                            value={`${engine}-${category}`}
                            className="bg-muted/40 hover:bg-muted/60 transition-colors w-full"
                          >
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{category}</span>
                              <span className="text-xs ml-auto bg-background px-2 py-1 rounded-full">
                                {dorks.length} dork{dorks.length !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent value={`${engine}-${category}`}>
                            <div className="space-y-2">
                              {dorks.map((dork, idx) => {
                                const finalDork = dork.template.replace(/{query}/g, query)
                                const isChecked = checkedDorks.has(dork.id)
                                return (
                                  <motion.div
                                    key={dork.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`flex items-start gap-2 p-3 mt-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors ${
                                      isChecked ? 'opacity-40 text-muted-foreground line-through decoration-2' : ''
                                    }`}
                                  >
                                    <Checkbox
                                      checked={isChecked}
                                      onCheckedChange={() => toggleDork(dork.id)}
                                      className="my-auto ml-2 mr-4 flex-shrink-0"
                                      id={`checkbox-${dork.id}`}
                                    />
                                    <label htmlFor={`checkbox-${dork.id}`} className="flex-1 min-w-0 cursor-pointer">
                                      <div className="flex-1 min-w-0">
                                        <p className="text-md text-muted-foreground mt-1">
                                          {dork.description}
                                        </p>
                                        <code className="text-xs sm:text-sm break-all font-mono text-muted-foreground">
                                          {finalDork}
                                        </code>
                                      </div>
                                    </label>
                                    <div className="flex gap-1 flex-shrink-0 my-auto">
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleCopyDork(dork.template)}
                                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label={`Copy ${dork.id}`}
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="outline"
                                        onClick={() => handleOpenDork(dork.template, engine)}
                                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label={`Open ${dork.id}`}
                                      >
                                        <ExternalLink className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </motion.div>
                                )
                              })}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        onClick={() => handleOpenAll(engine)}
                        variant="outline"
                        className="w-full text-sm"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open All {ENGINE_LABELS[engine]} Dorks
                      </Button>
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </Accordion>
    </motion.div>
  )
}
