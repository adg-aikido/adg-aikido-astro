/**
 * Navigation type definitions for dropdown variant system
 */

/**
 * Represents a page variant in the navigation dropdown
 */
export interface NavVariant {
  /** Display label for the variant (e.g., "Student", "Senior") */
  label: string;
  /** Full path to the variant page (e.g., "/priser--student/") */
  href: string;
}

/**
 * Represents a navigation item with optional variants
 */
export interface NavItem {
  /** Base page path (e.g., "/priser/") */
  href: string;
  /** Display label for navigation item */
  label: string;
  /** Optional icon identifier */
  icon?: string;
  /** Flag for external links */
  external?: boolean;
  /** Array of discovered page variants */
  variants?: NavVariant[];
}
