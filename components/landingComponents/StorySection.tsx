"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Database, Zap, Settings, TrendingUp } from 'lucide-react';

const stories = [
  {
    icon: Database,
    title: "Connect Any Store via API",
    description: "Integrate your Shopify, WooCommerce, or custom platform in minutes. One dashboard for all your stores.",
    visual: "api-connection"
  },
  {
    icon: Settings,
    title: "Centralize Product & Order Management",
    description: "Everything in one dashboard. Manage inventory, track orders, and sync data across all platforms seamlessly.",
    visual: "dashboard"
  },
  {
    icon: Zap,
    title: "Built for Speed",
    description: "Lightning-fast interface with no fluff. Focus on what matters most - growing your business.",
    visual: "performance"
  },
  {
    icon: TrendingUp,
    title: "Automation Ready",
    description: "Save hours every day with smart automation. Scale faster with intelligent workflows.",
    visual: "automation"
  }
];

export default function StorySection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set initial window width
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Calculate scroll progress through the entire section
      const totalScrollDistance = sectionHeight - viewportHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollDistance));
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    handleScroll(); // Initial call
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Calculate which story should be active and transition progress
  const activeStoryIndex = Math.min(Math.floor(scrollProgress * stories.length), stories.length - 1);
  const storyProgress = (scrollProgress * stories.length) % 1;

  return (
    <section ref={sectionRef} className="relative bg-seasalt" style={{ height: `${stories.length * 100}vh` }} id="features">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-20 items-center h-screen">
            
            {/* Left Side - Scrolling Text Content */}
            <div className="relative h-full flex items-center justify-center py-8 lg:py-16">
              <div className="w-full max-w-lg space-y-8">
                {stories.map((story, index) => {
                  const Icon = story.icon;
                  
                  // Calculate opacity and transform based on scroll position
                  const storyStart = index / stories.length;
                  const storyEnd = (index + 1) / stories.length;
                  
                  let opacity = 0;
                  let translateY = 60;
                  let scale = 0.9;
                  
                  if (scrollProgress >= storyStart && scrollProgress <= storyEnd) {
                    const localProgress = (scrollProgress - storyStart) / (storyEnd - storyStart);
                    
                    if (localProgress <= 0.2) {
                      // Fade in
                      opacity = localProgress / 0.2;
                      translateY = 60 * (1 - opacity);
                      scale = 0.9 + (0.1 * opacity);
                    } else if (localProgress >= 0.8) {
                      // Fade out
                      const fadeOut = (localProgress - 0.8) / 0.2;
                      opacity = 1 - fadeOut;
                      translateY = -60 * fadeOut;
                      scale = 1 - (0.1 * fadeOut);
                    } else {
                      // Fully visible
                      opacity = 1;
                      translateY = 0;
                      scale = 1;
                    }
                  }
                  
                  return (
                    <div
                      key={index}
                      className="absolute inset-0 flex items-center transition-none"
                      style={{
                        opacity,
                        transform: `translateY(${translateY}px) scale(${scale})`,
                      }}
                    >
                      <div className="w-full space-y-6 lg:space-y-8">
                        <div className="space-y-4 lg:space-y-6">
                          <div className={`inline-flex p-3 lg:p-4 rounded-xl lg:rounded-2xl transition-colors duration-300 ${
                            opacity > 0.5 ? 'bg-gunmetal text-seasalt' : 'bg-silver-lake-200 text-silver-lake-600'
                          }`}>
                            <Icon size={20} className="lg:w-6 lg:h-6" />
                          </div>
                          
                          <div className="space-y-3 lg:space-y-4">
                            <h3 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-gunmetal leading-[0.9]">
                              {story.title.split(' ').slice(0, 3).join(' ')}
                            </h3>
                            <p className="text-sm sm:text-base lg:text-lg font-light text-yinmn-blue-600 tracking-wide leading-relaxed">
                              {story.title.split(' ').slice(3).join(' ')}
                            </p>
                          </div>
                        </div>
                        
                        <p className="text-sm sm:text-base lg:text-lg text-yinmn-blue-600 leading-relaxed font-light max-w-md">
                          {story.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Visual Dashboard */}
            <div className="relative h-full flex items-center justify-center py-8 lg:py-16">
              <div className="w-full max-w-md lg:max-w-lg">
                <div className="bg-silver-lake-100 border border-silver-lake-300 rounded-2xl lg:rounded-3xl p-6 sm:p-8 lg:p-12 aspect-square lg:aspect-[4/5] flex items-center justify-center">
                  <div className="text-center space-y-6 lg:space-y-8 w-full">
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto flex items-center justify-center rounded-xl lg:rounded-2xl transition-all duration-500 ${
                      activeStoryIndex === 0 ? 'bg-gunmetal text-seasalt' :
                      activeStoryIndex === 1 ? 'bg-delft-blue text-seasalt' :
                      activeStoryIndex === 2 ? 'bg-yinmn-blue text-seasalt' :
                      'bg-silver-lake-600 text-seasalt'
                    }`}>
                      {React.createElement(stories[activeStoryIndex].icon, { 
                        size: windowWidth >= 1024 ? 32 : 24
                      })}
                    </div>
                    
                    <div className="space-y-3 lg:space-y-4">
                      <div className="grid grid-cols-3 gap-2 lg:gap-3">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 lg:h-2 rounded-full transition-all duration-500 ${
                              i <= activeStoryIndex ? 'bg-silver-lake-600' : 'bg-silver-lake-300'
                            }`}
                          />
                        ))}
                      </div>
                      
                      <div className="space-y-1.5 lg:space-y-2">
                        <div className="h-0.5 lg:h-1 bg-silver-lake-400 w-full rounded-full"></div>
                        <div className="h-0.5 lg:h-1 bg-silver-lake-300 w-4/5 rounded-full"></div>
                        <div className="h-0.5 lg:h-1 bg-silver-lake-300 w-3/5 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Progress indicator - Desktop only */}
                <div className="hidden lg:block absolute -left-4 xl:-left-6 top-1/2 transform -translate-y-1/2 space-y-3">
                  {stories.map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-500 ${
                        i === activeStoryIndex ? 'bg-gunmetal h-12 scale-110' : 'bg-silver-lake-400 h-8'
                      }`}
                    />
                  ))}
                </div>

                {/* Mobile progress dots */}
                <div className="flex lg:hidden justify-center mt-6 space-x-2">
                  {stories.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-500 ${
                        i === activeStoryIndex ? 'bg-gunmetal scale-125' : 'bg-silver-lake-400'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}