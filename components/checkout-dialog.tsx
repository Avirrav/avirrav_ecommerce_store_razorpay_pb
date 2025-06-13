'use client';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Mail, User } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { searchCustomer } from "@/actions/searchCustomer";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type CheckoutFormValues = z.infer<typeof formSchema>;

interface CheckoutDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCheckout: (email: string) => void;
  storeUrl: string;
  username: string;
  productId: string;
}

export function CheckoutDialog({
  open,
  onOpenChange,
  onCheckout,
  storeUrl,
  username,
  productId,
}: CheckoutDialogProps) {
  const router = useRouter();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: CheckoutFormValues) {
    const customer = await searchCustomer(data.email, storeUrl);
    
    // Store customer data in localStorage
    localStorage.setItem("customerEmail", customer?.email || data.email);
    localStorage.setItem("customerId", customer?.id || "");
    localStorage.setItem("customerFullName", customer?.fullName || "");
    localStorage.setItem("customerPhone", customer?.phone || "");
    localStorage.setItem("customerShippingAddress", customer?.shippingAddress || "");
    
    onCheckout(data.email);
    onOpenChange(false);
    router.push(`/${username}/${productId}/checkout`);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-xl border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Continue to Checkout
          </DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Enter your email address to proceed with your purchase. We'll use this to send you order updates.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input 
                        placeholder="your.email@example.com" 
                        type="email"
                        className="pl-10 py-3 border-2 border-gray-200 rounded-lg focus:border-gray-900 focus:ring-0"
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex space-x-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium"
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}