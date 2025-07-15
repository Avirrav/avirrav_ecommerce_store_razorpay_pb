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
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
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
                      href={`/${params.username}/${params.productid}`}
                      className="flex items-center text-gunmetal hover:text-delft-blue transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div className="w-px h-6 bg-silver-lake-300" />
                    <h1 className="text-lg font-semibold text-gunmetal">Checkout</h1>
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