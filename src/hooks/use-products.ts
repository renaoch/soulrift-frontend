// hooks/useProducts.ts
import { useEffect } from 'react';
import { useProductStore } from '@/store/useProductStore';

/**
 * Custom hook to manage product fetching with automatic loading
 */
export function useProducts(autoFetch = true) {
  const store = useProductStore();

  useEffect(() => {
    if (autoFetch && store.products.length === 0 && !store.isLoading) {
      store.fetchProducts();
    }
  }, [autoFetch, store]);

  return store;
}

/**
 * Hook to get product by ID
 */
export function useProduct(productId: string) {
  const { products, isLoading, error } = useProductStore();
  const product = products.find((p) => p.id === productId);

  return { product, isLoading, error };
}

/**
 * Hook to get product by slug
 */
export function useProductBySlug(slug: string) {
  const { products, isLoading, error } = useProductStore();
  const product = products.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, '-') === slug
  );

  return { product, isLoading, error };
}

/**
 * Hook for wishlist functionality
 */
export function useWishlist() {
  // This can be extended with actual wishlist state management
  const addToWishlist = (productId: string) => {
    console.log('Added to wishlist:', productId);
    // Implement wishlist logic
  };

  const removeFromWishlist = (productId: string) => {
    console.log('Removed from wishlist:', productId);
    // Implement wishlist logic
  };

  return { addToWishlist, removeFromWishlist };
}

/**
 * Hook for cart functionality
 */
export function useCart() {
  const addToCart = (productId: string, quantity: number = 1) => {
    console.log('Added to cart:', productId, quantity);
    // Implement cart logic
  };

  return { addToCart };
}