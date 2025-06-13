'use client';

import { useState } from "react";
import { CheckoutDialog } from "./checkout-dialog";
import { motion } from "framer-motion";
import { ShoppingBag, Shield, Truck, Palette, Ruler } from "lucide-react";
import { Product } from "@/types";

interface PricingInfoProps {
  items: Product[];
  username: string;
  productId: string;
  storeUrl: string;
}

const PricingInfo: React.FC<PricingInfoProps> = ({ items, username, productId, storeUrl }) => {
  const [open, setOpen] = useState(false);

  const product = items[0];

  const handleCheckout = (email: string) => {
    console.log("Proceeding to checkout with email:", email);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Product Title and Price */}
      <motion.div variants={itemVariants}>
        <motion.h1 
          className="text-3xl font-semibold text-gray-900 mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {product.name}
        </motion.h1>
        <motion.div 
          className="flex items-center space-x-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-lg text-gray-500 line-through">₹{(parseFloat(product.price) * 1.2).toFixed(0)}</span>
          <motion.span 
            className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5, type: "spring", stiffness: 200 }}
          >
            20% OFF
          </motion.span>
        </motion.div>
      </motion.div>

      {/* Color Display */}
      {product.color && (
        <motion.div variants={itemVariants}>
          <div className="flex items-center space-x-3 mb-3">
            <Palette className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Color</h3>
          </div>
          <motion.div 
            className="inline-flex items-center px-4 py-3 bg-gray-50 rounded-lg border"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-8 h-8 rounded-full m-1 border-2 border-gray-300 shadow-sm"
              style={{ backgroundColor: product.color.value }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
            />
            <span className="text-sm font-medium text-gray-700">{product.color.name}</span>
          </motion.div>
        </motion.div>
      )}

      {/* Size Display */}
      {product.size && (
        <motion.div variants={itemVariants}>
          <div className="flex items-center space-x-3 mb-3">
            <Ruler className="w-4 h-4 text-gray-600" />
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">Size</h3>
          </div>
          <motion.div 
            className="inline-flex items-center px-4 py-3 bg-gray-50 rounded-lg border"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <span className="text-sm font-medium text-gray-700">{product.size.name} ({product.size.value})</span>
          </motion.div>
        </motion.div>
      )}

      {/* Buy Now Button */}
      <motion.div variants={itemVariants}>
        <motion.button
          className="w-full bg-[#008060] hover:bg-[#004c3f] text-white py-4 text-base font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
          onClick={() => setOpen(true)}
          whileHover={{ 
            scale: 1.02,
            y: -2,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div
            initial={{ rotate: 0 }}
            whileHover={{ rotate: 15 }}
            transition={{ duration: 0.2 }}
          >
            <ShoppingBag className="w-5 h-5" />
          </motion.div>
          <span>Buy Now</span>
        </motion.button>
      </motion.div>

      {/* Payment & Delivery Badges */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-3 pt-4"
        variants={itemVariants}
      >
        <motion.div 
          className="flex items-center space-x-3 bg-green-50 px-4 py-3 rounded-lg border border-green-200 flex-1"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.7, type: "spring" }}
          >
            <Shield className="w-4 h-4 text-green-600" />
          </motion.div>
          <div>
            <p className="text-sm font-medium text-green-900">Secured Payment</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center space-x-3 bg-blue-50 px-4 py-3 rounded-lg border border-blue-200 flex-1"
          whileHover={{ scale: 1.02, y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4, delay: 0.8, type: "spring" }}
          >
            <Truck className="w-4 h-4 text-blue-600" />
          </motion.div>
          <div>
            <p className="text-sm font-medium text-blue-900">Free Delivery</p>  
          </div>
        </motion.div>
      </motion.div>

      <CheckoutDialog 
        open={open} 
        onOpenChange={setOpen} 
        onCheckout={handleCheckout} 
        storeUrl={storeUrl}
        username={username}
        productId={productId}
      />
    </motion.div>
  );
};

export default PricingInfo;