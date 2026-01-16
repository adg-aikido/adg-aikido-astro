import type { NavItem, NavVariant } from '../types/navigation';

/**
 * Extracts basename and variant from a page filename
 * Examples:
 *   "priser.astro" → { basename: "priser", variant: null }
 *   "priser--student.astro" → { basename: "priser", variant: "student" }
 */
function parsePageFilename(filepath: string): { basename: string; variant: string | null } {
  // Extract filename from path
  const filename = filepath.split('/').pop() || '';

  // Remove .astro extension
  const nameWithoutExt = filename.replace(/\.astro$/, '');

  // Check for variant pattern (double dash separator)
  if (nameWithoutExt.includes('--')) {
    const parts = nameWithoutExt.split('--');
    return {
      basename: parts[0],
      variant: parts.slice(1).join('--') // Handle multiple dashes
    };
  }

  return {
    basename: nameWithoutExt,
    variant: null
  };
}

/**
 * Formats a variant name for display
 * Examples:
 *   "student" → "Student"
 *   "early-bird" → "Early Bird"
 *   "for-seniors" → "For Seniors"
 */
export function formatVariantLabel(variantName: string): string {
  return variantName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Discovers page variants from Astro.glob results
 * Returns a Map of basename → variants[]
 */
export function discoverPageVariants(pageFiles: any[]): Map<string, NavVariant[]> {
  const variantMap = new Map<string, NavVariant[]>();

  for (const file of pageFiles) {
    const filepath = file.file || '';

    // Skip dynamic routes (contain [ or ])
    if (filepath.includes('[') || filepath.includes(']')) {
      continue;
    }

    const { basename, variant } = parsePageFilename(filepath);

    // Only track actual variants (files with -- in name)
    if (variant) {
      if (!variantMap.has(basename)) {
        variantMap.set(basename, []);
      }

      const variants = variantMap.get(basename)!;
      variants.push({
        label: formatVariantLabel(variant),
        href: `/${basename}--${variant}/`
      });
    }
  }

  return variantMap;
}

/**
 * Builds complete navigation configuration by merging base nav items
 * with discovered page variants
 */
export function buildNavigationConfig(
  baseNavItems: Omit<NavItem, 'variants'>[],
  variantMap: Map<string, NavVariant[]>
): NavItem[] {
  return baseNavItems.map(item => {
    // Extract basename from href (remove leading/trailing slashes)
    const basename = item.href.replace(/^\/|\/$/g, '');

    // Look up variants for this page
    const variants = variantMap.get(basename) || undefined;

    return {
      ...item,
      variants
    };
  });
}
