import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: number;
  title: string;
  subtitle: string;
  productCount: number;
  image: string;
  featured: boolean;
}

const TShirtCategoryCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const categories: CategoryItem[] = [
    {
      id: 1,
      title: "Oversized",
      subtitle: "Comfort Redefined",
      productCount: 24,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Vintage",
      subtitle: "Timeless Classics",
      productCount: 18,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Minimalist",
      subtitle: "Less is More",
      productCount: 32,
      image: "https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=800&h=600&fit=crop",
      featured: true
    },
    {
      id: 4,
      title: "Graphic",
      subtitle: "Bold Statements",
      productCount: 45,
      image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=800&h=600&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Premium",
      subtitle: "Luxury Collection",
      productCount: 16,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&h=600&fit=crop",
      featured: true
    }
  ];

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  }, [categories.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + categories.length) % categories.length);
  }, [categories.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isHovered, nextSlide]);

  return (
    <div className="relative w-full max-w-7xl mx-auto bg-white">
      {/* Main carousel container - Fixed height with proper overflow */}
      <div
        className="relative h-[450px] sm:h-[500px] md:h-[600px] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Slides */}
        {categories.map((category, index) => (
          <div
            key={category.id}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              index === currentIndex
                ? 'opacity-100 transform translate-x-0 z-10'
                : index < currentIndex
                  ? 'opacity-0 transform -translate-x-full z-0'
                  : 'opacity-0 transform translate-x-full z-0'
            }`}
          >
            <div className="flex flex-col md:flex-row h-full w-full">
              {/* Content Section */}
              <div className="w-full md:w-1/2 flex items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 bg-white md:bg-transparent relative z-20">
                <div className="max-w-md text-center md:text-left w-full">
                  {/* Featured badge */}
                  {category.featured && (
                    <div className={`inline-block mb-3 sm:mb-4 md:mb-6 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-pink-200 transition-all duration-700 delay-200 ${
                      index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                    }`}>
                      <span className="text-pink-500 text-xs sm:text-sm font-medium tracking-wide uppercase">Featured</span>
                    </div>
                  )}

                  {/* Category title */}
                  <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-black mb-2 sm:mb-3 md:mb-4 leading-tight transition-all duration-700 delay-300 ${
                    index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    {category.title}
                  </h1>

                  {/* Subtitle */}
                  <p className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-4 sm:mb-6 md:mb-8 font-light transition-all duration-700 delay-500 ${
                    index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    {category.subtitle}
                  </p>

                  {/* Product count */}
                  <div className={`flex items-center justify-center md:justify-start space-x-2 mb-4 sm:mb-6 md:mb-8 transition-all duration-700 delay-700 ${
                    index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <ShoppingBag size={16} className="text-pink-500 sm:w-[18px] sm:h-[18px]" />
                    <span className="text-sm sm:text-base text-gray-600">{category.productCount} Products</span>
                  </div>

                  {/* CTA Button - Fixed z-index and positioning */}
                  <div className={`transition-all duration-700 delay-900 ${
                    index === currentIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <button className="group relative inline-flex items-center justify-center space-x-2 sm:space-x-3 bg-black text-white px-6 py-3 sm:px-8 sm:py-4 hover:bg-pink-500 transition-all duration-300 text-sm sm:text-base w-full md:w-auto z-30">
                      <span className="font-medium">Shop Collection</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform sm:w-[18px] sm:h-[18px]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-48 sm:h-56 md:h-full relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                  style={{
                    backgroundImage: `url(${category.image})`,
                    transform: index === currentIndex ? 'scale(1)' : 'scale(1.1)'
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-transparent via-transparent to-white/30 md:to-white/20" />
              </div>
            </div>
          </div>
        ))}

        {/* Navigation arrows - Hidden on mobile */}
        <button
          onClick={prevSlide}
          className="hidden md:flex absolute left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 p-2 lg:p-3 bg-white border border-gray-200 text-black hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 group shadow-lg"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} className="group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={nextSlide}
          className="hidden md:flex absolute right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 p-2 lg:p-3 bg-white border border-gray-200 text-black hover:bg-pink-500 hover:text-white hover:border-pink-500 transition-all duration-300 group shadow-lg"
          aria-label="Next slide"
        >
          <ChevronRight size={20} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Mobile swipe indicator */}
        <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full">
          <div className="flex space-x-1.5">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-white/50 w-1.5'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom navigation - Desktop only */}
      <div className="hidden md:block bg-white border-t border-gray-100">
        {/* Category thumbnails */}
        <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 lg:space-x-6 overflow-x-auto scrollbar-hide">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`group flex-shrink-0 relative transition-all duration-300 ${
                    index === currentIndex ? 'scale-105' : 'hover:scale-102'
                  }`}
                >
                  {/* Thumbnail container */}
                  <div className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-2 ring-pink-500 shadow-lg shadow-pink-500/20'
                      : 'ring-1 ring-gray-200 hover:ring-gray-300'
                  }`}>
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                      style={{ backgroundImage: `url(${category.image})` }}
                    />
                    {index !== currentIndex && (
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                    )}
                  </div>

                  {/* Category name below thumbnail */}
                  <div className="mt-2 sm:mt-3 text-center">
                    <span className={`text-xs font-medium transition-colors duration-300 ${
                      index === currentIndex ? 'text-pink-500' : 'text-gray-500 group-hover:text-gray-700'
                    }`}>
                      {category.title}
                    </span>
                    <div className={`text-xs text-gray-400 transition-colors duration-300 ${
                      index === currentIndex ? 'opacity-100' : 'opacity-70'
                    }`}>
                      {category.productCount} items
                    </div>
                  </div>

                  {index === currentIndex && (
                    <div className="absolute -top-1 -right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-pink-500 rounded-full border-2 border-white shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress section */}
        <div className="px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
          <div className="max-w-6xl mx-auto">
            {/* Progress bars */}
            <div className="flex space-x-2 mb-3 sm:mb-4">
              {categories.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden cursor-pointer transition-all duration-300 hover:h-1.5"
                  onClick={() => goToSlide(index)}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      index === currentIndex
                        ? 'bg-pink-500 w-full'
                        : index < currentIndex
                          ? 'bg-pink-200 w-full'
                          : 'bg-gray-100 w-0'
                    }`}
                  />
                </div>
              ))}
            </div>

            {/* Bottom info */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">
                  {categories[currentIndex].title} Collection
                </span>
                <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />
                <span className="text-xs sm:text-sm text-gray-400 hidden sm:block">
                  {categories[currentIndex].productCount} Products Available
                </span>
              </div>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <span className="text-xs text-gray-400 font-light">
                  {String(currentIndex + 1).padStart(2, '0')} / {String(categories.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: Simple counter */}
      <div className="md:hidden bg-white border-t border-gray-100 py-3 px-4">
        <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
          <span className="font-medium">{categories[currentIndex].title}</span>
          <span>•</span>
          <span>{String(currentIndex + 1)} of {categories.length}</span>
        </div>
      </div>
    </div>
  );
};

export default TShirtCategoryCarousel;
