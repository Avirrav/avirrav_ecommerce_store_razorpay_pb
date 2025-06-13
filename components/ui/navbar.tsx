'use client';

import { useEffect, useState } from "react";
import getStore from "@/actions/getStore";
import { Store } from "@/types";

interface NavbarProps {
  storeUrl?: string;
  username: string;
  productId?: string;
}

export function Navbar({ username }: NavbarProps) {
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      if (username) {
        const storeData = await getStore(username);
        setStore(storeData);
      }
    };
    
    fetchStore();
  }, [username]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a] border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-16">
          <h1 className="text-xl font-semibold text-white">
            {store?.name || "Store"}
          </h1>
        </div>
      </div>
    </nav>
  );
}