/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: chats
 * Interface for Chats
 */
export interface Chats {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  chatName?: string;
  /** @wixFieldType boolean */
  pinEnabled?: boolean;
  /** @wixFieldType number */
  pinCode?: number;
  /** @wixFieldType text */
  participantIdentifiers?: string;
  /** @wixFieldType datetime */
  lastActivityDate?: Date | string;
  /** @wixFieldType boolean */
  isGroupChat?: boolean;
}


/**
 * Collection ID: interfacepreviews
 * Interface for InterfacePreviews
 */
export interface InterfacePreviews {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  previewTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  mockupImage?: string;
  /** @wixFieldType text */
  section?: string;
  /** @wixFieldType number */
  displayOrder?: number;
  /** @wixFieldType boolean */
  darkModeEnabled?: boolean;
}


/**
 * Collection ID: messages
 * Interface for Messages
 */
export interface Messages {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  chatId?: string;
  /** @wixFieldType text */
  senderId?: string;
  /** @wixFieldType text */
  encryptedContent?: string;
  /** @wixFieldType datetime */
  timestamp?: Date | string;
  /** @wixFieldType boolean */
  isRead?: boolean;
  /** @wixFieldType boolean */
  isDecrypted?: boolean;
}


/**
 * Collection ID: platformhighlights
 * Interface for PlatformHighlights
 */
export interface PlatformHighlights {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  title?: string;
  /** @wixFieldType text */
  shortSummary?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  icon?: string;
  /** @wixFieldType boolean */
  isFeatured?: boolean;
}


/**
 * Collection ID: securityfeatures
 * Interface for SecurityFeatures
 */
export interface SecurityFeatures {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  featureName?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  featureImage?: string;
  /** @wixFieldType boolean */
  isEncrypted?: boolean;
  /** @wixFieldType boolean */
  requiresPin?: boolean;
  /** @wixFieldType boolean */
  hasSelfDestruct?: boolean;
}


/**
 * Collection ID: userprofiles
 * Interface for UserProfiles
 */
export interface UserProfiles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType boolean */
  receiveSecurityEmails?: boolean;
  /** @wixFieldType text */
  username?: string;
  /** @wixFieldType text */
  displayName?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  profilePicture?: string;
  /** @wixFieldType text */
  aboutMe?: string;
  /** @wixFieldType datetime */
  lastOnline?: Date | string;
  /** @wixFieldType boolean */
  isSearchable?: boolean;
}
