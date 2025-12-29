// app/shop/page.tsx

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { getActiveEditions, formatEditionPrice, type Edition } from '@/lib/editions';
import {
  getAllShippingRates,
  calculateTotalWithShipping,
  type ShippingRegion,
  REGION_DISPLAY_NAMES
} from '@/lib/shipping';
import { isStripePublishableKeyConfigured } from '@/lib/stripe-client';
import Typography from '@/components/ui/Typography';

function EditionCard({ edition }: { edition: Edition }) {
  const shippingRates = getAllShippingRates();
  const [selectedRegion, setSelectedRegion] = useState<ShippingRegion>('INTL');

  // Check if Stripe is configured
  const stripeReady = isStripePublishableKeyConfigured();

  // Calculate total price with shipping
  const totalPrice = calculateTotalWithShipping(edition.price, selectedRegion);

  // Find the selected shipping rate
  const selectedShippingRate = shippingRates.find(rate => rate.region === selectedRegion);

  const handlePurchase = () => {
    if (stripeReady) {
      // TODO: Implement Stripe checkout when configured
      console.log('Initiating Stripe checkout for:', edition.id);
    }
  };

  return (
    <div className="border border-space-grey/30 p-8">
      {/* Product Image */}
      <div className="aspect-[3/4] bg-midnight border border-space-grey/30 mb-8 relative overflow-hidden">
        <Image
          src={edition.image}
          alt={edition.name}
          fill
          className="object-contain p-8"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <Typography variant="h3" className="text-pearl mb-2 uppercase">
            {edition.coverType === 'black' ? 'Black Cover' : 'White Cover'}
          </Typography>
          <Typography variant="body" className="text-space-grey leading-relaxed">
            {edition.description}
          </Typography>
        </div>

        {/* Features */}
        <div className="space-y-2">
          {edition.features.map((feature, index) => (
            <Typography key={index} variant="caption" className="text-pearl/80 block">
              • {feature}
            </Typography>
          ))}
        </div>

        {/* Price */}
        <div className="border-t border-space-grey/30 pt-6">
          <Typography variant="h3" className="text-pearl">
            {formatEditionPrice(edition)}
          </Typography>
          <Typography variant="caption" className="text-space-grey block mt-1">
            Plus shipping
          </Typography>
        </div>

        {/* Shipping Options */}
        <div className="space-y-4">
          <Typography variant="caption" as="label" className="text-pearl uppercase block">
            Shipping Region
          </Typography>
          <div className="space-y-3">
            {shippingRates.map((rate) => (
              <label
                key={rate.region}
                className="flex items-center justify-between p-4 border border-space-grey/30 hover:border-space-grey cursor-pointer transition-colors"
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`shipping-${edition.id}`}
                    value={rate.region}
                    checked={selectedRegion === rate.region}
                    onChange={(e) => setSelectedRegion(e.target.value as ShippingRegion)}
                    className="mr-4 text-pearl focus:ring-pearl accent-pearl"
                  />
                  <div>
                    <Typography variant="caption" className="text-pearl">
                      {REGION_DISPLAY_NAMES[rate.region]}
                    </Typography>
                    {rate.estimated_days && (
                      <Typography variant="caption" className="text-space-grey block text-xs">
                        {rate.estimated_days.min}-{rate.estimated_days.max} business days
                      </Typography>
                    )}
                  </div>
                </div>
                <Typography variant="caption" className="text-pearl">
                  ${(rate.price / 100).toFixed(2)}
                </Typography>
              </label>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-space-grey/30 pt-6 space-y-2">
          <div className="flex justify-between">
            <Typography variant="caption" className="text-space-grey">Subtotal</Typography>
            <Typography variant="caption" className="text-pearl">${(edition.price / 100).toFixed(2)}</Typography>
          </div>
          <div className="flex justify-between">
            <Typography variant="caption" className="text-space-grey">
              Shipping ({REGION_DISPLAY_NAMES[selectedRegion]})
            </Typography>
            <Typography variant="caption" className="text-pearl">
              ${selectedShippingRate ? (selectedShippingRate.price / 100).toFixed(2) : '0.00'}
            </Typography>
          </div>
          <div className="flex justify-between pt-2 border-t border-space-grey/30">
            <Typography variant="body" className="text-pearl">Total</Typography>
            <Typography variant="h4" className="text-pearl">${(totalPrice / 100).toFixed(2)} {edition.currency}</Typography>
          </div>
        </div>

        {/* Purchase Button */}
        <div className="space-y-4">
          <button
            onClick={handlePurchase}
            disabled={!stripeReady}
            className={`
              w-full py-5 transition-all
              focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight
              ${stripeReady
                ? 'bg-pearl text-midnight hover:bg-space-grey hover:text-pearl'
                : 'bg-space-grey/30 text-space-grey/50 cursor-not-allowed'
              }
            `}
            aria-label={stripeReady ? 'Buy Now' : 'Coming Soon'}
          >
            <Typography variant="button">{stripeReady ? 'Buy Now' : 'Coming Soon'}</Typography>
          </button>

          <Typography variant="caption" className="text-center text-space-grey block text-xs">
            {stripeReady
              ? 'Secure checkout powered by Stripe'
              : 'Online checkout will be available soon'}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const editions = getActiveEditions();

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
              <EditionCard key={edition.id} edition={edition} />
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
