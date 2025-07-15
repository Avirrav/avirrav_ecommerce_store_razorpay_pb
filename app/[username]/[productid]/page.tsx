import BillboardPage from "@/components/billboard";
import { Footer } from "@/components/footer";
import ImageGallery from "@/components/image-gallery";
import ProductInfo from "@/components/product-info";
import PricingInfo from "@/components/pricing-info";
import FeaturedProducts from "@/components/featured-products";
import { Navbar } from "@/components/ui/navbar";
import getStore from "@/actions/getStore";
import getProduct from "@/actions/getProduct";
import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";
import { PageLoader } from "@/components/page-loader";
import { Suspense } from "react";

interface StorePageProps {
  params: {
    username: string;
    productid: string;
  };
}

const Home = async ({ params }: StorePageProps) => {
  const store = await getStore(params.username);
  const products = await getProducts({ isFeatured: true }, store?.apiUrl);
  const product = await getProduct(params.productid, store?.apiUrl);
  const billboard = await getBillboard(store?.homeBillboardId, store?.apiUrl);

  return (
    <Suspense fallback={<PageLoader />}>
      <div className="min-h-screen bg-[#1a1a1a] flex flex-col">
        {/* Top Section - Navbar */}
        <div className="flex-shrink-0">
          <Navbar storeUrl={store?.apiUrl} username={params.username} productId={params.productid} />
        </div>
        
        {/* Middle Section - Main Content */}
        <div className="flex-grow pt-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-seasalt rounded-3xl shadow-2xl overflow-hidden min-h-[calc(100vh-8rem)]">
              <main className="mt-8 p-8">
                {/* Product section */}
                <div className="mb-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div>
                      <ImageGallery images={product.images} />
                    </div>
                    
                    {/* Product Info and Pricing */}
                    <div>
                      <PricingInfo 
                        items={[product]} 
                        username={params.username} 
                        productId={params.productid} 
                        storeUrl={store?.apiUrl} 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="mb-12">
                  <ProductInfo product={[product]} />
                </div>
                
                {/* Featured Products */}
                <div className="mb-8">
                  <FeaturedProducts products={products} />
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
    </Suspense>
  );
};

export default Home;