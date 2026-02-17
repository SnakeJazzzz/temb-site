// app/api/admin/auth/logout/route.ts
/**
 * Admin logout API endpoint
 * POST /api/admin/auth/logout - Clear admin session
 */

import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookie } from '@/lib/admin-auth';

/**
 * Handle admin logout
 * @param request The incoming request
 * @returns JSON response with logout confirmation
 */
export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });

    // Clear the session cookie
    response.headers.set('Set-Cookie', clearSessionCookie());

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported methods
 */
export async function GET() {
  return NextResponse.json(
    { success: false, error: 'Method not allowed' },
    { status: 405 }
  );
}