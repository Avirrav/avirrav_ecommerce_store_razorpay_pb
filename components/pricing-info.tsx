'use client';

import { useState } from "react";
import { CheckoutDialog } from "./checkout-dialog";
import { motion } from "framer-motion";
import { ShoppingBag, Shield, Truck, RefreshCw } from "lucide-react";
import { Product } from "@/types";

interface PricingInfoProps {
  items: Product[];
  username: string;
  productId: string;
  storeUrl: string;
}

const PricingInfo: React.FC<PricingInfoProps> = ({ items, username, productId, storeUrl }) => {
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const product = items[0];
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const handleCheckout = (email: string) => {
    console.log("Proceeding to checkout with email:", email);
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Price */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">{product.name}</h1>
        <div className="flex items-center space-x-3">
          <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
          <span className="text-lg text-gray-500 line-through">₹{(parseFloat(product.price) * 1.2).toFixed(0)}</span>
          <span className="px-2 py-1 bg-red-100 text-red-800 text-sm font-medium rounded">20% OFF</span>
        </div>
      </div>

      {/* Short Description */}
      <p className="text-gray-600 leading-relaxed">
        {product.description || "Premium quality product crafted with attention to detail and designed for everyday comfort and style."}
      </p>

      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Color</h3>
        <div className="flex space-x-3">
          {colors.map((color, index) => (
            <motion.button
              key={index}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                selectedColor === color 
                  ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-2' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Size</h3>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => (
            <motion.button
              key={size}
              className={`py-3 px-4 text-sm font-medium rounded-lg border-2 transition-all ${
                selectedSize === size
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedSize(size)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {size}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Buy Now Button */}
      <motion.button
        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 text-base font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2 shadow-lg"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Add to Cart</span>
      </motion.button>

      {/* Features */}
      <div className="space-y-4 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <Truck className="w-4 h-4 text-green-600" />
          </div>
          <span>Free shipping on orders over ₹500</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <RefreshCw className="w-4 h-4 text-blue-600" />
          </div>
          <span>30-day return policy</span>
        </div>
        <div className="flex items-center space-x-3 text-sm text-gray-600">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
            <Shield className="w-4 h-4 text-purple-600" />
          </div>
          <span>2-year warranty included</span>
        </div>
      </div>

      <CheckoutDialog 
        open={open} 
        onOpenChange={setOpen} 
        onCheckout={handleCheckout} 
        storeUrl={storeUrl}
        username={username}
        productId={productId}
      />
    </div>
  );
};

export default PricingInfo;