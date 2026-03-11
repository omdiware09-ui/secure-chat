import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VaultPinPage() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Detect tab visibility changes - lock vault if tab becomes hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Clear vault session and redirect to home
        sessionStorage.removeItem('vaultUnlocked');
        navigate('/');
      }
    };

    const handleBeforeUnload = () => {
      sessionStorage.removeItem('vaultUnlocked');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError('PIN must be 4 digits');
      return;
    }

    if (attempts >= 3) {
      setError('Too many failed attempts. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real implementation, this would:
      // 1. Verify PIN hash against stored vault PIN
      // 2. Limited attempts (3-5) before locking
      // 3. On success, load encrypted chat list
      // 4. Establish secure WebSocket connection
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // On success, navigate to chat interface
      // Store vault unlock time for session management
      sessionStorage.setItem('vaultUnlocked', new Date().toISOString());
      navigate('/chat');
    } catch (err) {
      setAttempts(prev => prev + 1);
      setError(`Incorrect PIN. ${3 - attempts - 1} attempts remaining.`);
      setIsSubmitting(false);
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph flex items-center justify-center px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-[28rem] w-full"
      >
        <div className="mb-8 text-center">
          <div className="mb-6 flex justify-center">
            <Lock className="w-20 h-20 text-accent" strokeWidth={1.5} />
          </div>
          <h1 className="font-heading text-4xl mb-4 text-primary">
            Enter Vault PIN
          </h1>
          <p className="text-base text-foreground">
            Your conversations are protected. Enter your 4-digit vault PIN to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
              maxLength={4}
              className="bg-background border-secondary/30 text-foreground focus:border-accent font-heading text-5xl tracking-[1rem] text-center h-20"
              placeholder="••••"
              autoFocus
            />
          </div>

          {error && (
            <div className="p-4 border border-destructive/30 bg-destructive/10">
              <p className="text-sm text-destructive text-center">{error}</p>
            </div>
          )}

          {attempts >= 2 && attempts < 3 && (
            <div className="p-4 border border-accent/30 bg-accent/10">
              <p className="text-sm text-accent text-center">
                Warning: Vault will lock after {3 - attempts} more failed attempt(s).
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || pin.length !== 4 || attempts >= 3}
            className="w-full bg-accent text-accent-foreground py-6 text-lg hover:opacity-90 disabled:opacity-50"
          >
            {isSubmitting ? 'Unlocking...' : 'Unlock Vault'}
          </Button>
        </form>

        <div className="mt-8 p-6 border border-secondary/20">
          <div className="flex items-start gap-3 mb-4">
            <Shield className="w-5 h-5 text-accent flex-shrink-0 mt-1" strokeWidth={1.5} />
            <div>
              <h3 className="font-heading text-base text-primary mb-2">Security Notice</h3>
              <p className="text-sm text-foreground leading-relaxed">
                Your vault PIN is stored as a secure hash. After 3 failed attempts, 
                you will be redirected to login. Switching tabs or closing the browser 
                will automatically lock your vault.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-sm text-secondary hover:text-accent transition-colors"
          >
            Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
}
