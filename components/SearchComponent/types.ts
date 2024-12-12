import { Product } from '@/lib/data/products';

export interface FilterOptions {
  minPrice: number;
  maxPrice: number;
  category: string[];
}

export interface SortOption {
  label: string;
  value: string;
}

export interface SearchComponentProps {
  onSearch?: (results: Product[]) => void;
  className?: string;
}