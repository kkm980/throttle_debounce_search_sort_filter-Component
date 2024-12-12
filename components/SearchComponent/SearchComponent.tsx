"use client";

import { useDebounce } from '@/lib/hooks/useDebounce';
import { useThrottle } from '@/lib/hooks/useThrottle';
import { SEARCH_CONFIG } from '@/config/search';
import { products } from '@/lib/data/products';
import { FilterOptions, SearchComponentProps } from './types';
import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { SearchFilters } from './SearchFilters';
import { Pagination } from './Pagination';

export function SearchComponent({ onSearch, className }: SearchComponentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<string>('relevance');
  const [filters, setFilters] = useState<FilterOptions>({
    minPrice: SEARCH_CONFIG.minPriceRange,
    maxPrice: SEARCH_CONFIG.maxPriceRange,
    category: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_CONFIG.debounceDelay);
  const debouncedNameFilter = useDebounce(nameFilter, SEARCH_CONFIG.debounceDelay);
  const throttledFilters = useThrottle(filters, SEARCH_CONFIG.throttleDelay);

  const categories = useMemo(() => 
    Array.from(new Set(products.map(p => p.category))).sort(),
    []
  );

  const filteredProducts = useMemo(() => {
    let sorted = products.filter(product => 
      product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) &&
      product.name.toLowerCase().includes(debouncedNameFilter.toLowerCase()) &&
      product.price >= throttledFilters.minPrice &&
      (throttledFilters.maxPrice === 0 || product.price <= throttledFilters.maxPrice) &&
      (
        !throttledFilters.category || // Check if the category filter exists
        throttledFilters.category.length === 0 || // Check if the category array is empty
        throttledFilters.category.includes(product.category) // Match product category if the array is not empty
      )
    );    

    if (sortBy !== 'relevance') {
      sorted = [...sorted].sort((a, b) => {
        switch (sortBy) {
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          case 'price-asc':
            return a.price - b.price;
          case 'price-desc':
            return b.price - a.price;
          default:
            return 0;
        }
      });
    }

    return sorted;
  }, [debouncedSearchTerm, debouncedNameFilter, throttledFilters, sortBy]);

  const handleClearAllFilters = () => {
    setNameFilter('');
    setSortBy('relevance');
    setFilters({
      minPrice: SEARCH_CONFIG.minPriceRange,
      maxPrice: SEARCH_CONFIG.maxPriceRange,
      category: [],
    });
  };

  const totalPages = Math.ceil(filteredProducts.length / SEARCH_CONFIG.itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * SEARCH_CONFIG.itemsPerPage,
    currentPage * SEARCH_CONFIG.itemsPerPage
  );

  useEffect(() => {
    onSearch?.(paginatedProducts);
  }, [paginatedProducts, onSearch]);

  return (
    <div className={className}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>

        {showFilters && (
          <SearchFilters
            filters={filters}
            sortBy={sortBy}
            categories={categories}
            nameFilter={nameFilter}
            onFilterChange={setFilters}
            onSortChange={setSortBy}
            onNameFilterChange={setNameFilter}
            onClearAllFilters={handleClearAllFilters}
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
