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
    { label: "Material", value: "Premium Cotton Blend" },
    { label: "Care Instructions", value: "Machine wash cold" },
    { label: "Origin", value: "Made in India" }
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

      {/* Reviews Summary */}
      <motion.div 
        className="polaris-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-[#008060]" />
          <h2 className="polaris-text-heading-md">Customer Reviews</h2>
        </div>
        
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="polaris-text-body font-medium">4.8 out of 5</span>
          <span className="polaris-text-caption">(247 reviews)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Users className="w-6 h-6 text-[#008060] mx-auto mb-2" />
            <div className="text-2xl font-semibold text-gray-900">247</div>
            <div className="polaris-text-caption">Happy Customers</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Award className="w-6 h-6 text-[#008060] mx-auto mb-2" />
            <div className="text-2xl font-semibold text-gray-900">98%</div>
            <div className="polaris-text-caption">Satisfaction Rate</div>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <Star className="w-6 h-6 text-[#008060] mx-auto mb-2" />
            <div className="text-2xl font-semibold text-gray-900">4.8</div>
            <div className="polaris-text-caption">Average Rating</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductInfo;