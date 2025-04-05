
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-tech-dark border-t border-white/10">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Info */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold text-gradient mb-4">TECH CANVAS</h2>
            </Link>
            <p className="text-sm text-white/60 mb-6">
              Explorando el futuro de la tecnología con un enfoque en diseño, 
              rendimiento y una experiencia única de usuario.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-neon-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-neon-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-neon-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-neon-blue transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Enlaces Rápidos</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-white/60 hover:text-neon-blue transition-colors">
                Inicio
              </Link>
              <Link to="/store" className="block text-white/60 hover:text-neon-blue transition-colors">
                Tienda
              </Link>
              <Link to="/about" className="block text-white/60 hover:text-neon-blue transition-colors">
                Nosotros
              </Link>
              <Link to="/contact" className="block text-white/60 hover:text-neon-blue transition-colors">
                Contacto
              </Link>
              <Link to="/support" className="block text-white/60 hover:text-neon-blue transition-colors">
                Soporte
              </Link>
            </div>
          </div>

          {/* Help */}
          <div>
            <h3 className="text-lg font-medium mb-4">Ayuda</h3>
            <div className="space-y-2">
              <Link to="/shipping" className="block text-white/60 hover:text-neon-blue transition-colors">
                Envíos
              </Link>
              <Link to="/returns" className="block text-white/60 hover:text-neon-blue transition-colors">
                Devoluciones
              </Link>
              <Link to="/faq" className="block text-white/60 hover:text-neon-blue transition-colors">
                Preguntas Frecuentes
              </Link>
              <Link to="/warranty" className="block text-white/60 hover:text-neon-blue transition-colors">
                Garantía
              </Link>
              <Link to="/privacy" className="block text-white/60 hover:text-neon-blue transition-colors">
                Privacidad
              </Link>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-medium mb-4">Newsletter</h3>
            <p className="text-sm text-white/60 mb-4">
              Suscríbete para recibir actualizaciones sobre nuevos productos y ofertas exclusivas.
            </p>
            <form className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Tu email" 
                className="bg-white/5 border-white/10 focus:border-neon-blue" 
              />
              <Button type="submit" size="sm" className="bg-neon-blue hover:bg-neon-blue/80">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/40 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tech Canvas. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-end">
            <Link to="/terms" className="text-sm text-white/40 hover:text-white">
              Términos de Servicio
            </Link>
            <Link to="/privacy" className="text-sm text-white/40 hover:text-white">
              Política de Privacidad
            </Link>
            <Link to="/cookies" className="text-sm text-white/40 hover:text-white">
              Política de Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
