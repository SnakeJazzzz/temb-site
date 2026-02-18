import "server-only";
import Stripe from 'stripe';

/**
 * Stripe Connect Configuration
 *
 * This application uses Stripe Connect with destination charges:
 * - Platform account (developer) receives the application fee
 * - Connected account (client) receives the remaining amount
 * - All charges are created on the platform account
 * - Funds are automatically transferred to the connected account
 */

/**
 * Application fee percentage for the platform (1.5%)
 * This is the percentage of each transaction that goes to the platform account
 */
export const APPLICATION_FEE_PERCENT = 1.5;

/**
 * Stripe client instance - only initialized if API keys are configured
 * Uses the platform account's secret key for all operations
 */
let stripeClient: Stripe | null = null;

/**
 * Connected account ID from environment variables
 * This is the account that will receive the majority of the payment
 */
const CONNECTED_ACCOUNT_ID = process.env.STRIPE_CONNECTED_ACCOUNT_ID || null;

/**
 * Initialize Stripe client with error handling
 * Uses platform account credentials for Stripe Connect
 */
function initializeStripe(): Stripe | null {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      console.warn('Stripe not configured: STRIPE_SECRET_KEY is missing');
      return null;
    }

    // Initialize with platform account's secret key
    return new Stripe(secretKey, {
      apiVersion: '2025-08-27.basil',
      typescript: true,
    });
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
    return null;
  }
}

// Initialize on module load
stripeClient = initializeStripe();

/**
 * Calculate the application fee for a given amount
 * @param amountInCents - The total amount in cents/centavos (works for any currency)
 * @returns The application fee in cents/centavos (rounded down)
 * @example
 * calculateApplicationFee(1299900) // Returns 19498 centavos (1.5% of $12,999 MXN)
 * calculateApplicationFee(69900) // Returns 1048 cents (1.5% of $699 USD)
 */
export function calculateApplicationFee(amountInCents: number): number {
  // Calculate 1.5% of the amount and round down
  // Works for any currency - MXN centavos or USD cents
  return Math.floor(amountInCents * APPLICATION_FEE_PERCENT / 100);
}

/**
 * Get the Stripe client instance
 * @returns Stripe client or null if not configured
 */
export function getStripeClient(): Stripe | null {
  return stripeClient;
}

/**
 * Check if Stripe is properly configured (basic configuration)
 * Requires: secret key and publishable key
 * @returns true if basic Stripe configuration is present
 */
export function isStripeConfigured(): boolean {
  return !!(
    stripeClient &&
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  );
}

/**
 * Check if Stripe Connect is configured
 * Used to determine if we should use destination charges with application fees
 * @returns true if Stripe Connect configuration is present
 */
export function isStripeConnectConfigured(): boolean {
  return !!(
    isStripeConfigured() &&
    CONNECTED_ACCOUNT_ID
  );
}

/**
 * Check if Stripe is fully configured for Connect payments (deprecated - use isStripeConnectConfigured)
 * @deprecated Use isStripeConnectConfigured() instead
 * @returns true if all required Stripe Connect configuration is present
 */
export function isStripeFullyConfigured(): boolean {
  return isStripeConnectConfigured();
}

/**
 * Get the connected account ID for Stripe Connect
 * @returns Connected account ID or null if not configured
 */
export function getConnectedAccountId(): string | null {
  // No warning - this is optional for testing mode
  return CONNECTED_ACCOUNT_ID;
}

/**
 * Get Stripe publishable key for client-side usage
 * @returns Platform's publishable key or null if not configured
 */
export function getStripePublishableKey(): string | null {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null;
}

/**
 * Check if Stripe publishable key is configured
 * @returns true if publishable key is present
 */
export function isStripePublishableKeyConfigured(): boolean {
  return !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
}

// Export both named and default for backwards compatibility
export const stripe = stripeClient;
export default stripeClient;
