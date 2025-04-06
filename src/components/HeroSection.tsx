
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight, Cpu, MonitorSmartphone, Disc } from "lucide-react";

const HeroSection = () => {
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowGlow(true);
    }, 500);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-neon-blue/10 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-neon-purple/10 blur-[100px]" />
        
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
            backgroundPosition: "-19px -19px",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="container mx-auto z-10 pt-24 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              El futuro de la
              <span className="block text-gradient">computación</span>
              ahora en tus manos
            </h1>
            
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Diseños únicos, tecnología de vanguardia y experiencias digitales 
              que redefinen lo que una computadora puede hacer.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/store">
                <Button className="hero-button group relative z-10">
                  Explora la colección
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/about">
                <Button variant="outline" className="text-white bg-white/5 hover:bg-white/10 border border-white/10 text-lg relative z-10">
                  Conócenos
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-8">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-neon-blue" />
                <span className="text-sm text-white/70">Procesadores de última generación</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Disc className="w-5 h-5 text-neon-purple" />
                <span className="text-sm text-white/70">DDR5 Ultra-rápida</span>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className={`relative z-10 transition-all duration-1000 ${
              showGlow ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}>
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                  alt="Laptop futurista con iluminación" 
                />
              </div>
            </div>
            
            {/* Glow Effects */}
            <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-glow-conic rounded-full blur-[60px] opacity-30 transition-opacity duration-1000 ${
              showGlow ? "opacity-30" : "opacity-0"
            }`} />
            
            <div className={`absolute inset-0 bg-glow-conic opacity-0 animate-pulse`} 
                style={{ animationDuration: "3s" }} />
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto glassmorphism rounded-2xl py-6 px-8 z-10 mt-12 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-neon-blue mb-1">12+</div>
            <div className="text-white/60">Modelos Exclusivos</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-neon-purple mb-1">99.8%</div>
            <div className="text-white/60">Satisfacción del Cliente</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-neon-pink mb-1">3 años</div>
            <div className="text-white/60">Garantía Extendida</div>
          </div>
        </div>
      </div>

      {/* Orbiting Icons */}
      <div className="absolute left-5 top-1/3 animate-float">
        <MonitorSmartphone className="text-neon-blue/30 w-12 h-12" />
      </div>
      <div className="absolute right-12 top-2/3 animate-float" style={{ animationDelay: "1s" }}>
        <Cpu className="text-neon-purple/30 w-16 h-16" />
      </div>
      <div className="absolute left-1/3 bottom-16 animate-float" style={{ animationDelay: "2s" }}>
        <Disc className="text-neon-pink/30 w-10 h-10" />
      </div>
    </section>
  );
};

export default HeroSection;
