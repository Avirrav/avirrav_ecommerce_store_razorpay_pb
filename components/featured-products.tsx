'use client';

import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { Sparkles } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  return (
    <div className="polaris-card p-8">
      <div className="flex items-center space-x-3 mb-8">
        <Sparkles className="w-6 h-6 text-[#008060]" />
        <h2 className="polaris-text-heading-md">Featured Products</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.name}
            price={parseFloat(product.price)}
            image={product.images[0]?.url || ""}
            href={`${product.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default FeaturedProducts;