import { motion } from 'framer-motion';
import { Shield, Lock, Eye, Trash2, FileText, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  const privacyFeatures = [
    {
      icon: Lock,
      title: 'End-to-End Encryption',
      description: 'All messages are encrypted using AES-256-GCM before leaving your device. Only you and the recipient can read them.',
    },
    {
      icon: Eye,
      title: 'Zero Knowledge Architecture',
      description: 'We never store readable message content. Our servers act as blind relays, unable to inspect or access your data.',
    },
    {
      icon: Trash2,
      title: 'Automatic Data Deletion',
      description: 'Messages are deleted from memory when you log out. No data is stored on disk or in browser storage.',
    },
    {
      icon: Shield,
      title: 'Account Security',
      description: 'Account lockout after 3 failed attempts, device verification, and email notifications for all security events.',
    },
    {
      icon: FileText,
      title: 'Privacy Controls',
      description: 'Full control over your data. Opt-out of emails, request data export, or delete your account anytime.',
    },
    {
      icon: CheckCircle,
      title: 'GDPR & CCPA Compliant',
      description: 'We comply with GDPR, CCPA, and other privacy regulations. Your rights are protected by law.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />

      <section className="w-full max-w-[100rem] mx-auto px-8 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="font-heading text-6xl md:text-7xl mb-6 text-primary">
              Your Privacy, Protected
            </h1>
            <p className="text-xl text-secondary max-w-2xl mx-auto">
              We believe privacy is a fundamental right. Our architecture ensures your data is protected through mathematical certainty, not just policy.
            </p>
          </div>

          {/* Privacy Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {privacyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 border border-secondary/20 bg-background/50 backdrop-blur-sm hover:border-accent/50 transition-colors"
              >
                <feature.icon className="w-8 h-8 text-accent mb-4" strokeWidth={1.5} />
                <h3 className="font-heading text-xl text-primary mb-3">{feature.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Data Collection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="font-heading text-4xl text-primary mb-8">What We Collect</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 border border-accent/30 bg-accent/5">
                <h3 className="font-heading text-lg text-accent mb-4">✓ We Collect</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Email address (for account recovery)</li>
                  <li>• User ID (for login)</li>
                  <li>• Password hash (never plain text)</li>
                  <li>• Vault PIN hash (for chat access)</li>
                  <li>• Account creation date</li>
                </ul>
              </div>
              <div className="p-6 border border-destructive/30 bg-destructive/5">
                <h3 className="font-heading text-lg text-destructive mb-4">✗ We Don't Collect</h3>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Browsing history</li>
                  <li>• Location data</li>
                  <li>• Device fingerprints</li>
                  <li>• Tracking cookies</li>
                  <li>• Message content (encrypted)</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Data Retention */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="font-heading text-4xl text-primary mb-8">Data Retention</h2>
            <div className="space-y-4">
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-2">Messages</h3>
                <p className="text-secondary">
                  Deleted from memory when you log out. No persistent storage on servers or devices.
                </p>
              </div>
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-2">Account Data</h3>
                <p className="text-secondary">
                  Retained until you request deletion. You can delete your account anytime.
                </p>
              </div>
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-2">Security Logs</h3>
                <p className="text-secondary">
                  Login attempts and security events logged for 30 days for your protection.
                </p>
              </div>
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-2">Audit Logs</h3>
                <p className="text-secondary">
                  Encrypted audit logs of data access and modifications for compliance.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Your Rights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="font-heading text-4xl text-primary mb-8">Your Rights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  Right to Access
                </h3>
                <p className="text-secondary text-sm">
                  Request a copy of all data we hold about you in a machine-readable format.
                </p>
              </div>
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  Right to Deletion
                </h3>
                <p className="text-secondary text-sm">
                  Request permanent deletion of your account and all associated data.
                </p>
              </div>
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  Right to Portability
                </h3>
                <p className="text-secondary text-sm">
                  Export your data in a standard format to move to another service.
                </p>
              </div>
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  Right to Opt-Out
                </h3>
                <p className="text-secondary text-sm">
                  Disable email notifications and control how your data is used.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Security Measures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-24"
          >
            <h2 className="font-heading text-4xl text-primary mb-8">Security Measures</h2>
            <div className="p-8 border border-secondary/20 bg-background/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-heading text-lg text-primary mb-4">Encryption</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• AES-256-GCM for message encryption</li>
                    <li>• TLS 1.3 for transport security</li>
                    <li>• PBKDF2-SHA256 for key derivation</li>
                    <li>• RSA for key exchange</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-primary mb-4">Access Control</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Account lockout after 3 failed attempts</li>
                    <li>• 10-minute temporary block</li>
                    <li>• Device verification for new logins</li>
                    <li>• Email notifications for security events</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Compliance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-4xl text-primary mb-8">Compliance</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-2">GDPR</h3>
                <p className="text-secondary text-sm">
                  Compliant with General Data Protection Regulation (EU)
                </p>
              </div>
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-2">CCPA</h3>
                <p className="text-secondary text-sm">
                  Compliant with California Consumer Privacy Act (USA)
                </p>
              </div>
              <div className="p-6 border border-secondary/20 bg-background/50">
                <h3 className="font-heading text-lg text-primary mb-2">Privacy by Design</h3>
                <p className="text-secondary text-sm">
                  Privacy built into every aspect of our platform
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
