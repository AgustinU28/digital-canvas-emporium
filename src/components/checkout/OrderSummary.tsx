
import { useCart } from "@/context/CartContext";

const OrderSummary = () => {
  const { cartItems, totalAmount } = useCart();
  
  const formattedTotal = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(totalAmount);

  return (
    <div className="tech-card p-6 sticky top-24">
      <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
      
      <div className="space-y-4 mb-6">
        {cartItems.map((item) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <div className="w-16 h-16 bg-white/5 rounded-md overflow-hidden flex-shrink-0">
              <img src={item.product.mainImage} alt={item.product.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-grow">
              <p className="font-medium text-sm">{item.product.title}</p>
              <p className="text-white/60 text-xs">Cantidad: {item.quantity}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">
                ${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-white/10 pt-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-white/60">Subtotal</span>
          <span>{formattedTotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Envío</span>
          <span className="text-neon-blue">Gratis</span>
        </div>
        <div className="border-t border-white/10 my-2"></div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span className="text-neon-blue text-xl">{formattedTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
