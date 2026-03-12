import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock, Hash, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { authService } from '@/services/authService';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.userId.length !== 6 || !/^\d+$/.test(formData.userId)) {
      setError('User ID must be a 6-digit number');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      // Authenticate user with proper password validation
      const user = await authService.loginUser(formData.userId, formData.password);
      
      // Store user session with name
      const userWithName = { ...user, name: user.email?.split('@')[0] || 'User' };
      sessionStorage.setItem('currentUser', JSON.stringify(userWithName));
      sessionStorage.setItem('userEmail', user.email);
      
      setSuccessMessage('Login successful! Redirecting...');
      
      // Redirect to vault PIN entry after brief delay
      setTimeout(() => {
        navigate('/vault-pin');
      }, 500);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
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
                onChange={(e) => setFormData({ ...formData, userId: e.target.value.replace(/\D/g, '').slice(0, 6) })}
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
                placeholder="Enter your password (min 8 characters)"
              />
            </div>

            {error && (
              <div className="p-4 border border-destructive/30 bg-destructive/10 flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="p-4 border border-accent/30 bg-accent/10">
                <p className="text-sm text-accent">{successMessage}</p>
              </div>
            )}

            <div className="p-4 border border-secondary/20 bg-background">
              <p className="text-xs text-foreground leading-relaxed">
                After successful login, you will be prompted to enter your secure chat vault PIN 
                before accessing your conversations. Account lockout: 3 failed attempts = 10 minute block.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground py-6 text-lg hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 space-y-4 text-center">
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
              <li>• Account lockout after 3 failed login attempts</li>
              <li>• 10-minute temporary block with email notification</li>
              <li>• Password must be at least 8 characters</li>
              <li>• Vault PIN required after successful login</li>
              <li>• Email verification for new device logins</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
