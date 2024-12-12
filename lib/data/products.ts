import { Product } from '@/components/SearchComponent/types';

// Stable product data with fixed categories and prices
export const products: Product[] = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: 999,
    category: "Electronics",
    description: "Latest iPhone with pro camera system",
    image:"https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=300&q=80"
  },
  {
    id: 2,
    name: "Denim Jacket",
    price: 89,
    category: "Clothing",
    description: "Classic denim jacket",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=300&q=80"
  },
  // Add more products with stable data...
].concat(
  Array.from({ length: 48 }, (_, i) => ({
    id: i + 3,
    name: `Product ${i + 3}`,
    price: 100 + (i * 15),
    category: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports'][Math.floor(i / 10)],
    description: `Description for Product ${i + 3}`,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=300&q=80"
  }))
);