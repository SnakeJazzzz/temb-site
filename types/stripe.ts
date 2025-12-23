/**
 * TypeScript interfaces for Stripe integration
 * These types define the structure of our product catalog and checkout flow
 */

/**
 * Shipping region configuration
 */
export interface ShippingRegion {
  /** Region identifier (e.g., 'us', 'uk', 'eu') */
  code: string;
  /** Display name for the region */
  name: string;
  /** Shipping cost in cents/pence */
  cost: number;
  /** Currency code (ISO 4217) */
  currency: 'usd' | 'gbp' | 'eur';
  /** Countries included in this region */
  countries: string[];
}

/**
 * Book edition with Stripe integration
 */
export interface Edition {
  /** Unique identifier for the edition */
  id: string;
  /** Edition name (e.g., "Standard Edition", "Deluxe Edition") */
  name: string;
  /** Detailed description */
  description: string;
  /** Base price in cents/pence */
  price: number;
  /** Currency code */
  currency: 'usd' | 'gbp' | 'eur';
  /** Stripe Price ID - optional until Stripe is configured */
  priceId?: string;
  /** Available features in this edition */
  features: string[];
  /** Whether this edition is currently available */
  available: boolean;
  /** Image URL for the edition */
  image?: string;
  /** Whether this edition includes physical shipping */
  requiresShipping: boolean;
}

/**
 * Checkout session data structure
 */
export interface CheckoutSession {
  /** Stripe Session ID - only present when Stripe is configured */
  sessionId?: string;
  /** Selected edition ID */
  editionId: string;
  /** Selected shipping region (if applicable) */
  shippingRegion?: ShippingRegion;
  /** Total amount in cents/pence */
  totalAmount: number;
  /** Currency code */
  currency: 'usd' | 'gbp' | 'eur';
  /** Session creation timestamp */
  createdAt: Date;
  /** Session status */
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'not_configured';
}

/**
 * Checkout request payload
 */
export interface CheckoutRequest {
  /** Edition ID to purchase */
  editionId: string;
  /** Shipping region code (if applicable) */
  shippingRegion?: string;
  /** Success URL to redirect after successful payment */
  successUrl: string;
  /** Cancel URL to redirect if user cancels */
  cancelUrl: string;
}

/**
 * Checkout response - returned from /api/checkout
 */
export interface CheckoutResponse {
  /** Success status */
  success: boolean;
  /** Whether Stripe is configured and ready */
  configured: boolean;
  /** Stripe Checkout Session URL (if configured) */
  checkoutUrl?: string;
  /** Error message (if failed) */
  error?: string;
  /** Additional context about the response */
  message?: string;
}
