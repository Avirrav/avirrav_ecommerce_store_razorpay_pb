"use client"
import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-32 bg-gunmetal text-seasalt">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-medium text-silver-lake-500 tracking-[0.2em] uppercase mb-12">
            Ready to Transform Your Business?
          </p>
          
          <h2 className="mb-12">
            <span className="block text-6xl lg:text-8xl font-black leading-[0.9] mb-6">
              Start Smarter.
            </span>
            <span className="block text-6xl lg:text-8xl font-black leading-[0.9] mb-6">
              Manage Better.
            </span>
            <span className="block text-6xl lg:text-8xl font-black text-silver-lake-500 leading-[0.9]">
              Grow Faster.
            </span>
          </h2>
          
          <div className="max-w-3xl mx-auto mb-16">
            <p className="text-lg text-silver-lake-400 leading-relaxed font-light">
              Join the next wave of solopreneurs and scale your store operations with ease.
              No complex setups, no hidden fees, just results.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <button className="bg-seasalt text-gunmetal px-12 py-4 rounded-xl hover:bg-silver-lake-200 transition-all duration-300 font-medium text-sm tracking-wide flex items-center gap-3 group">
              Get Started for ₹5/month
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="border-2 border-silver-lake-500 text-silver-lake-500 px-12 py-4 rounded-xl hover:border-seasalt hover:text-seasalt transition-all duration-300 font-medium text-sm tracking-wide">
              See How It Works
            </button>
          </div>

          <div className="flex items-center justify-center gap-12 text-silver-lake-500">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-silver-lake-500 rounded-full"></div>
              <span className="text-xs font-light tracking-wide">No Setup Fees</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-silver-lake-500 rounded-full"></div>
              <span className="text-xs font-light tracking-wide">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-silver-lake-500 rounded-full"></div>
              <span className="text-xs font-light tracking-wide">30-Day Free Trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}