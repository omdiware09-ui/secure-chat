// HPI 1.7-G
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, cubicBezier } from 'framer-motion';
import { Shield, Lock, Eye, Clock, Key, Fingerprint, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Image } from '@/components/ui/image';

// --- Canonical Data Source ---
const features = [
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    description: 'Messages encrypted in your browser before sending. Server never sees readable content.',
  },
  {
    icon: Lock,
    title: 'PIN-Protected Chats',
    description: 'Dual-layer protection with vault PIN and optional per-chat PINs for sensitive conversations.',
  },
  {
    icon: Eye,
    title: 'Anti-Screenshot Protection',
    description: 'Dynamic watermarks and content protection to discourage unauthorized capture.',
  },
  {
    icon: Clock,
    title: 'Self-Destruct Messages',
    description: 'Set timers for automatic message deletion after 30s, 5m, 1h, or 24h.',
  },
  {
    icon: Key,
    title: 'Zero Browser Storage',
    description: 'Messages exist only in active memory. Refresh or close tab to clear all data.',
  },
  {
    icon: Fingerprint,
    title: 'Device Verification',
    description: 'New device login requires email verification for enhanced account security.',
  },
];

// --- Utility Components ---
const GridContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 ${className}`}>
    {children}
  </div>
);

const Hairline = () => <div className="w-full h-[1px] bg-secondary/20" />;

// --- Main Page Component ---
export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Custom easing for architectural feel
  const customEase = cubicBezier(0.16, 1, 0.3, 1);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground font-paragraph selection:bg-accent selection:text-accent-foreground overflow-clip">
      <Header />

      {/* Global Noise Texture for "Silent Sanctuary" vibe */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <main>
        {/* 1. HERO SECTION: Monumental, Stark, Parallax */}
        <HeroSection scrollYProgress={scrollYProgress} />

        {/* 2. PHILOSOPHY SECTION: Sticky Narrative */}
        <PhilosophySection />

        {/* 3. FEATURES SECTION: Canonical Data, Architectural List */}
        <FeaturesSection />

        {/* 4. ARCHITECTURE SECTION: Visualizing Security */}
        <ArchitectureSection />

        {/* 5. CTA SECTION: Focused Action */}
        <CTASection />
      </main>

      <Footer />

      {/* Scoped Styles for specific effects */}
      <style>{`
        .text-stroke-primary {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.2);
          color: transparent;
        }
        .clip-text-reveal {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }
      `}</style>
    </div>
  );
}

// --- Section Components ---

function HeroSection({ scrollYProgress }: { scrollYProgress: any }) {
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-end pb-24 pt-48">
      <GridContainer>
        <motion.div style={{ y, opacity }} className="grid grid-cols-12 gap-6">
          
          {/* Meta Info */}
          <div className="col-span-12 md:col-span-3 flex flex-col justify-end pb-4 border-b border-secondary/20 mb-8 md:mb-0 md:border-b-0 md:border-r pr-6">
            <p className="text-xs tracking-widest text-secondary uppercase mb-2">Protocol</p>
            <p className="text-sm text-primary">V.1.0.0 // Secure</p>
          </div>

          {/* Main Title & Intro */}
          <div className="col-span-12 md:col-span-9">
            <div className="overflow-hidden mb-8">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading text-6xl md:text-8xl lg:text-[9rem] leading-[0.9] text-primary tracking-tighter"
              >
                THE SILENT<br />SANCTUARY.
              </motion.h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-secondary leading-relaxed max-w-md"
              >
                Extreme privacy architecture meets minimalist design. Your conversations, protected by military-grade encryption and zero-knowledge infrastructure.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-6 items-start md:items-center justify-start md:justify-end"
              >
                <Link
                  to="/signup"
                  className="group relative inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-medium text-sm tracking-widest uppercase overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Initialize <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-accent transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 text-sm tracking-widest uppercase text-secondary hover:text-primary transition-colors"
                >
                  Authenticate
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </GridContainer>
    </section>
  );
}

function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={sectionRef} className="relative py-32 bg-background border-t border-secondary/20">
      <GridContainer>
        <div className="grid grid-cols-12 gap-6">
          
          {/* Sticky Header */}
          <div className="col-span-12 lg:col-span-4 relative">
            <div className="lg:sticky lg:top-32 mb-16 lg:mb-0">
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
                Privacy by<br />Design.
              </h2>
              <div className="w-12 h-[1px] bg-accent mb-6" />
              <p className="text-secondary text-sm max-w-xs">
                We believe communication is a fundamental right. Our architecture ensures that right is protected through absolute mathematical certainty, not just policy.
              </p>
            </div>
          </div>

          {/* Scrolling Content */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div style={{ y: y1 }} className="space-y-12">
              <div className="p-8 border border-secondary/10 bg-background/50 backdrop-blur-sm">
                <h3 className="text-xl text-primary mb-4 font-heading">Zero Knowledge</h3>
                <p className="text-secondary leading-relaxed">
                  We never store readable message content. All encryption happens in your browser before transmission. The server acts only as a blind, secure relay.
                </p>
              </div>
              <div className="p-8 border border-secondary/10 bg-background/50 backdrop-blur-sm">
                <h3 className="text-xl text-primary mb-4 font-heading">Ephemeral State</h3>
                <p className="text-secondary leading-relaxed">
                  Messages are not saved in browser storage. Close your tab or refresh, and everything disappears from local memory instantly and permanently.
                </p>
              </div>
            </motion.div>

            <motion.div style={{ y: y2 }} className="space-y-12 md:mt-32">
              <div className="p-8 border border-secondary/10 bg-background/50 backdrop-blur-sm">
                <h3 className="text-xl text-primary mb-4 font-heading">Physical Security</h3>
                <p className="text-secondary leading-relaxed">
                  Multiple layers of PIN protection ensure that even if someone gains physical access to your unlocked device, your most sensitive conversations remain sealed.
                </p>
              </div>
              <div className="aspect-square relative overflow-hidden border border-secondary/20">
                <Image 
                  src="https://static.wixstatic.com/media/d4b996_1fd30661606648dfa31aa4abf1cdf163~mv2.png?originWidth=576&originHeight=576" 
                  alt="Abstract representation of secure data"
                  className="w-full h-full object-cover grayscale opacity-50 mix-blend-luminosity hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </motion.div>
          </div>

        </div>
      </GridContainer>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-32 border-t border-secondary/20">
      <GridContainer>
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-8">
          <h2 className="font-heading text-5xl md:text-7xl text-primary tracking-tighter">
            SYSTEM<br />CAPABILITIES
          </h2>
          <p className="text-secondary max-w-sm text-sm">
            Every feature engineered for maximum security and minimal data exposure. The architecture of silence.
          </p>
        </div>

        <div className="border-t border-secondary/20">
          {features.map((feature, index) => (
            <FeatureRow key={index} feature={feature} index={index} />
          ))}
        </div>
      </GridContainer>
    </section>
  );
}

function FeatureRow({ feature, index }: { feature: typeof features[0], index: number }) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 90%", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
  const x = useTransform(scrollYProgress, [0, 1], [-20, 0]);

  return (
    <motion.div 
      ref={rowRef}
      style={{ opacity }}
      className="group grid grid-cols-12 gap-6 py-12 border-b border-secondary/20 hover:bg-secondary/5 transition-colors duration-500"
    >
      <div className="col-span-12 md:col-span-1 flex items-start pt-1">
        <span className="text-xs text-secondary font-mono">0{index + 1}</span>
      </div>
      
      <motion.div style={{ x }} className="col-span-12 md:col-span-4 flex items-start gap-6">
        <div className="p-3 border border-secondary/20 group-hover:border-accent group-hover:text-accent transition-colors duration-300 bg-background">
          <feature.icon className="w-6 h-6" strokeWidth={1} />
        </div>
        <h3 className="font-heading text-2xl text-primary pt-2">{feature.title}</h3>
      </motion.div>

      <div className="col-span-12 md:col-span-7 flex items-start pt-2">
        <p className="text-secondary text-lg leading-relaxed max-w-2xl">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

function ArchitectureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create a horizontal scroll effect based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section ref={containerRef} className="h-[200vh] relative bg-background">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden border-t border-secondary/20">
        
        <GridContainer className="mb-12">
          <h2 className="font-heading text-sm tracking-widest uppercase text-secondary mb-4">
            [ Infrastructure ]
          </h2>
          <p className="text-3xl md:text-4xl text-primary max-w-2xl">
            A modular architecture designed to isolate and protect data at every layer.
          </p>
        </GridContainer>

        <div className="w-full overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 px-6 md:px-12 lg:px-24 w-[200vw] md:w-[150vw]">
            
            {/* Card 1 */}
            <div className="w-[80vw] md:w-[40vw] shrink-0 aspect-[4/3] relative border border-secondary/20 p-8 flex flex-col justify-between bg-background group">
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Lock className="w-8 h-8 text-accent mb-6" strokeWidth={1} />
                <h3 className="font-heading text-2xl text-primary mb-2">Client-Side Encryption</h3>
                <p className="text-secondary">Data is transformed into ciphertext before it ever leaves your device. The keys remain exclusively in your possession.</p>
              </div>
              <div className="relative z-10 text-xs text-secondary font-mono uppercase tracking-widest">Layer 01</div>
            </div>

            {/* Card 2 */}
            <div className="w-[80vw] md:w-[40vw] shrink-0 aspect-[4/3] relative border border-secondary/20 p-8 flex flex-col justify-between bg-background group">
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Shield className="w-8 h-8 text-accent mb-6" strokeWidth={1} />
                <h3 className="font-heading text-2xl text-primary mb-2">Secure Relay Network</h3>
                <p className="text-secondary">Our servers act as blind couriers. They route encrypted packets without the ability to inspect, alter, or store the contents.</p>
              </div>
              <div className="relative z-10 text-xs text-secondary font-mono uppercase tracking-widest">Layer 02</div>
            </div>

            {/* Card 3 */}
            <div className="w-[80vw] md:w-[40vw] shrink-0 aspect-[4/3] relative border border-secondary/20 p-8 flex flex-col justify-between bg-background group">
              <div className="absolute inset-0 bg-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <Key className="w-8 h-8 text-accent mb-6" strokeWidth={1} />
                <h3 className="font-heading text-2xl text-primary mb-2">Volatile Memory</h3>
                <p className="text-secondary">The application operates entirely in RAM. No traces are written to disk, ensuring complete amnesia upon session termination.</p>
              </div>
              <div className="relative z-10 text-xs text-secondary font-mono uppercase tracking-widest">Layer 03</div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-48 border-t border-secondary/20 relative overflow-hidden">
      {/* Background Image with heavy treatment */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://static.wixstatic.com/media/d4b996_21e232b6876a410490a49e5b0d065d92~mv2.png?originWidth=1152&originHeight=768" 
          alt="Abstract background"
          className="w-full h-full object-cover opacity-10 grayscale"
        />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      </div>

      <GridContainer className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-5xl md:text-7xl text-primary mb-8 tracking-tighter">
            ENTER THE<br />SANCTUARY.
          </h2>
          <p className="text-xl text-secondary mb-12">
            Reclaim your right to private conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/signup"
              className="group relative inline-flex items-center justify-center px-12 py-5 bg-primary text-primary-foreground font-medium text-sm tracking-widest uppercase overflow-hidden w-full sm:w-auto"
            >
              <span className="relative z-10">Establish Connection</span>
              <div className="absolute inset-0 bg-accent transform scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out" />
            </Link>
          </div>
          
          <div className="mt-16 pt-8 border-t border-secondary/20 flex justify-center gap-8 text-xs text-secondary font-mono uppercase tracking-widest">
            <span>Status: Secure</span>
            <span>Encryption: Active</span>
          </div>
        </motion.div>
      </GridContainer>
    </section>
  );
}