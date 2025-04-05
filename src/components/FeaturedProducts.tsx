
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
    <section className="py-16">
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
              product={product}
              featured={product.featured}
            />
          ))}
        </div>
        
        <div className="mt-10 text-center">
          <Link to="/store">
            <Button variant="outline" className="bg-white/5 hover:bg-white/10 border-white/10">
              Ver todos los productos
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
