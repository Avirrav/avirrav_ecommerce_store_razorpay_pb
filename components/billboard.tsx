'use client';

import React from "react";
import { motion } from "framer-motion";
import type { Billboard } from "@/types";

interface BillboardProps {
  data: Billboard;
}

const BillboardPage: React.FC<BillboardProps> = ({ data }) => {
  const hasImage = data?.imageUrl && data.imageUrl.length > 0;
  const hasLabel = data?.label && data.label.length > 0;

  return (
    <motion.div 
      className="polaris-card relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image or Gradient */}
      {hasImage ? (
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${data.imageUrl})` }}
        />
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#008060] to-[#00a47c]" />
      )}
      
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 px-8 py-24 text-center">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {hasLabel ? data.label : "Welcome to our store"}
        </motion.h1>
        <motion.p
          className="text-xl text-white/90 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Discover our curated collection of premium products
        </motion.p>
      </div>
    </motion.div>
  );
}

export default BillboardPage;