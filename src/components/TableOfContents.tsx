import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Section {
  id: string
  title: string
}

interface TableOfContentsProps {
  sections: Section[]
}

export function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    // Set initial active section
    if (sections.length > 0) {
      setActiveSection(sections[0].id)
    }
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const handleSmoothScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - 80
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:block"
    >
      <div className="sticky top-20 bg-muted/50 border border-border rounded-lg p-4 space-y-2">
        <h3 className="text-sm font-semibold text-foreground mb-3 px-3">Contents</h3>
        <nav className="space-y-1">
          {sections.map((section) => (
            <motion.button
              key={section.id}
              onClick={() => handleSmoothScroll(section.id)}
              className={`block w-full text-left px-3 py-2 rounded-md transition-all text-sm font-medium ${
                activeSection === section.id
                  ? 'bg-purple-500/20 text-purple-600 border-l-2 border-purple-500'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
              whileHover={{ x: 4 }}
              whileTap={{ x: 2 }}
            >
              {section.title}
            </motion.button>
          ))}
        </nav>
      </div>
    </motion.div>
  )
}
