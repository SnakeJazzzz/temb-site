/**
 * @file lib/shipping.ts
 * @description Shipping rates and types for THE ELECTRONIC MUSIC BOOK
 *
 * EDITING GUIDE FOR NON-TECHNICAL USERS:
 * - Prices are in cents (e.g., 500 = $5.00)
 * - Region codes: MX = Mexico, INTL = International
 * - stripe_shipping_rate_id will be added after Stripe configuration
 * - Update prices as shipping costs change
 */

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Supported shipping regions
 * MX: Mexico (domestic)
 * INTL: International (all other countries)
 */
export type ShippingRegion = "MX" | "INTL";

/**
 * Represents a shipping rate configuration
 */
export interface ShippingRate {
  /** Shipping region code */
  region: ShippingRegion;

  /** Display name for the shipping option */
  name: string;

  /** Shipping price in cents (e.g., 500 = $5.00) */
  price: number;

  /** Currency for the shipping price */
  currency: "USD" | "GBP" | "EUR";

  /** Stripe Shipping Rate ID - will be set when payment processing is configured */
  stripe_shipping_rate_id?: string;

  // Future-ready optional fields
  /** Estimated delivery time in business days */
  estimated_days?: {
    min: number;
    max: number;
  };

  /** Tracking availability */
  tracking_available?: boolean;

  /** Insurance included */
  insurance_included?: boolean;

  /** Maximum weight in grams (optional) */
  max_weight_grams?: number;

  /** Countries included in this region (optional) */
  countries?: string[];

  /** Additional metadata for integrations (optional) */
  metadata?: Record<string, any>;
}

/**
 * Extended shipping configuration with additional options
 */
export interface ShippingConfig {
  /** Default region if none specified */
  default_region: ShippingRegion;

  /** Available shipping rates */
  rates: ShippingRate[];

  /** Free shipping threshold in cents (optional) */
  free_shipping_threshold?: number;

  /** Countries we don't ship to (optional) */
  restricted_countries?: string[];
}

// ============================================
// SHIPPING DATA
// ============================================

/**
 * Available shipping rates by region
 * Update these rates as shipping costs change
 */
export const shippingRates: ShippingRate[] = [
  {
    region: "MX",
    name: "Mexico - Standard Shipping",
    price: 2500, // $25.00 USD
    currency: "USD",
    stripe_shipping_rate_id: undefined, // TODO: Add Stripe Shipping Rate ID
    estimated_days: {
      min: 3,
      max: 7,
    },
    tracking_available: true,
    insurance_included: false,
    countries: ["MX"], // Mexico only
  },
  {
    region: "INTL",
    name: "International - Standard Shipping",
    price: 5000, // $50.00 USD
    currency: "USD",
    stripe_shipping_rate_id: undefined, // TODO: Add Stripe Shipping Rate ID
    estimated_days: {
      min: 7,
      max: 21,
    },
    tracking_available: true,
    insurance_included: false,
    // All countries except Mexico (handled separately)
  },
] as const satisfies ShippingRate[];

/**
 * Complete shipping configuration
 */
