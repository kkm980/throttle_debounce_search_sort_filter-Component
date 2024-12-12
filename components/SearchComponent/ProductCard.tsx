"use client";

import { Product } from './types';
import { Card } from '@/components/ui/card';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-muted-foreground">{product.category}</p>
      <p className="font-medium mt-2">${product.price}</p>
    </Card>
  );
}