// app/api/admin/orders/route.ts
/**
 * Admin API routes for order management
 * GET: List all orders
 * POST: Create manual order (admin-created)
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin-middleware';
import { getAllOrders, createManualOrder } from '@/lib/db/orders';
import { isEditionId, isShippingRegion, isShippingAddress } from '@/lib/db/types';
import type { EditionId, ShippingRegion, ShippingAddress } from '@/lib/db/types';

/**
 * GET /api/admin/orders
 * List all orders in the system
 * Requires: Authentication (admin or subadmin)
 */
export async function GET(request: NextRequest) {
  console.log('[GET /api/admin/orders] Request received');

  try {
    // Verify authentication
    const { role } = await requireAuth(request);
    console.log('[GET /api/admin/orders] Auth successful, role:', role);

    // Get all orders from database
    const orders = await getAllOrders();
    console.log('[GET /api/admin/orders] Fetched', orders.length, 'orders');

    // For subadmin, we could filter out commission data here
    // For now, returning full orders as specified
    if (role === 'subadmin') {
      // TODO: Filter commission/fee data for subadmin users
      // Currently returning full order data
    }

    // IMPORTANT: The frontend expects {orders: Order[]} not Order[]
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('[GET /api/admin/orders] Error:', error);
    // If it's already a NextResponse (from middleware), return it directly
    if (error instanceof NextResponse) {
      return error;
    }

    // Database or other errors
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/admin/orders
 * Create a manual order (admin-created order)
 * Requires: Authentication (admin or subadmin)
 */
export async function POST(request: NextRequest) {
  console.log('[POST /api/admin/orders] Request received');

  try {
    // Verify authentication
    const { role } = await requireAuth(request);
    console.log('[POST /api/admin/orders] Auth successful, role:', role);

    // Parse request body
    const body = await request.json();
    console.log('[POST /api/admin/orders] Received body:', JSON.stringify(body, null, 2));

    // Validate required fields
    const errors: string[] = [];

    // Customer information
    if (!body.customerName || typeof body.customerName !== 'string') {
      errors.push('customerName is required and must be a string');
    }
    if (!body.customerEmail || typeof body.customerEmail !== 'string') {
      errors.push('customerEmail is required and must be a string');
    }
    // customerPhone is optional

    // Edition validation
    if (!body.editionId) {
      errors.push('editionId is required');
    } else if (!isEditionId(body.editionId)) {
      errors.push('editionId must be "temb-black-edition" or "temb-white-edition"');
    }

    // Quantity and price validation
    if (typeof body.quantity !== 'number' || body.quantity < 1) {
      errors.push('quantity must be a positive number');
    }
    if (typeof body.unitPrice !== 'number' || body.unitPrice < 0) {
      errors.push('unitPrice must be a non-negative number (in cents)');
    }

    // Shipping region validation
    if (!body.shippingRegion) {
      errors.push('shippingRegion is required');
    } else if (!isShippingRegion(body.shippingRegion)) {
      errors.push('shippingRegion must be "MX" or "INTL"');
    }

    // Shipping address validation
    if (!body.shippingAddress) {
      errors.push('shippingAddress is required');
    } else if (!isShippingAddress(body.shippingAddress)) {
      errors.push('shippingAddress must have line1, city, postal_code, and country (2-letter code)');
    }

    // Return validation errors if any
    if (errors.length > 0) {
      return NextResponse.json(
        { error: 'Validation failed', details: errors },
        { status: 400 }
      );
    }

    // Calculate total amount
    const amountTotal = body.quantity * body.unitPrice;

    // Create the manual order
    // Note: customer_phone is not stored in the database, but could be added to notes
    const orderNotes = body.notes || '';
    const phoneNote = body.customerPhone ? `Phone: ${body.customerPhone}` : '';
    const finalNotes = [orderNotes, phoneNote].filter(Boolean).join('\n').trim() || null;

    const order = await createManualOrder({
      customer_email: body.customerEmail,
      customer_name: body.customerName,
      shipping_address: body.shippingAddress as ShippingAddress,
      edition_id: body.editionId as EditionId,
      amount_total: amountTotal,
      currency: 'usd',
      shipping_region: body.shippingRegion as ShippingRegion,
      status: 'paid',
      quantity: body.quantity,
      notes: finalNotes,
      stripe_payment_intent_id: null,
    });

    console.log(`Manual order created: ${order.id}`);

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    // If it's already a NextResponse (from middleware), return it directly
    if (error instanceof NextResponse) {
      return error;
    }

    // Database or other errors
    console.error('Error creating manual order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}