import { Billboard } from "@/components/billboard";
import { Footer } from "@/components/footer";
import { ImageGallery } from "@/components/image-gallery";
import { ProductInfo } from "@/components/product-info";
import { PricingInfo } from "@/components/pricing-info";
import { FeaturedProducts } from "@/components/featured-products";
import { Navbar } from "@/components/ui/navbar";

export async function generateStaticParams() {
  // Define your static paths here
  // This is a placeholder - you'll need to update with your actual usernames and product IDs
  return [
    {
      username: 'default',
      productid: 'default'
    }
  ];
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 mt-8">
        <div className="neu-container">
          {/* Billboard section with matching border */}
          <div className="border-2">
            <Billboard />
          </div>
          
          {/* Main-1 section with matching border width */}
          <div className="grid grid-cols-1 border-2 border-t-0 lg:grid-cols-10">
            <div className="lg:col-span-7 p-2 flex items-center justify-center border-b lg:border-b-0 lg:border-r">
              <div className="w-full h-full">
                <ImageGallery />
              </div>
            </div>
            <div className="lg:col-span-3 p-4">
              <PricingInfo />
            </div>
          </div>
          
          {/* Rest of the sections maintain the connected borders */}
          <div className="border-2 border-t-0">
            <div className="p-4">
              <ProductInfo />
            </div>
          </div>
          
          <div className="border-2 border-t-0">
            <div className="p-4">
              <FeaturedProducts />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}