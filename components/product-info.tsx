'use client';

import { Product } from "@/types";
import { motion } from "framer-motion";
import { Package, Star, Users, Award } from "lucide-react";

interface ProductInfoProps {
  product: Product[];
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const productData = product[0];

  const features = [
    "Premium materials and construction",
    "Designed for comfort and durability",
    "Available in multiple colors and sizes",
    "Sustainable and eco-friendly production"
  ];

  const specifications = [
    { label: "Category", value: productData.category.name },
  ];

  return (
    <div className="space-y-8">
      {/* Product Details Section */}
      <motion.div 
        className="polaris-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Package className="w-5 h-5 text-[#008060]" />
          <h2 className="polaris-text-heading-md">Product Details</h2>
        </div>
        <p className="polaris-text-body mb-6">
          {productData.description || "Experience premium quality with this carefully crafted product. Made with attention to detail and designed for those who appreciate excellence in both form and function."}
        </p>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-1.5 h-1.5 bg-[#008060] rounded-full mt-2 flex-shrink-0" />
              <span className="polaris-text-body">{feature}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Specifications */}
      <motion.div 
        className="polaris-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2 className="polaris-text-heading-md mb-4">Specifications</h2>
        <div className="space-y-4">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-b-0">
              <span className="polaris-text-caption font-medium">{spec.label}</span>
              <span className="polaris-text-body">{spec.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;