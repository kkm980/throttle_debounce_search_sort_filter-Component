"use client";

import { Card } from '@/components/ui/card';
import { FilterOptions } from './types';
import { SortButtons } from './SortButtons';
import { FilterInputs } from './FilterInputs';

interface SearchFiltersProps {
  filters: FilterOptions;
  sortBy: string;
  categories: string[];
  nameFilter: string;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: string) => void;
  onNameFilterChange: (value: string) => void;
  onClearAllFilters: () => void;
}

export function SearchFilters({
  filters,
  sortBy,
  categories,
  nameFilter,
  onFilterChange,
  onSortChange,
  onNameFilterChange,
  onClearAllFilters,
}: SearchFiltersProps) {
  return (
    <Card className="p-4 space-y-4">
      <SortButtons
        activeSort={sortBy}
        categories={categories}
        selectedCategories={filters.category}
        onSortChange={onSortChange}
        onCategoriesChange={(category: any) => onFilterChange({ ...filters, category })}
        onClearAllFilters={onClearAllFilters}
      />
      
      <FilterInputs
        nameFilter={nameFilter}
        priceRange={{ min: filters.minPrice, max: filters.maxPrice }}
        onNameFilterChange={onNameFilterChange}
        onPriceRangeChange={(min, max) => 
          onFilterChange({ ...filters, minPrice: min, maxPrice: max })
        }
        onClearName={() => onNameFilterChange('')}
        onClearPrice={() => 
          onFilterChange({ 
            ...filters, 
            minPrice: 0, 
            maxPrice: 0 
          })
        }
      />
    </Card>
  );
}
