'use client';

import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  addressLine1: z.string().min(5, "Address must be at least 5 characters"),
  addressLine2: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zipCode: z.string().min(5, "Zip code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  productPrice: string;
  productName: string;
}

interface shippingAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}



export function CheckoutForm({ productPrice, productName }: CheckoutFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      zipCode: "",
      country: "",
    },
  });

  // Load customer email from localStorage if available
  useEffect(() => {
    // Safe access to localStorage (only available in browser)
    if (typeof window !== 'undefined') {
      const savedEmail = localStorage.getItem("customerEmail");
      if (savedEmail) {
        form.setValue("email", savedEmail);
      }
      const savedFullName = localStorage.getItem("customerFullName");
      if (savedFullName) {
        form.setValue("fullName", savedFullName);
      }
      const savedPhone = localStorage.getItem("customerPhone");
      if (savedPhone) {
        form.setValue("phone", savedPhone);
      }
      const customerShippingAddress = localStorage.getItem("customerShippingAddress");
      if (customerShippingAddress && customerShippingAddress !== "") {
        try {
          const addressData: shippingAddress = JSON.parse(customerShippingAddress);
          form.setValue("addressLine1", addressData.addressLine1);
          form.setValue("addressLine2", addressData.addressLine2);
          form.setValue("city", addressData.city);
          form.setValue("state", addressData.state);
          form.setValue("zipCode", addressData.postalCode);
          form.setValue("country", addressData.country);
        } catch (error) {
          // If it's not valid JSON, use it as a regular string
          form.setValue("addressLine1", customerShippingAddress);
        }
      }
    }
  }, [form]);

  function onSubmit(data: CheckoutFormValues) {
    setIsSubmitting(true);

    // Create a complete address object
    const addressObject = {
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      city: data.city,
      state: data.state,
      zipCode: data.zipCode,
      country: data.country
    };

    // Save the complete address to localStorage
    localStorage.setItem("customerShippingAddress", JSON.stringify(addressObject));

    // In a real application, you would send this data to your backend
    console.log("Form data:", data);

    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Redirect to payment page
      router.push("/payment");
    }, 1000);
  }

  return (
    <>
      <div className="border-2">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="border-2 border-t-0">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="addressLine1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St" {...field} />
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
                      <Input placeholder="Near the" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" {...field} />
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
                      <FormLabel>State / Province</FormLabel>
                      <FormControl>
                        <Input placeholder="NY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP / Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" {...field} />
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
                        <Input placeholder="United States" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div className="border-2 border-t-0">
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-4">
          <div className="flex justify-between text-sm">
              <span>Product</span>
              <span>{productName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₹{productPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total to Pay</span>
              <span>₹{productPrice}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-t-0">
        <div className="p-4">
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Proceed to Payment"}
          </Button>
        </div>
      </div>
    </>
  );
}