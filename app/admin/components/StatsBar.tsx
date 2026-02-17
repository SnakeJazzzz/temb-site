// app/admin/components/StatsBar.tsx
'use client';

import { formatCurrency } from '@/lib/utils/format';
import type { Order } from '@/types/order';

interface StatsBarProps {
  orders: Order[];
}

/**
 * StatsBar component displays key metrics about orders
 */
export default function StatsBar({ orders }: StatsBarProps) {
  // Calculate statistics
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.amount_total, 0);
  const paidOrders = orders.filter(order => order.status === 'paid').length;
  const shippedOrders = orders.filter(order => order.status === 'shipped').length;
  const deliveredOrders = orders.filter(order => order.status === 'delivered').length;

  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders.toString(),
      color: 'text-white',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      color: 'text-green-400',
    },
    {
      label: 'Paid Orders',
      value: paidOrders.toString(),
      color: 'text-gray-400',
    },
    {
      label: 'Shipped Orders',
      value: shippedOrders.toString(),
      color: 'text-blue-400',
    },
    {
      label: 'Delivered Orders',
      value: deliveredOrders.toString(),
      color: 'text-green-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-gray-700 transition-colors"
        >
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
            {stat.label}
          </p>
          <p className={`text-2xl font-bold ${stat.color}`}>
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}