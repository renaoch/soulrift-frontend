export interface Product {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number; // in cents
    compareAtPrice?: number; // in cents
    currency: string;
    images: ProductImage[];
    sizes: ProductSize[];
    colors: ProductColor[];
    tags: string[];
    category: string;
    rating: number;
    reviewsCount: number;
    inStock: boolean;
    featured: boolean;
    createdAt: string;
    updatedAt: string;
  }

  export interface ProductImage {
    id: string;
    url: string;
    alt: string;
    width: number;
    height: number;
    color?: string;
  }

  export interface ProductSize {
    name: string;
    value: string;
    inStock: boolean;
    sku: string;
  }

  export interface ProductColor {
    name: string;
    value: string;
    hex: string;
    images: ProductImage[];
  }

  export interface CartItem {
    id: string;
    productId: string;
    slug: string;
    title: string;
    price: number;
    image: ProductImage;
    size: string;
    color: string;
    quantity: number;
    sku: string;
  }

  export interface Cart {
    items: CartItem[];
    total: number;
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    itemsCount: number;
  }

  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
  }

  export interface Address {
    id: string;
    firstName: string;
    lastName: string;
    company?: string;
    address1: string;
    address2?: string;
    city: string;
    province: string;
    country: string;
    zip: string;
    phone?: string;
    isDefault: boolean;
  }

  export interface Order {
    id: string;
    orderNumber: string;
    email: string;
    phone?: string;
    total: number;
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    currency: string;
    status: OrderStatus;
    paymentStatus: PaymentStatus;
    fulfillmentStatus: FulfillmentStatus;
    lineItems: CartItem[];
    shippingAddress: Address;
    billingAddress: Address;
    createdAt: string;
    updatedAt: string;
  }

  export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded';
  export type FulfillmentStatus = 'pending' | 'processing' | 'shipped' | 'delivered';

  export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
  }

  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  }

  export interface GetProductsParams {
    page?: number;
    limit?: number;
    category?: string;
    tags?: string[];
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
    sortBy?: 'title' | 'price' | 'createdAt' | 'rating';
    sortOrder?: 'asc' | 'desc';
    search?: string;
  }

  export interface PromoCode {
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minimumAmount?: number;
    expiresAt?: string;
    usageLimit?: number;
    usageCount: number;
    active: boolean;
  }

  export interface CheckoutData {
    email: string;
    shippingAddress: Omit<Address, 'id' | 'isDefault'>;
    billingAddress: Omit<Address, 'id' | 'isDefault'>;
    paymentMethod: string;
    promoCode?: string;
  }

  export interface Newsletter {
    email: string;
    subscribedAt: string;
    tags?: string[];
  }

  export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: string;
  }