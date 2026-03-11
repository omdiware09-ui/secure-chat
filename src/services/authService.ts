import { BaseCrudService } from '@/integrations';

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

// Generate 6-digit user ID
export const generateUserId = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const authService = {
  async createUser(email: string, password: string, name: string) {
    const userId = generateUserId();
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

    return { userId, vaultPin, user };
  },

  async loginUser(userId: string, password: string) {
    // Find user by userId
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
};
