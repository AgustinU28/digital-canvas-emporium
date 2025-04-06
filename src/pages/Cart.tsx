
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartItem from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart, totalAmount } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const formattedTotal = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(totalAmount);
  
  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (cartItems.length === 0) {
      toast({
        title: "El carrito está vacío",
        description: "Agrega productos al carrito antes de finalizar la compra",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to checkout
    navigate("/checkout");
  };

  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Tu Carrito</h1>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
                
                <div className="mt-6 flex justify-between items-center">
                  <Link to="/store">
                    <Button variant="link" className="pl-0 flex items-center text-neon-blue">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Continuar Comprando
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="text-red-400 border-red-400/20 hover:bg-red-400/10"
                    onClick={clearCart}
                    type="button"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="tech-card p-6">
                  <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Subtotal</span>
                      <span>{formattedTotal}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Envío</span>
                      <span className="text-neon-blue">Gratis</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Impuestos</span>
                      <span>Incluidos</span>
                    </div>
                    <div className="border-t border-white/10 my-3"></div>
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-neon-blue text-xl">{formattedTotal}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-neon-blue hover:bg-neon-blue/90 relative z-20"
                    onClick={handleCheckout}
                    type="button"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Finalizar Compra
                  </Button>
                  
                  <div className="mt-4 text-xs text-center text-white/40">
                    Pago seguro garantizado
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="tech-card p-12 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="h-16 w-16 text-white/30" />
              </div>
              <h2 className="text-2xl font-medium mb-2">Tu carrito está vacío</h2>
              <p className="text-white/60 mb-6 max-w-md mx-auto">
                Parece que aún no has agregado productos a tu carrito. 
                Explora nuestra tienda para encontrar lo que necesitas.
              </p>
              <Link to="/store">
                <Button>Ir a la Tienda</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;
