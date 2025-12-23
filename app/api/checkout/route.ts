import { NextRequest, NextResponse } from 'next/server';
import { getStripeClient, isStripeConfigured } from '@/lib/stripe';
import type { CheckoutRequest, CheckoutResponse } from '@/types/stripe';

/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for purchasing a book edition.
 * Gracefully handles the case where Stripe is not configured.
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: CheckoutRequest = await request.json();
    const { editionId, shippingRegion, successUrl, cancelUrl } = body;

    // Validate required fields
    if (!editionId) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error: 'Edition ID is required',
        } as CheckoutResponse,
        { status: 400 }
      );
    }

    // Check if Stripe is configured
    if (!isStripeConfigured()) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error: 'Checkout not available',
          message: 'Stripe payment processing is not configured. Please contact support or try again later.',
        } as CheckoutResponse,
        { status: 503 }
      );
    }

    // Stripe is configured - ready for integration
    const stripe = getStripeClient();

    if (!stripe) {
      return NextResponse.json(
        {
          success: false,
          configured: false,
          error: 'Payment service unavailable',
        } as CheckoutResponse,
        { status: 503 }
      );
    }

    // TODO: Implement actual Stripe checkout session creation
    // For now, return a success message indicating readiness
    return NextResponse.json(
      {
        success: true,
        configured: true,
        message: 'Stripe is configured and ready for checkout integration',
        // checkoutUrl: session.url, // Will be added when implementing actual session creation
      } as CheckoutResponse,
      { status: 200 }
    );

  } catch (error) {
    console.error('Checkout API error:', error);

    return NextResponse.json(
      {
        success: false,
        configured: isStripeConfigured(),
        error: 'An unexpected error occurred',
        message: error instanceof Error ? error.message : 'Unknown error',
      } as CheckoutResponse,
      { status: 500 }
    );
  }
}

/**
 * GET /api/checkout
 *
 * Health check endpoint to verify Stripe configuration status
 */
export async function GET() {
  return NextResponse.json(
    {
      success: true,
      configured: isStripeConfigured(),
      message: isStripeConfigured()
        ? 'Stripe is configured and ready'
        : 'Stripe is not configured',
    } as CheckoutResponse,
    { status: 200 }
  );
}
