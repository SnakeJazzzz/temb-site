/**
 * Database type definitions for The Electronic Music Book orders system
 * These types provide strict TypeScript interfaces for all database operations
 * @module lib/db/types
 */

/**
 * Order status enum defining all possible states in the fulfillment pipeline
 */
export const ORDER_STATUS = {
  PAID: 'paid',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
} as const;

/**
 * Type-safe order status values
 */
export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];

/**
 * Book edition identifiers
 */
export const EDITION_ID = {
  BLACK: 'temb-black-edition',
  WHITE: 'temb-white-edition'
} as const;

/**
 * Type-safe edition ID values
 */
export type EditionId = typeof EDITION_ID[keyof typeof EDITION_ID];

/**
 * Shipping region codes
 */
export const SHIPPING_REGION = {
  MEXICO: 'MX',
  INTERNATIONAL: 'INTL'
} as const;

/**
 * Type-safe shipping region values
 */
export type ShippingRegion = typeof SHIPPING_REGION[keyof typeof SHIPPING_REGION];

/**
 * Currency codes supported by the system
 */
export const CURRENCY = {
  USD: 'usd',
  EUR: 'eur',
  GBP: 'gbp'
} as const;

/**
 * Type-safe currency values
 */
export type Currency = typeof CURRENCY[keyof typeof CURRENCY];

/**
 * Shipping address structure stored in JSONB column
 * @interface ShippingAddress
 */
export interface ShippingAddress {
  /** Street address line 1 (required) */
  line1: string;

  /** Street address line 2 (apartment, suite, etc.) */
  line2?: string;

  /** City name */
  city: string;

  /** State or province code (e.g., 'NY', 'CA') */
  state?: string;

  /** Postal or ZIP code */
  postal_code: string;

  /** ISO 3166-1 alpha-2 country code (e.g., 'US', 'MX', 'GB') */
  country: string;

  /** Additional delivery instructions */
  delivery_instructions?: string;
}

/**
 * Complete Order record as stored in the database
 * Matches the PostgreSQL orders table schema exactly
 * @interface Order
 */
export interface Order {
  /** Unique order identifier (UUID) */
  id: string;

  /** Order creation timestamp */
  created_at: Date;

  /** Last update timestamp */
  updated_at: Date;

  /** Stripe Checkout Session ID - unique payment session identifier */
  stripe_session_id: string;

  /** Stripe Payment Intent ID - for payment tracking and refunds */
  stripe_payment_intent_id: string | null;

  /** Customer's email address for communications */
  customer_email: string;

  /** Customer's full name for shipping */
  customer_name: string;

  /** Complete shipping address */
  shipping_address: ShippingAddress;

  /** Book edition identifier */
  edition_id: EditionId;

  /** Total amount in smallest currency unit (cents) */
  amount_total: number;

  /** ISO 4217 currency code */
  currency: Currency;

  /** Shipping region code */
  shipping_region: ShippingRegion;

  /** Current order status in fulfillment pipeline */
  status: OrderStatus;

  /** Order source - 'stripe' for regular checkout, 'manual' for admin-created orders */
  source: 'stripe' | 'manual';

  /** Optional notes for manual orders or special instructions */
  notes: string | null;

  /** Order quantity - number of items ordered */
  quantity: number;
}

/**
 * Data required to create a new order
 * Omits auto-generated fields (id, created_at, updated_at)
 * @interface CreateOrderData
 */
export interface CreateOrderData {
  /** Stripe Checkout Session ID */
  stripe_session_id: string;

  /** Optional Stripe Payment Intent ID */
  stripe_payment_intent_id?: string | null;

  /** Customer's email address */
  customer_email: string;

  /** Customer's full name */
  customer_name: string;

  /** Complete shipping address */
  shipping_address: ShippingAddress;

  /** Book edition being purchased */
  edition_id: EditionId;

  /** Total amount in cents */
  amount_total: number;

  /** Currency code (defaults to 'usd' if not specified) */
  currency?: Currency;

  /** Shipping region */
  shipping_region: ShippingRegion;

  /** Initial order status (defaults to 'paid' if not specified) */
  status?: OrderStatus;

  /** Order source (defaults to 'stripe' if not specified) */
  source?: 'stripe' | 'manual';

  /** Optional notes for the order */
  notes?: string | null;

  /** Order quantity (defaults to 1 if not specified) */
  quantity?: number;
}

