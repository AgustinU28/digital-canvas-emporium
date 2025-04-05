
import { useState, useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Product } from "@/types";

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

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
            
            <FeaturedProducts 
              title="Ofertas del día"
              subTitle="Descuentos exclusivos por tiempo limitado en nuestros mejores equipos. No pierdas la oportunidad."
              filterFn={(product: Product) => product.onSale === true}
            />
            
            <FeaturedProducts 
              title="Recomendados para vos"
              subTitle="Seleccionados especialmente basados en las últimas tendencias y preferencias de nuestros usuarios."
              filterFn={(product: Product) => product.recommended === true}
            />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Index;
