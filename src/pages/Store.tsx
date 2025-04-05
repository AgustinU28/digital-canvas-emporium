
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ChevronDown, Filter, Search, SlidersHorizontal } from "lucide-react";
import products from "@/data/products.json";
import { Product } from "@/types";

const categories = Array.from(new Set(products.map(product => product.category)));
const brands = Array.from(new Set(products.map(product => product.brand)));

const Store = () => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 4000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("default");

  useEffect(() => {
    filterProducts();
  }, [searchTerm, priceRange, selectedCategories, selectedBrands, sortOption]);

  const filterProducts = () => {
    let results = [...products];

    // Search filter
    if (searchTerm) {
      results = results.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    results = results.filter(product => {
      const price = product.salePrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Category filter
    if (selectedCategories.length > 0) {
      results = results.filter(product => selectedCategories.includes(product.category));
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      results = results.filter(product => selectedBrands.includes(product.brand));
    }

    // Sorting
    switch (sortOption) {
      case "price-asc":
        results.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-desc":
        results.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "name-asc":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating":
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        break;
    }

    setFilteredProducts(results);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };

  const resetFilters = () => {
    setSearchTerm("");
    setPriceRange([0, 4000]);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSortOption("default");
  };

  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="w-full bg-tech-dark py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Nuestra Colección</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Explora nuestra exclusiva selección de computadoras de alta gama, 
            diseñadas para profesionales y entusiastas de la tecnología.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-10">
        {/* Search and Filters Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:max-w-md">
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border-white/10 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-white/5 border-white/10 rounded-md py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-neon-blue"
            >
              <option value="default">Ordenar por</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name-asc">Nombre: A-Z</option>
              <option value="name-desc">Nombre: Z-A</option>
              <option value="rating">Mejor Valorados</option>
            </select>
            
            <Button 
              variant="outline" 
              className="bg-white/5 border-white/10"
              onClick={() => setShowFilters(!showFilters)}
            >
              {showFilters ? <Filter className="h-4 w-4" /> : <SlidersHorizontal className="h-4 w-4" />}
              <span className="ml-2 hidden md:inline">Filtros</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Panel */}
          {showFilters && (
            <aside className="lg:col-span-1 tech-card p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filtros</h3>
                <Button variant="link" className="text-sm text-neon-blue p-0" onClick={resetFilters}>
                  Reiniciar
                </Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Rango de Precio</h4>
                <Slider
                  value={priceRange}
                  min={0}
                  max={4000}
                  step={50}
                  onValueChange={setPriceRange}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-white/60">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  Categorías
                  <ChevronDown className="ml-2 h-4 w-4" />
                </h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="border-white/30"
                      />
                      <label
                        htmlFor={`category-${category}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3 flex items-center">
                  Marcas
                  <ChevronDown className="ml-2 h-4 w-4" />
                </h4>
                <div className="space-y-2">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                        className="border-white/30"
                      />
                      <label
                        htmlFor={`brand-${brand}`}
                        className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="tech-card p-8 text-center">
                <h3 className="text-xl font-medium mb-2">No se encontraron productos</h3>
                <p className="text-white/60 mb-4">
                  No hay productos que coincidan con tus filtros. Intenta con otros criterios.
                </p>
                <Button onClick={resetFilters}>Reiniciar Filtros</Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Store;
