'use client';

import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  href: string;
}

export function ProductCard({ title, price, image, href }: ProductCardProps) {
  return (
    <motion.a 
      href={href} 
      className="block group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="polaris-card overflow-hidden group-hover:shadow-md transition-shadow duration-200">
        <div className="aspect-square bg-gray-50 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{title}</h3>
          <p className="text-lg font-semibold text-[#008060]">₹{price}</p>
        </div>
      </div>
    </motion.a>
  );
}