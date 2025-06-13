'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'success' | 'failed' | 'cod' | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [productId, setProductId] = useState<string | null>(null);

  useEffect(() => {
    const successParam = searchParams.get('success');
    const failedParam = searchParams.get('failed');
    const usernameParam = searchParams.get('username');
    const productIdParam = searchParams.get('productId');
    const codParam = searchParams.get('cod');

    setUsername(usernameParam);
    setProductId(productIdParam);

    if (successParam === 'true') {
      setStatus('success');
    } else if (failedParam === 'true') {
      setStatus('failed');
    } else if (codParam === 'true') {
      setStatus('cod'); // Assuming COD is treated as a successful payment
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-[#fafbfc] flex items-center justify-center p-4">
      <motion.div
        className="polaris-card p-8 max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {status === 'success' ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="polaris-text-heading-lg mb-4 text-green-900">Payment Successful!</h1>
            <p className="polaris-text-body mb-8 text-gray-600">
              Thank you for your purchase. Your order has been confirmed and will be processed soon.
            </p>
          </>
        ) : status === 'failed' ? (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="polaris-text-heading-lg mb-4 text-red-900">Payment Failed</h1>
            <p className="polaris-text-body mb-8 text-gray-600">
              There was an issue processing your payment. Please try again or contact support.
            </p>
          </>
        ) : status === 'cod' ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="polaris-text-heading-lg mb-4 text-green-900">Order Placed Successfully</h1>
            <p className="polaris-text-body mb-8 text-gray-600">
              Your order will be delivered soon. Please have the cash ready for payment upon delivery.
            </p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded-full" />
            </div>
            <h1 className="polaris-text-heading-lg mb-4">Processing...</h1>
            <p className="polaris-text-body mb-8 text-gray-600">
              Please wait while we confirm your payment status.
            </p>
          </>
        )}

        <Link
          href={`/${username}/${productId}`}
          className="inline-flex items-center space-x-2 polaris-button-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Product</span>
        </Link>
      </motion.div>
    </div>
  );
}