"use client"
import React from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Starter",
    price: 600,
    description: "Perfect for getting started",
    features: [
      "1 Store Connection",
      "Up to 10 Products",
      "API Access",
      "Basic Analytics",
      "Community Support"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: 6000,
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
    popular: true
  },
  {
    name: "Premium",
    price: 12000,
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
    popular: false
  }
];

export default function PricingSection() {
  return (
    <section className="py-32 bg-seasalt" id="pricing">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-xs font-medium text-yinmn-blue-600 tracking-[0.2em] uppercase mb-8">
            Pricing Plans
          </p>
          
          <h2 className="mb-8">
            <span className="block text-5xl lg:text-6xl font-black text-gunmetal leading-tight mb-4">
              Simple,
            </span>
            <span className="block text-lg font-light text-yinmn-blue-600 tracking-wide">
              Transparent Pricing
            </span>
          </h2>
          
          <div className="max-w-2xl mx-auto mb-12">
            <p className="text-base text-yinmn-blue-600 leading-relaxed font-light">
              Choose the perfect plan for your business. All plans include our core features 
              with no hidden fees. Billed annually with 17% savings.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative border-2 rounded-2xl p-8 transition-all duration-500 group cursor-pointer ${
                plan.popular
                  ? 'border-gunmetal bg-gunmetal text-seasalt hover:bg-delft-blue hover:border-delft-blue hover:shadow-2xl hover:scale-105'
                  : 'border-silver-lake-300 bg-seasalt hover:border-gunmetal hover:shadow-xl hover:scale-105 hover:bg-silver-lake-50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-8">
                  <div className="bg-seasalt text-gunmetal px-4 py-2 rounded-xl text-xs font-medium tracking-wide shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-12">
                <h3 className={`text-2xl font-black mb-2 tracking-tight ${
                  plan.popular 
                    ? 'text-seasalt' 
                    : 'text-gunmetal group-hover:text-gunmetal'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-sm font-light mb-8 ${
                  plan.popular 
                    ? 'text-seasalt opacity-90' 
                    : 'text-yinmn-blue-600 group-hover:text-yinmn-blue-700'
                }`}>
                  {plan.description}
                </p>
                
                <div className="mb-4">
                  <span className={`text-4xl font-black ${
                    plan.popular 
                      ? 'text-seasalt' 
                      : 'text-gunmetal group-hover:text-gunmetal'
                  }`}>
                    ₹{plan.price.toLocaleString()}
                  </span>
                  <span className={`text-sm font-light ${
                    plan.popular 
                      ? 'text-seasalt opacity-80' 
                      : 'text-yinmn-blue-600 group-hover:text-yinmn-blue-700'
                  }`}>
                    /year
                  </span>
                </div>
                
                <p className={`text-xs font-light tracking-wide ${
                  plan.popular 
                    ? 'text-seasalt opacity-70' 
                    : 'text-yinmn-blue-500 group-hover:text-yinmn-blue-600'
                }`}>
                  ₹{Math.round(plan.price / 12)} per month
                </p>
              </div>

              <ul className="space-y-4 mb-12">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      plan.popular 
                        ? 'bg-seasalt' 
                        : 'bg-silver-lake-600 group-hover:bg-gunmetal'
                    }`}>
                      <Check size={10} className={`${
                        plan.popular 
                          ? 'text-gunmetal' 
                          : 'text-seasalt'
                      }`} />
                    </div>
                    <span className={`text-sm font-light ${
                      plan.popular 
                        ? 'text-seasalt opacity-90' 
                        : 'text-yinmn-blue-600 group-hover:text-yinmn-blue-700'
                    }`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-4 rounded-xl font-medium text-sm tracking-wide transition-all duration-300 transform group-hover:scale-105 ${
                  plan.popular
                    ? 'bg-seasalt text-gunmetal hover:bg-silver-lake-100 hover:shadow-lg'
                    : 'border-2 border-gunmetal text-gunmetal hover:bg-gunmetal hover:text-seasalt hover:shadow-lg'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="flex items-center justify-center gap-12 text-yinmn-blue-500">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yinmn-blue-500 rounded-full"></div>
              <span className="text-xs font-light tracking-wide">No Setup Fees</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yinmn-blue-500 rounded-full"></div>
              <span className="text-xs font-light tracking-wide">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-yinmn-blue-500 rounded-full"></div>
              <span className="text-xs font-light tracking-wide">30-Day Free Trial</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}