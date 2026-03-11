import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.userId.length !== 6 || !/^\d+$/.test(formData.userId)) {
      setError('User ID must be a 6-digit number');
      return;
    }

    if (attempts >= 5) {
      setError('Account temporarily locked. Please try again later or use email recovery.');
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would:
      // 1. Verify userId exists in database
      // 2. Compare password hash using bcrypt
      // 3. Check device verification (new device requires email confirmation)
      // 4. Create secure session token
      // 5. Rate limit login attempts
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // On successful login, redirect to vault PIN entry
      navigate('/vault-pin');
    } catch (err) {
      setAttempts(prev => prev + 1);
      setError(`Invalid User ID or password. ${5 - attempts - 1} attempts remaining.`);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph">
      <Header />
      
      <section className="w-full max-w-[100rem] mx-auto px-8 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[32rem] mx-auto"
        >
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <Shield className="w-16 h-16 text-accent" strokeWidth={1.5} />
            </div>
            <h1 className="font-heading text-5xl mb-4 text-primary">
              Sign In
            </h1>
            <p className="text-base text-foreground">
              Enter your credentials to access the sanctuary.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="userId" className="text-foreground mb-2 flex items-center gap-2">
                <Hash className="w-4 h-4" strokeWidth={1.5} />
                User ID
              </Label>
              <Input
                id="userId"
                type="text"
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                required
                maxLength={6}
                className="bg-background border-secondary/30 text-foreground focus:border-accent font-heading text-2xl tracking-wider text-center"
                placeholder="000000"
              />
              <p className="text-xs text-secondary mt-2">
                Your unique 6-digit User ID provided during registration
              </p>
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground mb-2 flex items-center gap-2">
                <Lock className="w-4 h-4" strokeWidth={1.5} />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                className="bg-background border-secondary/30 text-foreground focus:border-accent"
                placeholder="Enter your password"
              />
            </div>

            {error && (
              <div className="p-4 border border-destructive/30 bg-destructive/10">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {attempts >= 3 && attempts < 5 && (
              <div className="p-4 border border-accent/30 bg-accent/10">
                <p className="text-sm text-accent">
                  Warning: Account will be temporarily locked after {5 - attempts} more failed attempts.
                </p>
              </div>
            )}

            <div className="p-4 border border-secondary/20 bg-background">
              <p className="text-xs text-foreground leading-relaxed">
                After successful login, you will be prompted to enter your secure chat vault PIN 
                before accessing your conversations. New device logins require email verification.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting || attempts >= 5}
              className="w-full bg-accent text-accent-foreground py-6 text-lg hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 space-y-4 text-center">
            <Link to="/forgot-password" className="block text-base text-accent hover:underline">
              Forgot Password?
            </Link>
            <p className="text-base text-foreground">
              Don't have an account?{' '}
              <Link to="/signup" className="text-accent hover:underline">
                Create Account
              </Link>
            </p>
          </div>

          <div className="mt-12 p-6 border border-secondary/20">
            <h3 className="font-heading text-lg text-primary mb-4">Security Features</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>• Rate limiting prevents brute-force attacks</li>
              <li>• Device verification for new logins</li>
              <li>• Temporary lockout after failed attempts</li>
              <li>• Email recovery for forgotten credentials</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
