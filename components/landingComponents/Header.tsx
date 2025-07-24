"use client"
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-seasalt/95 backdrop-blur-xl border-b border-silver-lake-300/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="https://www.pugly.store"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl font-black text-gunmetal tracking-tight hover:text-delft-blue transition-colors cursor-pointer select-none"
            >
              Pugly
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            <a href="#features" className="text-sm font-medium text-yinmn-blue-600 hover:text-gunmetal transition-colors tracking-wide">
              Features
            </a>
            <a href="#pricing" className="text-sm font-medium text-yinmn-blue-600 hover:text-gunmetal transition-colors tracking-wide">
              Pricing
            </a>
            <a href="#community" className="text-sm font-medium text-yinmn-blue-600 hover:text-gunmetal transition-colors tracking-wide">
              Community
            </a>
            <a href="#contact" className="text-sm font-medium text-yinmn-blue-600 hover:text-gunmetal transition-colors tracking-wide">
              Contact
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <button className="bg-gunmetal text-seasalt px-8 py-3 rounded-xl hover:bg-delft-blue transition-all duration-300 font-medium text-sm tracking-wide">
              Start Trial
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-yinmn-blue-600 hover:text-gunmetal"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-seasalt rounded-2xl mt-4 border border-silver-lake-300/20">
            <div className="px-6 pt-4 pb-6 space-y-4">
              <a href="#features" className="block text-sm font-medium text-yinmn-blue-600 hover:text-gunmetal tracking-wide">
                Features
              </a>
              <a href="#pricing" className="block text-sm font-medium text-yinmn-blue-600 hover:text-gunmetal tracking-wide">
                Pricing
              </a>
              <a href="#community" className="block text-sm font-medium text-yinmn-blue-600 hover:text-gunmetal tracking-wide">
                Community
              </a>
              <a href="#contact" className="block text-sm font-medium text-yinmn-blue-600 hover:text-gunmetal tracking-wide">
                Contact
              </a>
              <a
                    href="https://admin.pugly.store"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
              >
              <button className="w-full mt-4 bg-gunmetal text-seasalt px-8 py-3 rounded-xl hover:bg-delft-blue transition-all duration-300 font-medium text-sm tracking-wide">
                Start Trial
              </button>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}