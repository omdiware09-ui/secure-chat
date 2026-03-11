import { motion } from 'framer-motion';
import { Chats } from '@/entities';
import { formatDistanceToNow } from 'date-fns';

interface ChatListProps {
  chats: Chats[];
  selectedChat: Chats | null;
  onSelectChat: (chat: Chats) => void;
  isLoading: boolean;
}

export default function ChatList({
  chats,
  selectedChat,
  onSelectChat,
  isLoading,
}: ChatListProps) {
  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-secondary text-sm">Loading chats...</div>
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4 text-center">
        <div>
          <p className="text-secondary text-sm">No chats yet</p>
          <p className="text-xs text-secondary/60 mt-1">
            Add a friend to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {chats.map((chat, index) => (
        <motion.button
          key={chat._id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          onClick={() => onSelectChat(chat)}
          className={`w-full p-4 border-b border-secondary/10 text-left transition-colors hover:bg-secondary/10 ${
            selectedChat?._id === chat._id ? 'bg-secondary/20' : ''
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-sm text-primary truncate">
                {chat.chatName}
              </h3>
              {chat.pinEnabled && (
                <p className="text-xs text-accent mt-1">🔒 PIN Protected</p>
              )}
              {chat.lastActivityDate && (
                <p className="text-xs text-secondary/60 mt-1">
                  {formatDistanceToNow(new Date(chat.lastActivityDate), {
                    addSuffix: true,
                  })}
                </p>
              )}
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
}
