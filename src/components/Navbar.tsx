"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { ChevronRight, Star, Check, ArrowRight, Users, Zap, Shield, ShoppingCart, Search } from "lucide-react";
import Link from 'next/link';
import SearchBar from "@/components/Search";
import Image from "next/image";

export function NavbarD() {
  const navItems = [
    { name: "Collections", link: "/collections" },
    { name: "New Arrivals", link: "/new" },
    { name: "About", link: "/about" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full bg-white border-b border-gray-100">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center">
              <Image
                className="rounded-full"
                src="/logo-no.png"
                alt="Logo"
                height={40}
                width={40}
              />
            </Link>
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={{pathname:`${item.link}`}}
                  className="text-gray-600 hover:text-black transition-colors font-light"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <SearchBar />
            <button className="p-2 text-gray-600 hover:text-pink-500 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-pink-500 transition-colors relative">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-pink-500 text-white text-xs rounded-full flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <Link href="/" className="flex items-center">
              <Image
                className="rounded-full"
                src="/logo-no.png"
                alt="Logo"
                height={32}
                width={32}
              />
            </Link>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                href={{pathname:`${item.link}`}}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-600 hover:text-black transition-colors font-light py-2"
              >
                {item.name}
              </Link>
            ))}
            <div className="flex w-full flex-col gap-3 mt-6 pt-6 border-t border-gray-100">
              <button className="w-full py-3 bg-black text-white hover:bg-pink-500 transition-colors font-light">
                View Cart
              </button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}

export const LandingPageContent = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="px-6 py-20 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-12">
            <span className="inline-block px-4 py-2 bg-pink-50 text-pink-500 text-sm font-light border border-pink-200">
              Premium T-Shirt Collection
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight text-black mb-8">
            Minimalist
            <br />
            <span className="text-pink-500">Fashion</span>
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed mb-16">
            Curated essentials for the modern wardrobe. Clean lines, quality materials, timeless design.
          </p>

          <div className="flex items-center justify-center gap-6 flex-wrap mb-16">
            <Link
              href="/products"
              className="px-10 py-4 bg-black text-white hover:bg-pink-500 transition-all duration-300 font-light text-lg group"
            >
              <span className="flex items-center">
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>

            <button className="px-10 py-4 border border-gray-200 text-gray-600 hover:border-pink-500 hover:text-pink-500 transition-all duration-300 font-light text-lg">
              View Lookbook
            </button>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-12 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="font-light">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="font-light">Sustainable Materials</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              <span className="font-light">Modern Fits</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="px-6 py-20 border-t border-gray-100">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-black mb-4">
              Featured Categories
            </h2>
            <p className="text-gray-400 font-light">
              Discover our carefully curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Oversized', count: '24 Items', image: '/api/placeholder/400/300' },
              { name: 'Minimalist', count: '32 Items', image: '/api/placeholder/400/300' },
              { name: 'Premium', count: '16 Items', image: '/api/placeholder/400/300' }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="aspect-[4/3] bg-gray-100 mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-pink-50 group-hover:to-pink-100 transition-colors duration-500"></div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-light text-black mb-1 group-hover:text-pink-500 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-400 text-sm font-light">
                    {category.count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-light text-black mb-16">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-pink-500 mx-auto flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-light text-black">Quality First</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Every piece is crafted with premium materials and attention to detail
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-pink-500 mx-auto flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-light text-black">Modern Design</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Clean, minimalist aesthetics that stand the test of time
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-pink-500 mx-auto flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-light text-black">Community</h3>
              <p className="text-gray-400 font-light text-sm leading-relaxed">
                Building a community of conscious fashion enthusiasts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 border-t border-gray-100">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-light text-black mb-6">
            Ready to Upgrade Your Wardrobe?
          </h2>
          <p className="text-xl text-gray-400 font-light mb-12">
            Discover timeless pieces that define modern minimalism
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-12 py-4 bg-pink-500 text-white hover:bg-black transition-colors duration-300 font-light text-lg group"
          >
            Explore Collection
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};