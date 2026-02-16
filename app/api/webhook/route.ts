/**
 * Stripe Webhook Handler for The Electronic Music Book
 *
 * Processes payment events from Stripe, particularly checkout.session.completed
 * events, and creates order records in the database.
 *
 * Features:
 * - Signature verification when STRIPE_WEBHOOK_SECRET is configured
 * - Graceful degradation for local testing without webhook secret
 * - Database order creation with proper error handling
 * - Comprehensive logging for debugging and monitoring
 *
 * @module app/api/webhook/route
 */

import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe';
import { createOrder } from '@/lib/db/orders';
import type { CreateOrderData, ShippingAddress } from '@/types/order';

// Ensure Node.js runtime for raw body access
export const runtime = 'nodejs';

/**
 * Map Stripe address to our ShippingAddress interface
 * Handles nullable fields and provides default values where needed
 */
function mapStripeAddressToShipping(
  stripeAddress: Stripe.Address | null | undefined
): ShippingAddress {
  if (!stripeAddress) {
    throw new Error('Shipping address is required but was not provided');
  }

  return {
    line1: stripeAddress.line1 || '',
    line2: stripeAddress.line2 || undefined,
    city: stripeAddress.city || '',
    state: stripeAddress.state || '',
    postal_code: stripeAddress.postal_code || '',
    country: stripeAddress.country || '',
  };
}

/**
 * Extract and validate metadata from Stripe session
 * Ensures required fields are present
 */
function validateSessionMetadata(metadata: Stripe.Metadata): {
  editionId: string;
  shippingRegion: string;
} {
  const editionId = metadata.editionId;
  const shippingRegion = metadata.shippingRegion;

  if (!editionId) {
    throw new Error('Missing required metadata: editionId');
  }

  if (!shippingRegion) {
    throw new Error('Missing required metadata: shippingRegion');
  }

  return { editionId, shippingRegion };
}

/**
 * Handle checkout.session.completed event
 * Creates an order in the database with the payment information
 */
async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
): Promise<void> {
  console.log('Processing checkout.session.completed for session:', session.id);

  // Validate required fields
  if (!session.customer_details?.email) {
    throw new Error('Customer email is required but was not provided');
  }

  if (!session.customer_details?.name) {
    throw new Error('Customer name is required but was not provided');
  }

  if (!session.amount_total) {
    throw new Error('Amount total is required but was not provided');
  }

  if (!session.currency) {
    throw new Error('Currency is required but was not provided');
  }

  // Extract and validate metadata
  const { editionId, shippingRegion } = validateSessionMetadata(
    session.metadata || {}
  );

  // Map Stripe session data to CreateOrderData
  const orderData: CreateOrderData = {
    stripe_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id || undefined,
    customer_email: session.customer_details.email,
    customer_name: session.customer_details.name,
    shipping_address: mapStripeAddressToShipping(
      session.customer_details.address
    ),
    edition_id: editionId,
    amount_total: session.amount_total,
    currency: session.currency,
    shipping_region: shippingRegion,
    status: 'paid', // Initial status for completed checkout
  };

  // Attempt to create order in database
  if (!process.env.POSTGRES_URL) {
    console.warn('WARNING: Database not configured. Order will not be saved.');
    console.log('Order data that would have been saved:', orderData);
    return;
  }

  try {
    const order = await createOrder(orderData);
    console.log('Order created successfully:', order.id);

    // Log placeholder for confirmation email
    console.log('TODO: Send confirmation email to', order.customer_email);
    console.log('Order ID:', order.id);
  } catch (error) {
    // Log error but don't throw - we still want to return 200 to Stripe
    console.error('Failed to create order in database:', error);
    console.error('Order data that failed to save:', orderData);

    // In production, you might want to:
    // - Send to a dead letter queue
    // - Trigger an alert to the operations team
    // - Store in a backup location (e.g., cloud storage)
  }
}

/**
 * POST /api/webhook
 *
 * Receives webhook events from Stripe and processes them accordingly.
 * Currently handles:
 * - checkout.session.completed: Creates an order in the database
 *
 * Security:
 * - Verifies webhook signature when STRIPE_WEBHOOK_SECRET is configured
 * - Falls back to processing without verification for local testing
 *
 * Error Handling:
 * - Returns 400 for invalid signatures
 * - Returns 200 even if database operations fail (prevents Stripe retries)
 * - Logs all errors for debugging and monitoring
 */
export async function POST(request: NextRequest) {
  // Get raw body as text for signature verification
  const body = await request.text();
  const signature = headers().get('stripe-signature');

  // Get Stripe client
  const stripe = getStripeClient();

  if (!stripe) {
    console.error('ERROR: Stripe is not configured. Cannot process webhook.');
    return NextResponse.json(
      { error: 'Payment system not configured' },
      { status: 503 }
    );
  }

  let event: Stripe.Event;

  // Attempt signature verification if webhook secret is configured
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (webhookSecret) {
    if (!signature) {
      console.error('ERROR: Missing stripe-signature header');
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        webhookSecret
      );
      console.log('Webhook signature verified successfully');
    } catch (err) {
      const error = err as Error;
      console.error('Webhook signature verification failed:', error.message);
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      );
    }
  } else {
    // No webhook secret - parse event without verification (local testing only)
    console.warn(
      'WARNING: STRIPE_WEBHOOK_SECRET not configured. ' +
      'Skipping signature verification (local testing only).'
    );

    try {
      event = JSON.parse(body) as Stripe.Event;
    } catch (err) {
      console.error('Failed to parse webhook body:', err);
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
  }

  // Log received event
  console.log(`Received webhook event: ${event.type} (${event.id})`);

  // Handle different event types
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }

      case 'payment_intent.succeeded':
        // Log for monitoring but don't process
        // Order is created on checkout.session.completed
        console.log('Payment intent succeeded:', event.data.object);
        break;

      case 'payment_intent.payment_failed':
        // Log payment failures for monitoring
        console.error('Payment failed:', event.data.object);
        break;

      default:
        // Log unhandled events for visibility
        console.log(`Unhandled event type: ${event.type}`);
    }
  } catch (error) {
    // Log error but still return 200 to prevent Stripe retries
    console.error(`Error processing ${event.type}:`, error);

    // In production, send to monitoring/alerting system
    // This is a critical error that needs investigation
  }

  // Always return 200 to acknowledge receipt
  // This prevents Stripe from retrying the webhook
  return NextResponse.json({ received: true }, { status: 200 });
}

/**
 * Other HTTP methods are not supported for this endpoint
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed. This endpoint only accepts POST requests.' },
    { status: 405 }
  );
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed. This endpoint only accepts POST requests.' },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed. This endpoint only accepts POST requests.' },
    { status: 405 }
  );
}