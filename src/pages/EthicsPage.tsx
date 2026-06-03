import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle, Shield } from 'lucide-react'
import { TableOfContents } from '@/components/TableOfContents'

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'legal-compliance', title: 'Legal Compliance' },
  { id: 'authorization', title: 'Authorization Requirements' },
  { id: 'responsible-disclosure', title: 'Responsible Disclosure' },
  { id: 'best-practices', title: 'Best Practices' },
  { id: 'consequences', title: 'Consequences of Misuse' },
]

export function EthicsPage() {
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
            <Shield className="h-8 w-8 text-purple-600" />
            <h1 className="text-4xl md:text-5xl font-bold">Responsible Usage Guidelines</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Understanding ethical OSINT practices and legal requirements for using the Dork Generator
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
            {/* Introduction */}
            <section id="introduction" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                The Dork Generator is a powerful OSINT (Open Source Intelligence) tool designed for security professionals,
                penetration testers, and authorized researchers. This tool, while incredibly useful for legitimate security
                testing, must be used responsibly and ethically.
              </p>
              <p className="text-muted-foreground">
                By using this application, you agree to comply with all applicable laws, regulations, and ethical standards.
                Misuse can result in severe legal consequences.
              </p>
            </section>

            {/* Legal Compliance */}
            <section id="legal-compliance" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Legal Compliance</h2>
              <div className="space-y-4">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-500 mb-2">Important Legal Notice</h3>
                      <p className="text-sm text-muted-foreground">
                        Unauthorized access to computer systems is illegal under multiple jurisdictions:
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 ml-3">
                  <p className="text-muted-foreground"><strong>United States (CFAA):</strong> The Computer Fraud and Abuse Act (18 U.S.C. § 1030) prohibits intentional unauthorized access to protected computers. Violations can result in up to 20 years imprisonment.</p>
                  <p className="text-muted-foreground"><strong>GDPR (EU):</strong> Unauthorized data collection violates GDPR with fines up to €20 million or 4% of global revenue.</p>
                  <p className="text-muted-foreground"><strong>UK Data Protection Act:</strong> Similar penalties for unauthorized data access and processing.</p>
                  <p className="text-muted-foreground"><strong>DMCA (US):</strong> Circumventing security measures is illegal, even for testing purposes without authorization.</p>
                  <p className="text-muted-foreground"><strong>Other Jurisdictions:</strong> Nearly all countries have computer fraud and unauthorized access laws.</p>
                </div>
              </div>
            </section>

            {/* Authorization */}
            <section id="authorization" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Authorization Requirements</h2>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 space-y-4">
                <div className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-2">You MUST have explicit written authorization before:</h3>
                  </div>
                </div>

                <ul className="space-y-2 ml-6 text-muted-foreground">
                  <li>✓ Testing any system you don't own</li>
                  <li>✓ Accessing any third-party infrastructure</li>
                  <li>✓ Collecting data from any organization</li>
                  <li>✓ Searching for vulnerabilities outside your scope</li>
                  <li>✓ Accessing any restricted information</li>
                </ul>

                <p className="text-sm text-muted-foreground italic border-t border-blue-500/30 pt-4">
                  Written authorization should explicitly state the scope, duration, and types of testing permitted.
                </p>
              </div>
            </section>

            {/* Responsible Disclosure */}
            <section id="responsible-disclosure" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Responsible Disclosure</h2>
              <p className="text-muted-foreground mb-4">
                If you discover vulnerabilities during authorized testing:
              </p>
              <div className="space-y-3">
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">1. Document Findings</h4>
                  <p className="text-sm text-muted-foreground">Record all discovered vulnerabilities with proof of concept and impact assessment.</p>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">2. Private Notification</h4>
                  <p className="text-sm text-muted-foreground">Report directly to the affected organization through their security contact or HackerOne/Bugcrowd.</p>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">3. Provide Reasonable Timeline</h4>
                  <p className="text-sm text-muted-foreground">Allow 90 days for patching before public disclosure (industry standard).</p>
                </div>
                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">4. Never Exploit Further</h4>
                  <p className="text-sm text-muted-foreground">Stop immediately after confirming the vulnerability. Do not access additional systems or data.</p>
                </div>
              </div>
            </section>

            {/* Best Practices */}
            <section id="best-practices" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Best Practices</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-green-500 mb-3">✓ Do This</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Get written authorization first</li>
                    <li>• Define clear scope boundaries</li>
                    <li>• Use isolated test environments</li>
                    <li>• Document all activities</li>
                    <li>• Follow responsible disclosure</li>
                    <li>• Report findings promptly</li>
                    <li>• Keep findings confidential</li>
                  </ul>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-red-500 mb-3">✗ Never Do This</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Test without authorization</li>
                    <li>• Access beyond scope</li>
                    <li>• Modify or delete data</li>
                    <li>• Use credentials you found</li>
                    <li>• Public disclosure without notice</li>
                    <li>• Share vulnerabilities</li>
                    <li>• Exploit for personal gain</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Consequences */}
            <section id="consequences" className="scroll-mt-20">
              <h2 className="text-3xl font-bold mb-4">Consequences of Misuse</h2>
              <div className="space-y-4">
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-500 mb-2">Criminal Penalties</h4>
                  <p className="text-sm text-muted-foreground">Up to 20 years imprisonment under CFAA, plus substantial fines.</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-500 mb-2">Civil Liability</h4>
                  <p className="text-sm text-muted-foreground">Lawsuits for damages, attorney fees, and injunctive relief.</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-500 mb-2">Professional Consequences</h4>
                  <p className="text-sm text-muted-foreground">Career damage, certification revocation, and industry blacklisting.</p>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-500 mb-2">Educational Impact</h4>
                  <p className="text-sm text-muted-foreground">Expulsion from educational institutions and scholarship loss.</p>
                </div>
              </div>
            </section>

            {/* Footer CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mt-12"
            >
              <p className="text-center text-muted-foreground">
                By using the Dork Generator, you acknowledge that you have read, understood, and agree to comply with
                these ethical guidelines and all applicable laws.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
