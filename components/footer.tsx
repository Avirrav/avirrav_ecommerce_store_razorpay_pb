'use client';

import { Mail, Phone, MapPin, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import getStore from "@/actions/getStore";
import { Store } from "@/types";

interface FooterProps {
  username?: string;
}

export function Footer({ username }: FooterProps) {
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
    <footer className="bg-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Thank you message and Powered by section */}
        <div className=" pt-8">
          <div className="text-center space-y-4">
            <p className="text-lg font-bold text-white">
              © 2024 {store?.name || "Store"}. Thank you for shopping.
            </p>
            <p className="text-sm text-[#bfc7d1]">
              Powered by <span className="font-bold text-[#7ed957]">Pugly</span>
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 mt-8">
            <div className="flex space-x-8">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[#bfc7d1] hover:text-[#7ed957] transition-colors duration-200 text-sm font-medium"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}