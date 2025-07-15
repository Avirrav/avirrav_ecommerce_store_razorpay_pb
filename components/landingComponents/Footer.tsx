"use client"
import React from 'react';
import { Instagram, Twitter, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gunmetal text-seasalt py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="text-2xl font-black mb-4">Pugly</div>
            <p className="text-silver-lake-400 leading-relaxed text-sm mb-6">
              Modern e-commerce dashboard for dropshipping businesses. Centralized management with API integration.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-lg hover:bg-yinmn-blue">
                <Instagram size={16} />
              </a>
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-lg hover:bg-yinmn-blue">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-lg hover:bg-yinmn-blue">
                <Github size={16} />
              </a>
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-lg hover:bg-yinmn-blue">
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Product</h3>
            <ul className="space-y-3 text-silver-lake-400">
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Features</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Pricing</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Integrations</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">API Documentation</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Company</h3>
            <ul className="space-y-3 text-silver-lake-400">
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-medium mb-4 text-sm">Support</h3>
            <ul className="space-y-3 text-silver-lake-400">
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Community</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Status</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-delft-blue pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-silver-lake-500 text-sm mb-4 md:mb-0">
            &copy; 2025 Pugly. Built for solopreneurs.
          </p>
          <div className="flex items-center gap-6 text-silver-lake-500 text-sm">
            <a href="#" className="hover:text-seasalt transition-colors">Terms</a>
            <a href="#" className="hover:text-seasalt transition-colors">Privacy</a>
            <a href="#" className="hover:text-seasalt transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}