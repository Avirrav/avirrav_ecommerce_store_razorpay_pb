import  BillboardPage  from "@/components/billboard";
import { Footer } from "@/components/footer";
import  ImageGallery  from "@/components/image-gallery";
import  ProductInfo  from "@/components/product-info";
import PricingInfo  from "@/components/pricing-info";
import FeaturedProducts  from "@/components/featured-products";
import { Navbar } from "@/components/ui/navbar";
import getStore from "@/actions/getStore";
import getProduct from "@/actions/getProduct";
import getBillboard from "@/actions/getBillboard";
import getProducts from "@/actions/getProducts";

interface StorePageProps {
  params: {
    username: string;
    productid: string;
  };
}

const Home = async ({params}: StorePageProps) => {
  const store = await getStore(params.username);
  const products = await getProducts({ isFeatured: true }, store?.apiUrl);
  const product = await getProduct(params.productid, store?.apiUrl);
  const billboard = await getBillboard(store?.homeBillboardId, store?.apiUrl);
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFAF0]">
      <Navbar storeUrl={store?.apiUrl} username={params.username} productId={params.productid} />
      <main className="flex-grow pt-20 mt-8">
        <div className="neu-container">
          {/* Billboard section */}
          <div className="transform hover: translate-x-2 transition-transform duration-300 mb-8">
            <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <BillboardPage data={billboard} />
            </div>
          </div>
          
          {/* Product section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            {/* Image Gallery */}
            <div className="lg:col-span-8 transform hover:translate-x-2 transition-transform duration-300">
              <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-6">
                <ImageGallery images={product.images} />
              </div>
            </div>
            
            {/* Pricing Info */}
            <div className="lg:col-span-4 transform hover:-translate-x-2 transition-transform duration-300">
              <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white">
                <PricingInfo 
                  items={[product]} 
                  username={params.username} 
                  productId={params.productid} 
                  storeUrl={store?.apiUrl} 
                />
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="transform hover:translate-y-2 transition-transform duration-300 mb-8">
            <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8">
              <ProductInfo product={[product]} />
            </div>
          </div>
          
          {/* Featured Products */}
          <div className="transform hover:-translate-y-2 transition-transform duration-300">
            <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-8">
              <FeaturedProducts products={products} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;