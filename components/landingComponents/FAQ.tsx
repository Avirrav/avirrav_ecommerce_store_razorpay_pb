"use client"
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

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
  },
  {
    question: "What integrations do you support?",
    answer: "We support Shopify, WooCommerce, custom APIs, and many other popular e-commerce platforms. Our flexible integration system can adapt to most existing setups."
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use enterprise-grade security measures including SSL encryption, secure data centers, and regular security audits to protect your business data."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-silver-lake-50 flex items-center justify-center">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-gunmetal" />
            <span className="text-sm font-medium text-gunmetal">Help Center</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-gunmetal mb-6">
            Frequently Asked Questions
          </h2>
          
          <p className="text-lg text-yinmn-blue-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Pugly Dashboard and how it can help your business.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-seasalt border border-silver-lake-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-silver-lake-50 transition-colors"
              >
                <h3 className="text-lg font-medium text-gunmetal pr-8">
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
                <div className="px-6 pb-6 border-t border-silver-lake-200">
                  <p className="text-yinmn-blue-600 leading-relaxed pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <div className="bg-white border border-silver-lake-200 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-gunmetal mb-4">
              Still have questions?
            </h3>
            <p className="text-yinmn-blue-600 mb-6">
              Our support team is here to help you get the most out of Pugly Dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gunmetal text-seasalt px-6 py-3 rounded-xl hover:bg-delft-blue transition-colors font-medium">
                Contact Support
              </button>
              <button className="border-2 border-silver-lake-300 text-gunmetal px-6 py-3 rounded-xl hover:border-gunmetal transition-colors font-medium">
                Browse Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}