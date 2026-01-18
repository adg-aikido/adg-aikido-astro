/**
 * Price calculation helpers for Aikido Dojo Gamlestaden
 * 
 * Utilities for calculating training fees, discounts, and formatted price displays.
 */

import type { PriceCategory } from '../types/prices';
import pricesData from '../data/prices.yaml';

// ============================================================================
// PRICE CALCULATION
// ============================================================================

/**
 * Age group categories for pricing
 */
export type AgeGroup = 'barn' | 'ungdom' | 'vuxna';

/**
 * Discount types available
 */
export type DiscountType = 'student' | 'beginner' | 'family-2' | 'family-3+';

/**
 * Parse prices from YAML data on initialization
 */
const regularFeesCategory = pricesData.priceCategories.find(c => c.category === 'regularFees');
const discountsCategory = pricesData.priceCategories.find(c => c.category === 'discounts');

if (!regularFeesCategory || !discountsCategory) {
  throw new Error('Required price categories not found in prices.yaml');
}

/**
 * Base prices for each age group (per term) - parsed from YAML
 */
const BASE_PRICES: Record<AgeGroup, number> = {
  barn: parsePrice(regularFeesCategory.prices.find(p => p.title === 'Barn')?.amount || '0'),
  ungdom: parsePrice(regularFeesCategory.prices.find(p => p.title === 'Ungdomar')?.amount || '0'),
  vuxna: parsePrice(regularFeesCategory.prices.find(p => p.title === 'Vuxna' && !p.description)?.amount || '0'),
};

/**
 * Student/retired/unemployed price - parsed from YAML
 */
const STUDENT_PRICE = parsePrice(
  regularFeesCategory.prices.find(p => p.title === 'Vuxna' && p.description)?.amount || '0'
);

/**
 * Discount amounts - parsed from YAML
 */
const DISCOUNTS = {
  beginner: Math.abs(parsePrice(discountsCategory.prices.find(p => p.title.includes('Nybörjare'))?.amount || '0')),
  family2: Math.abs(parsePrice(discountsCategory.prices.find(p => p.title.includes('2 familjemedlemmar'))?.amount || '0')),
  family3Plus: Math.abs(parsePrice(discountsCategory.prices.find(p => p.title.includes('3 eller fler'))?.amount || '0')),
} as const;

/**
 * Converts price string to number
 */
function parsePrice(priceString: string): number {
  return parseInt(priceString.replace(/\D/g, ''), 10) || 0;
}

/**
 * Calculates the base price for an age group
 */
export function getBasePrice(ageGroup: AgeGroup, isStudent: boolean = false): number {
  if (ageGroup === 'vuxna' && isStudent) {
    return STUDENT_PRICE;
  }
  return BASE_PRICES[ageGroup];
}

/**
 * Calculates total discount amount
 */
export function calculateDiscount(
  ageGroup: AgeGroup,
  isBeginner: boolean = false,
  familySize: number = 1
): number {
  let discount = 0;

  // Beginner discount (adults only)
  if (isBeginner && ageGroup === 'vuxna') {
    discount += DISCOUNTS.beginner;
  }

  // Family discount
  if (familySize === 2) {
    discount += DISCOUNTS.family2;
  } else if (familySize >= 3) {
    discount += DISCOUNTS.family3Plus;
  }

  return discount;
}

/**
 * Calculates final price after discounts
 */
export function calculateFinalPrice(
  ageGroup: AgeGroup,
  isStudent: boolean = false,
  isBeginner: boolean = false,
  familySize: number = 1
): number {
  const basePrice = getBasePrice(ageGroup, isStudent);
  const discount = calculateDiscount(ageGroup, isBeginner, familySize);
  return Math.max(0, basePrice - discount);
}

/**
 * Calculates monthly price from term price
 */
export function getMonthlyPrice(termPrice: number): number {
  return Math.round(termPrice / 6); // Term = 6 months
}

/**
 * Gets partial payment amount (for mid-term joiners)
 */
export function getPartialPayment(
  termPrice: number,
  monthsRemaining: number
): number {
  const monthlyPrice = getMonthlyPrice(termPrice);
  return monthlyPrice * monthsRemaining;
}

// ============================================================================
// PRICE FORMATTING
// ============================================================================

/**
 * Formats a price with Swedish currency
 */
export function formatPrice(amount: number, unit: string = 'kr'): string {
  return `${amount} ${unit}`;
}

/**
 * Formats a price range
 */
export function formatPriceRange(min: number, max: number, unit: string = 'kr'): string {
  return `${min}-${max} ${unit}`;
}

/**
 * Formats price with per-term notation
 */
export function formatTermPrice(amount: number): string {
  return `${amount} kr/termin`;
}

/**
 * Formats price with per-month notation
 */
export function formatMonthlyPrice(amount: number): string {
  return `${amount} kr/månad`;
}

// ============================================================================
// PRICE COMPARISONS
// ============================================================================

/**
 * Gets all applicable discounts for a configuration
 */
export function getApplicableDiscounts(
  ageGroup: AgeGroup,
  isBeginner: boolean,
  familySize: number
): Array<{ type: string; amount: number; description: string }> {
  const discounts = [];

  if (isBeginner && ageGroup === 'vuxna') {
    discounts.push({
      type: 'beginner',
      amount: DISCOUNTS.beginner,
      description: 'Nybörjarrabatt',
    });
  }

  if (familySize === 2) {
    discounts.push({
      type: 'family',
      amount: DISCOUNTS.family2,
      description: 'Familjerabatt (2 personer)',
    });
  } else if (familySize >= 3) {
    discounts.push({
      type: 'family',
      amount: DISCOUNTS.family3Plus,
      description: 'Familjerabatt (3+ personer)',
    });
  }

  return discounts;
}

/**
 * Gets a price breakdown with base price, discounts, and final price
 */
export function getPriceBreakdown(
  ageGroup: AgeGroup,
  isStudent: boolean = false,
  isBeginner: boolean = false,
  familySize: number = 1
): {
  basePrice: number;
  discounts: Array<{ type: string; amount: number; description: string }>;
  totalDiscount: number;
  finalPrice: number;
  monthlyPrice: number;
} {
  const basePrice = getBasePrice(ageGroup, isStudent);
  const discounts = getApplicableDiscounts(ageGroup, isBeginner, familySize);
  const totalDiscount = discounts.reduce((sum, d) => sum + d.amount, 0);
  const finalPrice = Math.max(0, basePrice - totalDiscount);
  const monthlyPrice = getMonthlyPrice(finalPrice);

  return {
    basePrice,
    discounts,
    totalDiscount,
    finalPrice,
    monthlyPrice,
  };
}

// ============================================================================
// PRICE CATEGORY HELPERS
// ============================================================================

/**
 * Finds a specific price from a price category
 */
export function findPrice(
  category: PriceCategory,
  titleMatch: string
): { title: string; amount: string; unit: string } | undefined {
  return category.prices.find(p => p.title.toLowerCase().includes(titleMatch.toLowerCase()));
}

/**
 * Gets all prices for a specific category ID
 */
export function getPricesByCategory(
  categories: PriceCategory[],
  categoryId: string
): PriceCategory | undefined {
  return categories.find(c => c.id === categoryId);
}

/**
 * Converts price string to number (public export for external use)
 */
export function parsePriceString(priceString: string): number {
  return parseInt(priceString.replace(/\D/g, ''), 10) || 0;
}
