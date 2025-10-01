// components/products/FilterSidebar.tsx
'use client';

import { useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { Search, ChevronDown, ChevronRight, Star } from 'lucide-react';

export default function FilterSidebar() {
  const {
    products,
    filters,
    setFilters,
    resetFilters,
    toggleFilter,
    setSearchQuery,
    getActiveFiltersCount,
  } = useProductStore();

  const [expandedFilters, setExpandedFilters] = useState<Record<string, boolean>>({
    categories: true,
    price: true,
    colors: false,
    sizes: false,
  });

  const toggleFilterExpansion = (filterName: string) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  // Extract unique values from products
  const categories = Array.from(new Set(products.map((p) => p.category)));
  const colors = Array.from(new Set(products.flatMap((p) => p.colors)));
  const sizes = Array.from(new Set(products.flatMap((p) => p.sizes)));

  return (
    <div className="w-80 flex-shrink-0 space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-light text-black">Filters</h2>
        {getActiveFiltersCount() > 0 && (
          <button
            onClick={resetFilters}
            className="text-sm text-gray-400 hover:text-pink-500 font-light transition-colors duration-300"
          >
            Clear All ({getActiveFiltersCount()})
          </button>
        )}
      </div>

      {/* Quick Search */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={filters.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 font-light focus:outline-none focus:border-pink-500"
        />
      </div>

      {/* Categories Filter */}
      <div className="border border-gray-100 p-4">
        <button
          onClick={() => toggleFilterExpansion('categories')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-lg font-light text-black">Categories</span>
          {expandedFilters.categories ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {expandedFilters.categories && (
          <div className="space-y-3 mt-4">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => toggleFilter('categories', category)}
                  className="w-4 h-4"
                />
                <span className="text-gray-600 font-light">{category}</span>
                <span className="text-xs text-gray-400">
                  ({products.filter((p) => p.category === category).length})
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="border border-gray-100 p-4">
        <button
          onClick={() => toggleFilterExpansion('price')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-lg font-light text-black">Price Range</span>
          {expandedFilters.price ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {expandedFilters.price && (
          <div className="space-y-4 mt-4">
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) =>
                  setFilters({
                    priceRange: [Number(e.target.value), filters.priceRange[1]],
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 text-sm font-light"
              />
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  setFilters({
                    priceRange: [filters.priceRange[0], Number(e.target.value)],
                  })
                }
                className="w-full px-3 py-2 border border-gray-200 text-sm font-light"
              />
            </div>
            <div className="text-sm text-gray-400 font-light">
              ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
            </div>
          </div>
        )}
      </div>

      {/* Colors Filter */}
      <div className="border border-gray-100 p-4">
        <button
          onClick={() => toggleFilterExpansion('colors')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-lg font-light text-black">Colors</span>
          {expandedFilters.colors ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {expandedFilters.colors && (
          <div className="flex flex-wrap gap-3 mt-4">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => toggleFilter('colors', color)}
                className={`w-8 h-8 border-2 transition-all duration-300 ${
                  filters.colors.includes(color)
                    ? 'border-black scale-110'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  backgroundColor:
                    color === 'Black'
                      ? '#000000'
                      : color === 'White'
                      ? '#FFFFFF'
                      : color === 'Gray'
                      ? '#9CA3AF'
                      : color === 'Navy'
                      ? '#1E3A8A'
                      : color === 'Blue'
                      ? '#3B82F6'
                      : '#000000',
                }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>

      {/* Sizes Filter */}
      <div className="border border-gray-100 p-4">
        <button
          onClick={() => toggleFilterExpansion('sizes')}
          className="flex items-center justify-between w-full text-left"
        >
          <span className="text-lg font-light text-black">Sizes</span>
          {expandedFilters.sizes ? (
            <ChevronDown className="w-4 h-4 text-gray-400" />
          ) : (
            <ChevronRight className="w-4 h-4 text-gray-400" />
          )}
        </button>

        {expandedFilters.sizes && (
          <div className="grid grid-cols-3 gap-2 mt-4">
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => toggleFilter('sizes', size)}
                className={`h-10 border font-light text-sm transition-all duration-300 ${
                  filters.sizes.includes(size)
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Availability Filter */}
      <div className="border border-gray-100 p-4">
        <h3 className="text-lg font-light text-black mb-4">Availability</h3>
        <div className="space-y-3">
          {[
            { value: 'in-stock', label: 'In Stock' },
            { value: 'out-of-stock', label: 'Out of Stock' },
          ].map(({ value, label }) => (
            <label key={value} className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.availability.includes(value)}
                onChange={() => toggleFilter('availability', value)}
                className="w-4 h-4"
              />
              <span className="text-gray-600 font-light">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="border border-gray-100 p-4">
        <h3 className="text-lg font-light text-black mb-4">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilters({ rating })}
              className={`flex items-center gap-2 w-full text-left p-2 transition-all duration-300 ${
                filters.rating === rating
                  ? 'bg-pink-50 text-pink-600'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < rating ? 'text-yellow-400 fill-current' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-light">& Up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}