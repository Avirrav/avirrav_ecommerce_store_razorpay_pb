"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { CheckoutDialog } from "@/components/checkout-dialog";
import { BuyNowButton } from "@/components/buy-now-button";
import getProduct from "@/actions/getProduct";

interface NavbarProps {
  storeUrl: string;
  username: string;
  productId: string;
}

 export async function Navbar({ storeUrl, username, productId }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const product = await getProduct(productId, storeUrl);

  const handleCheckout = (email: string) => {
    console.log("Proceeding to checkout with email:", email);

  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background">
      <div className="neu-container py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Hexagonal Price */}
            <div className="relative">
              <div className="bg-[rgb(var(--primary-rgb))] text-white p-4 clip-hex neu-border">
                <span className="font-bold">₹{product.price}</span>
              </div>
            </div>
            {/* Product Name */}
            <h1 className="text-xl font-bold">{product.name}</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 neu-border neu-shadow"
            >
              {theme === "dark" ? <SunIcon /> : <MoonIcon />}
            </button>
            <BuyNowButton
              className="px-8 text-white"
              onClick={() => setOpen(true)}
            />
          </div>
        </div>
      </div>
      <div className="h-[3px] bg-[rgb(var(--border-rgb))]" />
      
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