"use client"
import React from 'react';
import { Instagram, Twitter, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gunmetal text-seasalt py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="text-xl md:text-2xl font-black mb-3 md:mb-4">Pugly</div>
            <p className="text-silver-lake-400 leading-relaxed text-xs md:text-sm mb-4 md:mb-6">
              Modern e-commerce dashboard for dropshipping businesses. Centralized management with API integration.
            </p>
            <div className="flex space-x-2 md:space-x-3">
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-lg hover:bg-yinmn-blue">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-lg hover:bg-yinmn-blue">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-lg hover:bg-yinmn-blue">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-lg hover:bg-yinmn-blue">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium mb-3 md:mb-4 text-xs md:text-sm">Product</h3>
            <ul className="space-y-2 md:space-y-3 text-silver-lake-400">
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Features</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Pricing</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Integrations</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">API Documentation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-3 md:mb-4 text-xs md:text-sm">Company</h3>
            <ul className="space-y-2 md:space-y-3 text-silver-lake-400">
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">About Us</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Blog</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Careers</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-medium mb-3 md:mb-4 text-xs md:text-sm">Support</h3>
            <ul className="space-y-2 md:space-y-3 text-silver-lake-400">
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Help Center</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Community</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Status</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-xs md:text-sm">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-delft-blue pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-silver-lake-500 text-xs md:text-sm mb-3 md:mb-0">
            &copy; 2025 Pugly. Built for solopreneurs.
          </p>
          <div className="flex items-center gap-4 md:gap-6 text-silver-lake-500 text-xs md:text-sm">
            <a href="#" className="hover:text-seasalt transition-colors">Terms</a>
            <a href="#" className="hover:text-seasalt transition-colors">Privacy</a>
            <a href="#" className="hover:text-seasalt transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}