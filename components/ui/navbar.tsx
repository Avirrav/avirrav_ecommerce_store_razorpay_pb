"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { CheckoutDialog } from "@/components/checkout-dialog";
import { BuyNowButton } from "@/components/buy-now-button";
import getProduct from "@/actions/getProduct";
import { Product } from "@/types";

interface NavbarProps {
  storeUrl: string;
  username: string;
  productId: string;
}

export function Navbar({ storeUrl, username, productId }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await getProduct(productId, storeUrl);
      setProduct(product);
    };
    fetchProduct();
  }, [productId, storeUrl]);

  const handleCheckout = (email: string) => {
    console.log("Proceeding to checkout with email:", email);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFAF0] border-b-4 border-black">
      <div className="neu-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Hexagonal Price */}
            <div className="transform hover:rotate-6 transition-transform duration-300">
              <div className="bg-[#FF6B6B] text-white p-4 clip-hex border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="font-black text-lg">₹{product?.price || '---'}</span>
              </div>
            </div>
            {/* Product Name */}
            <h1 className="text-2xl font-black tracking-tight">{product?.name || 'Loading...'}</h1>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-3 border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[-4px] transition-transform duration-300"
            >
              {theme === "dark" ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
            </button>
            <div className="transform hover:translate-y-[-4px] transition-transform duration-300">
              <BuyNowButton
                className="px-8 py-3 text-white border-4 border-black bg-[#FF6B6B] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black tracking-wide"
                onClick={() => setOpen(true)}
              />
            </div>
          </div>
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
    </nav>
  );
}