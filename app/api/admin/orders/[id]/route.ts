// app/api/admin/orders/[id]/route.ts
/**
 * Admin API routes for individual order management
 * PATCH: Update order status
 * DELETE: Delete order (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, requireAdmin } from '@/lib/admin-middleware';
import { updateOrderStatus, deleteOrder, getOrderById } from '@/lib/db/orders';
import { isOrderStatus } from '@/lib/db/types';
import type { OrderStatus } from '@/lib/db/types';

/**
 * PATCH /api/admin/orders/[id]
 * Update order status
 * Requires: Authentication (admin or subadmin)
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify authentication (any role can update status)
    const { role } = await requireAuth(request);
    const orderId = params.id;
    console.log(`Admin API: Updating order ${orderId} status by ${role}`);

    // Parse request body
    const body = await request.json();

    // Validate status field
    if (!body.status) {
      return NextResponse.json(
        { error: 'status field is required' },
        { status: 400 }
      );
    }

    if (!isOrderStatus(body.status)) {
      return NextResponse.json(
        {
          error: 'Invalid status value',
          details: 'status must be one of: paid, processing, shipped, delivered, cancelled'
        },
        { status: 400 }
      );
    }

    // Check if order exists first
    const existingOrder = await getOrderById(orderId);
    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update the order status
    const updatedOrder = await updateOrderStatus(orderId, body.status as OrderStatus);

    console.log(`Order ${orderId} status updated to ${body.status}`);
    return NextResponse.json(updatedOrder);
  } catch (error) {
    // If it's already a NextResponse (from middleware), return it directly
    if (error instanceof NextResponse) {
      return error;
    }

    // Check for specific error messages
    if (error instanceof Error) {
      if (error.message.includes('not found')) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
    }

    // Database or other errors
    console.error('Error updating order status:', error);
    return NextResponse.json(
      { error: 'Failed to update order status' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin/orders/[id]
 * Delete an order from the database
 * Requires: Admin role ONLY
 * Requires: X-Confirm-Delete: true header
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verify admin role (not subadmin)
    await requireAdmin(request);
    const orderId = params.id;
    console.log(`Admin API: Attempting to delete order ${orderId}`);

    // Check for confirmation header
    const confirmHeader = request.headers.get('X-Confirm-Delete');
    if (confirmHeader !== 'true') {
      return NextResponse.json(
        {
          error: 'Missing confirmation header. Set X-Confirm-Delete: true'
        },
        { status: 400 }
      );
    }

    // Check if order exists first
    const existingOrder = await getOrderById(orderId);
    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Delete the order
    const deleted = await deleteOrder(orderId);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    console.log(`Order ${orderId} deleted successfully`);
    return NextResponse.json(
      {
        message: 'Order deleted successfully',
        orderId: orderId
      },
      { status: 200 }
    );
  } catch (error) {
    // If it's already a NextResponse (from middleware), return it directly
    if (error instanceof NextResponse) {
      return error;
    }

    // Database or other errors
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: 'Failed to delete order' },
      { status: 500 }
    );
  }
}