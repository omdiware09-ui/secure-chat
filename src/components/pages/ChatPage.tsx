import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { Chats, Messages, UserProfiles } from '@/entities';
import ChatList from '@/components/ChatList';
import ChatWindow from '@/components/ChatWindow';
import AddFriendModal from '@/components/AddFriendModal';

export default function ChatPage() {
  const navigate = useNavigate();
  const [chats, setChats] = useState<Chats[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chats | null>(null);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Auto-lock vault on tab visibility change or page unload
    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleLogout();
      }
    };

    const handleBeforeUnload = () => {
      handleLogout();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<Chats>('chats');
      setChats(result.items || []);
    } catch (error) {
      console.error('Failed to load chats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear vault session and redirect to home
    sessionStorage.removeItem('vaultUnlocked');
    navigate('/');
  };

  const filteredChats = chats.filter(chat =>
    chat.chatName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground font-paragraph flex flex-col">
      {/* Header */}
      <header className="border-b border-secondary/20 bg-background/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-[100rem] mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="font-heading text-2xl text-primary">Chats</h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowAddFriend(true)}
              variant="outline"
              size="sm"
              className="border-secondary/30 text-foreground hover:text-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Friend
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="border-destructive/30 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Lock Vault
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Chat List Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full md:w-80 border-r border-secondary/20 flex flex-col bg-background/50"
        >
          {/* Search */}
          <div className="p-4 border-b border-secondary/20">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary" />
              <Input
                placeholder="Search chats..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/10 border-secondary/20 text-foreground placeholder:text-secondary/50"
              />
            </div>
          </div>

          {/* Chat List */}
          <ChatList
            chats={filteredChats}
            selectedChat={selectedChat}
            onSelectChat={setSelectedChat}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Chat Window */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex-1 hidden md:flex flex-col"
        >
          {selectedChat ? (
            <ChatWindow
              chat={selectedChat}
              onBack={() => setSelectedChat(null)}
              onChatUpdated={loadChats}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-center">
              <div>
                <h2 className="font-heading text-2xl text-primary mb-2">
                  Select a chat to start
                </h2>
                <p className="text-secondary">
                  Choose a conversation from the list or add a new friend
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Add Friend Modal */}
      {showAddFriend && (
        <AddFriendModal
          onClose={() => setShowAddFriend(false)}
          onFriendAdded={loadChats}
        />
      )}
    </div>
  );
}
