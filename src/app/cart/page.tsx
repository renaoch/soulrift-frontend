'use client';
import '../globals.css'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Heart,
  Minus,
  Plus,
  X,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ArrowRight,
  Tag,
  Gift,
  Clock,
  Check,
  AlertCircle
} from 'lucide-react';

// Interfaces following your design system
interface CartItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  size: string;
  quantity: number;
  inStock: boolean;
  category: string;
  sku: string;
}

interface ShippingOption {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
  description: string;
}

interface PromoCode {
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  description: string;
}

// Mock cart data
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    slug: 'premium-cotton-tshirt',
    price: 49,
    originalPrice: 69,
    image: '/thirtplaceholderpic-1.avif',
    color: 'Classic Black',
    size: 'M',
    quantity: 2,
    inStock: true,
    category: 'T-Shirts',
    sku: 'PCT-001'
  },
  {
    id: '2',
    name: 'Vintage Graphic Tee',
    slug: 'vintage-graphic-tee',
    price: 39,
    originalPrice: 59,
    image: '/tshirtplaceholderpic-2.avif',
    color: 'Pure White',
    size: 'L',
    quantity: 1,
    inStock: true,
    category: 'T-Shirts',
    sku: 'VGT-002'
  },
  {
    id: '3',
    name: 'Minimalist Design Tee',
    slug: 'minimalist-design-tee',
    price: 45,
    image: '/tshirtplaceholderpic-3.avif',
    color: 'Charcoal Gray',
    size: 'S',
    quantity: 1,
    inStock: false,
    category: 'T-Shirts',
    sku: 'MDT-003'
  }
];

