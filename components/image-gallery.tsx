'use client';

import { useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Image } from "@/types";

interface GalleryProps {
  images: Image[];
}

const ImageGallery: React.FC<GalleryProps> = ({ images = [] }) => {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    const currentIndex = images.findIndex(img => img.id === activeImage.id);
    const nextIndex = currentIndex >= images.length - 1 ? 0 : currentIndex + 1;
    setActiveImage(images[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = images.findIndex(img => img.id === activeImage.id);
    const prevIndex = currentIndex <= 0 ? images.length - 1 : currentIndex - 1;
    setActiveImage(images[prevIndex]);
  };

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="relative group">
        <div className="aspect-square bg-gray-50 rounded-lg overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage?.id}
              src={activeImage?.url}
              alt={activeImage?.alt}
              className="w-full h-full object-cover cursor-zoom-in"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsZoomed(true)}
            />
          </AnimatePresence>
          
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}
          
          {/* Zoom indicator */}
          <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn className="w-4 h-4 text-gray-700" />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images.map((image) => (
            <button
              key={image.id}
              className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                activeImage?.id === image.id 
                  ? "border-[#008060] ring-2 ring-[#008060]/20" 
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => setActiveImage(image)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom modal */}
      {isZoomed && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-4xl max-h-full">
            <img
              src={activeImage?.url}
              alt={activeImage?.alt}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white"
            >
              <ChevronRight className="w-6 h-6 rotate-45" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;