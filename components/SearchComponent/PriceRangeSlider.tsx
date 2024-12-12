"use client";

import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { SEARCH_CONFIG } from '@/config/search';
import { useState, useEffect } from 'react';

interface PriceRangeSliderProps {
  minPrice: number;
  maxPrice: number;
  onChange: (min: number, max: number) => void;
}

export function PriceRangeSlider({
  minPrice,
  maxPrice,
  onChange,
}: PriceRangeSliderProps) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [minPrice, maxPrice]);

  const handleSliderChange = (values: number[]) => {
    const [min, max] = values;
    setLocalMin(min);
    setLocalMax(max);
    onChange(min, max);
  };

  const handleInputChange = (value: string, type: 'min' | 'max') => {
    const numValue = parseInt(value) || 0;
    const constrainedValue = Math.min(
      Math.max(numValue, SEARCH_CONFIG.minPriceRange),
      SEARCH_CONFIG.maxPriceRange
    );

    if (type === 'min') {
      const newMin = Math.min(constrainedValue, localMax);
      setLocalMin(newMin);
      onChange(newMin, localMax);
    } else {
      const newMax = Math.max(constrainedValue, localMin);
      setLocalMax(newMax);
      onChange(localMin, newMax);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 space-y-1.5">
          <label htmlFor="min-price" className="text-sm text-muted-foreground">
            Min Price
          </label>
          <Input
            id="min-price"
            type="number"
            min={SEARCH_CONFIG.minPriceRange}
            max={localMax}
            value={localMin}
            onChange={(e) => handleInputChange(e.target.value, 'min')}
          />
        </div>
        <div className="flex-1 space-y-1.5">
          <label htmlFor="max-price" className="text-sm text-muted-foreground">
            Max Price
          </label>
          <Input
            id="max-price"
            type="number"
            min={localMin}
            max={SEARCH_CONFIG.maxPriceRange}
            value={localMax}
            onChange={(e) => handleInputChange(e.target.value, 'max')}
          />
        </div>
      </div>
      <Slider
        min={SEARCH_CONFIG.minPriceRange}
        max={SEARCH_CONFIG.maxPriceRange}
        step={10}
        value={[localMin, localMax]}
        onValueChange={handleSliderChange}
        className="mt-6"
      />
    </div>
  );
}