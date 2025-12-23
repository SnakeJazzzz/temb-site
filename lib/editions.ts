/**
 * @file lib/editions.ts
 * @description Edition data and types for THE ELECTRONIC MUSIC BOOK
 *
 * EDITING GUIDE FOR NON-TECHNICAL USERS:
 * - Prices are in cents (e.g., 699 = $6.99)
 * - Status can be 'active' or 'inactive'
 * - stripe_price_id will be added after Stripe configuration
 * - id should be unique and use kebab-case (lowercase with hyphens)
 */

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

  /** Price in cents (e.g., 699 = $6.99) */
  price: number;

  /** Currency code for the price */
  currency: "USD" | "GBP" | "EUR";

  /** Stripe Price ID - will be set when payment processing is configured */
  stripe_price_id?: string;

  /** Current availability status */
  status: "active" | "inactive";

  // Future-ready optional fields
  /** Maximum number of copies available (optional) */
  stock_limit?: number;

  /** URL to edition-specific image (optional) */
  image_url?: string;

  /** Sort order for display (optional) */
  sort_order?: number;

  /** Additional metadata for integrations (optional) */
  metadata?: Record<string, any>;
}

// ============================================
// EDITION DATA
// ============================================

/**
 * Available book editions
 * Add new editions to this array as they become available
 */
export const editions: Edition[] = [
  {
    id: "temb-first-edition",
    name: "THE ELECTRONIC MUSIC BOOK",
    description: "Numbered 1–1000. From the underground to the main stage.",
    price: 699, // $6.99 USD
    currency: "USD",
    stripe_price_id: undefined, // TODO: Add Stripe Price ID after payment setup
    status: "active",
    sort_order: 1,
  },
  // Future editions can be added here:
  // {
  //   id: "temb-deluxe-edition",
  //   name: "DELUXE EDITION",
  //   description: "Limited collector's edition with exclusive content",
  //   price: 2999, // $29.99 USD
  //   currency: "USD",
  //   stripe_price_id: undefined,
  //   status: "inactive",
  //   stock_limit: 100,
  //   sort_order: 2,
  // },
] as const satisfies Edition[];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Returns only editions that are currently available for purchase
 * @returns Array of active Edition objects
 */
export function getActiveEditions(): Edition[] {
  return editions.filter(edition => edition.status === "active");
}

/**
 * Find an edition by its ID
 * @param id - The edition identifier
 * @returns Edition object or undefined if not found
 */
export function getEditionById(id: string): Edition | undefined {
  return editions.find(edition => edition.id === id);
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
export function getEditionsByCurrency(currency: Edition["currency"]): Edition[] {
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
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value &&
    "price" in value &&
    "status" in value
  );
}

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Import in your components:
import { getActiveEditions, type Edition } from '@/lib/editions'

// Get all active editions for display:
const activeEditions = getActiveEditions()

// Display in a component:
activeEditions.map(edition => (
  <div key={edition.id}>
    <h3>{edition.name}</h3>
    <p>{edition.description}</p>
    <span>${(edition.price / 100).toFixed(2)} {edition.currency}</span>
  </div>
))
*/