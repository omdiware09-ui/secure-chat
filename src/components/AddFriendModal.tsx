import { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BaseCrudService } from '@/integrations';
import { UserProfiles, Chats } from '@/entities';

interface AddFriendModalProps {
  onClose: () => void;
  onFriendAdded: () => void;
}

export default function AddFriendModal({
  onClose,
  onFriendAdded,
}: AddFriendModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<UserProfiles[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<UserProfiles | null>(
    null
  );
  const [chatName, setChatName] = useState('');
  const [pinEnabled, setPinEnabled] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    setError('');
    try {
      const result = await BaseCrudService.getAll<UserProfiles>(
        'userprofiles'
      );
      const filtered = (result.items || []).filter(
        (user) =>
          user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.displayName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (err) {
      setError('Failed to search users');
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreateChat = async () => {
    if (!selectedFriend || !chatName.trim()) {
      setError('Please select a friend and enter a chat name');
      return;
    }

    if (pinEnabled && (pinCode.length !== 4 || !/^\d+$/.test(pinCode))) {
      setError('PIN must be 4 digits');
      return;
    }

    setIsCreating(true);
    setError('');
    try {
      const chat: Chats = {
        _id: crypto.randomUUID(),
        chatName: chatName.trim(),
        pinEnabled,
        pinCode: pinEnabled ? parseInt(pinCode) : undefined,
        participantIdentifiers: `current-user,${selectedFriend._id}`,
        lastActivityDate: new Date(),
        isGroupChat: false,
      };

      await BaseCrudService.create('chats', chat);
      onFriendAdded();
      onClose();
    } catch (err) {
      setError('Failed to create chat');
      console.error(err);
    } finally {
      setIsCreating(false);
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
        className="bg-background border border-secondary/20 rounded-lg max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-heading text-2xl text-primary flex items-center gap-2">
            <Plus className="w-6 h-6 text-accent" />
            Add Friend
          </h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Search Section */}
          {!selectedFriend && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-secondary">
                  Search by username or name
                </label>
                <div className="flex gap-2">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Enter username or name..."
                    className="bg-secondary/10 border-secondary/20 text-foreground placeholder:text-secondary/50"
                  />
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching || !searchQuery.trim()}
                    className="bg-accent text-accent-foreground hover:opacity-90"
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-secondary">
                    Found {searchResults.length} user(s)
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {searchResults.map((user) => (
                      <motion.button
                        key={user._id}
                        onClick={() => setSelectedFriend(user)}
                        className="w-full p-3 border border-secondary/20 rounded hover:bg-secondary/10 transition-colors text-left"
                        whileHover={{ scale: 1.02 }}
                      >
                        <p className="font-heading text-sm text-primary">
                          {user.displayName}
                        </p>
                        <p className="text-xs text-secondary">@{user.username}</p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.length === 0 && searchQuery && !isSearching && (
                <p className="text-sm text-secondary text-center py-4">
                  No users found
                </p>
              )}
            </div>
          )}

          {/* Selected Friend */}
          {selectedFriend && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 border border-accent/30 bg-accent/10 rounded"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-heading text-sm text-primary">
                    {selectedFriend.displayName}
                  </p>
                  <p className="text-xs text-secondary">
                    @{selectedFriend.username}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedFriend(null)}
                  className="text-secondary hover:text-primary"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Chat Details */}
          {selectedFriend && (
            <div className="space-y-4">
              <div>
                <label className="text-sm text-secondary block mb-2">
                  Chat Name
                </label>
                <Input
                  value={chatName}
                  onChange={(e) => setChatName(e.target.value)}
                  placeholder="Enter chat name..."
                  className="bg-secondary/10 border-secondary/20 text-foreground placeholder:text-secondary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pinEnabled}
                    onChange={(e) => setPinEnabled(e.target.checked)}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="text-sm text-secondary">
                    Enable PIN Protection
                  </span>
                </label>
              </div>

              {pinEnabled && (
                <div>
                  <label className="text-sm text-secondary block mb-2">
                    4-Digit PIN Code
                  </label>
                  <Input
                    type="password"
                    value={pinCode}
                    onChange={(e) =>
                      setPinCode(e.target.value.replace(/\D/g, '').slice(0, 4))
                    }
                    maxLength={4}
                    placeholder="••••"
                    className="bg-secondary/10 border-secondary/20 text-foreground placeholder:text-secondary/50 font-heading text-2xl tracking-widest text-center"
                  />
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 border border-destructive/30 bg-destructive/10 rounded"
                >
                  <p className="text-sm text-destructive text-center">{error}</p>
                </motion.div>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setSelectedFriend(null)}
                  variant="outline"
                  className="flex-1 border-secondary/30 text-secondary hover:text-primary"
                >
                  Back
                </Button>
                <Button
                  onClick={handleCreateChat}
                  disabled={isCreating || !chatName.trim()}
                  className="flex-1 bg-accent text-accent-foreground hover:opacity-90"
                >
                  {isCreating ? 'Creating...' : 'Create Chat'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
