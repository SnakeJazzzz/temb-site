# Database Migration Guide

## Orders Table Schema

This document provides instructions for setting up the orders table in your Vercel Postgres database.

## Prerequisites

- Vercel Postgres database provisioned
- `POSTGRES_URL` environment variable configured
- Database client tool (psql, TablePlus, pgAdmin, or Vercel Dashboard)

## Running the Migration

### Option 1: Using Vercel Dashboard

1. Navigate to your project in Vercel Dashboard
2. Go to Storage → Your Postgres Database → Query
3. Copy the contents of `lib/db/schema.sql`
4. Paste and execute in the query editor

### Option 2: Using psql CLI

```bash
# Connect to your database
psql $POSTGRES_URL

# Run the schema file
\i /path/to/project/lib/db/schema.sql
```

### Option 3: Using a Database Migration Tool

If using a migration tool like Prisma or Drizzle, adapt the schema accordingly.

## Schema Overview

The orders table includes:

- **UUID primary key** with auto-generation
- **Automatic timestamps** (created_at, updated_at with trigger)
- **Stripe integration fields** for payment tracking
- **JSONB shipping address** for flexible address storage
- **Comprehensive indexes** for query performance
- **Check constraints** for data integrity

## Indexes Created

1. `idx_orders_customer_email` - Fast customer lookup
2. `idx_orders_status` - Order status filtering
3. `idx_orders_created_at` - Date range queries
4. `idx_orders_edition_id` - Edition filtering
5. `idx_orders_shipping_region` - Region-based queries
6. `idx_orders_status_created` - Combined status and date queries

## TypeScript Integration

Import types from the database module:

```typescript
import {
  Order,
  CreateOrderData,
  UpdateOrderData,
  ORDER_STATUS,
  EDITION_ID,
  SHIPPING_REGION
} from '@/lib/db';

// Example: Create a new order
const newOrder: CreateOrderData = {
  stripe_session_id: 'cs_test_...',
  customer_email: 'customer@example.com',
  customer_name: 'John Doe',
  shipping_address: {
    line1: '123 Main St',
    city: 'New York',
    state: 'NY',
    postal_code: '10001',
    country: 'US'
  },
  edition_id: EDITION_ID.BLACK,
  amount_total: 69900, // $699.00
  shipping_region: SHIPPING_REGION.INTERNATIONAL,
  status: ORDER_STATUS.PAID
};

// Example: Update order status
const updateData: UpdateOrderData = {
  status: ORDER_STATUS.SHIPPED
};
```

## Data Validation

Use the provided type guards for runtime validation:

```typescript
import { isOrderStatus, isShippingAddress } from '@/lib/db';

// Validate status
if (isOrderStatus(statusValue)) {
  // statusValue is typed as OrderStatus
}

// Validate shipping address
if (isShippingAddress(addressData)) {
  // addressData is typed as ShippingAddress
}
```

## Rollback

If needed, you can drop the orders table:

```sql
DROP TABLE IF EXISTS orders CASCADE;
```

## Future Considerations

The schema is designed to support:

- Order history and audit trails
- Multiple payment methods
- Inventory tracking (via foreign keys)
- Customer accounts (via customer_id foreign key)
- Shipping carrier integration
- Order notes and internal comments

These can be added as the application grows.