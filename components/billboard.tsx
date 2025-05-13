"use client";

import React from "react";
import { motion } from "framer-motion";

export function Billboard() {
  return (
    <motion.div 
      className="neu-card bg-[rgb(var(--accent-rgb))]  sm:mx-8  mt-8 mb-8 p-0 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="neu-container py-28 px-4 flex flex-col items-center justify-center text-center">
        <motion.h1 
          className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          SUMMER COLLECTION
        </motion.h1>
      </div>
    </motion.div>
  );
}