"use client"
import React from 'react';
import { Users, Store, Code, Briefcase, CheckCircle } from 'lucide-react';

const audiences = [
  {
    icon: Users,
    title: "Dropshipping Enthusiasts",
    description: "Perfect for dropshipping enthusiasts and those already running dropshipping businesses.",
    benefits: ["Multi-store management", "Product management", "Order tracking"],
    color: "gunmetal"
  },
  {
    icon: Store,
    title: "Small Businesses",
    description: "Ideal for small businesses selling products who need centralized management.",
    benefits: ["Product catalog", "Order management", "Business analytics"],
    color: "delft-blue"
  },
  {
    icon: Code,
    title: "Technical Users",
    description: "Technical users needing dashboard functionality combined with API access.",
    benefits: ["API integration", "Custom development", "Technical support"],
    color: "yinmn-blue"
  },
  {
    icon: Briefcase,
    title: "Micro-Brand Owners",
    description: "Micro-brands and solopreneurs looking to scale their operations efficiently.",
    benefits: ["Brand scaling", "Operational efficiency", "Growth analytics"],
    color: "gunmetal"
  }
];

export default function AudienceSection() {
  return (
    <section className="min-h-screen bg-seasalt flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-6">
            <Users className="w-4 h-4 text-gunmetal" />
            <span className="text-sm font-medium text-gunmetal">Target Audience</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gunmetal mb-4 md:mb-6">
            Built for Modern Entrepreneurs
          </h2>
          
          <p className="text-base md:text-lg text-yinmn-blue-600 max-w-2xl mx-auto leading-relaxed">
            Pugly Dashboard is designed for dropshipping businesses, solopreneurs, and micro-brands who need powerful tools without complexity.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-16">
          {audiences.map((audience, index) => {
            const Icon = audience.icon;
            
            return (
              <div
                key={index}
                className="bg-white border border-silver-lake-200 rounded-2xl p-6 md:p-8 hover:shadow-lg hover:border-gunmetal/20 transition-all duration-300"
              >
                <div className="flex items-start gap-4 md:gap-6">
                  <div className={`w-16 h-16 bg-${audience.color} flex items-center justify-center rounded-2xl flex-shrink-0`}>
                    <Icon size={24} className="text-seasalt" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-gunmetal mb-2 md:mb-3 leading-tight">
                      {audience.title}
                    </h3>
                    
                    <p className="text-sm md:text-base text-yinmn-blue-600 leading-relaxed mb-3 md:mb-4">
                      {audience.description}
                    </p>

                    <div className="space-y-1.5 md:space-y-2">
                      {audience.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-xs md:text-sm text-gunmetal">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-silver-lake-50 rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div>
              <div className="text-2xl md:text-3xl font-black text-gunmetal mb-1 md:mb-2">1000+</div>
              <div className="text-sm md:text-base text-yinmn-blue-600">Active Users</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-delft-blue mb-1 md:mb-2">50+</div>
              <div className="text-sm md:text-base text-yinmn-blue-600">Integrations</div>
            </div>
            <div>
              <div className="text-2xl md:text-3xl font-black text-yinmn-blue mb-1 md:mb-2">99.9%</div>
              <div className="text-sm md:text-base text-yinmn-blue-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}