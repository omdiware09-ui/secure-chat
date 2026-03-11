/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

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
