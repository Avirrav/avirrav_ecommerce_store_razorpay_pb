"use client"
import React, { useState } from 'react';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What is Pugly?",
    answer: "Pugly is a modern, user-friendly e-commerce dashboard designed primarily for dropshipping businesses. It offers a centralized platform where users can manage their products, orders, and connect custom stores via API integration."
  },
  {
    question: "Who is it for?",
    answer: "Pugly is perfect for dropshipping enthusiasts and those already running businesses, small businesses selling products, technical users needing dashboard + API access, and micro-brands looking to scale."
  },
  {
    question: "Can I connect custom-built stores?",
    answer: "Yes! Pugly is specifically designed to connect custom-built stores via API integration. This is one of our core features - allowing you to manage multiple custom stores from one centralized dashboard."
  },
  {
    question: "What are the pricing plans?",
    answer: "We offer three plans: Trial (₹30 for 6 months), Basic (₹3000 for 12 months), and Advanced (₹6000 for 12 months). All plans have 40% off currently, and there's no commission on transactions."
  },
  {
    question: "Do you charge commission on transactions?",
    answer: "No! Unlike many other platforms, Pugly doesn't charge any commission on your transactions. You pay only the subscription fee and keep 100% of your profits."
  },
  {
    question: "Do you offer support?",
    answer: "Yes! We provide email support for Trial users, priority support for Basic users, and dedicated support for Advanced users. Our team is committed to helping you succeed."
  },
  {
    question: "How does the API integration work?",
    answer: "Our API integration allows you to connect your custom-built stores directly to the Pugly dashboard. You can manage products, orders, and get analytics all from one place, regardless of your store's technology stack."
  },
  {
    question: "Can I manage multiple stores?",
    answer: "Yes! With our Basic and Advanced plans, you can connect and manage unlimited stores from a single dashboard. The Trial plan allows 1 store connection for testing purposes."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="min-h-screen bg-silver-lake-50 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-gunmetal/5 border border-gunmetal/10 rounded-full px-4 py-2 mb-6">
            <HelpCircle className="w-4 h-4 text-gunmetal" />
            <span className="text-sm font-medium text-gunmetal">Help Center</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gunmetal mb-4 md:mb-6">
            Frequently Asked Questions
          </h2>
          
          <p className="text-base md:text-lg text-yinmn-blue-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about Pugly Dashboard and how it can help your business.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3 md:space-y-4 mb-8 md:mb-16">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-seasalt border border-silver-lake-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 md:px-6 py-4 md:py-6 text-left flex items-center justify-between hover:bg-silver-lake-50 transition-colors"
              >
                <h3 className="text-base md:text-lg font-medium text-gunmetal pr-4 md:pr-8">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-gunmetal" />
                  ) : (
                    <Plus className="w-5 h-5 text-yinmn-blue-500" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-silver-lake-200">
                  <p className="text-sm md:text-base text-yinmn-blue-600 leading-relaxed pt-3 md:pt-4">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center">
          <div className="bg-white border border-silver-lake-200 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-bold text-gunmetal mb-3 md:mb-4">
              Still have questions?
            </h3>
            <p className="text-sm md:text-base text-yinmn-blue-600 mb-4 md:mb-6">
              Our support team is here to help you get the most out of Pugly Dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <a
                href="https://www.instagram.com/pugly.store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="bg-gunmetal text-seasalt px-4 md:px-6 py-2.5 md:py-3 rounded-xl hover:bg-delft-blue transition-colors font-medium text-sm md:text-base">
                  Contact Support
                </button>
              </a>
              <a
                href="https://www.instagram.com/pugly.store"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <button className="border-2 border-silver-lake-300 text-gunmetal px-4 md:px-6 py-2.5 md:py-3 rounded-xl hover:border-gunmetal transition-colors font-medium text-sm md:text-base">
                  Browse Documentation
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}