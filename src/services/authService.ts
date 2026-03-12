import { BaseCrudService } from '@/integrations';
import { UserProfiles, Chats, Messages } from '@/entities';

interface AuthUser {
  _id: string;
  userId: string;
  email: string;
  passwordHash: string;
  vaultPin: string;
  createdDate: Date;
  lastLoginDate?: Date;
  isLocked: boolean;
  lockUntil?: Date;
  failedAttempts: number;
}

interface LoginAttempt {
  _id: string;
  userId: string;
  timestamp: Date;
  success: boolean;
  ipAddress?: string;
}

// Simple hash function for demo (use bcrypt in production)
export const hashPassword = (password: string): string => {
  return btoa(password); // Base64 encoding for demo only
};

export const verifyPassword = (password: string, hash: string): boolean => {
  return btoa(password) === hash;
};

// Generate 4-digit vault PIN
export const generateVaultPin = (): string => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Generate unique user ID with at least 5 alphabets, 1 symbol, and 2 digits
export const generateUniqueUserId = (): string => {
  const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const symbols = ['_', '-', '.', '#'];
  const digits = '0123456789';
  
  let userId = '';
  
  // Add 5 random alphabets
  for (let i = 0; i < 5; i++) {
    userId += alphabets.charAt(Math.floor(Math.random() * alphabets.length));
  }
  
  // Add 1 random symbol
  userId += symbols[Math.floor(Math.random() * symbols.length)];
  
  // Add 2 random digits
  for (let i = 0; i < 2; i++) {
    userId += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  
  // Shuffle the userId to randomize positions
  return userId.split('').sort(() => Math.random() - 0.5).join('');
};

// Validate user ID format (auto-generated: alphanumeric, symbols, digits)
const validateUserIdFormat = (userId: string): boolean => {
  const pattern = /^[a-zA-Z0-9_\-.#]+$/;
  const hasAlphabets = /[a-zA-Z]/.test(userId);
  const hasSymbol = /[_\-.#]/.test(userId);
  const hasDigits = /\d/.test(userId);
  return pattern.test(userId) && hasAlphabets && hasSymbol && hasDigits;
};

export const authService = {
  async checkUserIdAvailability(userId: string): Promise<boolean> {
    // Check if user ID already exists in localStorage (case-sensitive for auto-generated IDs)
    const users = Object.values(localStorage).filter((item) => {
      try {
        const user = JSON.parse(item as string);
        return user.userId === userId;
      } catch {
        return false;
      }
    });
    return users.length === 0; // Return true if available (not found)
  },

  async createUser(email: string, password: string, name: string) {
    // Generate unique user ID automatically
    let userId = generateUniqueUserId();
    let isAvailable = await this.checkUserIdAvailability(userId);
    
    // Keep generating until we get a unique one
    let attempts = 0;
    while (!isAvailable && attempts < 10) {
      userId = generateUniqueUserId();
      isAvailable = await this.checkUserIdAvailability(userId);
      attempts++;
    }
    
    if (!isAvailable) {
      throw new Error('Failed to generate unique User ID. Please try again.');
    }

    const vaultPin = generateVaultPin();
    const passwordHash = hashPassword(password);

    const user: AuthUser = {
      _id: crypto.randomUUID(),
      userId,
      email,
      passwordHash,
      vaultPin,
      createdDate: new Date(),
      isLocked: false,
      failedAttempts: 0,
    };

    // In production, save to database
    // For now, store in localStorage for demo
    localStorage.setItem(`user_${email}`, JSON.stringify(user));

    // Create user profile in CMS
    try {
      const userProfile: UserProfiles = {
        _id: crypto.randomUUID(),
        userId,
        email,
        displayName: name,
        username: name.toLowerCase().replace(/\s+/g, '_'),
        isSearchable: true,
        receiveSecurityEmails: true,
      };
      await BaseCrudService.create('userprofiles', userProfile);
    } catch (err) {
      console.error('Failed to create user profile:', err);
    }

    return { userId, vaultPin, user };
  },

  async loginUser(userId: string, password: string) {
    // Find user by userId (case-sensitive for auto-generated IDs)
    const users = Object.values(localStorage).filter((item) => {
      try {
        const user = JSON.parse(item as string);
        return user.userId === userId;
      } catch {
        return false;
      }
    });

    if (users.length === 0) {
      throw new Error('User not found');
    }

    const user = JSON.parse(users[0] as string) as AuthUser;

    // Check if account is locked
    if (user.isLocked && user.lockUntil) {
      const now = new Date();
      if (now < new Date(user.lockUntil)) {
        const minutesRemaining = Math.ceil(
          (new Date(user.lockUntil).getTime() - now.getTime()) / 60000
        );
        throw new Error(
          `Account locked. Try again in ${minutesRemaining} minutes.`
        );
      } else {
        // Unlock account
        user.isLocked = false;
        user.failedAttempts = 0;
        user.lockUntil = undefined;
        localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
      }
    }

    // Verify password
    if (!verifyPassword(password, user.passwordHash)) {
      user.failedAttempts += 1;

      // Lock account after 3 failed attempts
      if (user.failedAttempts >= 3) {
        user.isLocked = true;
        user.lockUntil = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
        throw new Error('Account locked due to too many failed attempts');
      }

      localStorage.setItem(`user_${user.email}`, JSON.stringify(user));
      throw new Error(
        `Invalid password. ${3 - user.failedAttempts} attempts remaining.`
      );
    }

    // Successful login
    user.lastLoginDate = new Date();
    user.failedAttempts = 0;
    localStorage.setItem(`user_${user.email}`, JSON.stringify(user));

    return user;
  },

  async getUserByUserId(userId: string) {
    // Find user by userId (case-sensitive for auto-generated IDs)
    const users = Object.values(localStorage).filter((item) => {
      try {
        const user = JSON.parse(item as string);
        return user.userId === userId;
      } catch {
        return false;
      }
    });

    if (users.length === 0) {
      return null;
    }

    return JSON.parse(users[0] as string) as AuthUser;
  },

  async verifyVaultPin(userId: string, pin: string) {
    const user = await this.getUserByUserId(userId);
    if (!user) {
      throw new Error('User not found');
    }

    if (user.vaultPin !== pin) {
      throw new Error('Invalid vault PIN');
    }

    return true;
  },

  async sendWelcomeMessage(userId: string, userName: string) {
    try {
      // Find or create system user "xepx"
      const systemUsers = await BaseCrudService.getAll<UserProfiles>('userprofiles', [], { limit: 1000 });
      let xepxUser = (systemUsers.items || []).find(u => u.username === 'xepx');
      
      if (!xepxUser) {
        // Create system user if doesn't exist
        xepxUser = {
          _id: crypto.randomUUID(),
          userId: '000000',
          email: 'system@xepx.io',
          displayName: 'xepx',
          username: 'xepx',
          isSearchable: false,
        };
        await BaseCrudService.create('userprofiles', xepxUser);
      }

      // Create welcome chat
      const welcomeChat: Chats = {
        _id: crypto.randomUUID(),
        chatName: `Welcome from xepx`,
        pinEnabled: false,
        participantIdentifiers: `${xepxUser._id},${userId}`,
        lastActivityDate: new Date(),
        isGroupChat: false,
      };
      await BaseCrudService.create('chats', welcomeChat);

      // Send welcome message
      const welcomeMessage: Messages = {
        _id: crypto.randomUUID(),
        chatId: welcomeChat._id,
        senderId: xepxUser._id,
        encryptedContent: btoa(`Welcome to xepx, ${userName}! 🔐\n\nI'm om, your guide here. This is your secure sanctuary for private conversations.\n\nKey features:\n✓ End-to-end encryption\n✓ Vault PIN protection\n✓ Self-destructing messages\n✓ Zero browser storage\n\nFeel free to reach out if you need help!\n\n- om`),
        timestamp: new Date(),
        isRead: false,
        isDecrypted: false,
      };
      await BaseCrudService.create('messages', welcomeMessage);

      return true;
    } catch (err) {
      console.error('Failed to send welcome message:', err);
      return false;
    }
  },
};
