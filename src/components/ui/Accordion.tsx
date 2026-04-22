import * as React from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionProps {
  type?: 'single' | 'multiple'
  value?: string[]
  onValueChange?: (value: string[]) => void
  children: React.ReactNode
  className?: string
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
  className?: string
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

const AccordionContext = React.createContext<{
  openItems: string[]
  toggleItem: (value: string) => void
}>({
  openItems: [],
  toggleItem: () => {},
})

const Accordion = React.forwardRef<
  HTMLDivElement,
  AccordionProps
>(
  ({ type = 'single', value, onValueChange, children, className }, ref) => {
    const [openItems, setOpenItems] = React.useState<string[]>(value || [])

    React.useEffect(() => {
      if (value !== undefined) {
        setOpenItems(value)
      }
    }, [value])

    const toggleItem = (itemValue: string) => {
      let newOpenItems: string[]
      if (type === 'single') {
        newOpenItems = openItems.includes(itemValue) ? [] : [itemValue]
      } else {
        newOpenItems = openItems.includes(itemValue)
          ? openItems.filter((v) => v !== itemValue)
          : [...openItems, itemValue]
      }
      setOpenItems(newOpenItems)
      onValueChange?.(newOpenItems)
    }

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem }}>
        <div ref={ref} className={cn('space-y-2', className)}>
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)
Accordion.displayName = 'Accordion'

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ children, className }, ref) => (
  <div ref={ref} className={cn('border-b', className)}>
    {children}
  </div>
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps & { value?: string }
>(({ children, className, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const itemValue = (props as any).value || ''
  const isOpen = context.openItems.includes(itemValue)

  return (
    <button
      ref={ref}
      onClick={() => context.toggleItem(itemValue)}
      className={cn(
        'flex flex-1 items-center justify-between py-4 px-3 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className
      )}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      <div className="flex-1 text-left">{children}</div>
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" aria-hidden="true" />
    </button>
  )
})
AccordionTrigger.displayName = 'AccordionTrigger'

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps & { value?: string }
>(({ children, className, ...props }, ref) => {
  const context = React.useContext(AccordionContext)
  const itemValue = (props as any).value || ''
  const isOpen = context.openItems.includes(itemValue)

  if (!isOpen) return null

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        className
      )}
      data-state={isOpen ? 'open' : 'closed'}
      {...props}
    >
      <div className="pb-4 px-3 pt-0">{children}</div>
    </div>
  )
})
AccordionContent.displayName = 'AccordionContent'

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
