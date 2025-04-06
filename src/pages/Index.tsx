
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/types";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious 
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Banner images for carousel
  const bannerImages = [
    {
      url: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      title: "Tecnología para el futuro",
      description: "Innovación constante en cada producto."
    },
    {
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      title: "Trabajá con lo mejor",
      description: "Equipos diseñados para maximizar tu productividad."
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
      title: "Innovación constante",
      description: "Experiencias digitales superiores para todos."
    }
  ];

  return (
    <div className="bg-dark min-h-screen flex flex-col">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-dark z-50">
          <div className="text-3xl font-bold text-gradient">TECH URI</div>
        </div>
      ) : (
        <>
          <Navbar />
          <main className="flex-grow">
            <HeroSection />
            
            {/* Banner Carousel Section */}
            <div className="py-16 bg-tech-gray/10">
              <div className="container mx-auto px-4">
                <Carousel className="w-full max-w-5xl mx-auto">
                  <CarouselContent>
                    {bannerImages.map((banner, index) => (
                      <CarouselItem key={index}>
                        <div className="p-1">
                          <div className="relative rounded-xl overflow-hidden">
                            <AspectRatio ratio={16/9}>
                              <img 
                                src={banner.url} 
                                alt={banner.title}
                                className="object-cover w-full h-full" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{banner.title}</h3>
                                <p className="text-white/80 mb-4">{banner.description}</p>
                              </div>
                            </AspectRatio>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2 bg-white/10 hover:bg-white/20 border-none text-white relative z-10" />
                  <CarouselNext className="right-2 bg-white/10 hover:bg-white/20 border-none text-white relative z-10" />
                </Carousel>
              </div>
            </div>
            
            <FeaturedProducts 
              title="Ofertas del día"
              subTitle="Descuentos exclusivos por tiempo limitado en nuestros mejores equipos. No pierdas la oportunidad."
              filterFn={(product: Product) => product.onSale === true}
            />
            
            {/* Featured Banner */}
            <div className="py-12 relative">
              <div className="container mx-auto px-4">
                <div className="relative rounded-2xl overflow-hidden">
                  <div className="absolute inset-0">
                    <img 
                      src="https://images.unsplash.com/photo-1473091534298-04dcbce3278c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80" 
                      alt="Nueva tecnología táctil" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-tech-dark/90 to-tech-dark/40"></div>
                  </div>
                  <div className="relative z-10 py-20 px-8 md:px-12 flex flex-col items-start">
                    <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white max-w-lg">
                      Descubrí la nueva generación de tecnología táctil
                    </h3>
                    <p className="text-white/80 mb-8 max-w-lg">
                      Nuestra nueva línea de productos táctiles redefine la forma en que interactúas con tu tecnología. Precisión absoluta y respuesta instantánea.
                    </p>
                    <Link to="/store" className="relative z-10">
                      <button className="px-6 py-3 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors">
                        Explorar ahora
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            <FeaturedProducts 
              title="Recomendados para vos"
              subTitle="Seleccionados especialmente basados en las últimas tendencias y preferencias de nuestros usuarios."
              filterFn={(product: Product) => product.recommended === true}
            />
            
            {/* Tech Highlights Grid */}
            <div className="py-16 bg-tech-gray/10">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                  El poder de la <span className="text-gradient">tecnología</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Item 1 */}
                  <div className="tech-card p-1">
                    <div className="relative rounded-lg overflow-hidden">
                      <AspectRatio ratio={4/3}>
                        <img 
                          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                          alt="Tecnología avanzada"
                          className="object-cover w-full h-full" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/90 to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-xl font-bold text-white mb-2">Tecnología de vanguardia</h3>
                          <p className="text-white/80">Componentes seleccionados para máximo rendimiento</p>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="tech-card p-1">
                    <div className="relative rounded-lg overflow-hidden">
                      <AspectRatio ratio={4/3}>
                        <img 
                          src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                          alt="Circuitos avanzados"
                          className="object-cover w-full h-full" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/90 to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-xl font-bold text-white mb-2">Ingeniería precisa</h3>
                          <p className="text-white/80">Cada componente diseñado con precisión milimétrica</p>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                  
                  {/* Item 3 */}
                  <div className="tech-card p-1">
                    <div className="relative rounded-lg overflow-hidden">
                      <AspectRatio ratio={4/3}>
                        <img 
                          src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                          alt="Programación avanzada"
                          className="object-cover w-full h-full" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-tech-dark/90 to-transparent flex flex-col justify-end p-6">
                          <h3 className="text-xl font-bold text-white mb-2">Software optimizado</h3>
                          <p className="text-white/80">Sistemas operativos y aplicaciones perfectamente integradas</p>
                        </div>
                      </AspectRatio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
