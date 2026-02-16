// lib/db/orders.ts
/**
 * Database helper functions for order management
 * Uses @vercel/postgres for database operations
 * Includes graceful degradation when database is not configured
 */

import { sql } from '@vercel/postgres';
import type { Order, CreateOrderData, OrderStatus, ShippingAddress } from './types';

/**
 * Check if database is configured
 */
function assertDatabaseConfigured(): void {
  if (!process.env.POSTGRES_URL) {
    throw new Error('Database not configured. Set POSTGRES_URL environment variable.');
  }
}

/**
 * Parse shipping address from JSONB
 */
function parseShippingAddress(jsonb: any): ShippingAddress {
  if (typeof jsonb === 'string') {
    return JSON.parse(jsonb);
  }
  return jsonb;
}

/**
 * Create a new order in the database
 * @param data Order data to insert
 * @returns The created order object
 * @throws Error if database is not configured or insert fails
 */
export async function createOrder(data: CreateOrderData): Promise<Order> {
  assertDatabaseConfigured();

  try {
    const result = await sql<Order>`
      INSERT INTO orders (
        stripe_session_id,
        stripe_payment_intent_id,
        customer_email,
        customer_name,
        shipping_address,
        edition_id,
        amount_total,
        currency,
        shipping_region,
        status
      ) VALUES (
        ${data.stripe_session_id},
        ${data.stripe_payment_intent_id || null},
        ${data.customer_email},
        ${data.customer_name},
        ${JSON.stringify(data.shipping_address)}::jsonb,
        ${data.edition_id},
        ${data.amount_total},
        ${data.currency},
        ${data.shipping_region},
        ${data.status || 'paid'}
      )
      RETURNING
        id,
        created_at,
        updated_at,
        stripe_session_id,
        stripe_payment_intent_id,
        customer_email,
        customer_name,
        shipping_address,
        edition_id,
        amount_total,
        currency,
        shipping_region,
        status
    `;

    if (result.rows.length === 0) {
      throw new Error('Failed to create order');
    }

    const order = result.rows[0];
    return {
      ...order,
      shipping_address: parseShippingAddress(order.shipping_address),
    };
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error(`Failed to create order: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get an order by Stripe session ID
 * @param sessionId Stripe Checkout Session ID
 * @returns Order object or null if not found
 * @throws Error if database is not configured
 */
export async function getOrderBySessionId(sessionId: string): Promise<Order | null> {
  assertDatabaseConfigured();

  try {
    const result = await sql<Order>`
      SELECT
        id,
        created_at,
        updated_at,
        stripe_session_id,
        stripe_payment_intent_id,
        customer_email,
        customer_name,
        shipping_address,
        edition_id,
        amount_total,
        currency,
        shipping_region,
        status
      FROM orders
      WHERE stripe_session_id = ${sessionId}
      LIMIT 1
    `;

    if (result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];
    return {
      ...order,
      shipping_address: parseShippingAddress(order.shipping_address),
    };
  } catch (error) {
    console.error('Error fetching order by session ID:', error);
    throw new Error(`Failed to fetch order: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all orders (for admin use)
 * @returns Array of all orders, newest first
 * @throws Error if database is not configured
 */
export async function getAllOrders(): Promise<Order[]> {
  assertDatabaseConfigured();

  try {
    const result = await sql<Order>`
      SELECT
        id,
        created_at,
        updated_at,
        stripe_session_id,
        stripe_payment_intent_id,
        customer_email,
        customer_name,
        shipping_address,
        edition_id,
        amount_total,
        currency,
        shipping_region,
        status
      FROM orders
      ORDER BY created_at DESC
    `;

    return result.rows.map(order => ({
      ...order,
      shipping_address: parseShippingAddress(order.shipping_address),
    }));
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw new Error(`Failed to fetch orders: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Update the status of an order
 * @param id Order UUID
 * @param status New order status
 * @returns Updated order object
 * @throws Error if database is not configured or update fails
 */
export async function updateOrderStatus(id: string, status: OrderStatus): Promise<Order> {
  assertDatabaseConfigured();

  try {
    const result = await sql<Order>`
      UPDATE orders
      SET
        status = ${status},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING
        id,
        created_at,
        updated_at,
        stripe_session_id,
        stripe_payment_intent_id,
        customer_email,
        customer_name,
        shipping_address,
        edition_id,
        amount_total,
        currency,
        shipping_region,
        status
    `;

    if (result.rows.length === 0) {
      throw new Error(`Order with ID ${id} not found`);
    }

    const order = result.rows[0];
    return {
      ...order,
      shipping_address: parseShippingAddress(order.shipping_address),
    };
  } catch (error) {
    console.error('Error updating order status:', error);
    throw new Error(`Failed to update order status: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get orders filtered by status
 * @param status Order status to filter by
 * @returns Array of orders with the specified status, newest first
 * @throws Error if database is not configured
 */
export async function getOrdersByStatus(status: OrderStatus): Promise<Order[]> {
  assertDatabaseConfigured();

  try {
    const result = await sql<Order>`
      SELECT
        id,
        created_at,
        updated_at,
        stripe_session_id,
        stripe_payment_intent_id,
        customer_email,
        customer_name,
        shipping_address,
        edition_id,
        amount_total,
        currency,
        shipping_region,
        status
      FROM orders
      WHERE status = ${status}
      ORDER BY created_at DESC
    `;

    return result.rows.map(order => ({
      ...order,
      shipping_address: parseShippingAddress(order.shipping_address),
    }));
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    throw new Error(`Failed to fetch orders: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get order by ID
 * @param id Order UUID
 * @returns Order object or null if not found
 * @throws Error if database is not configured
 */
export async function getOrderById(id: string): Promise<Order | null> {
  assertDatabaseConfigured();

  try {
    const result = await sql<Order>`
      SELECT
        id,
        created_at,
        updated_at,
        stripe_session_id,
        stripe_payment_intent_id,
        customer_email,
        customer_name,
        shipping_address,
        edition_id,
        amount_total,
        currency,
        shipping_region,
        status
      FROM orders
      WHERE id = ${id}
      LIMIT 1
    `;

    if (result.rows.length === 0) {
      return null;
    }

    const order = result.rows[0];
    return {
      ...order,
      shipping_address: parseShippingAddress(order.shipping_address),
    };
  } catch (error) {
    console.error('Error fetching order by ID:', error);
    throw new Error(`Failed to fetch order: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Count orders by status
 * @param status Optional status filter
 * @returns Number of orders
 * @throws Error if database is not configured
 */
export async function countOrders(status?: OrderStatus): Promise<number> {
  assertDatabaseConfigured();

  try {
    let result;
    if (status) {
      result = await sql`
        SELECT COUNT(*) as count
        FROM orders
        WHERE status = ${status}
      `;
    } else {
      result = await sql`
        SELECT COUNT(*) as count
        FROM orders
      `;
    }

    return parseInt(result.rows[0].count as string, 10);
  } catch (error) {
    console.error('Error counting orders:', error);
    throw new Error(`Failed to count orders: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Delete an order (use with caution)
 * @param id Order UUID to delete
 * @returns true if deleted, false if not found
 * @throws Error if database is not configured
 */
export async function deleteOrder(id: string): Promise<boolean> {
  assertDatabaseConfigured();

  try {
    const result = await sql`
      DELETE FROM orders
      WHERE id = ${id}
      RETURNING id
    `;

    return result.rows.length > 0;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error(`Failed to delete order: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}