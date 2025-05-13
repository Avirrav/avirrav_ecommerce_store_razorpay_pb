"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  {
    id: 1,
    src: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg",
    alt: "Product 1",
  },
  {
    id: 2,
    src: "https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg",
    alt: "Product 2",
  },
  {
    id: 3,
    src: "https://images.pexels.com/photos/2529157/pexels-photo-2529157.jpeg",
    alt: "Product 3",
  },
  {
    id: 4,
    src: "https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg",
    alt: "Product 4",
  },
  {
    id: 5,
    src: "https://images.pexels.com/photos/2529168/pexels-photo-2529168.jpeg",
    alt: "Product 5",
  },
];

export function ImageGallery() {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="mb-12">
      <div className="neu-container">
        {/* Main image */}
        <div className="relative mb-4 neu-card p-0 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage.id}
              src={activeImage.src}
              alt={activeImage.alt}
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
          
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={() => {
                const currentIndex = images.findIndex(img => img.id === activeImage.id);
                const prevIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1;
                setActiveImage(images[prevIndex]);
              }}
              className="p-2 neu-border neu-shadow bg-white dark:bg-[#222]"
            >
              <ChevronLeft />
            </button>
            <button 
              onClick={() => {
                const currentIndex = images.findIndex(img => img.id === activeImage.id);
                const nextIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1;
                setActiveImage(images[nextIndex]);
              }}
              className="p-2 neu-border neu-shadow bg-white dark:bg-[#222]"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-5 gap-4">
          {images.map((image) => (
            <button
              key={image.id}
              className={`neu-border overflow-hidden ${
                activeImage.id === image.id 
                  ? "border-[rgb(var(--primary-rgb))] border-[4px]" 
                  : ""
              }`}
              onClick={() => setActiveImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-20 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}