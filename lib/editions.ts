/**
 * @file lib/editions.ts
 * @description Edition data and types for THE ELECTRONIC MUSIC BOOK
 *
 * EDITING GUIDE FOR NON-TECHNICAL USERS:
 * - Prices are in cents (e.g., 69900 = $699.00)
 * - Status can be 'active' or 'inactive'
 * - stripe_price_id will be added after Stripe configuration
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

  /** Stripe Price ID - will be set when payment processing is configured */
  stripe_price_id?: string;

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
 * Both black and white cover variants at $699 each
 *
 * HOW TO EDIT:
 * - To change price: Update the 'price' field (remember: prices are in cents)
 * - To add features: Add items to the 'features' array
 * - To disable an edition: Change 'status' from 'active' to 'inactive'
 * - After Stripe setup: Add the Price ID to 'stripe_price_id'
 */
export const editions: Edition[] = [
  // Black Cover Edition
  {
    id: 'temb-black-edition',
    name: 'THE ELECTRONIC MUSIC BOOK — Black Cover',
    description: 'Numbered 1–1000. From the underground to the main stage. Limited edition with black cover.',
    price: 69900, // $699.00 USD
    currency: 'USD',
    stripe_price_id: undefined, // TODO: Add Stripe Price ID after payment setup
    status: 'active',
    image: getBookCover('black', 'straight'), // /BookFotos/BlackStright.svg
    coverType: 'black',
    features: [
      'Numbered edition (1–1000)',
      '503 artists featured',
      'Premium paper quality',
      'Hardcover binding',
      'Black collector\'s cover',
    ],
    sort_order: 1,
  },

  // White Cover Edition
  {
    id: 'temb-white-edition',
    name: 'THE ELECTRONIC MUSIC BOOK — White Cover',
    description: 'Numbered 1–1000. From the underground to the main stage. Limited edition with white cover.',
    price: 69900, // $699.00 USD
    currency: 'USD',
    stripe_price_id: undefined, // TODO: Add Stripe Price ID after payment setup
    status: 'active',
    image: getBookCover('white', 'straight'), // /BookFotos/WhiteStright.svg
    coverType: 'white',
    features: [
      'Numbered edition (1–1000)',
      '503 artists featured',
      'Premium paper quality',
      'Hardcover binding',
      'White collector\'s cover',
    ],
    sort_order: 2,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Returns only editions that are currently available for purchase
 * @returns Array of active Edition objects
 */
export function getActiveEditions(): Edition[] {
  return editions.filter(edition => edition.status === 'active');
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
 * Format price for display
 * @param priceInCents - Price in cents (e.g., 69900)
 * @param currency - Currency code (default: 'USD')
 * @returns Formatted price string (e.g., '$699.00')
 *
 * @example
 * formatPrice(69900, 'USD') // Returns '$699.00'
 */
export function formatPrice(priceInCents: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(priceInCents / 100);
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
import { getActiveEditions, getEditionByCoverType, formatEditionPrice, type Edition } from '@/lib/editions'

// Get all active editions for display in shop:
const activeEditions = getActiveEditions() // Returns both black and white editions

// Get a specific edition by cover type:
const blackEdition = getEditionByCoverType('black')
const whiteEdition = getEditionByCoverType('white')

// Display in a component:
activeEditions.map(edition => (
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
  </div>
))
*/