const shippingOptions: ShippingOption[] = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    price: 0,
    estimatedDays: '5-7 business days',
    description: 'Free shipping on orders over ₹999'
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 99,
    estimatedDays: '2-3 business days',
    description: 'Faster delivery with tracking'
  },
  {
    id: 'overnight',
    name: 'Overnight Delivery',
    price: 199,
    estimatedDays: '1 business day',
    description: 'Next-day delivery by 6 PM'
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(mockCartItems);
  const [selectedShipping, setSelectedShipping] = useState<string>('standard');
  const [promoCode, setPromoCode] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [showPromoField, setShowPromoField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSaveForLater, setShowSaveForLater] = useState<string | null>(null);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalSubtotal = cartItems.reduce((sum, item) => {
    const originalPrice = item.originalPrice || item.price;
    return sum + (originalPrice * item.quantity);
  }, 0);
  const totalSavings = originalSubtotal - subtotal;
  
  const selectedShippingOption = shippingOptions.find(option => option.id === selectedShipping);
  const shippingCost = subtotal >= 999 ? 0 : (selectedShippingOption?.price || 0);
  
  const promoDiscount = appliedPromo ? 
    (appliedPromo.type === 'percentage' ? subtotal * (appliedPromo.discount / 100) : appliedPromo.discount) : 0;
  
  const total = subtotal + shippingCost - promoDiscount;
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Handlers
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const moveToWishlist = (id: string) => {
    // Handle move to wishlist logic
    console.log('Moving to wishlist:', id);
    removeItem(id);
  };

  const saveForLater = (id: string) => {
    // Handle save for later logic
    console.log('Saving for later:', id);
    setShowSaveForLater(id);
    setTimeout(() => {
      removeItem(id);
      setShowSaveForLater(null);
    }, 1000);
  };

  const applyPromoCode = () => {
    // Mock promo code validation
    const validCodes: Record<string, PromoCode> = {
      'SAVE10': { code: 'SAVE10', discount: 10, type: 'percentage', description: '10% off your order' },
      'FIRST50': { code: 'FIRST50', discount: 50, type: 'fixed', description: '₹50 off first order' }
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setAppliedPromo(validCodes[promoCode.toUpperCase()]);
      setPromoCode('');
      setShowPromoField(false);
    } else {
      // Handle invalid promo code
      console.log('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  const handleCheckout = () => {
    setIsLoading(true);
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to checkout
      console.log('Proceeding to checkout');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <section className="px-6 py-20 border-t border-gray-100">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <div className="w-24 h-24 bg-gray-100 mx-auto mb-8 flex items-center justify-center rounded-full">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h1 className="text-6xl font-light text-black mb-6">Your Cart is Empty</h1>
              <p className="text-xl text-gray-400 font-light mb-12 max-w-2xl mx-auto">
                Looks like you haven't added anything to your cart yet. Start exploring our products and find something you love.
              </p>
              <Link href="/products">
                <button className="px-8 py-4 bg-black text-white hover:bg-pink-500 font-light transition-all duration-300">
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="px-6 py-20 border-t border-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-light text-black mb-6">Shopping Cart</h1>
            <p className="text-xl text-gray-400 font-light">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Bar */}
              <div className="bg-gray-50 p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-light text-gray-600">
                    {subtotal >= 999 ? 'You qualify for FREE shipping!' : `Add ₹${(999 - subtotal).toFixed(2)} more for FREE shipping`}
                  </span>
                  <span className="text-sm font-light text-gray-600">₹999</span>
                </div>
                <div className="w-full bg-gray-200 h-2">
                  <div 
                    className="bg-pink-500 h-2 transition-all duration-300"
                    style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 bg-gray-50 border border-gray-100 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <AlertCircle className="w-6 h-6 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-grow space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link href={`/products/${item.slug}`}>
                              <h3 className="text-lg font-light text-black hover:text-pink-500 transition-colors duration-300">
                                {item.name}
                              </h3>
                            </Link>
                            <div className="flex gap-4 text-sm text-gray-400 font-light mt-2">
                              <span>Color: {item.color}</span>
                              <span>Size: {item.size}</span>
                              <span>SKU: {item.sku}</span>
                            </div>
                            {!item.inStock && (
                              <div className="flex items-center gap-2 mt-2">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                <span className="text-sm text-red-500 font-light">Out of Stock</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors duration-300"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center">
                          {/* Quantity Controls */}
                          <div className="flex items-center border border-gray-200">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-2 text-gray-400 hover:text-black hover:bg-gray-50 font-light transition-all duration-300"
                              disabled={!item.inStock}
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-black font-light min-w-[60px] text-center border-x border-gray-200">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-2 text-gray-400 hover:text-black hover:bg-gray-50 font-light transition-all duration-300"
                              disabled={!item.inStock}
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <div className="flex items-center gap-3">
                              <span className="text-lg font-light text-black">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-400 line-through font-light">
                                  ₹{(item.originalPrice * item.quantity).toFixed(2)}
                                </span>
                              )}
                            </div>
                            <div className="text-sm text-gray-400 font-light">
                              ₹{item.price.toFixed(2)} each
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-6 text-sm">
                          <button
                            onClick={() => moveToWishlist(item.id)}
                            className="text-gray-400 hover:text-pink-500 font-light transition-colors duration-300 flex items-center gap-1"
                          >
                            <Heart className="w-4 h-4" />
                            Move to Wishlist
                          </button>
                          <button
                            onClick={() => saveForLater(item.id)}
                            className="text-gray-400 hover:text-black font-light transition-colors duration-300 flex items-center gap-1"
                            disabled={showSaveForLater === item.id}
                          >
                            {showSaveForLater === item.id ? (
                              <>
                                <div className="w-4 h-4 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                              </>
                            ) : (
                              <>
                                <Clock className="w-4 h-4" />
                                Save for Later
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping */}
              <div className="pt-8 border-t border-gray-100">
                <Link href="/products">
                  <button className="px-8 py-4 border border-gray-200 text-gray-600 hover:border-pink-500 hover:text-pink-500 font-light transition-all duration-300">
                    ← Continue Shopping
                  </button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              {/* Summary Card */}
              <div className="bg-white border border-gray-100 p-6 space-y-6">
                <h2 className="text-2xl font-light text-black">Order Summary</h2>

                {/* Subtotal */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Subtotal ({itemCount} items)</span>
                    <span className="text-black font-light">₹{subtotal.toFixed(2)}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="font-light">You Save</span>
                      <span className="font-light">-₹{totalSavings.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                {/* Shipping Options */}
                <div className="space-y-4">
                  <h3 className="text-lg font-light text-black">Shipping Options</h3>
                  <div className="space-y-3">
                    {shippingOptions.map((option) => (
                      <label key={option.id} className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="mt-1"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <span className="font-light text-black">{option.name}</span>
                            <span className="font-light text-black">
                              {subtotal >= 999 && option.id === 'standard' ? 'FREE' : `₹${option.price}`}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400 font-light">
                            {option.estimatedDays} • {option.description}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Promo Code */}
                <div className="space-y-4">
                  {!showPromoField && !appliedPromo ? (
                    <button
                      onClick={() => setShowPromoField(true)}
                      className="flex items-center gap-2 text-gray-600 hover:text-pink-500 font-light transition-colors duration-300"
                    >
                      <Tag className="w-4 h-4" />
                      Have a promo code?
                    </button>
                  ) : showPromoField ? (
                    <div className="space-y-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-grow px-4 py-3 border border-gray-200 font-light focus:outline-none focus:border-pink-500"
                        />
                        <button
                          onClick={applyPromoCode}
                          className="px-6 py-3 bg-black text-white hover:bg-pink-500 font-light transition-all duration-300"
                        >
                          Apply
                        </button>
                      </div>
                      <button
                        onClick={() => setShowPromoField(false)}
                        className="text-sm text-gray-400 hover:text-gray-600 font-light"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : null}

                  {appliedPromo && (
                    <div className="flex items-center justify-between bg-green-50 p-3 border border-green-200">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-light text-green-700">
                          {appliedPromo.code}: {appliedPromo.description}
                        </span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Order Totals */}
                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-light">Shipping</span>
                    <span className="text-black font-light">
                      {shippingCost === 0 ? 'FREE' : `₹${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  {promoDiscount > 0 && (
                    <div className="flex justify-between items-center text-green-600">
                      <span className="font-light">Discount</span>
                      <span className="font-light">-₹{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center text-xl pt-3 border-t border-gray-100">
                    <span className="font-light text-black">Total</span>
                    <span className="font-light text-black">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isLoading || cartItems.some(item => !item.inStock)}
                  className="w-full px-8 py-4 bg-black text-white hover:bg-pink-500 font-light transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Trust Signals */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  <div className="text-center space-y-2">
                    <Shield className="w-6 h-6 text-pink-500 mx-auto" />
                    <div className="text-xs text-gray-400 font-light">Secure Checkout</div>
                  </div>
                  <div className="text-center space-y-2">
                    <Truck className="w-6 h-6 text-pink-500 mx-auto" />
                    <div className="text-xs text-gray-400 font-light">Free Shipping</div>
                  </div>
                  <div className="text-center space-y-2">
                    <RotateCcw className="w-6 h-6 text-pink-500 mx-auto" />
                    <div className="text-xs text-gray-400 font-light">Easy Returns</div>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-gray-50 p-4 border border-gray-100 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-light text-gray-600">Secure Shopping</span>
                </div>
                <p className="text-xs text-gray-400 font-light">
                  Your payment information is encrypted and secure. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
