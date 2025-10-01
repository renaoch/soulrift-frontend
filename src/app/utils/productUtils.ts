// utils/productUtils.ts
import { Product } from '@/store/useProductStore';

/**
 * Generate product slug from name
 */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Format price with currency
 */
export function formatPrice(price: number, currency: string = '₹'): string {
  return `${currency}${price.toFixed(2)}`;
}

/**
 * Calculate discount percentage
 */
export function calculateDiscount(price: number, originalPrice: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Check if product is in stock
 */
export function isInStock(product: Product): boolean {
  return product.is_active && product.stock_quantity > 0;
}

/**
 * Get stock status message
 */
export function getStockStatus(product: Product): string {
  if (!product.is_active) return 'Unavailable';
  if (product.stock_quantity === 0) return 'Out of Stock';
  if (product.stock_quantity < 10) return `Only ${product.stock_quantity} left`;
  return 'In Stock';
}

/**
 * Get color hex code from color name
 */
export function getColorHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    Black: '#000000',
    White: '#FFFFFF',
    Gray: '#9CA3AF',
    Grey: '#9CA3AF',
    Navy: '#1E3A8A',
    Blue: '#3B82F6',
    Red: '#EF4444',
    Green: '#10B981',
    Yellow: '#F59E0B',
    Pink: '#EC4899',
    Purple: '#A855F7',
    Orange: '#F97316',
    Brown: '#92400E',
    Beige: '#D4A373',
  };

  return colorMap[colorName] || '#000000';
}

/**
 * Sort products by various criteria
 */
export function sortProducts(
  products: Product[],
  sortBy: string
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'rating':
      return sorted.sort((a, b) => b.average_rating - a.average_rating);
    case 'newest':
      return sorted.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    default:
      return sorted;
  }
}

/**
 * Filter products based on search query
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query) return products;

  const lowerQuery = query.toLowerCase();
  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      product.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get unique values from product array
 */
export function getUniqueValues<T extends keyof Product>(
  products: Product[],
  key: T
): Array<Product[T] extends Array<infer U> ? U : Product[T]> {
  const values = products.flatMap((product) => {
    const value = product[key];
    return Array.isArray(value) ? value : [value];
  });

  return Array.from(new Set(values)) as any;
}

/**
 * Group products by category
 */
export function groupByCategory(products: Product[]): Record<string, Product[]> {
  return products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {} as Record<string, Product[]>);
}

/**
 * Calculate average rating from reviews
 */
export function calculateAverageRating(reviews: any[]): number {
  if (!reviews || reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

/**
 * Get price range from products
 */
export function getPriceRange(products: Product[]): [number, number] {
  if (products.length === 0) return [0, 10000];
  
  const prices = products.map((p) => p.price);
  return [Math.min(...prices), Math.max(...prices)];
}

/**
 * Debounce function for search
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}