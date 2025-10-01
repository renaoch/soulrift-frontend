// api/client.ts
import { cacheManager } from '../../lib/cache/cache-manager';

interface ApiOptions {
  cache?: boolean;
  cacheTTL?: number;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
}

interface AuthResponse {
  success: boolean;
  message: string;
  user?: any;
  errors?: any[];
}

interface ProductsResponse {
  success: boolean;
  data: {
    products: any[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
  message?: string;
}

interface ProductResponse {
  success: boolean;
  data: any;
  message?: string;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(
    endpoint: string,
    options: ApiOptions & { body?: any } = {}
  ): Promise<T> {
    const {
      method = 'GET',
      body,
      headers = {},
      cache = false,
      cacheTTL = 300
    } = options;

    const cacheKey = `${method}:${endpoint}:${JSON.stringify(body)}`;
    
    // Check cache for GET requests
    if (method === 'GET' && cache) {
      const cached = cacheManager.get<T>(cacheKey);
      if (cached) return cached;
    }

    const config: RequestInit = {
      method,
      headers: { ...this.defaultHeaders, ...headers },
      credentials: 'include', // Important for cookies/sessions
    };

    if (body && method !== 'GET') {
      config.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Cache successful GET requests
      if (method === 'GET' && cache) {
        cacheManager.set(cacheKey, data, cacheTTL);
      }

      return data;
    } catch (error) {
      console.error(`API request failed: ${method} ${endpoint}`, error);
      throw error;
    }
  }

  // ============================================
  // AUTH METHODS
  // ============================================

  async register(userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/register', {
      method: 'POST',
      body: userData,
    });
    
    // Invalidate auth cache on successful registration
    if (response.success) {
      cacheManager.invalidate('auth:');
    }
    
    return response;
  }

  async login(credentials: {
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/login', {
      method: 'POST',
      body: credentials,
    });
    console.log("res from client.ts: ", response);
    
    // Invalidate auth cache on successful login
    if (response.success) {
      cacheManager.invalidate('auth:');
    }
    
