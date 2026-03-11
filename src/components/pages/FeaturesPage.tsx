import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BaseCrudService } from '@/integrations';
import { SecurityFeatures } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Shield, Lock, Eye } from 'lucide-react';

export default function FeaturesPage() {
  const [features, setFeatures] = useState<SecurityFeatures[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFeatures();
  }, []);

  const loadFeatures = async () => {
    try {
      const result = await BaseCrudService.getAll<SecurityFeatures>('securityfeatures');
      setFeatures(result.items);
    } catch (error) {
      console.error('Failed to load features:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[56rem] mx-auto text-center"
        >
          <h1 className="font-heading text-6xl md:text-7xl mb-8 text-primary">
            Security Features
          </h1>
          <p className="text-xl text-foreground leading-relaxed">
            Military-grade encryption and privacy protections engineered into every layer 
            of the platform. Your conversations remain yours alone.
          </p>
        </motion.div>
      </section>

      {/* Core Features */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-8 border border-secondary/20"
          >
            <Shield className="w-12 h-12 mb-6 text-accent" strokeWidth={1.5} />
            <h3 className="font-heading text-2xl mb-4 text-primary">
              End-to-End Encryption
            </h3>
            <p className="text-base text-foreground leading-relaxed">
              Messages encrypted in your browser before transmission. Server never has access 
              to readable content. Only you and your recipient can decrypt messages.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="p-8 border border-secondary/20"
          >
            <Lock className="w-12 h-12 mb-6 text-accent" strokeWidth={1.5} />
            <h3 className="font-heading text-2xl mb-4 text-primary">
              Dual-Layer PIN Protection
            </h3>
            <p className="text-base text-foreground leading-relaxed">
              Vault PIN protects all chats. Optional per-chat PINs add extra security for 
              sensitive conversations. Limited attempts prevent brute-force attacks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="p-8 border border-secondary/20"
          >
            <Eye className="w-12 h-12 mb-6 text-accent" strokeWidth={1.5} />
            <h3 className="font-heading text-2xl mb-4 text-primary">
              Zero Browser Storage
            </h3>
            <p className="text-base text-foreground leading-relaxed">
              Messages exist only in active memory. No localStorage, sessionStorage, or 
              IndexedDB. Close tab or refresh to clear all data instantly.
            </p>
          </motion.div>
        </div>

        {/* CMS Features */}
        <div className="min-h-[40rem]">
          {isLoading ? (
            <div className="flex items-center justify-center py-24">
              <LoadingSpinner />
            </div>
          ) : features.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="p-8 border border-secondary/20"
                >
                  {feature.featureImage && (
                    <div className="mb-6 overflow-hidden">
                      <Image
                        src={feature.featureImage}
                        alt={feature.featureName || 'Security feature'}
                        width={600}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <h3 className="font-heading text-2xl mb-4 text-primary">
                    {feature.featureName}
                  </h3>
                  <p className="text-base text-foreground leading-relaxed mb-6">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {feature.isEncrypted && (
                      <span className="px-3 py-1 text-xs bg-accent/20 text-accent border border-accent/30">
                        ENCRYPTED
                      </span>
                    )}
                    {feature.requiresPin && (
                      <span className="px-3 py-1 text-xs bg-accent/20 text-accent border border-accent/30">
                        PIN PROTECTED
                      </span>
                    )}
                    {feature.hasSelfDestruct && (
                      <span className="px-3 py-1 text-xs bg-accent/20 text-accent border border-accent/30">
                        SELF-DESTRUCT
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-lg text-secondary">No features available at this time.</p>
            </div>
          )}
        </div>
      </section>

      {/* Technical Details */}
      <section className="w-full max-w-[100rem] mx-auto px-8 py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[64rem] mx-auto"
        >
          <h2 className="font-heading text-4xl md:text-5xl mb-12 text-primary text-center">
            Technical Architecture
          </h2>
          <div className="space-y-8">
            <div className="p-8 border border-secondary/20">
              <h3 className="font-heading text-xl mb-4 text-primary">Encryption Protocol</h3>
              <p className="text-base text-foreground leading-relaxed">
                AES-256 encryption with RSA key exchange. Public/private key pairs generated 
                during account creation. Messages encrypted with recipient's public key before 
                transmission over secure WebSocket connections with TLS.
              </p>
            </div>
            <div className="p-8 border border-secondary/20">
              <h3 className="font-heading text-xl mb-4 text-primary">Authentication Security</h3>
              <p className="text-base text-foreground leading-relaxed">
                Passwords hashed using bcrypt with salt rounds. PINs stored as secure hashes. 
                Rate limiting on login attempts. Device verification for new logins. Session 
                tokens expire on tab close or browser refresh.
              </p>
            </div>
            <div className="p-8 border border-secondary/20">
              <h3 className="font-heading text-xl mb-4 text-primary">Data Minimization</h3>
              <p className="text-base text-foreground leading-relaxed">
                Server stores only encrypted message payloads and minimal routing metadata. 
                No message content logs. No browser storage. Messages purged from memory on 
                session end. Self-destruct messages deleted from server after timer expires.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
