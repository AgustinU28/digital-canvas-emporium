
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, CreditCard, Package } from "lucide-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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

interface CheckoutFormProps {
  onOrderComplete: (orderData: {
    orderId: string;
    email: string;
    name: string;
  }) => void;
}

const CheckoutForm = ({ onOrderComplete }: CheckoutFormProps) => {
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

  const generateEmailTicket = (orderData: {
    orderId: string;
    customerName: string;
    email: string;
    items: any[];
    total: number;
    shippingAddress: string;
  }) => {
    const itemsList = orderData.items.map(item => 
      `${item.product.title} x ${item.quantity} - $${((item.product.salePrice || item.product.price) * item.quantity).toFixed(2)}`
    ).join('\n');
    
    const formattedTotal = new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
    }).format(orderData.total);
    
    return `
      TECH URI - Ticket de Compra
      ==========================
      
      ¡Gracias por tu compra, ${orderData.customerName}!
      
      Número de pedido: ${orderData.orderId}
      Fecha: ${new Date().toLocaleDateString()}
      
      PRODUCTOS:
      ${itemsList}
      
      TOTAL: ${formattedTotal}
      
      Dirección de envío:
      ${orderData.shippingAddress}
      
      Tu pedido está siendo procesado y será enviado lo antes posible.
      
      Si tienes alguna duda, responde a este correo electrónico.
      
      Saludos,
      El equipo de TECH URI
    `;
  };

  const onSubmit = (data: FormValues) => {
    setIsProcessing(true);
    
    // Simulamos el envío del formulario y el envío del correo electrónico
    setTimeout(() => {
      // Generamos un ID de pedido aleatorio
      const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
      
      console.log("Enviando correo a:", data.email);
      console.log("Datos del pedido:", {
        orderId,
        customer: `${data.firstName} ${data.lastName}`,
        items: cartItems,
        total: totalAmount,
        shippingAddress: `${data.address}, ${data.city}, ${data.zipCode}`,
      });
      
      // Simulamos el envío de un ticket por correo electrónico
      const emailContent = generateEmailTicket({
        orderId,
        customerName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        items: cartItems,
        total: totalAmount,
        shippingAddress: `${data.address}, ${data.city}, ${data.zipCode}`,
      });
      
      console.log("Contenido del correo electrónico:", emailContent);
      
      toast({
        title: "¡Pedido completado!",
        description: `Tu pedido #${orderId} ha sido procesado correctamente. Se ha enviado un ticket de confirmación a ${data.email}.`,
      });
      
      clearCart();
      onOrderComplete({
        orderId,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`
      });
      
      setIsProcessing(false);
    }, 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  const handleBackToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/cart");
  };

  return (
    <div className="tech-card p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Package className="mr-2 h-5 w-5" />
        Información de Envío
      </h2>
      
      <Form {...form}>
        <form onSubmit={handleFormSubmit} className="space-y-4 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="Tu nombre" {...field} className="bg-white/5 border-white/10 relative z-10" />
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
                    <Input placeholder="Tu apellido" {...field} className="bg-white/5 border-white/10 relative z-10" />
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
                    <Input placeholder="tu@email.com" {...field} className="bg-white/5 border-white/10 relative z-10" />
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
                    <Input placeholder="Tu número de teléfono" {...field} className="bg-white/5 border-white/10 relative z-10" />
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
                  <Input placeholder="Calle, número, piso..." {...field} className="bg-white/5 border-white/10 relative z-10" />
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
                    <Input placeholder="Tu ciudad" {...field} className="bg-white/5 border-white/10 relative z-10" />
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
                    <Input placeholder="Código postal" {...field} className="bg-white/5 border-white/10 relative z-10" />
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
                    className="min-h-[120px] bg-white/5 border-white/10 relative z-10"
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
              onClick={handleBackToCart}
              className="border-white/10 bg-white/5 relative z-20"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver al carrito
            </Button>
            <Button 
              type="submit" 
              disabled={isProcessing}
              className="bg-neon-blue hover:bg-neon-blue/90 relative z-20"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {isProcessing ? "Procesando..." : "Confirmar pedido"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
