'use client';

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, Lock, Truck } from "lucide-react";

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

export function CheckoutForm({ productPrice, productName, productId, storeUrl, username, storeName, razorpayKeyId }: CheckoutFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
            toast.success('Payment completed.');
            router.push(`/${username}/${productId}/payment-status?username=${username}&productId=${productId}&success=true`);
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
          color: "#008060",
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
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Customer Information */}
      <div className="polaris-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-[#008060] rounded-full flex items-center justify-center text-white font-semibold">1</div>
          <h2 className="polaris-text-heading-md">Customer Information</h2>
        </div>
        
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+91 12345 67890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>

      {/* Shipping Address */}
      <div className="polaris-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-[#008060] rounded-full flex items-center justify-center text-white font-semibold">2</div>
          <h2 className="polaris-text-heading-md">Shipping Address</h2>
        </div>
        
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main Street" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addressLine2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Landmark</FormLabel>
                  <FormControl>
                    <Input placeholder="Near the park" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Mumbai" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Maharashtra" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="400001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="India" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </div>

      {/* Order Summary */}
      <div className="polaris-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-[#008060] rounded-full flex items-center justify-center text-white font-semibold">3</div>
          <h2 className="polaris-text-heading-md">Order Summary</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="polaris-text-body">{productName}</span>
            <span className="font-medium">₹{productPrice}</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#008060]" />
              <span className="polaris-text-body">Shipping</span>
            </div>
            <span className="font-medium text-[#008060]">Free</span>
          </div>
          <div className="flex justify-between items-center py-3 text-lg font-semibold">
            <span>Total</span>
            <span>₹{productPrice}</span>
          </div>
        </div>
      </div>

      {/* Payment */}
      <div className="polaris-card p-6">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-8 h-8 bg-[#008060] rounded-full flex items-center justify-center text-white font-semibold">4</div>
          <h2 className="polaris-text-heading-md">Payment</h2>
        </div>
        
        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>Your payment information is secure and encrypted</span>
        </div>
        
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="w-full polaris-button-primary py-3 text-base font-medium flex items-center justify-center space-x-2"
          disabled={isSubmitting}
        >
          <CreditCard className="w-5 h-5" />
          <span>{isSubmitting ? "Processing..." : "Complete Payment"}</span>
        </Button>
      </div>
    </div>
  );
}