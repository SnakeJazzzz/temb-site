// app/shop/page.tsx

'use client';

import { useState, useMemo } from 'react';
import { getActiveEditions, type Edition } from '@/lib/editions';
import {
  getAllShippingRates,
  calculateTotalWithShipping,
  type ShippingRegion,
  REGION_DISPLAY_NAMES
} from '@/lib/shipping';
import { isStripePublishableKeyConfigured } from '@/lib/stripe-client';

export default function ShopPage() {
  const editions = getActiveEditions();
  const shippingRates = getAllShippingRates();
  const [selectedRegion, setSelectedRegion] = useState<ShippingRegion>('INTL');

  // Check if Stripe is configured (this will be false without env vars)
  const stripeReady = isStripePublishableKeyConfigured();

  // Get the first active edition (there's only one for now)
  const edition = editions[0];

  // Calculate total price with shipping
  const totalPrice = useMemo(() => {
    if (!edition) return 0;
    return calculateTotalWithShipping(edition.price, selectedRegion);
  }, [edition, selectedRegion]);

  // Find the selected shipping rate
  const selectedShippingRate = shippingRates.find(rate => rate.region === selectedRegion);

  if (!edition) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20">
          <h1 className="text-5xl font-light tracking-wider mb-8">Shop</h1>
          <p className="text-gray-600 font-light text-lg">
            No editions currently available.
          </p>
        </div>
      </div>
    );
  }

  const handlePurchase = () => {
    if (stripeReady) {
      // TODO: Implement Stripe checkout when configured
      console.log('Initiating Stripe checkout...');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-20">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-light tracking-[0.08em] uppercase mb-16">
            Shop
          </h1>

          {/* Edition Card */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {/* Product Image Placeholder */}
            <div className="aspect-[3/4] bg-gray-100 border border-gray-200"></div>

            {/* Product Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light tracking-wide mb-4">
                  {edition.name}
                </h2>
                <p className="text-gray-600 font-light text-lg leading-relaxed">
                  {edition.description}
                </p>
              </div>

              {/* Price */}
              <div>
                <p className="text-3xl font-light">
                  ${(edition.price / 100).toFixed(2)} {edition.currency}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Plus shipping
                </p>
              </div>

              {/* Shipping Options */}
              <div className="space-y-4">
                <label className="block text-sm font-light text-gray-700 tracking-wider uppercase">
                  Shipping Region
                </label>
                <div className="space-y-3">
                  {shippingRates.map((rate) => (
                    <label
                      key={rate.region}
                      className="flex items-center justify-between p-4 border border-gray-200 hover:border-gray-400 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="shipping"
                          value={rate.region}
                          checked={selectedRegion === rate.region}
                          onChange={(e) => setSelectedRegion(e.target.value as ShippingRegion)}
                          className="mr-4 text-black focus:ring-black"
                        />
                        <div>
                          <p className="font-light">
                            {REGION_DISPLAY_NAMES[rate.region]}
                          </p>
                          {rate.estimated_days && (
                            <p className="text-sm text-gray-500">
                              {rate.estimated_days.min}-{rate.estimated_days.max} business days
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="font-light">
                        ${(rate.price / 100).toFixed(2)}
                      </p>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t border-gray-200 pt-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span>${(edition.price / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping ({REGION_DISPLAY_NAMES[selectedRegion]})</span>
                  <span>${selectedShippingRate ? (selectedShippingRate.price / 100).toFixed(2) : '0.00'}</span>
                </div>
                <div className="flex justify-between text-lg font-light pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-2xl">${(totalPrice / 100).toFixed(2)} {edition.currency}</span>
                </div>
              </div>

              {/* Purchase Button */}
              <div className="space-y-4">
                <button
                  onClick={handlePurchase}
                  disabled={!stripeReady}
                  className={`
                    w-full py-5 text-sm tracking-[0.2em] uppercase transition-all
                    focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-4
                    ${stripeReady
                      ? 'bg-black text-white hover:bg-gray-900'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }
                  `}
                  aria-label={stripeReady ? 'Buy Now' : 'Coming Soon'}
                >
                  {stripeReady ? 'Buy Now' : 'Coming Soon'}
                </button>

                <p className="text-center text-sm text-gray-500 font-light">
                  {stripeReady
                    ? 'Secure checkout powered by Stripe'
                    : 'Online checkout will be available soon'}
                </p>
              </div>

              {/* Additional Information */}
              <div className="pt-8 space-y-4 text-sm text-gray-600 font-light">
                <p>• Limited to 1000 numbered copies worldwide</p>
                <p>• Ships within 3-5 business days of order</p>
                <p>• Includes certificate of authenticity</p>
                <p>• International tracking provided</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}