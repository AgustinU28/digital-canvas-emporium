
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag } from "lucide-react";

const CheckoutSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, email, name } = location.state || {};

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  if (!orderId) return null;

  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto tech-card p-8 md:p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 text-green-500 mb-6">
              <CheckCircle className="h-8 w-8" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">¡Compra Exitosa!</h1>
            <p className="text-white/70 mb-6">
              Gracias por tu compra, {name}. Hemos enviado un correo de confirmación a <span className="text-neon-blue">{email}</span>.
            </p>
            
            <div className="tech-card p-6 mb-6">
              <h2 className="font-medium mb-2">Detalles del pedido</h2>
              <p className="text-white/60 text-sm mb-1">Número de pedido: <span className="text-white font-mono">{orderId}</span></p>
              <p className="text-white/60 text-sm">Estado: <span className="text-green-500">Procesando</span></p>
            </div>
            
            <p className="text-white/70 mb-8">
              Tu pedido está siendo procesado y será enviado lo antes posible. 
              Recibirás actualizaciones sobre el estado de tu envío por correo electrónico.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <Link to="/">
                <Button variant="outline" className="border-white/10 bg-white/5">
                  Volver al inicio
                </Button>
              </Link>
              <Link to="/store">
                <Button className="bg-neon-blue hover:bg-neon-blue/90">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Seguir comprando
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
