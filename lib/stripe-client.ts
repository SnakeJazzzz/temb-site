/**
 * @file lib/stripe-client.ts
 * @description Client-safe Stripe configuration checker
 *
 * This module provides client-side utilities for checking Stripe configuration
 * without exposing server-side secrets or causing build errors.
 */

/**
 * Check if Stripe publishable key is configured (client-safe)
 * @returns true if Stripe publishable key is available
 */
export function isStripePublishableKeyConfigured(): boolean {
  return typeof process !== 'undefined' &&
         !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
}

/**
 * Get Stripe publishable key for client-side usage
 * @returns Publishable key or null if not configured
 */
export function getStripePublishableKey(): string | null {
  if (typeof process !== 'undefined') {
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null;
  }
  return null;
}