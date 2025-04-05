
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="bg-dark min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="w-full bg-tech-dark py-16 mt-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gradient">Sobre Nosotros</h1>
          <p className="text-white/60 max-w-2xl mx-auto">
            Conoce nuestra historia y misión como líderes en tecnología de vanguardia.
          </p>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="tech-card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Nuestra Historia</h2>
            <p className="text-white/70 mb-4">
              Fundada en 2015, nuestra empresa nació con la visión de transformar la manera en que las personas interactúan con la tecnología. 
              Comenzamos como una pequeña tienda en el centro de la ciudad, con un equipo de solo cinco apasionados por la tecnología.
            </p>
            <p className="text-white/70">
              Hoy, nos hemos convertido en líderes del mercado, con presencia en más de 20 ciudades y un equipo de más de 200 expertos 
              dedicados a ofrecer las mejores soluciones tecnológicas a nuestros clientes.
            </p>
            
            <div className="mt-6 aspect-video rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80" 
                alt="Nuestro equipo trabajando" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="tech-card p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-4">Nuestra Misión</h2>
            <p className="text-white/70 mb-4">
              Nos dedicamos a proporcionar tecnología de vanguardia que no solo satisfaga las necesidades actuales de nuestros clientes, 
              sino que también anticipe las futuras. Creemos en un mundo donde la tecnología sea accesible para todos y mejore la vida cotidiana.
            </p>
            <p className="text-white/70">
              Nuestro compromiso es ofrecer productos de la más alta calidad, con un servicio excepcional y un soporte técnico inigualable. 
              Trabajamos constantemente para mantenernos a la vanguardia de la innovación tecnológica.
            </p>
            
            <div className="mt-6 aspect-video rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80" 
                alt="Innovación tecnológica" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="tech-card p-6 md:p-8 lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">Nuestros Valores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="p-5 glassmorphism rounded-lg">
                <h3 className="text-xl font-medium mb-2">Innovación</h3>
                <p className="text-white/70">
                  Buscamos constantemente nuevas formas de mejorar nuestros productos y servicios, 
                  adoptando las últimas tecnologías y tendencias del mercado.
                </p>
              </div>
              
              <div className="p-5 glassmorphism rounded-lg">
                <h3 className="text-xl font-medium mb-2">Excelencia</h3>
                <p className="text-white/70">
                  Nos comprometemos a ofrecer productos y servicios de la más alta calidad, 
                  superando siempre las expectativas de nuestros clientes.
                </p>
              </div>
              
              <div className="p-5 glassmorphism rounded-lg">
                <h3 className="text-xl font-medium mb-2">Integridad</h3>
                <p className="text-white/70">
                  Actuamos con honestidad y transparencia en todas nuestras operaciones, 
                  construyendo relaciones de confianza con clientes, proveedores y colaboradores.
                </p>
              </div>
            </div>
            
            <div className="mt-8 aspect-[21/9] rounded-lg overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1600&q=80" 
                alt="Nuestro equipo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
