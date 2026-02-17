// lib/utils/format.ts
/**
 * Utility functions for formatting data in the admin dashboard
 */

/**
 * Format cents to USD currency string
 * @param cents - Amount in cents
 * @returns Formatted currency string (e.g., "$699.00")
 */
export function formatCurrency(cents: number): string {
  const dollars = cents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(dollars);
}

/**
 * Format ISO date string to readable format
 * @param dateString - ISO date string
 * @returns Formatted date (e.g., "Feb 15, 2026")
 */
export function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Get human-readable edition name from ID
 * @param editionId - Edition identifier
 * @returns Edition display name
 */
export function getEditionName(editionId: string): string {
  const editionMap: Record<string, string> = {
    'temb-black-edition': 'Black Edition',
    'temb-white-edition': 'White Edition',
  };
  return editionMap[editionId] || editionId;
}

/**
 * Get status color class for Tailwind
 * @param status - Order status
 * @returns Tailwind color class
 */
export function getStatusColor(status: string): string {
  const statusColors: Record<string, string> = {
    paid: 'text-gray-400',
    processing: 'text-yellow-400',
    shipped: 'text-blue-400',
    delivered: 'text-green-400',
    cancelled: 'text-red-400',
  };
  return statusColors[status] || 'text-gray-400';
}

/**
 * Get status background color class for Tailwind
 * @param status - Order status
 * @returns Tailwind background color class
 */
export function getStatusBgColor(status: string): string {
  const statusBgColors: Record<string, string> = {
    paid: 'bg-gray-900',
    processing: 'bg-yellow-900',
    shipped: 'bg-blue-900',
    delivered: 'bg-green-900',
    cancelled: 'bg-red-900',
  };
  return statusBgColors[status] || 'bg-gray-900';
}