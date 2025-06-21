"use client"
import React from 'react';
import { Instagram, Play } from 'lucide-react';

const reels = [
  {
    id: 1,
    thumbnail: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "Store Setup in 2 Minutes"
  },
  {
    id: 2,
    thumbnail: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
    title: "API Integration Demo"
  },
  {
    id: 3,
    thumbnail: "https://images.pexels.com/photos/590022/pexels-photo-590022.jpg?auto=compress&cs=tinysrgb&w=400",
    title: "Dashboard Overview"
  },
  {
    id: 4,
    thumbnail: "https://images.pexels.com/photos/374820/pexels-photo-374820.jpg?auto=compress&cs=tinysrgb&w=400",
    title: "Order Management"
  }
];

const stats = [
  { value: "+120h", description: "Reclaimed per employee per year" },
  { value: "3x", description: "Faster RFP/RFI process" },
  { value: "1.5x", description: "The number of AEs each human SE can support" },
  { value: "<15s", description: "From question to detailed answer" }
];

export default function SocialProofSection() {
  return (
    <section className="py-32 bg-silver-lake-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-xs font-medium text-yinmn-blue-600 tracking-[0.2em] uppercase mb-8">
            Social Proof
          </p>
          
          <h2 className="mb-8">
            <span className="block text-5xl lg:text-6xl font-black text-gunmetal leading-tight mb-4">
              See Pugly
            </span>
            <span className="block text-lg font-light text-yinmn-blue-600 tracking-wide">
              in Action
            </span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-yinmn-blue-600 leading-relaxed font-light">
              Watch real entrepreneurs showcase their success with Pugly Dashboard
            </p>
          </div>
        </div>

        {/* Stats Section - Realm Style */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-block bg-seasalt border border-silver-lake-300 rounded-xl px-4 py-2 mb-8">
              <span className="text-xs font-medium text-yinmn-blue-600 tracking-wide uppercase">Impact</span>
            </div>
            <h3 className="text-3xl lg:text-4xl font-black text-gunmetal mb-4">
              Pugly gives your revenue team
            </h3>
            <p className="text-lg font-light text-yinmn-blue-600">
              an unfair advantage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-delft-blue-100 rounded-2xl p-8 text-center">
                <div className="text-4xl lg:text-5xl font-black text-gunmetal mb-4">
                  {stat.value}
                </div>
                <p className="text-sm text-yinmn-blue-600 font-light leading-relaxed">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="relative bg-seasalt border border-silver-lake-300 rounded-2xl overflow-hidden hover:border-gunmetal transition-all duration-300 group cursor-pointer hover:shadow-xl"
            >
              <div className="aspect-[9/16] relative overflow-hidden">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-gunmetal/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 bg-seasalt rounded-2xl flex items-center justify-center">
                    <Play size={20} className="text-gunmetal ml-1" />
                  </div>
                </div>

                {/* Instagram Icon */}
                <div className="absolute top-4 right-4">
                  <Instagram size={16} className="text-seasalt" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-medium text-gunmetal text-sm tracking-wide">{reel.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="text-center max-w-4xl mx-auto">
          <blockquote className="text-xl lg:text-2xl text-yinmn-blue-600 font-light italic mb-8 leading-relaxed">
            "Pugly transformed how I manage my dropshipping business. What used to take hours 
            now takes minutes. The API integration is seamless and the interface is incredibly intuitive."
          </blockquote>
          <div className="flex items-center justify-center gap-6">
            <img
              src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=100"
              alt="Customer"
              className="w-16 h-16 rounded-2xl border border-silver-lake-300"
            />
            <div className="text-left">
              <div className="font-medium text-gunmetal">Sarah Chen</div>
              <div className="text-xs text-yinmn-blue-600 font-light tracking-wide">E-commerce Entrepreneur</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}