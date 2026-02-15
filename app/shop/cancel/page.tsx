// app/shop/cancel/page.tsx

import Link from 'next/link';
import Typography from '@/components/ui/Typography';

/**
 * Cancel page shown when user cancels Stripe checkout
 * Provides a gentle return path to continue shopping
 */
export default function CancelPage() {
  return (
    <div className="min-h-screen bg-midnight flex items-center justify-center px-6 md:px-8 lg:px-12">
      <div className="max-w-2xl mx-auto text-center space-y-8 py-20">
        {/* Main heading */}
        <Typography variant="h1" className="text-pearl uppercase">
          Checkout Cancelled
        </Typography>

        {/* Subheading */}
        <Typography variant="body-lg" className="text-space-grey">
          Your order has not been placed.
        </Typography>

        {/* Reassurance message */}
        <div className="space-y-4 pt-8">
          <Typography variant="body" className="text-space-grey">
            No payment has been processed and no charges have been made.
          </Typography>

          <Typography variant="caption" className="text-space-grey/80 block">
            Your selected edition is still available for purchase.
          </Typography>
        </div>

        {/* Call to action buttons */}
        <div className="pt-12 space-y-4">
          <Link
            href="/shop"
            className="inline-block bg-pearl text-midnight px-12 py-4 hover:bg-space-grey hover:text-pearl transition-colors focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight"
          >
            <Typography variant="button">Return to Shop</Typography>
          </Link>

          <div>
            <Link
              href="/"
              className="inline-block text-space-grey hover:text-pearl transition-colors underline underline-offset-4"
            >
              <Typography variant="caption">Back to home</Typography>
            </Link>
          </div>
        </div>

        {/* Help message */}
        <div className="pt-8 border-t border-space-grey/20">
          <Typography variant="caption" className="text-space-grey/60 block">
            Having trouble with checkout? Please contact support@electronicmusicbook.com
          </Typography>
        </div>
      </div>
    </div>
  );
}