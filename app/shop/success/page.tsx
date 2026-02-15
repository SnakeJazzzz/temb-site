// app/shop/success/page.tsx

'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import Typography from '@/components/ui/Typography';

/**
 * Order details retrieved from Stripe session
 */
interface OrderDetails {
  editionId?: string;
  editionName?: string;
  shippingRegion?: string;
  customerEmail?: string;
  orderNumber?: string;
  coverType?: string;
}

/**
 * Success page content component
 * Separated to work with Suspense boundary for useSearchParams
 */
function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionId) {
      setLoading(true);
      setError(false);

      // Fetch session details from our API
      fetch(`/api/checkout/session?session_id=${sessionId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error('Failed to load order details');
          }
          return res.json();
        })
        .then(data => {
          setOrderDetails(data);
          setLoading(false);
        })
        .catch(err => {
          console.error('Failed to load order details:', err);
          setError(true);
          setLoading(false);
        });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-6 md:px-8 lg:px-12">
      <div className="max-w-2xl mx-auto text-center space-y-8 py-20">
        {/* Main heading */}
        <Typography variant="h1" className="text-pearl uppercase">
          Thank You
        </Typography>

        {/* Subheading */}
        <Typography variant="body-lg" className="text-space-grey">
          Your copy of THE ELECTRONIC MUSIC BOOK has been reserved.
        </Typography>

        {/* Order confirmation message */}
        <div className="space-y-4 pt-8">
          <Typography variant="body" className="text-space-grey">
            We've received your order and will begin processing it shortly.
          </Typography>

          <Typography variant="caption" className="text-space-grey/80 block">
            You'll receive a shipping confirmation email when your book is on its way.
          </Typography>

          <Typography variant="caption" className="text-space-grey/80 block">
            Ships within 3-5 business days
          </Typography>
        </div>

        {/* Order details section - only show if we have details and not loading */}
        {!loading && !error && orderDetails && (
          <div className="border border-space-grey/30 p-6 space-y-3 mt-8">
            <Typography variant="caption" className="text-space-grey uppercase block">
              Order Details
            </Typography>

            {/* Edition information */}
            {orderDetails.editionName && (
              <Typography variant="body" className="text-pearl block">
                Edition: {orderDetails.editionName}
              </Typography>
            )}

            {/* Cover type */}
            {orderDetails.coverType && (
              <Typography variant="caption" className="text-space-grey block">
                Cover: {orderDetails.coverType.charAt(0).toUpperCase() + orderDetails.coverType.slice(1)}
              </Typography>
            )}

            {/* Order number */}
            {orderDetails.orderNumber && (
              <Typography variant="caption" className="text-space-grey block">
                Order #: {orderDetails.orderNumber}
              </Typography>
            )}

            {/* Shipping region */}
            {orderDetails.shippingRegion && (
              <Typography variant="caption" className="text-space-grey block">
                Shipping: {orderDetails.shippingRegion === 'MX' ? 'Mexico' : 'International'}
              </Typography>
            )}

            {/* Customer email */}
            {orderDetails.customerEmail && (
              <Typography variant="caption" className="text-space-grey block">
                Confirmation sent to: {orderDetails.customerEmail}
              </Typography>
            )}
          </div>
        )}

        {/* Loading state for order details */}
        {loading && sessionId && (
          <div className="border border-space-grey/30 p-6">
            <Typography variant="caption" className="text-space-grey animate-pulse">
              Loading order details...
            </Typography>
          </div>
        )}

        {/* Call to action buttons */}
        <div className="pt-12 space-y-4">
          <Link
            href="/"
            className="inline-block bg-pearl text-midnight px-12 py-4 hover:bg-space-grey hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight"
          >
            <Typography variant="button">Back to Home</Typography>
          </Link>

          <div>
            <Link
              href="/artists"
              className="inline-block text-space-grey hover:text-pearl transition-colors underline underline-offset-4"
            >
              <Typography variant="caption">Explore the artists</Typography>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Success page shown after successful Stripe checkout
 * Displays order confirmation and optionally retrieves session details
 */
export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-midnight flex items-center justify-center px-6 md:px-8 lg:px-12">
          <div className="max-w-2xl mx-auto text-center space-y-8 py-20">
            <Typography variant="h1" className="text-pearl uppercase animate-pulse">
              Thank You
            </Typography>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}