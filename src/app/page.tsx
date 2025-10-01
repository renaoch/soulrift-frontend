'use client';
import './globals.css'
import { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Star,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Play,
  Heart,
  Instagram,
  Twitter,
  Facebook,
  ChevronDown,
  Check,
  X,
  Menu
} from 'lucide-react';

import TrueFocus from '@/components/TrueFocus';
import { NavbarD } from '@/components/Navbar';

// Enhanced scroll animation hook with better performance
const useScrollAnimation = (threshold = 100) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          setIsVisible(scrolled > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return isVisible;
};

// Enhanced intersection observer hook for element animations
const useIntersectionObserver = (ref: React.RefObject<Element>, options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref, options]);

  return isIntersecting;
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSlideTransitioning, setIsSlideTransitioning] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isScrolled = useScrollAnimation(100);

  // Memoized slide data for better performance
  const heroSlides = useMemo(() => [
    {
      id: 1,
      title: 'Premium Collection',
      subtitle: 'Crafted for Comfort',
      image: '/thirtplaceholderpic-1.avif',
      cta: 'Shop Now'
    },
    {
      id: 2,
      title: 'Sustainable Fashion',
      subtitle: 'Ethically Made',
      image: '/tshirtplaceholderpic-4.avif',
      cta: 'Explore'
    },
    {
      id: 3,
      title: 'Minimalist Design',
      subtitle: 'Timeless Style',
      image: '/tshirtplaceholderpic-3.avif',
      cta: 'Discover'
    }
  ], []);

  // Memoized product data
  const featuredProducts = useMemo(() => [
    {
      id: 1,
      name: 'Essential White Tee',
      price: 49,
      originalPrice: 69,
      image: '/thirtplaceholderpic-1.avif',
      rating: 4.9,
      reviews: 127
    },
    {
      id: 2,
      name: 'Classic Black Crew',
      price: 45,
      image: '/tshirtplaceholderpic-4.avif',
      rating: 4.8,
      reviews: 89
    },
    {
      id: 3,
      name: 'Minimalist Gray',
      price: 52,
      image: '/tshirtplaceholderpic-3.avif',
      rating: 4.7,
      reviews: 156
    }
  ], []);

  // Memoized testimonials
  const testimonials = useMemo(() => [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Fashion Blogger',
      content: 'The quality is exceptional and the fit is perfect. These have become my go-to basics.',
      rating: 5,
      avatar: '/thirtplaceholderpic-1.avif'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Creative Director',
      content: 'Sustainable fashion that doesn\'t compromise on style. Exactly what I was looking for.',
      rating: 5,
      avatar: '/tshirtplaceholderpic-2.avif'
    },
    {
      id: 3,
      name: 'Emma Davis',
      role: 'Entrepreneur',
      content: 'Premium quality at fair prices. The organic cotton feels amazing and lasts forever.',
      rating: 5,
      avatar: '/tshirtplaceholderpic-3.avif'
    }
  ], []);

  // Enhanced auto-slide with smooth transitions
  useEffect(() => {
    const timer = setInterval(() => {
      setIsSlideTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsSlideTransitioning(false);
      }, 250);
    }, 4000); // Reduced for mobile attention span

    return () => clearInterval(timer);
  }, [heroSlides.length]);

  // Optimized email submission handler
  const handleEmailSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail('');
      
      // Simulate API call
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }
  }, [email]);

  // Enhanced slide change handler
  const changeSlide = useCallback((index: number) => {
    if (index !== currentSlide && !isSlideTransitioning) {
      setIsSlideTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsSlideTransitioning(false);
      }, 250);
    }
  }, [currentSlide, isSlideTransitioning]);

  return (
    <div className="relative min-h-screen bg-white">
      {/* Mobile Navigation */}
     <NavbarD/>

      {/* Enhanced Mobile-First Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Optimized Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        </div>

        {/* Background Images with Mobile Optimization */}
        <div className="absolute inset-0 z-1">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
                quality={75}
                sizes="100vw"
              />
            </div>
          ))}
        </div>

        {/* Enhanced Mobile Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`transition-all duration-1200 ease-out ${
              isScrolled ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'
            }`}>
              {/* Mobile-Optimized Title with TrueFocus */}
              <div className="mb-6 sm:mb-8">
                <TrueFocus 
                  sentence={heroSlides[currentSlide].title}
                  manualMode={false}
                  blurAmount={2}
                  borderColor="#ec4899"
                  glowColor="rgba(236, 72, 153, 0.6)"
                  animationDuration={1.2}
                  pauseBetweenAnimations={1}
                />
              </div>
              
              {/* Mobile-Optimized Subtitle */}
              <p className="text-lg sm:text-2xl md:text-3xl font-light text-white/95 mb-8 sm:mb-12 leading-relaxed">
                {heroSlides[currentSlide].subtitle}
              </p>
              
              {/* Mobile-Optimized CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Link href="/products" className="w-full sm:w-auto group">
                  <button className="w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-5 bg-white text-black hover:bg-pink-500 hover:text-white font-medium sm:font-light text-lg sm:text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl active:scale-95">
                    {heroSlides[currentSlide].cta}
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4 inline transition-transform group-hover:translate-x-2" />
                  </button>
                </Link>
                
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border-2 border-white/80 text-white hover:bg-white/20 hover:border-white font-medium sm:font-light text-lg sm:text-xl transition-all duration-500 backdrop-blur-sm active:scale-95"
                >
                  <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                  Watch Story
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 sm:gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`h-1 transition-all duration-500 hover:bg-pink-400 ${
                index === currentSlide 
                  ? 'w-8 sm:w-12 bg-white' 
                  : 'w-4 sm:w-6 bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Mobile Scroll Indicator */}
        <div className="absolute bottom-6 right-4 sm:right-6 animate-bounce">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/60 rounded-full flex justify-center">
            <div className="w-0.5 h-2 sm:w-1 sm:h-3 bg-white/60 rounded-full mt-1.5 sm:mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Enhanced Mobile Brand Story Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 lg:py-32 border-t border-gray-100">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Mobile-Optimized Text Content */}
            <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
              <div className="space-y-6 lg:space-y-8">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-black leading-tight">
                  Redefining
                  <br />
                  <span className="text-pink-500 relative">
                    Premium Basics
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-pink-500 to-transparent" />
                  </span>
                </h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 font-light leading-relaxed">
                  Every thread tells a story of sustainable craftsmanship. Our premium t-shirts are more than clothing—they're a commitment to quality, comfort, and conscious living.
                </p>
              </div>
              
              {/* Mobile-Optimized Stats */}
              <div className="grid grid-cols-3 gap-6 lg:gap-8 py-8">
                {[
                  { value: '100%', label: 'Organic Cotton' },
                  { value: '50K+', label: 'Happy Customers' },
                  { value: '4.8★', label: 'Average Rating' }
                ].map((stat, index) => (
                  <div key={index} className="text-center space-y-2 sm:space-y-3 group">
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-light text-black group-hover:text-pink-500 transition-colors duration-500">
                      {stat.value}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-400 font-light uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile-Optimized CTA Button */}
              <button className="w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-black text-white hover:bg-pink-500 font-medium sm:font-light text-lg transition-all duration-500 group hover:shadow-xl active:scale-95">
                Our Story
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4 inline group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
            
            {/* Mobile-Optimized Image Section */}
            <div className="relative group order-1 lg:order-2">
              <div className="aspect-[4/5] relative overflow-hidden rounded-xl sm:rounded-2xl">
                <Image
                  src="/tshirtplaceholderpic-4.avif"
                  alt="Premium T-Shirt"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
              
              {/* Mobile-Optimized Floating Elements */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-pink-500 text-white px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-medium transform rotate-6 sm:rotate-12 animate-pulse shadow-xl rounded">
                NEW COLLECTION
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white border border-gray-100 px-4 py-3 sm:px-6 sm:py-4 shadow-xl rounded-lg sm:rounded-xl">
                <div className="text-xl sm:text-2xl lg:text-3xl font-light text-black">₹49</div>
                <div className="text-xs sm:text-sm text-gray-400 font-light">Starting Price</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mobile Featured Products Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 lg:py-32 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-black mb-6 sm:mb-8">Featured Essentials</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
              Handpicked bestsellers that define premium comfort and timeless style
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group bg-white border border-gray-100 p-6 sm:p-8 hover:shadow-2xl hover:border-pink-200 hover:-translate-y-2 transition-all duration-500 rounded-xl">
                <div className="relative aspect-[3/4] bg-gray-50 mb-6 sm:mb-8 overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  
                  {/* Mobile-Optimized Quick Actions */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="bg-white/95 backdrop-blur-md p-2.5 sm:p-3 hover:bg-white transition-all duration-300 shadow-lg rounded-full">
                      <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-pink-500 transition-colors" />
                    </button>
                    <button className="bg-white/95 backdrop-blur-md p-2.5 sm:p-3 hover:bg-white transition-all duration-300 shadow-lg rounded-full">
                      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 hover:text-pink-500 transition-colors" />
                    </button>
                  </div>
                  
                  {/* Mobile-Optimized Discount Badge */}
                  {product.originalPrice && (
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-pink-500 text-white px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium shadow-lg rounded">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>
                
                <div className="space-y-4 sm:space-y-5">
                  {/* Mobile-Optimized Rating */}
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 sm:w-5 sm:h-5 ${
                            i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-400 font-light">({product.reviews})</span>
                  </div>
                  
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-black group-hover:text-pink-500 transition-colors">
                    {product.name}
                  </h3>
                  
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl font-light text-black">₹{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-lg sm:text-xl text-gray-400 line-through font-light">₹{product.originalPrice}</span>
                    )}
                  </div>
                  
                  <Link href={`/products/${product.id}`}>
                    <button className="w-full px-6 py-4 sm:px-8 sm:py-5 bg-black text-white hover:bg-pink-500 font-medium sm:font-light text-base sm:text-lg transition-all duration-500 transform group-hover:translate-y-0 translate-y-2 opacity-0 group-hover:opacity-100 hover:shadow-xl active:scale-95 rounded">
                      Add to Cart
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12 sm:mt-16">
            <Link href="/products">
              <button className="w-full sm:w-auto px-12 sm:px-16 py-4 sm:py-5 border-2 border-black text-black hover:bg-black hover:text-white font-medium sm:font-light text-lg sm:text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-xl active:scale-95 rounded">
                View All Products
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4 inline" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Mobile Values Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 lg:py-32 border-t border-gray-100">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-black mb-6 sm:mb-8">Why Choose Us</h2>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 font-light">
              More than just clothing, it's a lifestyle choice
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
            {[
              {
                icon: <Shield className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-pink-500" />,
                title: 'Premium Quality',
                description: 'Every piece is crafted with meticulous attention to detail using the finest organic cotton.',
                features: ['100% Organic Cotton', 'Pre-shrunk Fabric', 'Reinforced Seams']
              },
              {
                icon: <Truck className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-pink-500" />,
                title: 'Fast Delivery',
                description: 'Free shipping nationwide with express delivery options for urgent orders.',
                features: ['Free Shipping ₹999+', '2-Day Express', 'Order Tracking']
              },
              {
                icon: <RotateCcw className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-pink-500" />,
                title: 'Easy Returns',
                description: 'Not satisfied? Return within 30 days for a full refund, no questions asked.',
                features: ['30-Day Returns', 'Free Return Shipping', 'Instant Refunds']
              }
            ].map((item, index) => (
              <div key={index} className="group text-center space-y-6 sm:space-y-8 p-6 sm:p-8 hover:bg-gray-50 transition-all duration-500 cursor-pointer rounded-xl">
                <div className="flex justify-center group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-light text-black group-hover:text-pink-500 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 font-light leading-relaxed text-base sm:text-lg">
                    {item.description}
                  </p>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center gap-2 sm:gap-3 text-gray-600 font-light text-sm sm:text-base">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Mobile Testimonials Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 lg:py-32 bg-pink-500 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light mb-6 sm:mb-8">What Customers Say</h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-white/90">
              Real stories from real customers who love our products
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/10 backdrop-blur-md p-6 sm:p-8 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 rounded-xl">
                <div className="space-y-6 sm:space-y-8">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-base sm:text-lg lg:text-xl font-light leading-relaxed text-white/95">
                    "{testimonial.content}"
                  </p>
                  
                  <div className="flex items-center gap-4 sm:gap-5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/20 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={56}
                        height={56}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <div className="font-light text-white text-base sm:text-lg">{testimonial.name}</div>
                      <div className="text-white/70 font-light text-sm sm:text-base">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Mobile Newsletter Section */}
      <section className="px-4 sm:px-6 py-16 sm:py-24 lg:py-32 border-t border-gray-100">
        <div className="mx-auto max-w-4xl text-center">
          <div className="space-y-10 sm:space-y-12 lg:space-y-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light text-black">Stay in Touch</h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                Be the first to know about new collections, exclusive offers, and style tips from our team.
              </p>
            </div>
            
            <form onSubmit={handleEmailSubmit} className="max-w-lg mx-auto">
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow px-6 py-4 sm:px-8 sm:py-5 border border-gray-200 font-light text-base sm:text-lg focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 transition-all duration-300 rounded-lg"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className="px-8 py-4 sm:px-10 sm:py-5 bg-black text-white hover:bg-pink-500 font-medium sm:font-light text-base sm:text-lg transition-all duration-500 transform hover:scale-105 disabled:opacity-50 active:scale-95 rounded-lg whitespace-nowrap"
                >
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>
              
              {isSubscribed && (
                <div className="mt-6 text-green-600 font-light flex items-center justify-center gap-3 text-base sm:text-lg">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6" />
                  Thank you for subscribing! Welcome to our community.
                </div>
              )}
            </form>
            
            {/* Enhanced Mobile Social Links */}
            <div className="flex justify-center gap-6 sm:gap-8">
              {[
                { icon: <Instagram className="w-6 h-6 sm:w-8 sm:h-8" />, href: '#', label: 'Instagram' },
                { icon: <Twitter className="w-6 h-6 sm:w-8 sm:h-8" />, href: '#', label: 'Twitter' },
                { icon: <Facebook className="w-6 h-6 sm:w-8 sm:h-8" />, href: '#', label: 'Facebook' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-14 h-14 sm:w-16 sm:h-16 border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:border-pink-500 hover:text-pink-500 transition-all duration-500 transform hover:scale-110 hover:shadow-xl active:scale-95"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Mobile Footer */}
      <footer className="px-4 sm:px-6 py-12 sm:py-16 bg-black text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Brand */}
            <div className="space-y-4 sm:space-y-6">
              <div className="text-2xl sm:text-3xl font-light">
                <span className="text-pink-500">T</span>Premium
              </div>
              <p className="text-gray-400 font-light leading-relaxed text-sm sm:text-base">
                Crafting premium basics with sustainable practices and uncompromising quality.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-lg sm:text-xl font-light text-white">Quick Links</h4>
              <div className="space-y-2 sm:space-y-3">
                {['Home', 'Products', 'About Us', 'Contact', 'Size Guide'].map((link) => (
                  <Link key={link} href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Customer Care */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-lg sm:text-xl font-light text-white">Customer Care</h4>
              <div className="space-y-2 sm:space-y-3">
                {['Track Order', 'Returns', 'Shipping Info', 'FAQ', 'Support'].map((link) => (
                  <Link key={link} href="#" className="block text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                    {link}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-4 sm:space-y-6">
              <h4 className="text-lg sm:text-xl font-light text-white">Get in Touch</h4>
              <div className="space-y-2 sm:space-y-3 text-gray-400 text-sm sm:text-base">
                <p>support@tpremium.com</p>
                <p>+91 98765 43210</p>
                <p>Mon-Fri: 9AM-6PM IST</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 sm:pt-12 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400 text-xs sm:text-sm">
            <p>&copy; 2024 TPremium. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Mobile Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-500">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl sm:rounded-2xl overflow-hidden">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 sm:-top-16 right-0 text-white hover:text-pink-500 transition-colors duration-300 z-10 p-2"
              aria-label="Close video"
            >
              <X className="w-8 h-8 sm:w-10 sm:h-10" />
            </button>
            
            {/* Video placeholder with mobile optimization */}
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center text-white">
              <div className="text-center space-y-4 sm:space-y-6 px-4">
                <Play className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto opacity-60" />
                <p className="text-lg sm:text-xl lg:text-2xl font-light">Video would play here</p>
                <p className="text-sm sm:text-base text-gray-400">Premium T-Shirt Collection Story</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile-Optimized Floating Action Button */}
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-6 z-40">
        <button className="bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-110 active:scale-95">
          <ShoppingCart className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Performance Optimization: Intersection Observer for animations */}
      <div className="sr-only">
        {/* Hidden elements for better SEO and accessibility */}
        <h1>Premium T-Shirts - TPremium Collection</h1>
        <p>Shop premium quality organic cotton t-shirts with sustainable fashion practices. Free shipping, easy returns, and exceptional customer service.</p>
      </div>
    </div>
  );
}