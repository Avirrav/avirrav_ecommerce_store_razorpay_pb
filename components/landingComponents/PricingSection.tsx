"use client"
import React from 'react';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: "Trial",
    price: 30,
    originalPrice: 50,
    monthlyPrice: 5,
    duration: "6 months",
    description: "Perfect for testing",
    features: [
      "1 Store Connection",
      "Up to 10 Products",
      "Basic Analytics",
      "Email Support",
      "Mobile Responsive"
    ],
    popular: false,
    cta: "Start Trial",
    savings: "40% OFF"
  },
  {
    name: "Basic",
    price: 3000,
    originalPrice: 5000,
    monthlyPrice: 250,
    duration: "12 months",
    description: "Most popular choice",
    features: [
      "Unlimited Stores",
      "Unlimited Products",
      "Advanced Analytics (Upcoming)",
      "Priority Support",
      "API Access"
    ],
    popular: true,
    cta: "Get Started",
    savings: "40% OFF"
  },
  {
    name: "Advanced",
    price: 6000,
    originalPrice: 10000,
    monthlyPrice: 500,
    duration: "12 months",
    description: "Enterprise-grade features",
    features: [
      "Everything in Basic",
      "Custom Store Front",
      "Custom Domain",
      "Dedicated Support",
      "Priority Updates"
    ],
    popular: false,
    cta: "Contact Sales",
    savings: "40% OFF"
  }
];

export default function PricingSection() {
  return (
    <section className="min-h-screen bg-silver-lake-50 flex items-center justify-center px-4">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-gunmetal" />
            <span className="text-sm font-medium text-gunmetal">Pricing Plans</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gunmetal mb-4 md:mb-6">
            Simple, Transparent Pricing
          </h2>
          
          <p className="text-base md:text-lg text-yinmn-blue-600 max-w-2xl mx-auto leading-relaxed mb-6 md:mb-8">
            Choose the perfect plan for your business. No commission on transactions - just straightforward pricing.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white border border-silver-lake-200 rounded-xl p-1 text-xs sm:text-sm">
            <button className="px-3 sm:px-4 py-2 rounded-lg bg-gunmetal text-seasalt font-medium">
              Annual (Save 40%)
            </button>
            <button className="px-3 sm:px-4 py-2 rounded-lg text-gunmetal font-medium">
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-seasalt border-2 rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border-gunmetal shadow-xl md:scale-105'
                  : 'border-silver-lake-200 hover:border-gunmetal/30 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gunmetal text-seasalt px-3 py-1.5 rounded-xl text-xs font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl md:text-2xl font-black text-gunmetal mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm md:text-base text-yinmn-blue-600 mb-4 md:mb-6">
                  {plan.description}
                </p>
                
                <div className="mb-4">
                  <span className="text-2xl md:text-4xl font-black text-gunmetal">
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className="text-sm md:text-base text-yinmn-blue-600">/{plan.duration}</span>
                </div>
                
                {plan.originalPrice && (
                  <div className="mb-2">
                    <span className="text-sm md:text-lg text-yinmn-blue-500 line-through">
                      ₹{plan.originalPrice.toLocaleString()}
                    </span>
                    <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded font-medium">
                      {plan.savings}
                    </span>
                  </div>
                )}
                
                <p className="text-xs md:text-sm text-yinmn-blue-500">
                  ₹{plan.monthlyPrice} per month, billed for {plan.duration}
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-4 h-4 md:w-5 md:h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gunmetal">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 md:py-4 rounded-xl font-medium transition-all duration-300 text-sm md:text-base ${
                  plan.popular
                    ? 'bg-gunmetal text-seasalt hover:bg-delft-blue'
                    : 'border-2 border-gunmetal text-gunmetal hover:bg-gunmetal hover:text-seasalt'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="text-center">
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-xs md:text-sm text-yinmn-blue-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">No Commission</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">API Access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">6 Month Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Fast & Responsive</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}