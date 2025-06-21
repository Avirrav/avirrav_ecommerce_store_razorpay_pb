"use client"
import React from 'react';
import { ArrowRight, Play, Mail } from 'lucide-react';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-silver-lake-900 pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left Side - Content */}
          <div className="space-y-12">
            {/* Main headline */}
            <div>
              <h1 className="text-5xl lg:text-7xl font-black text-gunmetal leading-[0.9] mb-8">
                Everything You Need to Run Your
                <span className="block text-delft-blue mt-2">
                  Dropshipping Business
                </span>
              </h1>
              
              <p className="text-lg text-yinmn-blue-600 leading-relaxed font-light max-w-lg">
                One dashboard to manage your stores, products, orders, and APIs. 
                Built for speed, ease, and scale.
              </p>
            </div>

            {/* Email Input & CTA */}
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                <div className="relative flex-1">
                  <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-silver-lake-500" />
                  <input
                    type="email"
                    placeholder="Work Email"
                    className="w-full pl-12 pr-4 py-4 bg-seasalt border border-silver-lake-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-delft-blue focus:border-transparent text-gunmetal placeholder-silver-lake-500"
                  />
                </div>
                <button className="bg-gunmetal text-seasalt px-8 py-4 rounded-xl hover:bg-delft-blue transition-all duration-300 font-medium text-sm tracking-wide flex items-center gap-3 group whitespace-nowrap">
                  Request a trial
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              
              <button className="flex items-center gap-3 text-yinmn-blue-600 hover:text-gunmetal transition-colors font-medium">
                <Play size={16} />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Side - Dashboard Mockup */}
          <div className="relative">
            {/* Main Dashboard Container */}
            <div className="bg-gradient-to-br from-delft-blue to-yinmn-blue rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-delft-blue/90 to-yinmn-blue/90 rounded-3xl"></div>
              
              {/* Watch Demo Badge */}
              <div className="relative z-10 mb-8">
                <div className="inline-flex items-center gap-3 bg-gunmetal/80 backdrop-blur-sm text-seasalt px-6 py-3 rounded-2xl">
                  <Play size={16} />
                  <div>
                    <div className="font-medium text-sm">Watch Demo</div>
                    <div className="text-xs text-silver-lake-300">2 min</div>
                  </div>
                </div>
              </div>

              {/* Dashboard Content */}
              <div className="relative z-10 bg-seasalt rounded-2xl p-6 shadow-xl">
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gunmetal mb-2">
                    How do we typically structure a 30-day POC?
                  </h3>
                  <p className="text-sm text-yinmn-blue-600 font-light">
                    A typical plan for a 30-day Proof-of-Concept period would look as follows:
                  </p>
                </div>

                {/* Table */}
                <div className="bg-silver-lake-100 rounded-xl p-4 mb-6">
                  <div className="grid grid-cols-3 gap-4 text-xs font-medium text-yinmn-blue-700 mb-3">
                    <div>Timing</div>
                    <div>Step</div>
                    <div>Description</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4 text-xs text-gunmetal">
                      <div className="bg-silver-lake-200 px-3 py-2 rounded-lg">Before the POC</div>
                      <div className="bg-silver-lake-200 px-3 py-2 rounded-lg">Align on goals & succe...</div>
                      <div className="bg-silver-lake-200 px-3 py-2 rounded-lg">Ensure we understand...</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gunmetal">
                      <div className="bg-silver-lake-200 px-3 py-2 rounded-lg">Week 0</div>
                      <div className="bg-silver-lake-200 px-3 py-2 rounded-lg flex items-center gap-2">
                        Data sync call <span className="bg-delft-blue text-white px-2 py-1 rounded text-xs">1</span>
                      </div>
                      <div className="bg-silver-lake-200 px-3 py-2 rounded-lg">30 min call together wi...</div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-xs text-gunmetal">
                      <div className="bg-silver-lake-200 px-3 py-2 rounded-lg">Week 1</div>
                      <div className="bg-silver-lake-200 px-3 py-2 rounded-lg flex items-center gap-2">
                        Onboarding <span className="bg-delft-blue text-white px-2 py-1 rounded text-xs">2</span>
                      </div>
                      <div className="bg-silver-lake-200 px-3 py-2 rounded-lg">A 45 min onboarding s...</div>
                    </div>
                  </div>
                </div>

                {/* POC Plan Template Card */}
                <div className="bg-seasalt border border-silver-lake-300 rounded-xl p-4 mb-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-delft-blue rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 bg-seasalt rounded"></div>
                    </div>
                    <div>
                      <div className="font-medium text-gunmetal text-sm">POC Plan Template</div>
                    </div>
                  </div>
                </div>

                {/* Chat Input */}
                <div className="flex items-center gap-3 bg-silver-lake-100 rounded-xl p-3">
                  <div className="w-6 h-6 bg-gunmetal rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-seasalt rounded-full"></div>
                  </div>
                  <input
                    type="text"
                    placeholder="Ask a follow-up question..."
                    className="flex-1 bg-transparent text-sm text-yinmn-blue-600 placeholder-silver-lake-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 right-4 w-32 h-32 bg-gradient-to-br from-seasalt/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-4 left-4 w-24 h-24 bg-gradient-to-tr from-gunmetal/20 to-transparent rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}