import { motion } from 'framer-motion'
import { FileText, AlertTriangle, Shield } from 'lucide-react'
import { TableOfContents } from '@/components/TableOfContents'

const sections = [
  { id: 'disclaimer', title: 'Disclaimer' },
  { id: 'no-warranty', title: 'No Warranty' },
  { id: 'limitation-liability', title: 'Limitation of Liability' },
  { id: 'user-responsibility', title: 'User Responsibility' },
  { id: 'intellectual-property', title: 'Intellectual Property' },
  { id: 'changes', title: 'Changes to Terms' },
]

export function TermsPage() {
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
            <FileText className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold">Terms of Service & Legal Disclaimer</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Please read carefully before using the Dork Generator
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
            {/* Disclaimer */}
            <section id="disclaimer" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">DISCLAIMER</h2>
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6 space-y-4">
                <div className="flex gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-red-500 mb-2">Disclaimer of Use</h3>
                    <p className="text-sm text-muted-foreground">
                      The Dork Generator is provided "AS-IS" for educational, research, and authorized security testing purposes only.
                      The developers and maintainers assume NO responsibility for:
                    </p>
                  </div>
                </div>

                <ul className="space-y-2 ml-6 text-sm text-muted-foreground list-disc">
                  <li>Unauthorized access to computer systems</li>
                  <li>Violation of privacy laws or data protection regulations</li>
                  <li>Discovery or exploitation of security vulnerabilities</li>
                  <li>Data breach incidents or information disclosure</li>
                  <li>Misuse of this tool for illegal purposes</li>
                  <li>Any harm resulting from use of this tool</li>
                </ul>

                <p className="text-sm text-muted-foreground italic border-t border-red-500/30 pt-4">
                  Users are solely responsible for all consequences arising from their use of this tool.
                </p>
              </div>
            </section>

            {/* No Warranty */}
            <section id="no-warranty" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">No Warranty</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  This tool is provided on an "AS-IS" basis without any express or implied warranty of any kind, including:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Fitness for Purpose</h4>
                    <p className="text-sm text-muted-foreground">The tool may not meet your specific requirements.</p>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Accuracy</h4>
                    <p className="text-sm text-muted-foreground">Dork templates and results may be incomplete or outdated.</p>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Availability</h4>
                    <p className="text-sm text-muted-foreground">The service may be interrupted or unavailable.</p>
                  </div>
                  <div className="bg-muted/50 border border-border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">Non-Infringement</h4>
                    <p className="text-sm text-muted-foreground">Use may violate third-party rights.</p>
                  </div>
                </div>

                <p className="text-muted-foreground">
                  To the maximum extent permitted by law, we disclaim all warranties, representations, and conditions,
                  express or implied, including but not limited to warranties of merchantability and fitness for a particular purpose.
                </p>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section id="limitation-liability" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Limitation of Liability</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Under no circumstances shall the developers, maintainers, or any affiliated parties be liable for any indirect,
                  incidental, special, consequential, or punitive damages resulting from:
                </p>

                <ul className="space-y-2 ml-6 text-muted-foreground list-disc">
                  <li>Use or inability to use the Dork Generator</li>
                  <li>Loss of data, revenues, or profits</li>
                  <li>Business interruption</li>
                  <li>Reputational harm</li>
                  <li>Legal disputes or regulatory investigations</li>
                  <li>Any other matter related to this tool</li>
                </ul>

                <p className="text-muted-foreground">
                  Even if advised of the possibility of such damages, the maximum liability shall not exceed the amount paid
                  (if any) for using this tool, which is zero.
                </p>
              </div>
            </section>

            {/* User Responsibility */}
            <section id="user-responsibility" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">User Responsibility</h2>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 space-y-4">
                <div className="flex gap-3">
                  <Shield className="h-6 w-6 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-purple-500 mb-2">You Assume All Risk</h3>
                    <p className="text-sm text-muted-foreground">
                      By using this tool, you expressly assume all risk and responsibility for:
                    </p>
                  </div>
                </div>

                <div className="space-y-3 ml-3">
                  <p className="text-sm text-muted-foreground">
                    <strong>Legal Compliance:</strong> Ensuring your use complies with all applicable federal, state, and local laws.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Authorization:</strong> Obtaining proper authorization before testing any system.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Data Protection:</strong> Protecting any sensitive information you discover.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Liability:</strong> All consequences arising from your use of this tool.
                  </p>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section id="intellectual-property" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Intellectual Property</h2>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  The Dork Generator and all dork templates are provided under the MIT License for educational and research purposes.
                </p>

                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Open Source Attribution</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    You must maintain all copyright notices and license information when distributing or modifying this project.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    For full license details, visit: <a href="https://github.com/BhishmaGohel/recon-dork/blob/master/LICENSE" 
                    target="_blank" rel="noopener noreferrer" className="text-purple-500 hover:underline">MIT License</a>
                  </p>
                </div>

                <p className="text-muted-foreground">
                  Third-party tools, frameworks, and resources referenced are subject to their respective licenses.
                  Users are responsible for reviewing and complying with those licenses.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section id="changes" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                These terms and conditions may be updated at any time without prior notice. Your continued use of the
                Dork Generator after changes constitutes your acceptance of the new terms.
              </p>
              <p className="text-muted-foreground">
                For the latest version of these terms, always refer to this page.
              </p>
            </section>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mt-12"
            >
              <h3 className="font-semibold mb-2">Acknowledgment</h3>
              <p className="text-sm text-muted-foreground">
                By using the Dork Generator, you acknowledge that you have read, understood, and agree to all terms,
                conditions, and disclaimers contained herein. If you do not agree, do not use this tool.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
