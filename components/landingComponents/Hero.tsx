"use client"
import React from 'react';
import { ArrowRight, Play, Zap, Shield, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen bg-seasalt flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-gunmetal" />
                <span className="text-sm font-medium text-gunmetal">Built for Solopreneurs</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gunmetal leading-tight">
                Everything You Need to Run Your
                <span className="block text-delft-blue mt-1 md:mt-2">
                  E-commerce Dashboard
                </span>
              </h1>
              
              <p className="text-base md:text-lg text-yinmn-blue-600 leading-relaxed max-w-lg">
                A modern, user-friendly e-commerce dashboard designed for dropshipping businesses. 
                Centralized platform to manage products, orders, and connect custom stores via API.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-white border border-silver-lake-200 rounded-xl p-4 text-center">
                <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-gunmetal mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gunmetal">Secure</p>
              </div>
              <div className="bg-white border border-silver-lake-200 rounded-xl p-4 text-center">
                <Zap className="w-4 h-4 sm:w-6 sm:h-6 text-delft-blue mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gunmetal">Fast</p>
              </div>
              <div className="bg-white border border-silver-lake-200 rounded-xl p-4 text-center">
                <Globe className="w-4 h-4 sm:w-6 sm:h-6 text-yinmn-blue mx-auto mb-1 sm:mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gunmetal">Scalable</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://admin.pugly.store"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gunmetal text-seasalt px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-delft-blue transition-colors font-medium flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
              >
                Start Trial for ₹30
                <ArrowRight className="w-4 h-4" />
              </a>
              
              {/* <button className="border-2 border-silver-lake-300 text-gunmetal px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:border-gunmetal transition-colors font-medium flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base">
                <Play className="w-4 h-4" />
                Watch Demo
              </button> */}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-8 text-xs sm:text-sm text-yinmn-blue-600">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>No Commission</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>6 Month Trial</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>API Access</span>
              </div>
            </div>
          </div>

          {/* Right Side - Dashboard Preview */}
          <div className="relative mt-8 lg:mt-0">
            <div className="bg-white border border-silver-lake-200 rounded-2xl p-6 shadow-xl">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gunmetal rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-seasalt rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gunmetal text-sm sm:text-base">Pugly Dashboard</h3>
                    <p className="text-xs sm:text-sm text-yinmn-blue-600">Store Management</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                  <div className="bg-silver-lake-50 rounded-lg p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-gunmetal">∞</div>
                    <div className="text-xs sm:text-sm text-yinmn-blue-600">Stores</div>
                  </div>
                  <div className="bg-silver-lake-50 rounded-lg p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-delft-blue">∞</div>
                    <div className="text-xs sm:text-sm text-yinmn-blue-600">Products</div>
                  </div>
                  <div className="bg-silver-lake-50 rounded-lg p-4 text-center">
                    <div className="text-lg sm:text-2xl font-bold text-yinmn-blue">24</div>
                    <div className="text-xs sm:text-sm text-yinmn-blue-600">Orders</div>
                  </div>
                </div>

                <div className="bg-silver-lake-50 rounded-lg p-4">
                  <h4 className="font-medium text-gunmetal mb-3 text-sm sm:text-base">Recent Orders</h4>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-delft-blue rounded-lg"></div>
                          <div>
                            <div className="text-xs sm:text-sm font-medium text-gunmetal">Order #{1000 + i}</div>
                            <div className="text-xs text-yinmn-blue-600 hidden sm:block">2 items</div>
                          </div>
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-gunmetal">₹{(i * 1200).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}