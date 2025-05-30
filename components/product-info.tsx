"use client";

import { Product } from "@/types";
import { motion } from "framer-motion";
import { Tag, Package, Truck } from "lucide-react";

interface ProductInfoProps {
  product: Product[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">{product[0].name}</h2>
        
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#FFD700] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Tag size={20} />
            <span className="font-bold">{product[0].category.name}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-2 border-black p-6 bg-[#98FB98] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Package />
              Product Details
            </h3>
            <p className="text-lg">
              {product[0].description}
            </p>
          </div>

          <div className="border-2 border-black p-6 bg-[#87CEEB] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Truck />
              Shipping Information
            </h3>
            <ul className="list-disc list-inside space-y-2 text-lg">
              <li>Free shipping on all orders</li>
              <li>Delivery within 7-15 business days</li>
              <li>Secure packaging for safe delivery</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;