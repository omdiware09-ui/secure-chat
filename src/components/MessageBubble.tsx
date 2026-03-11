import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { Messages } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { formatDistanceToNow } from 'date-fns';

interface MessageBubbleProps {
  message: Messages;
  onDecrypt: () => void;
}

export default function MessageBubble({
  message,
  onDecrypt,
}: MessageBubbleProps) {
  const [isDecrypted, setIsDecrypted] = useState(message.isDecrypted || false);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const decryptedContent = isDecrypted
    ? atob(message.encryptedContent || '')
    : null;

  const handleToggleDecrypt = async () => {
    if (isDecrypted) {
      setIsDecrypted(false);
      return;
    }

    setIsDecrypting(true);
    try {
      // Update message as decrypted
      await BaseCrudService.update('messages', {
        _id: message._id,
        isDecrypted: true,
      });
      setIsDecrypted(true);
      onDecrypt();
    } catch (error) {
      console.error('Failed to decrypt message:', error);
    } finally {
      setIsDecrypting(false);
    }
  };

  const isCurrentUser = message.senderId === 'current-user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg cursor-pointer transition-all ${
          isCurrentUser
            ? 'bg-accent text-accent-foreground'
            : 'bg-secondary/20 text-foreground'
        } ${isDecrypted ? 'ring-2 ring-accent/50' : ''}`}
        onClick={handleToggleDecrypt}
      >
        {isDecrypted ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <p className="text-sm break-words">{decryptedContent}</p>
            <div className="flex items-center justify-between gap-2 text-xs opacity-70">
              <span>
                {message.timestamp &&
                  formatDistanceToNow(new Date(message.timestamp), {
                    addSuffix: true,
                  })}
              </span>
              <Eye className="w-3 h-3" />
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-2"
          >
            <div className="text-sm font-mono tracking-widest">
              ••••••••••••••••
            </div>
            <div className="flex items-center justify-between gap-2 text-xs opacity-70">
              <span>Encrypted</span>
              <EyeOff className="w-3 h-3" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
