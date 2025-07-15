"use client"
import React from 'react';
import { Calendar, Database, Bot, Shield, Globe, Sparkles } from 'lucide-react';

const roadmapItems = [
  {
    id: 1,
    quarter: "Q1 2025",
    title: "Advanced Analytics",
    icon: Database,
    status: "in-progress",
    description: "Real-time insights & performance tracking",
    features: ["Revenue Analytics", "Customer Insights", "Performance Metrics"],
    progress: 75
  },
  {
    id: 2,
    quarter: "Q2 2025",
    title: "AI Automation",
    icon: Bot,
    status: "planned",
    description: "Smart workflows & automated processes",
    features: ["Auto Inventory", "Smart Pricing", "Order Processing"],
    progress: 0
  },
  {
    id: 3,
    quarter: "Q3 2025",
    title: "Security Suite",
    icon: Shield,
    status: "planned",
    description: "Enhanced security & fraud protection",
    features: ["2FA Security", "Fraud Detection", "Data Encryption"],
    progress: 0
  },
  {
    id: 4,
    quarter: "Q4 2025",
    title: "Global Integration",
    icon: Globe,
    status: "planned",
    description: "Multi-currency & international support",
    features: ["Multi-Currency", "Global Shipping", "Tax Compliance"],
    progress: 0
  },
  {
    id: 5,
    quarter: "Q1 2026",
    title: "Mobile App",
    icon: Sparkles,
    status: "future",
    description: "Native iOS & Android applications",
    features: ["iOS App", "Android App", "Push Notifications"],
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
    <section className="min-h-screen bg-seasalt flex items-center justify-center">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-gunmetal" />
            <span className="text-sm font-medium text-gunmetal">Product Roadmap</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gunmetal mb-6">
            What's Coming Next
          </h2>
          
          <p className="text-lg text-yinmn-blue-600 max-w-2xl mx-auto leading-relaxed">
            Exciting new features and improvements planned to supercharge your e-commerce operations.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {roadmapItems.map((item, index) => {
            const Icon = item.icon;
            
            return (
              <div
                key={item.id}
                className="bg-white border border-silver-lake-200 rounded-2xl p-6 hover:shadow-lg hover:border-gunmetal/20 transition-all duration-300"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getStatusColor(item.status)}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs font-medium text-yinmn-blue-600 bg-silver-lake-100 px-2 py-1 rounded-full mb-1">
                      {item.quarter}
                    </div>
                    <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {getStatusText(item.status)}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gunmetal mb-2">
                    {item.title}
                  </h3>
                  <p className="text-yinmn-blue-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Progress Bar (for in-progress items) */}
                {item.status === 'in-progress' && (
                  <div className="mb-4">
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
                <div className="space-y-2">
                  {item.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-delft-blue rounded-full flex-shrink-0" />
                      <span className="text-sm text-gunmetal">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-silver-lake-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gunmetal mb-4">
              Want to influence our roadmap?
            </h3>
            <p className="text-yinmn-blue-600 mb-6">
              Join our community and help shape the future of Pugly Dashboard.
            </p>
            <button className="bg-gunmetal text-seasalt px-8 py-4 rounded-xl hover:bg-delft-blue transition-colors font-medium">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}