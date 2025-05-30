interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  href: string;
  
}

export function ProductCard({ title, price, image, href }: ProductCardProps) {
  return (
    <a href={href} className="block group cursor-pointer transform transition-all duration-300 hover:translate-y-[-8px]">
      <div className="border-4 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="aspect-square relative mb-4 overflow-hidden border-2 border-black">
          <img 
            src={image} 
            alt={title}
            className="object-cover w-full h-full transform transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-2xl font-black text-[#FF6B6B]">₹{price}</p>
        </div>
      </div>
    </a>
  );
}