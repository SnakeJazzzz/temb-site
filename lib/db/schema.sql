-- The Electronic Music Book - Orders Table Schema
-- This schema defines the orders table for tracking book purchases
-- Database: PostgreSQL (Vercel Postgres)
-- Created: 2024-02-15

-- Drop existing table if it exists (for idempotent migrations)
DROP TABLE IF EXISTS orders CASCADE;

-- Create orders table
CREATE TABLE orders (
    -- Primary key using UUID for distributed systems compatibility
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Timestamp fields for tracking order lifecycle
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    -- Stripe integration fields
    stripe_session_id TEXT UNIQUE NOT NULL, -- Unique identifier from Stripe Checkout Session
    stripe_payment_intent_id TEXT, -- Payment intent ID for tracking payment status

    -- Customer information
    customer_email TEXT NOT NULL, -- Customer's email address for order confirmation
    customer_name TEXT NOT NULL, -- Customer's full name for shipping

    -- Shipping details stored as JSONB for flexibility
    -- Expected structure: {
    --   "line1": "123 Main St",
    --   "line2": "Apt 4B",
    --   "city": "New York",
    --   "state": "NY",
    --   "postal_code": "10001",
    --   "country": "US"
    -- }
    shipping_address JSONB NOT NULL,

    -- Product information
    edition_id TEXT NOT NULL, -- References either 'temb-black-edition' or 'temb-white-edition'

    -- Financial information
    amount_total INTEGER NOT NULL, -- Total amount in cents (e.g., 69900 for $699.00)
    currency TEXT NOT NULL DEFAULT 'usd', -- ISO 4217 currency code

    -- Shipping configuration
    shipping_region TEXT NOT NULL, -- Either 'MX' for Mexico or 'INTL' for International

    -- Order status tracking
    -- Possible values: 'paid', 'processing', 'shipped', 'delivered', 'cancelled'
    status TEXT NOT NULL DEFAULT 'paid'
        CHECK (status IN ('paid', 'processing', 'shipped', 'delivered', 'cancelled'))
);

-- Create indexes for query performance
-- Unique index on stripe_session_id (already enforced by UNIQUE constraint)
CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_edition_id ON orders(edition_id);
CREATE INDEX idx_orders_shipping_region ON orders(shipping_region);

-- Composite index for common query patterns
CREATE INDEX idx_orders_status_created ON orders(status, created_at DESC);

-- Add trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add table comments for documentation
COMMENT ON TABLE orders IS 'Stores all book orders from The Electronic Music Book store';
COMMENT ON COLUMN orders.id IS 'Unique order identifier (UUID)';
COMMENT ON COLUMN orders.stripe_session_id IS 'Stripe Checkout Session ID - unique identifier for the payment session';
COMMENT ON COLUMN orders.stripe_payment_intent_id IS 'Stripe Payment Intent ID - used for payment tracking and refunds';
COMMENT ON COLUMN orders.customer_email IS 'Customer email for order confirmations and communications';
COMMENT ON COLUMN orders.customer_name IS 'Customer full name for shipping label';
COMMENT ON COLUMN orders.shipping_address IS 'Complete shipping address in JSON format';
COMMENT ON COLUMN orders.edition_id IS 'Book edition identifier (temb-black-edition or temb-white-edition)';
COMMENT ON COLUMN orders.amount_total IS 'Total order amount in smallest currency unit (cents)';
COMMENT ON COLUMN orders.currency IS 'ISO 4217 currency code (default: usd)';
COMMENT ON COLUMN orders.shipping_region IS 'Shipping region code (MX for Mexico, INTL for International)';
COMMENT ON COLUMN orders.status IS 'Current order status in fulfillment pipeline';
COMMENT ON COLUMN orders.created_at IS 'Order creation timestamp';
COMMENT ON COLUMN orders.updated_at IS 'Last modification timestamp';