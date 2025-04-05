
import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

const ProductCard = ({ product, featured = false }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className={`tech-card group ${
        featured ? "md:col-span-2 md:row-span-2" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden">
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={product.mainImage}
              alt={product.title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/80 to-transparent opacity-80" />
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.onSale && (
              <Badge className="bg-neon-blue text-white border-0 shadow-lg shadow-neon-blue/20">
                OFERTA
              </Badge>
            )}
            {product.featured && (
              <Badge className="bg-neon-purple text-white border-0 shadow-lg shadow-neon-purple/20">
                DESTACADO
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/60">{product.brand}</span>
            {product.rating && (
              <div className="flex items-center">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
                <span className="text-sm font-medium">{product.rating}</span>
              </div>
            )}
          </div>
          
          <h3 className="font-medium mt-1 mb-1 text-lg text-white group-hover:text-neon-blue transition-colors">
            {product.title}
          </h3>
          
          {featured && (
            <p className="text-sm text-white/70 mt-1 mb-2 line-clamp-2">{product.description}</p>
          )}
          
          <div className="mt-auto pt-3 flex items-center justify-between">
            <div className="flex flex-col">
              {product.onSale ? (
                <>
                  <span className="text-sm line-through text-white/50">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-lg font-bold text-neon-blue">
                    {formatPrice(product.salePrice!)}
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold">{formatPrice(product.price)}</span>
              )}
            </div>
            
            <Button
              onClick={handleAddToCart}
              size="sm"
              className="rounded-full bg-white/10 hover:bg-neon-blue transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
