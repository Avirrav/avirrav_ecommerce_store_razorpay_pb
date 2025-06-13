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

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Product Details Section */}
      <motion.div 
        className="polaris-card p-6"
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="flex items-center space-x-2 mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
          >
            <Package className="w-5 h-5 text-[#008060]" />
          </motion.div>
          <h2 className="polaris-text-heading-md">Product Details</h2>
        </motion.div>
        
        <motion.p 
          className="polaris-text-body mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {productData.description || "Experience premium quality with this carefully crafted product. Made with attention to detail and designed for those who appreciate excellence in both form and function."}
        </motion.p>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="flex items-start space-x-3"
              variants={featureVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <motion.div 
                className="w-1.5 h-1.5 bg-[#008060] rounded-full mt-2 flex-shrink-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1, type: "spring" }}
              />
              <span className="polaris-text-body">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Specifications */}
      <motion.div 
        className="polaris-card p-6"
        variants={itemVariants}
        whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
        transition={{ duration: 0.3 }}
      >
        <motion.h2 
          className="polaris-text-heading-md mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Specifications
        </motion.h2>
        <div className="space-y-4">
          {specifications.map((spec, index) => (
            <motion.div 
              key={index} 
              className="flex justify-between py-2 border-b border-gray-100 last:border-b-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <span className="polaris-text-caption font-medium">{spec.label}</span>
              <span className="polaris-text-body">{spec.value}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductInfo;