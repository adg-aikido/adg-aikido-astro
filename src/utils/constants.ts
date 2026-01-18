/**
 * Site-wide constants for Aikido Dojo Gamlestaden
 * 
 * Centralizes all contact information, payment details, location data,
 * and insurance information used across the site.
 */

// ============================================================================
// LOCATION & TRANSPORTATION
// ============================================================================

export const TRANSPORTATION = {
  tram: {
    title: 'Spårvagn',
    lines: ['4', '6', '7', '8', '9', '11'],
    stop: 'Gamlestadstorget',
    description: 'Ta spårvagn 4, 6, 7, 8, 9 eller 11 och stig av vid hållplats Gamlestadstorget.',
    shortDescription: 'Linje 4, 6, 7, 8, 9 eller 11 → Gamlestadstorget',
  },
  busKristinedal: {
    title: 'Buss (Kristinedal)',
    lines: ['58', '510'],
    stop: 'Kristinedal',
    description: 'Ta buss 58 eller 510 och stig av vid hållplats Kristinedal.',
    shortDescription: 'Linje 58 eller 510 → Kristinedal',
  },
  busGamlestaden: {
    title: 'Buss (Gamlestadstorget)',
    lines: ['21', '78', '79'],
    stop: 'Gamlestadstorget',
    description: 'Ta buss 21, 78 eller 79 och stig av vid hållplats Gamlestadstorget.',
    shortDescription: 'Linje 21, 78 eller 79 → Gamlestadstorget',
  },
  car: {
    title: 'Bil',
    description: 
      'Ta bilen (se kartor nedan). Parkeringsplatser finns framför dojon (parkeringsavgift krävs!). ' +
      'Notera att parkeringsplatsen framför Kristinedal endast är till för besökare till deras träningsanläggning.',
    shortDescription: 'Parkering framför dojon (avgift krävs!)',
  },
} as const;

// ============================================================================
// INSURANCE INFORMATION
// ============================================================================

export const INSURANCE = {
  provider: 'Budo och Kampsportsförbundet',
  providerShort: 'Budoförbundet',
  coverage: 'Alla medlemmar är försäkrade mot olycksfall genom medlemskapet i Budo och Kampsportsförbundet.',
  detailsUrl: 'https://www.budokampsport.se/klubb/forsakring/',
  foreignCampNote: 'Observera att för att försäkringen ska gälla på läger utomlands, måste man lämna in en ansökan.',
  foreignCampApplicationUrl: 'https://www.budokampsport.se/ansokningar/anmalningar/',
  fullText: 
    'Alla medlemmar är försäkrade mot olycksfall genom medlemskapet i Budo och Kampsportsförbundet. ' +
    'Villkor och detaljer finns på Budo och Kampsportsförbundets webbsida. ' +
    'Observera att för att försäkringen ska gälla på läger utomlands, måste man lämna in en ansökan.',
} as const;

// ============================================================================
// PRICING CONSTANTS
// ============================================================================

export const PRICING = {
  discount: {
    newStudent2024: {
      amount: 600,
      title: 'Våren 2024 – Särskilt erbjudande!',
      message: 'Vi erbjuder 600 kr i rabatt för vuxna nybörjare första terminen.',
      category: 'Vuxna nybörjare',
    },
  },
  membershipNote: 
    'Medlemsavgift betalas av alla medlemmar och ingår i respektive terminsavgift. ' +
    'Inbakad i denna är också en avgift till Svenska Budoförbundet. Alla som tränar är därmed försäkrade mot olycksfall.',
  termLength: {
    months: 6,
    description: 'En termin är 6 månader',
  },
} as const;

// ============================================================================
// DESIGN SYSTEM CONSTANTS
// ============================================================================

export const SPACING = {
  section: {
    small: 'py-8',
    medium: 'py-12',
    large: 'py-16',
    xlarge: 'py-20',
  },
  gap: {
    xsmall: 'gap-2',
    small: 'gap-4',
    medium: 'gap-6',
    large: 'gap-8',
    xlarge: 'gap-12',
  },
  margin: {
    section: 'mb-12',
    subsection: 'mb-8',
    element: 'mb-4',
  },
} as const;

export const SHADOWS = {
  none: 'shadow-none',
  small: 'shadow-sm',
  medium: 'shadow-md',
  large: 'shadow-lg',
  xlarge: 'shadow-xl',
  card: 'shadow-lg',
  elevated: 'shadow-xl',
} as const;

export const CONTAINER = {
  reading: 'max-w-5xl',
  standard: 'max-w-6xl',
  grid: 'max-w-7xl',
  full: 'max-w-full',
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Formats a price with currency
 */
export function formatPrice(amount: number, unit: string = 'kr'): string {
  return `${amount} ${unit}`;
}

/**
 * Calculates monthly price from term price
 */
export function calculateMonthlyPrice(termPrice: number): number {
  return Math.round(termPrice / PRICING.termLength.months);
}

/**
 * Gets full address string
 */
export function getFullAddress(): string {
  return LOCATION.fullAddress;
}

/**
 * Gets email mailto link
 */
export function getMailtoLink(emailType: 'general' | 'instructors' = 'general'): string {
  return `mailto:${CONTACT.email[emailType]}`;
}
