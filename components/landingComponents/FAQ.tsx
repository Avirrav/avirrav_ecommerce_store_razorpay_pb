"use client"
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "What is Pugly?",
    answer: "Pugly is a unified dashboard for managing dropshipping stores, products, and orders with comprehensive API support. It's designed specifically for solopreneurs and small e-commerce businesses who need powerful tools without the complexity."
  },
  {
    question: "Who is it for?",
    answer: "Pugly is perfect for dropshipping solopreneurs, Shopify/WooCommerce store owners, indie developers using custom APIs, and small brand founders who want to streamline their e-commerce operations."
  },
  {
    question: "Can I connect custom-built stores?",
    answer: "Absolutely! Pugly supports custom APIs and backend logic, making it easy to integrate with any e-commerce platform or custom-built solution. Our flexible API architecture adapts to your specific needs."
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, we offer a 30-day free trial so you can explore all features of the dashboard before committing to a paid plan. No credit card required to get started."
  },
  {
    question: "How is Pugly different from other tools?",
    answer: "Pugly is lightweight, API-first, affordable, and designed specifically for small e-commerce setups. Unlike bloated enterprise solutions, we focus on simplicity and speed while providing all the essential features you need."
  },
  {
    question: "Do you offer support?",
    answer: "Yes! We provide community support for Starter plan users, email support for Pro users, and priority support with dedicated assistance for Premium users. Our team is committed to your success."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-32 bg-seasalt">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-24">
          <p className="text-xs font-medium text-yinmn-blue-600 tracking-[0.2em] uppercase mb-8">
            Questions & Answers
          </p>
          
          <h2 className="mb-8">
            <span className="block text-5xl lg:text-6xl font-black text-gunmetal leading-tight mb-4">
              Frequently
            </span>
            <span className="block text-lg font-light text-yinmn-blue-600 tracking-wide">
              Asked Questions
            </span>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <p className="text-base text-yinmn-blue-600 leading-relaxed font-light">
              Everything you need to know about Pugly Dashboard
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-silver-lake-300 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full py-8 text-left flex items-center justify-between hover:bg-seasalt transition-colors px-6 rounded-xl"
              >
                <h3 className="text-lg font-medium text-gunmetal pr-8 tracking-tight">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus size={20} className="text-gunmetal" />
                  ) : (
                    <Plus size={20} className="text-yinmn-blue-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-8">
                  <p className="text-yinmn-blue-600 leading-relaxed font-light">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-yinmn-blue-600 mb-6 font-light">Still have questions?</p>
          <button className="text-gunmetal hover:text-yinmn-blue-600 font-medium text-sm tracking-wide border-b border-gunmetal hover:border-yinmn-blue-600 transition-colors rounded-lg px-4 py-2">
            Contact our support team
          </button>
        </div>
      </div>
    </section>
  );
}