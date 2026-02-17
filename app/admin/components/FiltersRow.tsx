// app/admin/components/FiltersRow.tsx
'use client';

interface Filters {
  status: string;
  source: string;
  search: string;
}

interface FiltersRowProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

/**
 * Filter controls for orders table
 * Includes status, source, and search filters
 */
export default function FiltersRow({ filters, onFilterChange }: FiltersRowProps) {
  const handleFilterChange = (key: keyof Filters, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      status: '',
      source: '',
      search: '',
    });
  };

  const hasActiveFilters = filters.status || filters.source || filters.search;

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Status filter */}
      <div className="flex-1 md:max-w-xs">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
        >
          <option value="">All Status</option>
          <option value="paid">Paid</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Source filter */}
      <div className="flex-1 md:max-w-xs">
        <select
          value={filters.source}
          onChange={(e) => handleFilterChange('source', e.target.value)}
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white focus:outline-none focus:border-gray-500"
        >
          <option value="">All Sources</option>
          <option value="stripe">Stripe</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* Search input */}
      <div className="flex-1">
        <input
          type="text"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          placeholder="Search customer name or email..."
          className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-gray-500"
        />
      </div>

      {/* Clear filters button */}
      {hasActiveFilters && (
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 text-sm font-medium text-gray-400 bg-gray-900 border border-gray-700 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-200"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}