export const shippingConfig: ShippingConfig = {
  default_region: "INTL",
  rates: shippingRates,
  free_shipping_threshold: 10000, // $100.00 USD - optional free shipping
  restricted_countries: [], // Add country codes here if needed (e.g., ["KP", "IR"])
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Get shipping rate for a specific region
 * @param region - The shipping region code
 * @returns ShippingRate object or undefined if not found
 */
export function getShippingRate(region: ShippingRegion): ShippingRate | undefined {
  return shippingRates.find(rate => rate.region === region);
}

/**
 * Get all available shipping rates
 * @returns Array of all ShippingRate objects
 */
export function getAllShippingRates(): ShippingRate[] {
  return shippingRates;
}

/**
 * Calculate total price including shipping
 * @param itemPrice - Price of item(s) in cents
 * @param region - Shipping region
 * @returns Total price including shipping in cents
 */
export function calculateTotalWithShipping(itemPrice: number, region: ShippingRegion): number {
  const shippingRate = getShippingRate(region);
  if (!shippingRate) {
    throw new Error(`No shipping rate found for region: ${region}`);
  }

  // Check if eligible for free shipping
  if (shippingConfig.free_shipping_threshold && itemPrice >= shippingConfig.free_shipping_threshold) {
    return itemPrice;
  }

  return itemPrice + shippingRate.price;
}

/**
 * Determine shipping region based on country code
 * @param countryCode - ISO 3166-1 alpha-2 country code (e.g., "US", "MX", "GB")
 * @returns Appropriate ShippingRegion
 */
export function getRegionByCountry(countryCode: string): ShippingRegion {
  const upperCountryCode = countryCode.toUpperCase();

  // Check if country is restricted
  if (shippingConfig.restricted_countries?.includes(upperCountryCode)) {
    throw new Error(`Shipping not available to country: ${countryCode}`);
  }

  // Mexico has its own region
  if (upperCountryCode === "MX") {
    return "MX";
  }

  // All other countries are international
  return "INTL";
}

/**
 * Check if shipping is available to a country
 * @param countryCode - ISO 3166-1 alpha-2 country code
 * @returns Boolean indicating if shipping is available
 */
export function isShippingAvailable(countryCode: string): boolean {
  const upperCountryCode = countryCode.toUpperCase();
  return !shippingConfig.restricted_countries?.includes(upperCountryCode);
}

/**
 * Get estimated delivery date range
 * @param region - Shipping region
 * @param orderDate - Date of order (defaults to today)
 * @returns Object with estimated min and max delivery dates
 */
export function getEstimatedDeliveryDates(
  region: ShippingRegion,
  orderDate: Date = new Date()
): { min: Date; max: Date } | null {
  const shippingRate = getShippingRate(region);
  if (!shippingRate?.estimated_days) {
    return null;
  }

  const minDate = new Date(orderDate);
  const maxDate = new Date(orderDate);

  // Add business days (simplified - doesn't account for weekends/holidays)
  minDate.setDate(minDate.getDate() + shippingRate.estimated_days.min);
  maxDate.setDate(maxDate.getDate() + shippingRate.estimated_days.max);

  return { min: minDate, max: maxDate };
}

/**
 * Format shipping price for display
 * @param region - Shipping region
 * @param locale - Locale for formatting (defaults to 'en-US')
 * @returns Formatted price string
 */
export function formatShippingPrice(region: ShippingRegion, locale: string = "en-US"): string {
  const shippingRate = getShippingRate(region);
  if (!shippingRate) {
    return "Shipping not available";
  }

  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: shippingRate.currency,
  });

  return formatter.format(shippingRate.price / 100);
}

// ============================================
// TYPE GUARDS
// ============================================

/**
 * Type guard to check if a value is a valid ShippingRegion
 * @param value - Value to check
 * @returns Boolean indicating if value is a ShippingRegion
 */
export function isShippingRegion(value: unknown): value is ShippingRegion {
  return value === "MX" || value === "INTL";
}

/**
 * Type guard to check if a value is a valid ShippingRate
 * @param value - Value to check
 * @returns Boolean indicating if value is a ShippingRate
 */
export function isShippingRate(value: unknown): value is ShippingRate {
  return (
    typeof value === "object" &&
    value !== null &&
    "region" in value &&
    "name" in value &&
    "price" in value &&
    "currency" in value
  );
}

// ============================================
// CONSTANTS
// ============================================

/**
 * Human-readable region names for display
 */
export const REGION_DISPLAY_NAMES: Record<ShippingRegion, string> = {
  MX: "Mexico",
  INTL: "International",
} as const;

/**
 * Currency symbols for display
 */
export const CURRENCY_SYMBOLS: Record<ShippingRate["currency"], string> = {
  USD: "$",
  GBP: "£",
  EUR: "€",
} as const;

// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Import in your components:
import { getShippingRate, calculateTotalWithShipping, type ShippingRegion } from '@/lib/shipping'

// Get shipping rate for Mexico:
const mexicoRate = getShippingRate('MX')

// Calculate total with shipping:
const bookPrice = 699 // $6.99
const total = calculateTotalWithShipping(bookPrice, 'MX')
console.log(`Total: $${(total / 100).toFixed(2)}`) // Total: $11.99

// Determine region from country:
const region = getRegionByCountry('US') // Returns 'INTL'

// Display shipping options:
getAllShippingRates().map(rate => (
  <option key={rate.region} value={rate.region}>
    {rate.name} - ${(rate.price / 100).toFixed(2)}
  </option>
))
*/