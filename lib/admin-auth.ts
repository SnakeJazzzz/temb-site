// lib/admin-auth.ts
/**
 * Admin authentication system for Phase 3E
 * Uses JWT with jose library for edge runtime compatibility
 * Supports two roles: 'admin' and 'subadmin'
 */

import { SignJWT, jwtVerify } from 'jose';

/**
 * Admin role types
 */
export type AdminRole = 'admin' | 'subadmin';

/**
 * JWT payload structure
 */
interface JWTPayload {
  role: AdminRole;
  iat: number;
  exp: number;
}

/**
 * Get the JWT secret key
 * Uses ADMIN_JWT_SECRET env var or fallback for local development
 */
function getJWTSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || 'dev-secret-change-in-production';
  return new TextEncoder().encode(secret);
}

/**
 * Validate admin credentials against environment variables
 * @param username The username to validate
 * @param password The password to validate
 * @returns Object with validation status and role if valid
 */
export function validateCredentials(
  username: string,
  password: string
): { valid: boolean; role: AdminRole | null } {
  // Check admin credentials
  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return { valid: true, role: 'admin' };
  }

  // Check subadmin credentials
  if (
    username === process.env.SUBADMIN_USERNAME &&
    password === process.env.SUBADMIN_PASSWORD
  ) {
    return { valid: true, role: 'subadmin' };
  }

  // Invalid credentials
  return { valid: false, role: null };
}

/**
 * Create a JWT session token for authenticated admin
 * @param role The admin role to encode in the token
 * @returns Signed JWT string
 */
export async function createSession(role: AdminRole): Promise<string> {
  const secret = getJWTSecret();

  // Create JWT with 7-day expiration
  const jwt = await new SignJWT({ role })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);

  return jwt;
}

/**
 * Verify and decode a JWT session from request cookies
 * @param request The incoming request object
 * @returns Authentication status and role if valid
 */
export async function getSession(
  request: Request
): Promise<{ authenticated: boolean; role: AdminRole | null }> {
  try {
    // Parse cookies from request
    const cookieHeader = request.headers.get('cookie');
    if (!cookieHeader) {
      return { authenticated: false, role: null };
    }

    // Find the admin session cookie
    const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      if (key && value) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, string>);

    const sessionToken = cookies['temb-admin-session'];
    if (!sessionToken) {
      return { authenticated: false, role: null };
    }

    // Verify JWT
    const secret = getJWTSecret();
    const { payload } = await jwtVerify(sessionToken, secret);

    // Type guard for payload
    if (
      typeof payload === 'object' &&
      payload !== null &&
      'role' in payload &&
      (payload.role === 'admin' || payload.role === 'subadmin')
    ) {
      return {
        authenticated: true,
        role: payload.role as AdminRole,
      };
    }

    return { authenticated: false, role: null };
  } catch (error) {
    // JWT verification failed
    console.error('Session verification failed:', error);
    return { authenticated: false, role: null };
  }
}

/**
 * Helper function to check if user has admin role
 * @param request The incoming request
 * @returns True if user is admin
 */
export async function isAdmin(request: Request): Promise<boolean> {
  const session = await getSession(request);
  return session.authenticated && session.role === 'admin';
}

/**
 * Helper function to check if user has any admin role (admin or subadmin)
 * @param request The incoming request
 * @returns True if user is admin or subadmin
 */
export async function isAnyAdmin(request: Request): Promise<boolean> {
  const session = await getSession(request);
  return session.authenticated && session.role !== null;
}

/**
 * Create a secure cookie string for the session
 * @param token The JWT token
 * @returns Cookie string with security options
 */
export function createSessionCookie(token: string): string {
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieParts = [
    `temb-admin-session=${token}`,
    'HttpOnly',
    'SameSite=Strict',
    'Path=/',
    `Max-Age=${7 * 24 * 60 * 60}`, // 7 days in seconds
  ];

  // Add Secure flag in production
  if (isProduction) {
    cookieParts.push('Secure');
  }

  return cookieParts.join('; ');
}

/**
 * Create a cookie string to clear the session
 * @returns Cookie string that clears the session
 */
export function clearSessionCookie(): string {
  const isProduction = process.env.NODE_ENV === 'production';

  const cookieParts = [
    'temb-admin-session=',
    'HttpOnly',
    'SameSite=Strict',
    'Path=/',
    'Max-Age=0',
  ];

  // Add Secure flag in production
  if (isProduction) {
    cookieParts.push('Secure');
  }

  return cookieParts.join('; ');
}