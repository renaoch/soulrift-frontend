'use client';

import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import { Filters } from '@/components/Filters';
import ProductCard from '@/components/ProductCard';
import {
  IconGrid3x3,
  IconList,
  IconChevronDown
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import TShirtCategoryCarousel from '@/components/Carousel';
import { NavbarD } from '@/components/Navbar';
import '../globals.css';

export default function ProductsPage() {
  const {
    filteredProducts,
    isLoading,
    error,
    showFilters,
    viewMode,
    fetchProducts,
  } = useProductStore();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <NavbarD />
        <div className="px-4 sm:px-6 py-16">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-6">
              <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-black mb-3">
              Something went wrong
            </h2>
            <p className="text-gray-500 font-light mb-8 text-sm leading-relaxed">
              {error}
            </p>
            <button
              onClick={() => fetchProducts()}
              className="inline-flex items-center px-6 py-3 bg-black text-white hover:bg-gray-800 font-light transition-colors duration-200 text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">


      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto transform transition-transform duration-300 lg:hidden shadow-xl">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-5 py-4 flex items-center justify-between">
              <h2 className="text-lg font-medium text-black">Filters</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-50 rounded-full transition-colors"
                aria-label="Close filters"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-5">
              <Filters />
            </div>
          </div>
        </>
      )}

      {/* Hero Section */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="text-center mb-8 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-black mb-4 sm:mb-6 tracking-tight">
              Collection
            </h1>
            <p className="text-base sm:text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Curated essentials for the modern wardrobe
            </p>
          </div>
          <TShirtCategoryCarousel />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Desktop Sidebar */}
          {showFilters && (
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <div className="bg-white border border-gray-100 p-6 sm:p-8 sticky top-8">
                <Filters />
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1">
            {/* Clean Toolbar */}
            <div className="flex items-center justify-between mb-8 sm:mb-12 pb-4 sm:pb-6 border-b border-gray-100">
              <div>
                <span className="text-sm sm:text-base text-gray-600 font-light">
                  {isLoading ? 'Loading...' : `${filteredProducts.length} Products`}
                </span>
              </div>

              <div className="hidden sm:flex items-center gap-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
                  <span className="text-sm font-light">Sort by Price</span>
                  <IconChevronDown className="w-4 h-4" />
                </button>

                <div className="flex border border-gray-200">
                  <button className="p-2 bg-pink-500 text-white">
                    <IconGrid3x3 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-black">
                    <IconList className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Filter Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                <span className="font-light">Filter</span>
              </button>
            </div>

            {/* Products Grid with Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="group">
                    <div className="aspect-[3/4] bg-gray-100 animate-pulse mb-3" />
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-100 animate-pulse w-3/4" />
                      <div className="h-3 bg-gray-100 animate-pulse w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h2 className="text-2xl font-light text-black mb-4">No Products Found</h2>
                <p className="text-gray-400">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16">
                  {filteredProducts.map((product) => (
                    <ProductCard 
                                            key={product.id} 
                                            product={product} 
                                            viewMode="grid"
                                          
                                          />
                  ))}
                </div>

                {/* Load More Button */}
                {filteredProducts.length > 0 && (
                  <div className="flex justify-center items-center pt-8 sm:pt-12 border-t border-gray-100">
                    <button className="px-6 sm:px-8 py-3 sm:py-4 border border-black text-black hover:bg-black hover:text-white font-light transition-all duration-300 text-sm tracking-wide">
                      LOAD MORE
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
