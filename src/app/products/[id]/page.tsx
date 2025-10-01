'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Share2,
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Sparkles,
  ZoomIn,
  Check,
  X,
  ArrowRight,
  Eye,
  ChevronDown
} from 'lucide-react';
import "../../globals.css"
// Complete interfaces
interface ProductColor {
  name: string;
  value: string;
  inStock: boolean;
  hexCode: string;
}

interface ProductSize {
  name: string;
  inStock: boolean;
  measurements?: string;
}

interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpfulCount?: number;
  images?: string[];
}

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  description: string;
  shortDescription?: string;
  features: string[];
  specifications: Record<string, string>;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  colors: ProductColor[];
  sizes: ProductSize[];
  materials: string[];
  reviews: ProductReview[];
  tags?: string[];
  sku?: string;
  weight?: string;
  dimensions?: string;
  careInstructions?: string[];
}

// Mock data
const mockProduct: Product = {
  id: '1',
  name: 'Premium Cotton T-Shirt',
  slug: 'premium-cotton-tshirt',
  price: 49,
  originalPrice: 69,
  images: [
    '/thirtplaceholderpic-1.avif',
    '/tshirtplaceholderpic-2.avif', 
    '/tshirtplaceholderpic-3.avif',
    '/tshirtplaceholderpic-4.avif'
  ],
  category: 'T-Shirts',
  subcategory: 'Premium',
  shortDescription: 'Crafted from 100% organic cotton for ultimate comfort and style.',
  description: 'Experience unparalleled comfort with our Premium Cotton T-Shirt. Made from carefully selected organic cotton fibers, this shirt offers a perfect blend of softness, durability, and breathability. The classic fit works for any occasion, while the premium construction ensures it maintains its shape and color wash after wash.',
  features: [
    '100% Organic Cotton Construction',
    'Pre-shrunk for Consistent Fit', 
    'Reinforced Collar and Seams',
    'Eco-Friendly Dyes',
    'Machine Washable'
  ],
  specifications: {
    'Material': '100% Organic Cotton',
    'Weight': '180 GSM',
    'Fit': 'Classic Regular',
    'Neckline': 'Crew Neck',
    'Care': 'Machine Wash Cold',
    'Country of Origin': 'India',
    'SKU': 'PCT-001'
  },
  rating: 4.7,
  reviewCount: 89,
  inStock: true,
  stockCount: 24,
  colors: [
    { name: 'Classic Black', value: '#000000', inStock: true, hexCode: '#000000' },
    { name: 'Pure White', value: '#FFFFFF', inStock: true, hexCode: '#FFFFFF' },
    { name: 'Charcoal Gray', value: '#4A4A4A', inStock: true, hexCode: '#4A4A4A' },
    { name: 'Navy Blue', value: '#1E3A8A', inStock: false, hexCode: '#1E3A8A' }
  ],
  sizes: [
    { name: 'XS', inStock: false, measurements: 'Chest: 32"' },
    { name: 'S', inStock: true, measurements: 'Chest: 36"' },
    { name: 'M', inStock: true, measurements: 'Chest: 40"' },
    { name: 'L', inStock: true, measurements: 'Chest: 44"' },
    { name: 'XL', inStock: true, measurements: 'Chest: 48"' },
    { name: 'XXL', inStock: false, measurements: 'Chest: 52"' }
  ],
  materials: ['Organic Cotton', 'Natural Fibers'],
  tags: ['organic', 'sustainable', 'comfortable', 'premium'],
  sku: 'PCT-001',
  weight: '180g',
  dimensions: 'Length varies by size',
  careInstructions: [
    'Machine wash cold with like colors',
    'Use mild detergent only', 
    'Tumble dry low heat',
    'Do not bleach',
    'Iron on low heat if needed'
  ],
  reviews: [
    {
      id: '1',
      author: 'Rahul K.',
      rating: 5,
      comment: 'Excellent quality! The fabric is incredibly soft and the fit is perfect. Definitely worth the price.',
      date: '2024-09-15',
      verified: true,
      helpfulCount: 12
    },
    {
      id: '2', 
      author: 'Priya S.',
      rating: 4,
      comment: 'Great t-shirt overall. Love the organic cotton feel. Only wish it came in more colors.',
      date: '2024-09-10',
      verified: true,
      helpfulCount: 8
    },
    {
      id: '3',
      author: 'Amit R.',
      rating: 5,
      comment: 'This is my third purchase. Quality is consistent and shipping is always fast.',
      date: '2024-09-05',
      verified: true,
      helpfulCount: 15
    }
  ]
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // State management
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    mockProduct.colors.find(c => c.inStock) || mockProduct.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const product = mockProduct;

  // Calculations
  const discountPercentage = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const totalPrice = product.price * quantity;
  const savings = product.originalPrice 
    ? (product.originalPrice - product.price) * quantity 
    : 0;

  // Handlers
  const handleAddToCart = async () => {
    if (!selectedSize || !product.inStock) return;
    
    setIsAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAddingToCart(false);
    
    console.log('Added to cart:', {
      productId: product.id,
      color: selectedColor,
      size: selectedSize,
      quantity
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize || !product.inStock) return;
    console.log('Buy now:', { product, selectedColor, selectedSize, quantity });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.shortDescription,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-500 font-light">
            <Link href="/" className="hover:text-black transition-colors duration-300">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-black transition-colors duration-300">
              Products
            </Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-black transition-colors duration-300">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-400">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="px-6 py-20 border-t border-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square bg-gray-50 border border-gray-100 group overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-500 cursor-zoom-in ${
                    isZoomed ? 'scale-150' : 'scale-100 group-hover:scale-105'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                  priority
                />

                {/* Controls */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button 
                    className="bg-white/90 backdrop-blur-sm border border-gray-200 p-3 hover:bg-white transition-all duration-300"
                    onClick={() => setIsZoomed(!isZoomed)}
                  >
                    <ZoomIn className="w-4 h-4 text-gray-600" />
                  </button>
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className="bg-white/90 backdrop-blur-sm border border-gray-200 p-3 hover:bg-white transition-all duration-300"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'text-pink-500 fill-current' : 'text-gray-600'}`} />
                  </button>
                </div>

                {/* Navigation dots */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        selectedImage === index ? 'bg-black' : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Discount badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 text-sm font-light">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square bg-gray-50 border-2 transition-all duration-300 hover:-translate-y-1 ${
                      selectedImage === index ? 'border-pink-500' : 'border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <Image src={image} alt={`View ${index + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Header Section */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-100 text-black px-3 py-1 text-xs font-light uppercase tracking-wider">
                    {product.category}
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleShare}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-all duration-300"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h1 className="text-6xl font-light text-black mb-6">{product.name}</h1>
                
                {product.shortDescription && (
                  <p className="text-xl text-gray-400 font-light mb-8">
                    {product.shortDescription}
                  </p>
                )}

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 font-light">{product.rating}</span>
                  <button 
                    onClick={() => setActiveTab('reviews')}
                    className="text-gray-400 hover:text-black font-light transition-colors duration-300"
                  >
                    {product.reviewCount} Reviews
                  </button>
                </div>

                {/* Pricing */}
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl font-light text-black">₹{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-2xl text-gray-400 line-through font-light">
                        ₹{product.originalPrice}
                      </span>
                      <span className="bg-pink-500 text-white px-3 py-1 text-sm font-light">
                        Save ₹{product.originalPrice - product.price}
                      </span>
                    </>
                  )}
                </div>

                {/* Stock */}
                {product.inStock && product.stockCount && (
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-400 font-light">
                      {product.stockCount} in stock
                    </span>
                  </div>
                )}
              </div>

              {/* Color Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-light text-black">
                  Color: <span className="text-gray-400">{selectedColor.name}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => color.inStock && setSelectedColor(color)}
                      disabled={!color.inStock}
                      className={`relative w-12 h-12 border-2 transition-all duration-300 ${
                        selectedColor.name === color.name
                          ? 'border-black scale-110'
                          : 'border-gray-200 hover:border-gray-300'
                      } ${!color.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                    >
                      {!color.inStock && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <X className="w-4 h-4 text-white" />
                        </div>
                      )}
                      {selectedColor.name === color.name && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white rounded-full flex items-center justify-center">
                          <Check className="w-2 h-2" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-light text-black">
                    Size: {selectedSize && <span className="text-gray-400">{selectedSize}</span>}
                  </h3>
                  <button 
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-sm text-gray-400 hover:text-black font-light transition-colors duration-300 flex items-center gap-1"
                  >
                    Size Guide <Eye className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size.name}
                      onClick={() => size.inStock && setSelectedSize(size.name)}
                      disabled={!size.inStock}
                      className={`h-12 border font-light transition-all duration-300 ${
                        selectedSize === size.name
                          ? 'border-black bg-black text-white'
                          : size.inStock
                          ? 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                          : 'border-gray-100 text-gray-300 cursor-not-allowed'
                      }`}
                    >
                      {size.name}
                    </button>
                  ))}
                </div>

                {/* Size guide */}
                {showSizeGuide && (
                  <div className="p-4 bg-gray-50 border border-gray-100">
                    <h4 className="font-medium text-black mb-3">Size Guide</h4>
                    <div className="space-y-2 text-sm text-gray-600 font-light">
                      {product.sizes.map((size) => (
                        <div key={size.name} className="flex justify-between">
                          <span>{size.name}</span>
                          <span>{size.measurements}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-4">
                <h3 className="text-lg font-light text-black">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-200">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-gray-400 hover:text-black hover:bg-gray-50 font-light transition-all duration-300"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 text-black font-light min-w-[60px] text-center border-x border-gray-200">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-gray-400 hover:text-black hover:bg-gray-50 font-light transition-all duration-300"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {quantity > 1 && (
                    <div className="text-gray-400 font-light">
                      Total: ₹{totalPrice.toFixed(2)}
                      {savings > 0 && (
                        <span className="text-green-600 ml-2">
                          (Save ₹{savings.toFixed(2)})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock || !selectedSize || isAddingToCart}
                  className="w-full px-8 py-4 bg-black text-white hover:bg-pink-500 font-light transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isAddingToCart ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart • ₹{totalPrice.toFixed(2)}
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  disabled={!product.inStock || !selectedSize}
                  className="w-full px-8 py-4 border border-gray-200 text-gray-600 hover:border-pink-500 hover:text-pink-500 font-light transition-all duration-300 disabled:opacity-50"
                >
                  Buy Now
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-pink-500 mx-auto flex items-center justify-center">
                    <Truck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-light text-black">Free Shipping</h3>
                  <p className="text-gray-400 font-light text-sm">On orders ₹999+</p>
                </div>
                
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-pink-500 mx-auto flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-light text-black">Quality Promise</h3>
                  <p className="text-gray-400 font-light text-sm">Premium materials</p>
                </div>
                
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 bg-pink-500 mx-auto flex items-center justify-center">
                    <RotateCcw className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-light text-black">Easy Returns</h3>
                  <p className="text-gray-400 font-light text-sm">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Tabs */}
      <section className="px-6 py-20 border-t border-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-black mb-4">Product Details</h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto">
              Everything you need to know about this product
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex justify-center border-b border-gray-100 mb-12">
            {[
              { id: 'description', label: 'Description' },
              { id: 'specifications', label: 'Details' },
              { id: 'reviews', label: `Reviews (${product.reviewCount})` },
              { id: 'care', label: 'Care Guide' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-8 py-4 font-light text-lg transition-all duration-300 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-black border-black'
                    : 'text-gray-400 border-transparent hover:text-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {activeTab === 'description' && (
              <div className="space-y-12">
                <div className="text-center">
                  <p className="text-xl text-gray-600 font-light leading-relaxed max-w-4xl mx-auto">
                    {product.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-2xl font-light text-black mb-8 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 mr-3 text-pink-500" />
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 text-gray-600 font-light">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-4 border-b border-gray-100">
                      <span className="text-gray-400 font-light">{key}</span>
                      <span className="text-black font-light">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-light text-black">Customer Reviews</h3>
                  <button className="px-6 py-3 border border-gray-200 text-gray-600 font-light hover:border-pink-500 hover:text-pink-500 transition-all duration-300">
                    Write a Review
                  </button>
                </div>

                {/* Review Summary */}
                <div className="bg-gray-50 p-8 mb-12">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-light text-black mb-2">{product.rating}</div>
                      <div className="flex items-center justify-center mb-2">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 font-light">
                        Based on {product.reviewCount} reviews
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const count = product.reviews.filter(r => Math.floor(r.rating) === rating).length;
                        const percentage = product.reviews.length > 0 ? (count / product.reviews.length) * 100 : 0;
                        return (
                          <div key={rating} className="flex items-center gap-4 mb-2">
                            <span className="text-sm font-light w-6">{rating}★</span>
                            <div className="flex-1 h-2 bg-gray-200">
                              <div 
                                className="h-full bg-yellow-400" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-500 font-light w-8">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div className="space-y-8">
                  {product.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className="font-light text-black">{review.author}</span>
                            {review.verified && (
                              <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-light rounded">
                                <Check className="w-3 h-3 inline mr-1" />
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center mb-3">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-400 font-light">{review.date}</span>
                      </div>
                      
                      <p className="text-gray-600 font-light leading-relaxed mb-4">
                        {review.comment}
                      </p>
                      
                      {review.helpfulCount && (
                        <div className="flex items-center gap-4 text-sm">
                          <button className="text-gray-500 hover:text-black font-light transition-colors duration-300">
                            Helpful ({review.helpfulCount})
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-lg font-light text-black mb-6">Washing & Cleaning</h4>
                    <ul className="space-y-3 text-gray-600 font-light">
                      {product.careInstructions?.slice(0, 3).map((instruction, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-light text-black mb-6">Drying & Storage</h4>
                    <ul className="space-y-3 text-gray-600 font-light">
                      {product.careInstructions?.slice(3).map((instruction, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0 mt-1" />
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-12 p-6 bg-gray-50 border border-gray-100">
                  <h5 className="font-medium text-black mb-3">💡 Pro Tip</h5>
                  <p className="text-gray-600 font-light">
                    For best results and longevity, always check the care label before washing. 
                    When in doubt, opt for gentler settings to preserve the fabric quality.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="px-6 py-20 border-t border-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-black mb-4">You Might Also Like</h2>
            <p className="text-xl text-gray-400 font-light">Handpicked products that complement your style</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="bg-white border border-gray-100 p-6 hover:shadow-lg hover:border-pink-200 hover:-translate-y-1 transition-all duration-300">
                <div className="aspect-square bg-gray-100 mb-4 group-hover:bg-gray-200 transition-colors duration-300"></div>
                <h3 className="text-lg font-light text-black mb-2">Related Product {i + 1}</h3>
                <p className="text-gray-400 font-light text-sm mb-4">{product.category}</p>
                <div className="flex items-center justify-between">
                  <span className="text-black font-light">₹{product.price + (i * 10)}</span>
                  <button className="px-4 py-2 bg-black text-white font-light text-sm hover:bg-pink-500 transition-all duration-300">
                    Quick Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
