import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Music, Play, Globe } from 'lucide-react';
import { Messages } from '@/entities';
import { BaseCrudService } from '@/integrations';
import { formatDistanceToNow } from 'date-fns';

interface MessageBubbleProps {
  message: Messages;
  onDecrypt: () => void;
}

// Extract URLs and detect link types
const extractLinkPreview = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const urls = text.match(urlRegex);
  if (!urls) return null;

  const url = urls[0];
  
  // Detect link type
  if (url.includes('spotify.com')) {
    return { type: 'spotify', url };
  } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return { type: 'youtube', url };
  } else if (url.includes('instagram.com/reel') || url.includes('instagram.com/p')) {
    return { type: 'instagram', url };
  } else if (url.includes('tiktok.com')) {
    return { type: 'tiktok', url };
  } else if (url.includes('twitter.com') || url.includes('x.com')) {
    return { type: 'twitter', url };
  }
  
  return { type: 'generic', url };
};

const LinkPreview = ({ linkData }: { linkData: { type: string; url: string } }) => {
  const getPreviewContent = () => {
    switch (linkData.type) {
      case 'spotify':
        return (
          <div className="flex items-center gap-2 p-2 bg-green-500/20 rounded">
            <Music className="w-4 h-4 text-green-400" />
            <span className="text-xs text-green-300">Spotify Link</span>
          </div>
        );
      case 'youtube':
        return (
          <div className="flex items-center gap-2 p-2 bg-red-500/20 rounded">
            <Play className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-300">YouTube Video</span>
          </div>
        );
      case 'instagram':
        return (
          <div className="flex items-center gap-2 p-2 bg-pink-500/20 rounded">
            <Play className="w-4 h-4 text-pink-400" />
            <span className="text-xs text-pink-300">Instagram Reel</span>
          </div>
        );
      case 'tiktok':
        return (
          <div className="flex items-center gap-2 p-2 bg-cyan-500/20 rounded">
            <Play className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-cyan-300">TikTok Video</span>
          </div>
        );
      case 'twitter':
        return (
          <div className="flex items-center gap-2 p-2 bg-blue-500/20 rounded">
            <Globe className="w-4 h-4 text-blue-400" />
            <span className="text-xs text-blue-300">Tweet</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 p-2 bg-secondary/20 rounded">
            <Globe className="w-4 h-4 text-secondary" />
            <span className="text-xs text-secondary">Link</span>
          </div>
        );
    }
  };

  return (
    <a href={linkData.url} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
      {getPreviewContent()}
    </a>
  );
};

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
  const linkPreview = decryptedContent ? extractLinkPreview(decryptedContent) : null;

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
            {linkPreview && (
              <LinkPreview linkData={linkPreview} />
            )}
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
