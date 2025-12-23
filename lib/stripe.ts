import "server-only";
import Stripe from 'stripe';

/**
 * Stripe client instance - only initialized if API keys are configured
 */
let stripeClient: Stripe | null = null;

/**
 * Initialize Stripe client with error handling
 */
function initializeStripe(): Stripe | null {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      console.warn('Stripe not configured: STRIPE_SECRET_KEY is missing');
      return null;
    }

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
 * Get the Stripe client instance
 * @returns Stripe client or null if not configured
 */
export function getStripeClient(): Stripe | null {
  return stripeClient;
}

/**
 * Check if Stripe is properly configured
 * @returns true if Stripe client is initialized and ready
 */
export function isStripeConfigured(): boolean {
  return stripeClient !== null;
}

/**
 * Get Stripe publishable key for client-side usage
 * @returns Publishable key or null if not configured
 */
export function getStripePublishableKey(): string | null {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null;
}

// Export both named and default for backwards compatibility
export const stripe = stripeClient;
export default stripeClient;
