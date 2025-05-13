import { Footer } from "@/components/footer";
import { CheckoutForm } from "./checkout-form";
import { ContinueShoppingButton } from "./continue-shopping-button";

export async function generateStaticParams() {
  // Define your static paths here
  return [
    {
      username: 'default',
      productid: 'default'
    }
  ];
}

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Custom navbar with checkout headline and continue shopping button */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="neu-container py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Checkout</h1>
            <ContinueShoppingButton />
          </div>
        </div>
        <div className="h-[3px] bg-[rgb(var(--border-rgb))]" />
      </div>
      
      <main className="flex-grow pt-20 mt-8">
        <div className="neu-container">
          {/* Client component handles all the interactive form parts */}
          <CheckoutForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}