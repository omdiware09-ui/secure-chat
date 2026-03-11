import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Header() {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-secondary/20">
      <div className="max-w-[100rem] mx-auto px-8 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <Shield className="w-8 h-8 text-accent" strokeWidth={1.5} />
          <span className="font-heading text-2xl text-primary">Silent Sanctuary</span>
        </Link>
        
        <nav className="flex items-center gap-8">
          <Link
            to="/features"
            className={`font-paragraph text-base transition-colors ${
              isActive('/features') ? 'text-accent' : 'text-foreground hover:text-primary'
            }`}
          >
            Features
          </Link>
          <Link
            to="/design"
            className={`font-paragraph text-base transition-colors ${
              isActive('/design') ? 'text-accent' : 'text-foreground hover:text-primary'
            }`}
          >
            Design Preview
          </Link>
          <Link
            to="/privacy"
            className={`font-paragraph text-base transition-colors ${
              isActive('/privacy') ? 'text-accent' : 'text-foreground hover:text-primary'
            }`}
          >
            Privacy
          </Link>
          <Link
            to="/login"
            className="bg-transparent text-primary border border-primary px-6 py-3 text-base font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            style={{ borderRadius: '4px' }}
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
}
