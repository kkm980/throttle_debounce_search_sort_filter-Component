export const SEARCH_CONFIG = {
  debounceDelay: 1000, // ms
  throttleDelay: 1000, // ms
  itemsPerPage: 10,
  maxPriceRange: 1000,
  minPriceRange: 0,
};

export const SORT_OPTIONS = [
  { label: 'Name (A-Z)', value: 'name-asc' },
  { label: 'Name (Z-A)', value: 'name-desc' },
  { label: 'Price (Low-High)', value: 'price-asc' },
  { label: 'Price (High-Low)', value: 'price-desc' },
] as const;