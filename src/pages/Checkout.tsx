
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, CreditCard, Package } from "lucide-react";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "El nombre debe tener al menos 2 caracteres",
  }),
  lastName: z.string().min(2, {
    message: "El apellido debe tener al menos 2 caracteres",
  }),
  email: z.string().email({
    message: "Introduce un correo electrónico válido",
  }),
  phone: z.string().min(8, {
    message: "El número de teléfono debe tener al menos 8 dígitos",
  }),
  address: z.string().min(5, {
    message: "La dirección debe tener al menos 5 caracteres",
  }),
  city: z.string().min(2, {
    message: "La ciudad debe tener al menos 2 caracteres",
  }),
  zipCode: z.string().min(4, {
    message: "El código postal debe tener al menos 4 caracteres",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      notes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsProcessing(true);
    
    // Simulamos el envío del formulario
    setTimeout(() => {
      // Generamos un ID de pedido aleatorio
      const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      // Enviamos un correo (simulado)
      console.log("Enviando correo a:", data.email);
      console.log("Datos del pedido:", {
        orderId,
        customer: `${data.firstName} ${data.lastName}`,
        items: cartItems,
        total: totalAmount,
        shippingAddress: `${data.address}, ${data.city}, ${data.zipCode}`,
      });
      
      toast({
        title: "¡Pedido completado!",
        description: `Tu pedido #${orderId} ha sido procesado correctamente. Recibirás un correo de confirmación en breve.`,
      });
      
      clearCart();
      navigate("/checkout/success", { 
        state: { 
          orderId,
          email: data.email,
          name: `${data.firstName} ${data.lastName}`
        } 
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const formattedTotal = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(totalAmount);

  if (cartItems.length === 0) {
    navigate("/cart");
    return null;
  }

  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-2">
              <div className="tech-card p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <Package className="mr-2 h-5 w-5" />
                  Información de Envío
                </h2>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu nombre" {...field} className="bg-white/5 border-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Apellido</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu apellido" {...field} className="bg-white/5 border-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correo Electrónico</FormLabel>
                            <FormControl>
                              <Input placeholder="tu@email.com" {...field} className="bg-white/5 border-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Teléfono</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu número de teléfono" {...field} className="bg-white/5 border-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dirección</FormLabel>
                          <FormControl>
                            <Input placeholder="Calle, número, piso..." {...field} className="bg-white/5 border-white/10" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Ciudad</FormLabel>
                            <FormControl>
                              <Input placeholder="Tu ciudad" {...field} className="bg-white/5 border-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Código Postal</FormLabel>
                            <FormControl>
                              <Input placeholder="Código postal" {...field} className="bg-white/5 border-white/10" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notas adicionales (opcional)</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Instrucciones especiales para la entrega..." 
                              className="min-h-[120px] bg-white/5 border-white/10"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => navigate("/cart")}
                        className="border-white/10 bg-white/5"
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver al carrito
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={isProcessing}
                        className="bg-neon-blue hover:bg-neon-blue/90"
                      >
                        <CreditCard className="mr-2 h-4 w-4" />
                        {isProcessing ? "Procesando..." : "Confirmar pedido"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
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
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;
