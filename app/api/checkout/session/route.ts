// app/api/checkout/session/route.ts

import { NextResponse } from 'next/server';
import { getStripeClient, isStripeConfigured, getConnectedAccountId, isStripeConnectConfigured } from '@/lib/stripe';

/**
 * Response structure for session details
 */
interface SessionDetailsResponse {
  editionId?: string;
  editionName?: string;
  shippingRegion?: string;
  customerEmail?: string;
  orderNumber?: string;
  coverType?: string;
}

/**
 * Error response structure
 */
interface SessionError {
  error: string;
  details?: string;
}

/**
 * GET handler for retrieving Stripe checkout session details
 *
 * @param request - Next.js Request object with session_id query parameter
 * @returns Session details or error response
 */
export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Parse URL to get session_id from query params
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');

    // Validate session_id parameter
    if (!sessionId) {
      return NextResponse.json(
        {
          error: 'Missing session_id',
          details: 'session_id query parameter is required'
        } satisfies SessionError,
        { status: 400 }
      );
    }

    // Check if Stripe is configured
    if (!isStripeConfigured()) {
      console.warn('Session retrieval attempted without Stripe configuration');
      // Return empty details rather than error to avoid breaking the success page
      return NextResponse.json({} satisfies SessionDetailsResponse);
    }

    // Get Stripe client
    const stripe = getStripeClient();
    if (!stripe) {
      console.error('Stripe client not available after configuration check');
      // Return empty details rather than error
      return NextResponse.json({} satisfies SessionDetailsResponse);
    }

    try {
      // When using direct charges (stripeAccount), the session lives on the connected account.
      // Pass stripeAccount option so Stripe looks in the right place.
      const connectedAccountId = isStripeConnectConfigured() ? getConnectedAccountId() : null;
      const retrieveOptions = connectedAccountId ? { stripeAccount: connectedAccountId } : undefined;

      const session = await stripe.checkout.sessions.retrieve(
        sessionId,
        { expand: ['customer_details', 'line_items'] },
        retrieveOptions
      );

      // Extract relevant information from the session
      const response: SessionDetailsResponse = {
        // From metadata
        editionId: session.metadata?.editionId,
        editionName: session.metadata?.editionName,
        shippingRegion: session.metadata?.shippingRegion,
        coverType: session.metadata?.coverType,
        // From customer details
        customerEmail: session.customer_details?.email || undefined,
        // Generate order number from session ID (last 8 chars, uppercase)
        orderNumber: sessionId.slice(-8).toUpperCase(),
      };

      // Log successful retrieval (without sensitive data)
      console.log('Session details retrieved successfully:', {
        sessionId: sessionId.substring(0, 8) + '...',
        editionId: response.editionId,
        hasCustomerEmail: !!response.customerEmail,
      });

      return NextResponse.json(response);

    } catch (stripeError) {
      // Handle Stripe-specific errors
      console.error('Stripe API error during session retrieval:', {
        error: stripeError,
        sessionId: sessionId.substring(0, 8) + '...',
      });

      // Check for specific error types
      if (stripeError instanceof Error) {
        // Session not found or expired
        if (stripeError.message.includes('No such checkout.session')) {
          return NextResponse.json(
            {
              error: 'Session not found',
              details: 'This checkout session may have expired or is invalid'
            } satisfies SessionError,
            { status: 404 }
          );
        }

        // Authentication error
        if (stripeError.message.includes('authentication') || stripeError.message.includes('API key')) {
          // Return empty details rather than error for auth issues
          return NextResponse.json({} satisfies SessionDetailsResponse);
        }
      }

      // For other Stripe errors, return empty details to avoid breaking the success page
      return NextResponse.json({} satisfies SessionDetailsResponse);
    }

  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error in session retrieval endpoint:', error);

    // Return empty details rather than error to keep success page functional
    return NextResponse.json({} satisfies SessionDetailsResponse);
  }
}

/**
 * OPTIONS handler for CORS preflight requests
 */
export async function OPTIONS(request: Request): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}