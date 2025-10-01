// components/products/ActiveFilters.tsx
'use client';

import { useProductStore } from '@/store/useProductStore';
import { X } from 'lucide-react';

export default function ActiveFilters() {
  const { filters, toggleFilter, getActiveFiltersCount } = useProductStore();

  if (getActiveFiltersCount() === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {filters.categories.map((category) => (
        <span
          key={category}
          className="flex items-center gap-2 bg-gray-100 px-3 py-1 text-sm font-light"
        >
          {category}
          <button onClick={() => toggleFilter('categories', category)}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {filters.colors.map((color) => (
        <span
          key={color}
          className="flex items-center gap-2 bg-gray-100 px-3 py-1 text-sm font-light"
        >
          {color}
          <button onClick={() => toggleFilter('colors', color)}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {filters.sizes.map((size) => (
        <span
          key={size}
          className="flex items-center gap-2 bg-gray-100 px-3 py-1 text-sm font-light"
        >
          Size {size}
          <button onClick={() => toggleFilter('sizes', size)}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {filters.availability.map((availability) => (
        <span
          key={availability}
          className="flex items-center gap-2 bg-gray-100 px-3 py-1 text-sm font-light"
        >
          {availability === 'in-stock' ? 'In Stock' : 'Out of Stock'}
          <button onClick={() => toggleFilter('availability', availability)}>
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      {filters.rating > 0 && (
        <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 text-sm font-light">
          {filters.rating}+ Stars
          <button onClick={() => useProductStore.getState().setFilters({ rating: 0 })}>
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
      {filters.searchQuery && (
        <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 text-sm font-light">
          Search: "{filters.searchQuery}"
          <button onClick={() => useProductStore.getState().setSearchQuery('')}>
            <X className="w-3 h-3" />
          </button>
        </span>
      )}
    </div>
  );
}