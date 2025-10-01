// store/useProductStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { apiClient } from '../app/api/client';

// Types
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  stock_quantity: number;
  sku: string;
  tags: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
  product_reviews: any[];
  average_rating: number;
}

export interface ApiResponse {
  success: boolean;
  data: {
    products: Product[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface FilterState {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  rating: number;
  availability: string[];
  sortBy: string;
  searchQuery: string;
}

interface ProductStore {
  // State
  products: Product[];
  filteredProducts: Product[];
  filters: FilterState;
  isLoading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  viewMode: 'grid' | 'list';
  showFilters: boolean;

  // Actions
  fetchProducts: (page?: number, limit?: number) => Promise<void>;
  setProducts: (products: Product[]) => void;
  setFilters: (filters: Partial<FilterState>) => void;
  resetFilters: () => void;
  toggleFilter: (filterType: keyof FilterState, value: string) => void;
  applyFilters: () => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  toggleShowFilters: () => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: string) => void;
  getActiveFiltersCount: () => number;
}

const initialFilters: FilterState = {
  categories: [],
  priceRange: [0, 10000],
  colors: [],
  sizes: [],
  rating: 0,
  availability: [],
  sortBy: 'featured',
  searchQuery: '',
};

export const useProductStore = create<ProductStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial State
        products: [],
        filteredProducts: [],
        filters: initialFilters,
        isLoading: false,
        error: null,
        pagination: {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
        viewMode: 'grid',
        showFilters: true,

        // Fetch Products from API using your API client
        fetchProducts: async (page = 1, limit = 10) => {
          set({ isLoading: true, error: null });
          try {
            const data = await apiClient.getProducts({ page, limit });

            if (data.success) {
              set({
                products: data.data.products,
                pagination: data.data.pagination,
                isLoading: false,
              });
              get().applyFilters();
            } else {
              throw new Error('API returned unsuccessful response');
            }
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Unknown error',
              isLoading: false,
            });
          }
        },

        // Set Products (for manual override)
        setProducts: (products) => {
          set({ products });
          get().applyFilters();
        },

        // Set Filters
        setFilters: (newFilters) => {
          set((state) => ({
            filters: { ...state.filters, ...newFilters },
          }));
          get().applyFilters();
        },

        // Reset Filters
        resetFilters: () => {
          set({ filters: initialFilters });
          get().applyFilters();
        },

        // Toggle Filter
        toggleFilter: (filterType, value) => {
          const currentFilters = get().filters;
          const currentValues = currentFilters[filterType] as string[];

          if (Array.isArray(currentValues)) {
            const newValues = currentValues.includes(value)
              ? currentValues.filter((v) => v !== value)
              : [...currentValues, value];

            set((state) => ({
              filters: {
                ...state.filters,
                [filterType]: newValues,
              },
            }));
            get().applyFilters();
          }
        },

        // Apply Filters
        applyFilters: () => {
          const { products, filters } = get();
          let filtered = [...products];

          // Search Query
          if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            filtered = filtered.filter(
              (product) =>
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.tags.some((tag) => tag.toLowerCase().includes(query))
            );
          }

          // Category Filter
          if (filters.categories.length > 0) {
            filtered = filtered.filter((product) =>
              filters.categories.includes(product.category)
            );
          }

          // Price Range Filter
          filtered = filtered.filter(
            (product) =>
              product.price >= filters.priceRange[0] &&
              product.price <= filters.priceRange[1]
          );

          // Color Filter
          if (filters.colors.length > 0) {
            filtered = filtered.filter((product) =>
              product.colors.some((color) => filters.colors.includes(color))
            );
          }

          // Size Filter
          if (filters.sizes.length > 0) {
            filtered = filtered.filter((product) =>
              product.sizes.some((size) => filters.sizes.includes(size))
            );
          }

          // Rating Filter
          if (filters.rating > 0) {
            filtered = filtered.filter(
              (product) => product.average_rating >= filters.rating
            );
          }

          // Availability Filter
          if (filters.availability.length > 0) {
            filtered = filtered.filter((product) => {
              if (
                filters.availability.includes('in-stock') &&
                product.stock_quantity <= 0
              )
                return false;
              if (
                filters.availability.includes('out-of-stock') &&
                product.stock_quantity > 0
              )
                return false;
              return true;
            });
          }

          // Sort Products
          switch (filters.sortBy) {
            case 'price-low':
              filtered.sort((a, b) => a.price - b.price);
              break;
            case 'price-high':
              filtered.sort((a, b) => b.price - a.price);
              break;
            case 'name':
              filtered.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'rating':
              filtered.sort((a, b) => b.average_rating - a.average_rating);
              break;
            case 'newest':
              filtered.sort(
                (a, b) =>
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
              );
              break;
            default:
              // featured - keep original order
              break;
          }

          set({ filteredProducts: filtered });
        },

        // Set View Mode
        setViewMode: (mode) => {
          set({ viewMode: mode });
        },

        // Toggle Show Filters
        toggleShowFilters: () => {
          set((state) => ({ showFilters: !state.showFilters }));
        },

        // Set Search Query
        setSearchQuery: (query) => {
          set((state) => ({
            filters: { ...state.filters, searchQuery: query },
          }));
          get().applyFilters();
        },

        // Set Sort By
        setSortBy: (sortBy) => {
          set((state) => ({
            filters: { ...state.filters, sortBy },
          }));
          get().applyFilters();
        },

        // Get Active Filters Count
        getActiveFiltersCount: () => {
          const { filters } = get();
          return (
            filters.categories.length +
            filters.colors.length +
            filters.sizes.length +
            filters.availability.length +
            (filters.rating > 0 ? 1 : 0) +
            (filters.searchQuery ? 1 : 0)
          );
        },
      }),
      {
        name: 'product-store',
        partialize: (state) => ({
          viewMode: state.viewMode,
          showFilters: state.showFilters,
        }),
      }
    )
  )
);