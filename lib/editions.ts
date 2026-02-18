/**
 * @file lib/editions.ts
 * @description Edition data and types for THE ELECTRONIC MUSIC BOOK
 *
 * EDITING GUIDE FOR NON-TECHNICAL USERS:
 * - Prices are in cents (e.g., 69900 = $699.00)
 * - Status can be 'active' or 'inactive'
 * - stripePriceId is loaded from environment variables (STRIPE_PRICE_BLACK_EDITION, STRIPE_PRICE_WHITE_EDITION)
 * - id should be unique and use kebab-case (lowercase with hyphens)
 * - coverType indicates the physical cover color: 'black' or 'white'
 * - features is an array of bullet points describing what's included
 */

import { getBookCover } from './assets';

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Represents a book edition with pricing and availability information
 */
export interface Edition {
  /** Unique identifier for the edition (kebab-case) */
  id: string;

  /** Display name of the edition */
  name: string;

  /** Detailed description of what makes this edition special */
  description: string;

  /** Price in cents (e.g., 69900 = $699.00) */
  price: number;

  /** Currency code for the price */
  currency: string;

  /** Stripe Price ID from environment variables - required for checkout */
  stripePriceId?: string;

  /** Current availability status */
  status: 'active' | 'inactive';

  /** Path to product image (SVG) */
  image: string;

  /** Cover variant type */
  coverType: 'black' | 'white';

  /** List of edition features and benefits */
  features: string[];

  // Future-ready optional fields
  /** Maximum number of copies available (optional) */
  stock_limit?: number;

  /** Sort order for display (optional) */
  sort_order?: number;

  /** Additional metadata for integrations (optional) */
  metadata?: Record<string, any>;
}

// ============================================
// EDITION DATA
// ============================================

/**
 * Available editions
 * Black cover at $12,999 MXN, White cover coming soon
 *
 * HOW TO EDIT:
 * - To change price: Update the 'price' field (remember: prices are in centavos for MXN)
 * - To add features: Add items to the 'features' array
 * - To disable an edition: Change 'status' from 'active' to 'inactive'
 * - Stripe Price IDs are loaded from environment variables (STRIPE_PRICE_BLACK_EDITION, STRIPE_PRICE_WHITE_EDITION)
 */
export const editions: Edition[] = [
  // Black Cover Edition
  {
    id: 'temb-black-edition',
    name: 'THE ELECTRONIC MUSIC BOOK — Black Cover',
    description: 'Numbered 1–10,000.',
    price: 1299900, // $12,999.00 MXN (in centavos)
    currency: 'MXN',
    stripePriceId: process.env.STRIPE_PRICE_BLACK_EDITION, // Loaded from environment variable
    status: 'active',
    image: getBookCover('black', 'side'), // /BookFotos/BlackStright.svg
    coverType: 'black',
    features: [
      'Numbered edition (1–10,000)',
      '250+ artists featured',
      '550 pages',
      'Premium paper quality',
      'Collector\'s item',
    ],
    sort_order: 1,
  },

  // White Cover Edition
  {
    id: 'temb-white-edition',
    name: 'THE ELECTRONIC MUSIC BOOK — White Cover',
    description: 'Numbered 1–10,000.',
    price: 0, // Coming soon - no price displayed
    currency: 'MXN',
    stripePriceId: process.env.STRIPE_PRICE_WHITE_EDITION, // Loaded from environment variable
    status: 'active',
    image: getBookCover('white', 'side'), // /BookFotos/WhiteStright.svg
    coverType: 'white',
    features: [
      'Numbered edition (1–10,000)',
      '250+ artists featured',
      '550 pages',
      'Premium paper quality',
      'Collector\'s item',
    ],
    sort_order: 2,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Returns all active editions regardless of Stripe configuration
 * Editions are displayed based on status only
 * Use isEditionPurchasable() to determine if checkout is available
 * @returns Array of active Edition objects
 */
export function getActiveEditions(): Edition[] {
  return editions.filter(edition => edition.status === 'active');
}

/**
 * Returns editions that are active but not yet purchasable (missing Stripe price ID)
 * These editions will display with "Coming Soon" instead of "Buy Now" button
 * @returns Array of Edition objects without Stripe configuration
 */
export function getComingSoonEditions(): Edition[] {
  return editions.filter(edition =>
    edition.status === 'active' &&
    (!edition.stripePriceId || edition.stripePriceId === '')
  );
}

/**
 * Find an edition by its ID
 * @param id - The edition identifier
 * @returns Edition object or undefined if not found
 *
 * @example
 * const blackEdition = getEditionById('temb-black-edition');
 */
export function getEditionById(id: string): Edition | undefined {
  return editions.find(edition => edition.id === id);
}

/**
 * Get edition by cover type
 * @param coverType - The cover color variant ('black' or 'white')
 * @returns Edition object or undefined if not found
 *
 * @example
 * const whiteEdition = getEditionByCoverType('white');
 */
export function getEditionByCoverType(coverType: 'black' | 'white'): Edition | undefined {
  return editions.find(edition => edition.coverType === coverType);
}

/**
 * Check if an edition is purchasable (has a valid Stripe price ID)
 * @param edition - The edition to check
 * @returns Boolean indicating if the edition can be purchased
 *
 * @example
 * const edition = getEditionById('temb-black-edition');
 * if (isEditionPurchasable(edition)) {
 *   // Show "Buy Now" button
 * } else {
 *   // Show "Coming Soon" button
 * }
 */
export function isEditionPurchasable(edition: Edition): boolean {
  return (
    edition.status === 'active' &&
    edition.stripePriceId !== undefined &&
    edition.stripePriceId !== null &&
    edition.stripePriceId !== ''
  );
}

/**
 * Format price for display
 * @param priceInCents - Price in centavos for MXN or cents for other currencies
 * @param currency - Currency code (default: 'MXN')
 * @returns Formatted price string (e.g., '$12,999 MXN')
 *
 * @example
 * formatPrice(1299900, 'MXN') // Returns '$12,999 MXN'
 */
export function formatPrice(priceInCents: number, currency: string = 'MXN'): string {
  const locale = currency === 'MXN' ? 'es-MX' : 'en-US';
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: currency === 'MXN' ? 0 : 2,
    maximumFractionDigits: currency === 'MXN' ? 0 : 2,
  });

  const formatted = formatter.format(priceInCents / 100);

  // Add "MXN" suffix for Mexican pesos to clarify currency
  if (currency === 'MXN') {
    // Replace the currency symbol if needed and add MXN
    return formatted.replace(/MXN/, '').trim() + ' MXN';
  }

  return formatted;
}

