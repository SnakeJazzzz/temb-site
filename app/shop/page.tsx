// app/shop/page.tsx (Server Component - No "use client" directive)

import { getActiveEditions } from '@/lib/editions';
import { isStripeConfigured } from '@/lib/stripe';
import Typography from '@/components/ui/Typography';
import EditionCard from './EditionCard'; // Import client component

export default function ShopPage() {
  const editions = getActiveEditions();
  const isCheckoutEnabled = isStripeConfigured(); // Check on server

  if (editions.length === 0) {
    return (
      <div className="min-h-screen bg-midnight">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20">
          <Typography variant="h1" className="text-pearl mb-8 uppercase">Shop</Typography>
          <Typography variant="body-lg" className="text-space-grey">
            No editions currently available.
          </Typography>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-midnight">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-16">
            <Typography variant="h1" className="text-pearl uppercase mb-6">
              Shop
            </Typography>
            <Typography variant="body-lg" className="text-space-grey max-w-3xl">
              Limited edition luxury publication celebrating electronic music culture.
              Numbered 1–10,000. Choose your collector's edition.
            </Typography>
          </div>

          {/* Editions Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {editions.map((edition) => (
              <EditionCard
                key={edition.id}
                edition={edition}
                isCheckoutEnabled={isCheckoutEnabled} // Pass server-side check result
              />
            ))}
          </div>

          {/* Additional Information */}
          <div className="border-t border-space-grey/30 pt-12">
            <Typography variant="h4" className="text-pearl mb-6 uppercase">Product Details</Typography>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Typography variant="caption" className="text-space-grey block">
                  • Limited to 10,000 numbered copies worldwide
                </Typography>
                <Typography variant="caption" className="text-space-grey block">
                  • Ships within 3-5 business days of order
                </Typography>
                <Typography variant="caption" className="text-space-grey block">
                  • Includes certificate of authenticity
                </Typography>
              </div>
              <div className="space-y-3">
                <Typography variant="caption" className="text-space-grey block">
                  • International tracking provided
                </Typography>
                <Typography variant="caption" className="text-space-grey block">
                  • Premium hardcover binding
                </Typography>
                <Typography variant="caption" className="text-space-grey block">
                  • 250+ artists featured
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}