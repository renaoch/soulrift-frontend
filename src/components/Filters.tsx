'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  IconX,
  IconTag,
  IconCurrencyDollar
} from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

export function Filters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = [
    { id: 'oversized', name: 'Oversized', count: 24 },
    { id: 'vintage', name: 'Vintage', count: 18 },
    { id: 'minimalist', name: 'Minimalist', count: 32 },
    { id: 'graphic', name: 'Graphic', count: 45 },
    { id: 'premium', name: 'Premium', count: 16 }
  ];

  const clearAllFilters = () => {
    setPriceRange([0, 300]);
    setSelectedCategories([]);

    const url = new URL(window.location.href);
    ['category', 'min', 'max'].forEach(param => {
      url.searchParams.delete(param);
    });
    router.replace(url.pathname + url.search);
  };

  const applyFilters = () => {
    const url = new URL(window.location.href);

    ['category', 'min', 'max'].forEach(param => {
      url.searchParams.delete(param);
    });

    if (selectedCategories.length > 0) {
      url.searchParams.set('category', selectedCategories[0]);
    }
    if (priceRange[0] > 0) {
      url.searchParams.set('min', priceRange[0].toString());
    }
    if (priceRange[1] < 300) {
      url.searchParams.set('max', priceRange[1].toString());
    }

    router.replace(url.pathname + url.search);
  };

  const activeFiltersCount = selectedCategories.length + (priceRange[0] > 0 || priceRange[1] < 300 ? 1 : 0);

  return (
    <div className="space-y-8">
      {/* Clean Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-light text-black">Filters</h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={clearAllFilters}
            className="text-sm text-gray-400 hover:text-black transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IconTag className="w-4 h-4 text-pink-500" />
          <span className="font-light text-black">Category</span>
        </div>
        <div className="space-y-3 ml-6">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={() => {
                    setSelectedCategories(prev =>
                      prev.includes(category.id)
                        ? prev.filter(id => id !== category.id)
                        : [...prev, category.id]
                    );
                  }}
                  className="border-gray-300 data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                />
                <label
                  htmlFor={category.id}
                  className="text-sm text-gray-600 hover:text-black cursor-pointer transition-colors font-light"
                >
                  {category.name}
                </label>
              </div>
              <span className="text-xs text-gray-400">{category.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <IconCurrencyDollar className="w-4 h-4 text-pink-500" />
          <span className="font-light text-black">Price</span>
        </div>
        <div className="space-y-4 ml-6">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={300}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-gray-600 font-light">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <div className="pt-6 border-t border-gray-100">
        <Button
          onClick={applyFilters}
          className="w-full h-12 font-light bg-black text-white hover:bg-pink-500 border-0 transition-colors duration-300"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}