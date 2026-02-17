// lib/db/migrate-manual-orders.ts
/**
 * Migration script for Phase 3E - Manual Order Support
 * Adds new columns to existing orders table without dropping data
 * Run with: pnpm db:migrate
 */

import dotenv from 'dotenv';
import { sql } from '@vercel/postgres';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

async function runMigration() {
  // Check if database is configured
  if (!process.env.POSTGRES_URL) {
    console.error('❌ Database not configured. Set POSTGRES_URL in .env.local');
    process.exit(1);
  }

  console.log('🚀 Starting Phase 3E migration: Adding manual order support columns...');

  try {
    // Add source column with default value 'stripe'
    console.log('📝 Adding source column...');
    await sql`
      ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'stripe'
    `;
    console.log('✅ Source column added successfully');

    // Add notes column (nullable)
    console.log('📝 Adding notes column...');
    await sql`
      ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS notes TEXT
    `;
    console.log('✅ Notes column added successfully');

    // Add quantity column with default value 1
    console.log('📝 Adding quantity column...');
    await sql`
      ALTER TABLE orders
      ADD COLUMN IF NOT EXISTS quantity INTEGER NOT NULL DEFAULT 1
    `;
    console.log('✅ Quantity column added successfully');

    // Add constraint for source values
    console.log('📝 Adding source constraint...');

    // First, check if constraint already exists
    const constraintExists = await sql`
      SELECT constraint_name
      FROM information_schema.constraint_column_usage
      WHERE constraint_name = 'orders_source_check'
    `;

    if (constraintExists.rows.length === 0) {
      await sql`
        ALTER TABLE orders
        ADD CONSTRAINT orders_source_check
        CHECK (source IN ('stripe', 'manual'))
      `;
      console.log('✅ Source constraint added successfully');
    } else {
      console.log('ℹ️  Source constraint already exists, skipping...');
    }

    // Verify the migration by checking column existence
    console.log('\n🔍 Verifying migration...');
    const columnsCheck = await sql`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns
      WHERE table_name = 'orders'
      AND column_name IN ('source', 'notes', 'quantity')
      ORDER BY column_name
    `;

    console.log('📊 New columns in orders table:');
    columnsCheck.rows.forEach(col => {
      console.log(`  - ${col.column_name}: ${col.data_type} (nullable: ${col.is_nullable}, default: ${col.column_default || 'none'})`);
    });

    // Check existing orders to confirm they have default values
    const sampleOrder = await sql`
      SELECT id, source, quantity, notes
      FROM orders
      LIMIT 1
    `;

    if (sampleOrder.rows.length > 0) {
      console.log('\n📦 Sample order after migration:');
      console.log(`  - ID: ${sampleOrder.rows[0].id}`);
      console.log(`  - Source: ${sampleOrder.rows[0].source}`);
      console.log(`  - Quantity: ${sampleOrder.rows[0].quantity}`);
      console.log(`  - Notes: ${sampleOrder.rows[0].notes || '(null)'}`);
    }

    console.log('\n✨ Migration completed successfully!');
    console.log('📌 Existing orders now have:');
    console.log('  - source = "stripe" (default)');
    console.log('  - quantity = 1 (default)');
    console.log('  - notes = null');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Migration failed:', error);
    console.error('Please check your database connection and try again.');
    process.exit(1);
  }
}

// Run the migration
runMigration().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});