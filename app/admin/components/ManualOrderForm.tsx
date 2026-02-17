// app/admin/components/ManualOrderForm.tsx
'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/utils/format';

interface ManualOrderFormProps {
  onOrderCreated: () => void;
}

/**
 * Form for creating manual orders
 * Collapsible form with all necessary fields for order creation
 */
export default function ManualOrderForm({ onOrderCreated }: ManualOrderFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    editionId: 'temb-black-edition',
    quantity: 1,
    unitPrice: 699,
    shippingRegion: 'MX',
    shippingAddress: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'MX',  // Use 2-letter country code
    },
    notes: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.startsWith('address_')) {
      const addressField = name.replace('address_', '');
      setFormData(prev => ({
        ...prev,
        shippingAddress: {
          ...prev.shippingAddress,
          [addressField]: value,
        },
      }));
    } else if (name === 'quantity' || name === 'unitPrice') {
      setFormData(prev => ({
        ...prev,
        [name]: parseFloat(value) || 0,
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch('/api/admin/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          unitPrice: formData.unitPrice * 100, // Convert to cents
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order');
      }

      // Reset form
      setFormData({
        customerName: '',
        customerEmail: '',
        customerPhone: '',
        editionId: 'temb-black-edition',
        quantity: 1,
        unitPrice: 699,
        shippingRegion: 'MX',
        shippingAddress: {
          line1: '',
          line2: '',
          city: '',
          state: '',
          postal_code: '',
          country: 'MX',  // Use 2-letter country code
        },
        notes: '',
      });

      setSuccess(true);
      setIsExpanded(false);
      onOrderCreated();

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalAmount = formData.quantity * formData.unitPrice;

  return (
    <div className="mb-8">
      {/* Toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors duration-200"
      >
        <span className="text-lg">{isExpanded ? '−' : '+'}</span>
        <span className="font-medium">Log Manual Order</span>
      </button>

      {/* Success message */}
      {success && (
        <div className="mt-4 p-4 bg-green-900/20 border border-green-800 rounded-lg text-green-400">
          Order created successfully!
        </div>
      )}

      {/* Expandable form */}
      <div className={`mt-4 transition-all duration-300 overflow-hidden ${isExpanded ? 'max-h-[2000px]' : 'max-h-0'}`}>
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Customer Information</h3>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Customer Name *</label>
                <input
                  type="text"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Customer Email *</label>
                <input
                  type="email"
                  name="customerEmail"
                  required
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone</label>
                <input
                  type="text"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-3">Order Details</h3>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Edition *</label>
                <select
                  name="editionId"
                  required
                  value={formData.editionId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                >
                  <option value="temb-black-edition">Black Edition</option>
                  <option value="temb-white-edition">White Edition</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    min="1"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-1">Unit Price ($) *</label>
                  <input
                    type="number"
                    name="unitPrice"
                    required
                    min="0"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                  />
                </div>
              </div>

              <div className="p-3 bg-black rounded-lg border border-gray-700">
                <p className="text-sm text-gray-400">Total:</p>
                <p className="text-xl font-bold text-white">
                  {formatCurrency(totalAmount * 100)} ({formData.quantity} × {formatCurrency(formData.unitPrice * 100)})
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Information */}
          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-semibold text-white mb-3">Shipping Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Shipping Region *</label>
                <select
                  name="shippingRegion"
                  required
                  value={formData.shippingRegion}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                >
                  <option value="MX">Mexico (MX)</option>
                  <option value="INTL">International (INTL)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Country Code * (2-letter)</label>
                <input
                  type="text"
                  name="address_country"
                  required
                  value={formData.shippingAddress.country}
                  onChange={handleInputChange}
                  pattern="[A-Z]{2}"
                  maxLength={2}
                  placeholder="e.g. MX, US"
                  title="Enter 2-letter country code (e.g. MX for Mexico, US for United States)"
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white uppercase placeholder-gray-600 focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Address Line 1 *</label>
              <input
                type="text"
                name="address_line1"
                required
                value={formData.shippingAddress.line1}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Address Line 2</label>
              <input
                type="text"
                name="address_line2"
                value={formData.shippingAddress.line2}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">City *</label>
                <input
                  type="text"
                  name="address_city"
                  required
                  value={formData.shippingAddress.city}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">State *</label>
                <input
                  type="text"
                  name="address_state"
                  required
                  value={formData.shippingAddress.state}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Postal Code *</label>
                <input
                  type="text"
                  name="address_postal_code"
                  required
                  value={formData.shippingAddress.postal_code}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="e.g. Hotel Marriott bulk deal"
                className="w-full px-3 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-gray-500"
              />
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mt-4 p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-400">
              {error}
            </div>
          )}

          {/* Submit button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isSubmitting ? 'Creating Order...' : 'Create Manual Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}