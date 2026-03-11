import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PinModalProps {
  chatName: string;
  expectedPin: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PinModal({
  chatName,
  expectedPin,
  onSuccess,
  onCancel,
}: PinModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (pin.length !== 4 || !/^\d+$/.test(pin)) {
      setError('PIN must be 4 digits');
      return;
    }

    if (pin === expectedPin) {
      onSuccess();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= 3) {
        setError('Too many failed attempts. Closing chat...');
        setTimeout(onCancel, 2000);
      } else {
        setError(`Incorrect PIN. ${3 - newAttempts} attempts remaining.`);
        setPin('');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-background border border-secondary/20 rounded-lg max-w-sm w-full p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl text-primary flex items-center gap-2">
            <Lock className="w-6 h-6 text-accent" />
            Unlock Chat
          </h2>
          <button
            onClick={onCancel}
            className="text-secondary hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-secondary text-sm mb-6">
          Enter the 4-digit PIN to unlock <strong>{chatName}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            maxLength={4}
            className="bg-background border-secondary/30 text-foreground focus:border-accent font-heading text-4xl tracking-[1rem] text-center h-16"
            placeholder="••••"
            autoFocus
          />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 border border-destructive/30 bg-destructive/10 rounded"
            >
              <p className="text-sm text-destructive text-center">{error}</p>
            </motion.div>
          )}

          <div className="flex gap-3">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="flex-1 border-secondary/30 text-secondary hover:text-primary"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pin.length !== 4 || attempts >= 3}
              className="flex-1 bg-accent text-accent-foreground hover:opacity-90"
            >
              Unlock
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
