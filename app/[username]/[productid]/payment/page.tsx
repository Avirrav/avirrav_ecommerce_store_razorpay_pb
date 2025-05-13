'use client';

import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mt-8">
        <div className="neu-container max-w-4xl mx-auto px-4">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-center text-lg">
                  This is a placeholder for the payment processing page.
                </p>
                <p className="text-center text-muted-foreground mt-2">
                  In a real application, this would integrate with a payment processor like Stripe, PayPal, etc.
                </p>
              </div>
              
              <div className="flex justify-center">
                <Button
                  onClick={() => router.push("/")}
                  className="mt-4"
                >
                  Return to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
} 