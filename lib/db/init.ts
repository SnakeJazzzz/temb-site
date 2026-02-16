// lib/db/init.ts
/**
 * Database initialization script for The Electronic Music Book
 * Reads and executes the schema.sql file to set up the database
 * Run with: pnpm db:init
 */

import { sql } from '@vercel/postgres';
import fs from 'fs';
import path from 'path';
//import 'dotenv/config'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

/**
 * Smart SQL statement splitter that handles $$ delimiters
 * PostgreSQL functions use $$ or $tag$ to delimit function bodies
 * We must not split on semicolons inside these delimiters
 */
function splitSqlStatements(sqlText: string): string[] {
  const statements: string[] = [];
  let currentStatement = '';
  let insideDollarQuote = false;
  let dollarTag = '';

  for (let i = 0; i < sqlText.length; i++) {
    const char = sqlText[i];

    // Check for dollar quote start/end ($$  or $tag$)
    if (char === '$') {
      // Look ahead to find the matching dollar sign
      let tag = '$';
      let j = i + 1;

      // Collect characters between dollars (e.g., $body$ would give 'body')
      while (j < sqlText.length && sqlText[j] !== '$') {
        tag += sqlText[j];
        j++;
      }

      if (j < sqlText.length && sqlText[j] === '$') {
        tag += '$'; // Complete the tag (e.g., '$$' or '$body$')

        if (insideDollarQuote) {
          // Check if this closes the current quote
          if (tag === dollarTag) {
            insideDollarQuote = false;
            currentStatement += tag;
            i = j; // Skip past the closing tag
            continue;
          }
        } else {
          // Opening a new dollar quote
          insideDollarQuote = true;
          dollarTag = tag;
          currentStatement += tag;
          i = j; // Skip past the opening tag
          continue;
        }
      }
    }

    // If we hit a semicolon outside dollar quotes, end the statement
    if (char === ';' && !insideDollarQuote) {
      currentStatement += char;
      const trimmed = currentStatement.trim();

      // Filter out empty statements and comment-only lines
      // A statement is valid if it has content and isn't just a comment
      const isCommentOnly = trimmed.split('\n').every(line => {
        const cleaned = line.trim();
        return cleaned.length === 0 || cleaned.startsWith('--');
      });

      if (trimmed.length > 0 && !isCommentOnly) {
        statements.push(trimmed);
      }

      currentStatement = '';
      continue;
    }

    // Add character to current statement
    currentStatement += char;
  }

  // Add any remaining statement
  const trimmed = currentStatement.trim();
  if (trimmed.length > 0) {
    const isCommentOnly = trimmed.split('\n').every(line => {
      const cleaned = line.trim();
      return cleaned.length === 0 || cleaned.startsWith('--');
    });

    if (!isCommentOnly) {
      statements.push(trimmed);
    }
  }

  return statements;
}

/**
 * Initialize the database with the schema
 */
async function initDatabase() {
  console.log('🚀 Starting database initialization...');

  // Check if database is configured
  if (!process.env.POSTGRES_URL) {
    console.error('❌ POSTGRES_URL not configured');
    console.error('Please set the POSTGRES_URL environment variable in your .env.local file');
    console.error('Format: postgres://user:password@host:port/database');
    process.exit(1);
  }

  try {
    // Read the schema file
    const schemaPath = path.join(process.cwd(), 'lib', 'db', 'schema.sql');

    if (!fs.existsSync(schemaPath)) {
      console.error('❌ Schema file not found at:', schemaPath);
      process.exit(1);
    }

    const schema = fs.readFileSync(schemaPath, 'utf-8');
    console.log('📄 Schema file loaded successfully');

    // Split the schema into individual statements
    // This is necessary because @vercel/postgres might not handle multiple statements well
    // We need to handle $$ delimiters specially (used in function definitions)
    const statements = splitSqlStatements(schema);

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      // Skip empty statements
      if (!statement || statement.trim().length === 0) {
        continue;
      }

      // Log progress for longer operations
      if (statement.includes('CREATE TABLE')) {
        console.log('📊 Creating orders table...');
      } else if (statement.includes('CREATE INDEX')) {
        const indexName = statement.match(/CREATE INDEX (\w+)/)?.[1] || 'index';
        console.log(`🔍 Creating index: ${indexName}...`);
      } else if (statement.includes('CREATE TRIGGER')) {
        console.log('⚡ Creating trigger for updated_at...');
      } else if (statement.includes('CREATE OR REPLACE FUNCTION')) {
        console.log('🔧 Creating helper function...');
      } else if (statement.includes('DROP TABLE')) {
        console.log('🗑️ Dropping existing table if exists...');
      }

      try {
        // Execute the statement
        await sql.query(statement + ';');
      } catch (error) {
        // Check if it's a harmless error (like dropping a non-existent table)
        if (error instanceof Error) {
          if (error.message.includes('does not exist') && statement.includes('DROP TABLE IF EXISTS')) {
            console.log('ℹ️  Table does not exist yet (this is expected on first run)');
          } else {
            console.error(`❌ Error executing statement ${i + 1}:`, error.message);
            console.error('Statement:', statement.substring(0, 100) + '...');
            throw error;
          }
        }
      }
    }

    // Verify the table was created
    const tableCheck = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'orders'
      );
    `;

    if (tableCheck.rows[0]?.exists) {
      console.log('✅ Orders table created successfully');

      // Get table info
      const columnCount = await sql`
        SELECT COUNT(*) as count
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'orders';
      `;

      const indexCount = await sql`
        SELECT COUNT(*) as count
        FROM pg_indexes
        WHERE schemaname = 'public'
        AND tablename = 'orders';
      `;

      console.log(`📊 Table structure:`);
      console.log(`   - Columns: ${columnCount.rows[0].count}`);
      console.log(`   - Indexes: ${indexCount.rows[0].count}`);
    } else {
      console.error('❌ Table creation verification failed');
      process.exit(1);
    }

    console.log('✨ Database initialization completed successfully!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Ensure STRIPE_SECRET_KEY is configured for webhook handling');
    console.log('2. Test order creation with the createOrder() function');
    console.log('3. Set up Stripe webhooks to automatically create orders');

    process.exit(0);
  } catch (error) {
    console.error('❌ Database initialization failed:', error);

    if (error instanceof Error) {
      if (error.message.includes('permission denied')) {
        console.error('');
        console.error('Permission error detected. Please ensure your database user has the necessary privileges:');
        console.error('- CREATE TABLE');
        console.error('- CREATE INDEX');
        console.error('- CREATE TRIGGER');
        console.error('- CREATE FUNCTION');
      } else if (error.message.includes('connection')) {
        console.error('');
        console.error('Connection error detected. Please verify:');
        console.error('- POSTGRES_URL is correctly formatted');
        console.error('- Database server is accessible');
        console.error('- Network connection is stable');
      }
    }

    process.exit(1);
  }
}

// Run the initialization
initDatabase().catch(error => {
  console.error('Unexpected error:', error);
  process.exit(1);
});