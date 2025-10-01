// components/products/EmptyState.tsx
'use client';

import { useProductStore } from '@/store/useProductStore';
import { Search } from 'lucide-react';

export default function EmptyState() {
  const { resetFilters } = useProductStore();

  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 bg-gray-100 mx-auto mb-8 flex items-center justify-center rounded-full">
        <Search className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-4xl font-light text-black mb-6">No Products Found</h2>
      <p className="text-xl text-gray-400 font-light mb-8">
        Try adjusting your filters or search terms to find what you're looking for.
      </p>
      <button
        onClick={resetFilters}
        className="px-8 py-4 bg-black text-white hover:bg-pink-500 font-light transition-all duration-300"
      >
        Clear All Filters
      </button>
    </div>
  );
}