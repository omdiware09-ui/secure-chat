import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { Chats, Messages } from '@/entities';
import PinModal from '@/components/PinModal';
import MessageBubble from '@/components/MessageBubble';

interface ChatWindowProps {
  chat: Chats;
  onBack: () => void;
  onChatUpdated: () => void;
}

export default function ChatWindow({
  chat,
  onBack,
  onChatUpdated,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Messages[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showPinModal, setShowPinModal] = useState(chat.pinEnabled || false);
  const [isPinVerified, setIsPinVerified] = useState(!chat.pinEnabled);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isPinVerified) {
      loadMessages();
    }
  }, [isPinVerified]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Messages>('messages', [], {
        limit: 100,
      });
      const chatMessages = (result.items || []).filter(
        (msg) => msg.chatId === chat._id
      );
      setMessages(chatMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !isPinVerified) return;

    setIsSending(true);
    try {
      // Simple encryption (in production, use proper encryption)
      const encryptedContent = btoa(newMessage);

      const message: Messages = {
        _id: crypto.randomUUID(),
        chatId: chat._id,
        senderId: 'current-user', // In real app, get from auth
        encryptedContent,
        timestamp: new Date(),
        isRead: false,
        isDecrypted: false,
      };

      await BaseCrudService.create('messages', message);
      setNewMessage('');
      await loadMessages();
      onChatUpdated();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (showPinModal && !isPinVerified) {
    return (
      <PinModal
        chatName={chat.chatName || 'Chat'}
        expectedPin={chat.pinCode?.toString() || '0000'}
        onSuccess={() => {
          setShowPinModal(false);
          setIsPinVerified(true);
        }}
        onCancel={onBack}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="border-b border-secondary/20 bg-background/95 backdrop-blur-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-secondary hover:text-primary"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="font-heading text-lg text-primary">
              {chat.chatName}
            </h2>
            {chat.pinEnabled && (
              <p className="text-xs text-accent flex items-center gap-1">
                <Lock className="w-3 h-3" /> PIN Protected
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-secondary text-sm">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-secondary text-sm">No messages yet</p>
              <p className="text-xs text-secondary/60 mt-1">
                Start the conversation
              </p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <motion.div
              key={message._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <MessageBubble
                message={message}
                onDecrypt={loadMessages}
              />
            </motion.div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-secondary/20 bg-background/95 backdrop-blur-sm p-4">
        <form onSubmit={handleSendMessage} className="flex gap-3">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="bg-secondary/10 border-secondary/20 text-foreground placeholder:text-secondary/50"
            disabled={!isPinVerified || isSending}
          />
          <Button
            type="submit"
            disabled={!newMessage.trim() || !isPinVerified || isSending}
            className="bg-accent text-accent-foreground hover:opacity-90"
          >
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
