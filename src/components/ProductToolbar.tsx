// components/products/ProductToolbar.tsx
'use client';

import { useProductStore } from '@/store/useProductStore';
import { SlidersHorizontal, Grid3X3, List } from 'lucide-react';

export default function ProductToolbar() {
  const {
    products,
    filteredProducts,
    showFilters,
    toggleShowFilters,
    viewMode,
    setViewMode,
    setSortBy,
    filters,
  } = useProductStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-6">
        <button
          onClick={toggleShowFilters}
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 hover:border-pink-500 hover:text-pink-500 font-light transition-all duration-300"
        >
          <SlidersHorizontal className="w-4 h-4" />
          {showFilters ? 'Hide' : 'Show'} Filters
        </button>

        <div className="text-gray-600 font-light">
          {filteredProducts.length} of {products.length} products
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Sort Dropdown */}
        <select
          value={filters.sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-200 font-light focus:outline-none focus:border-pink-500"
        >
          <option value="featured">Featured</option>
          <option value="newest">Newest</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
          <option value="rating">Highest Rated</option>
        </select>

        {/* View Toggle */}
        <div className="flex border border-gray-200">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 transition-all duration-300 ${
              viewMode === 'grid'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 transition-all duration-300 ${
              viewMode === 'list'
                ? 'bg-black text-white'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}