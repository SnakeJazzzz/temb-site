# Database Module

This module provides order management functionality for The Electronic Music Book e-commerce platform.

## Setup

### Prerequisites

1. Set up a PostgreSQL database (Vercel Postgres recommended)
2. Add the database connection URL to your environment variables:

```bash
# .env.local
POSTGRES_URL=postgres://user:password@host:port/database
```

### Initialize Database

Run the initialization script to create the orders table:

```bash
pnpm db:init
```

This will:
- Create the `orders` table
- Set up necessary indexes
- Create triggers for automatic timestamp updates
- Verify the database setup

## Usage

### Import Functions

```typescript
import {
  createOrder,
  getOrderBySessionId,
  getAllOrders,
  updateOrderStatus,
  getOrdersByStatus,
  getOrderById,
  countOrders,
  deleteOrder
} from '@/lib/db/orders';
```

### Create an Order

```typescript
import type { CreateOrderData } from '@/types/order';

const orderData: CreateOrderData = {
  stripe_session_id: 'cs_test_...',
  stripe_payment_intent_id: 'pi_test_...',
  customer_email: 'customer@example.com',
  customer_name: 'John Doe',
  shipping_address: {
    line1: '123 Main St',
    city: 'New York',
    state: 'NY',
    postal_code: '10001',
    country: 'US'
  },
  edition_id: 'temb-black-edition',
  amount_total: 69900, // in cents
  currency: 'usd',
  shipping_region: 'INTL'
};

const order = await createOrder(orderData);
```

### Retrieve Orders

```typescript
// Get order by Stripe session ID
const order = await getOrderBySessionId('cs_test_...');

// Get order by UUID
const order = await getOrderById('uuid-here');

// Get all orders (newest first)
const orders = await getAllOrders();

// Get orders by status
const paidOrders = await getOrdersByStatus('paid');
const shippedOrders = await getOrdersByStatus('shipped');
```

### Update Order Status

```typescript
// Update order status
const updatedOrder = await updateOrderStatus(orderId, 'shipped');

// Available statuses: 'paid', 'processing', 'shipped', 'delivered', 'cancelled'
```

### Count Orders

```typescript
// Count all orders
const totalOrders = await countOrders();

// Count orders by status
const paidCount = await countOrders('paid');
```

## Graceful Degradation

All functions check for the `POSTGRES_URL` environment variable before attempting database operations. If the variable is not set:

- Functions will throw a descriptive error: "Database not configured. Set POSTGRES_URL environment variable."
- The application will continue to build and run without database functionality
- UI components can detect this and show appropriate "coming soon" messages

## Database Schema

The `orders` table includes:

- `id` (UUID): Primary key
- `created_at`, `updated_at`: Timestamps
- `stripe_session_id`: Unique Stripe session identifier
- `stripe_payment_intent_id`: Optional payment intent ID
- `customer_email`, `customer_name`: Customer information
- `shipping_address`: JSONB field with address details
- `edition_id`: Product identifier
- `amount_total`: Total in cents
- `currency`: ISO 4217 currency code
- `shipping_region`: MX or INTL
- `status`: Order status

## Error Handling

All functions include proper error handling:
- Database configuration checks
- SQL injection prevention via parameterized queries
- Descriptive error messages
- Type-safe returns

## Integration with Stripe Webhooks

When Stripe webhooks are configured, use these functions to:

1. Create orders on successful checkout (`checkout.session.completed`)
2. Update order status based on fulfillment events
3. Track payment intents for refund handling