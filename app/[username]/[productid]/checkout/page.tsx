import { Footer } from "@/components/footer";
import { CheckoutForm } from "./checkout-form";
import { Navbar } from "@/components/ui/navbar";
import getProduct from "@/actions/getProduct";
import getStore from "@/actions/getStore";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CheckoutPageProps {
  params: {
    username: string;
    productid: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const store = await getStore(params.username);
  const product = await getProduct(params.productid, store?.apiUrl);
  const productPrice = product?.price;
  const productName = product?.name;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar storeUrl={store?.apiUrl} username={params.username} productId={params.productid} />
      
      <main className="pt-16">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="polaris-container py-6">
            <div className="flex items-center space-x-4">
              <Link 
                href={`/${params.username}/${params.productid}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to product</span>
              </Link>
              <div className="w-px h-6 bg-gray-300" />
              <h1 className="polaris-text-heading-lg">Checkout</h1>
            </div>
          </div>
        </div>
        
        <div className="polaris-container py-8">
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
      
      <Footer />
    </div>
  );
}