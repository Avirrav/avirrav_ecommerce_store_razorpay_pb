import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { Sparkles } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }, username) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-8">
        <Sparkles className="w-8 h-8" />
        <h2 className="text-3xl font-black tracking-tight">Featured Products</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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