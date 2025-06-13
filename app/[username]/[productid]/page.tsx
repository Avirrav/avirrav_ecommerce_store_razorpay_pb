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
    <div className="min-h-screen bg-gray-50">
      <Navbar storeUrl={store?.apiUrl} username={params.username} productId={params.productid} />
      
      <main className="pt-16">
        {/* Billboard section */}
        <div className="polaris-container py-8">
          <BillboardPage data={billboard} />
        </div>
        
        {/* Product section */}
        <div className="polaris-container py-8">
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
        <div className="polaris-container py-8">
          <ProductInfo product={[product]} />
        </div>
        
        {/* Featured Products */}
        <div className="polaris-container py-8">
          <FeaturedProducts products={products} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;