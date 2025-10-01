import { Product } from '@/types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'classic-white-tee',
    title: 'Classic White Essential Tee',
    description: 'A timeless wardrobe staple crafted from premium 100% organic cotton. This classic white tee features a comfortable relaxed fit, reinforced seams, and a soft-touch finish that gets better with every wash.',
    price: 2999, // $29.99
    compareAtPrice: 3999,
    currency: 'USD',
    images: [
      {
        id: '1-1',
        url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
        alt: 'Classic White Essential Tee - Front View',
        width: 800,
        height: 1000,
        color: 'white'
      },
      {
        id: '1-2',
        url: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=1000&fit=crop',
        alt: 'Classic White Essential Tee - Back View',
        width: 800,
        height: 1000,
        color: 'white'
      }
    ],
    sizes: [
      { name: 'Extra Small', value: 'XS', inStock: true, sku: 'CWT-XS-001' },
      { name: 'Small', value: 'S', inStock: true, sku: 'CWT-S-001' },
      { name: 'Medium', value: 'M', inStock: true, sku: 'CWT-M-001' },
      { name: 'Large', value: 'L', inStock: true, sku: 'CWT-L-001' },
      { name: 'Extra Large', value: 'XL', inStock: false, sku: 'CWT-XL-001' },
      { name: 'Double Extra Large', value: '2XL', inStock: true, sku: 'CWT-2XL-001' }
    ],
    colors: [
      {
        name: 'White',
        value: 'white',
        hex: '#FFFFFF',
        images: [
          {
            id: '1-1',
            url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop',
            alt: 'Classic White Essential Tee',
            width: 800,
            height: 1000
          }
        ]
      }
    ],
    tags: ['basics', 'cotton', 'everyday', 'classic'],
    category: 'essentials',
    rating: 4.8,
    reviewsCount: 127,
    inStock: true,
    featured: true,
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  },
  {
    id: '2',
    slug: 'midnight-black-crew',
    title: 'Midnight Black Crew Neck',
    description: 'Sophisticated and versatile, this midnight black crew neck tee is perfect for layering or wearing on its own. Made from a premium cotton blend with a subtle matte finish.',
    price: 3499,
    currency: 'USD',
    images: [
      {
        id: '2-1',
        url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop',
        alt: 'Midnight Black Crew Neck - Front View',
        width: 800,
        height: 1000,
        color: 'black'
      }
    ],
    sizes: [
      { name: 'Small', value: 'S', inStock: true, sku: 'MBC-S-002' },
      { name: 'Medium', value: 'M', inStock: true, sku: 'MBC-M-002' },
      { name: 'Large', value: 'L', inStock: true, sku: 'MBC-L-002' },
      { name: 'Extra Large', value: 'XL', inStock: true, sku: 'MBC-XL-002' }
    ],
    colors: [
      {
        name: 'Black',
        value: 'black',
        hex: '#000000',
        images: [
          {
            id: '2-1',
            url: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&h=1000&fit=crop',
            alt: 'Midnight Black Crew Neck',
            width: 800,
            height: 1000
          }
        ]
      }
    ],
    tags: ['basics', 'black', 'crew-neck', 'versatile'],
    category: 'essentials',
    rating: 4.7,
    reviewsCount: 89,
    inStock: true,
    featured: true,
    createdAt: '2024-01-16T00:00:00Z',
    updatedAt: '2024-01-16T00:00:00Z'
  },
  {
    id: '3',
    slug: 'sunset-orange-vintage',
    title: 'Sunset Orange Vintage Wash',
    description: 'Embrace retro vibes with this sunset orange tee featuring a unique vintage wash treatment. Each piece is individually processed for a one-of-a-kind look and feel.',
    price: 3999,
    currency: 'USD',
    images: [
      {
        id: '3-1',
        url: 'https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=800&h=1000&fit=crop',
        alt: 'Sunset Orange Vintage Wash - Front View',
        width: 800,
        height: 1000,
        color: 'orange'
      }
    ],
    sizes: [
      { name: 'Extra Small', value: 'XS', inStock: false, sku: 'SOV-XS-003' },
      { name: 'Small', value: 'S', inStock: true, sku: 'SOV-S-003' },
      { name: 'Medium', value: 'M', inStock: true, sku: 'SOV-M-003' },
      { name: 'Large', value: 'L', inStock: true, sku: 'SOV-L-003' },
      { name: 'Extra Large', value: 'XL', inStock: true, sku: 'SOV-XL-003' }
    ],
    colors: [
      {
        name: 'Orange',
        value: 'orange',
        hex: '#FF6B35',
        images: [
          {
            id: '3-1',
            url: 'https://images.unsplash.com/photo-1583743814966-8936f37f4ec2?w=800&h=1000&fit=crop',
            alt: 'Sunset Orange Vintage Wash',
            width: 800,
            height: 1000
          }
        ]
      }
    ],
    tags: ['vintage', 'orange', 'retro', 'unique'],
    category: 'vintage',
    rating: 4.6,
    reviewsCount: 72,
    inStock: true,
    featured: false,
    createdAt: '2024-01-17T00:00:00Z',
    updatedAt: '2024-01-17T00:00:00Z'
  },
  {
    id: '4',
    slug: 'forest-green-organic',
    title: 'Forest Green Organic Blend',
    description: 'Sustainable fashion meets style in this forest green tee made from 100% organic cotton. Featuring eco-friendly dyes and ethical manufacturing processes.',
    price: 4299,
    currency: 'USD',
    images: [
      {
        id: '4-1',
        url: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&h=1000&fit=crop',
        alt: 'Forest Green Organic Blend - Front View',
        width: 800,
        height: 1000,
        color: 'green'
      }
    ],
    sizes: [
      { name: 'Small', value: 'S', inStock: true, sku: 'FGO-S-004' },
      { name: 'Medium', value: 'M', inStock: true, sku: 'FGO-M-004' },
      { name: 'Large', value: 'L', inStock: false, sku: 'FGO-L-004' },
      { name: 'Extra Large', value: 'XL', inStock: true, sku: 'FGO-XL-004' },
      { name: 'Double Extra Large', value: '2XL', inStock: true, sku: 'FGO-2XL-004' }
    ],
    colors: [
      {
        name: 'Forest Green',
        value: 'forest-green',
        hex: '#355E3B',
        images: [
          {
            id: '4-1',
            url: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?w=800&h=1000&fit=crop',
            alt: 'Forest Green Organic Blend',
            width: 800,
            height: 1000
          }
        ]
      }
    ],
    tags: ['organic', 'green', 'sustainable', 'eco-friendly'],
    category: 'sustainable',
    rating: 4.9,
    reviewsCount: 156,
    inStock: true,
    featured: true,
    createdAt: '2024-01-18T00:00:00Z',
    updatedAt: '2024-01-18T00:00:00Z'
  },
  {
    id: '5',
    slug: 'navy-blue-premium',
    title: 'Navy Blue Premium Fit',
    description: 'Elevate your casual wardrobe with this navy blue premium tee. Features a tailored fit, reinforced collar, and superior fabric that maintains its shape wash after wash.',
    price: 3799,
    currency: 'USD',
    images: [
      {
        id: '5-1',
        url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=1000&fit=crop',
        alt: 'Navy Blue Premium Fit - Front View',
        width: 800,
        height: 1000,
        color: 'navy'
      }
    ],
    sizes: [
      { name: 'Extra Small', value: 'XS', inStock: true, sku: 'NBP-XS-005' },
      { name: 'Small', value: 'S', inStock: true, sku: 'NBP-S-005' },
      { name: 'Medium', value: 'M', inStock: true, sku: 'NBP-M-005' },
      { name: 'Large', value: 'L', inStock: true, sku: 'NBP-L-005' },
      { name: 'Extra Large', value: 'XL', inStock: true, sku: 'NBP-XL-005' }
    ],
    colors: [
      {
        name: 'Navy Blue',
        value: 'navy',
        hex: '#000080',
        images: [
          {
            id: '5-1',
            url: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=1000&fit=crop',
            alt: 'Navy Blue Premium Fit',
            width: 800,
            height: 1000
          }
        ]
      }
    ],
    tags: ['premium', 'navy', 'tailored', 'quality'],
    category: 'premium',
    rating: 4.8,
    reviewsCount: 93,
    inStock: true,
    featured: false,
    createdAt: '2024-01-19T00:00:00Z',
    updatedAt: '2024-01-19T00:00:00Z'
  },
  {
    id: '6',
    slug: 'charcoal-heather-soft',
    title: 'Charcoal Heather Soft Touch',
    description: 'Experience ultimate comfort with this charcoal heather tee featuring an incredibly soft tri-blend fabric. Perfect for lounging or casual outings.',
    price: 3299,
    currency: 'USD',
    images: [
      {
        id: '6-1',
        url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop',
        alt: 'Charcoal Heather Soft Touch - Front View',
        width: 800,
        height: 1000,
        color: 'charcoal'
      }
    ],
    sizes: [
      { name: 'Small', value: 'S', inStock: true, sku: 'CHS-S-006' },
      { name: 'Medium', value: 'M', inStock: true, sku: 'CHS-M-006' },
      { name: 'Large', value: 'L', inStock: true, sku: 'CHS-L-006' },
      { name: 'Extra Large', value: 'XL', inStock: false, sku: 'CHS-XL-006' },
      { name: 'Double Extra Large', value: '2XL', inStock: true, sku: 'CHS-2XL-006' }
    ],
    colors: [
      {
        name: 'Charcoal Heather',
        value: 'charcoal',
        hex: '#36454F',
        images: [
          {
            id: '6-1',
            url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&h=1000&fit=crop',
            alt: 'Charcoal Heather Soft Touch',
            width: 800,
            height: 1000
          }
        ]
      }
    ],
    tags: ['soft', 'charcoal', 'comfort', 'tri-blend'],
    category: 'comfort',
    rating: 4.7,
    reviewsCount: 108,
    inStock: true,
    featured: false,
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-01-20T00:00:00Z'
  },
  // Continue with more products... (truncated for brevity, but would include 6 more products)
];

export const CATEGORIES = [
  { id: 'essentials', name: 'Essentials', slug: 'essentials' },
  { id: 'vintage', name: 'Vintage', slug: 'vintage' },
  { id: 'sustainable', name: 'Sustainable', slug: 'sustainable' },
  { id: 'premium', name: 'Premium', slug: 'premium' },
  { id: 'comfort', name: 'Comfort', slug: 'comfort' },
];

export const FEATURED_PRODUCTS = PRODUCTS.filter(product => product.featured);