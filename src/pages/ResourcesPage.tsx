import { motion } from 'framer-motion'
import { BookOpen, Wrench, Video, ExternalLink, Copy } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { TableOfContents } from '@/components/TableOfContents'
import { Button } from '@/components/ui/Button'

const sections = [
  { id: 'osint-tools', title: 'OSINT Tools & Frameworks' },
  { id: 'search-engines', title: 'Advanced Search Engines' },
  { id: 'learning-resources', title: 'Learning Materials' },
]

const resources = {
  osintTools: [
    {
      id: 1,
      name: 'TheHarvester',
      category: 'Email & Domain',
      description: 'Gather emails, subdomains, and hosts using public sources',
      url: 'https://github.com/laramies/theHarvester',
      type: 'Open Source',
    },
    {
      id: 2,
      name: 'OSINT Framework',
      category: 'Meta-Framework',
      description: 'Web-based collection of OSINT tools and resources',
      url: 'https://osintframework.com',
      type: 'Web Platform',
    },
    {
      id: 3,
      name: 'Shodan',
      category: 'IoT Search',
      description: 'Search the internet of everything - IoT devices, cameras, servers',
      url: 'https://www.shodan.io',
      type: 'SaaS',
    },
    {
      id: 4,
      name: 'Censys',
      category: 'Certificate Search',
      description: 'Search hosts and certificates across the internet',
      url: 'https://censys.io',
      type: 'SaaS',
    },
    {
      id: 5,
      name: 'VirusTotal',
      category: 'File Analysis',
      description: 'Analyze suspicious files and URLs with 90+ antivirus engines',
      url: 'https://www.virustotal.com',
      type: 'SaaS',
    },
    {
      id: 6,
      name: 'Maltego',
      category: 'Graph Analysis',
      description: 'Visual link analysis for OSINT investigations',
      url: 'https://www.maltego.com',
      type: 'Commercial',
    },
    {
      id: 7,
      name: 'Recon-ng',
      category: 'Reconnaissance',
      description: 'Full-featured web reconnaissance framework',
      url: 'https://github.com/lanmaster53/recon-ng',
      type: 'Open Source',
    },
    {
      id: 8,
      name: 'SpiderFoot',
      category: 'Automation',
      description: 'Automated OSINT tool for threat intelligence gathering',
      url: 'https://www.spiderfoot.net',
      type: 'Open Source',
    },
    {
      id: 9,
      name: 'Shodan CLI',
      category: 'Command Line',
      description: 'Command-line interface for Shodan searches',
      url: 'https://cli.shodan.io',
      type: 'CLI Tool',
    },
    {
      id: 10,
      name: 'Whois Lookup',
      category: 'Domain Info',
      description: 'Query WHOIS databases for domain registration details',
      url: 'https://whois.domaintools.com',
      type: 'Web Tool',
    },
    {
      id: 11,
      name: 'Hunter.io',
      category: 'Email Finding',
      description: 'Find professional email addresses from domain names',
      url: 'https://hunter.io',
      type: 'SaaS',
    },
    {
      id: 12,
      name: 'Clearbit',
      category: 'Company Data',
      description: 'Enrichment API for company and contact information',
      url: 'https://clearbit.com',
      type: 'SaaS',
    },
    {
      id: 13,
      name: 'Wayback Machine',
      category: 'Historical Data',
      description: 'Archive of websites showing historical snapshots',
      url: 'https://web.archive.org',
      type: 'Web Tool',
    },
    {
      id: 14,
      name: 'DNS Dumpster',
      category: 'DNS Enumeration',
      description: 'DNS reconnaissance and domain mapping',
      url: 'https://dnsdumpster.com',
      type: 'Web Tool',
    },
    {
      id: 15,
      name: 'Sublist3r',
      category: 'Subdomain Enum',
      description: 'Fast subdomain enumeration using multiple sources',
      url: 'https://github.com/aboul3la/Sublist3r',
      type: 'Open Source',
    },
    {
      id: 16,
      name: 'Amass',
      category: 'Asset Discovery',
      description: 'In-depth DNS enumeration and network mapping',
      url: 'https://github.com/OWASP/Amass',
      type: 'Open Source',
    },
    {
      id: 17,
      name: 'Photon',
      category: 'Web Crawler',
      description: 'Web crawler for crawling URLs, emails, files, and comments',
      url: 'https://github.com/s0md3v/Photon',
      type: 'Open Source',
    },
    {
      id: 18,
      name: 'Metagoofil',
      category: 'Metadata',
      description: 'Extract metadata from public documents',
      url: 'https://github.com/laramies/metagoofil',
      type: 'Open Source',
    },
    {
      id: 19,
      name: 'EOSINT',
      category: 'Email OSINT',
      description: 'Email ownership verification and OSINT',
      url: 'https://eosint.com',
      type: 'Web Tool',
    },
    {
      id: 20,
      name: 'Shodan Filters Cheat Sheet',
      category: 'Reference',
      description: 'Complete guide to Shodan search filters and operators',
      url: 'https://github.com/jakecreps/shodan-filters',
      type: 'Documentation',
    },
  ],
  searchEngines: [
    {
      id: 21,
      name: 'Google Search',
      category: 'General Purpose',
      description: 'Advanced Google operators for specific file and data discovery',
      url: 'https://www.google.com',
      type: 'Search Engine',
    },
    {
      id: 22,
      name: 'GitHub Search',
      category: 'Code Repositories',
      description: 'Search public repositories for leaked credentials and configs',
      url: 'https://github.com/search',
      type: 'Search Engine',
    },
    {
      id: 23,
      name: 'Bing Search',
      category: 'General Purpose',
      description: 'Alternative search engine with different indexing',
      url: 'https://www.bing.com',
      type: 'Search Engine',
    },
    {
      id: 24,
      name: 'DuckDuckGo',
      category: 'Privacy-Focused',
      description: 'Privacy-respecting search without tracking',
      url: 'https://duckduckgo.com',
      type: 'Search Engine',
    },
  ],
  learningResources: [
    {
      id: 25,
      name: 'OWASP Testing Guide',
      category: 'Web Security',
      description: 'Comprehensive guide to web application security testing',
      url: 'https://owasp.org/www-project-web-security-testing-guide/',
      type: 'Free Guide',
    },
    {
      id: 26,
      name: 'PentesterLab',
      category: 'Hands-on Training',
      description: 'Practical exercises and certifications for penetration testing',
      url: 'https://pentesterlab.com',
      type: 'Freemium Course',
    },
    {
      id: 27,
      name: 'TryHackMe',
      category: 'Interactive Learning',
      description: 'Gamified cybersecurity training with hands-on labs',
      url: 'https://tryhackme.com',
      type: 'Freemium Course',
    },
    {
      id: 28,
      name: 'HackTheBox',
      category: 'CTF Challenges',
      description: 'Realistic cybersecurity training and capture the flag',
      url: 'https://www.hackthebox.com',
      type: 'Freemium Course',
    },
    {
      id: 29,
      name: 'SANS Security Essentials',
      category: 'Fundamentals',
      description: 'Free introductory cybersecurity training from SANS Institute',
      url: 'https://www.sans.org/cyber-aces/',
      type: 'Free Course',
    },
    {
      id: 30,
      name: 'Bugcrowd Learning',
      category: 'Bug Bounty',
      description: 'Free resources for bug bounty and vulnerability research',
      url: 'https://www.bugcrowd.com/resources/',
      type: 'Free Resources',
    },
    {
      id: 31,
      name: 'OWASP Top 10',
      category: 'Web Security',
      description: 'List of the top 10 web application security risks',
      url: 'https://owasp.org/www-project-top-ten/',
      type: 'Documentation',
    },
    {
      id: 32,
      name: 'PortSwigger Web Security Academy',
      category: 'Interactive Learning',
      description: 'Free interactive cybersecurity training and labs',
      url: 'https://portswigger.net/web-security',
      type: 'Free Course',
    },
    {
      id: 33,
      name: 'Google Gruyere',
      category: 'Code Walkthrough',
      description: 'Web security codelab with vulnerable code',
      url: 'https://google-gruyere.appspot.com/',
      type: 'Free Course',
    },
    {
      id: 34,
      name: 'Ethical Hacking 101 (YouTube)',
      category: 'Video Tutorial',
      description: 'Free comprehensive ethical hacking course on YouTube',
      url: 'https://www.youtube.com/watch?v=2TofunAI6fU',
      type: 'Free Video',
    },
  ],
}

