"use client";

import { Button } from '@/components/ui/button';
import { ArrowDown, ArrowUp, ArrowUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';

type SortDirection = 'none' | 'asc' | 'desc';

interface SortOption {
  label: string;
  key: 'name' | 'price' | 'relevance';
}

const SORT_OPTIONS: SortOption[] = [
  { label: 'Relevance', key: 'relevance' },
  { label: 'Name', key: 'name' },
  { label: 'Price', key: 'price' },
];

interface SortButtonsProps {
  activeSort: string;
  categories: string[];
  selectedCategories: string[]; // Updated to support multiple selections
  onSortChange: (sort: string) => void;
  onCategoriesChange: (categories: string[]) => void; // Updated to handle multiple selections
  onClearAllFilters: () => void;
}

export function SortButtons({
  activeSort,
  categories,
  selectedCategories,
  onSortChange,
  onCategoriesChange,
  onClearAllFilters,
}: SortButtonsProps) {
  const getSortDirection = (key: string): SortDirection => {
    if (key === 'relevance') {
      return activeSort === 'relevance' ? 'none' : 'none';
    }
    if (activeSort === `${key}-asc`) return 'asc';
    if (activeSort === `${key}-desc`) return 'desc';
    return 'none';
  };

  const handleSortClick = (option: SortOption) => {
    if (option.key === 'relevance') {
      onSortChange('relevance');
      return;
    }

    const currentDirection = getSortDirection(option.key);
    let newSort: string;

    switch (currentDirection) {
      case 'none':
        newSort = `${option.key}-asc`;
        break;
      case 'asc':
        newSort = `${option.key}-desc`;
        break;
      case 'desc':
        newSort = 'relevance';
        break;
      default:
        newSort = 'relevance';
    }

    onSortChange(newSort);
  };

  const getSortIcon = (direction: SortDirection) => {
    switch (direction) {
      case 'asc':
        return <ArrowUp className="h-4 w-4 ml-1" />;
      case 'desc':
        return <ArrowDown className="h-4 w-4 ml-1" />;
      default:
        return <ArrowUpDown className="h-4 w-4 ml-1 opacity-0 group-hover:opacity-50" />;
    }
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories?.includes(category)
      ? selectedCategories?.filter((c) => c !== category) // Remove if already selected
      : [...selectedCategories, category]; // Add if not selected

    onCategoriesChange(newCategories);
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {SORT_OPTIONS.map((option) => {
        const direction = getSortDirection(option.key);
        const isActive = direction !== 'none' || (option.key === 'relevance' && activeSort === 'relevance');
        
        return (
          <div key={option.key} className="flex flex-col gap-2">
            <Button
              variant={isActive ? "secondary" : "outline"}
              className={cn(
                "group",
                isActive && "font-medium"
              )}
              onClick={() => handleSortClick(option)}
            >
              {option.label}
              {getSortIcon(direction)}
            </Button>
          </div>
        );
      })}

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[180px]">
            {selectedCategories?.length > 0
              ? `Categories (${selectedCategories?.length})`
              : 'Select categories'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]">
          <div className="flex flex-col gap-2 p-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center gap-2">
                <Checkbox
                  checked={selectedCategories?.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <span>{category}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="outline"
        className="ml-auto"
        onClick={onClearAllFilters}
      >
        <X className="h-4 w-4 mr-2" />
        Clear All
      </Button>
    </div>
  );
}
