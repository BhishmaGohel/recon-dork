import { motion, AnimatePresence } from 'framer-motion'
import { GitBranch, Star, Bug, Zap, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { TableOfContents } from '@/components/TableOfContents'
import { Button } from '@/components/ui/Button'

const sections = [
  { id: 'v1-5-1', title: 'v1.5.1 - Patch' },
  { id: 'v1-5-0-pr19', title: 'PR #19 (Master <> Develop sync)' },
  { id: 'v1-4-2-pr18', title: 'PR #18 (Updated dorks)' },
  { id: 'v1-4-1-pr17', title: 'PR #17 (Master <> Develop sync)' },
  { id: 'v1-5-0', title: 'v1.5.0' },
  { id: 'v1-4-0', title: 'v1.4.0' },
  { id: 'v1-3-0', title: 'v1.3.0' },
  { id: 'v1-2-0', title: 'v1.2.0' },
  { id: 'v1-1-0', title: 'v1.1.0' },
  { id: 'v1-0-0', title: 'v1.0.0 - Initial Release' },
]

interface ChangelogEntry {
  version: string
  date: string
  isCurrent: boolean
  features: string[]
  fixes: string[]
  improvements: string[]
  breaking?: string[]
}

const releases: ChangelogEntry[] = [
  {
    version: 'v1.5.1',
    date: 'June 3, 2026',
    isCurrent: true,
    features: [
      'Merged PR #21: updated dork checklist logic and minor content updates',
      'Added additional dorks and supporting files',
    ],
    fixes: [
      'Patched checklist behavior to reliably reset on query changes',
      'Addressed a few localStorage edge cases during navigation',
    ],
    improvements: [
      'Minor content and documentation refinements',
      'Small performance tweaks',
    ],
  },
  {
    version: 'v1.5.0',
    date: '2026-04-24',
    isCurrent: false,
    features: [
      'Merged PR #19: Master <> develop synchronization and housekeeping',
    ],
    fixes: [
      'Repository sync and merge conflict resolutions',
    ],
    improvements: [
      'Project synchronization and minor dependency updates',
    ],
  },
  {
    version: 'v1.4.2',
    date: '2026-04-24',
    isCurrent: false,
    features: [
      'Merged PR #18: Updated dorks and templates (bulk dork updates)',
    ],
    fixes: [],
    improvements: [
      'Expanded and refined dork templates for multiple engines',
    ],
  },
  {
    version: 'v1.4.1',
    date: '2026-04-23',
    isCurrent: false,
    features: [
      'Merged PR #17: Master <> develop synchronization',
    ],
    fixes: [],
    improvements: [
      'Repository housekeeping and minor adjustments',
    ],
  },
  {
    version: 'v1.5.0',
    date: 'June 2024',
    isCurrent: false,
    features: [
      'Added comprehensive documentation pages (Ethics, Terms, Resources, Releases)',
      'New Resources page with 30+ curated OSINT tools and learning materials',
      'Implemented Table of Contents component for easy navigation',
      'Added copy-to-clipboard functionality for resource URLs',
    ],
    fixes: [
      'Fixed dork checklist not clearing when query changes',
      'Fixed localStorage persistence across page navigation',
      'Resolved TypeScript strict mode warnings',
      'Fixed dark mode toggle performance',
    ],
    improvements: [
      'Enhanced mobile responsiveness for documentation pages',
      'Improved SEO with meta tags and structured data',
      'Better accessibility with ARIA labels and semantic HTML',
      'Optimized animation performance with Framer Motion',
    ],
  },
  {
    version: 'v1.4.0',
    date: 'May 2024',
    isCurrent: false,
    features: [
      'Added dark/light theme toggle with system preference detection',
      'Implemented persistent theme preference storage',
      'Added copy-to-clipboard for search commands',
      'New toast notifications for user feedback',
    ],
    fixes: [
      'Fixed accordion animations in Firefox',
      'Fixed responsive layout on tablet devices',
      'Fixed input validation edge cases',
    ],
    improvements: [
      'Updated Tailwind CSS to v3.4',
      'Improved input validation feedback',
      'Better error handling for clipboard API',
      'Enhanced visual hierarchy with better typography',
    ],
  },
  {
    version: 'v1.3.0',
    date: 'April 2024',
    isCurrent: false,
    features: [
      'Introduced dork checklist with selection tracking',
      'Added support for Censys search engine dorks',
      'Implemented localStorage for checklist persistence',
      'New filter section UI with better engine selection',
    ],
    fixes: [
      'Fixed dork templates with special characters',
      'Fixed URL encoding for special search operators',
      'Fixed accordion state management',
    ],
    improvements: [
      'Reorganized dork categories by search engine',
      'Better visual feedback for selected dorks',
      'Improved search result organization',
    ],
  },
  {
    version: 'v1.2.0',
    date: 'March 2024',
    isCurrent: false,
    features: [
      'Added real-time input validation (min 3 characters)',
      'New open-in-new-tab functionality for dorks',
      'Integrated Shodan search engine support',
      'Added dork descriptions for better understanding',
    ],
    fixes: [
      'Fixed form submission validation',
      'Fixed URL generation for different search engines',
      'Fixed special character handling in queries',
    ],
    improvements: [
      'Better error messages for validation',
      'Improved dork template clarity',
      'Enhanced user guidance text',
    ],
  },
  {
    version: 'v1.1.0',
    date: 'February 2024',
    isCurrent: false,
    features: [
      'Added GitHub search engine support',
      'Implemented engine filtering with checkboxes',
      'New accordion-based dork organization',
      'Added responsive mobile design',
    ],
    fixes: [
      'Fixed input field focus behavior',
      'Fixed accordion toggle responsiveness',
    ],
    improvements: [
      'Better visual design with gradients',
      'Improved mobile navigation',
      'Enhanced button states and feedback',
    ],
  },
  {
    version: 'v1.0.0',
    date: 'January 2024',
    isCurrent: false,
    features: [
      'Initial release of Recon-Dork application',
      'Google search dork templates with categories',
      'Search input with placeholder examples',
      'Copy-to-clipboard functionality',
      'Basic responsive design',
      'Modern UI with Tailwind CSS',
    ],
    fixes: [],
    improvements: [],
  },
]

export function ReleasesPage() {
  const [expandedVersion, setExpandedVersion] = useState<string>('v1.5.1')

  const ReleaseCard = ({ release }: { release: ChangelogEntry }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-muted/50 border border-border rounded-lg overflow-hidden hover:border-purple-500/50 transition-all"
    >
      <button
        onClick={() => setExpandedVersion(expandedVersion === release.version ? '' : release.version)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors"
      >
        <div className="text-left flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold">{release.version}</h3>
            {release.isCurrent && (
              <span className="flex items-center gap-1 bg-green-500/20 text-green-600 px-2 py-1 rounded text-xs font-semibold">
                <Star className="h-3 w-3" />
                Current
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{release.date}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            expandedVersion === release.version ? 'rotate-180' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {expandedVersion === release.version && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border px-6 py-4 space-y-4"
          >
            {/* Features */}
            {release.features.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-green-600">
                  <Zap className="h-4 w-4" />
                  Features
                </h4>
                <ul className="space-y-2">
                  {release.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-3">
                      <span className="text-green-600 font-bold flex-shrink-0">+</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improvements */}
            {release.improvements.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-blue-600">
                  <GitBranch className="h-4 w-4" />
                  Improvements
                </h4>
                <ul className="space-y-2">
                  {release.improvements.map((improvement, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-3">
                      <span className="text-blue-600 font-bold flex-shrink-0">~</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fixes */}
            {release.fixes.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-orange-600">
                  <Bug className="h-4 w-4" />
                  Bug Fixes
                </h4>
                <ul className="space-y-2">
                  {release.fixes.map((fix, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-3">
                      <span className="text-orange-600 font-bold flex-shrink-0">✓</span>
                      <span>{fix}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Breaking Changes */}
            {release.breaking && release.breaking.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2 text-red-600">
                  <Zap className="h-4 w-4" />
                  Breaking Changes
                </h4>
                <ul className="space-y-2">
                  {release.breaking.map((breaking, idx) => (
                    <li key={idx} className="text-sm text-red-600/70 flex gap-3">
                      <span className="text-red-600 font-bold flex-shrink-0">!</span>
                      <span>{breaking}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <GitBranch className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold">Releases & Changelog</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Track updates, new features, and improvements to Recon-Dork across all versions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <TableOfContents sections={sections} />

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="lg:col-span-3"
          >
            {/* Release Timeline */}
            <div className="space-y-4">
              {releases.map((release) => (
                <div key={release.version} id={release.version.toLowerCase().replace(/\./g, '-')} className="scroll-mt-20">
                  <ReleaseCard release={release} />
                </div>
              ))}
            </div>

            {/* Installation Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-12 bg-purple-500/10 border border-purple-500/30 rounded-lg p-6"
            >
              <h3 className="font-semibold mb-3">Quick Start</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get started with Recon-Dork in just a few steps:
              </p>
              <div className="space-y-2 text-sm font-mono bg-background border border-border rounded p-3 mb-4">
                <div>$ git clone https://github.com/BhishmaGohel/recon-dork</div>
                <div>$ cd recon-dork</div>
                <div>$ npm install</div>
                <div>$ npm run dev</div>
              </div>
              <a href="https://github.com/BhishmaGohel/recon-dork" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                >
                  View on GitHub
                </Button>
              </a>
            </motion.div>

            {/* Version Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="mt-6 bg-blue-500/10 border border-blue-500/30 rounded-lg p-6"
            >
              <h3 className="font-semibold mb-3">Version Support</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>
                  <span className="font-semibold text-foreground">Latest (v1.5.0):</span> Fully supported with new
                  features and bug fixes
                </li>
                <li>
                  <span className="font-semibold text-foreground">v1.4.0 - v1.0.0:</span> Security patches and critical
                  fixes
                </li>
                <li>
                  <span className="font-semibold text-foreground">Older versions:</span> No longer supported, please
                  upgrade
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
