import { ProductCard } from "./product-card";

const FEATURED_PRODUCTS = [
  {
    id: 1,
    title: "Modern Chair",
    price: 299,
    image: "/images/chair-1.jpg"
  },
  {
    id: 2,
    title: "Office Chair",
    price: 399,
    image: "/images/chair-2.jpg"
  },
  {
    id: 3,
    title: "Elegant Chair",
    price: 499,
    image: "/images/chair-3.jpg"
  },
  {
    id: 4,
    title: "Designer Chair",
    price: 599,
    image: "/images/chair-4.jpg"
  },
];

export function FeaturedProducts() {
  return (
    <div className="neu-card border-0">
      <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* ProductCard components with joined borders */}
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
}