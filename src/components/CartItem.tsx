
import { CartItem as CartItemType } from "@/types";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity - 1);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromCart(product.id);
  };

  const price = product.salePrice || product.price;
  const formattedPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(price);

  const totalPrice = price * quantity;
  const formattedTotalPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(totalPrice);

  return (
    <div className="tech-card p-4 flex flex-col sm:flex-row items-start gap-4 mb-4">
      <div className="w-full sm:w-24 aspect-square bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={product.mainImage || "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=800&auto=format&fit=crop"}
          alt={product.title}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start">
          <div>
            <h3 className="font-medium">{product.title}</h3>
            <p className="text-sm text-white/60 mt-1">{product.brand}</p>
          </div>
          
          <div className="text-right mt-2 sm:mt-0">
            <div className="text-sm text-white/60">Precio unitario</div>
            <div className="font-medium">{formattedPrice}</div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center space-x-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/5 border-white/10 relative z-10"
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-10 text-center">{quantity}</span>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-white/5 border-white/10 relative z-10"
              onClick={handleIncrement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm text-white/60">Subtotal</div>
              <div className="font-bold">{formattedTotalPrice}</div>
            </div>
            
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-white/60 hover:text-white hover:bg-red-500/10 relative z-10"
              onClick={handleRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
