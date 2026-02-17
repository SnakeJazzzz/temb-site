// app/admin/components/OrdersTable.tsx
'use client';

import { useState } from 'react';
import { formatCurrency, formatDate, getEditionName, getStatusColor, getStatusBgColor } from '@/lib/utils/format';
import type { Order, OrderStatus } from '@/types/order';
import ConfirmDialog from './ConfirmDialog';

interface OrdersTableProps {
  orders: Order[];
  role: string;
  onStatusChange: (orderId: string, newStatus: OrderStatus) => Promise<void>;
  onDelete: (orderId: string) => Promise<void>;
}

interface ExtendedOrder extends Order {
  quantity?: number;
  customer_phone?: string;
  source?: 'stripe' | 'manual';
  notes?: string;
}

/**
 * Orders table component with status management and delete functionality
 */
export default function OrdersTable({ orders, role, onStatusChange, onDelete }: OrdersTableProps) {
  const [loadingStatus, setLoadingStatus] = useState<Record<string, boolean>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<{ orderId: string; customerName: string } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    if (!['paid', 'processing', 'shipped', 'delivered', 'cancelled'].includes(newStatus)) return;

    setLoadingStatus(prev => ({ ...prev, [orderId]: true }));
    try {
      await onStatusChange(orderId, newStatus as OrderStatus);
    } catch (error) {
      console.error('Failed to update status:', error);
    } finally {
      setLoadingStatus(prev => ({ ...prev, [orderId]: false }));
    }
  };

  const handleDeleteClick = (order: ExtendedOrder) => {
    setDeleteConfirm({
      orderId: order.id,
      customerName: order.customer_name,
    });
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;

    setIsDeleting(true);
    try {
      await onDelete(deleteConfirm.orderId);
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete order:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm(null);
  };

  // Cast orders to ExtendedOrder type to include additional fields
  const extendedOrders = orders as ExtendedOrder[];

  if (extendedOrders.length === 0) {
    return (
      <div className="bg-gray-900 border border-gray-800 rounded-lg p-12 text-center">
        <p className="text-gray-400 text-lg">No orders found</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table view */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Edition</th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
              <th className="text-right py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              {role === 'admin' && (
                <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {extendedOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-900/50 transition-colors">
                <td className="py-4 px-4 text-sm text-gray-300">
                  {formatDate(order.created_at)}
                </td>
                <td className="py-4 px-4 text-sm text-white font-medium truncate max-w-[200px]">
                  {order.customer_name}
                </td>
                <td className="py-4 px-4 text-sm text-gray-300 truncate max-w-[200px]">
                  {order.customer_email}
                </td>
                <td className="py-4 px-4 text-sm text-gray-300">
                  {getEditionName(order.edition_id)}
                </td>
                <td className="py-4 px-4 text-sm text-gray-300 text-center">
                  {order.quantity || 1}
                </td>
                <td className="py-4 px-4 text-sm text-gray-300 text-center">
                  <span className="px-2 py-1 bg-gray-800 rounded text-xs font-medium">
                    {order.shipping_region}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-white font-medium text-right">
                  {formatCurrency(order.amount_total)}
                </td>
                <td className="py-4 px-4 text-sm text-center">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    order.source === 'manual'
                      ? 'bg-orange-900 text-orange-400'
                      : 'bg-blue-900 text-blue-400'
                  }`}>
                    {order.source === 'manual' ? 'Manual' : 'Stripe'}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-center">
                  <div className="relative">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      disabled={loadingStatus[order.id]}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border ${getStatusBgColor(order.status)} ${getStatusColor(order.status)} border-gray-700 bg-opacity-20 cursor-pointer hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                    >
                      <option value="paid">Paid</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {loadingStatus[order.id] && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-white rounded-full"></div>
                      </div>
                    )}
                  </div>
                </td>
                {role === 'admin' && (
                  <td className="py-4 px-4 text-sm text-center">
                    <button
                      onClick={() => handleDeleteClick(order)}
                      className="px-3 py-1 text-xs font-medium text-red-400 bg-red-900/20 border border-red-800 rounded-lg hover:bg-red-900/30 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet card view */}
      <div className="lg:hidden space-y-4">
        {extendedOrders.map((order) => (
          <div key={order.id} className="bg-gray-900 border border-gray-800 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-white font-medium">{order.customer_name}</p>
                <p className="text-sm text-gray-400">{order.customer_email}</p>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{formatCurrency(order.amount_total)}</p>
                <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p className="text-xs text-gray-500">Edition</p>
                <p className="text-sm text-gray-300">{getEditionName(order.edition_id)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="text-sm text-gray-300">{order.quantity || 1}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Region</p>
                <p className="text-sm text-gray-300">{order.shipping_region}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Source</p>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  order.source === 'manual'
                    ? 'bg-orange-900 text-orange-400'
                    : 'bg-blue-900 text-blue-400'
                }`}>
                  {order.source === 'manual' ? 'Manual' : 'Stripe'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-800">
              <div className="relative flex-1 mr-2">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  disabled={loadingStatus[order.id]}
                  className={`w-full px-3 py-1 rounded-lg text-xs font-medium border ${getStatusBgColor(order.status)} ${getStatusColor(order.status)} border-gray-700 bg-opacity-20 cursor-pointer hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                >
                  <option value="paid">Paid</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                {loadingStatus[order.id] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-white rounded-full"></div>
                  </div>
                )}
              </div>
              {role === 'admin' && (
                <button
                  onClick={() => handleDeleteClick(order)}
                  className="px-3 py-1 text-xs font-medium text-red-400 bg-red-900/20 border border-red-800 rounded-lg hover:bg-red-900/30 transition-colors"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation dialog */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        title="Delete Order"
        message={`Are you sure you want to delete the order for ${deleteConfirm?.customerName}? This action cannot be undone.`}
        confirmText={isDeleting ? 'Deleting...' : 'Delete'}
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
}