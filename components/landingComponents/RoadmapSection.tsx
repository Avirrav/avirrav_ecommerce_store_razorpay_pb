"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Calendar, Database, Bot, Shield, Globe, Sparkles, ArrowRight } from 'lucide-react';

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      const totalScrollDistance = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollDistance));
      
      setScrollProgress(progress);

      const newVisibleItems: number[] = [];
      itemRefs.current.forEach((ref, index) => {
        if (ref) {
          const itemRect = ref.getBoundingClientRect();
          if (itemRect.top < viewportHeight * 0.8 && itemRect.bottom > viewportHeight * 0.2) {
            newVisibleItems.push(index);
          }
        }
      });
      setVisibleItems(newVisibleItems);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'bg-gunmetal';
      case 'planned':
        return 'bg-delft-blue';
      case 'future':
        return 'bg-yinmn-blue';
      default:
        return 'bg-silver-lake-600';
    }
  };

  return (
    <section ref={sectionRef} className="py-20 bg-seasalt relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-gunmetal" />
            <span className="text-xs font-medium text-gunmetal tracking-wide uppercase">Roadmap</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gunmetal mb-4">
            What's Coming Next
          </h2>
          
          <p className="text-yinmn-blue-600 leading-relaxed font-light max-w-xl mx-auto">
            Exciting new features to supercharge your e-commerce operations
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Curved Path SVG */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 hidden lg:block">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 200 1000" 
              preserveAspectRatio="none"
              style={{ height: `${roadmapItems.length * 200}px` }}
            >
              <defs>
                <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#212b36" stopOpacity="1" />
                  <stop offset="50%" stopColor="#273654" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#415a77" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              
              {/* More pronounced curved path */}
              <path
                d={`M 100 0 
                   Q 50 100 100 200
                   Q 150 300 100 400
                   Q 50 500 100 600
                   Q 150 700 100 800
                   Q 50 900 100 1000`}
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="15,8"
                className="animate-pulse"
              />
              
              {/* Progress indicator */}
              <circle
                cx="100"
                cy={scrollProgress * 1000}
                r="8"
                fill="#212b36"
                className="drop-shadow-lg transition-all duration-500"
              >
                <animate
                  attributeName="r"
                  values="8;12;8"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>

          {/* Roadmap Items */}
          <div className="space-y-16">
            {roadmapItems.map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleItems.includes(index);
              const isLeft = index % 2 === 0;
              
              return (
                <div
                  key={item.id}
                  ref={(el) => (itemRefs.current[index] = el)}
                  className={`relative flex items-center ${
                    isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col gap-6 lg:gap-12`}
                >
                  {/* Timeline Node - Desktop */}
                  <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div 
                      className={`w-12 h-12 rounded-full border-3 border-seasalt flex items-center justify-center transition-all duration-700 ${
                        isVisible 
                          ? `${getStatusColor(item.status)} scale-125 shadow-xl` 
                          : 'bg-silver-lake-600 scale-100'
                      }`}
                    >
                      <Icon 
                        className={`w-5 h-5 transition-all duration-500 ${
                          isVisible ? 'scale-110' : 'scale-100'
                        }`} 
                      />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${isLeft ? 'lg:pr-6' : 'lg:pl-6'}`}>
                    <div 
                      className={`bg-white border border-silver-lake-300 rounded-2xl p-5 transition-all duration-700 hover:shadow-xl hover:scale-105 hover:border-gunmetal/20 ${
                        isVisible 
                          ? 'opacity-100 translate-y-0 shadow-lg' 
                          : 'opacity-60 translate-y-6'
                      }`}
                    >
                      {/* Header Section */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          {/* Mobile Timeline Node */}
                          <div className="lg:hidden">
                            <div 
                              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                                isVisible 
                                  ? `${getStatusColor(item.status)} scale-110` 
                                  : 'bg-silver-lake-600 scale-100'
                              }`}
                            >
                              <Icon className="w-4 h-4 text-seasalt" />
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-yinmn-blue-600 bg-silver-lake-100 px-2 py-1 rounded-full">
                                {item.quarter}
                              </span>
                              <div 
                                className={`inline-flex px-2 py-1 rounded-full text-xs font-medium transition-all duration-500 ${
                                  getStatusColor(item.status)
                                }`}
                              >
                                {item.status === 'in-progress' ? 'In Progress' : 
                                 item.status === 'planned' ? 'Planned' : 'Future'}
                              </div>
                            </div>
                            <h3 className="text-lg font-bold text-gunmetal leading-tight">
                              {item.title}
                            </h3>
                          </div>
                        </div>
                        
                        {/* Progress indicator for in-progress items */}
                        {item.status === 'in-progress' && (
                          <div className="text-right">
                            <div className="text-xs font-medium text-gunmetal mb-1">{item.progress}%</div>
                            <div className="w-12 h-1.5 bg-silver-lake-200 rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getProgressColor(item.status)} transition-all duration-1000`}
                                style={{ width: `${item.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-yinmn-blue-600 mb-3 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-1.5">
                        {item.features.map((feature, featureIndex) => (
                          <div 
                            key={featureIndex}
                            className="flex items-center gap-2 text-xs text-gunmetal"
                          >
                            <div className="w-1 h-1 bg-delft-blue rounded-full flex-shrink-0" />
                            <span className="font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Learn More Link */}
                      <div className="mt-4 pt-3 border-t border-silver-lake-200">
                        <button className="flex items-center gap-1 text-xs font-medium text-delft-blue hover:text-gunmetal transition-colors group">
                          <span>Learn more</span>
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden lg:block w-5/12"></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}