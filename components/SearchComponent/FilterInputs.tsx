"use client";

import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FilterInputsProps {
  nameFilter: string;
  priceRange: { min: number; max: number };
  onNameFilterChange: (value: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  onClearName: () => void;
  onClearPrice: () => void;
}

export function FilterInputs({
  nameFilter,
  priceRange,
  onNameFilterChange,
  onPriceRangeChange,
  onClearName,
  onClearPrice,
}: FilterInputsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
      {/* Name Filter */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter by name..."
          value={nameFilter}
          onChange={(e) => onNameFilterChange(e.target.value)}
          className="pr-8"
        />
        {nameFilter && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-7 w-7 text-destructive hover:text-destructive"
            onClick={onClearName}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Price Range Filters */}
      <div className="flex gap-2 items-center col-span-2">
        <Input
          type="number"
          placeholder="Min price"
          value={priceRange.min || ''}
          onChange={(e) => onPriceRangeChange(Number(e.target.value), priceRange.max)}
          className="w-24"
          min={0}
        />
        <span>to</span>
        <Input
          type="number"
          placeholder="Max price"
          value={priceRange.max || ''}
          onChange={(e) => onPriceRangeChange(priceRange.min, Number(e.target.value))}
          className="w-24"
          min={0}
        />
        {(priceRange.min > 0 || priceRange.max > 0) && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-destructive hover:text-destructive"
            onClick={onClearPrice}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}