/**
 * Data for updating an existing order
 * All fields are optional except for identification
 * @interface UpdateOrderData
 */
export interface UpdateOrderData {
  /** Optional: Update payment intent ID */
  stripe_payment_intent_id?: string | null;

  /** Optional: Update customer email */
  customer_email?: string;

  /** Optional: Update customer name */
  customer_name?: string;

  /** Optional: Update shipping address */
  shipping_address?: ShippingAddress;

  /** Optional: Update order status */
  status?: OrderStatus;

  /** Note: updated_at is automatically updated via database trigger */
}

/**
 * Order query filters for listing and searching orders
 * @interface OrderFilters
 */
export interface OrderFilters {
  /** Filter by customer email */
  customer_email?: string;

  /** Filter by order status */
  status?: OrderStatus;

  /** Filter by edition */
  edition_id?: EditionId;

  /** Filter by shipping region */
  shipping_region?: ShippingRegion;

  /** Filter by date range - orders created after this date */
  created_after?: Date;

  /** Filter by date range - orders created before this date */
  created_before?: Date;

  /** Filter by Stripe session ID */
  stripe_session_id?: string;

  /** Filter by Stripe payment intent ID */
  stripe_payment_intent_id?: string;
}

/**
 * Pagination parameters for order queries
 * @interface OrderPagination
 */
export interface OrderPagination {
  /** Number of records to return (default: 50, max: 100) */
  limit?: number;

  /** Number of records to skip */
  offset?: number;

  /** Sort field */
  sort_by?: 'created_at' | 'updated_at' | 'amount_total' | 'status';

  /** Sort direction */
  sort_direction?: 'asc' | 'desc';
}

/**
 * Order list response with pagination metadata
 * @interface OrderListResponse
 */
export interface OrderListResponse {
  /** Array of orders */
  orders: Order[];

  /** Total number of orders matching filters */
  total_count: number;

  /** Number of records returned */
  limit: number;

  /** Number of records skipped */
  offset: number;

  /** Whether there are more pages */
  has_more: boolean;
}

/**
 * Type guard to check if a value is a valid OrderStatus
 * @param value - Value to check
 * @returns True if value is a valid OrderStatus
 */
export function isOrderStatus(value: unknown): value is OrderStatus {
  return typeof value === 'string' &&
    Object.values(ORDER_STATUS).includes(value as OrderStatus);
}

/**
 * Type guard to check if a value is a valid EditionId
 * @param value - Value to check
 * @returns True if value is a valid EditionId
 */
export function isEditionId(value: unknown): value is EditionId {
  return typeof value === 'string' &&
    Object.values(EDITION_ID).includes(value as EditionId);
}

/**
 * Type guard to check if a value is a valid ShippingRegion
 * @param value - Value to check
 * @returns True if value is a valid ShippingRegion
 */
export function isShippingRegion(value: unknown): value is ShippingRegion {
  return typeof value === 'string' &&
    Object.values(SHIPPING_REGION).includes(value as ShippingRegion);
}

/**
 * Type guard to check if a value is a valid Currency
 * @param value - Value to check
 * @returns True if value is a valid Currency
 */
export function isCurrency(value: unknown): value is Currency {
  return typeof value === 'string' &&
    Object.values(CURRENCY).includes(value as Currency);
}

/**
 * Type guard to validate ShippingAddress structure
 * @param value - Value to check
 * @returns True if value is a valid ShippingAddress
 */
export function isShippingAddress(value: unknown): value is ShippingAddress {
  if (!value || typeof value !== 'object') return false;

  const addr = value as Record<string, unknown>;

  return (
    typeof addr.line1 === 'string' && addr.line1.length > 0 &&
    (addr.line2 === undefined || typeof addr.line2 === 'string') &&
    typeof addr.city === 'string' && addr.city.length > 0 &&
    (addr.state === undefined || typeof addr.state === 'string') &&
    typeof addr.postal_code === 'string' && addr.postal_code.length > 0 &&
    typeof addr.country === 'string' && addr.country.length === 2 &&
    (addr.delivery_instructions === undefined || typeof addr.delivery_instructions === 'string')
  );
}

/**
 * Export all types for external consumption
 */
export type {
  Order as DatabaseOrder,
  CreateOrderData as DatabaseCreateOrder,
  UpdateOrderData as DatabaseUpdateOrder
};