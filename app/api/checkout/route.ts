/**
 * @file app/api/checkout/route.ts
 * @description Stripe Checkout Session API endpoint for THE ELECTRONIC MUSIC BOOK
 *
 * Supports two payment modes:
 *
 * 1. Testing Mode (No Connect):
 *    - Used when STRIPE_CONNECTED_ACCOUNT_ID is not set
 *    - Direct payment to merchant account
 *    - No application fees
 *
 * 2. Production Mode (With Connect):
 *    - Used when STRIPE_CONNECTED_ACCOUNT_ID is set
 *    - Uses Stripe Connect with destination charges
 *    - Platform takes 1.5% application fee
 *    - Connected account receives 98.5% of the payment
 *
 * Required environment variables:
 * - STRIPE_SECRET_KEY: Platform account secret key (required)
 * - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: Publishable key for client (required)
 *
 * Optional environment variables:
 * - STRIPE_CONNECTED_ACCOUNT_ID: Connected account for production mode (optional)
 * - STRIPE_SHIPPING_RATE_MX: Stripe shipping rate ID for Mexico (optional)
 * - STRIPE_SHIPPING_RATE_INTL: Stripe shipping rate ID for International (optional)
 * - NEXT_PUBLIC_BASE_URL: Base URL for success/cancel redirects (optional)
 */

import { NextResponse } from 'next/server';
import type { Stripe } from 'stripe';
import {
  getStripeClient,
  getConnectedAccountId,
  isStripeConfigured,
  isStripeConnectConfigured,
} from '@/lib/stripe';
import {
  getEditionById,
  isEditionPurchasable,
  type Edition,
} from '@/lib/editions';

// ============================================
// TYPE DEFINITIONS
// ============================================

/**
 * Request body structure for checkout endpoint
 */
interface CheckoutRequestBody {
  editionId: string;
  shippingRegion: 'MX' | 'INTL';
}

/**
 * Successful checkout response
 */
interface CheckoutResponse {
  url: string;
}

/**
 * Error response structure
 */
interface CheckoutError {
  error: string;
  details?: string;
}

/**
 * Type guard to validate request body
 */
function isValidCheckoutRequest(body: unknown): body is CheckoutRequestBody {
  return (
    typeof body === 'object' &&
    body !== null &&
    'editionId' in body &&
    'shippingRegion' in body &&
    typeof (body as any).editionId === 'string' &&
    ((body as any).shippingRegion === 'MX' || (body as any).shippingRegion === 'INTL')
  );
}

/**
 * Countries allowed for international shipping
 * Excludes Mexico as it has its own shipping region
 */
const INTERNATIONAL_COUNTRIES: Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[] = [
  'US', 'CA', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'BE',
  'AT', 'CH', 'AU', 'NZ', 'JP', 'KR', 'SG', 'SE', 'NO',
  'DK', 'FI', 'IE', 'PT', 'PL', 'CZ', 'HU', 'RO', 'BG',
  'HR', 'SK', 'SI', 'EE', 'LV', 'LT', 'LU', 'MT', 'CY',
  'IS', 'LI', 'MC', 'AD', 'SM', 'VA', 'GR'
];

// ============================================
// MAIN HANDLER
// ============================================

/**
 * POST handler for creating Stripe Checkout Sessions
 *
 * @param request - Next.js Request object
 * @returns Checkout session URL or error response
 */
