// app/api/admin/auth/route.ts
/**
 * Admin authentication API endpoint
 * POST /api/admin/auth - Login with username and password
 */

import { NextRequest, NextResponse } from 'next/server';
import { validateCredentials, createSession, createSessionCookie } from '@/lib/admin-auth';

/**
 * Handle admin login
 * @param request The incoming request
 * @returns JSON response with authentication result
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { username, password } = body;

    // Validate input
    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Validate credentials
    const validation = validateCredentials(username, password);

    if (!validation.valid || !validation.role) {
      // Invalid credentials
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT session
    const sessionToken = await createSession(validation.role);

    // Create response with session cookie
    const response = NextResponse.json({
      success: true,
      role: validation.role,
    });

    // Set secure httpOnly cookie
    response.headers.set('Set-Cookie', createSessionCookie(sessionToken));

    return response;
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
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