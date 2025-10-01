import { Product, GetProductsParams, PaginatedResponse, ApiResponse } from '@/types';
import { PRODUCTS } from '@/data/products';

// artificial latency to mimic real network trips
const delay = (ms: number) => new Promise(r => setTimeout(r, ms));

export class CommerceAPI {
  private static baseURL = process.env.NEXT_PUBLIC_API_URL || '';

  /* --------------------------------------------------
     PRODUCTS
  -------------------------------------------------- */

  static async getProducts(params: GetProductsParams = {}): Promise<PaginatedResponse<Product>> {
    const {
      page      = 1,
      limit     = 12,
      category,
      tags,
      minPrice,
      maxPrice,
      inStock,
      sortBy    = 'createdAt',
      sortOrder = 'desc',
      search,
    } = params;

    await delay(300);

    // --- MOCK IMPLEMENTATION -------------------------
    let list = [...PRODUCTS];

    if (category) list = list.filter(p => p.category === category);
    if (tags?.length)
      list = list.filter(p => tags.some(tag => p.tags.includes(tag)));
    if (minPrice !== undefined) list = list.filter(p => p.price >= minPrice);
    if (maxPrice !== undefined) list = list.filter(p => p.price <= maxPrice);
    if (inStock !== undefined)  list = list.filter(p => p.inStock === inStock);

    if (search?.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some(t => t.toLowerCase().includes(q)),
      );
    }

    list.sort((a, b) => {
      const dir = sortOrder === 'asc' ? 1 : -1;
      switch (sortBy) {
        case 'title':      return dir * a.title.localeCompare(b.title);
        case 'price':      return dir * (a.price - b.price);
        case 'rating':     return dir * (a.rating - b.rating);
        default: // createdAt
          return dir * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      }
    });

    const total       = list.length;
    const totalPages  = Math.ceil(total / limit);
    const sliceStart  = (page - 1) * limit;
    const data        = list.slice(sliceStart, sliceStart + limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  static async getProductBySlug(slug: string) {
    await delay(200);
    return PRODUCTS.find(p => p.slug === slug) ?? null;
  }

  static async getProductById(id: string) {
    await delay(200);
    return PRODUCTS.find(p => p.id === id) ?? null;
  }

  static async searchProducts(q: string) {
    await delay(250);
    if (!q.trim()) return [];
    const s = q.toLowerCase();
    return PRODUCTS.filter(
      p =>
        p.title.toLowerCase().includes(s) ||
        p.description.toLowerCase().includes(s) ||
        p.tags.some(t => t.toLowerCase().includes(s)),
    );
  }

  static async getFeaturedProducts() {
    await delay(200);
    return PRODUCTS.filter(p => p.featured);
  }

  static async getRelatedProducts(id: string, limit = 4) {
    await delay(200);
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return [];
    return PRODUCTS.filter(
      p =>
        p.id !== id &&
        (p.category === prod.category ||
         p.tags.some(t => prod.tags.includes(t))),
    ).slice(0, limit);
  }

  /* --------------------------------------------------
     CHECK-OUT + PROMO
  -------------------------------------------------- */

  static async checkout(cart: unknown): Promise<ApiResponse<{ orderId: string }>> {
    await delay(1000);
    return {
      success: true,
      data: { orderId: `order_${Date.now()}` },
      message: 'Order placed successfully',
    };
  }

  static async validatePromoCode(code: string): Promise<ApiResponse<{ discount: number; type: 'percentage' | 'fixed' }>> {
    await delay(500);
    const promos = {
      SAVE10 : { discount: 10,  type: 'percentage' },
      WELCOME: { discount: 500, type: 'fixed' }, // $5
    } as const;

    const promo = promos[code.toUpperCase() as keyof typeof promos];
    return promo
      ? { success: true,  data: promo,                       message: 'Promo applied' }
      : { success: false, data: { discount: 0, type: 'fixed' }, error: 'Invalid code' };
  }
}

/* Shorthand re-exports */
export const {
  getProducts,
  getProductBySlug,
  getProductById,
  searchProducts,
  getFeaturedProducts,
  getRelatedProducts,
  checkout,
  validatePromoCode,
} = CommerceAPI;
