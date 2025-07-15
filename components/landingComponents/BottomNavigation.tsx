"use client"
import React, { useState } from 'react';
import { Home, Zap, Users, DollarSign, Map, HelpCircle, Mail, MoreHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BottomNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigationItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'features', label: 'Features', icon: Zap },
  { id: 'audience', label: 'Audience', icon: Users },
  { id: 'pricing', label: 'Pricing', icon: DollarSign },
  { id: 'roadmap', label: 'Roadmap', icon: Map },
  { id: 'faq', label: 'FAQ', icon: HelpCircle },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function BottomNavigation({ activeSection, onSectionChange }: BottomNavigationProps) {
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // First 4 items for main navigation
  const mainItems = navigationItems.slice(0, 4);
  // Remaining items for "more" menu
  const moreItems = navigationItems.slice(4);

  const handleItemClick = (itemId: string) => {
    onSectionChange(itemId);
    setShowMoreMenu(false);
  };

  return (
    <>
      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-seasalt border-t border-silver-lake-300 z-50 md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {/* Main navigation items */}
          {mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
                  isActive
                    ? 'bg-gunmetal text-seasalt shadow-lg'
                    : 'text-gunmetal hover:bg-gunmetal/10'
                }`}
              >
                <Icon size={20} className="mb-1" />
                <span className="text-xs font-medium truncate">{item.label}</span>
              </button>
            );
          })}
          
          {/* More button */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-200 min-w-0 flex-1 ${
              showMoreMenu || moreItems.some(item => item.id === activeSection)
                ? 'bg-gunmetal text-seasalt shadow-lg'
                : 'text-gunmetal hover:bg-gunmetal/10'
            }`}
          >
            <MoreHorizontal size={20} className="mb-1" />
            <span className="text-xs font-medium">More</span>
          </button>
        </div>
      </div>

      {/* More Menu Overlay */}
      <AnimatePresence>
        {showMoreMenu && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMoreMenu(false)}
            />
            
            {/* More Menu */}
            <motion.div
              className="fixed bottom-20 left-4 right-4 bg-seasalt rounded-2xl shadow-2xl border border-silver-lake-300 z-50 md:hidden"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-silver-lake-300">
                <span className="text-lg font-bold text-gunmetal">More Options</span>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="p-2 hover:bg-silver-lake-100 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gunmetal" />
                </button>
              </div>
              
              {/* Menu Items */}
              <div className="p-2">
                {moreItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleItemClick(item.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        isActive
                          ? 'bg-gunmetal text-seasalt shadow-lg'
                          : 'text-gunmetal hover:bg-gunmetal/10'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* CTA Button */}
              <div className="p-4 border-t border-silver-lake-300">
                <button className="w-full bg-gunmetal text-seasalt px-4 py-3 rounded-xl hover:bg-delft-blue transition-all duration-300 font-medium text-sm">
                  Start Trial
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for bottom navigation */}
      <div className="h-20 md:hidden" />
    </>
  );
}