"use client"
import React from 'react';
import { Play, ArrowUpRight } from 'lucide-react';

const reels = [
  {
    id: 1,
    thumbnail: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Store Setup",
    duration: "2:15"
  },
  {
    id: 2,
    thumbnail: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "API Integration",
    duration: "1:45"
  },
  {
    id: 3,
    thumbnail: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=400",
    title: "Dashboard Tour",
    duration: "3:20"
  },
  {
    id: 4,
    thumbnail: "https://images.pexels.com/photos/374820/pexels-photo-374820.jpg?auto=compress&cs=tinysrgb&w=400",
    title: "Order Management",
    duration: "2:30"
  }
];

const stats = [
  { value: "120h+", label: "Time saved per year" },
  { value: "3x", label: "Faster setup process" },
  { value: "1.5x", label: "More efficient workflow" },
  { value: "<15s", label: "Response time" }
];

export default function SocialProofSection() {
  return (
    <section className="py-32 bg-seasalt">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 bg-gunmetal rounded-full animate-pulse"></div>
            <span className="text-xs font-medium text-gunmetal tracking-wide uppercase">Live Demos</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gunmetal mb-6 tracking-tight">
            See It In Action
          </h2>
          
          <p className="text-lg text-yinmn-blue-600 font-light max-w-2xl mx-auto leading-relaxed">
            Watch real setups and see how Pugly transforms e-commerce management
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white border border-silver-lake-200 rounded-2xl p-6 hover:border-gunmetal/20 hover:shadow-lg transition-all duration-300">
                <div className="text-3xl lg:text-4xl font-black text-gunmetal mb-2 group-hover:text-delft-blue transition-colors">
                  {stat.value}
                </div>
                <p className="text-sm text-yinmn-blue-600 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className="group cursor-pointer"
            >
              <div className="relative bg-white border border-silver-lake-200 rounded-2xl overflow-hidden hover:border-gunmetal/20 hover:shadow-xl transition-all duration-500">
                <div className="aspect-[4/5] relative overflow-hidden">
                  <img
                    src={reel.thumbnail}
                    alt={reel.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gunmetal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="w-14 h-14 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play size={18} className="text-gunmetal ml-0.5" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute top-3 right-3 bg-gunmetal/80 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-lg">
                    {reel.duration}
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gunmetal text-sm group-hover:text-delft-blue transition-colors">
                      {reel.title}
                    </h3>
                    <ArrowUpRight size={14} className="text-yinmn-blue-500 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-silver-lake-200 rounded-3xl p-8 lg:p-12 text-center hover:border-gunmetal/20 hover:shadow-lg transition-all duration-300">
            <div className="mb-8">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-gunmetal">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                ))}
              </div>
              
              <blockquote className="text-xl lg:text-2xl text-gunmetal font-light leading-relaxed mb-8">
                "Pugly transformed how I manage my dropshipping business. What used to take hours now takes minutes."
              </blockquote>
            </div>
            
            <div className="flex items-center justify-center gap-4">
              <img
                src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100"
                alt="Sarah Chen"
                className="w-12 h-12 rounded-full border-2 border-silver-lake-200"
              />
              <div className="text-left">
                <div className="font-semibold text-gunmetal text-sm">Sarah Chen</div>
                <div className="text-xs text-yinmn-blue-600 font-medium">E-commerce Entrepreneur</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}