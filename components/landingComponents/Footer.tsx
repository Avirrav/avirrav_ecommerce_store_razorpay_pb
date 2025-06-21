"use client"
import React from 'react';
import { Instagram, Twitter, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gunmetal text-seasalt py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-black mb-6 tracking-tight">Pugly</div>
            <p className="text-silver-lake-400 leading-relaxed font-light text-sm">
              The ultimate dashboard for dropshipping solopreneurs. 
              Simple, powerful, and built for growth.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-medium mb-6 text-sm tracking-wide">Features</h3>
            <ul className="space-y-3 text-silver-lake-500">
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm font-light">API Integration</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm font-light">Store Management</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm font-light">Order Tracking</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm font-light">Analytics</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-medium mb-6 text-sm tracking-wide">Company</h3>
            <ul className="space-y-3 text-silver-lake-500">
              <li><a href="#pricing" className="hover:text-seasalt transition-colors text-sm font-light">Pricing</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm font-light">Documentation</a></li>
              <li><a href="#" className="hover:text-seasalt transition-colors text-sm font-light">Community</a></li>
              <li><a href="#contact" className="hover:text-seasalt transition-colors text-sm font-light">Contact</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-medium mb-6 text-sm tracking-wide">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-xl hover:bg-yinmn-blue">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-xl hover:bg-yinmn-blue">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-xl hover:bg-yinmn-blue">
                <Github size={18} />
              </a>
              <a href="#" className="text-silver-lake-500 hover:text-seasalt transition-colors p-2 bg-delft-blue rounded-xl hover:bg-yinmn-blue">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-delft-blue pt-8 text-center">
          <p className="text-silver-lake-500 text-xs font-light tracking-wide">
            &copy; 2025 Pugly. Built for solopreneurs.
          </p>
        </div>
      </div>
    </footer>
  );
}