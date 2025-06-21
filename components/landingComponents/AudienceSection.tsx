"use client"
import React from 'react';
import { Users, Store, Code, Briefcase } from 'lucide-react';

const audiences = [
  {
    icon: Users,
    title: "Dropshipping Solopreneurs",
    description: "Perfect for individual entrepreneurs managing multiple stores and suppliers.",
    color: "gunmetal"
  },
  {
    icon: Store,
    title: "Shopify/WooCommerce Owners",
    description: "Seamlessly integrate with your existing e-commerce platforms.",
    color: "delft-blue"
  },
  {
    icon: Code,
    title: "Indie Developers",
    description: "Custom API support for developers building unique e-commerce solutions.",
    color: "yinmn-blue"
  },
  {
    icon: Briefcase,
    title: "Small Brand Founders",
    description: "Scale your brand operations with professional-grade tools.",
    color: "gunmetal"
  }
];

export default function AudienceSection() {
  return (
    <section className="py-32 bg-silver-lake-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-xs font-medium text-yinmn-blue-600 tracking-[0.2em] uppercase mb-8">
            Target Audience
          </p>
          
          <h2 className="mb-8">
            <span className="block text-5xl lg:text-6xl font-black text-gunmetal leading-tight mb-4">
              Who It's
            </span>
            <span className="block text-lg font-light text-yinmn-blue-600 tracking-wide">
              Built For
            </span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-yinmn-blue-600 leading-relaxed font-light">
              Pugly Dashboard is designed for modern e-commerce entrepreneurs who need 
              powerful tools without the complexity.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            
            return (
              <div
                key={index}
                className="bg-seasalt border border-silver-lake-300 rounded-2xl p-8 hover:border-gunmetal transition-all duration-300 group cursor-pointer hover:shadow-xl"
              >
                <div className={`w-16 h-16 bg-${audience.color} flex items-center justify-center rounded-2xl mb-8 group-hover:bg-gunmetal transition-colors duration-300`}>
                  <Icon size={24} className="text-seasalt" />
                </div>
                
                <h3 className="text-xl font-bold text-gunmetal mb-4 leading-tight">
                  {audience.title}
                </h3>
                
                <p className="text-sm text-yinmn-blue-600 leading-relaxed font-light">
                  {audience.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}