export async function POST(request: Request): Promise<NextResponse> {
  try {
    // ============================================
    // 1. Check Stripe Configuration
    // ============================================

    if (!isStripeConfigured()) {
      console.warn('Checkout attempted without Stripe configuration');
      return NextResponse.json(
        {
          error: 'Payment processing is not yet configured. Please check back soon.'
        } satisfies CheckoutError,
        { status: 503 }
      );
    }

    // ============================================
    // 2. Validate Request Body
    // ============================================

    let body: unknown;
    try {
      body = await request.json();
    } catch (e) {
      return NextResponse.json(
        {
          error: 'Invalid request body',
          details: 'Request body must be valid JSON'
        } satisfies CheckoutError,
        { status: 400 }
      );
    }

    if (!isValidCheckoutRequest(body)) {
      return NextResponse.json(
        {
          error: 'Invalid request parameters',
          details: 'editionId and shippingRegion (MX or INTL) are required'
        } satisfies CheckoutError,
        { status: 400 }
      );
    }

    const { editionId, shippingRegion } = body;

    // ============================================
    // 3. Validate Edition
    // ============================================

    const edition = getEditionById(editionId);

    if (!edition) {
      return NextResponse.json(
        {
          error: 'Invalid or unavailable edition',
          details: `Edition "${editionId}" not found`
        } satisfies CheckoutError,
        { status: 400 }
      );
    }

    if (!isEditionPurchasable(edition)) {
      return NextResponse.json(
        {
          error: 'Invalid or unavailable edition',
          details: 'This edition is not currently available for purchase'
        } satisfies CheckoutError,
        { status: 400 }
      );
    }

    // ============================================
    // 4. Get Stripe Client and Check Connect Mode
    // ============================================

    const stripe = getStripeClient();
    const connectedAccountId = getConnectedAccountId();
    const useConnect = isStripeConnectConfigured();

    // Double-check stripe client is available (should be guaranteed by isStripeConfigured)
    if (!stripe) {
      console.error('Stripe client not available after configuration check');
      return NextResponse.json(
        {
          error: 'Payment processing configuration error'
        } satisfies CheckoutError,
        { status: 503 }
      );
    }

    // Log the mode we're using
    console.log('Checkout mode:', useConnect ? 'Stripe Connect' : 'Direct payment');
    if (useConnect && connectedAccountId) {
      console.log('Using connected account:', connectedAccountId);
    }

    // ============================================
    // 5. Get Shipping Rate IDs
    // ============================================

    const shippingRateId = shippingRegion === 'MX'
      ? process.env.STRIPE_SHIPPING_RATE_MX
      : process.env.STRIPE_SHIPPING_RATE_INTL;

    // Log warning but don't fail - let Stripe handle missing shipping rates
    if (!shippingRateId) {
      console.warn(`Shipping rate ID not configured for region: ${shippingRegion}`);
    }

    // ============================================
    // 6. Determine Base URL for Success/Cancel
    // ============================================

    const baseUrl = process.env.BASE_URL || process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // ============================================
    // 7. Create Stripe Checkout Session
    // ============================================

    try {
      // Base session configuration (works for both modes)
      const sessionConfig: Stripe.Checkout.SessionCreateParams = {
        mode: 'payment',

        // Line items - the book edition
        line_items: [
          {
            price: edition.stripePriceId,
            quantity: 1,
          }
        ],

        // Shipping address collection with region-specific countries
        shipping_address_collection: {
          allowed_countries: shippingRegion === 'MX'
            ? ['MX']
            : INTERNATIONAL_COUNTRIES,
        },

        // Success and cancel URLs
        success_url: `${baseUrl}/shop/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/shop/cancel`,

        // Metadata for tracking
        metadata: {
          editionId: edition.id,
          editionName: edition.name,
          shippingRegion,
          coverType: edition.coverType,
          paymentMode: useConnect ? 'connect' : 'direct',
        },

        // Additional settings
        allow_promotion_codes: true,
        automatic_tax: {
          enabled: false, // Can be enabled later if needed
        },
        invoice_creation: {
          enabled: false, // Can be enabled for B2B sales
        },
      };

      // Add shipping configuration only if shipping rate is configured
      if (shippingRateId) {
        sessionConfig.shipping_options = [
          {
            shipping_rate: shippingRateId,
          }
        ];
      }

      // Add Connect-specific configuration if connected account is configured
      let applicationFee = 0;
      if (useConnect && connectedAccountId) {
        // Fetch the actual price from Stripe to calculate the fee dynamically.
        // This ensures the fee is always 1.5% of whatever price is set in Stripe,
        // regardless of any local edition.price value.
        const stripePrice = await stripe.prices.retrieve(edition.stripePriceId as string);
        const actualAmount = stripePrice.unit_amount || 0;
        applicationFee = Math.floor(actualAmount * 1.5 / 100);

        sessionConfig.payment_intent_data = {
          application_fee_amount: applicationFee,
          transfer_data: {
            destination: connectedAccountId,
          },
        };
      }

      const session = await stripe.checkout.sessions.create(sessionConfig);

      // Verify session was created with a URL
      if (!session.url) {
        throw new Error('Checkout session created but no URL returned');
      }

      // Log successful session creation (without sensitive data)
      console.log('Checkout session created successfully:', {
        sessionId: session.id,
        editionId: edition.id,
        shippingRegion,
        paymentMode: useConnect ? 'connect' : 'direct',
        applicationFee,
      });

      // Return the checkout URL for redirect
      return NextResponse.json(
        {
          url: session.url
        } satisfies CheckoutResponse,
        { status: 200 }
      );

    } catch (stripeError) {
      // Handle Stripe-specific errors
      console.error('Stripe API error during checkout session creation:', {
        error: stripeError,
        editionId: edition.id,
        shippingRegion,
      });

      // Check for specific Stripe error types
      if (stripeError instanceof Error) {
        // Check if it's a Stripe validation error
        if (stripeError.message.includes('Invalid shipping_rate')) {
          return NextResponse.json(
            {
              error: 'Shipping configuration error',
              details: 'The shipping rate for your region is not properly configured'
            } satisfies CheckoutError,
            { status: 503 }
          );
        }

        // Check if it's a Stripe authentication error
        if (stripeError.message.includes('authentication') || stripeError.message.includes('API key')) {
          return NextResponse.json(
            {
              error: 'Payment processing authentication error'
            } satisfies CheckoutError,
            { status: 503 }
          );
        }
      }

      // Generic error response (don't expose internal details)
      return NextResponse.json(
        {
          error: 'Failed to create checkout session',
          details: 'An error occurred while processing your request. Please try again.'
        } satisfies CheckoutError,
        { status: 500 }
      );
    }

  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error in checkout endpoint:', error);

    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
        details: 'Please try again or contact support if the issue persists'
      } satisfies CheckoutError,
      { status: 500 }
    );
  }
}

// ============================================
// OPTIONS HANDLER FOR CORS (if needed)
// ============================================

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(request: Request): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}