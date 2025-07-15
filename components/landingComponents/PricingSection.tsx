"use client"
import React from 'react';
import { Check, Star } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: 600,
    monthlyPrice: 50,
    description: "Perfect for getting started",
    features: [
      "1 Store Connection",
      "Up to 10 Products",
      "API Access",
      "Basic Analytics",
      "Community Support"
    ],
    popular: false,
    cta: "Start Free Trial"
  },
  {
    name: "Pro",
    price: 6000,
    monthlyPrice: 500,
    description: "Most popular for growing businesses",
    features: [
      "Unlimited Stores",
      "Unlimited Products",
      "Advanced API Access",
      "Real-time Analytics",
      "Email Support",
      "Custom Integrations",
      "Automation Tools"
    ],
    popular: true,
    cta: "Start Free Trial"
  },
  {
    name: "Premium",
    price: 12000,
    monthlyPrice: 1000,
    description: "Everything you need to scale",
    features: [
      "Everything in Pro",
      "Custom Branding",
      "Reseller Rights",
      "Advanced Analytics",
      "Priority Support",
      "White-label Solution",
      "Custom Features"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

export default function PricingSection() {
  return (
    <section className="min-h-screen bg-silver-lake-50 flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4 text-gunmetal" />
            <span className="text-sm font-medium text-gunmetal">Pricing Plans</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gunmetal mb-6">
            Simple, Transparent Pricing
          </h2>
          
          <p className="text-lg text-yinmn-blue-600 max-w-2xl mx-auto leading-relaxed mb-8">
            Choose the perfect plan for your business. All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white border border-silver-lake-200 rounded-xl p-1">
            <button className="px-4 py-2 rounded-lg bg-gunmetal text-seasalt text-sm font-medium">
              Annual (Save 17%)
            </button>
            <button className="px-4 py-2 rounded-lg text-gunmetal text-sm font-medium">
              Monthly
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-seasalt border-2 rounded-2xl p-8 transition-all duration-300 ${
                plan.popular
                  ? 'border-gunmetal shadow-xl scale-105'
                  : 'border-silver-lake-200 hover:border-gunmetal/30 hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gunmetal text-seasalt px-4 py-2 rounded-xl text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-gunmetal mb-2">
                  {plan.name}
                </h3>
                <p className="text-yinmn-blue-600 mb-6">
                  {plan.description}
                </p>
                
                <div className="mb-4">
                  <span className="text-4xl font-black text-gunmetal">
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className="text-yinmn-blue-600">/year</span>
                </div>
                
                <p className="text-sm text-yinmn-blue-500">
                  ₹{plan.monthlyPrice} per month, billed annually
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gunmetal">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-medium transition-all duration-300 ${
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
          <div className="flex flex-wrap justify-center items-center gap-8 text-yinmn-blue-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">No Setup Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">30-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm">Money-back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}