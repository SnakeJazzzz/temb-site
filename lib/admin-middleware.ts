// lib/admin-middleware.ts
/**
 * Admin middleware for API route protection
 * Provides authentication and authorization checks for admin endpoints
 */

import { NextResponse } from 'next/server';
import { getSession } from './admin-auth';
import type { AdminRole } from './admin-auth';

/**
 * Require authentication for any admin role
 * @param request The incoming request
 * @returns Promise with role if authenticated
 * @throws NextResponse with 401 if not authenticated
 */
export async function requireAuth(
  request: Request
): Promise<{ role: AdminRole }> {
  const session = await getSession(request);

  if (!session.authenticated || !session.role) {
    throw NextResponse.json(
      { error: 'Unauthorized - Please log in' },
      { status: 401 }
    );
  }

  return { role: session.role };
}

/**
 * Require admin role specifically
 * @param request The incoming request
 * @returns Promise with admin role
 * @throws NextResponse with 401 if not authenticated
 * @throws NextResponse with 403 if not admin
 */
export async function requireAdmin(
  request: Request
): Promise<{ role: 'admin' }> {
  const auth = await requireAuth(request);

  if (auth.role !== 'admin') {
    throw NextResponse.json(
      { error: 'Forbidden - Admin access required' },
      { status: 403 }
    );
  }

  return { role: 'admin' };
}