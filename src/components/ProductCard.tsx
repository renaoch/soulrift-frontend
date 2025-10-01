// components/products/ProductCard.tsx
// 'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { Product } from '@/store/useProductStore';

interface ProductCardProps {
  product: Product;
  viewMode: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const inStock = product.stock_quantity > 0;
  const slug = product.name.toLowerCase().replace(/\s+/g, '-');

  return (
    <div
      className={`bg-white border border-gray-100 p-6 hover:shadow-lg hover:border-pink-200 hover:-translate-y-1 transition-all duration-300 group ${
        viewMode === 'list' ? 'flex gap-6' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div
        className={`relative bg-gray-50 ${
          viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-square mb-4'
        }`}
      >
        <Image
          src={product.images[0] || '/api/placeholder/400/400'}
          alt={product.name}
          fill
          className="object-cover"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {!inStock && (
            <span className="bg-gray-500 text-white px-2 py-1 text-xs font-light">
              OUT OF STOCK
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div
          className={`absolute top-3 right-3 flex flex-col gap-2 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="bg-white/90 backdrop-blur-sm p-2 hover:bg-white transition-all duration-300"
          >
            <Heart
              className={`w-4 h-4 ${
                isLiked ? 'text-pink-500 fill-current' : 'text-gray-600'
              }`}
            />
          </button>
          <Link href={`/products/${slug}`}>
            <button className="bg-white/90 backdrop-blur-sm p-2 hover:bg-white transition-all duration-300">
              <Eye className="w-4 h-4 text-gray-600" />
            </button>
          </Link>
        </div>

        {/* Quick Add to Cart */}
        {isHovered && inStock && (
          <div className="absolute bottom-3 left-3 right-3">
            <button className="w-full px-4 py-2 bg-black text-white hover:bg-pink-500 font-light text-sm transition-all duration-300 flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              Quick Add
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className={`${viewMode === 'list' ? 'flex-grow' : ''}`}>
        <div className="space-y-3">
          {/* Category */}
          <div className="text-xs text-gray-400 font-light uppercase tracking-wider">
            {product.category}
          </div>

          {/* Name */}
          <Link href={`/products/${slug}`}>
            <h3 className="text-lg font-light text-black hover:text-pink-500 transition-colors duration-300">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.average_rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400 font-light">
              {product.average_rating.toFixed(1)} ({product.product_reviews.length})
            </span>
          </div>

          {/* Colors */}
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color) => (
              <div
                key={color}
                className="w-4 h-4 border border-gray-200"
                style={{
                  backgroundColor:
                    color === 'Black'
                      ? '#000000'
                      : color === 'White'
                      ? '#FFFFFF'
                      : color === 'Gray'
                      ? '#9CA3AF'
                      : color === 'Navy'
                      ? '#1E3A8A'
                      : color === 'Blue'
                      ? '#3B82F6'
                      : '#000000',
                }}
                title={color}
              />
            ))}
            {product.colors.length > 3 && (
              <span className="text-xs text-gray-400 font-light ml-1">
                +{product.colors.length - 3}
              </span>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-light text-black">₹{product.price}</span>
          </div>

          {/* SKU & Stock (List view only) */}
          {viewMode === 'list' && (
            <div className="text-sm text-gray-600 font-light">
              <div>SKU: {product.sku}</div>
              <div>Stock: {product.stock_quantity} units</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}