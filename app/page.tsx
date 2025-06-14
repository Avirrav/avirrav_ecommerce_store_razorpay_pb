'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Package, 
  TrendingUp, 
  Zap, 
  Check, 
  Star,
  Menu,
  X,
  ArrowRight,
  Play,
  Users,
  BarChart3,
  Settings,
  Globe
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const features = [
    {
      icon: Package,
      title: "Centralized Product Management",
      description: "Manage all your products from one powerful dashboard with bulk editing and smart categorization."
    },
    {
      icon: TrendingUp,
      title: "Real-time Order Tracking",
      description: "Monitor orders, track shipments, and manage customer communications in real-time."
    },
    {
      icon: Globe,
      title: "Custom Store API Integration",
      description: "Seamlessly connect your existing store or create a new one with our powerful API."
    },
    {
      icon: Settings,
      title: "Intuitive User Interface",
      description: "Built with Shopify Polaris design system for a familiar and efficient workflow."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "E-commerce Entrepreneur",
      content: "Pugly transformed my dropshipping business. The dashboard is incredibly intuitive and saves me hours every day.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Rahul Gupta",
      role: "Online Store Owner",
      content: "The API integration was seamless. I had my store connected and running within minutes. Highly recommended!",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Anita Patel",
      role: "Digital Marketer",
      content: "The analytics and reporting features give me insights I never had before. My conversion rates have improved significantly.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "₹3,500",
      period: "/year",
      description: "Perfect for getting started",
      features: [
        "Dashboard Access",
        "Product Management",
        "Order Management", 
        "Waitlist Page"
      ],
      limitations: [
        "No API / Dedicated Store"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "₹6,000",
      period: "/year",
      description: "Most popular for growing businesses",
      features: [
        "All Starter Features",
        "API Connectivity to Custom Store",
        "Dedicated Store",
        "Limited Setup Help"
      ],
      limitations: [],
      popular: true
    },
    {
      name: "Premium",
      price: "₹12,000",
      period: "/year",
      description: "Complete solution for enterprises",
      features: [
        "All Pro Features",
        "Custom Branding (Dashboard + Store)",
        "Advanced Analytics",
        "High-Performance Hosting Tier",
        "Co-branded / Resell Rights",
        "White-Glove Setup",
        "Priority Support"
      ],
      limitations: [],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      {/* Sticky Header */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 ? 'bg-[#1a1a1a]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <ShoppingBag className="w-8 h-8 text-[#008060]" />
              <span className="text-2xl font-bold text-white">Pugly</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                Login
              </Link>
              <motion.button
                className="polaris-button-primary px-6 py-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.div 
              className="md:hidden bg-[#2a2a2a] rounded-lg mt-2 p-4"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <Link href='https://admin.pugly.store/signin' className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <button onClick={() => window.location.href='https://account.pugly.store/waitlist'} className="polaris-button-primary w-full">
                  Join Waitlist
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-8 py-16 lg:px-16 lg:py-24">
              <motion.div 
                className="text-center max-w-4xl mx-auto"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
                  variants={fadeInUp}
                >
                  Powerful Dropshipping Dashboard.{' '}
                  <span className="text-[#008060]">Fully Customizable.</span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
                  variants={fadeInUp}
                >
                  Connect your store via API, manage orders and products effortlessly. 
                  Built for modern dropshipping entrepreneurs who demand efficiency.
                </motion.p>

                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  variants={fadeInUp}
                >
                  <motion.button
                    className="polaris-button-primary px-8 py-4 text-lg font-semibold flex items-center space-x-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                  
                  <motion.button
                    className="polaris-button-secondary px-8 py-4 text-lg font-semibold flex items-center space-x-2"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-5 h-5" />
                    <span>See How It Works</span>
                  </motion.button>
                </motion.div>

                {/* Dashboard Mockup */}
                <motion.div 
                  className="mt-16"
                  variants={fadeInUp}
                >
                  <div className="relative">
                    <motion.div 
                      className="bg-gradient-to-br from-[#008060] to-[#00a47c] rounded-2xl p-8 shadow-2xl"
                      whileHover={{ y: -10, rotateX: 5 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="bg-white rounded-lg p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="text-sm text-gray-500">Pugly Dashboard</div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-green-600 font-medium">Total Orders</p>
                                <p className="text-2xl font-bold text-green-900">1,247</p>
                              </div>
                              <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                          </div>
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-blue-600 font-medium">Products</p>
                                <p className="text-2xl font-bold text-blue-900">89</p>
                              </div>
                              <Package className="w-8 h-8 text-blue-600" />
                            </div>
                          </div>
                          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-purple-600 font-medium">Revenue</p>
                                <p className="text-2xl font-bold text-purple-900">₹2.4L</p>
                              </div>
                              <BarChart3 className="w-8 h-8 text-purple-600" />
                            </div>
                          </div>
                        </div>
                        <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500">Interactive Dashboard Preview</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 lg:p-16">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need to scale your dropshipping business
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Powerful features designed to streamline your workflow and boost your productivity
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="polaris-card p-6 text-center group"
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-[#008060] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#004c3f] transition-colors"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 lg:p-16">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Choose the perfect plan for your business
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Start free and scale as you grow. All plans include our core features.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={index}
                  className={`polaris-card relative overflow-visible ${
                    plan.popular 
                      ? 'border-2 border-[#008060] shadow-xl' 
                      : 'border border-gray-200'
                  }`}
                  variants={fadeInUp}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  {plan.popular && (
                    <motion.div 
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10"
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <span className="bg-[#008060] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg whitespace-nowrap">
                        Most Popular
                      </span>
                    </motion.div>
                  )}

                  <div className={`p-8 ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600 ml-1">{plan.period}</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <Check className="w-5 h-5 text-[#008060] flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                      {plan.limitations.map((limitation, limitationIndex) => (
                        <div key={limitationIndex} className="flex items-center space-x-3">
                          <X className="w-5 h-5 text-red-500 flex-shrink-0" />
                          <span className="text-gray-500">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      className={`w-full py-3 rounded-lg font-semibold transition-all ${
                        plan.popular
                          ? 'polaris-button-primary'
                          : 'polaris-button-secondary'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 lg:p-16">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Loved by entrepreneurs worldwide
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                See what our customers have to say about their experience with Pugly
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="polaris-card p-6"
                  variants={index % 2 === 0 ? slideInLeft : slideInRight}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center space-x-3">
                    <motion.img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="bg-[#1a1a1a] py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <motion.div 
              className="flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <ShoppingBag className="w-8 h-8 text-[#008060]" />
              <span className="text-2xl font-bold text-white">Pugly</span>
            </motion.div>
            
            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              {['Docs', 'Privacy Policy', 'Terms of Service', 'Twitter', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href="#"
                  className="hover:text-white transition-colors"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
            
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2025 Pugly. All rights reserved. Built for the next generation of dropshipping entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}