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
      <DialogContent className="sm:max-w-lg bg-seasalt rounded-lg border-0 shadow-xl p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-silver-lake-50 px-6 py-4 border-b border-silver-lake-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gunmetal rounded-lg flex items-center justify-center">
              <User className="w-5 h-5 text-seasalt" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-gunmetal">
                Continue to checkout
              </DialogTitle>
              <DialogDescription className="text-sm text-gunmetal mt-1">
                Enter your email to proceed with your order
              </DialogDescription>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-gunmetal">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gunmetal" />
                        <Input 
                          placeholder="Enter your email address" 
                          type="email"
                          className="w-full px-3 py-2.5 border border-silver-lake-200 rounded-md text-sm placeholder-silver-lake-500 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:border-transparent transition-all duration-200 text-gunmetal pl-10"
                          {...field} 
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-600 mt-1" />
                  </FormItem>
                )}
              />
              
              <div className="flex space-x-3 pt-2">
                <button
                  type="button" 
                  onClick={() => onOpenChange(false)}
                  className="flex-1 bg-seasalt hover:bg-silver-lake-50 text-gunmetal font-medium px-4 py-2.5 rounded-md border border-silver-lake-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:ring-offset-2 h-11"
                >
                  Cancel
                </button>
                <button
                  type="submit" 
                  className="flex-1 bg-gunmetal hover:bg-delft-blue text-seasalt font-medium px-4 py-2.5 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gunmetal focus:ring-offset-2 h-11"
                >
                  Continue
                </button>
              </div>
            </form>
          </Form>
        </div>
        
        {/* Footer */}
        <div className="bg-silver-lake-50 px-6 py-3 border-t border-silver-lake-200">
          <p className="text-xs text-gunmetal text-center">
            We'll use this email to send you order updates and receipts
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}