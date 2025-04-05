
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tab } from "@headlessui/react";
import { ArrowLeft, Check, ChevronRight, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import products from "@/data/products.json";
import { Product } from "@/types";

const ProductDetail = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  
  if (!product) {
    return (
      <div className="bg-dark min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="container mx-auto px-4 py-16 text-center">
            <h1 className="text-3xl font-bold mb-4">Producto no encontrado</h1>
            <p className="text-white/60 mb-8">El producto que buscas no existe o ha sido removido.</p>
            <Link to="/store">
              <Button>Volver a la tienda</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    
    toast({
      title: "¡Agregado al carrito!",
      description: `${product.title} (${quantity}) añadido al carrito`,
    });
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(price);
  };
  
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);
  
  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <div className="flex items-center text-sm mb-6">
            <Link to="/" className="text-white/60 hover:text-white">Inicio</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-white/60" />
            <Link to="/store" className="text-white/60 hover:text-white">Tienda</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-white/60" />
            <Link to={`/store?category=${product.category}`} className="text-white/60 hover:text-white">{product.category}</Link>
            <ChevronRight className="h-4 w-4 mx-2 text-white/60" />
            <span className="text-white">{product.title}</span>
          </div>
          
          {/* Product Detail */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="tech-card overflow-hidden aspect-square">
                <img 
                  src={product.images ? product.images[selectedImage] : product.mainImage} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`aspect-square rounded-md overflow-hidden border-2 ${
                        selectedImage === index ? 'border-neon-blue' : 'border-transparent'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img src={image} alt={`${product.title} - imagen ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60">{product.brand}</span>
                  
                  {product.rating && (
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-white/20'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium">{product.rating}</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-3xl font-bold">{product.title}</h1>
                
                <div className="mt-2">
                  {product.onSale ? (
                    <div className="flex items-center">
                      <span className="text-3xl font-bold text-neon-blue">{formatPrice(product.salePrice!)}</span>
                      <span className="text-xl line-through text-white/50 ml-3">{formatPrice(product.price)}</span>
                      <span className="ml-3 bg-neon-blue/20 text-neon-blue px-2 py-1 rounded text-xs">
                        {Math.round(((product.price - product.salePrice!) / product.price) * 100)}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
                  )}
                </div>
              </div>
              
              <p className="text-white/70">{product.description}</p>
              
              <div className="tech-card p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/60 text-sm mb-1">Disponibilidad</p>
                    <div className="flex items-center">
                      {product.stock! > 0 ? (
                        <>
                          <span className="h-3 w-3 rounded-full bg-green-500 mr-2"></span>
                          <span className="font-medium">En stock ({product.stock} unidades)</span>
                        </>
                      ) : (
                        <>
                          <span className="h-3 w-3 rounded-full bg-red-500 mr-2"></span>
                          <span className="font-medium">Agotado</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-white/60 text-sm mb-1">Categoría</p>
                    <Link to={`/store?category=${product.category}`} className="font-medium hover:text-neon-blue">
                      {product.category}
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-white/20 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-l-lg h-12 w-12"
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <div className="w-12 text-center">
                    <span className="text-lg font-medium">{quantity}</span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-r-lg h-12 w-12"
                    onClick={incrementQuantity}
                    disabled={quantity >= product.stock!}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  className="flex-1 h-12 bg-neon-blue hover:bg-neon-blue/90"
                  onClick={handleAddToCart}
                  disabled={product.stock! <= 0}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Agregar al carrito
                </Button>
              </div>
              
              {/* Product Specs */}
              <div className="border-t border-white/10 pt-6">
                <Tab.Group>
                  <Tab.List className="flex space-x-1 p-1 bg-white/5 rounded-lg">
                    <Tab 
                      className={({ selected }) => 
                        `w-full py-2.5 rounded-lg text-sm font-medium leading-5 transition-all 
                         ${selected 
                           ? 'bg-white/10 text-white shadow' 
                           : 'text-white/60 hover:bg-white/5 hover:text-white'
                         }`
                      }
                    >
                      Especificaciones
                    </Tab>
                    <Tab 
                      className={({ selected }) => 
                        `w-full py-2.5 rounded-lg text-sm font-medium leading-5 transition-all 
                         ${selected 
                           ? 'bg-white/10 text-white shadow' 
                           : 'text-white/60 hover:bg-white/5 hover:text-white'
                         }`
                      }
                    >
                      Garantía
                    </Tab>
                    <Tab 
                      className={({ selected }) => 
                        `w-full py-2.5 rounded-lg text-sm font-medium leading-5 transition-all 
                         ${selected 
                           ? 'bg-white/10 text-white shadow' 
                           : 'text-white/60 hover:bg-white/5 hover:text-white'
                         }`
                      }
                    >
                      Envío
                    </Tab>
                  </Tab.List>
                  <Tab.Panels className="mt-4">
                    <Tab.Panel className="p-4 bg-white/5 rounded-lg">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(product.specs).map(([key, value]) => (
                          <div key={key} className="flex items-center">
                            <span className="w-32 text-white/60">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                            <span className="font-medium">{value}</span>
                          </div>
                        ))}
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className="p-4 bg-white/5 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <p>Garantía de 1 año en todas las partes</p>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <p>Servicio técnico especializado</p>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <p>30 días de garantía de satisfacción</p>
                        </div>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel className="p-4 bg-white/5 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <p>Envío gratuito en todo el país</p>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <p>Entrega estimada: 3-5 días hábiles</p>
                        </div>
                        <div className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                          <p>Opciones de envío express disponibles</p>
                        </div>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </div>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Productos Relacionados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Link 
                    key={relatedProduct.id}
                    to={`/product/${relatedProduct.id}`}
                    className="tech-card group"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img 
                        src={relatedProduct.mainImage} 
                        alt={relatedProduct.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium">{relatedProduct.title}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold">
                          {formatPrice(relatedProduct.salePrice || relatedProduct.price)}
                        </span>
                        <Button 
                          size="sm" 
                          className="bg-white/10 hover:bg-neon-blue"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            addToCart(relatedProduct);
                            toast({
                              title: "¡Agregado al carrito!",
                              description: `${relatedProduct.title} añadido al carrito`,
                            });
                          }}
                        >
                          <ShoppingCart className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
