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
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
    >
      <motion.div 
        className="bg-seasalt border border-silver-lake-200 rounded-lg shadow-sm overflow-hidden group-hover:shadow-lg transition-all duration-300"
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="aspect-square bg-silver-lake-50 overflow-hidden relative">
          <motion.img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          <motion.div
            className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          />
        </div>
        <motion.div 
          className="p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3 
            className="font-semibold text-gunmetal mb-2 line-clamp-2"
            whileHover={{ color: "#273654" }}
            transition={{ duration: 0.2 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-lg font-bold text-gunmetal"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            ₹{price}
          </motion.p>
        </motion.div>
      </motion.div>
    </motion.a>
  );
}