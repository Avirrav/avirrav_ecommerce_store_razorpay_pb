'use client';

import { Product } from "@/types";
import { ProductCard } from "./product-card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      className="polaris-card p-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="flex items-center space-x-3 mb-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
        >
          <Sparkles className="w-6 h-6 text-[#008060]" />
        </motion.div>
        <h2 className="polaris-text-heading-md">Featured Products</h2>
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <ProductCard
              title={product.name}
              price={parseFloat(product.price)}
              image={product.images[0]?.url || ""}
              href={`${product.id}`}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default FeaturedProducts;