/**
 * Format edition price
 * @param edition - The edition object
 * @returns Formatted price string for the edition
 *
 * @example
 * const edition = getEditionById('temb-black-edition');
 * formatEditionPrice(edition) // Returns '$699.00'
 */
export function formatEditionPrice(edition: Edition): string {
  return formatPrice(edition.price, edition.currency);
}

/**
 * Get editions sorted by price (ascending)
 * @param activeOnly - If true, only returns active editions
 * @returns Sorted array of editions
 */
export function getEditionsSortedByPrice(activeOnly = true): Edition[] {
  const editionsToSort = activeOnly ? getActiveEditions() : [...editions];
  return editionsToSort.sort((a, b) => a.price - b.price);
}

/**
 * Get editions for a specific currency
 * @param currency - Currency code to filter by
 * @returns Array of editions in the specified currency
 */
export function getEditionsByCurrency(currency: string): Edition[] {
  return editions.filter(edition => edition.currency === currency);
}

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Type guard to check if a value is a valid Edition
 * @param value - Value to check
 * @returns Boolean indicating if value is an Edition
 */
export function isEdition(value: unknown): value is Edition {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value &&
    'price' in value &&
    'status' in value &&
    'coverType' in value &&
    'features' in value
  );
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Import in your components:
import {
  getActiveEditions,
  getComingSoonEditions,
  getEditionByCoverType,
  formatEditionPrice,
  isEditionPurchasable,
  type Edition
} from '@/lib/editions'

// Get all purchasable editions (with Stripe price IDs):
const purchasableEditions = getActiveEditions() // Only returns editions with valid stripePriceId

// Get editions that are coming soon (no Stripe configuration yet):
const comingSoonEditions = getComingSoonEditions() // Returns active editions without stripePriceId

// Get a specific edition by cover type:
const blackEdition = getEditionByCoverType('black')
const whiteEdition = getEditionByCoverType('white')

// Display in a component with conditional buy button:
editions.map(edition => (
  <div key={edition.id}>
    <img src={edition.image} alt={edition.name} />
    <h3>{edition.name}</h3>
    <p>{edition.description}</p>
    <span>{formatEditionPrice(edition)}</span>
    <ul>
      {edition.features.map((feature, i) => (
        <li key={i}>{feature}</li>
      ))}
    </ul>
    {isEditionPurchasable(edition) ? (
      <button>Buy Now</button>  // Uses edition.stripePriceId for checkout
    ) : (
      <button disabled>Coming Soon</button>
    )}
  </div>
))

// Setting up environment variables:
// Add to your .env.local file:
// STRIPE_PRICE_BLACK_EDITION=price_xxx
// STRIPE_PRICE_WHITE_EDITION=price_xxx
*/
