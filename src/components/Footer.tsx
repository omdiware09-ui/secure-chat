import { Link } from 'react-router-dom';
import { Shield, Mail, Github, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-secondary/20">
      <div className="max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-accent" strokeWidth={1.5} />
              <span className="font-heading text-2xl text-primary">Silent Sanctuary</span>
            </div>
            <p className="text-base text-foreground leading-relaxed max-w-[24rem]">
              A digital sanctuary for secure communication. Privacy-first architecture 
              meets minimalist design.
            </p>
          </div>
          
          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="font-heading text-lg text-primary mb-6">Platform</h3>
            <nav className="flex flex-col gap-4">
              <Link to="/features" className="text-base text-foreground hover:text-accent transition-colors">
                Features
              </Link>
              <Link to="/design" className="text-base text-foreground hover:text-accent transition-colors">
                Design Preview
              </Link>
              <Link to="/privacy" className="text-base text-foreground hover:text-accent transition-colors">
                Privacy
              </Link>
              <Link to="/signup" className="text-base text-foreground hover:text-accent transition-colors">
                Create Account
              </Link>
              <Link to="/login" className="text-base text-foreground hover:text-accent transition-colors">
                Sign In
              </Link>
            </nav>
          </div>
          
          {/* Resources */}
          <div className="md:col-span-3">
            <h3 className="font-heading text-lg text-primary mb-6">Resources</h3>
            <nav className="flex flex-col gap-4">
              <a href="#security" className="text-base text-foreground hover:text-accent transition-colors">
                Security Documentation
              </a>
              <a href="#privacy" className="text-base text-foreground hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-base text-foreground hover:text-accent transition-colors">
                Terms of Service
              </a>
              <a href="#support" className="text-base text-foreground hover:text-accent transition-colors">
                Support
              </a>
            </nav>
          </div>
          
          {/* Contact */}
          <div className="md:col-span-2">
            <h3 className="font-heading text-lg text-primary mb-6">Connect</h3>
            <div className="flex gap-4">
              <a href="mailto:contact@silentsanctuary.com" className="text-foreground hover:text-accent transition-colors">
                <Mail className="w-6 h-6" strokeWidth={1.5} />
              </a>
              <a href="#github" className="text-foreground hover:text-accent transition-colors">
                <Github className="w-6 h-6" strokeWidth={1.5} />
              </a>
              <a href="#twitter" className="text-foreground hover:text-accent transition-colors">
                <Twitter className="w-6 h-6" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 border-t border-secondary/20">
          <p className="text-sm text-secondary text-center">
            © 2026 Silent Sanctuary. All rights reserved. Built with privacy in mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
