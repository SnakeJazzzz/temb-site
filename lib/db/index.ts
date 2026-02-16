/**
 * Database module exports
 * Central export point for all database-related types and utilities
 * @module lib/db
 */

// Export all types from the types module
export * from './types';

// Re-export commonly used types with shorter aliases
export type {
  Order,
  CreateOrderData,
  UpdateOrderData,
  ShippingAddress,
  OrderStatus,
  EditionId,
  ShippingRegion,
  Currency,
  OrderFilters,
  OrderPagination,
  OrderListResponse
} from './types';

// Re-export constants for easy access
export {
  ORDER_STATUS,
  EDITION_ID,
  SHIPPING_REGION,
  CURRENCY,
  isOrderStatus,
  isEditionId,
  isShippingRegion,
  isCurrency,
  isShippingAddress
} from './types';