    return response;
  }

  async logout(): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/api/auth/logout', {
      method: 'POST',
    });
    
    // Clear all cache on logout
    cacheManager.invalidate();
    
    return response;
  }

  async resetPassword(email: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/reset-password', {
      method: 'POST',
      body: { email },
    });
  }

  async updatePassword(data: {
    userId: string;
    password: string;
  }): Promise<AuthResponse> {
    return this.request<AuthResponse>('/api/auth/update-password', {
      method: 'POST',
      body: data,
    });
  }

  // ============================================
  // PRODUCT METHODS
  // ============================================

  async getProducts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }): Promise<ProductsResponse> {
    const queryParams = new URLSearchParams();
    
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.category) queryParams.append('category', params.category);
    if (params?.minPrice) queryParams.append('minPrice', params.minPrice.toString());
    if (params?.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
    if (params?.search) queryParams.append('search', params.search);
    if (params?.sortBy) queryParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) queryParams.append('sortOrder', params.sortOrder);

    const queryString = queryParams.toString();
    const endpoint = `/api/products${queryString ? `?${queryString}` : ''}`;

    return this.request<ProductsResponse>(endpoint, {
      method: 'GET',
      cache: true,
      cacheTTL: 300, // Cache for 5 minutes
    });
  }

  async getProductById(id: string): Promise<ProductResponse> {
    return this.request<ProductResponse>(`/api/products/${id}`, {
      method: 'GET',
      cache: true,
      cacheTTL: 600, // Cache for 10 minutes
    });
  }

  async getProductBySlug(slug: string): Promise<ProductResponse> {
    return this.request<ProductResponse>(`/api/products/slug/${slug}`, {
      method: 'GET',
      cache: true,
      cacheTTL: 600,
    });
  }

  async createProduct(productData: any): Promise<ProductResponse> {
    const response = await this.request<ProductResponse>('/api/products', {
      method: 'POST',
      body: productData,
    });

    // Invalidate products cache
    if (response.success) {
      cacheManager.invalidate('GET:/api/products');
    }

    return response;
  }

  async updateProduct(id: string, productData: any): Promise<ProductResponse> {
    const response = await this.request<ProductResponse>(`/api/products/${id}`, {
      method: 'PUT',
      body: productData,
    });

    // Invalidate products cache
    if (response.success) {
      cacheManager.invalidate('GET:/api/products');
      cacheManager.invalidate(`GET:/api/products/${id}`);
    }

    return response;
  }

  async deleteProduct(id: string): Promise<ProductResponse> {
    const response = await this.request<ProductResponse>(`/api/products/${id}`, {
      method: 'DELETE',
    });

    // Invalidate products cache
    if (response.success) {
      cacheManager.invalidate('GET:/api/products');
      cacheManager.invalidate(`GET:/api/products/${id}`);
    }

    return response;
  }

  async getFeaturedProducts(limit: number = 10): Promise<ProductsResponse> {
    return this.request<ProductsResponse>(`/api/products/featured?limit=${limit}`, {
      method: 'GET',
      cache: true,
      cacheTTL: 600,
    });
  }

  async getNewArrivals(limit: number = 10): Promise<ProductsResponse> {
    return this.request<ProductsResponse>(`/api/products/new-arrivals?limit=${limit}`, {
      method: 'GET',
      cache: true,
      cacheTTL: 300,
    });
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<ProductsResponse> {
    return this.request<ProductsResponse>(`/api/products/${productId}/related?limit=${limit}`, {
      method: 'GET',
      cache: true,
      cacheTTL: 600,
    });
  }

  // ============================================
  // CATEGORY METHODS
  // ============================================

  async getCategories(): Promise<any> {
    return this.request('/api/categories', {
      method: 'GET',
      cache: true,
      cacheTTL: 3600, // Cache for 1 hour
    });
  }

  // ============================================
  // REVIEW METHODS
  // ============================================

  async getProductReviews(productId: string): Promise<any> {
    return this.request(`/api/products/${productId}/reviews`, {
      method: 'GET',
      cache: true,
      cacheTTL: 300,
    });
  }

  async createReview(productId: string, reviewData: {
    rating: number;
    comment: string;
  }): Promise<any> {
    const response : any= await this.request(`/api/products/${productId}/reviews`, {
      method: 'POST',
      body: reviewData,
    });

    // Invalidate product and reviews cache
    if (response.success) {
      cacheManager.invalidate(`GET:/api/products/${productId}`);
      cacheManager.invalidate(`GET:/api/products/${productId}/reviews`);
    }

    return response;
  }

  // ============================================
  // CART METHODS
  // ============================================

  async getCart(): Promise<any> {
    return this.request('/api/cart', {
      method: 'GET',
    });
  }

  async addToCart(productId: string, quantity: number = 1, size?: string, color?: string): Promise<any> {
    return this.request('/api/cart/add', {
      method: 'POST',
      body: { productId, quantity, size, color },
    });
  }

  async updateCartItem(itemId: string, quantity: number): Promise<any> {
    return this.request(`/api/cart/update/${itemId}`, {
      method: 'PUT',
      body: { quantity },
    });
  }

  async removeFromCart(itemId: string): Promise<any> {
    return this.request(`/api/cart/remove/${itemId}`, {
      method: 'DELETE',
    });
  }

  async clearCart(): Promise<any> {
    return this.request('/api/cart/clear', {
      method: 'DELETE',
    });
  }

  // ============================================
  // WISHLIST METHODS
  // ============================================

  async getWishlist(): Promise<any> {
    return this.request('/api/wishlist', {
      method: 'GET',
      cache: true,
      cacheTTL: 300,
    });
  }

  async addToWishlist(productId: string): Promise<any> {
    const response :any = await this.request('/api/wishlist/add', {
      method: 'POST',
      body: { productId },
    });

    // Invalidate wishlist cache
    if (response.success) {
      cacheManager.invalidate('GET:/api/wishlist');
    }

    return response;
  }

  async removeFromWishlist(productId: string): Promise<any> {
    const response : any= await this.request(`/api/wishlist/remove/${productId}`, {
      method: 'DELETE',
    });

    // Invalidate wishlist cache
    if (response.success) {
      cacheManager.invalidate('GET:/api/wishlist');
    }

    return response;
  }
}

export const apiClient = new ApiClient();