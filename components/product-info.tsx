"use client";

import { motion } from "framer-motion";

export function ProductInfo() {
  return (
    <div className="neu-card border-0">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="neu-card mb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter">BRUTALIST CHAIR</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="px-3 py-1 neu-border bg-[rgb(var(--accent-rgb))]">Category</div>
          </div>
          <h3 className="text-2xl font-bold mb-4">Description</h3>
          <p className="mb-4">
            Crafted with precision and designed with attitude, our Brutalist Chair embraces the raw, unfiltered 
            aesthetic of neubrutalism. The chair features:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Solid oak frame with visible joinery</li>
            <li>Premium upholstery in bold, contrasting colors</li>
            <li>Ergonomic design despite its bold appearance</li>
            <li>Handcrafted by skilled artisans</li>
          </ul>
          <p>
            Each chair is a unique work of functional art that will transform any space. The intentionally 
            unrefined edges and bold geometric shapes create a visual statement that demands attention.
          </p>
        </div>
      </motion.div>
    </div>
  );
}