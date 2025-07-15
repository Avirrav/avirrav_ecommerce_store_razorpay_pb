"use client"
import React from 'react';
import Hero from './Hero';
import StorySection from './StorySection';
import AudienceSection from './AudienceSection';
import PricingSection from './PricingSection';
import RoadmapSection from './RoadmapSection';
import FinalCTA from './FinalCTA';
import FAQ from './FAQ';
import Footer from './Footer';

interface MainContentProps {
  activeSection: string;
}

export default function MainContent({ activeSection }: MainContentProps) {
  const renderSection = () => {
    switch (activeSection) {
      case 'hero':
        return <Hero />;
      case 'features':
        return <StorySection />;
      case 'audience':
        return <AudienceSection />;
      case 'pricing':
        return <PricingSection />;
      case 'roadmap':
        return <RoadmapSection />;
      case 'faq':
        return <FAQ />;
      case 'contact':
        return (
          <section className="min-h-screen flex items-center justify-center bg-seasalt py-16">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
              <div className="mb-16">
                <p className="text-xs font-medium text-gunmetal tracking-[0.2em] uppercase mb-8">
                  Get In Touch
                </p>
                
                <h2 className="mb-8">
                  <span className="block text-5xl lg:text-6xl font-black text-gunmetal leading-tight mb-4">
                    Contact Us
                  </span>
                  <span className="block text-lg font-light text-yinmn-blue-600 tracking-wide">
                    We're here to help
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white border border-silver-lake-200 rounded-2xl p-8 hover:border-gunmetal/20 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-gunmetal flex items-center justify-center rounded-2xl mb-6 mx-auto">
                    <div className="w-6 h-6 bg-seasalt rounded"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gunmetal mb-4">Email Support</h3>
                  <p className="text-yinmn-blue-600 mb-4 font-light">
                    Get help with your account, billing, or technical issues.
                  </p>
                  <a 
                    href="mailto:support@pugly.com" 
                    className="text-gunmetal hover:text-delft-blue font-medium text-sm tracking-wide border-b border-gunmetal hover:border-delft-blue transition-colors"
                  >
                    support@pugly.com
                  </a>
                </div>

                <div className="bg-white border border-silver-lake-200 rounded-2xl p-8 hover:border-gunmetal/20 hover:shadow-lg transition-all duration-300">
                  <div className="w-16 h-16 bg-delft-blue flex items-center justify-center rounded-2xl mb-6 mx-auto">
                    <div className="w-6 h-6 bg-seasalt rounded-full"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gunmetal mb-4">Live Chat</h3>
                  <p className="text-yinmn-blue-600 mb-4 font-light">
                    Chat with our team for instant help and quick answers.
                  </p>
                  <button className="text-gunmetal hover:text-delft-blue font-medium text-sm tracking-wide border-b border-gunmetal hover:border-delft-blue transition-colors">
                    Start Chat
                  </button>
                </div>
              </div>

              <div className="bg-gunmetal text-seasalt rounded-3xl p-12">
                <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
                <p className="text-silver-lake-400 mb-8 font-light">
                  Join thousands of entrepreneurs already using Pugly to scale their businesses.
                </p>
                <button className="bg-seasalt text-gunmetal px-8 py-4 rounded-xl hover:bg-silver-lake-200 transition-all duration-300 font-medium text-sm tracking-wide">
                  Start Free Trial
                </button>
              </div>
            </div>
          </section>
        );
      default:
        return <Hero />;
    }
  };

  return (
    <div className="md:ml-64 min-h-screen pt-16 md:pt-0 pb-20 md:pb-0">
      {renderSection()}
    </div>
  );
}