// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useProductStore } from '@/store/useProductStore';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import ProductToolbar from '@/components/ProductToolbar';
import ActiveFilters from '@/components/ActiveFilters';
import EmptyState from '@/components/EmptyState';
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
      <NavbarD />

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          
          <div className="fixed  inset-y-0 left-0 w-full max-w-sm bg-white z-50 overflow-y-auto transform transition-transform duration-300 lg:hidden shadow-xl">
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
              <FilterSidebar />
            </div>
          </div>
        </>
      )}

      <section className="pt-6 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-black mb-2">
              All Products
            </h1>
            <p className="text-gray-500 font-light text-sm sm:text-base">
              Discover our latest collection
            </p>
          </div>

          <div className="flex gap-15 lg:gap-20">
            {/* Desktop Sidebar */}
            {showFilters && (
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-6">
                  <FilterSidebar />
                </div>
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Mobile Actions Bar */}
              <div className="lg:hidden mb-6">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-none hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                    </svg>
                    <span className="text-sm font-light">Sort & Filter</span>
                  </button>
                  
                  <button
                    onClick={() => {/* Toggle view mode */}}
                    className="p-3 border border-gray-200 rounded-none hover:border-gray-400 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Desktop Toolbar */}
              <div className="hidden lg:block mb-6">
                <ProductToolbar />
              </div>

              <ActiveFilters />

              {/* Product Grid */}
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                  {Array.from({ length: 8 }).map((_, i) => (
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
                <EmptyState />
              ) : (
                <>
                  {/* Fashion Brand Style Grid - 2 products on mobile, 3-4 on larger screens */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        viewMode="grid"
           
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {filteredProducts.length > 0 && (
                    <div className="mt-12 text-center">
                      <button className="inline-flex items-center px-8 py-3 border border-black text-black hover:bg-black hover:text-white font-light transition-all duration-300 text-sm tracking-wide">
                        LOAD MORE
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Results Count - Mobile */}
              {!isLoading && filteredProducts.length > 0 && (
                <div className="lg:hidden mt-8 text-center">
                  <p className="text-xs text-gray-500 font-light">
                    Showing {filteredProducts.length} products
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
