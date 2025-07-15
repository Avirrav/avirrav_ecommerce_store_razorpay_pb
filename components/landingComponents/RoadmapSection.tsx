"use client"
import React from 'react';
import { Calendar, Mail, Bell, Bot, Truck, CreditCard, Users, Image, BarChart3, Smartphone, Settings } from 'lucide-react';

const roadmapItems = [
  {
    id: 1,
    quarter: "0-3 Months",
    title: "Core Integrations",
    icon: Mail,
    status: "in-progress",
    description: "Essential integrations for seamless operations",
    features: ["Email Server Integration", "Dashboard Notifications", "Email Notifications", "Multiple Payment Gateways"],
    progress: 25
  },
  {
    id: 2,
    quarter: "3-6 Months",
    title: "AI & Automation",
    icon: Bot,
    status: "planned",
    description: "AI-powered tools for product management and marketing",
    features: ["AI Product Importer (Amazon, Flipkart, AliExpress)", "Auto Product Listings", "AI Marketing Assistant", "Email & Ad Generation"],
    progress: 0
  },
  {
    id: 3,
    quarter: "3-6 Months",
    title: "Shipping & Fulfillment",
    icon: Truck,
    status: "planned",
    description: "Automated shipping and fulfillment solutions",
    features: ["Shiprocket Integration", "Delhivery Integration", "Pickrr Integration", "Automated Fulfillment"],
    progress: 0
  },
  {
    id: 4,
    quarter: "3-6 Months",
    title: "Enhanced Onboarding",
    icon: Users,
    status: "planned",
    description: "Improved user experience and guidance",
    features: ["Guided Walkthrough", "Product Demo Videos", "Interactive Tutorials", "Better UX Flow"],
    progress: 0
  },
  {
    id: 5,
    quarter: "6-12 Months",
    title: "Content Tools",
    icon: Image,
    status: "future",
    description: "Advanced content creation and management tools",
    features: ["AI Image Editor", "Background Remover", "Product Catalog Export", "Excel/CSV Export"],
    progress: 0
  },
  {
    id: 6,
    quarter: "12+ Months",
    title: "Advanced Analytics",
    icon: BarChart3,
    status: "future",
    description: "Comprehensive business intelligence and insights",
    features: ["Revenue Analytics", "Profit Tracking", "Order Heatmaps", "Performance Logs"],
    progress: 0
  },
  {
    id: 7,
    quarter: "12+ Months",
    title: "Platform Expansion",
    icon: Settings,
    status: "future",
    description: "Marketplace and team management features",
    features: ["App Marketplace", "3rd-party Plugins", "Team Management", "Role-based Access"],
    progress: 0
  },
  {
    id: 8,
    quarter: "12+ Months",
    title: "Mobile Experience",
    icon: Smartphone,
    status: "future",
    description: "Mobile applications for on-the-go management",
    features: ["Progressive Web App (PWA)", "Native iOS App", "Native Android App", "Mobile Notifications"],
    progress: 0
  }
];

export default function RoadmapSection() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-gunmetal text-seasalt';
      case 'planned':
        return 'bg-delft-blue text-seasalt';
      case 'future':
        return 'bg-yinmn-blue text-seasalt';
      default:
        return 'bg-silver-lake-600 text-seasalt';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'In Progress';
      case 'planned':
        return 'Planned';
      case 'future':
        return 'Future';
      default:
        return 'Unknown';
    }
  };

  return (
    <section className="min-h-screen bg-seasalt flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-gunmetal" />
            <span className="text-sm font-medium text-gunmetal">Product Roadmap</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gunmetal mb-4 md:mb-6">
            What's Coming Next
          </h2>
          
          <p className="text-base md:text-lg text-yinmn-blue-600 max-w-2xl mx-auto leading-relaxed">
            Exciting new features and improvements planned to supercharge your dropshipping operations and e-commerce management.
          </p>
        </div>

        {/* Timeline Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-gunmetal rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-seasalt" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gunmetal mb-1 md:mb-2">Short-Term</h3>
            <p className="text-yinmn-blue-600 text-xs md:text-sm">0-6 months</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-delft-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Settings className="w-8 h-8 text-seasalt" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gunmetal mb-1 md:mb-2">Mid-Term</h3>
            <p className="text-yinmn-blue-600 text-xs md:text-sm">6-12 months</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yinmn-blue rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BarChart3 className="w-8 h-8 text-seasalt" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-gunmetal mb-1 md:mb-2">Long-Term</h3>
            <p className="text-yinmn-blue-600 text-xs md:text-sm">12+ months</p>
          </div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {roadmapItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={item.id}
                className="bg-white border border-silver-lake-200 rounded-2xl p-4 md:p-6 hover:shadow-lg hover:border-gunmetal/20 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3 md:mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(item.status)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs font-medium text-yinmn-blue-600 bg-silver-lake-100 px-2 py-0.5 rounded-full mb-1">
                      {item.quarter}
                    </div>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-3 md:mb-4">
                  <h3 className="text-base md:text-lg font-bold text-gunmetal mb-1 md:mb-2">
                    {item.title}
                  </h3>
                  <p className="text-yinmn-blue-600 text-xs md:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Progress Bar (for in-progress items) */}
                {item.status === 'in-progress' && (
                  <div className="mb-3 md:mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-medium text-gunmetal">Progress</span>
                      <span className="text-xs font-medium text-gunmetal">{item.progress}%</span>
                    </div>
                    <div className="w-full bg-silver-lake-200 rounded-full h-2">
                      <div 
                        className="bg-gunmetal h-2 rounded-full transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Features List */}
                <div className="space-y-1.5 md:space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-delft-blue rounded-full flex-shrink-0 mt-2" />
                      <span className="text-xs text-gunmetal leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8 md:mt-16">
          <div className="bg-silver-lake-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-bold text-gunmetal mb-3 md:mb-4">
              Want to influence our roadmap?
            </h3>
            <p className="text-sm md:text-base text-yinmn-blue-600 mb-4 md:mb-6">
              Join our community of dropshipping businesses and help shape Pugly's future with your feedback and suggestions.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <button className="bg-gunmetal text-seasalt px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-delft-blue transition-colors font-medium text-sm md:text-base">
                Join Community
              </button>
              <button className="border-2 border-silver-lake-300 text-gunmetal px-6 md:px-8 py-3 md:py-4 rounded-xl hover:border-gunmetal transition-colors font-medium text-sm md:text-base">
                Request Feature
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}