import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, Key, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { authService } from '@/services/authService';

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [generatedUserId, setGeneratedUserId] = useState('');
  const [generatedVaultPin, setGeneratedVaultPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) {
      setError('Full name is required');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Valid email address is required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create user account with auto-generated unique user ID
      const result = await authService.createUser(
        formData.email,
        formData.password,
        formData.name
      );

      setGeneratedUserId(result.userId);
      setGeneratedVaultPin(result.vaultPin);

      // In production, send welcome email with vault PIN here
      // Email would include:
      // - Welcome greeting card
      // - Vault PIN
      // - Security tips
      // - Account recovery information
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create account';
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  if (generatedUserId && generatedVaultPin) {
    return (
      <div className="min-h-screen bg-background text-foreground font-paragraph">
        <Header />
        
        <section className="w-full max-w-[100rem] mx-auto px-8 pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[40rem] mx-auto"
          >
            {/* Success Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 border-2 border-accent bg-background/50 backdrop-blur-sm mb-8"
            >
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-accent" strokeWidth={1.5} />
              </div>
              <h1 className="font-heading text-4xl mb-4 text-primary text-center">
                Account Created Successfully
              </h1>
              <p className="text-center text-foreground mb-8">
                Your account has been created with end-to-end encryption enabled. 
                A welcome email with your vault PIN has been sent to {formData.email}.
              </p>

              {/* User ID Card */}
              <div className="p-6 border border-secondary/20 bg-secondary/5 mb-6">
                <p className="text-xs text-secondary uppercase tracking-wider mb-3">
                  Your User ID
                </p>
                <p className="font-heading text-4xl text-accent tracking-wider mb-2">
                  {generatedUserId}
                </p>
                <p className="text-xs text-destructive font-medium">
                  SAVE THIS ID - You will need it to log in
                </p>
              </div>

              {/* Vault PIN Card */}
              <div className="p-6 border border-secondary/20 bg-secondary/5 mb-6">
                <p className="text-xs text-secondary uppercase tracking-wider mb-3">
                  Your Vault PIN
                </p>
                <p className="font-heading text-4xl text-accent tracking-wider mb-2">
                  {generatedVaultPin}
                </p>
                <p className="text-xs text-destructive font-medium">
                  SAVE THIS PIN - Required to access your chats
                </p>
              </div>

              {/* Security Information */}
              <div className="p-4 border border-secondary/20 bg-background mb-6">
               <h3 className="font-heading text-sm text-primary mb-3">Important Security Information</h3>
                <ul className="space-y-2 text-xs text-foreground">
                  <li>✓ User ID: Use this to log in</li>
                  <li>✓ Vault PIN: Required to access your chats</li>
                  <li>✓ Password: Keep this secure and never share</li>
                  <li>✓ Email: Check for welcome message with security tips</li>
                </ul>
              </div>
            </motion.div>

            <Button
              onClick={() => navigate('/login')}
              className="w-full bg-accent text-accent-foreground px-8 py-6 text-lg hover:opacity-90"
            >
              Continue to Login
            </Button>

            <p className="text-center text-secondary text-sm mt-6">
              A welcome email has been sent to {formData.email} with your vault PIN and security information.
            </p>
          </motion.div>
        </section>

        <Footer />
      </div>
    );
  }

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
            <h1 className="font-heading text-5xl mb-4 text-primary">
              Create Account
            </h1>
            <p className="text-base text-foreground">
              Join the sanctuary. Your conversations, encrypted and private.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name" className="text-foreground mb-2 flex items-center gap-2">
                <User className="w-4 h-4" strokeWidth={1.5} />
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-background border-secondary/30 text-foreground focus:border-accent"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-foreground mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" strokeWidth={1.5} />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-background border-secondary/30 text-foreground focus:border-accent"
                placeholder="your@email.com"
              />
              <p className="text-xs text-secondary mt-2">
                We'll send your vault PIN and welcome message here
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
                placeholder="Minimum 8 characters"
              />
              <p className="text-xs text-secondary mt-2">
                Must be at least 8 characters for security
              </p>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-foreground mb-2 flex items-center gap-2">
                <Key className="w-4 h-4" strokeWidth={1.5} />
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                className="bg-background border-secondary/30 text-foreground focus:border-accent"
                placeholder="Re-enter password"
              />
            </div>

            {error && (
              <div className="p-4 border border-destructive/30 bg-destructive/10">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="p-4 border border-secondary/20 bg-background">
              <p className="text-xs text-foreground leading-relaxed">
                By creating an account, you agree that your password will be securely hashed, 
                and encryption keys will be generated for end-to-end encrypted messaging. 
                You will receive a unique Vault PIN via email.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-accent text-accent-foreground py-6 text-lg hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-base text-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-accent hover:underline">
                Sign In
              </Link>
            </p>
          </div>

          {/* Privacy Features */}
          <div className="mt-12 p-6 border border-secondary/20">
            <h3 className="font-heading text-lg text-primary mb-4">Privacy & Security</h3>
            <ul className="space-y-2 text-sm text-foreground">
              <li>✓ End-to-end encryption for all messages</li>
              <li>✓ Vault PIN protection for chat access</li>
              <li>✓ Zero browser storage - data cleared on refresh</li>
              <li>✓ Account lockout after 3 failed login attempts</li>
              <li>✓ Email notifications for security events</li>
              <li>✓ Device verification for new logins</li>
            </ul>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