export function ResourcesPage() {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const handleCopyUrl = (url: string, id: number) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast.success('URL copied to clipboard!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const ResourceCard = ({ resource }: { resource: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="bg-muted/50 border border-border rounded-lg p-4 hover:border-purple-500/50 transition-all"
    >
      <div className="flex items-start justify-between gap-4 mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-foreground">{resource.name}</h4>
          <p className="text-xs text-muted-foreground mb-2">{resource.category}</p>
        </div>
        <span className="text-xs bg-purple-500/20 text-purple-500 px-2 py-1 rounded whitespace-nowrap">
          {resource.type}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
      <div className="flex gap-2">
        <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button
            size="sm"
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <ExternalLink className="h-3 w-3" />
            Visit
          </Button>
        </a>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleCopyUrl(resource.url, resource.id)}
          className="px-3"
        >
          {copiedId === resource.id ? '✓' : <Copy className="h-3 w-3" />}
        </Button>
      </div>
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
            <BookOpen className="h-8 w-8 text-green-600" />
            <h1 className="text-4xl md:text-5xl font-bold">OSINT Resources</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Curated collection of tools, frameworks, and learning materials for security professionals
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
            className="lg:col-span-3 space-y-12"
          >
            {/* OSINT Tools */}
            <section id="osint-tools" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Wrench className="h-8 w-8 text-purple-600" />
                OSINT Tools & Frameworks
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {resources.osintTools.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </section>

            {/* Search Engines */}
            <section id="search-engines" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <ExternalLink className="h-8 w-8 text-blue-600" />
                Advanced Search Engines
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {resources.searchEngines.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </section>

            {/* Learning Resources */}
            <section id="learning-resources" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                <Video className="h-8 w-8 text-orange-600" />
                Learning Materials
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {resources.learningResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </section>

            {/* Footer Note */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mt-12"
            >
              <h3 className="font-semibold mb-2">Contributing Resources</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Know of a great free OSINT tool or learning resource? We accept contributions! Please open an issue or
                pull request on our GitHub repository.
              </p>
              <a href="https://github.com/BhishmaGohel/recon-dork" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="sm"
                >
                  Contribute on GitHub
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
