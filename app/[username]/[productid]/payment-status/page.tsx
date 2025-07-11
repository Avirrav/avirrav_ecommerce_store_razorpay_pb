'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, ArrowLeft, Phone, Mail, Package, CreditCard, Banknote, User, MapPin, Calendar, Hash, FileText, Share2 } from 'lucide-react';
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

  const generateInvoice = async () => {
    try {
      // Create invoice content
      const invoiceData = {
        invoiceNumber: `INV-${orderId}`,
        orderNumber: orderId,
        date: new Date().toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        customer: {
          name: customerData?.fullName || 'N/A',
          email: customerData?.email || 'N/A',
          phone: customerData?.phone || 'N/A',
          address: formatShippingAddress(customerData?.shippingAddress || '')
        },
        store: {
          name: store?.name || 'Store',
          address: 'Business Address Line 1\nBusiness Address Line 2\nCity, State - PIN'
        },
        items: [{
          description: product?.name || 'Product',
          quantity: 1,
          unitPrice: parseFloat(product?.price || '0'),
          total: parseFloat(product?.price || '0')
        }],
        subtotal: parseFloat(product?.price || '0'),
        tax: 0,
        shipping: 0,
        total: parseFloat(product?.price || '0'),
        paymentMethod: getStatusConfig().paymentMethod,
        paymentStatus: getStatusConfig().paymentStatus
      };

      // Create HTML invoice content
      const invoiceHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Invoice ${invoiceData.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #212b36; }
            .invoice-header { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .invoice-title { font-size: 28px; font-weight: bold; color: #212b36; }
            .invoice-number { font-size: 16px; color: #415a77; }
            .company-info { text-align: right; }
            .customer-info { margin-bottom: 30px; }
            .invoice-details { display: flex; justify-content: space-between; margin-bottom: 30px; }
            .table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
            .table th, .table td { padding: 12px; text-align: left; border-bottom: 1px solid #e1e3e5; }
            .table th { background-color: #f6f6f7; font-weight: bold; }
            .totals { text-align: right; margin-top: 20px; }
            .total-row { display: flex; justify-content: space-between; margin: 5px 0; }
            .total-final { font-weight: bold; font-size: 18px; border-top: 2px solid #212b36; padding-top: 10px; }
            .payment-info { margin-top: 30px; padding: 15px; background-color: #f6f6f7; border-radius: 8px; }
            .footer { margin-top: 40px; text-align: center; color: #778da9; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="invoice-header">
            <div>
              <div class="invoice-title">INVOICE</div>
              <div class="invoice-number">${invoiceData.invoiceNumber}</div>
            </div>
            <div class="company-info">
              <strong>${invoiceData.store.name}</strong><br>
              ${invoiceData.store.address.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div class="customer-info">
            <strong>Bill To:</strong><br>
            ${invoiceData.customer.name}<br>
            ${invoiceData.customer.email}<br>
            ${invoiceData.customer.phone}<br>
            ${invoiceData.customer.address}
          </div>

          <div class="invoice-details">
            <div>
              <strong>Invoice Date:</strong> ${invoiceData.date}<br>
              <strong>Order Number:</strong> ${invoiceData.orderNumber}
            </div>
            <div>
              <strong>Due Date:</strong> ${invoiceData.dueDate}<br>
              <strong>Payment Status:</strong> ${invoiceData.paymentStatus}
            </div>
          </div>

          <table class="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${invoiceData.items.map(item => `
                <tr>
                  <td>${item.description}</td>
                  <td>${item.quantity}</td>
                  <td>₹${item.unitPrice.toFixed(2)}</td>
                  <td>₹${item.total.toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="totals">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>₹${invoiceData.subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Shipping:</span>
              <span>₹${invoiceData.shipping.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Tax:</span>
              <span>₹${invoiceData.tax.toFixed(2)}</span>
            </div>
            <div class="total-row total-final">
              <span>Total:</span>
              <span>₹${invoiceData.total.toFixed(2)}</span>
            </div>
          </div>

          <div class="payment-info">
            <strong>Payment Information:</strong><br>
            Payment Method: ${invoiceData.paymentMethod}<br>
            Payment Status: ${invoiceData.paymentStatus}
          </div>

          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Powered by Pugly</p>
          </div>
        </body>
        </html>
      `;

      // Create and download the invoice
      const blob = new Blob([invoiceHTML], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice_${invoiceData.invoiceNumber}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      // Show success message
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'Invoice generated successfully!';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);

    } catch (error) {
      console.error('Error generating invoice:', error);
      
      // Show error message
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
      toast.textContent = 'Error generating invoice. Please try again.';
      document.body.appendChild(toast);
      
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 3000);
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
          iconColor: 'text-delft-blue',
          bgColor: 'bg-delft-blue/10',
          title: 'Order Placed Successfully',
          titleColor: 'text-delft-blue',
          description: 'Your order will be delivered soon. Please have the cash ready for payment upon delivery.',
          paymentStatus: 'To be paid on delivery',
          paymentMethod: 'Cash on Delivery'
        };
      default:
        return {
          icon: Package,
          iconColor: 'text-gunmetal',
          bgColor: 'bg-gunmetal/10',
          title: 'Processing...',
          titleColor: 'text-gunmetal',
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
      <div className="min-h-screen bg-silver-lake-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-gunmetal border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-gunmetal text-lg font-bold">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <motion.div
        id="payment-status-content"
        className="max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div 
          className="bg-seasalt border border-silver-lake-200 rounded-lg shadow-sm overflow-hidden mb-8"
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
              className="text-lg text-gunmetal max-w-2xl mx-auto"
              variants={itemVariants}
            >
              {statusConfig.description}
            </motion.p>
            
            {/* Generate Invoice and Share Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
              <motion.button
                onClick={generateInvoice}
                className="inline-flex items-center space-x-2 bg-gunmetal hover:bg-delft-blue text-seasalt px-6 py-3 rounded-lg font-bold transition-colors"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText className="w-4 h-4" />
                <span>Generate Invoice</span>
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
                className="inline-flex items-center space-x-2 bg-silver-lake-200 hover:bg-silver-lake-300 text-gunmetal px-6 py-3 rounded-lg font-bold transition-colors"
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
            className="bg-seasalt border border-silver-lake-200 rounded-lg shadow-sm overflow-hidden"
            variants={itemVariants}
          >
            <div className="px-6 py-4 border-b border-silver-lake-200 bg-silver-lake-50">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-gunmetal" />
                <h2 className="text-lg font-bold text-gunmetal">Order Details</h2>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Order ID */}
              <div className="flex items-center justify-between py-3 border-b border-silver-lake-200">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gunmetal" />
                  <span className="text-sm font-bold text-gunmetal">Order ID</span>
                </div>
                <span className="font-mono text-sm font-bold text-gunmetal bg-silver-lake-100 px-2 py-1 rounded">
                  <span className="text-gunmetal">{orderId}</span>
                </span>
              </div>

              {/* Order Date */}
              <div className="flex items-center justify-between py-3 border-b border-silver-lake-200">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gunmetal" />
                  <span className="text-sm font-bold text-gunmetal">Order Date</span>
                </div>
                <span className="text-sm text-gunmetal font-bold">{new Date().toLocaleDateString('en-IN', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>

              {/* Product Details */}
              {product && (
                <div className="border border-silver-lake-200 rounded-lg p-4">
                  <div className="flex space-x-4">
                    {product.images && product.images[0] && (
                      <img 
                        src={product.images[0].url} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-bold text-gunmetal mb-1">{product.name}</h3>
                      <p className="text-sm text-silver-lake-600 mb-2">{product.category?.name}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-silver-lake-600 font-medium">Quantity: 1</span>
                        <span className="font-bold text-gunmetal">₹{product.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Information */}
              <div className="bg-silver-lake-50 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  {status === 'cod' ? (
                    <Banknote className="w-4 h-4 text-delft-blue" />
                  ) : (
                    <CreditCard className="w-4 h-4 text-gunmetal" />
                  )}
                  <span className="text-sm font-bold text-gunmetal">Payment Details</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-silver-lake-600 font-medium">Method</span>
                    <span className="text-sm font-bold text-gunmetal">{statusConfig.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-silver-lake-600 font-medium">Status</span>
                    <span className={`text-sm font-bold ${
                      status === 'success' ? 'text-green-600' : 
                      status === 'failed' ? 'text-red-600' : 
                      'text-delft-blue'
                    }`}>
                      {statusConfig.paymentStatus}
                    </span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-silver-lake-200">
                    <span className="text-base font-bold text-gunmetal">
                      {status === 'cod' ? 'Amount to Pay' : 'Total Paid'}
                    </span>
                    <span className="text-xl font-bold text-gunmetal">₹{product?.price || '0'}</span>
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
            <div className="bg-seasalt border border-silver-lake-200 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-silver-lake-200 bg-silver-lake-50">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gunmetal" />
                  <h2 className="text-lg font-bold text-gunmetal">Customer Information</h2>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {customerData?.fullName && (
                  <div className="flex items-center space-x-3">
                    <User className="w-4 h-4 text-gunmetal" />
                    <div>
                      <p className="text-sm text-silver-lake-600 font-medium">Name</p>
                      <p className="font-bold text-gunmetal">{customerData.fullName}</p>
                    </div>
                  </div>
                )}
                
                {customerData?.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-gunmetal" />
                    <div>
                      <p className="text-sm text-silver-lake-600 font-medium">Email</p>
                      <p className="font-bold text-gunmetal">{customerData.email}</p>
                    </div>
                  </div>
                )}
                
                {customerData?.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-gunmetal" />
                    <div>
                      <p className="text-sm text-silver-lake-600 font-medium">Phone</p>
                      <p className="font-bold text-gunmetal">{customerData.phone}</p>
                    </div>
                  </div>
                )}
                
                {customerData?.shippingAddress && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gunmetal mt-1" />
                    <div>
                      <p className="text-sm text-silver-lake-600 font-medium">Shipping Address</p>
                      <p className="font-bold text-gunmetal leading-relaxed">
                        {formatShippingAddress(customerData.shippingAddress)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Support Information */}
            <div className="bg-seasalt border border-silver-lake-200 rounded-lg shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-silver-lake-200 bg-silver-lake-50">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gunmetal" />
                  <h2 className="text-lg font-bold text-gunmetal">Need Help?</h2>
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-center space-y-4">
                  <p className="text-silver-lake-700 font-medium">
                    If you have any questions about your order, please contact Pugly support:
                  </p>
                  
                  <motion.a
                    href="tel:+918319876678"
                    className="inline-flex items-center space-x-2 bg-gunmetal hover:bg-delft-blue text-seasalt px-6 py-3 rounded-lg font-bold transition-colors"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone className="w-4 h-4" />
                    <span>+91 8319876678</span>
                  </motion.a>
                  
                  <p className="text-sm text-silver-lake-600 font-medium">
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
            className="inline-flex items-center justify-center space-x-2 bg-white hover:bg-silver-lake-50 text-gunmetal font-bold px-6 py-3 rounded-lg border-2 border-silver-lake-300 hover:border-gunmetal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:ring-offset-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Product</span>
          </Link>
          
          <Link
            href={`/${username}`}
            className="inline-flex items-center justify-center space-x-2 bg-gunmetal hover:bg-delft-blue text-white font-bold px-6 py-3 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:ring-offset-2 shadow-lg hover:shadow-xl"
          >
            <Package className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </motion.div>

        {/* Footer Note */}
        <motion.div 
          className="text-center mt-8 pt-8 border-t border-silver-lake-200"
          variants={itemVariants}
        >
          <p className="text-sm text-silver-lake-600 mt-2 font-medium text-center">
            Powered by <span className="font-bold text-gunmetal">Pugly</span>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}