'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import { ShoppingBag } from "lucide-react";

interface BuyNowButtonProps {
  onClick: () => void;
  className?: string;
}

export function BuyNowButton({ onClick, className = "" }: BuyNowButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.button
      className={`relative overflow-hidden bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold text-base transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        y: -2
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700"
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '0%' : '-100%' }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
      <ShoppingBag className="w-5 h-5 relative z-10" />
      <span className="relative z-10">BUY NOW</span>
    </motion.button>
  );
}