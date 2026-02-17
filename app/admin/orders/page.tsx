// app/admin/orders/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import StatsBar from '../components/StatsBar';
import ManualOrderForm from '../components/ManualOrderForm';
import FiltersRow from '../components/FiltersRow';
import OrdersTable from '../components/OrdersTable';
import type { Order, OrderStatus } from '@/types/order';

interface ExtendedOrder extends Order {
  quantity?: number;
  customer_phone?: string;
  source?: 'stripe' | 'manual';
  notes?: string;
}

/**
 * Admin Orders Dashboard
 * Main page for managing orders with full CRUD functionality
 */
export default function OrdersDashboard() {
  const router = useRouter();
  const [role, setRole] = useState<string>('');
  const [orders, setOrders] = useState<ExtendedOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<ExtendedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    search: '',
  });

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
    fetchOrders();
  }, []);

  // Apply filters when orders or filters change
  useEffect(() => {
    applyFilters();
  }, [orders, filters]);

  const checkAuth = async () => {
    try {
      // Check if we have an admin session cookie by making a test request
      const response = await fetch('/api/admin/orders', {
        method: 'HEAD',
        credentials: 'include',
      });

      if (!response.ok) {
        // Not authenticated, redirect to login
        router.push('/admin');
        return;
      }

      // Get role from localStorage (set during login)
      const storedRole = localStorage.getItem('adminRole');
      if (storedRole) {
        setRole(storedRole);
      }
    } catch (err) {
      console.error('Auth check failed:', err);
      router.push('/admin');
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/orders', {
        credentials: 'include',
      });

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/admin');
          return;
        }
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...orders];

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(order => order.status === filters.status);
    }

    // Apply source filter
    if (filters.source) {
      filtered = filtered.filter(order => {
        const orderSource = order.source || (order.stripe_session_id ? 'stripe' : 'manual');
        return orderSource === filters.source;
      });
    }

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(order =>
        order.customer_name.toLowerCase().includes(searchLower) ||
        order.customer_email.toLowerCase().includes(searchLower)
      );
    }

    setFilteredOrders(filtered);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('adminRole');
      router.push('/admin');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update local state
      setOrders(prev => prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (err) {
      console.error('Status update failed:', err);
      throw err;
    }
  };

  const handleDelete = async (orderId: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE',
        headers: {
          'X-Confirm-Delete': 'true',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      // Remove from local state
      setOrders(prev => prev.filter(order => order.id !== orderId));
    } catch (err) {
      console.error('Delete failed:', err);
      throw err;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-gray-600 border-t-white rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Error: {error}</p>
          <button
            onClick={fetchOrders}
            className="px-4 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header role={role} onLogout={handleLogout} />
        <StatsBar orders={orders} />
        <ManualOrderForm onOrderCreated={fetchOrders} />
        <FiltersRow filters={filters} onFilterChange={setFilters} />
        <OrdersTable
          orders={filteredOrders}
          role={role}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}