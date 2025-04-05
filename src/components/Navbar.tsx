
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient">TECH URI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-white hover:text-neon-blue transition-colors">
              Inicio
            </Link>
            <Link to="/store" className="text-white hover:text-neon-blue transition-colors">
              Tienda
            </Link>
            <Link to="/about" className="text-white hover:text-neon-blue transition-colors">
              Nosotros
            </Link>
          </div>

          {/* Cart Button */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative inline-flex">
              <Button
                variant="ghost"
                className="relative p-2 hover:bg-white/5"
                aria-label="Carrito de compras"
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-neon-blue text-xs font-medium text-white">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden p-2 hover:bg-white/5"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "fixed inset-0 bg-dark/90 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 transition-all duration-300 ease-in-out md:hidden",
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Link 
          to="/" 
          className="text-xl font-medium hover:text-neon-blue transition-colors"
          onClick={toggleMenu}
        >
          Inicio
        </Link>
        <Link 
          to="/store" 
          className="text-xl font-medium hover:text-neon-blue transition-colors"
          onClick={toggleMenu}
        >
          Tienda
        </Link>
        <Link 
          to="/about" 
          className="text-xl font-medium hover:text-neon-blue transition-colors"
          onClick={toggleMenu}
        >
          Nosotros
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
