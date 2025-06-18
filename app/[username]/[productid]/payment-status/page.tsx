'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, ArrowLeft, Phone, Mail, Package, CreditCard, Banknote, User, MapPin, Calendar, Hash, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import getProduct from '@/actions/getProduct';
import getStore from '@/actions/getStore';
import { Product, Store, ShippingAddress } from '@/types';

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'success' | 'failed' | 'cod' | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [store, setStore] = useState<Store | null>(null);
  const [customerData, setCustomerData] = useState<any>(null);
  const [orderId, setOrderId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const successParam = searchParams.get('success');
    const failedParam = searchParams.get('failed');
    const usernameParam = searchParams.get('username');
    const productIdParam = searchParams.get('productId');
    const codParam = searchParams.get('cod');
    const orderIdParam = searchParams.get('orderId');

    setUsername(usernameParam);
    setProductId(productIdParam);

    if (successParam === 'true') {
      setStatus('success');
    } else if (failedParam === 'true') {
      setStatus('failed');
    } else if (codParam === 'true') {
      setStatus('cod');
    }

    // Use real order ID from URL params or fetch from API
    if (orderIdParam) {
      setOrderId(orderIdParam);
    } else {
      // Fallback: generate a temporary ID while we fetch the real one
      setOrderId(`PUG${Date.now().toString().slice(-8)}`);
    }

    // Load customer data from localStorage
    if (typeof window !== 'undefined') {
      const email = localStorage.getItem("customerEmail");
      const fullName = localStorage.getItem("customerFullName");
      const phone = localStorage.getItem("customerPhone");
      const shippingAddress = localStorage.getItem("customerShippingAddress");
      
      let parsedAddress: ShippingAddress | string = '';
      if (shippingAddress) {
        try {
          parsedAddress = JSON.parse(shippingAddress);
        } catch (error) {
          parsedAddress = shippingAddress;
        }
      }
      
      setCustomerData({
        email: email || '',
        fullName: fullName || '',
        phone: phone || '',
        shippingAddress: parsedAddress
      });
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchData = async () => {
      if (username && productId) {
        try {
          setIsLoading(true);
          const storeData = await getStore(username);
          setStore(storeData);
          
          if (storeData) {
            const productData = await getProduct(productId, storeData.apiUrl);
            setProduct(productData);

            // Fetch real order ID from the order API
            if (!searchParams.get('orderId')) {
              await fetchRealOrderId(storeData.apiUrl);
            }
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [username, productId]);

  const fetchRealOrderId = async (storeUrl: string) => {
    try {
      // Try to get the latest order for this customer
      const customerEmail = localStorage.getItem("customerEmail");
      if (customerEmail && storeUrl) {
        const response = await fetch(`${storeUrl}/orders/latest?email=${encodeURIComponent(customerEmail)}`);
        if (response.ok) {
          const orderData = await response.json();
          if (orderData && orderData.id) {
            setOrderId(orderData.id);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching real order ID:', error);
      // Keep the fallback ID if API call fails
    }
  };

  const formatShippingAddress = (address: ShippingAddress | string): string => {
    if (typeof address === 'string') {
      return address;
    }
    
    if (typeof address === 'object' && address !== null) {
      const parts = [
        address.addressLine1,
        address.addressLine2,
        address.city,
        address.state,
        address.postalCode,
        address.country
      ].filter(Boolean);
      
      return parts.join(', ');
    }
    
    return 'Address not provided';
  };

  const downloadPageAsImage = async () => {
    try {
      // Check if Web Share API is available
      if (navigator.share) {
        const shareData = {
          title: `Order ${orderId} - Payment Status`,
          text: `Order confirmation for ${product?.name || 'your purchase'}`,
          url: window.location.href,
        };

        await navigator.share(shareData);
        return;
      }

      // Fallback 1: Try to use html2canvas if available
      if (typeof window !== 'undefined' && (window as any).html2canvas) {
        const element = document.getElementById('payment-status-content');
        if (element) {
          const canvas = await (window as any).html2canvas(element, {
            backgroundColor: '#fafbfc',
            scale: 2,
            useCORS: true,
            allowTaint: true
          });
          
          // Convert canvas to blob and download
          canvas.toBlob((blob: Blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `Order_${orderId}_Status.png`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }, 'image/png');
          return;
        }
      }

      // Fallback 2: Copy order details to clipboard
      const orderDetails = `
Order Details:
Order ID: ${orderId}
Product: ${product?.name || 'N/A'}
Price: ₹${product?.price || 'N/A'}
Status: ${getStatusConfig().paymentStatus}
Customer: ${customerData?.fullName || 'N/A'}
Email: ${customerData?.email || 'N/A'}
Date: ${new Date().toLocaleDateString('en-IN')}
      `.trim();

      await navigator.clipboard.writeText(orderDetails);
      
      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'Order details copied to clipboard!';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);

    } catch (error) {
      console.error('Error saving order details:', error);
      
      // Final fallback: Open print dialog
      window.print();
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-600',
          bgColor: 'bg-green-100',
          title: 'Payment Successful!',
          titleColor: 'text-green-900',
          description: 'Thank you for your purchase. Your order has been confirmed and will be processed soon.',
          paymentStatus: 'Paid',
          paymentMethod: 'Online Payment (Razorpay)'
        };
      case 'failed':
        return {
          icon: XCircle,
          iconColor: 'text-red-600',
          bgColor: 'bg-red-100',
          title: 'Payment Failed',
          titleColor: 'text-red-900',
          description: 'There was an issue processing your payment. Please try again or contact support.',
          paymentStatus: 'Failed',
          paymentMethod: 'Online Payment (Razorpay)'
        };
      case 'cod':
        return {
          icon: CheckCircle,
          iconColor: 'text-orange-600',
          bgColor: 'bg-orange-100',
          title: 'Order Placed Successfully',
          titleColor: 'text-orange-900',
          description: 'Your order will be delivered soon. Please have the cash ready for payment upon delivery.',
          paymentStatus: 'To be paid on delivery',
          paymentMethod: 'Cash on Delivery'
        };
      default:
        return {
          icon: Package,
          iconColor: 'text-gray-600',
          bgColor: 'bg-gray-100',
          title: 'Processing...',
          titleColor: 'text-gray-900',
          description: 'Please wait while we confirm your payment status.',
          paymentStatus: 'Processing',
          paymentMethod: 'Unknown'
        };
    }
  };

  const statusConfig = getStatusConfig();
  const StatusIcon = statusConfig.icon;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-[#008060] border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gray-600 text-lg font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafbfc] py-8 px-4">
      {/* Load html2canvas library */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
      
      <motion.div
        id="payment-status-content"
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="polaris-card mb-8"
          variants={itemVariants}
        >
          <div className="p-8 text-center">
            <motion.div 
              className={`w-20 h-20 ${statusConfig.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
            >
              <StatusIcon className={`w-10 h-10 ${statusConfig.iconColor}`} />
            </motion.div>
            <motion.h1 
              className={`text-3xl font-bold mb-4 ${statusConfig.titleColor}`}
              variants={itemVariants}
            >
              {statusConfig.title}
            </motion.h1>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {statusConfig.description}
            </motion.p>
            
            {/* Save Order Details Button */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <motion.button
                onClick={downloadPageAsImage}
                className="inline-flex items-center space-x-2 bg-[#008060] hover:bg-[#004c3f] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-4 h-4" />
                <span>Save Order Details</span>
              </motion.button>
              
              <motion.button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `Order ${orderId}`,
                      text: `Order confirmation for ${product?.name}`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    const toast = document.createElement('div');
                    toast.className = 'fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
                    toast.textContent = 'Link copied to clipboard!';
                    document.body.appendChild(toast);
                    setTimeout(() => document.body.removeChild(toast), 3000);
                  }
                }}
                className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <motion.div 
            className="polaris-card"
            variants={itemVariants}
          >
            <div className="px-6 py-4 border-b border-gray-200 bg-[#fafbfc]">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-[#008060]" />
                <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Order ID */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Order ID</span>
                </div>
                <span className="font-mono text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded">
                  {orderId}
                </span>
              </div>

              {/* Order Date */}
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Order Date</span>
                </div>
                <span className="text-sm text-gray-900">{new Date().toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>

              {/* Product Details */}
              {product && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex space-x-4">
                    {product.images && product.images[0] && (
                      <img 
                        src={product.images[0].url} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category?.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Quantity: 1</span>
                        <span className="font-semibold text-gray-900">₹{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  {status === 'cod' ? (
                    <Banknote className="w-4 h-4 text-orange-600" />
                  ) : (
                    <CreditCard className="w-4 h-4 text-[#008060]" />
                  )}
                  <span className="text-sm font-medium text-gray-700">Payment Details</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Method</span>
                    <span className="text-sm font-medium text-gray-900">{statusConfig.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Status</span>
                    <span className={`text-sm font-medium ${
                      status === 'success' ? 'text-green-600' : 
                      status === 'failed' ? 'text-red-600' : 
                      'text-orange-600'
                    }`}>
                      {statusConfig.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="text-sm font-medium text-gray-700">
                      {status === 'cod' ? 'Amount to Pay' : 'Total Paid'}
                    </span>
                    <span className="text-lg font-bold text-gray-900">₹{product?.price || '0'}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customer & Support Information */}
          <motion.div 
            className="space-y-8"
            variants={itemVariants}
          >
            {/* Customer Information */}
            <div className="polaris-card">
              <div className="px-6 py-4 border-b border-gray-200 bg-[#fafbfc]">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-[#008060]" />
                  <h2 className="text-lg font-semibold text-gray-900">Customer Information</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {customerData?.fullName && (
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">{customerData.fullName}</p>
                    </div>
                  </div>
                )}
                
                {customerData?.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">{customerData.email}</p>
                    </div>
                  </div>
                )}
                
                {customerData?.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">{customerData.phone}</p>
                    </div>
                  </div>
                )}
                
                {customerData?.shippingAddress && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">Shipping Address</p>
                      <p className="font-medium text-gray-900 leading-relaxed">
                        {formatShippingAddress(customerData.shippingAddress)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Support Information */}
            <div className="polaris-card">
              <div className="px-6 py-4 border-b border-gray-200 bg-[#fafbfc]">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#008060]" />
                  <h2 className="text-lg font-semibold text-gray-900">Need Help?</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-center space-y-4">
                  <p className="text-gray-600">
                    If you have any questions about your order, please contact Pugly support:
                  </p>
                  
                  <motion.a
                    href="tel:+918319876678"
                    className="inline-flex items-center space-x-2 bg-[#008060] hover:bg-[#004c3f] text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91 8319876678</span>
                  </motion.a>
                  
                  <p className="text-sm text-gray-500">
                    Available Monday to Saturday, 9 AM - 6 PM IST
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          variants={itemVariants}
        >
          <Link
            href={`/${username}/${productId}`}
            className="inline-flex items-center justify-center space-x-2 polaris-button-secondary px-6 py-3"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Product</span>
          </Link>
          
          <Link
            href={`/${username}`}
            className="inline-flex items-center justify-center space-x-2 polaris-button-primary px-6 py-3"
          >
            <Package className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="text-center mt-8 pt-8 border-t border-gray-200"
          variants={itemVariants}
        >
          <p className="text-xs text-gray-400 mt-2">
            Powered by <span className="font-semibold text-[#008060]">Pugly</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}