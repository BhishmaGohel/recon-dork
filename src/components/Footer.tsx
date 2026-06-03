import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Github, ExternalLink } from 'lucide-react'
import { Button } from './ui/Button'

interface FooterLink {
  name: string
  path: string
  external?: boolean
}

export function Footer() {
  const footerSections: Array<{ title: string; links: FooterLink[] }> = [
    {
      title: 'Information',
      links: [
        { name: 'Ethics', path: '/recon-dork/ethics' },
        { name: 'Terms of Use', path: '/recon-dork/terms' },
        { name: 'Resources', path: '/recon-dork/resources' },
        { name: 'Releases', path: '/recon-dork/releases' },
      ],
    },
    {
      title: 'Community',
      links: [
        {
          name: 'GitHub',
          path: 'https://github.com/BhishmaGohel/recon-dork',
          external: true,
        },
        {
          name: 'Report Issues',
          path: 'https://github.com/BhishmaGohel/recon-dork/issues',
          external: true,
        },
      ],
    },
  ]

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="border-t border-border/50 mt-16 py-12 bg-muted/50"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-bold text-lg mb-2">Recon-Dork</h3>
            <p className="text-sm text-muted-foreground">
              Professional OSINT dork generator for authorized security research and penetration testing.
            </p>
          </motion.div>

          {/* Links Sections */}
          {footerSections.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.1 }}
            >
              <h4 className="font-semibold mb-4 text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                      >
                        {link.name}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-border/30 pt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left text-sm text-muted-foreground">
              <p>Built with ❤️ By Bhishma for the security community</p>
              <p className="mt-1">
                Use responsibly for authorized security testing only. See{' '}
                <Link to="/ethics" className="text-purple-600 hover:text-purple-700 dark:text-purple-400">
                  ethics guidelines
                </Link>
                .
              </p>
            </div>
            <a
              href="https://github.com/BhishmaGohel/recon-dork"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-2"
              >
                <Github className="h-4 w-4" />
                GitHub
              </Button>
            </a>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-border/30 text-center text-xs text-muted-foreground">
            <p>© 2026 Recon-Dork. All rights reserved. | MIT License</p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}
