"use client"
import React, { useState } from 'react';
import { Home, Zap, Users, DollarSign, Map, HelpCircle, Mail } from 'lucide-react';

interface SidebarProps {
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

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-seasalt border-r border-silver-lake-300 z-50 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-silver-lake-300">
        <span className="text-3xl font-black text-gunmetal tracking-tight">Pugly</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                isActive
                  ? 'bg-gunmetal text-seasalt shadow-lg'
                  : 'text-gunmetal hover:bg-gunmetal/10 hover:text-gunmetal'
              }`}
            >
              <Icon size={18} />
              <span className="font-medium text-sm tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* CTA Button */}
      <div className="p-4 border-t border-silver-lake-300">
        <button className="w-full bg-gunmetal text-seasalt px-4 py-3 rounded-xl hover:bg-delft-blue transition-all duration-300 font-medium text-sm tracking-wide">
          Start Trial
        </button>
      </div>
    </div>
  );
}