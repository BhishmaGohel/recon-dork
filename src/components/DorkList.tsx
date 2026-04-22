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
import { useEffect, useState } from 'react'

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

  // Get selected engines
  const activeEngines = (Object.entries(selectedEngines) as [EngineType, boolean][])
    .filter(([, selected]) => selected)
    .map(([engine]) => engine)

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

  const handleOpenAll = (engine: string) => {
    const engineDorks = data.engines[engine] || []
    engineDorks.forEach((dork: Dork) => {
      handleOpenDork(dork.template, engine)
    })
    toast.success(`Opened ${engineDorks.length} dorks in new tabs`, {
      description: `All ${ENGINE_LABELS[engine]} dorks opened`,
    })
  }

  const handleOpenAllDorks = () => {
    let totalOpened = 0
    activeEngines.forEach((engine) => {
      const engineDorks = data.engines[engine] || []
      engineDorks.forEach((dork: Dork) => {
        handleOpenDork(dork.template, engine)
        totalOpened++
      })
    })
    toast.success(`Opened ${totalOpened} dorks in new tabs`, {
      description: 'All selected dorks opened',
    })
  }

  const useCheckedDorks = () => {
    const storageKey = `checkedDorks`;
    const [checkedDorks, setCheckedDorks] = useState<Set<string>>(new Set());

    React.useEffect(() => {
      // Load from localStorage on mount
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        setCheckedDorks(new Set(JSON.parse(saved)));
      }
    }, [storageKey]);

    useEffect(() => {
      // Save to localStorage on change
      localStorage.setItem(storageKey, JSON.stringify(Array.from(checkedDorks)));
    }, [checkedDorks, storageKey]);

    const toggleDork = (dorkId: string) => {
      setCheckedDorks(prev => {
        const newSet = new Set(prev);
        if (newSet.has(dorkId)) {
          newSet.delete(dorkId);
        } else {
          newSet.add(dorkId);
        }
        return newSet;
      });
    };

    return { checkedDorks, toggleDork };
  }

  const { checkedDorks, toggleDork } = useCheckedDorks();

  // const countCheckedDorks = (checkedSet: Set<string>, substring: string): number => {
  //   return Array.from(checkedSet).filter(str => str.includes(substring)).length;
  // };

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
            const engineDorks = data.engines[engine] || []
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
                        {engineDorks.length} dork{engineDorks.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent value={engine} className="space-y-2 pt-2">
                    <div className="space-y-2 mb-4">
                      {engineDorks.map((dork: Dork, idx: number) => {
                        const finalDork = dork.template.replace(/{query}/g, query)
                        const isChecked = checkedDorks.has(dork.id)
                        return (
                          <motion.div
                            key={dork.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`flex items-start gap-2 p-3 bg-muted/50 rounded-lg group hover:bg-muted transition-colors ${
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
