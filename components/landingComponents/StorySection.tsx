"use client"
import React from 'react';
import { Database, Zap, Settings, TrendingUp, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Database,
    title: "Connect Custom Stores via API",
    description: "Connect your custom-built stores via API integration. Manage multiple stores from one centralized dashboard.",
    color: "gunmetal"
  },
  {
    icon: Settings,
    title: "Product & Order Management",
    description: "Manage products and orders efficiently. Intuitive dashboard interface with fast, responsive design.",
    color: "delft-blue"
  },
  {
    icon: Zap,
    title: "Fast & Responsive",
    description: "Lightning-fast interface designed for speed. Built specifically for dropshipping operations and micro-brands.",
    color: "yinmn-blue"
  },
  {
    icon: TrendingUp,
    title: "Analytics & Insights",
    description: "Basic analytics included with advanced analytics coming soon. Track your business performance effectively.",
    color: "gunmetal"
  }
];

export default function StorySection() {
  return (
    <section className="min-h-screen bg-silver-lake-50 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-6">
            <Zap className="w-4 h-4 text-gunmetal" />
            <span className="text-sm font-medium text-gunmetal">Core Features</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gunmetal mb-6">
            Everything You Need in One Place
          </h2>
          
          <p className="text-lg text-yinmn-blue-600 max-w-2xl mx-auto leading-relaxed">
            Core features of Pugly Dashboard - built for dropshipping businesses and e-commerce management.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={index}
                className="bg-seasalt border border-silver-lake-200 rounded-2xl p-8 hover:shadow-lg hover:border-gunmetal/20 transition-all duration-300 group"
              >
                <div className={`w-16 h-16 bg-${feature.color} flex items-center justify-center rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} className="text-seasalt" />
                </div>
                
                <h3 className="text-xl font-bold text-gunmetal mb-4 leading-tight">
                  {feature.title}
                </h3>
                
                <p className="text-yinmn-blue-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <button className="flex items-center gap-2 text-gunmetal hover:text-delft-blue font-medium text-sm transition-colors group">
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gunmetal rounded-2xl p-8 text-seasalt">
            <h3 className="text-2xl font-bold mb-4">Ready to streamline your operations?</h3>
            <p className="text-silver-lake-300 mb-6">
              Join dropshipping businesses already using Pugly to manage their operations efficiently.
            </p>
            <button className="bg-seasalt text-gunmetal px-8 py-4 rounded-xl hover:bg-silver-lake-100 transition-colors font-medium">
              Start Trial
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}