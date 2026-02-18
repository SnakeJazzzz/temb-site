// app/shop/EditionCard.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  getAllShippingRates,
  calculateTotalWithShipping,
  type ShippingRegion,
  REGION_DISPLAY_NAMES
} from '@/lib/shipping';
import { formatEditionPrice, type Edition, isEditionPurchasable } from '@/lib/editions';
import Typography from '@/components/ui/Typography';

interface EditionCardProps {
  edition: Edition;
  isCheckoutEnabled: boolean; // Passed from server
}

export default function EditionCard({ edition, isCheckoutEnabled }: EditionCardProps) {
  const shippingRates = getAllShippingRates();
  const [selectedRegion, setSelectedRegion] = useState<ShippingRegion>('INTL');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate total price with shipping
  const totalPrice = calculateTotalWithShipping(edition.price, selectedRegion);

  // Find the selected shipping rate
  const selectedShippingRate = shippingRates.find(rate => rate.region === selectedRegion);

  // Determine if this specific edition can be purchased
  // Button is enabled when: checkout is enabled AND edition is purchasable
  const canPurchase = isCheckoutEnabled && isEditionPurchasable(edition);

  // Check if this is the white edition (coming soon)
  const isWhiteEdition = edition.coverType === 'white';
  const isBlackEdition = edition.coverType === 'black';

  const handlePurchase = async () => {
    if (!canPurchase) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          editionId: edition.id,
          shippingRegion: selectedRegion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      window.location.href = data.url;
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start checkout. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className={`border border-space-grey/30 p-8 ${isWhiteEdition ? 'opacity-80' : ''} relative`}>
      {/* Pre-Sale Badge for Black Edition */}
      {isBlackEdition && (
        <div className="absolute top-6 right-6 z-10">
          <div className="border border-pearl px-3 py-1">
            <Typography variant="caption" className="text-pearl uppercase tracking-wider text-xs">
              Pre-Sale
            </Typography>
          </div>
        </div>
      )}

      {/* Product Image */}
      <div className={`aspect-[3/4] bg-midnight border border-space-grey/30 mb-8 relative overflow-hidden ${isWhiteEdition ? 'opacity-75' : ''}`}>
        <Image
          src={edition.image}
          alt={edition.name}
          fill
          className="object-contain p-8"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {/* Coming Soon overlay for White Edition */}
        {isWhiteEdition && (
          <div className="absolute inset-0 bg-midnight/30 flex items-center justify-center">
            <div className="text-center">
              <Typography variant="h4" className="text-pearl uppercase tracking-widest mb-2">
                Coming Soon
              </Typography>
              <Typography variant="caption" className="text-pearl/70">
                Be the first to know
              </Typography>
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <Typography variant="h3" className="text-pearl mb-2 uppercase">
            {edition.coverType === 'black' ? 'Black Cover' : 'White Cover'}
          </Typography>
          {isBlackEdition && (
            <Typography variant="caption" className="text-pearl/70 block mb-2 uppercase tracking-wider text-xs">
              Reserve Your Copy — Limited Time
            </Typography>
          )}
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
          {isWhiteEdition ? (
            // White Edition - No price shown
            <div className="h-12" />
          ) : (
            // Black Edition - Show pricing with strikethrough
            <>
              <div className="flex items-baseline gap-4 mb-2">
                <Typography variant="body" className="text-space-grey line-through">
                  $1,000.00
                </Typography>
                <Typography variant="h3" className="text-pearl">
                  $699.00
                </Typography>
              </div>
              <Typography variant="caption" className="text-pearl/60 block uppercase tracking-wider text-xs">
                Pre-Sale Price
              </Typography>
            </>
          )}
        </div>

        {/* Only show shipping and purchase options for Black Edition */}
        {!isWhiteEdition && (
          <>
            {/* Shipping Options */}
            <div className="space-y-4">
              <Typography variant="caption" as="label" className="text-pearl uppercase block">
                Shipping Region
              </Typography>
              <div className="space-y-3">
                {shippingRates.map((rate) => (
                  <label
                    key={rate.region}
                    className={`
                      flex items-center justify-between p-4 cursor-pointer transition-all
                      ${selectedRegion === rate.region
                        ? 'border-2 border-pearl bg-pearl/5'
                        : 'border border-space-grey/30 hover:border-space-grey'
                      }
                    `}
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
                        <Typography
                          variant="caption"
                          className={selectedRegion === rate.region ? 'text-pearl' : 'text-pearl/70'}
                        >
                          {REGION_DISPLAY_NAMES[rate.region]}
                        </Typography>
                        {rate.estimated_days && (
                          <Typography variant="caption" className="text-space-grey block text-xs">
                            {rate.estimated_days.min}-{rate.estimated_days.max} business days
                          </Typography>
                        )}
                      </div>
                    </div>
                    <Typography
                      variant="caption"
                      className={`${selectedRegion === rate.region ? 'text-pearl' : 'text-pearl/70'} uppercase tracking-wider`}
                    >
                      {rate.price === 0 ? 'FREE SHIPPING' : `$${(rate.price / 100).toFixed(2)}`}
                    </Typography>
                  </label>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t border-space-grey/30 pt-6 space-y-2">
              <div className="flex justify-between">
                <Typography variant="caption" className="text-space-grey">Subtotal</Typography>
                <Typography variant="caption" className="text-pearl">$699.00</Typography>
              </div>
              <div className="flex justify-between">
                <Typography variant="caption" className="text-space-grey">
                  Shipping ({REGION_DISPLAY_NAMES[selectedRegion]})
                </Typography>
                <Typography variant="caption" className="text-pearl uppercase tracking-wider">
                  {selectedShippingRate && selectedShippingRate.price === 0
                    ? 'FREE'
                    : selectedShippingRate
                    ? `$${(selectedShippingRate.price / 100).toFixed(2)}`
                    : '$0.00'}
                </Typography>
              </div>
              <div className="flex justify-between pt-2 border-t border-space-grey/30">
                <Typography variant="body" className="text-pearl">Total</Typography>
                <Typography variant="h4" className="text-pearl">$699.00 {edition.currency}</Typography>
              </div>
            </div>

            {/* Purchase Button */}
            <div className="space-y-4">
              <button
                onClick={handlePurchase}
                disabled={!canPurchase || isLoading}
                className={`
                  w-full py-5 transition-all
                  focus:outline-none focus:ring-2 focus:ring-pearl focus:ring-offset-4 focus:ring-offset-midnight
                  ${canPurchase && !isLoading
                    ? 'bg-pearl text-midnight hover:bg-space-grey hover:text-pearl cursor-pointer'
                    : 'bg-space-grey/30 text-space-grey/50 cursor-not-allowed'
                  }
                `}
                aria-label={isLoading ? 'Processing...' : canPurchase ? 'Buy Now' : 'Coming Soon'}
              >
                <Typography variant="button">
                  {isLoading ? 'Redirecting to checkout...' : canPurchase ? 'Buy Now' : 'Coming Soon'}
                </Typography>
              </button>

              <Typography variant="caption" className="text-center text-space-grey block text-xs">
                {isLoading
                  ? 'Please wait...'
                  : canPurchase
                  ? 'Secure checkout powered by Stripe'
                  : 'Online checkout will be available soon'}
              </Typography>

              {/* Error Message */}
              {error && (
                <div className="mt-4 p-4 border border-red-500/30 bg-red-500/10">
                  <Typography variant="caption" className="text-red-400 block">
                    {error}
                  </Typography>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}