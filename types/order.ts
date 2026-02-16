// types/order.ts
/**
 * TypeScript interfaces for order management
 * These types define the structure of orders in our database
 */

/**
 * Order status enum
 */
export type OrderStatus = 'paid' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

/**
 * Shipping address structure
 */
export interface ShippingAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

/**
 * Complete order record from database
 */
export interface Order {
  /** UUID primary key */
  id: string;
  /** Order creation timestamp */
  created_at: Date;
  /** Last update timestamp */
  updated_at: Date;
  /** Stripe Checkout Session ID */
  stripe_session_id: string;
  /** Stripe Payment Intent ID (optional) */
  stripe_payment_intent_id?: string | null;
  /** Customer's email address */
  customer_email: string;
  /** Customer's full name */
  customer_name: string;
  /** Shipping address details */
  shipping_address: ShippingAddress;
  /** Edition identifier */
  edition_id: string;
  /** Total amount in cents */
  amount_total: number;
  /** Currency code (ISO 4217) */
  currency: string;
  /** Shipping region (MX or INTL) */
  shipping_region: string;
  /** Current order status */
  status: OrderStatus;
}

/**
 * Data required to create a new order
 */
export interface CreateOrderData {
  /** Stripe Checkout Session ID */
  stripe_session_id: string;
  /** Stripe Payment Intent ID (optional) */
  stripe_payment_intent_id?: string;
  /** Customer's email address */
  customer_email: string;
  /** Customer's full name */
  customer_name: string;
  /** Shipping address details */
  shipping_address: ShippingAddress;
  /** Edition identifier */
  edition_id: string;
  /** Total amount in cents */
  amount_total: number;
  /** Currency code (ISO 4217) */
  currency: string;
  /** Shipping region (MX or INTL) */
  shipping_region: string;
  /** Initial order status (defaults to 'paid') */
  status?: OrderStatus;
}

/**
 * Type guard to check if value is a valid OrderStatus
 */
export function isValidOrderStatus(value: string): value is OrderStatus {
  return ['paid', 'processing', 'shipped', 'delivered', 'cancelled'].includes(value);
}

/**
 * Type guard to check if object is a ShippingAddress
 */
export function isShippingAddress(obj: any): obj is ShippingAddress {
  return (
    obj &&
    typeof obj === 'object' &&
    typeof obj.line1 === 'string' &&
    typeof obj.city === 'string' &&
    typeof obj.state === 'string' &&
    typeof obj.postal_code === 'string' &&
    typeof obj.country === 'string'
  );
}