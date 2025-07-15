'use client';

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Lock, Truck, Banknote } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import getProduct from "@/actions/getProduct";
import getStore from "@/actions/getStore";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  addressLine2: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(5, "Zip code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  productPrice: string;
  productName: string;
  productId: string;
  storeUrl: string;
  username: string;
  storeName: string;
  razorpayKeyId: string;
}

interface shippingAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

function CheckoutForm({ productPrice, productName, productId, storeUrl, username, storeName, razorpayKeyId }: CheckoutFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod'>('online');
  const searchParams = useSearchParams();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      postalCode: "",
      country: "India",
    },
  });

  // Load customer data from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem("customerEmail");
      if (savedEmail) form.setValue("email", savedEmail);
      
      const savedFullName = localStorage.getItem("customerFullName");
      if (savedFullName) form.setValue("fullName", savedFullName);
      
      const savedPhone = localStorage.getItem("customerPhone");
      if (savedPhone) form.setValue("phone", savedPhone);
      
      const customerShippingAddress = localStorage.getItem("customerShippingAddress");
      if (customerShippingAddress && customerShippingAddress !== "") {
        try {
          const addressData: shippingAddress = JSON.parse(customerShippingAddress);
          form.setValue("addressLine1", addressData.addressLine1);
          form.setValue("addressLine2", addressData.addressLine2);
          form.setValue("city", addressData.city);
          form.setValue("state", addressData.state);
          form.setValue("postalCode", addressData.postalCode);
          form.setValue("country", addressData.country);
        } catch (error) {
          form.setValue("addressLine1", customerShippingAddress);
        }
      }
    }
  }, [form]);

  useEffect(() => {
    // Load Razorpay SDK
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    if (searchParams.get('success')) {
      toast.success('Payment completed.');
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [searchParams]);

  async function onSubmit(formData: CheckoutFormValues) {
    setIsSubmitting(true);
    try {
      const totalPrice = parseFloat(productPrice);
      
      if (paymentMethod === 'cod') {
        // Handle Cash on Delivery
        const response = await fetch(`${storeUrl}/checkout/cod`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productIds: [productId],
            ...formData
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }
        
        const orderData = await response.json();
        const realOrderId = orderData.orderId || orderData.id || `COD${Date.now()}`;
        
        toast.success('Order placed successfully!');
        router.push(`/${username}/${productId}/payment-status?username=${username}&productId=${productId}&cod=true&orderId=${realOrderId}`);
        return;
      }

      // Handle Online Payment
      const response = await fetch(`${storeUrl}/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productIds: [productId],
          amount: totalPrice * 100,
          ...formData
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
      
      const responseData = await response.json();
      
      const options = {
        key: razorpayKeyId,
        amount: responseData.amount, 
        currency: responseData.currency,
        name: storeName || "Store",
        description: "Purchase Description",
        order_id: responseData.id,
        handler: async function (response: any) {
          const verifyResponse = await fetch(`${storeUrl}/verify-payment`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature
            }),
          });
          
          if (verifyResponse.ok) {
            const verifyData = await verifyResponse.json();
            const realOrderId = verifyData.orderId || response.razorpay_order_id || `PAY${Date.now()}`;
            
            toast.success('Payment completed.');
            router.push(`/${username}/${productId}/payment-status?username=${username}&productId=${productId}&success=true&orderId=${realOrderId}`);
          } else {
            toast.error('Payment verification failed.');
            router.push(`/${username}/${productId}/payment-status?username=${username}&productId=${productId}&failed=true`);
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#212b36",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error('Something went wrong with the checkout process.');
      router.push(`/${username}/${productId}/payment-status?username=${username}&productId=${productId}&failed=true`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Customer Information */}
      <div className="bg-seasalt border border-silver-lake-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-silver-lake-200 bg-silver-lake-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gunmetal rounded-lg flex items-center justify-center text-seasalt font-semibold text-sm">1</div>
            <h2 className="text-lg font-bold text-gunmetal">Customer Information</h2>
          </div>
        </div>
        
        <div className="p-6">
          <Form {...form}>
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gunmetal">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" className="w-full px-3 py-2.5 border-2 border-silver-lake-300 rounded-lg text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-gunmetal transition-all duration-200 text-gunmetal bg-white" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600 mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gunmetal">Email</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="john.doe@example.com" 
                          className="w-full px-3 py-2.5 border-2 border-silver-lake-300 rounded-lg text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-gunmetal transition-all duration-200 text-gunmetal bg-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600 mt-1" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gunmetal">Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+91 12345 67890" className="w-full px-3 py-2.5 border-2 border-silver-lake-300 rounded-lg text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-gunmetal transition-all duration-200 text-gunmetal bg-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600 mt-1" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-seasalt border border-silver-lake-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-silver-lake-200 bg-silver-lake-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gunmetal rounded-lg flex items-center justify-center text-seasalt font-semibold text-sm">2</div>
            <h2 className="text-lg font-bold text-gunmetal">Shipping Address</h2>
          </div>
        </div>
        
        <div className="p-6">
          <Form {...form}>
            <form className="space-y-5">
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gunmetal">Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main Street" className="w-full px-3 py-2.5 border-2 border-silver-lake-300 rounded-lg text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-gunmetal transition-all duration-200 text-gunmetal bg-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600 mt-1" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gunmetal">Landmark</FormLabel>
                    <FormControl>
                      <Input placeholder="Near the park" className="w-full px-3 py-2.5 border-2 border-silver-lake-300 rounded-lg text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-gunmetal transition-all duration-200 text-gunmetal bg-white" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600 mt-1" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gunmetal">City</FormLabel>
                      <FormControl>
                        <Input placeholder="Mumbai" className="w-full px-3 py-2.5 border-2 border-silver-lake-300 rounded-lg text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-gunmetal transition-all duration-200 text-gunmetal bg-white" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600 mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gunmetal">State</FormLabel>
                      <FormControl>
                        <Input placeholder="Maharashtra" className="w-full px-3 py-2.5 border-2 border-silver-lake-300 rounded-lg text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-gunmetal transition-all duration-200 text-gunmetal bg-white" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600 mt-1" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gunmetal">Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="400001" className="w-full px-3 py-2.5 border-2 border-silver-lake-300 rounded-lg text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-gunmetal transition-all duration-200 text-gunmetal bg-white" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600 mt-1" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-gunmetal">Country</FormLabel>
                      <FormControl>
                        <Input placeholder="India" className="w-full px-3 py-2.5 border-2 border-silver-lake-300 rounded-lg text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-gunmetal transition-all duration-200 text-gunmetal bg-white" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs text-red-600 mt-1" />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-seasalt border border-silver-lake-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-silver-lake-200 bg-silver-lake-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gunmetal rounded-lg flex items-center justify-center text-seasalt font-semibold text-sm">3</div>
            <h2 className="text-lg font-bold text-gunmetal">Order Summary</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-silver-lake-200">
              <span className="text-base text-gunmetal font-semibold">{productName}</span>
              <span className="font-bold text-gunmetal">₹{productPrice}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-silver-lake-200">
              <div className="flex items-center space-x-2">
                <Truck className="w-4 h-4 text-gunmetal" />
                <span className="text-base text-gunmetal font-medium">Shipping</span>
              </div>
              <span className="font-bold text-green-600">Free</span>
            </div>
            <div className="flex justify-between items-center py-3 text-lg font-bold text-gunmetal border-t-2 border-gunmetal pt-4">
              <span>Total</span>
              <span>₹{productPrice}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Selection */}
      <div className="bg-seasalt border border-silver-lake-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-silver-lake-200 bg-silver-lake-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gunmetal rounded-lg flex items-center justify-center text-seasalt font-semibold text-sm">4</div>
            <h2 className="text-lg font-bold text-gunmetal">Payment Method</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4 mb-6">
            {/* Online Payment Option */}
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentMethod === 'online' 
                  ? 'border-gunmetal bg-gunmetal/5' 
                  : 'border-silver-lake-200 hover:border-silver-lake-300'
              }`}
              onClick={() => setPaymentMethod('online')}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'online' 
                    ? 'border-gunmetal bg-gunmetal' 
                    : 'border-silver-lake-400'
                }`}>
                  {paymentMethod === 'online' && (
                    <div className="w-2 h-2 bg-seasalt rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <CreditCard className="w-5 h-5 text-gunmetal" />
                <div>
                  <p className="font-bold text-gunmetal">Online Payment</p>
                  <p className="text-sm text-silver-lake-600">Pay securely with Razorpay</p>
                </div>
              </div>
            </div>

            {/* Cash on Delivery Option */}
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                paymentMethod === 'cod' 
                  ? 'border-gunmetal bg-gunmetal/5' 
                  : 'border-silver-lake-200 hover:border-silver-lake-300'
              }`}
              onClick={() => setPaymentMethod('cod')}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  paymentMethod === 'cod' 
                    ? 'border-gunmetal bg-gunmetal' 
                    : 'border-silver-lake-400'
                }`}>
                  {paymentMethod === 'cod' && (
                    <div className="w-2 h-2 bg-seasalt rounded-full mx-auto mt-0.5"></div>
                  )}
                </div>
                <Banknote className="w-5 h-5 text-gunmetal" />
                <div>
                  <p className="font-bold text-gunmetal">Cash on Delivery</p>
                  <p className="text-sm text-silver-lake-600">Pay when you receive your order</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 mb-6 text-sm text-gunmetal">
            <Lock className="w-4 h-4" />
            <span className="font-semibold">Your information is secure and encrypted</span>
          </div>
          
          {paymentMethod === 'online' ? (
            <button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full bg-gunmetal hover:bg-delft-blue text-white font-bold px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:ring-offset-2 h-12 text-base flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              <CreditCard className="w-5 h-5" />
              <span>{isSubmitting ? "Processing..." : "Complete Payment"}</span>
            </button>
          ) : (
            <button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full bg-delft-blue hover:bg-yinmn-blue text-white h-12 text-base font-bold flex items-center justify-center space-x-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-delft-blue focus:ring-offset-2 shadow-lg hover:shadow-xl"
              disabled={isSubmitting}
            >
              <Banknote className="w-5 h-5" />
              <span>{isSubmitting ? "Placing Order..." : "Place Order"}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function PaymentPage({ params }: { params: { username: string; productid: string } }) {
  const store = await getStore(params.username);
  const product = await getProduct(params.productid, store?.apiUrl);
  const productPrice = product?.price;
  const productName = product?.name;

  return (
    <div className="min-h-screen bg-silver-lake-900 flex flex-col">
      {/* Top Section - Navbar */}
      <div className="flex-shrink-0">
        <Navbar storeUrl={store?.apiUrl} username={params.username} productId={params.productid} />
      </div>
      {/* Middle Section - Main Content */}
      <div className="flex-grow pt-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-seasalt rounded-3xl shadow-2xl overflow-hidden min-h-[calc(100vh-8rem)]">
            <main className="mb-8">
              {/* Header */}
              <div className="bg-silver-lake-50 max-w-4xl border-t border-l border-r border-silver-lake-200 rounded-t-lg mt-8 mx-auto">
                <div className="px-6 py-4 border-b border-silver-lake-200">
                  <div className="flex items-center space-x-4">
                    <Link 
                      href={`/${params.username}/${params.productid}/checkout`}
                      className="flex items-center text-gunmetal hover:text-delft-blue transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="w-px h-6 bg-silver-lake-300" />
                    <h1 className="text-lg font-semibold text-gunmetal">Payment</h1>
                  </div>
                </div>
              </div>
              <div className="max-w-4xl mx-auto border-b border-l border-r border-silver-lake-200 px-6 py-8">
                <CheckoutForm 
                  productPrice={productPrice} 
                  productName={productName} 
                  productId={params.productid} 
                  storeUrl={store?.apiUrl} 
                  username={params.username} 
                  storeName={store?.name} 
                  razorpayKeyId={store?.razorpayKeyId} 
                />
              </div>
            </main>
          </div>
        </div>
      </div>
      {/* Bottom Section - Footer */}
      <div className="flex-shrink-0">
        <Footer username={params.username} />
      </div>
    </div>
  );
}