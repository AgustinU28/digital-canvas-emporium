
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import products from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";

interface FeaturedProductsProps {
  title: string;
  subTitle: string;
  filterFn: (product: Product) => boolean;
}

const FeaturedProducts = ({ title, subTitle, filterFn }: FeaturedProductsProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const filteredProducts = products.filter(filterFn);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="py-16 relative z-10">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {title}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            {subTitle}
          </p>
        </div>
        
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          {filteredProducts.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={{
                ...product,
                mainImage: product.mainImage || getRandomProductImage(Number(product.id))
              }}
              featured={product.featured}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/store">
            <Button variant="outline" className="bg-white/5 hover:bg-white/10 border-white/10 relative z-10">
              Ver todos los productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Function to provide a fallback image if none exists
const getRandomProductImage = (id: number) => {
  const images = [
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // laptop
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // people working
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // developer
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // code
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // laptop closeup
    "https://images.unsplash.com/photo-1588200908342-23b585c03e26?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", // gaming setup
  ];
  
  // Use modulo to ensure we always get a valid index even with a large number of products
  return images[id % images.length];
};

export default FeaturedProducts;
